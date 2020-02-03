using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CameraController : MonoBehaviour
{
    private Dispatcher dispatcher;
    [SerializeField] private Vector3 offset = new Vector3(0f, 5f, -10f);
    private BallView target;

    private void Awake() {
        this.dispatcher = Dispatcher.Instance;

        dispatcher.Subscribe("ball_spawned", OnBallSpawned);
    }

    private void OnDestroy() {
        dispatcher.Unsubscribe("ball_spawned", OnBallSpawned);
    }

    private void OnBallSpawned(object e)
    {
        this.target = (BallView)e;
    }

    private void LateUpdate() {
        if(target == null)
            return;

        transform.position = target.transform.position + offset;
    }
}