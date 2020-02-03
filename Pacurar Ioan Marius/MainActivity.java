package com.example.myapplication;

import android.content.Context;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.ListView;

import java.util.ArrayList;
import java.util.List;

import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity implements ToDoListener {

    List<String> toDoList;
    ArrayAdapter arrayAdapter;
    ListView listView;
    EditText editText;
    ToDoRepo toDoRepo;

    @Override
    public void onToDoSaved(List<String> list) {
        toDoList.clear();
        toDoList.addAll(list);
        arrayAdapter.notifyDataSetChanged();
    }

    @Override
    public void toDosList(List<String> list) {
        toDoList.clear();
        toDoList.addAll(list);
        arrayAdapter.notifyDataSetChanged();
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        toDoRepo = new ToDoRepo(getApplication().getSharedPreferences("todos", Context.MODE_PRIVATE));
        toDoList = new ArrayList<>();
        arrayAdapter = new ArrayAdapter<>(this, R.layout.list_view_layout, toDoList);
        listView = findViewById(R.id.id_list_view);
        listView.setAdapter(arrayAdapter);
        editText = findViewById(R.id.id_edit_text);
        toDoRepo.getAllToDos(this);
    }

    public void addItemToList(View view) {
        toDoRepo.saveToDo(editText.getText()
                .toString(), this);
        editText.setText("");
    }
}