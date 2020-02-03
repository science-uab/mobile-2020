// Generated code from Butter Knife. Do not modify!
package com.dotsandboxes.fragments;

import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;
import androidx.annotation.CallSuper;
import androidx.annotation.UiThread;
import butterknife.Unbinder;
import butterknife.internal.DebouncingOnClickListener;
import butterknife.internal.Utils;
import com.dotsandboxes.R;
import java.lang.IllegalStateException;
import java.lang.Override;

public class ChooseTurnFragment_ViewBinding implements Unbinder {
  private ChooseTurnFragment target;

  private View view7f09008d;

  private View view7f090091;

  @UiThread
  public ChooseTurnFragment_ViewBinding(final ChooseTurnFragment target, View source) {
    this.target = target;

    View view;
    view = Utils.findRequiredView(source, R.id.img_player_1, "field 'imgPlayer1' and method 'onViewClicked'");
    target.imgPlayer1 = Utils.castView(view, R.id.img_player_1, "field 'imgPlayer1'", ImageView.class);
    view7f09008d = view;
    view.setOnClickListener(new DebouncingOnClickListener() {
      @Override
      public void doClick(View p0) {
        target.onViewClicked(p0);
      }
    });
    view = Utils.findRequiredView(source, R.id.img_player_2, "field 'imgPlayer2' and method 'onViewClicked'");
    target.imgPlayer2 = Utils.castView(view, R.id.img_player_2, "field 'imgPlayer2'", ImageView.class);
    view7f090091 = view;
    view.setOnClickListener(new DebouncingOnClickListener() {
      @Override
      public void doClick(View p0) {
        target.onViewClicked(p0);
      }
    });
    target.tvPlayer1Name = Utils.findRequiredViewAsType(source, R.id.tv_player_1_name, "field 'tvPlayer1Name'", TextView.class);
    target.tvPlayer2Name = Utils.findRequiredViewAsType(source, R.id.tv_player_2_name, "field 'tvPlayer2Name'", TextView.class);
  }

  @Override
  @CallSuper
  public void unbind() {
    ChooseTurnFragment target = this.target;
    if (target == null) throw new IllegalStateException("Bindings already cleared.");
    this.target = null;

    target.imgPlayer1 = null;
    target.imgPlayer2 = null;
    target.tvPlayer1Name = null;
    target.tvPlayer2Name = null;

    view7f09008d.setOnClickListener(null);
    view7f09008d = null;
    view7f090091.setOnClickListener(null);
    view7f090091 = null;
  }
}
