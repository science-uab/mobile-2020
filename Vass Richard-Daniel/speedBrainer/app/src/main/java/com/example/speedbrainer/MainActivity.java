package com.example.speedbrainer;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class MainActivity extends AppCompatActivity
{
    private Button btnStart, btnQuit;

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        btnStart = (Button) findViewById(R.id.btnStart);
        btnStart.setOnClickListener(new View.OnClickListener()
        {
            @Override
            public void onClick(View v)
            {
                openCalculating();
            }
        });

        btnQuit = (Button) findViewById(R.id.btnQuit);
        btnQuit.setOnClickListener(new View.OnClickListener()
        {
            @Override
            public void onClick(View v)
            {
                exitApplication();
            }
        });
    }

        public void openCalculating()
        {
            Intent intent = new Intent(this, Game.class);
            startActivity(intent);
        }

        public void exitApplication()
        {
            finish();
            System.exit(0);
        }
}





