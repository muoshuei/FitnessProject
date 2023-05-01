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

//    WritableNativeMap leftArm = getCoordAndAngle(
//            landmarks.get(PoseLandmark.LEFT_SHOULDER),
//            landmarks.get(PoseLandmark.LEFT_ELBOW),
//            landmarks.get(PoseLandmark.LEFT_WRIST)
//    );
//    WritableNativeMap rightArm = getCoordAndAngle(
//            landmarks.get(PoseLandmark.RIGHT_SHOULDER),
//            landmarks.get(PoseLandmark.RIGHT_ELBOW),
//            landmarks.get(PoseLandmark.RIGHT_WRIST)
//    );
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
//    map.putInt("landmarkListLength", landmarks.size());
//    map.putMap("leftArm", leftArm);
//    map.putMap("rightArm", rightArm);
    WritableNativeMap leftArm = calculateAngle(
            landmarks.get(PoseLandmark.LEFT_SHOULDER),
            landmarks.get(PoseLandmark.LEFT_ELBOW),
            landmarks.get(PoseLandmark.LEFT_WRIST)
    );
    WritableNativeMap rightArm = calculateAngle(
            landmarks.get(PoseLandmark.RIGHT_SHOULDER),
            landmarks.get(PoseLandmark.RIGHT_ELBOW),
            landmarks.get(PoseLandmark.RIGHT_WRIST)
    );

    WritableNativeMap leftBack = calculateAngle(
            landmarks.get(PoseLandmark.LEFT_SHOULDER),
            landmarks.get(PoseLandmark.LEFT_HIP),
            landmarks.get(PoseLandmark.LEFT_KNEE)
    );

    WritableNativeMap rightBack = calculateAngle(
            landmarks.get(PoseLandmark.RIGHT_SHOULDER),
            landmarks.get(PoseLandmark.RIGHT_HIP),
            landmarks.get(PoseLandmark.RIGHT_KNEE)
    );
    map.putInt("landmarkListLength", landmarks.size());
    map.putMap("leftArm", leftArm);
    map.putMap("rightArm", rightArm);
    map.putMap("leftBack", leftBack);
    map.putMap("rightBack", rightBack);
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
  private WritableNativeMap calculateAngle(PoseLandmark joint1, PoseLandmark joint2, PoseLandmark joint3) {
    WritableNativeMap writableNativeMap = new WritableNativeMap();
    double joint1X = joint1.getPosition3D().getX();
    double joint1Y = joint1.getPosition3D().getY();
    double joint1Z = joint1.getPosition3D().getZ();
    double joint2X = joint2.getPosition3D().getX();
    double joint2Y = joint2.getPosition3D().getY();
    double joint2Z = joint2.getPosition3D().getZ();
    double joint3X = joint3.getPosition3D().getX();
    double joint3Y = joint3.getPosition3D().getY();
    double joint3Z = joint3.getPosition3D().getZ();

    double[] vector1 = {joint2X - joint1X, joint2Y - joint1Y, joint2Z - joint1Z};
    double[] vector2 = {joint2X - joint3X, joint2Y - joint3Y, joint2Z - joint3Z};

    double dotProduct = dotProduct(vector1, vector2);
    double magnitudeProduct = magnitude(vector1) * magnitude(vector2);
    double angleRadians = Math.acos(dotProduct / magnitudeProduct);
    double degrees = Math.toDegrees(angleRadians);

    writableNativeMap.putDouble("angle", degrees);
    writableNativeMap.putDouble("joint1X", joint1X);
    writableNativeMap.putDouble("joint1Y", joint1Y);
    writableNativeMap.putDouble("joint1Z", joint1Z);
    writableNativeMap.putDouble("joint2X", joint2X);
    writableNativeMap.putDouble("joint2Y", joint2Y);
    writableNativeMap.putDouble("joint2Z", joint2Z);
    writableNativeMap.putDouble("joint3X", joint3X);
    writableNativeMap.putDouble("joint3Y", joint3Y);
    writableNativeMap.putDouble("joint3Z", joint3Z);

    return writableNativeMap;
  }
  private double dotProduct(double[] vec1, double[] vec2) {
    return vec1[0] * vec2[0] + vec1[1] * vec2[1] + vec1[2] * vec2[2];
  }

  private double magnitude(double[] vec) {
    return Math.sqrt(vec[0] * vec[0] + vec[1] * vec[1] + vec[2] * vec[2]);
  }
}