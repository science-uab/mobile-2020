// Generated code from Butter Knife. Do not modify!
package com.dotsandboxes.activities;

import android.view.View;
import android.webkit.WebView;
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

public class PrivacyActivity_ViewBinding implements Unbinder {
  private PrivacyActivity target;

  private View view7f09009b;

  @UiThread
  public PrivacyActivity_ViewBinding(PrivacyActivity target) {
    this(target, target.getWindow().getDecorView());
  }

  @UiThread
  public PrivacyActivity_ViewBinding(final PrivacyActivity target, View source) {
    this.target = target;

    View view;
    view = Utils.findRequiredView(source, R.id.iv_toolbar_back, "field 'ivToolbarBack' and method 'onViewClicked'");
    target.ivToolbarBack = Utils.castView(view, R.id.iv_toolbar_back, "field 'ivToolbarBack'", ImageView.class);
    view7f09009b = view;
    view.setOnClickListener(new DebouncingOnClickListener() {
      @Override
      public void doClick(View p0) {
        target.onViewClicked();
      }
    });
    target.tvToolbarTitle = Utils.findRequiredViewAsType(source, R.id.tv_toolbar_title, "field 'tvToolbarTitle'", TextView.class);
    target.ivToolbarSound = Utils.findRequiredViewAsType(source, R.id.iv_toolbar_sound, "field 'ivToolbarSound'", ImageView.class);
    target.ivToolbarFacebook = Utils.findRequiredViewAsType(source, R.id.iv_toolbar_facebook, "field 'ivToolbarFacebook'", ImageView.class);
    target.commonToolbar = Utils.findRequiredViewAsType(source, R.id.common_toolbar, "field 'commonToolbar'", Toolbar.class);
    target.wvHowTo = Utils.findRequiredViewAsType(source, R.id.wv_privacy_policy, "field 'wvHowTo'", WebView.class);
    target.adView = Utils.findRequiredViewAsType(source, R.id.adView, "field 'adView'", AdView.class);
  }

  @Override
  @CallSuper
  public void unbind() {
    PrivacyActivity target = this.target;
    if (target == null) throw new IllegalStateException("Bindings already cleared.");
    this.target = null;

    target.ivToolbarBack = null;
    target.tvToolbarTitle = null;
    target.ivToolbarSound = null;
    target.ivToolbarFacebook = null;
    target.commonToolbar = null;
    target.wvHowTo = null;
    target.adView = null;

    view7f09009b.setOnClickListener(null);
    view7f09009b = null;
  }
}
