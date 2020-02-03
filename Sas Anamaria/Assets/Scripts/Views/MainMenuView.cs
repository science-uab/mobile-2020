using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MainMenuView : MonoBehaviour
{
    private Dispatcher dispatcher;
    
    private void Awake() {
        dispatcher = Dispatcher.Instance;
    }

    public void OnClicked_Play() {
        dispatcher.Notify("start_game", null);
    }

    public void OnClicked_Tutorial() {
        dispatcher.Notify("start_tutorial", null);
    }

    public void OnClicked_Menu() {
        dispatcher.Notify("back_to_menu", null);
    }

    public void OnClicked_Quit() {
        Application.Quit();
    }
}