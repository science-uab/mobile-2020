package com.example.number;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;
import 	android.os.Handler;


public class MainActivity extends AppCompatActivity {

    Button buttonL;
    Button buttonR;
    DataModel model;

    int points = 0;
    TextView result;
    TextView message;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        model = new DataModel();
        buttonL = findViewById(R.id.buttonL);
        buttonL.setText(Integer.toString(model.getNum1()));

        buttonR = findViewById(R.id.buttonR);
        buttonR.setText(Integer.toString(model.getNum2()));

        result = findViewById(R.id.numberOFpoints);
        message = findViewById(R.id.txtresult);

        message.setText("");

    }

    public void onClick(View view) {

        //check the instance of the button
        Button temp = (Button) view;
        //get text from the button title
        String txt = (String) temp.getText();
        //get the right answer from the model and convert to String
        String answer = Integer.toString(model.getAnswer());

        if (txt.equals(answer)) {
            message.setText("CORRECT");
            //Toast.makeText(this, "CORRECT", Toast.LENGTH_SHORT).show();
            points++;
            result.setText("Points: " + points);
            Handler handler = new Handler();
            handler.postDelayed(new Runnable() {
                @Override
                public void run() {
                    message.setText("");
                }
            }, 1000);

            if (points == 5) {
                handler.postDelayed(new Runnable() {
                    @Override
                    public void run() {
                        message.setText("YOU WIN THE GAME");
                    }
                }, 2000);

                //Toast.makeText(this, "YOU WIN THE GAME", Toast.LENGTH_SHORT).show();
                points = 0;

                handler.postDelayed(new Runnable() {
                    @Override
                    public void run() {
                        result.setText("Points: " + points);
                        message.setText("");
                    }
                }, 3000);
                // result.setText("Points: " + points);
            }

        } else {
            if (points == 0) {
                message.setText("NOT CORRECT");
                //Toast.makeText(this, "NOT CORRECT", Toast.LENGTH_SHORT).show();
                result.setText("Points: " + points);
                Handler handler = new Handler();
                handler.postDelayed(new Runnable() {
                    @Override
                    public void run() {
                        message.setText("");
                    }
                }, 1000);

            } else {
                message.setText("NOT CORRECT");
                //Toast.makeText(this, "NOT CORRECT", Toast.LENGTH_SHORT).show();
                points--;
                result.setText("Points: " + points);
                Handler handler = new Handler();
                handler.postDelayed(new Runnable() {
                    @Override
                    public void run() {
                        message.setText("");
                    }
                }, 1000);
            }
        }

        model.setNum1();
        while(true)
        {
            model.setNum2();
            if (model.getNum1() != model.getNum2()) break;
        }

        model.setAnswer();
        buttonL.setText(Integer.toString(model.getNum1()));
        buttonR.setText(Integer.toString(model.getNum2()));

    }
}
