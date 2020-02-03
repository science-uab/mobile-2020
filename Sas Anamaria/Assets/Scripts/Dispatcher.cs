using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Dispatcher : MonoBehaviour
{
    private readonly Dictionary<string, Action<object>> handlers = new Dictionary<string, Action<object>>();
    public static Dispatcher Instance { get; private set; }

    private void Awake() {
        if(Instance == null) {
            Instance = this;
            DontDestroyOnLoad(Instance);
        } else if(Instance != this) {
            Destroy(gameObject);
        }
    }

    public void Subscribe(string ev, Action<object> callback) {
        if(handlers.ContainsKey(ev))
            handlers[ev] += callback;
        else
            handlers.Add(ev, callback);
    }

    public void Notify(string ev, object message) {
        if(handlers.ContainsKey(ev) && handlers[ev] != null) 
            handlers[ev].Invoke(message);
    }

    public void Unsubscribe(string ev, Action<object> callback) {
        if(handlers.ContainsKey(ev))
            handlers[ev] -= callback;
    }
}