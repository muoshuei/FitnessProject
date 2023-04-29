package com.newfitnessproject.mycustom;

import android.content.Context;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.google.mlkit.vision.pose.PoseLandmark;


import java.security.Policy;
import java.util.List;

public class MyCustomPluginModule extends ReactContextBaseJavaModule {
    public static final String NAME = "MyCustomPlugin";

    private Context mContext;
    private MyImageAnalyzer mAnalyzer;

    public MyCustomPluginModule(ReactApplicationContext context) {
        super(context);
        mContext = context;
        mAnalyzer = new MyImageAnalyzer();
        mAnalyzer.setPoseDetector();
    }

    public MyImageAnalyzer getmAnalyzer(){
        return mAnalyzer;
    }


    @NonNull
    @Override
    public String getName() {
        return NAME;
    }

    public List<PoseLandmark> getLandmarkList() {
        return mAnalyzer.landmarkList;
    }
}
