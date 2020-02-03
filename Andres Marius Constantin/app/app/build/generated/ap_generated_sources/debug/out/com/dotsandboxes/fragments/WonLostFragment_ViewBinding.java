// Generated code from Butter Knife. Do not modify!
package com.dotsandboxes.fragments;

import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import androidx.annotation.CallSuper;
import androidx.annotation.UiThread;
import butterknife.Unbinder;
import butterknife.internal.DebouncingOnClickListener;
import butterknife.internal.Utils;
import com.dotsandboxes.R;
import java.lang.IllegalStateException;
import java.lang.Override;

public class WonLostFragment_ViewBinding implements Unbinder {
  private WonLostFragment target;

  private View view7f0900b5;

  private View view7f0900ac;

  @UiThread
  public WonLostFragment_ViewBinding(final WonLostFragment target, View source) {
    this.target = target;

    View view;
    target.tvTitle = Utils.findRequiredViewAsType(source, R.id.tv_title, "field 'tvTitle'", TextView.class);
    target.imgWonPlayer = Utils.findRequiredViewAsType(source, R.id.img_won_player, "field 'imgWonPlayer'", ImageView.class);
    target.tvScore = Utils.findRequiredViewAsType(source, R.id.tv_score, "field 'tvScore'", TextView.class);
    view = Utils.findRequiredView(source, R.id.ll_restart, "field 'llRestart' and method 'onViewClicked'");
    target.llRestart = Utils.castView(view, R.id.ll_restart, "field 'llRestart'", LinearLayout.class);
    view7f0900b5 = view;
    view.setOnClickListener(new DebouncingOnClickListener() {
      @Override
      public void doClick(View p0) {
        target.onViewClicked(p0);
      }
    });
    view = Utils.findRequiredView(source, R.id.ll_home, "field 'llHome' and method 'onViewClicked'");
    target.llHome = Utils.castView(view, R.id.ll_home, "field 'llHome'", LinearLayout.class);
    view7f0900ac = view;
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
    WonLostFragment target = this.target;
    if (target == null) throw new IllegalStateException("Bindings already cleared.");
    this.target = null;

    target.tvTitle = null;
    target.imgWonPlayer = null;
    target.tvScore = null;
    target.llRestart = null;
    target.llHome = null;

    view7f0900b5.setOnClickListener(null);
    view7f0900b5 = null;
    view7f0900ac.setOnClickListener(null);
    view7f0900ac = null;
  }
}
