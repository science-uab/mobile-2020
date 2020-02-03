package com.example.myapplication;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import android.content.SharedPreferences;
import android.os.AsyncTask;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class ToDoRepo {

    private SharedPreferences preferences;

    public ToDoRepo(SharedPreferences preferences) {
        this.preferences = preferences;
    }

    public void getAllToDos(ToDoListener listener) {
        new GetAsyncTask(listener, preferences).execute();
    }

    public void saveToDo(String toDo, ToDoListener listener) {
        new SaveAsyncTask(listener, preferences).execute(toDo);
    }
}

interface ToDoListener {

    void onToDoSaved(List<String> list);

    void toDosList(List<String> list);
}

class GetAsyncTask extends AsyncTask<Void, Void, List<String>> {

    private ToDoListener listener;
    private SharedPreferences preferences;

    public GetAsyncTask(ToDoListener listener, SharedPreferences preferences) {
        this.listener = listener;
        this.preferences = preferences;
    }

    @Override
    protected List<String> doInBackground(Void... voids) {
        List<String> list = new ArrayList<>();
        String stringList = preferences.getString("todos", null);
        if (stringList != null) {
            Type listType = new TypeToken<ArrayList<String>>() {}.getType();
            list.addAll((Collection<? extends String>) new Gson().fromJson(stringList, listType));
        }
        return list;
    }

    @Override
    protected void onPostExecute(List<String> strings) {
        super.onPostExecute(strings);
        listener.toDosList(strings);
    }
}

class SaveAsyncTask extends AsyncTask<String, Void, List<String>> {

    private ToDoListener listener;
    private SharedPreferences preferences;

    public SaveAsyncTask(ToDoListener listener, SharedPreferences preferences) {
        this.listener = listener;
        this.preferences = preferences;
    }

    @Override
    protected List<String> doInBackground(String... todos) {
        List<String> list = new ArrayList<>();
        String stringList = preferences.getString("todos", null);
        if (stringList != null) {
            Type listType = new TypeToken<ArrayList<String>>() {}.getType();
            list.addAll((Collection<? extends String>) new Gson().fromJson(stringList, listType));
        }
        list.add(todos[0]);
        preferences.edit()
                .putString("todos", new Gson().toJson(list))
                .commit();
        return list;
    }

    @Override
    protected void onPostExecute(List<String> strings) {
        super.onPostExecute(strings);
        listener.onToDoSaved(strings);
    }
}