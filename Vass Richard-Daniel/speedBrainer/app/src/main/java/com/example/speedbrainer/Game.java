package com.example.speedbrainer;

import androidx.appcompat.app.AppCompatActivity;

import android.app.Activity;
import android.os.Bundle;
import android.os.CountDownTimer;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import java.util.Random;
import java.util.Timer;

public class Game extends AppCompatActivity
{
    Button btnCheck;

    int result, myResult;
    int correct = 0, incorrect = 0;
    int rnd1, rnd2;

    private TextView txtCountdown;

    private CountDownTimer countDownTimer;
    private long timeLeft; // 5 seconds
    int seconds;

    boolean roundDone;

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_game);

        Thread Timer = new Thread()
        {
            public void run()
            {
                runOnUiThread(new Runnable()
                {
                    public void run()
                    {
                        timeLeft = 6000;
                        startTimer();

                        txtCountdown = (TextView) findViewById(R.id.txtCountdown);
                    }




                });
            }
        };
        Timer.start();

        Thread Calculator = new Thread()
        {
            @Override
            public void run()
            {
                setNumbersAndResult();

                // TEMPORARY RESULT CHECKER
                TextView txtCheck = (TextView) findViewById(R.id.txtResult);
                //txtCheck.setText(result + "");

                // INITIATES BUTTON AND THE VERIFYING FUNCTION
                btnCheck = (Button) findViewById(R.id.btnCheck);
                btnCheck.setOnClickListener(new View.OnClickListener()
                {
                    @Override
                    public void onClick(View v)
                    {
                        try
                        {
                            EditText txtCheck = (EditText) findViewById(R.id.txtCheck);
                            myResult = new Integer(txtCheck.getText().toString());

                            verifyCalculation(result,myResult);
                            stopTimer();
                            timeLeft = 6000;
                            startTimer();

                            randomizer();
                            setNumbersAndResult();

                            //countDownTimer.cancel();

                            txtCheck.setText("");
                        }
                        catch(Exception e)
                        {
                            Toast.makeText(getApplicationContext(),"Only numbers allowed!",Toast.LENGTH_SHORT).show();
                        }
                    }
                });
            }

            public void verifyCalculation(int r1, int r2)
            {

                if(r1 == r2)
                {
                    TextView txtCheck = (TextView) findViewById(R.id.txtResult);
                    txtCheck.setText("CORRECT");
                    correct += 1;
                    TextView txtCorrectScore = (TextView) findViewById(R.id.txtCorrectScore);
                    txtCorrectScore.setText(correct + "");
                    roundDone = true;
                }
                else
                {
                    TextView txtCheck = (TextView) findViewById(R.id.txtResult);
                    txtCheck.setText("FALSE");
                    incorrect += 1;
                    TextView txtIncorrectScore = (TextView) findViewById(R.id.txtIncorrectScore);
                    txtIncorrectScore.setText(incorrect + "");
                    roundDone = true;
                }
            }
        };
        Calculator.start();
    }

    public void setNumbersAndResult()
    {
        randomizer();
        // FINDS THE 2 TEXTVIEWS AND SETS EACH TEXTVIEW TO A UNIQUE RANDOM NUMBER FROM THE PREVIOUS STEP
        TextView txtRndNumber1 = (TextView) findViewById(R.id.txtRndNumber1);
        txtRndNumber1.setText(rnd1 + "");
        TextView txtRndNumber2 = (TextView) findViewById(R.id.txtRndNumber2);
        txtRndNumber2.setText(rnd2 + "");
        // CALCULATES THE SUM OF THE 2 RANDOM NUMBERS
        result = rnd1 + rnd2;
    }

    public void randomizer()
    {
        // 2 RANDOM NUMBER GENERATORS FROM 0 TO 100
        Random r = new Random();
        rnd1 = r.nextInt(100 - 0) + 0;
        rnd2 = r.nextInt(100 - 0) + 0;
    }

    public void stopTimer()
    {
        countDownTimer.cancel();
    }

    public void update()
    {
        seconds = (int) timeLeft / 1000;

        String timeLeftText;
        timeLeftText = seconds + "";
        txtCountdown.setText(timeLeftText);
    }

    public void startTimer()
    {
        roundDone = false;
        countDownTimer = new CountDownTimer(timeLeft, 1000)
        {
            @Override
            public void onTick(long millisUntilFinished)
            {
                timeLeft = millisUntilFinished;
                update();
                if(roundDone == true)
                {
                    stopTimer();
                    countDownTimer.cancel();
                    //timeLeft = 6000;
                    startTimer();
                }
            }

            @Override
            public void onFinish()
            {
                TextView txtCheck = (TextView) findViewById(R.id.txtResult);
                txtCheck.setText("EXPIRED");
                stopTimer();
                TextView txtIncorrectScore = (TextView) findViewById(R.id.txtIncorrectScore);
                incorrect += 1;
                txtIncorrectScore.setText(incorrect + "");
                countDownTimer.cancel();
                timeLeft = 6000;
                startTimer();
                setNumbersAndResult();
            }
        }.start();
    }
}