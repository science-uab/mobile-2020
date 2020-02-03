using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BallController : MonoBehaviour
{
    private BallModel model;
    private BallView view;
   

    public void Init() {
        model = GetComponent<BallModel>();
        view = GetComponent<BallView>();

        view.MoveInput += OnInput;
        view.Died += OnDeath;
        view.Jump += OnJump;
    }

    private void OnDeath(Vector3 position) {
        model.Die(position);
    }

    private void OnJump(Vector3 position)
    {
        model.Jump(position);
    }

    private void OnInput(Vector3 input) {
        model.Move(RestrictToHorizontal(input));
    }

    private Vector3 RestrictToHorizontal(Vector3 force) {
        return Quaternion.Euler(90, 0, 0) * force;
    }
}