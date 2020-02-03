package com.example.foodappv3.l1_view;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.widget.EditText;
import android.widget.Toast;

import com.example.foodappv3.R;

public class AddActivity extends AppCompatActivity
{

    private EditText addTitle, addURL, addDifficulty, addDuration, addRecipe;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add);

        setTitle("Adauga Reteta");
        addTitle = findViewById(R.id.activity_add_title);
        addURL = findViewById(R.id.activity_add_URL);
        addDifficulty = findViewById(R.id.activity_add_difficulty);
        addDuration = findViewById(R.id.activity_add_duration);
        addRecipe = findViewById(R.id.activity_add_recipe);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater menuInflater = getMenuInflater();
        menuInflater.inflate(R.menu.add_menu, menu);

        return true;
    }

    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        switch (item.getItemId()) {
            case R.id.save_item:
                SaveItem();
                return true;
            default:
                return super.onOptionsItemSelected(item);
        }

    }

    private void SaveItem()
    {
        String name = addTitle.getText().toString();
        String URL = addURL.getText().toString();
        String difficulty=addDifficulty.getText().toString();
        String duration = addDuration.getText().toString();
        String recipe = addRecipe.getText().toString();

        if(name.trim().isEmpty() ||recipe.trim().isEmpty())
        {
            Toast.makeText(this, "Completati titlul si reteta", Toast.LENGTH_SHORT).show();
            return;
        }

        Intent intent = new Intent();

        intent.putExtra("add_name",name);
        intent.putExtra("add_URL",URL);
        intent.putExtra("add_difficulty",difficulty);
        intent.putExtra("add_duration",duration);
        intent.putExtra("add_recipe",recipe);

        setResult(RESULT_OK,intent);
        finish();


    }
}
