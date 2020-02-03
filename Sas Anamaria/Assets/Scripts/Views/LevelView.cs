using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class LevelView : MonoBehaviour
{
    private Dispatcher dispatcher;
    
    private void Awake() {
        dispatcher = Dispatcher.Instance;
    }

    private void OnTriggerEnter(Collider other) {
        var ball = other.GetComponent<BallModel>();
        if(ball != null) {
            dispatcher.Notify("next_level", null);
        }
    }
}