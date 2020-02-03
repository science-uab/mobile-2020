using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BallView : MonoBehaviour
{

    private Vector3 initialPosition;

    public event Action<Vector3> MoveInput;
    public event Action<Vector3> Died;
    public event Action<Vector3> Jump;


    public BallView Init(Vector3 initialPosition)
    {
        this.initialPosition = initialPosition;
        return this;
    }

    private void CheckBallFellOver()
    {
        if (transform.position.y <= GameManager.Deadline)
        {
            if (Died != null)
                Died(initialPosition);
        }
    }
  

    private void Update()
    {
        CheckBallFellOver();

        var acceleration = new Vector3();

        acceleration = Input.acceleration;
        acceleration *= 7f;


        if (MoveInput != null)
            MoveInput(acceleration);


        if (Input.touchCount > 0 )
        {
            Jump(acceleration);

        }
    }
}