package com.dotsandboxes.fragments;


import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.os.Bundle;
import android.os.IBinder;

import com.dotsandboxes.R;
import com.dotsandboxes.activities.PrivacyActivity;
import com.dotsandboxes.services.MusicPlayerService;

import androidx.fragment.app.Fragment;
import androidx.preference.Preference;
import androidx.preference.PreferenceFragmentCompat;
import androidx.preference.PreferenceManager;
import timber.log.Timber;


/**
 * A simple {@link Fragment} subclass.
 */
public class SettingsFragment extends PreferenceFragmentCompat /*implements Preference.OnPreferenceChangeListener*/ {

    private MusicPlayerService mService;
    private boolean serviceBound = false;
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

            Intent intent = new Intent(getActivity(), MusicPlayerService.class);

            boolean playMusic = PreferenceManager.getDefaultSharedPreferences(getActivity()).getBoolean(getString(R.string.pref_key_music), true);

            if (playMusic) {
                intent.setAction(MusicPlayerService.ACTION_START_MUSIC);
            } else {
                intent.setAction(MusicPlayerService.ACTION_STOP_MUSIC);
            }

            getActivity().bindService(intent, serviceConnection, Context.BIND_AUTO_CREATE);

        }

        @Override
        public void onServiceDisconnected(ComponentName name) {
            getActivity().startService(new Intent(MusicPlayerService.ACTION_STOP_MUSIC));
            serviceBound = false;
        }
    };

    public SettingsFragment() {
        // Required empty public constructor
    }

    void doBindService() {
        Intent intent = new Intent(getActivity(), MusicPlayerService.class);

        // start playing music if the user specified so in the settings screen
        boolean playMusic = PreferenceManager.getDefaultSharedPreferences(getActivity()).getBoolean(getString(R.string.pref_key_music), true);
        if (playMusic) {
            intent.setAction(MusicPlayerService.ACTION_START_MUSIC);
        } else {
            intent.setAction(MusicPlayerService.ACTION_STOP_MUSIC);
        }

        getActivity().bindService(intent, serviceConnection, Context.BIND_AUTO_CREATE);
        serviceBound = true;
    }

    void doUnbindService() {
        if (serviceBound) {
            getActivity().unbindService(serviceConnection);
            serviceBound = false;
        }
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        addPreferencesFromResource(R.xml.pref_settings);

        findPreference(getString(R.string.pref_key_music)).setOnPreferenceChangeListener((preference, newValue) -> {
            Timber.e("onPreferenceChange: " + preference.getKey() + "  " + newValue.toString());

            if (preference.getKey().equals(getString(R.string.pref_key_music))) {
                if ((boolean) newValue) {
                    Intent intent = new Intent(getActivity(), MusicPlayerService.class);
                    intent.setAction(MusicPlayerService.ACTION_START_MUSIC);
                    mService.sendCommand(intent);
                } else {
                    Intent intent = new Intent(getActivity(), MusicPlayerService.class);
                    intent.setAction(MusicPlayerService.ACTION_STOP_MUSIC);
                    mService.sendCommand(intent);
                }
            }
            return true;
        });
        findPreference(getString(R.string.pref_key_music)).setPersistent(true);
        findPreference(getString(R.string.pref_key_sound)).setPersistent(true);
        findPreference(getString(R.string.pref_key_vibrate)).setPersistent(true);
        findPreference(getString(R.string.pref_key_privacy_policy)).setOnPreferenceClickListener(new Preference.OnPreferenceClickListener() {
            @Override
            public boolean onPreferenceClick(Preference preference) {
                if (preference.getKey().equals(getString(R.string.pref_key_privacy_policy))) {
                    startActivity(new Intent(getActivity(), PrivacyActivity.class));
                    getActivity().overridePendingTransition(R.anim.zoom_in, R.anim.zoom_out);
                }
                return true;
            }
        });
    }

    @Override
    public void onCreatePreferences(Bundle savedInstanceState, String rootKey) {

    }

   /* @Override
    public boolean onPreferenceChange(Preference preference, Object newValue) {


        return true;
    }*/

    @Override
    public void onStart() {
        super.onStart();
        doBindService();
    }

    @Override
    public void onStop() {
        doUnbindService();
        super.onStop();
    }


}
