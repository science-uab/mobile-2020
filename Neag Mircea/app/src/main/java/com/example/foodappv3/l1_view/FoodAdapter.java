package com.example.foodappv3.l1_view;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Filter;
import android.widget.Filterable;
import android.widget.RelativeLayout;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.example.foodappv3.l3_model.Food;
import com.example.foodappv3.R;

import java.util.ArrayList;
import java.util.List;

import de.hdodenhof.circleimageview.CircleImageView;

public class FoodAdapter extends RecyclerView.Adapter<FoodAdapter.Holder> //FoodAdapter preia datele din obiecte
        implements Filterable                                                      //Food si le afiseaza in RecyclerView
{
    private List<Food> foodList =new ArrayList<>();
    private List<Food> foodListCopy;
    private Context context;



    public FoodAdapter(Context context)
    {
        this.context=context;
    }

    class Holder extends RecyclerView.ViewHolder
    {
        private CircleImageView circleImageView;
        private TextView foodName;
        private TextView prepTime;
        private TextView difficulty;
        private RelativeLayout itemParent; // cuprinde fiecare item in recyclerview


        public Holder(@NonNull View itemView) {
            super(itemView);
            circleImageView = itemView.findViewById(R.id.circle_image);
            foodName = itemView.findViewById(R.id.name);
            prepTime = itemView.findViewById(R.id.duration);
            difficulty = itemView.findViewById(R.id.difficulty);
            itemParent = itemView.findViewById(R.id.item_parent);


        }
    }


    @NonNull
    @Override
    public Holder onCreateViewHolder(@NonNull ViewGroup parent, int viewType)//holder "tine" datele in recycleView
    {
        View itemView = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.food_list_item,parent,false);

        return new Holder(itemView);
    }

    @Override
    public void onBindViewHolder(@NonNull Holder holder, final int position)//face legatura intre data obiect si data view
    {
        final Food currentItem = foodList.get(position);

        Glide.with(context)
                .asBitmap()
                .load(currentItem.getImgUrl())
                .into(holder.circleImageView);

        holder.foodName.setText(currentItem.getName());
        holder.prepTime.setText("timp preparare: "+currentItem.getPrepTime());
        holder.difficulty.setText("dificultate: "+currentItem.getDifficulty());

        holder.itemParent.setOnClickListener(new View.OnClickListener() //cand apasam pe un item
        {
            @Override
            public void onClick(View v)
            {
                Intent intent = new Intent(context, CheckItemActivity.class); //trimitem info catre al doilea view
                intent.putExtra("id",currentItem.getId());
                intent.putExtra("imgUrl",currentItem.getImgUrl());
                intent.putExtra("recipe",currentItem.getRecipe());
                intent.putExtra("recipeName",currentItem.getName());
                intent.putExtra("prepTime",currentItem.getPrepTime());
                intent.putExtra("difficulty",currentItem.getDifficulty());
                intent.putExtra("item_position",position);            //pt a putea identifica pt stergere
                context.startActivity(intent);                              //trecem la un alt view
            }
        });


    }

    @Override
    public int getItemCount()
    {
        return foodList.size();
    }

    public void setFoods(List<Food> foodList) //obtinem lista de date in view
    {
        this.foodList = foodList;
        foodListCopy = new ArrayList<>(foodList); //copie folosita de searchbar
        notifyDataSetChanged();                  //anunta modificarea datelor
    }


    public Food getItemAtPos(int pos)
    {
        return foodList.get(pos);
    }

    @Override
    public Filter getFilter()                   //metoda a interfetei Filter
    {
        return filter;
    }

    private Filter filter = new Filter() {
        @Override                                /*input din searchbar*/
        protected FilterResults performFiltering(CharSequence constraint) //are loc intr-un alt thread decat
        {                                                                 //cel principal
            List<Food> foodListFiltered = new ArrayList<>();

            if(constraint.length()==0 || constraint == null)              //nimic in seachbar
            {
                foodListFiltered.addAll(foodListCopy);                  //punem toate elementele in lista
            }

            else
            {
                String filterText = constraint.toString().toLowerCase().trim();

                for(int i = 0; i<foodListCopy.size();i++)           //verificam pt fiecare element daca se{                                                   //potriveste cu textul din filter
                {
                    if(foodListCopy.get(i).getName().toLowerCase().contains(filterText))
                    {
                        foodListFiltered.add(foodListCopy.get(i));  //si il adaugam in lista filtrata
                    }
                }
            }

            FilterResults result = new FilterResults();
            result.values = foodListFiltered;
            return result;
        }

        @Override
        protected void publishResults(CharSequence constraint, FilterResults results) //performFiltering trimite
        {                                                                            //rezultatul la publishRes
            foodList.clear();   //facem loc pentru lista filtrata                   //iar pubResult updateaza UI
            foodList.addAll((List)results.values);
            notifyDataSetChanged();
        }
    };
}
