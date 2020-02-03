package com.example.foodappv3.l1_view;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProviders;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.widget.SearchView;
import android.widget.Toast;


import com.example.foodappv3.l3_model.Food;
import com.example.foodappv3.R;
import com.example.foodappv3.l2_viewmodel.ViewModel;
import com.google.android.material.floatingactionbutton.FloatingActionButton;

import java.util.List;

public class MainActivity extends AppCompatActivity { // View

    private ViewModel viewModel;
    private FoodAdapter adapter;

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);


        FloatingActionButton addButton = findViewById(R.id.add_button);
        addButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MainActivity.this,AddActivity.class);
                startActivityForResult(intent,1); // pt a primi input de la activitate
            }
        });


        RecyclerView recyclerView = findViewById(R.id.recycler);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        recyclerView.setHasFixedSize(true);

        adapter = new FoodAdapter(this);
        recyclerView.setAdapter(adapter);

        viewModel= ViewModelProviders.of(this).get(ViewModel.class);  //pt a nu avea mai multe viewmodeluri                                                              //un viewmodel pe care in va manageria
        viewModel.getAllFood().observe(this, new Observer<List<Food>>()
        {
            @Override
            public void onChanged(@Nullable List<Food> foods)                             //cand datele se schimba update view
            {
                adapter.setFoods(foods);
            }
        });
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu)
    {
        MenuInflater menuInflater = getMenuInflater();  //creaza un meniu din xml
        menuInflater.inflate(R.menu.app_menu,menu);

        MenuItem searchBtn = menu.findItem(R.id.search_button_top); //obtinem referinta butonului

        SearchView searchView = (SearchView) searchBtn.getActionView(); //obtinem referinta searchview-ului
        searchView.setOnQueryTextListener(new SearchView.OnQueryTextListener() //pt interactiunea cu input-ul
        {
            @Override
            public boolean onQueryTextSubmit(String query)
            {
                return false;
            }

            @Override
            public boolean onQueryTextChange(String newText)        //legam filterul de searchview
            {
                adapter.getFilter().filter(newText);
                return false;
            }
        });
        GetInfo();
        return true;
    }
                                                                //preluam datele de inserat din addAcivity
    @Override                                                   //printr-un intent
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if(requestCode == 1 && resultCode == RESULT_OK)
        {
            String name = data.getStringExtra("add_name");
            String URL = data.getStringExtra("add_URL");
            String difficulty = data.getStringExtra("add_difficulty");
            String duration = data.getStringExtra("add_duration");
            String recipe = data.getStringExtra("add_recipe");

            Food foodInstance = new Food(name,URL,duration,difficulty,recipe);
            viewModel.insert(foodInstance);

            Toast.makeText(this, "Reteta a fost adaugata", Toast.LENGTH_SHORT).show();
        }
    }

    private void GetInfo()
    {
        if(getIntent().hasExtra("item_position"))
        {
            viewModel.delete(adapter.getItemAtPos(getIntent().getIntExtra("item_position",0)));
            Toast.makeText(this, "Se sterge reteta...", Toast.LENGTH_SHORT).show();
        }

        if(getIntent().hasExtra("update_id"))
        {
            Food uFood = new Food(getIntent().getStringExtra("update_name"), getIntent().getStringExtra("update_URL"),
                    getIntent().getStringExtra("update_time"),getIntent().getStringExtra("update_diff"),
                    getIntent().getStringExtra("update_recipe"));

            uFood.setId(getIntent().getIntExtra("update_id",0));

            viewModel.update(uFood);
            Toast.makeText(this, "Modificat cu succes", Toast.LENGTH_SHORT).show();
        }
    }
}
