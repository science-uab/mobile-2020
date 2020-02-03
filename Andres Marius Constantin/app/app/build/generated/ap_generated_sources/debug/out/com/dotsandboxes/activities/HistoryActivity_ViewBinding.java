// Generated code from Butter Knife. Do not modify!
package com.dotsandboxes.activities;

import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import androidx.annotation.CallSuper;
import androidx.annotation.UiThread;
import androidx.appcompat.widget.Toolbar;
import androidx.recyclerview.widget.RecyclerView;
import butterknife.Unbinder;
import butterknife.internal.DebouncingOnClickListener;
import butterknife.internal.Utils;
import com.dotsandboxes.R;
import com.google.android.gms.ads.AdView;
import java.lang.IllegalStateException;
import java.lang.Override;

public class HistoryActivity_ViewBinding implements Unbinder {
  private HistoryActivity target;

  private View view7f09009b;

  @UiThread
  public HistoryActivity_ViewBinding(HistoryActivity target) {
    this(target, target.getWindow().getDecorView());
  }

  @UiThread
  public HistoryActivity_ViewBinding(final HistoryActivity target, View source) {
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
    target.commonToolbar = Utils.findRequiredViewAsType(source, R.id.common_toolbar, "field 'commonToolbar'", Toolbar.class);
    target.recyclerView = Utils.findRequiredViewAsType(source, R.id.recycler_view, "field 'recyclerView'", RecyclerView.class);
    target.ivToolbarFacebook = Utils.findRequiredViewAsType(source, R.id.iv_toolbar_facebook, "field 'ivToolbarFacebook'", ImageView.class);
    target.adView = Utils.findRequiredViewAsType(source, R.id.adView, "field 'adView'", AdView.class);
    target.llNoHistory = Utils.findRequiredViewAsType(source, R.id.ll_no_history, "field 'llNoHistory'", LinearLayout.class);
  }

  @Override
  @CallSuper
  public void unbind() {
    HistoryActivity target = this.target;
    if (target == null) throw new IllegalStateException("Bindings already cleared.");
    this.target = null;

    target.ivToolbarBack = null;
    target.tvToolbarTitle = null;
    target.ivToolbarSound = null;
    target.commonToolbar = null;
    target.recyclerView = null;
    target.ivToolbarFacebook = null;
    target.adView = null;
    target.llNoHistory = null;

    view7f09009b.setOnClickListener(null);
    view7f09009b = null;
  }
}
