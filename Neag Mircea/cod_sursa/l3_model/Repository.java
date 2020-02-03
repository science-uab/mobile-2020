package com.example.foodappv3.l3_model;

import android.app.Application;
import android.os.AsyncTask;

import androidx.lifecycle.LiveData;

import java.util.List;

public class Repository                     // mediu pentru sursele de date, in caz nostru este doar db
{                                           // deasemena furnizorul de informatii pt viewmodel

    private FoodDao foodDao;                //repos foloseste metode din foodDAO pt a interactiona cu bd
    private LiveData<List<Food>> allFood;   //livedata - date observabile

    public Repository(Application application)
    {
        DataBase dataBase = DataBase.getInstance(application);
        foodDao = dataBase.foodDao();
        allFood = foodDao.getAllFood();
    }

    public void insert (Food food) //executam operatiile in alt thread - async task
    {
        new InsertAsync(foodDao).execute(food);
    }

    public void update (Food food)
    {
        new UpdateAsync(foodDao).execute(food);             //repository pune la dispozitia ViewModelului
    }                                                       //aceste medote pentru interactiunea cu datele

    public void delete (Food food)
    {
        new DeleteAsync(foodDao).execute(food);
    }


    public LiveData<List<Food>> getAllFood()
    {
        return allFood;
    }


    private static class InsertAsync extends AsyncTask<Food,Void,Void>  //param,progress,return type
    {

        private FoodDao foodDao;

        private InsertAsync(FoodDao foodDao)
        {
            this.foodDao = foodDao;
        }


        @Override
        protected Void doInBackground(Food... foods)
        {
            foodDao.insert(foods[0]);// varargs
            return null;
        }


    }

    private static class UpdateAsync extends AsyncTask<Food,Void,Void>  //param,progress,return type
    {

        private FoodDao foodDao;

        private UpdateAsync(FoodDao foodDao)
        {
            this.foodDao = foodDao;
        }


        @Override
        protected Void doInBackground(Food... foods)
        {
            foodDao.update(foods[0]);// varargs
            return null;
        }


    }

    private static class DeleteAsync extends AsyncTask<Food,Void,Void>  //param,progress,return type
    {

        private FoodDao foodDao;

        private DeleteAsync(FoodDao foodDao)
        {
            this.foodDao=foodDao;
        }


        @Override
        protected Void doInBackground(Food... foods)
        {
            foodDao.delete(foods[0]);// varargs
            return null;
        }


    }

}
