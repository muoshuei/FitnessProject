package com.newfitnessproject.dynamsoftbarcodereader;

import androidx.camera.core.ImageProxy;
import com.facebook.react.bridge.WritableNativeArray;
import com.mrousavy.camera.frameprocessor.FrameProcessorPlugin;

public class MyCustomPlugin extends FrameProcessorPlugin {
  MyCustomPluginModule myModule;

  @Override
  public Object callback(ImageProxy image, Object[] params) {
    // code goes here
    WritableNativeArray array = new WritableNativeArray();
    double result = calculate(image);
    array.pushDouble(result);
    return array;
  }

  private double calculate(ImageProxy image) {
    double h = image.getHeight();
    double w = image.getWidth();
    return myModule.someCalculation(h, w);
  }

  public MyCustomPlugin(MyCustomPluginModule module) {
    super("decode");
    myModule = module;
  }
}