package com.example.foodappv3.l1_view;


import android.content.Intent;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.bumptech.glide.Glide;
import com.example.foodappv3.R;



public class CheckItemActivity extends AppCompatActivity        //activitate/view cand utilizatorul
{                                                               // apasa pe o reteta

    int id,itemPosition;
    String imgUrl, recipeName, recipe, prepTime, difficulty;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_checkitem);
        GetInfo();
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu)
    {
        MenuInflater menuInflater = getMenuInflater();
        menuInflater.inflate(R.menu.check_item_menu, menu);
        return super.onCreateOptionsMenu(menu);
    }

    private void GetInfo()
    {
        if(getIntent().hasExtra("id") && getIntent().hasExtra("recipe")
                && getIntent().hasExtra("recipeName") && getIntent().hasExtra("item_position"))
        {
            id=getIntent().getIntExtra("id",0);
            imgUrl=getIntent().getStringExtra("imgUrl");
            recipeName = getIntent().getStringExtra("recipeName");
            recipe=getIntent().getStringExtra("recipe");
            prepTime=getIntent().getStringExtra("prepTime");
            difficulty=getIntent().getStringExtra("difficulty");
            itemPosition=getIntent().getIntExtra("item_position",0);

            PrepareView(imgUrl,recipe,recipeName,prepTime,difficulty);
        }
    }

    private void PrepareView(String imgUrl,String recipe, String recipeName,String prepTime,String difficulty)
    {
        setTitle(recipeName);
        ImageView recipeImage = findViewById(R.id.recipe_image);
        TextView recipeTxt = findViewById(R.id.recipe_description);
        TextView recipeTitleTxt = findViewById(R.id.recipe_name);
        TextView recipeDurTxt = findViewById(R.id.recipe_duration);
        TextView recipeDiffTxt = findViewById(R.id.recipe_difficulty);

        Glide.with(this)
                .asBitmap()
                .load(imgUrl)
                .into(recipeImage);

        recipeTitleTxt.setText(recipeName);
        recipeTxt.setText(recipe);
        recipeDurTxt.setText("Timp preparare: "+prepTime);
        recipeDiffTxt.setText("Dificultate: "+difficulty);


    }

    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        switch (item.getItemId()) {
            case R.id.delete_item:
                DeleteItem();
                return true;
            case R.id.edit_item:
                EditItem();
                return true;
            default:
                return super.onOptionsItemSelected(item);
        }

    }

    private void DeleteItem()
    {
        Intent intent = new Intent(CheckItemActivity.this,MainActivity.class);
        intent.putExtra("item_position",itemPosition);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        startActivity(intent);
    }

    private void EditItem()
    {
        Intent intent = new Intent (CheckItemActivity.this, EditActivity.class);
        intent.putExtra("edit_id",id);
        intent.putExtra("edit_name",recipeName);
        intent.putExtra("edit_URL",imgUrl);
        intent.putExtra("edit_time",prepTime);
        intent.putExtra("edit_diff",difficulty);
        intent.putExtra("edit_recipe",recipe);
        startActivity(intent);
    }

}
