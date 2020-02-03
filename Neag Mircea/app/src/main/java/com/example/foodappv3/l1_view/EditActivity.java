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

public class EditActivity extends AppCompatActivity {

    private EditText editTitle, editURL, editDifficulty, editDuration, editRecipe;
    private int edit_id,edit_position;

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add);
        setTitle("Editeaza Reteta");

        editTitle = findViewById(R.id.activity_add_title);
        editURL = findViewById(R.id.activity_add_URL);
        editDifficulty = findViewById(R.id.activity_add_difficulty);
        editDuration = findViewById(R.id.activity_add_duration);
        editRecipe = findViewById(R.id.activity_add_recipe);

        GetInfo();
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
                EditItem();
                return true;
            default:
                return super.onOptionsItemSelected(item);
        }

    }


    private void GetInfo()
    {
        if(getIntent().hasExtra("edit_name") && getIntent().hasExtra("edit_recipe"))
        {
            editTitle.setText(getIntent().getStringExtra("edit_name"));
            editURL.setText(getIntent().getStringExtra("edit_URL"));
            editDifficulty.setText(getIntent().getStringExtra("edit_diff"));
            editDuration.setText(getIntent().getStringExtra("edit_time"));
            editRecipe.setText(getIntent().getStringExtra("edit_recipe"));

            edit_id= getIntent().getIntExtra("edit_id",0);
        }
    }

    private void EditItem()
    {

        if(editTitle.getText().toString().trim().isEmpty() || editRecipe.getText().toString().trim().isEmpty())
        {
            Toast.makeText(this, "Completati titlul si reteta", Toast.LENGTH_SHORT).show();
            return;
        }

        if(getIntent().hasExtra("edit_id"))
        {
            Intent intent = new Intent(EditActivity.this,MainActivity.class);

            intent.putExtra("update_name",editTitle.getText().toString());
            intent.putExtra("update_URL",editURL.getText().toString());
            intent.putExtra("update_time",editDuration.getText().toString());
            intent.putExtra("update_diff",editDifficulty.getText().toString());
            intent.putExtra("update_recipe",editRecipe.getText().toString());

            intent.putExtra("update_id",edit_id);
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
            startActivity(intent);
        }

    }
}
