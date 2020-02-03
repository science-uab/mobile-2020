// Generated code from Butter Knife. Do not modify!
package com.dotsandboxes.activities;

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
import com.google.android.gms.ads.AdView;
import java.lang.IllegalStateException;
import java.lang.Override;

public class MainActivity_ViewBinding implements Unbinder {
  private MainActivity target;

  private View view7f090039;

  private View view7f090036;

  private View view7f0900b0;

  private View view7f0900ae;

  private View view7f0900af;

  private View view7f090033;

  private View view7f090038;

  private View view7f090034;

  private View view7f0900ab;

  private View view7f090035;

  private View view7f09003b;

  @UiThread
  public MainActivity_ViewBinding(MainActivity target) {
    this(target, target.getWindow().getDecorView());
  }

  @UiThread
  public MainActivity_ViewBinding(final MainActivity target, View source) {
    this.target = target;

    View view;
    view = Utils.findRequiredView(source, R.id.btn_share, "field 'btnShare' and method 'onViewClicked'");
    target.btnShare = Utils.castView(view, R.id.btn_share, "field 'btnShare'", ImageView.class);
    view7f090039 = view;
    view.setOnClickListener(new DebouncingOnClickListener() {
      @Override
      public void doClick(View p0) {
        target.onViewClicked(p0);
      }
    });
    view = Utils.findRequiredView(source, R.id.btn_profile, "field 'btnProfile' and method 'onViewClicked'");
    target.btnProfile = Utils.castView(view, R.id.btn_profile, "field 'btnProfile'", ImageView.class);
    view7f090036 = view;
    view.setOnClickListener(new DebouncingOnClickListener() {
      @Override
      public void doClick(View p0) {
        target.onViewClicked(p0);
      }
    });
    view = Utils.findRequiredView(source, R.id.ll_me_vs_robot, "field 'llMeVsRobot' and method 'onViewClicked'");
    target.llMeVsRobot = Utils.castView(view, R.id.ll_me_vs_robot, "field 'llMeVsRobot'", LinearLayout.class);
    view7f0900b0 = view;
    view.setOnClickListener(new DebouncingOnClickListener() {
      @Override
      public void doClick(View p0) {
        target.onViewClicked(p0);
      }
    });
    view = Utils.findRequiredView(source, R.id.ll_me_vs_friend, "field 'llMeVsFriend' and method 'onViewClicked'");
    target.llMeVsFriend = Utils.castView(view, R.id.ll_me_vs_friend, "field 'llMeVsFriend'", LinearLayout.class);
    view7f0900ae = view;
    view.setOnClickListener(new DebouncingOnClickListener() {
      @Override
      public void doClick(View p0) {
        target.onViewClicked(p0);
      }
    });
    view = Utils.findRequiredView(source, R.id.ll_me_vs_online, "field 'llMeVsOnline' and method 'onViewClicked'");
    target.llMeVsOnline = Utils.castView(view, R.id.ll_me_vs_online, "field 'llMeVsOnline'", LinearLayout.class);
    view7f0900af = view;
    view.setOnClickListener(new DebouncingOnClickListener() {
      @Override
      public void doClick(View p0) {
        target.onViewClicked(p0);
      }
    });
    view = Utils.findRequiredView(source, R.id.btn_history, "field 'btnHistory' and method 'onViewClicked'");
    target.btnHistory = Utils.castView(view, R.id.btn_history, "field 'btnHistory'", ImageView.class);
    view7f090033 = view;
    view.setOnClickListener(new DebouncingOnClickListener() {
      @Override
      public void doClick(View p0) {
        target.onViewClicked(p0);
      }
    });
    view = Utils.findRequiredView(source, R.id.btn_setting, "field 'btnSetting' and method 'onViewClicked'");
    target.btnSetting = Utils.castView(view, R.id.btn_setting, "field 'btnSetting'", ImageView.class);
    view7f090038 = view;
    view.setOnClickListener(new DebouncingOnClickListener() {
      @Override
      public void doClick(View p0) {
        target.onViewClicked(p0);
      }
    });
    view = Utils.findRequiredView(source, R.id.btn_how_to, "field 'btnHowTo' and method 'onViewClicked'");
    target.btnHowTo = Utils.castView(view, R.id.btn_how_to, "field 'btnHowTo'", ImageView.class);
    view7f090034 = view;
    view.setOnClickListener(new DebouncingOnClickListener() {
      @Override
      public void doClick(View p0) {
        target.onViewClicked(p0);
      }
    });
    target.tvSelectedGrid = Utils.findRequiredViewAsType(source, R.id.tv_selected_grid, "field 'tvSelectedGrid'", TextView.class);
    view = Utils.findRequiredView(source, R.id.ll_grid_size, "field 'llGridSize' and method 'onViewClicked'");
    target.llGridSize = Utils.castView(view, R.id.ll_grid_size, "field 'llGridSize'", LinearLayout.class);
    view7f0900ab = view;
    view.setOnClickListener(new DebouncingOnClickListener() {
      @Override
      public void doClick(View p0) {
        target.onViewClicked(p0);
      }
    });
    target.imgPlayer1NameVsRobot = Utils.findRequiredViewAsType(source, R.id.img_player_1_name_vs_robot, "field 'imgPlayer1NameVsRobot'", ImageView.class);
    target.tvPlayer1NameVsRobot = Utils.findRequiredViewAsType(source, R.id.tv_player_1_name_vs_robot, "field 'tvPlayer1NameVsRobot'", TextView.class);
    target.imgPlayer1NameVsFriend = Utils.findRequiredViewAsType(source, R.id.img_player_1_name_vs_friend, "field 'imgPlayer1NameVsFriend'", ImageView.class);
    target.tvPlayer1NameVsFriend = Utils.findRequiredViewAsType(source, R.id.tv_player_1_name_vs_friend, "field 'tvPlayer1NameVsFriend'", TextView.class);
    target.imgPlayer1NameVsOnlineFriend = Utils.findRequiredViewAsType(source, R.id.img_player_1_name_vs_online_friend, "field 'imgPlayer1NameVsOnlineFriend'", ImageView.class);
    target.tvPlayer1NameVsOnlineFriend = Utils.findRequiredViewAsType(source, R.id.tv_player_1_name_vs_online_friend, "field 'tvPlayer1NameVsOnlineFriend'", TextView.class);
    target.imgPlayer2NameVsRobot = Utils.findRequiredViewAsType(source, R.id.img_player_2_name_vs_robot, "field 'imgPlayer2NameVsRobot'", ImageView.class);
    target.tvPlayer2NameVsRobot = Utils.findRequiredViewAsType(source, R.id.tv_player_2_name_vs_robot, "field 'tvPlayer2NameVsRobot'", TextView.class);
    target.imgPlayer2NameVsFriend = Utils.findRequiredViewAsType(source, R.id.img_player_2_name_vs_friend, "field 'imgPlayer2NameVsFriend'", ImageView.class);
    target.tvPlayer2NameVsFriend = Utils.findRequiredViewAsType(source, R.id.tv_player_2_name_vs_friend, "field 'tvPlayer2NameVsFriend'", TextView.class);
    target.imgPlayer2NameVsOnlineFriend = Utils.findRequiredViewAsType(source, R.id.img_player_2_name_vs_online_friend, "field 'imgPlayer2NameVsOnlineFriend'", ImageView.class);
    target.tvPlayer2NameVsOnlineFriend = Utils.findRequiredViewAsType(source, R.id.tv_player_2_name_vs_online_friend, "field 'tvPlayer2NameVsOnlineFriend'", TextView.class);
    target.llChooseGridSize = Utils.findRequiredViewAsType(source, R.id.ll_choose_grid_size, "field 'llChooseGridSize'", LinearLayout.class);
    target.llChooseGameType = Utils.findRequiredViewAsType(source, R.id.ll_choose_game_type, "field 'llChooseGameType'", LinearLayout.class);
    view = Utils.findRequiredView(source, R.id.btn_music, "field 'btnMusic' and method 'onViewClicked'");
    target.btnMusic = Utils.castView(view, R.id.btn_music, "field 'btnMusic'", ImageView.class);
    view7f090035 = view;
    view.setOnClickListener(new DebouncingOnClickListener() {
      @Override
      public void doClick(View p0) {
        target.onViewClicked(p0);
      }
    });
    target.adView = Utils.findRequiredViewAsType(source, R.id.adView, "field 'adView'", AdView.class);
    view = Utils.findRequiredView(source, R.id.button_sign_in, "method 'onViewClicked'");
    view7f09003b = view;
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
    MainActivity target = this.target;
    if (target == null) throw new IllegalStateException("Bindings already cleared.");
    this.target = null;

    target.btnShare = null;
    target.btnProfile = null;
    target.llMeVsRobot = null;
    target.llMeVsFriend = null;
    target.llMeVsOnline = null;
    target.btnHistory = null;
    target.btnSetting = null;
    target.btnHowTo = null;
    target.tvSelectedGrid = null;
    target.llGridSize = null;
    target.imgPlayer1NameVsRobot = null;
    target.tvPlayer1NameVsRobot = null;
    target.imgPlayer1NameVsFriend = null;
    target.tvPlayer1NameVsFriend = null;
    target.imgPlayer1NameVsOnlineFriend = null;
    target.tvPlayer1NameVsOnlineFriend = null;
    target.imgPlayer2NameVsRobot = null;
    target.tvPlayer2NameVsRobot = null;
    target.imgPlayer2NameVsFriend = null;
    target.tvPlayer2NameVsFriend = null;
    target.imgPlayer2NameVsOnlineFriend = null;
    target.tvPlayer2NameVsOnlineFriend = null;
    target.llChooseGridSize = null;
    target.llChooseGameType = null;
    target.btnMusic = null;
    target.adView = null;

    view7f090039.setOnClickListener(null);
    view7f090039 = null;
    view7f090036.setOnClickListener(null);
    view7f090036 = null;
    view7f0900b0.setOnClickListener(null);
    view7f0900b0 = null;
    view7f0900ae.setOnClickListener(null);
    view7f0900ae = null;
    view7f0900af.setOnClickListener(null);
    view7f0900af = null;
    view7f090033.setOnClickListener(null);
    view7f090033 = null;
    view7f090038.setOnClickListener(null);
    view7f090038 = null;
    view7f090034.setOnClickListener(null);
    view7f090034 = null;
    view7f0900ab.setOnClickListener(null);
    view7f0900ab = null;
    view7f090035.setOnClickListener(null);
    view7f090035 = null;
    view7f09003b.setOnClickListener(null);
    view7f09003b = null;
  }
}
