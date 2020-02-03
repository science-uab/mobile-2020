using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CoinView : MonoBehaviour
{
    [SerializeField] private GameObject vfx;
    private Dispatcher dispatcher;
    
    private void Awake() {
        dispatcher = Dispatcher.Instance;
    }

    private void OnTriggerEnter(Collider other) {
        var ball = other.GetComponent<BallModel>();
        if(ball != null) {
            gameObject.SetActive(false);

            if(vfx != null) {
                var eff = Instantiate(vfx, transform.position, transform.rotation);
		        Destroy(eff.gameObject, 3);
            }
            
            dispatcher.Notify("coin_touched", null);
        }
    }
}