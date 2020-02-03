// Generated code from Butter Knife. Do not modify!
package com.dotsandboxes.activities;

import android.view.View;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import androidx.annotation.CallSuper;
import androidx.annotation.UiThread;
import androidx.appcompat.widget.AppCompatButton;
import androidx.appcompat.widget.Toolbar;
import butterknife.Unbinder;
import butterknife.internal.DebouncingOnClickListener;
import butterknife.internal.Utils;
import com.dotsandboxes.R;
import com.google.android.gms.ads.AdView;
import java.lang.IllegalStateException;
import java.lang.Override;

public class ProfileActivity_ViewBinding implements Unbinder {
  private ProfileActivity target;

  private View view7f09009b;

  private View view7f09009c;

  private View view7f090031;

  private View view7f090037;

  @UiThread
  public ProfileActivity_ViewBinding(ProfileActivity target) {
    this(target, target.getWindow().getDecorView());
  }

  @UiThread
  public ProfileActivity_ViewBinding(final ProfileActivity target, View source) {
    this.target = target;

    View view;
    view = Utils.findRequiredView(source, R.id.iv_toolbar_back, "field 'ivToolbarBack' and method 'onViewClicked'");
    target.ivToolbarBack = Utils.castView(view, R.id.iv_toolbar_back, "field 'ivToolbarBack'", ImageView.class);
    view7f09009b = view;
    view.setOnClickListener(new DebouncingOnClickListener() {
      @Override
      public void doClick(View p0) {
        target.onViewClicked(p0);
      }
    });
    target.tvToolbarTitle = Utils.findRequiredViewAsType(source, R.id.tv_toolbar_title, "field 'tvToolbarTitle'", TextView.class);
    target.ivToolbarSound = Utils.findRequiredViewAsType(source, R.id.iv_toolbar_sound, "field 'ivToolbarSound'", ImageView.class);
    target.commonToolbar = Utils.findRequiredViewAsType(source, R.id.common_toolbar, "field 'commonToolbar'", Toolbar.class);
    target.llMain = Utils.findRequiredViewAsType(source, R.id.ll_main, "field 'llMain'", LinearLayout.class);
    view = Utils.findRequiredView(source, R.id.iv_toolbar_facebook, "field 'ivToolbarFacebook' and method 'onViewClicked'");
    target.ivToolbarFacebook = Utils.castView(view, R.id.iv_toolbar_facebook, "field 'ivToolbarFacebook'", ImageView.class);
    view7f09009c = view;
    view.setOnClickListener(new DebouncingOnClickListener() {
      @Override
      public void doClick(View p0) {
        target.onViewClicked(p0);
      }
    });
    target.etSetYourName = Utils.findRequiredViewAsType(source, R.id.et_set_your_name, "field 'etSetYourName'", EditText.class);
    target.ivProfile = Utils.findRequiredViewAsType(source, R.id.iv_profile, "field 'ivProfile'", ImageView.class);
    view = Utils.findRequiredView(source, R.id.btn_add_image, "field 'btnAddImage' and method 'onViewClicked'");
    target.btnAddImage = Utils.castView(view, R.id.btn_add_image, "field 'btnAddImage'", ImageView.class);
    view7f090031 = view;
    view.setOnClickListener(new DebouncingOnClickListener() {
      @Override
      public void doClick(View p0) {
        target.onViewClicked(p0);
      }
    });
    view = Utils.findRequiredView(source, R.id.btn_save, "field 'btnSave' and method 'onViewClicked'");
    target.btnSave = Utils.castView(view, R.id.btn_save, "field 'btnSave'", AppCompatButton.class);
    view7f090037 = view;
    view.setOnClickListener(new DebouncingOnClickListener() {
      @Override
      public void doClick(View p0) {
        target.onViewClicked(p0);
      }
    });
    target.tvGamePlayed = Utils.findRequiredViewAsType(source, R.id.tv_game_played, "field 'tvGamePlayed'", TextView.class);
    target.tvGameWin = Utils.findRequiredViewAsType(source, R.id.tv_game_win, "field 'tvGameWin'", TextView.class);
    target.tvGameLost = Utils.findRequiredViewAsType(source, R.id.tv_game_lost, "field 'tvGameLost'", TextView.class);
    target.tvGameWinPercentage = Utils.findRequiredViewAsType(source, R.id.tv_game_win_percentage, "field 'tvGameWinPercentage'", TextView.class);
    target.adView = Utils.findRequiredViewAsType(source, R.id.adView, "field 'adView'", AdView.class);
  }

  @Override
  @CallSuper
  public void unbind() {
    ProfileActivity target = this.target;
    if (target == null) throw new IllegalStateException("Bindings already cleared.");
    this.target = null;

    target.ivToolbarBack = null;
    target.tvToolbarTitle = null;
    target.ivToolbarSound = null;
    target.commonToolbar = null;
    target.llMain = null;
    target.ivToolbarFacebook = null;
    target.etSetYourName = null;
    target.ivProfile = null;
    target.btnAddImage = null;
    target.btnSave = null;
    target.tvGamePlayed = null;
    target.tvGameWin = null;
    target.tvGameLost = null;
    target.tvGameWinPercentage = null;
    target.adView = null;

    view7f09009b.setOnClickListener(null);
    view7f09009b = null;
    view7f09009c.setOnClickListener(null);
    view7f09009c = null;
    view7f090031.setOnClickListener(null);
    view7f090031 = null;
    view7f090037.setOnClickListener(null);
    view7f090037 = null;
  }
}
