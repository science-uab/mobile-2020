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

public class ResultFragment_ViewBinding implements Unbinder {
  private ResultFragment target;

  private View view7f0900b5;

  private View view7f0900ac;

  @UiThread
  public ResultFragment_ViewBinding(final ResultFragment target, View source) {
    this.target = target;

    View view;
    target.tvWonPlayerResult = Utils.findRequiredViewAsType(source, R.id.tv_won_player_result, "field 'tvWonPlayerResult'", TextView.class);
    target.imgWonPlayer = Utils.findRequiredViewAsType(source, R.id.img_won_player, "field 'imgWonPlayer'", ImageView.class);
    target.tvWonPlayerName = Utils.findRequiredViewAsType(source, R.id.tv_won_player_name, "field 'tvWonPlayerName'", TextView.class);
    target.tvWonPlayerScore = Utils.findRequiredViewAsType(source, R.id.tv_won_player_score, "field 'tvWonPlayerScore'", TextView.class);
    target.tvLostPlayerResult = Utils.findRequiredViewAsType(source, R.id.tv_lost_player_result, "field 'tvLostPlayerResult'", TextView.class);
    target.imgLostPlayer = Utils.findRequiredViewAsType(source, R.id.img_lost_player, "field 'imgLostPlayer'", ImageView.class);
    target.tvLostPlayerName = Utils.findRequiredViewAsType(source, R.id.tv_lost_player_name, "field 'tvLostPlayerName'", TextView.class);
    target.tvLostPlayerScore = Utils.findRequiredViewAsType(source, R.id.tv_lost_player_score, "field 'tvLostPlayerScore'", TextView.class);
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
    ResultFragment target = this.target;
    if (target == null) throw new IllegalStateException("Bindings already cleared.");
    this.target = null;

    target.tvWonPlayerResult = null;
    target.imgWonPlayer = null;
    target.tvWonPlayerName = null;
    target.tvWonPlayerScore = null;
    target.tvLostPlayerResult = null;
    target.imgLostPlayer = null;
    target.tvLostPlayerName = null;
    target.tvLostPlayerScore = null;
    target.llRestart = null;
    target.llHome = null;

    view7f0900b5.setOnClickListener(null);
    view7f0900b5 = null;
    view7f0900ac.setOnClickListener(null);
    view7f0900ac = null;
  }
}
