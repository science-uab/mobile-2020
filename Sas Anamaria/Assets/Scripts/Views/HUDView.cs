using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class HUDView : MonoBehaviour
{
    [SerializeField] private Text lives;
    [SerializeField] private Text score;
    
    private Dispatcher dispatcher;

    private void Awake() {
        dispatcher = Dispatcher.Instance;
    }

    public void OnClicked_Menu() {
        dispatcher.Notify("back_to_menu", null);
    }

    private void Update() {
        lives.text = "Lives: " + GameManager.Lives.ToString();
        score.text = "Score: " + GameManager.Score.ToString();
    }
}