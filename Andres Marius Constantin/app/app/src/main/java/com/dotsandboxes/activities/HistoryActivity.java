package com.dotsandboxes.activities;

import android.annotation.SuppressLint;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.os.Bundle;
import android.os.IBinder;
import android.text.format.DateUtils;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.dotsandboxes.DotsAndBoxesApplication;
import com.dotsandboxes.R;
import com.dotsandboxes.database.GameScore;
import com.dotsandboxes.database.GameScoreDao;
import com.dotsandboxes.services.MusicPlayerService;
import com.dotsandboxes.utils.CheckInternet;
import com.google.android.gms.ads.AdView;

import java.util.List;

import androidx.appcompat.widget.Toolbar;
import androidx.core.content.ContextCompat;
import androidx.preference.PreferenceManager;
import androidx.recyclerview.widget.DividerItemDecoration;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;
import timber.log.Timber;

public class HistoryActivity extends MusicPlayerActivity {

    @BindView(R.id.iv_toolbar_back)
    ImageView ivToolbarBack;
    @BindView(R.id.tv_toolbar_title)
    TextView tvToolbarTitle;
    @BindView(R.id.iv_toolbar_sound)
    ImageView ivToolbarSound;
    @BindView(R.id.common_toolbar)
    Toolbar commonToolbar;
    @BindView(R.id.recycler_view)
    RecyclerView recyclerView;
    @BindView(R.id.iv_toolbar_facebook)
    ImageView ivToolbarFacebook;
    @BindView(R.id.adView)
    AdView adView;
    @BindView(R.id.ll_no_history)
    LinearLayout llNoHistory;


    /**
     * Class for interacting with the game interface of the service.
     */
    private ServiceConnection serviceConnection = new ServiceConnection() {
        @Override
        public void onServiceConnected(ComponentName name, IBinder service) {
            // We've bound to LocalService, cast the IBinder and get LocalService instance
            MusicPlayerService.LocalBinder binder = (MusicPlayerService.LocalBinder) service;
            mService = binder.getService();
            serviceBound = true;

            Intent intent = new Intent(HistoryActivity.this, MusicPlayerService.class);

            boolean playMusic = PreferenceManager.getDefaultSharedPreferences(HistoryActivity.this).getBoolean(getString(R.string.pref_key_music), true);

            if (playMusic) {
                intent.setAction(MusicPlayerService.ACTION_START_MUSIC);
                mService.sendCommand(intent);
            } else {
                intent.setAction(MusicPlayerService.ACTION_STOP_MUSIC);
                mService.sendCommand(intent);
            }

            bindService(intent, serviceConnection, Context.BIND_AUTO_CREATE);

        }

        @Override
        public void onServiceDisconnected(ComponentName name) {
            startService(new Intent(MusicPlayerService.ACTION_STOP_MUSIC));
            serviceBound = false;
        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_history);
        ButterKnife.bind(this);

        init();
    }

    @Override
    protected void onStart() {
        super.onStart();
        doBindService();
    }

    @Override
    protected void onStop() {
        doUnbindService();
        super.onStop();

    }

    @Override
    protected void onResume() {
        super.onResume();

        if (adView != null) {
            adView.resume();
        }
    }

    @Override
    protected void onPause() {
        if (adView != null) {
            adView.pause();
        }
        super.onPause();
    }

    void doBindService() {
        Intent intent = new Intent(HistoryActivity.this, MusicPlayerService.class);

        // start playing music if the user specified so in the settings screen
        boolean playMusic = PreferenceManager.getDefaultSharedPreferences(HistoryActivity.this).getBoolean(getString(R.string.pref_key_music), true);
        if (playMusic) {
            intent.setAction(MusicPlayerService.ACTION_START_MUSIC);
        } else {
            intent.setAction(MusicPlayerService.ACTION_STOP_MUSIC);
        }

        bindService(intent, serviceConnection, Context.BIND_AUTO_CREATE);
        serviceBound = true;
    }

    void doUnbindService() {
        if (serviceBound) {
            unbindService(serviceConnection);
            serviceBound = false;
        }
    }

    @SuppressLint("WrongConstant")
    private void init() {
        setSupportActionBar(commonToolbar);
        getSupportActionBar().setDisplayShowTitleEnabled(false);
        ivToolbarBack.setVisibility(View.VISIBLE);
        ivToolbarSound.setVisibility(View.GONE);
        ivToolbarFacebook.setVisibility(View.GONE);
        tvToolbarTitle.setText(getString(R.string.history_screen));

        GameScoreDao gameScoreDao = ((DotsAndBoxesApplication) getApplication()).getDb().gameScoreDao();
        List<GameScore> gameScoreEntries = gameScoreDao.getAll();

        if (gameScoreEntries.size() > 0) {
            llNoHistory.setVisibility(View.GONE);
            recyclerView.setVisibility(View.VISIBLE);
        } else {
            llNoHistory.setVisibility(View.VISIBLE);
            recyclerView.setVisibility(View.GONE);
        }


        recyclerView.setHasFixedSize(true);
        recyclerView.setLayoutManager(new LinearLayoutManager(this, LinearLayoutManager.VERTICAL, false));
        recyclerView.setAdapter(new HistoryAdapter(HistoryActivity.this, gameScoreEntries));
        DividerItemDecoration dividerItemDecoration = new DividerItemDecoration(this, DividerItemDecoration.VERTICAL);
        dividerItemDecoration.setDrawable(ContextCompat.getDrawable(this, R.drawable.list_divider));
        recyclerView.addItemDecoration(dividerItemDecoration);

        if (CheckInternet.isNetworkAvailable(HistoryActivity.this)) {
            adView.setVisibility(View.VISIBLE);
            adsWrapper.loadBannerAd(adView);
        } else {
            adView.setVisibility(View.GONE);
        }
    }

    @OnClick(R.id.iv_toolbar_back)
    public void onViewClicked() {
        onBackPressed();
    }

    @Override
    public void onBackPressed() {
        finish();
        overridePendingTransition(R.anim.zoom_in, R.anim.zoom_out);
        //  overridePendingTransition(R.anim.stay, R.anim.slide_from_top);
    }

    /**
     * This class is used to fill recycler view
     */
    public class HistoryAdapter extends RecyclerView.Adapter<HistoryAdapter.GameScoreViewHolder> {
        List<GameScore> gameScoreEntries;
        Context context;

        HistoryAdapter(Context context, List<GameScore> gameScoreEntries) {
            this.context = context;
            this.gameScoreEntries = gameScoreEntries;
        }

        @Override
        public GameScoreViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
            return new GameScoreViewHolder(LayoutInflater.from(parent.getContext()).inflate(R.layout.row_game_score, parent, false));
        }

        @Override
        public void onBindViewHolder(GameScoreViewHolder holder, int position) {
            GameScore entry = gameScoreEntries.get(position);

            Timber.e("Local Database Entry = " + entry.toString());

            holder.tvGameOpponent.setText(entry.getOpponent());
            String result = entry.getResult();
            holder.tvGameResult.setText(result);
            switch (result) {
                case "Won":
                    holder.tvGameResult.setTextColor(ContextCompat.getColor(context, R.color.wonColor));
                    break;
                case "Lost":
                    holder.tvGameResult.setTextColor(ContextCompat.getColor(context, R.color.lostColor));
                    break;
                case "Tie":
                    holder.tvGameResult.setTextColor(ContextCompat.getColor(context, R.color.tieColor));
                    break;

            }
            holder.tvGameScore.setText(entry.getScore());
            holder.tvGameTime.setText(DateUtils.getRelativeTimeSpanString(entry.getDate()));
        }

        @Override
        public int getItemCount() {
            return gameScoreEntries.size();
        }


        class GameScoreViewHolder extends RecyclerView.ViewHolder {
            @BindView(R.id.tv_game_opponent)
            TextView tvGameOpponent;
            @BindView(R.id.tv_score_lable)
            TextView tvScoreLable;
            @BindView(R.id.tv_game_score)
            TextView tvGameScore;
            @BindView(R.id.tv_game_result)
            TextView tvGameResult;
            @BindView(R.id.tv_game_time)
            TextView tvGameTime;

            GameScoreViewHolder(View view) {
                super(view);
                ButterKnife.bind(this, view);
            }
        }
    }
}
