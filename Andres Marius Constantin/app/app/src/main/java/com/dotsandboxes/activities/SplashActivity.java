package com.dotsandboxes.activities;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Bundle;
import android.text.TextUtils;
import android.widget.ImageView;

import com.bumptech.glide.Glide;
import com.bumptech.glide.load.DataSource;
import com.bumptech.glide.load.engine.GlideException;
import com.bumptech.glide.load.resource.gif.GifDrawable;
import com.bumptech.glide.request.RequestListener;
import com.bumptech.glide.request.target.Target;
import com.dotsandboxes.BuildConfig;
import com.dotsandboxes.R;
import com.dotsandboxes.utils.Constants;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.remoteconfig.FirebaseRemoteConfig;
import com.google.firebase.remoteconfig.FirebaseRemoteConfigSettings;

import java.util.Timer;
import java.util.TimerTask;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import butterknife.BindView;
import butterknife.ButterKnife;
import timber.log.Timber;

public class SplashActivity extends AppCompatActivity {

    public static final String KEY_UPDATE_REQUIRED = "force_update_required";
    public static final String KEY_CURRENT_VERSION = "force_update_current_version";
    public static final String KEY_UPDATE_URL = "force_update_store_url";

    @BindView(R.id.img_dot_boax_gif)
    ImageView imgDotBoaxGif;
    private Timer timer;
    private FirebaseRemoteConfig mFirebaseRemoteConfig;
    //timer task to load main activity after specified time
    private TimerTask loadNextActivity = new TimerTask() {
        @Override
        public void run() {
            Intent nextActivity;
            SharedPreferences prefs = getSharedPreferences(Constants.PREFS_NAME_GENERAL, Context.MODE_PRIVATE);
            nextActivity = new Intent(getApplicationContext(), MainActivity.class);
            startActivity(nextActivity);
            finish();
        }
    };
    private OnUpdateNeededListener onUpdateNeededListener = new OnUpdateNeededListener() {
        @Override
        public void onUpdateNeeded(String updateUrl) {
            AlertDialog dialog = new AlertDialog.Builder(SplashActivity.this)
                    .setTitle(getString(R.string.app_name))
                    .setCancelable(false)
                    .setMessage(getString(R.string.str_update_message))
                    .setPositiveButton(getString(R.string.update),
                            (dialog1, which) -> redirectStore(updateUrl)).create();
            dialog.show();
        }

        @Override
        public void onNoUpdateNeeded() {
            timer = new Timer();
            Glide.with(SplashActivity.this)
                    .asGif()
                    .load(R.raw.logo_animastion)
                    .listener(new RequestListener<GifDrawable>() {
                        @Override
                        public boolean onLoadFailed(@Nullable GlideException e, Object model,
                                                    Target<GifDrawable> target, boolean isFirstResource) {
                            return false;
                        }

                        @Override
                        public boolean onResourceReady(GifDrawable resource, Object model,
                                                       Target<GifDrawable> target, DataSource dataSource,
                                                       boolean isFirstResource) {
                            resource.setLoopCount(1);
                            if (!resource.isRunning()) {
                                timer.schedule(loadNextActivity, getResources().getInteger(R.integer.splash_duration));
                            }
                            return false;
                        }
                    })
                    .into(imgDotBoaxGif);
        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash);
        ButterKnife.bind(this);

        init();


    }

    /**
     * This function provide to load gif and perform timer task after gif loaded.
     */
    private void init() {
        // Get Remote Config instance.
        // [START get_remote_config_instance]
        mFirebaseRemoteConfig = FirebaseRemoteConfig.getInstance();
        // [END get_remote_config_instance]

        // Create a Remote Config Setting to enable developer mode, which you can use to increase
        // the number of fetches available per hour during development. See Best Practices in the
        // README for more information.
        // [START enable_dev_mode]
        FirebaseRemoteConfigSettings configSettings = new FirebaseRemoteConfigSettings.Builder()
                .setDeveloperModeEnabled(BuildConfig.DEBUG)
                .build();
        mFirebaseRemoteConfig.setConfigSettings(configSettings);
        // [END enable_dev_mode]

        // Set default Remote Config parameter values. An app uses the in-app default values, and
        // when you need to adjust those defaults, you set an updated value for only the values you
        // want to change in the Firebase console. See Best Practices in the README for more
        // information.
        // [START set_default_values]
        mFirebaseRemoteConfig.setDefaults(R.xml.remote_config_defaults);
        // [END set_default_values]


        fetchRemoteConfig();

    }

    private void fetchRemoteConfig() {
        long cacheExpiration = 3600; // 1 hour in seconds.
        // If your app is using developer mode, cacheExpiration is set to 0, so each fetch will
        // retrieve values from the service.
        if (mFirebaseRemoteConfig.getInfo().getConfigSettings().isDeveloperModeEnabled()) {
            cacheExpiration = 0;
        }

        // [START fetch_config_with_callback]
        // cacheExpirationSeconds is set to cacheExpiration here, indicating the next fetch request
        // will use fetch data from the Remote Config service, rather than cached parameter values,
        // if cached parameter values are more than cacheExpiration seconds old.
        // See Best Practices in the README for more information.
        mFirebaseRemoteConfig.fetch(cacheExpiration)
                .addOnCompleteListener(this, new OnCompleteListener<Void>() {
                    @Override
                    public void onComplete(@NonNull Task<Void> task) {
                        if (task.isSuccessful()) {
                            // After config data is successfully fetched, it must be activated before newly fetched
                            // values are returned.
                            Timber.e("Fetch Succeeded");
                            mFirebaseRemoteConfig.activateFetched();
                        } else {
                            Timber.e("Fetch Failed");
                        }
                        taskWhenUpdateNeededOrNot();
                    }
                });
        // [END fetch_config_with_callback]
    }

    private void taskWhenUpdateNeededOrNot() {
        // [END get_config_values]
        if (mFirebaseRemoteConfig.getBoolean(KEY_UPDATE_REQUIRED)) {
            String currentVersion = mFirebaseRemoteConfig.getString(KEY_CURRENT_VERSION);
            String appVersion = getAppVersion(getApplicationContext());
            String updateUrl = mFirebaseRemoteConfig.getString(KEY_UPDATE_URL);

            Timber.e(currentVersion + "|" + appVersion + "|" + updateUrl);

            if (!TextUtils.equals(currentVersion, appVersion)) {
                if (onUpdateNeededListener != null) {
                    onUpdateNeededListener.onUpdateNeeded(updateUrl);
                }
            } else {
                if (onUpdateNeededListener != null) {
                    onUpdateNeededListener.onNoUpdateNeeded();
                }

            }
        } else {
            if (onUpdateNeededListener != null) {
                onUpdateNeededListener.onNoUpdateNeeded();
            }
        }
    }


    private String getAppVersion(Context context) {
        String result = "";

        try {
            result = context.getPackageManager()
                    .getPackageInfo(context.getPackageName(), 0)
                    .versionName;
            result = result.replaceAll("[a-zA-Z]|-", "");
        } catch (PackageManager.NameNotFoundException e) {
            Timber.e(e.getMessage());
        }

        return result;
    }


    @Override
    protected void onDestroy() {
        super.onDestroy();

    }

    private void redirectStore(String updateUrl) {
        final Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(updateUrl));
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        startActivity(intent);
        finish();
    }

    public interface OnUpdateNeededListener {
        void onUpdateNeeded(String updateUrl);

        void onNoUpdateNeeded();
    }
}
