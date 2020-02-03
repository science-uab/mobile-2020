package com.dotsandboxes.activities;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.ComponentName;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.ServiceConnection;
import android.net.Uri;
import android.os.Bundle;
import android.os.IBinder;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.View;
import android.view.inputmethod.InputMethodManager;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.bumptech.glide.Glide;
import com.bumptech.glide.request.RequestOptions;
import com.dotsandboxes.DotsAndBoxesApplication;
import com.dotsandboxes.R;
import com.dotsandboxes.imagepicker.ImagePickerCallback;
import com.dotsandboxes.imagepicker.ImagePickerFragment;
import com.dotsandboxes.imagepicker.MarshMallowHelper;
import com.dotsandboxes.services.MusicPlayerService;
import com.dotsandboxes.utils.CheckInternet;
import com.dotsandboxes.utils.Constants;
import com.dotsandboxes.utils.PrefUtils;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.AdView;

import androidx.annotation.NonNull;
import androidx.appcompat.widget.AppCompatButton;
import androidx.appcompat.widget.Toolbar;
import androidx.preference.PreferenceManager;
import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;

public class ProfileActivity extends MusicPlayerActivity implements ImagePickerCallback {


    @BindView(R.id.iv_toolbar_back)
    ImageView ivToolbarBack;
    @BindView(R.id.tv_toolbar_title)
    TextView tvToolbarTitle;
    @BindView(R.id.iv_toolbar_sound)
    ImageView ivToolbarSound;
    @BindView(R.id.common_toolbar)
    Toolbar commonToolbar;
    @BindView(R.id.ll_main)
    LinearLayout llMain;
    @BindView(R.id.iv_toolbar_facebook)
    ImageView ivToolbarFacebook;
    @BindView(R.id.et_set_your_name)
    EditText etSetYourName;
    @BindView(R.id.iv_profile)
    ImageView ivProfile;
    @BindView(R.id.btn_add_image)
    ImageView btnAddImage;
    @BindView(R.id.btn_save)
    AppCompatButton btnSave;
    @BindView(R.id.tv_game_played)
    TextView tvGamePlayed;
    @BindView(R.id.tv_game_win)
    TextView tvGameWin;
    @BindView(R.id.tv_game_lost)
    TextView tvGameLost;
    @BindView(R.id.tv_game_win_percentage)
    TextView tvGameWinPercentage;

    long totalGamePlayed = 0L;
    long totalGameWin = 0L;
    long totalGameLost = 0L;
    @BindView(R.id.adView)
    AdView adView;
    private ImagePickerFragment mImagePickerFragment;


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

            Intent intent = new Intent(ProfileActivity.this, MusicPlayerService.class);

            boolean playMusic = PreferenceManager.getDefaultSharedPreferences(ProfileActivity.this).getBoolean(getString(R.string.pref_key_music), true);

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

    public static void hideKeyboard(Activity activity) {
        InputMethodManager imm = (InputMethodManager) activity.getSystemService(Activity.INPUT_METHOD_SERVICE);
        //Find the currently focused view, so we can grab the correct window token from it.
        View view = activity.getCurrentFocus();
        //If no view currently has focus, create a new one, just so we can grab a window token from it
        if (view == null) {
            view = new View(activity);
        }
        imm.hideSoftInputFromWindow(view.getWindowToken(), 0);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profile);
        ButterKnife.bind(this);
        initToolbar();
        initialize();
    }

    /**
     * this method initialize toolbar
     */
    private void initToolbar() {
        tvToolbarTitle.setText(getString(R.string.profile));
        ivToolbarSound.setVisibility(View.GONE);
        ivToolbarFacebook.setVisibility(View.GONE);
    }

    /**
     * this method initialize variables and functions
     */
    private void initialize() {
        mImagePickerFragment = ImagePickerFragment.newInstance(ProfileActivity.this, new MarshMallowHelper());
        mImagePickerFragment.setCropEnabled(false);
        // mImagePickerFragment.setCropType(Cropper.CROP_TYPE_OVAL);

        prefUtils = new PrefUtils(this);

        if (!(prefUtils.getString(Constants.prefrences.NAME) == null)) {
            etSetYourName.setText(prefUtils.getString(Constants.prefrences.NAME));
        }
        if (!(prefUtils.getString(Constants.prefrences.PROFILE_IMAGE) == null)) {
            if (!prefUtils.getString(Constants.prefrences.PROFILE_IMAGE).isEmpty())
                Glide.with(this).load(Uri.parse(prefUtils.getString(Constants.prefrences.PROFILE_IMAGE))).apply(RequestOptions.circleCropTransform()).into(ivProfile);
        }
        totalGamePlayed = ((DotsAndBoxesApplication) getApplication()).getDb().gameScoreDao().getTotalGamesPlayed();
        tvGamePlayed.setText(String.valueOf(totalGamePlayed));
        totalGameWin = ((DotsAndBoxesApplication) getApplication()).getDb().gameScoreDao().getWinMatches();
        tvGameWin.setText(String.valueOf(totalGameWin));
        totalGameLost = ((DotsAndBoxesApplication) getApplication()).getDb().gameScoreDao().getLostMatches();
        tvGameLost.setText(String.valueOf(totalGameLost));
        float winPercent = getPercentage();
        tvGameWinPercentage.setText(String.valueOf(winPercent));
        etSetYourName.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence charSequence, int i, int i1, int i2) {

            }

            @Override
            public void onTextChanged(CharSequence charSequence, int i, int i1, int i2) {
                btnSave.setVisibility(View.VISIBLE);
            }

            @Override
            public void afterTextChanged(Editable editable) {

            }
        });

        if(CheckInternet.isNetworkAvailable(ProfileActivity.this)) {
            adView.setVisibility(View.VISIBLE);
            adsWrapper.loadBannerAd(adView);
        }else{
            adView.setVisibility(View.GONE);
        }
    }

    /**
     * This method calculate win percentage
     *
     * @return return float value of win percentage
     */
    private float getPercentage() {
        if (totalGamePlayed == 0) {
            return 0;
        } else {
            return (totalGameWin * 100) / totalGamePlayed;
        }
    }

    @OnClick({R.id.btn_add_image, R.id.btn_save, R.id.iv_toolbar_back, R.id.iv_toolbar_facebook})
    public void onViewClicked(View view) {
        switch (view.getId()) {
            case R.id.btn_add_image:
                selectProfileImage();
                break;
            case R.id.iv_toolbar_back:
                onBackPressed();
                break;
            case R.id.iv_toolbar_facebook:
                startActivity(new Intent(this, ConnectToFacebookActivity.class));
                overridePendingTransition(R.anim.zoom_in, R.anim.zoom_out);
                break;
            case R.id.btn_save:
                hideKeyboard(this);
                if (checkName()) {
                    prefUtils.setString(Constants.prefrences.NAME, etSetYourName.getText().toString().trim());
                    btnSave.setVisibility(View.GONE);
                }
                break;
        }
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
        Intent intent = new Intent(ProfileActivity.this, MusicPlayerService.class);

        // start playing music if the user specified so in the settings screen
        boolean playMusic = PreferenceManager.getDefaultSharedPreferences(ProfileActivity.this).getBoolean(getString(R.string.pref_key_music), true);
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
    public void onBackPressed() {
        finish();
        overridePendingTransition(R.anim.zoom_in, R.anim.zoom_out);
        //  overridePendingTransition(R.anim.stay, R.anim.slide_from_top);
    }

    /**
     * this method checks Entered name is empty or not
     *
     * @return
     */
    private boolean checkName() {
        if (etSetYourName.getText().toString().trim().isEmpty()) {
            Toast.makeText(this, R.string.please_enter_name, Toast.LENGTH_SHORT).show();
            return false;
        }
        return true;
    }

    /**
     * this function used to open dialog for selection option for profile image if user want to
     * add it.
     */
    private void selectProfileImage() {
        final CharSequence[] items;
        items = new CharSequence[]{getString(R.string.str_take_photo), getString(R.string.str_choose_from_library)};

        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setTitle(R.string.str_choose_picture);
        builder.setItems(items, new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int item) {
                if (items[item].equals(getString(R.string.str_take_photo))) {
                    mImagePickerFragment.captureImageFromCamera(ProfileActivity.this);

                } else if (items[item].equals(getString(R.string.str_choose_from_library))) {
                    mImagePickerFragment.selectImageFromGallery(ProfileActivity.this);
                }
            }
        });
        builder.show();
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        mImagePickerFragment.processActivityResult(requestCode, resultCode, data, this);
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);

        mImagePickerFragment.processPermissionResults(requestCode, grantResults, this);
    }

    @Override
    public void onCompleteTakingImage(Uri uri, boolean isCropped) {
        Glide.with(this).load(uri).apply(RequestOptions.circleCropTransform()).into(ivProfile);
        prefUtils.setString(Constants.prefrences.PROFILE_IMAGE, uri.toString());
    }

    @Override
    public void onCancelTakingImage() {

    }

    @Override
    public void onErrorTakingImage(String messageToShow, Throwable t) {

    }
}
