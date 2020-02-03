using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class GameManager : MonoBehaviour
{
    [SerializeField] private GameObject ballPrefab;
    private BallView ball;
    private Dispatcher dispatcher;
    private Vector3 initialPosition = new Vector3(0f, 2f, -3.2f);
    public static float Deadline = -5f;

    public static int CurrentLevel { get; private set; }
    public static int Lives { get; private set; }
    public static int Score { get; private set; }
    public static int FinalScore { get; private set; }

    public static GameManager Instance { get; private set; }

    private void Awake() {
        if(Instance == null) {
            Instance = this;
            DontDestroyOnLoad(Instance);
        } else if(Instance != this) {
            Destroy(gameObject);
            return;
        }

        if(dispatcher == null)
            dispatcher = Dispatcher.Instance;

        SceneManager.sceneLoaded += (scene, mode) => {
            if(scene.name != "Meniu" && scene.name != "Final")
                StartGame();
        };

        dispatcher.Subscribe("back_to_menu", (Action<object>)((e) => {
            ResetGame();
            SceneManager.LoadScene("Meniu");
        }));

        dispatcher.Subscribe("coin_touched", (Action<object>)((e) => {
            GameManager.Score++;
        }));

        dispatcher.Subscribe("next_level", (Action<object>)((e) => {
            CurrentLevel++;
            if(CurrentLevel == 0) {
                SceneManager.LoadScene("Meniu");
                ResetGame();
            }
            else if(CurrentLevel < 3)
                SceneManager.LoadScene("Level" + CurrentLevel.ToString());
            else
                SceneManager.LoadScene("Final");
        }));

        dispatcher.Subscribe("start_game", (e) => {
            CurrentLevel = 0;
            SceneManager.LoadScene("Level0");
        });

        dispatcher.Subscribe("start_tutorial", (e) => {
            CurrentLevel = -1;
            SceneManager.LoadScene("Tutorial");
        });

        ResetGame();
    }

    private void OnDied_Ball(Vector3 position) {
        Lives--;

        if(Lives == 0) {
            SceneManager.LoadScene("Meniu");
            ResetGame();
        }
    }

    private void StartGame() {
        var obj = Instantiate(ballPrefab, initialPosition, Quaternion.identity);
        obj.GetComponent<BallModel>();
        ball = obj.GetComponent<BallView>().Init(initialPosition);
        ball.Died += OnDied_Ball;
        obj.GetComponent<BallController>().Init();

        dispatcher.Notify("ball_spawned", ball);
    }

    private void ResetGame() {
        Lives = 3;
        Score = 0;
        FinalScore = 0;
        CurrentLevel = 0;
        if(ball != null)
            Destroy(ball.gameObject);
    }
}