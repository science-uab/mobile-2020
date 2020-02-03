// Generated code from Butter Knife. Do not modify!
package com.dotsandboxes.activities;

import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;
import androidx.annotation.CallSuper;
import androidx.annotation.UiThread;
import androidx.appcompat.widget.AppCompatButton;
import androidx.appcompat.widget.Toolbar;
import butterknife.Unbinder;
import butterknife.internal.DebouncingOnClickListener;
import butterknife.internal.Utils;
import com.dotsandboxes.R;
import java.lang.IllegalStateException;
import java.lang.Override;

public class ConnectToFacebookActivity_ViewBinding implements Unbinder {
  private ConnectToFacebookActivity target;

  private View view7f09009b;

  private View view7f090032;

  @UiThread
  public ConnectToFacebookActivity_ViewBinding(ConnectToFacebookActivity target) {
    this(target, target.getWindow().getDecorView());
  }

  @UiThread
  public ConnectToFacebookActivity_ViewBinding(final ConnectToFacebookActivity target,
      View source) {
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
    target.ivToolbarFacebook = Utils.findRequiredViewAsType(source, R.id.iv_toolbar_facebook, "field 'ivToolbarFacebook'", ImageView.class);
    target.commonToolbar = Utils.findRequiredViewAsType(source, R.id.common_toolbar, "field 'commonToolbar'", Toolbar.class);
    view = Utils.findRequiredView(source, R.id.btn_connect_to_facebook, "field 'btnConnectToFacebook' and method 'onViewClicked'");
    target.btnConnectToFacebook = Utils.castView(view, R.id.btn_connect_to_facebook, "field 'btnConnectToFacebook'", AppCompatButton.class);
    view7f090032 = view;
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
    ConnectToFacebookActivity target = this.target;
    if (target == null) throw new IllegalStateException("Bindings already cleared.");
    this.target = null;

    target.ivToolbarBack = null;
    target.tvToolbarTitle = null;
    target.ivToolbarSound = null;
    target.ivToolbarFacebook = null;
    target.commonToolbar = null;
    target.btnConnectToFacebook = null;

    view7f09009b.setOnClickListener(null);
    view7f09009b = null;
    view7f090032.setOnClickListener(null);
    view7f090032 = null;
  }
}
