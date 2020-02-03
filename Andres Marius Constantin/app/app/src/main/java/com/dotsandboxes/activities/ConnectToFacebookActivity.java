package com.dotsandboxes.activities;

import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import com.dotsandboxes.R;

import androidx.appcompat.widget.AppCompatButton;
import androidx.appcompat.widget.Toolbar;
import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;

public class ConnectToFacebookActivity extends MusicPlayerActivity {

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
    @BindView(R.id.btn_connect_to_facebook)
    AppCompatButton btnConnectToFacebook;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_connect_to_facebook);
        ButterKnife.bind(this);
        initToolbar();
        initialize();
    }

    /**
     * this method initialize toolbar
     */
    private void initToolbar() {
        tvToolbarTitle.setText(getString(R.string.connect_to_facebook));
        ivToolbarSound.setVisibility(View.GONE);
        ivToolbarFacebook.setVisibility(View.GONE);
    }

    /**
     * this method initialize variables and functions
     */
    private void initialize() {
    }
    @Override
    public void onBackPressed() {
        finish();
        overridePendingTransition(R.anim.zoom_in, R.anim.zoom_out);
        //overridePendingTransition(R.anim.stay, R.anim.slide_from_top);
    }
    @OnClick({R.id.iv_toolbar_back, R.id.btn_connect_to_facebook})
    public void onViewClicked(View view) {
        switch (view.getId()) {
            case R.id.iv_toolbar_back:
                onBackPressed();
                break;
            case R.id.btn_connect_to_facebook:
                break;
        }
    }
}
