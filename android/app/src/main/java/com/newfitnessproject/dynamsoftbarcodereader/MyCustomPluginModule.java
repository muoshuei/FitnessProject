package com.newfitnessproject.dynamsoftbarcodereader;

import android.content.Context;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

public class MyCustomPluginModule extends ReactContextBaseJavaModule {
    public static final String NAME = "MyCustomPlugin";

    private Context mContext;

    public MyCustomPluginModule(ReactApplicationContext context){
        super(context);
        mContext = context;
    }

    @NonNull
    @Override
    public String getName() {
        return NAME;
    }

    public double someCalculation(double h, double w){
        return h * w;
    }
}
