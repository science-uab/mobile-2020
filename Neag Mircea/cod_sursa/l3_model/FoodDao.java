package com.example.foodappv3.l3_model;

import androidx.lifecycle.LiveData;
import androidx.room.Dao;
import androidx.room.Delete;
import androidx.room.Insert;
import androidx.room.Query;
import androidx.room.Update;


import java.util.List;

@Dao
public interface FoodDao //Data Acces Objects -Room va implementa codul interfetei cu comenzi SQL
{
    @Insert
    void insert(Food food);

    @Insert
    void insertAll(Food[] food);

    @Update
    void update(Food food);

    @Delete
    void delete(Food food);

    @Query("SELECT * FROM foods ORDER BY name ASC")
    LiveData<List<Food>> getAllFood(); //livedata - date observabile - daca se schimba datele se schimba
                                        //si reprezentare in view/activity

}
