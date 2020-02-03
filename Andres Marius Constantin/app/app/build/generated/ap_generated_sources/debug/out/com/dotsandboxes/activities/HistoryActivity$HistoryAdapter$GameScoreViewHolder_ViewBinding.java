// Generated code from Butter Knife. Do not modify!
package com.dotsandboxes.activities;

import android.view.View;
import android.widget.TextView;
import androidx.annotation.CallSuper;
import androidx.annotation.UiThread;
import butterknife.Unbinder;
import butterknife.internal.Utils;
import com.dotsandboxes.R;
import java.lang.IllegalStateException;
import java.lang.Override;

public class HistoryActivity$HistoryAdapter$GameScoreViewHolder_ViewBinding implements Unbinder {
  private HistoryActivity.HistoryAdapter.GameScoreViewHolder target;

  @UiThread
  public HistoryActivity$HistoryAdapter$GameScoreViewHolder_ViewBinding(
      HistoryActivity.HistoryAdapter.GameScoreViewHolder target, View source) {
    this.target = target;

    target.tvGameOpponent = Utils.findRequiredViewAsType(source, R.id.tv_game_opponent, "field 'tvGameOpponent'", TextView.class);
    target.tvScoreLable = Utils.findRequiredViewAsType(source, R.id.tv_score_lable, "field 'tvScoreLable'", TextView.class);
    target.tvGameScore = Utils.findRequiredViewAsType(source, R.id.tv_game_score, "field 'tvGameScore'", TextView.class);
    target.tvGameResult = Utils.findRequiredViewAsType(source, R.id.tv_game_result, "field 'tvGameResult'", TextView.class);
    target.tvGameTime = Utils.findRequiredViewAsType(source, R.id.tv_game_time, "field 'tvGameTime'", TextView.class);
  }

  @Override
  @CallSuper
  public void unbind() {
    HistoryActivity.HistoryAdapter.GameScoreViewHolder target = this.target;
    if (target == null) throw new IllegalStateException("Bindings already cleared.");
    this.target = null;

    target.tvGameOpponent = null;
    target.tvScoreLable = null;
    target.tvGameScore = null;
    target.tvGameResult = null;
    target.tvGameTime = null;
  }
}
