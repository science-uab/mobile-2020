package com.example.foodappv3.l3_model;

import android.content.Context;
import android.os.AsyncTask;

import androidx.annotation.NonNull;
import androidx.room.Database;
import androidx.room.Room;
import androidx.room.RoomDatabase;
import androidx.sqlite.db.SupportSQLiteDatabase;


@Database(entities = {Food.class},version = 1)//entities-tabele db
public abstract class DataBase extends RoomDatabase
{
    private static DataBase instance; //avem nevoie de o singura instanta a DB => singleton

    public abstract FoodDao foodDao(); // pt a accesa metodele foodDao, implementat de Room

    public static synchronized DataBase getInstance(Context context) //sync - un singur thread va putea
    {                                                               // accesa instanta bd-ului


        if(instance == null)
        {
            instance = Room.databaseBuilder(context.getApplicationContext(),DataBase.class,"foodDB")
                    .fallbackToDestructiveMigration()
                    .addCallback(callback)                   //la schimbare db sterge db
                    .build();                               //si o creeaza din nou
        }

        return instance;


    }

    private static RoomDatabase.Callback callback = new RoomDatabase.Callback() //pt a popula db dupa creare
    {
        @Override
        public void onCreate(@NonNull SupportSQLiteDatabase db)
        {
            super.onCreate(db);
            new InsertDBAsync(instance).execute();
        }
    };


    private static class InsertDBAsync extends AsyncTask<Void, Void, Void>
    {
        private FoodDao foodDao;

        private InsertDBAsync(DataBase db)
        {
            foodDao=db.foodDao();
        }

        @Override
        protected Void doInBackground(Void... voids)
        {
            foodDao.insertAll(FoodData.FoodRows()); //FoodRows - metoda statica din FoodData care intoarce
            return null;                            // un array de instante Food
        }
    }


}
