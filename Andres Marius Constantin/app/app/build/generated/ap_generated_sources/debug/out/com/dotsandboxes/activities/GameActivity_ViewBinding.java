// Generated code from Butter Knife. Do not modify!
package com.dotsandboxes.activities;

import android.view.View;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.TextView;
import androidx.annotation.CallSuper;
import androidx.annotation.UiThread;
import androidx.appcompat.widget.Toolbar;
import butterknife.Unbinder;
import butterknife.internal.DebouncingOnClickListener;
import butterknife.internal.Utils;
import com.dotsandboxes.R;
import com.google.android.gms.ads.AdView;
import java.lang.IllegalStateException;
import java.lang.Override;

public class GameActivity_ViewBinding implements Unbinder {
  private GameActivity target;

  private View view7f09009b;

  private View view7f09009f;

  private View view7f0900a0;

  private View view7f09009d;

  private View view7f09009e;

  @UiThread
  public GameActivity_ViewBinding(GameActivity target) {
    this(target, target.getWindow().getDecorView());
  }

  @UiThread
  public GameActivity_ViewBinding(final GameActivity target, View source) {
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
    view = Utils.findRequiredView(source, R.id.iv_toolbar_sound, "field 'ivToolbarSound' and method 'onViewClicked'");
    target.ivToolbarSound = Utils.castView(view, R.id.iv_toolbar_sound, "field 'ivToolbarSound'", ImageView.class);
    view7f09009f = view;
    view.setOnClickListener(new DebouncingOnClickListener() {
      @Override
      public void doClick(View p0) {
        target.onViewClicked(p0);
      }
    });
    target.commonToolbar = Utils.findRequiredViewAsType(source, R.id.common_toolbar, "field 'commonToolbar'", Toolbar.class);
    view = Utils.findRequiredView(source, R.id.iv_toolbar_vibrate, "field 'ivToolbarVibrate' and method 'onViewClicked'");
    target.ivToolbarVibrate = Utils.castView(view, R.id.iv_toolbar_vibrate, "field 'ivToolbarVibrate'", ImageView.class);
    view7f0900a0 = view;
    view.setOnClickListener(new DebouncingOnClickListener() {
      @Override
      public void doClick(View p0) {
        target.onViewClicked(p0);
      }
    });
    view = Utils.findRequiredView(source, R.id.iv_toolbar_music, "field 'ivToolbarMusic' and method 'onViewClicked'");
    target.ivToolbarMusic = Utils.castView(view, R.id.iv_toolbar_music, "field 'ivToolbarMusic'", ImageView.class);
    view7f09009d = view;
    view.setOnClickListener(new DebouncingOnClickListener() {
      @Override
      public void doClick(View p0) {
        target.onViewClicked(p0);
      }
    });
    target.content = Utils.findRequiredViewAsType(source, R.id.content, "field 'content'", FrameLayout.class);
    target.adView = Utils.findRequiredViewAsType(source, R.id.adView, "field 'adView'", AdView.class);
    view = Utils.findRequiredView(source, R.id.iv_toolbar_setting, "field 'ivToolbarSetting' and method 'onViewClicked'");
    target.ivToolbarSetting = Utils.castView(view, R.id.iv_toolbar_setting, "field 'ivToolbarSetting'", ImageView.class);
    view7f09009e = view;
    view.setOnClickListener(new DebouncingOnClickListener() {
      @Override
      public void doClick(View p0) {
        target.onViewClicked(p0);
      }
    });
  }

  @Override
  @CallSuper
  public void unbind() {
    GameActivity target = this.target;
    if (target == null) throw new IllegalStateException("Bindings already cleared.");
    this.target = null;

    target.ivToolbarBack = null;
    target.tvToolbarTitle = null;
    target.ivToolbarSound = null;
    target.commonToolbar = null;
    target.ivToolbarVibrate = null;
    target.ivToolbarMusic = null;
    target.content = null;
    target.adView = null;
    target.ivToolbarSetting = null;

    view7f09009b.setOnClickListener(null);
    view7f09009b = null;
    view7f09009f.setOnClickListener(null);
    view7f09009f = null;
    view7f0900a0.setOnClickListener(null);
    view7f0900a0 = null;
    view7f09009d.setOnClickListener(null);
    view7f09009d = null;
    view7f09009e.setOnClickListener(null);
    view7f09009e = null;
  }
}
