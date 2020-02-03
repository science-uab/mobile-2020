package com.example.foodappv3.l3_model;

import androidx.room.Entity;
import androidx.room.PrimaryKey;

@Entity(tableName = "foods") //Room va crea o tabela  SQLite pt aceasta clasa
public class Food
{
    @PrimaryKey(autoGenerate = true)
    private int id;

    private String name;
    private String recipe;
    private String imgUrl;
    private String prepTime,difficulty;

    public Food(String name, String imgUrl, String prepTime, String difficulty, String recipe)
    {
        this.name = name;
        this.recipe = recipe;
        this.imgUrl= imgUrl;
        this.prepTime= prepTime;
        this.difficulty = difficulty;
    }

    public int getId()
    {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getRecipe() {
        return recipe;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public String getPrepTime() {
        return prepTime;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setId(int id) {
        this.id = id;
    }
}
