package com.example.number;

import java.util.Random;

public class DataModel {

    private int num1;
    private int num2;
    private int answer;

    Random random = new Random();

    public DataModel(int num1, int num2, int answer) {

        this.num1 = random.nextInt(100);
        this.num2 = random.nextInt(100);
        this.answer = Math.max(this.num1, this.num2);
    }

    public DataModel() {

        this.num1 = random.nextInt(100);

        while(true)
        {
            this.num2 = random.nextInt(100);
            if (num1 != num2) break;
        }

        this.answer = Math.max(this.num1, this.num2);
    }

    public void setNum1() {
        this.num1 = random.nextInt(100);
    }

    public void setNum2() {
        this.num2 = random.nextInt(100);
    }

    public void setAnswer() {
        this.answer = Math.max(this.num1, this.num2);
    }

    public int getNum1() {
        return num1;
    }

    public int getNum2() {
        return num2;
    }

    public int getAnswer() {
        return answer;
    }
}
