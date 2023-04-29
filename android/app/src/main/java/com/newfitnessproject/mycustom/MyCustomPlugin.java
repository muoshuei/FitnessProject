package com.newfitnessproject.mycustom;

import static java.lang.Math.atan2;

import androidx.camera.core.ImageProxy;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.google.mlkit.vision.pose.PoseLandmark;
import com.mrousavy.camera.frameprocessor.FrameProcessorPlugin;

import java.util.List;

public class MyCustomPlugin extends FrameProcessorPlugin {
  MyCustomPluginModule myModule;

  @Override
  @androidx.camera.core.ExperimentalGetImage
  public Object callback(ImageProxy image, Object[] params) {
    // code goes here

    WritableNativeMap map = new WritableNativeMap();
    myModule.getmAnalyzer().analyze(image);
    List<PoseLandmark> landmarks = myModule.getLandmarkList();

    if(landmarks.size() == 0) return map;

    WritableNativeMap leftArm = getCoordAndAngle(
            landmarks.get(PoseLandmark.LEFT_SHOULDER),
            landmarks.get(PoseLandmark.LEFT_ELBOW),
            landmarks.get(PoseLandmark.LEFT_WRIST)
    );
    WritableNativeMap rightArm = getCoordAndAngle(
            landmarks.get(PoseLandmark.RIGHT_SHOULDER),
            landmarks.get(PoseLandmark.RIGHT_ELBOW),
            landmarks.get(PoseLandmark.RIGHT_WRIST)
    );
//    PoseLandmark leftShoulder = pose.getPoseLandmark(PoseLandmark.LEFT_SHOULDER); 11
//    PoseLandmark rightShoulder = pose.getPoseLandmark(PoseLandmark.RIGHT_SHOULDER); 12
//    PoseLandmark leftElbow = pose.getPoseLandmark(PoseLandmark.LEFT_ELBOW); 13
//    PoseLandmark rightElbow = pose.getPoseLandmark(PoseLandmark.RIGHT_ELBOW); 14
//    PoseLandmark leftWrist = pose.getPoseLandmark(PoseLandmark.LEFT_WRIST); 15
//    PoseLandmark rightWrist = pose.getPoseLandmark(PoseLandmark.RIGHT_WRIST); 16

/* Note: 
 * Do not uses WritableNativeArray as return object or 
 * even put one inside a WritableNativeMap.
 * WNMaps and WNArray would both become Objects in javascript-end, but 
 * WNArray will not have proper indices to access through, whereas 
 * WNMaps can simply uses key names.
*/
    map.putInt("landmarkListLength", landmarks.size());
    map.putMap("leftArm", leftArm);
    map.putMap("rightArm", rightArm);
    return map;
  }
  private WritableNativeMap getCoordAndAngle(PoseLandmark shoulder, PoseLandmark elbow, PoseLandmark wrist){
    WritableNativeMap writableNativeMap = new WritableNativeMap();
    double shoulderX = shoulder.getPosition().x;
    double shoulderY = shoulder.getPosition().y;
    double elbowX = elbow.getPosition().x;
    double elbowY = elbow.getPosition().y;
    double wristX = wrist.getPosition().x;
    double wristY = wrist.getPosition().y;
    double degrees =
            Math.toDegrees(
                    atan2(wristY - elbowY, wristX - elbowX) - atan2(shoulderY- elbowY, shoulderX - elbowX)
            );
    degrees = Math.abs(degrees); // Angle should never be negative
    if (degrees > 180) {
      degrees = (360.0 - degrees); // Always get the acute representation of the angle
    }
    writableNativeMap.putDouble("angle",degrees);
    writableNativeMap.putDouble("shoulderX", shoulderX);
    writableNativeMap.putDouble("shoulderY", shoulderY);
    writableNativeMap.putDouble("elbowX", elbowX);
    writableNativeMap.putDouble("elbowY", elbowY);
    writableNativeMap.putDouble("wristX", wristX);
    writableNativeMap.putDouble("wristY", wristY);
    return writableNativeMap;
  }
  public MyCustomPlugin(MyCustomPluginModule module) {
    super("decode");
    myModule = module;
  }
}