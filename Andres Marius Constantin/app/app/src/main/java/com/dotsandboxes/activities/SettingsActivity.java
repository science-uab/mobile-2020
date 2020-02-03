package com.dotsandboxes.activities;

import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.os.Bundle;
import android.os.IBinder;
import android.view.MenuItem;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import com.dotsandboxes.R;
import com.dotsandboxes.fragments.SettingsFragment;
import com.dotsandboxes.services.MusicPlayerService;
import com.dotsandboxes.utils.CheckInternet;
import com.google.android.gms.ads.AdView;

import androidx.appcompat.widget.Toolbar;
import androidx.core.app.NavUtils;
import androidx.preference.PreferenceManager;
import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;

public class SettingsActivity extends MusicPlayerActivity {

    @BindView(R.id.iv_toolbar_back)
    ImageView ivToolbarBack;
    @BindView(R.id.tv_toolbar_title)
    TextView tvToolbarTitle;
    @BindView(R.id.iv_toolbar_sound)
    ImageView ivToolbarSound;
    @BindView(R.id.iv_toolbar_facebook)
    ImageView ivToolbarFacebook;
    @BindView(R.id.common_toolbar)
    Toolbar commonToolbar;
    @BindView(R.id.adView)
    AdView adView;


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

            Intent intent = new Intent(SettingsActivity.this, MusicPlayerService.class);

            boolean playMusic = PreferenceManager.getDefaultSharedPreferences(SettingsActivity.this).getBoolean(getString(R.string.pref_key_music), true);

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
    protected void onStart() {
        super.onStart();
        doBindService();
    }

    @Override
    protected void onStop() {
        doUnbindService();
        super.onStop();

    }

    void doBindService() {
        Intent intent = new Intent(SettingsActivity.this, MusicPlayerService.class);

        // start playing music if the user specified so in the settings screen
        boolean playMusic = PreferenceManager.getDefaultSharedPreferences(SettingsActivity.this).getBoolean(getString(R.string.pref_key_music), true);
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

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_settings);
        ButterKnife.bind(this);

        init();
    }

    private void init() {
        setSupportActionBar(commonToolbar);
        ivToolbarBack.setVisibility(View.VISIBLE);
        ivToolbarSound.setVisibility(View.GONE);
        ivToolbarFacebook.setVisibility(View.GONE);
        tvToolbarTitle.setText(getString(R.string.settings_screen));

        // Display the fragment as the game content.
        getSupportFragmentManager().beginTransaction().replace(R.id.content, new SettingsFragment()).commit();
        if (CheckInternet.isNetworkAvailable(SettingsActivity.this)) {
            adView.setVisibility(View.VISIBLE);
            adsWrapper.loadBannerAd(adView);
        } else {
            adView.setVisibility(View.GONE);
        }


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

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if (item.getItemId() == android.R.id.home) {
            NavUtils.navigateUpFromSameTask(this);
        }

        return super.onOptionsItemSelected(item);
    }

    @Override
    public void onBackPressed() {
        finish();
        overridePendingTransition(R.anim.zoom_in, R.anim.zoom_out);
        // overridePendingTransition(R.anim.stay, R.anim.slide_from_top);
    }

    @OnClick(R.id.iv_toolbar_back)
    public void onViewClicked() {
        onBackPressed();
    }
}
