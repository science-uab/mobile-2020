package com.example.foodappv3.l2_viewmodel;

import android.app.Application;

import androidx.annotation.NonNull;
import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;

import com.example.foodappv3.l3_model.Food;
import com.example.foodappv3.l3_model.Repository;

import java.util.List;

public class ViewModel extends AndroidViewModel //viewmodel interactioneaza cu repos si salveaza datele in cache
{

    private Repository repository;
    private LiveData<List<Food>> allFood; //datele in lista ca si livedata pt a putea fi observabile


    public ViewModel(@NonNull Application application)
    {
        super(application);
        repository = new Repository(application);
        allFood = repository.getAllFood();

    }


    public void insert(Food food)       //medtode puse la dispozitie de ViewModel pentru View/Activitate
    {
        repository.insert(food);
    }

    public void update(Food food)
    {
        repository.update(food);
    }

    public void delete(Food food)
    {
        repository.delete(food);
    }

    public LiveData<List<Food>> getAllFood()
    {
        return allFood;
    }
}
