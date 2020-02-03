// Generated code from Butter Knife. Do not modify!
package com.dotsandboxes.fragments;

import android.view.View;
import android.widget.EditText;
import android.widget.LinearLayout;
import androidx.annotation.CallSuper;
import androidx.annotation.UiThread;
import butterknife.Unbinder;
import butterknife.internal.DebouncingOnClickListener;
import butterknife.internal.Utils;
import com.dotsandboxes.R;
import java.lang.IllegalStateException;
import java.lang.Override;

public class PlayerNameFragment_ViewBinding implements Unbinder {
  private PlayerNameFragment target;

  private View view7f0900b2;

  @UiThread
  public PlayerNameFragment_ViewBinding(final PlayerNameFragment target, View source) {
    this.target = target;

    View view;
    target.edtPlayer1Name = Utils.findRequiredViewAsType(source, R.id.edt_player_1_name, "field 'edtPlayer1Name'", EditText.class);
    target.edtPlayer2Name = Utils.findRequiredViewAsType(source, R.id.edt_player_2_name, "field 'edtPlayer2Name'", EditText.class);
    view = Utils.findRequiredView(source, R.id.ll_play, "field 'llPlay' and method 'onViewClicked'");
    target.llPlay = Utils.castView(view, R.id.ll_play, "field 'llPlay'", LinearLayout.class);
    view7f0900b2 = view;
    view.setOnClickListener(new DebouncingOnClickListener() {
      @Override
      public void doClick(View p0) {
        target.onViewClicked();
      }
    });
  }

  @Override
  @CallSuper
  public void unbind() {
    PlayerNameFragment target = this.target;
    if (target == null) throw new IllegalStateException("Bindings already cleared.");
    this.target = null;

    target.edtPlayer1Name = null;
    target.edtPlayer2Name = null;
    target.llPlay = null;

    view7f0900b2.setOnClickListener(null);
    view7f0900b2 = null;
  }
}
