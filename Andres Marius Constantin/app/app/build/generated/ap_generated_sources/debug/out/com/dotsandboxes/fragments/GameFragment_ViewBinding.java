// Generated code from Butter Knife. Do not modify!
package com.dotsandboxes.fragments;

import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import androidx.annotation.CallSuper;
import androidx.annotation.UiThread;
import butterknife.Unbinder;
import butterknife.internal.Utils;
import com.dotsandboxes.R;
import com.dotsandboxes.views.BoardView;
import java.lang.IllegalStateException;
import java.lang.Override;

public class GameFragment_ViewBinding implements Unbinder {
  private GameFragment target;

  @UiThread
  public GameFragment_ViewBinding(GameFragment target, View source) {
    this.target = target;

    target.tvPlayer1Score = Utils.findRequiredViewAsType(source, R.id.tv_player_1_score, "field 'tvPlayer1Score'", TextView.class);
    target.tvPlayer2Score = Utils.findRequiredViewAsType(source, R.id.tv_player_2_score, "field 'tvPlayer2Score'", TextView.class);
    target.tvTuenText = Utils.findRequiredViewAsType(source, R.id.tv_tuen_text, "field 'tvTuenText'", TextView.class);
    target.boardView = Utils.findRequiredViewAsType(source, R.id.boardView, "field 'boardView'", BoardView.class);
    target.imgPlayer1 = Utils.findRequiredViewAsType(source, R.id.img_player1, "field 'imgPlayer1'", ImageView.class);
    target.tvPlayer1Name = Utils.findRequiredViewAsType(source, R.id.tv_player_1_name, "field 'tvPlayer1Name'", TextView.class);
    target.llPlayer1 = Utils.findRequiredViewAsType(source, R.id.ll_player1, "field 'llPlayer1'", LinearLayout.class);
    target.tvPlayer2Name = Utils.findRequiredViewAsType(source, R.id.tv_player_2_name, "field 'tvPlayer2Name'", TextView.class);
    target.imgPlayer2 = Utils.findRequiredViewAsType(source, R.id.img_player2, "field 'imgPlayer2'", ImageView.class);
    target.llPlayer2 = Utils.findRequiredViewAsType(source, R.id.ll_player2, "field 'llPlayer2'", LinearLayout.class);
  }

  @Override
  @CallSuper
  public void unbind() {
    GameFragment target = this.target;
    if (target == null) throw new IllegalStateException("Bindings already cleared.");
    this.target = null;

    target.tvPlayer1Score = null;
    target.tvPlayer2Score = null;
    target.tvTuenText = null;
    target.boardView = null;
    target.imgPlayer1 = null;
    target.tvPlayer1Name = null;
    target.llPlayer1 = null;
    target.tvPlayer2Name = null;
    target.imgPlayer2 = null;
    target.llPlayer2 = null;
  }
}
