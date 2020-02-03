// Generated code from Butter Knife. Do not modify!
package com.dotsandboxes.fragments;

import android.view.View;
import android.widget.TextView;
import androidx.annotation.CallSuper;
import androidx.annotation.UiThread;
import butterknife.Unbinder;
import butterknife.internal.DebouncingOnClickListener;
import butterknife.internal.Utils;
import com.dotsandboxes.R;
import java.lang.IllegalStateException;
import java.lang.Override;

public class GameRequestFragment_ViewBinding implements Unbinder {
  private GameRequestFragment target;

  private View view7f090131;

  private View view7f09013d;

  @UiThread
  public GameRequestFragment_ViewBinding(final GameRequestFragment target, View source) {
    this.target = target;

    View view;
    target.tvRequest = Utils.findRequiredViewAsType(source, R.id.tv_request, "field 'tvRequest'", TextView.class);
    target.timer = Utils.findRequiredViewAsType(source, R.id.timer, "field 'timer'", TextView.class);
    view = Utils.findRequiredView(source, R.id.tv_cancel, "field 'tvCancel' and method 'onViewClicked'");
    target.tvCancel = Utils.castView(view, R.id.tv_cancel, "field 'tvCancel'", TextView.class);
    view7f090131 = view;
    view.setOnClickListener(new DebouncingOnClickListener() {
      @Override
      public void doClick(View p0) {
        target.onViewClicked(p0);
      }
    });
    view = Utils.findRequiredView(source, R.id.tv_play, "field 'tvPlay' and method 'onViewClicked'");
    target.tvPlay = Utils.castView(view, R.id.tv_play, "field 'tvPlay'", TextView.class);
    view7f09013d = view;
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
    GameRequestFragment target = this.target;
    if (target == null) throw new IllegalStateException("Bindings already cleared.");
    this.target = null;

    target.tvRequest = null;
    target.timer = null;
    target.tvCancel = null;
    target.tvPlay = null;

    view7f090131.setOnClickListener(null);
    view7f090131 = null;
    view7f09013d.setOnClickListener(null);
    view7f09013d = null;
  }
}
