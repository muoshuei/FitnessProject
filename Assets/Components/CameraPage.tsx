import * as REA from 'react-native-reanimated'
import React from 'react';
import {
    StyleSheet,
    Text,
    View
  } from 'react-native';
import { useCameraDevices, Camera, useFrameProcessor, } from 'react-native-vision-camera';

import type { Frame } from 'react-native-vision-camera'
import type {MyObject} from './Types'
import SvgLayer from './SvgLayer';

/**
 * Process image to landmark points and others.
 */
export function decode(frame: Frame): MyObject {
  'worklet'
  return __decode(frame);
}
var rendered = true;
const CameraPage = ({navigation}:any) => {

    const [hasPermission, setHasPermission] = React.useState(false);
    const [poseresults, setPoseResults] = React.useState({} as MyObject);
    const [[width, height], setWidthHeight] = React.useState([0,0]);
    const devices = useCameraDevices();
    // console.log(Camera.getAvailableCameraDevices());
    const device = devices.back;

    const frameProcessor = useFrameProcessor((frame) => {
      'worklet'
      console.log("FrameProcessor Loaded");
      const results : MyObject = decode(frame);
      // console.log(typeof(results.landmarkListLength));
      // console.log(results.landmarkListLength);
      // console.log(typeof(results.leftArm));
      // console.log(Object.keys(results.leftArm));
      // console.log(results.leftArm);
      // console.log(typeof(results.leftArm.shoulderX));
      console.log(frame.width)
      console.log(frame.height)
      REA.runOnJS(setPoseResults)(results);

      /** Default frame capture setting uses e.g. 1280*720 format resolution,
       * which is obviously the format for horizontal screen devices. 
       * We need to reverse width and height to make it work on vertical, that to say,
       * mobile phones.
      */
      REA.runOnJS(setWidthHeight)([frame.height, frame.width]);
    }, [])

    React.useEffect(() => {
      (async () => {
        const status = await Camera.requestCameraPermission();
        setHasPermission(status === 'authorized');
      })();
    }, []);
    if (device == null) return <Text>Camera not Loaded</Text>;
    if (hasPermission && poseresults.landmarkListLength != 0)
    rendered = !rendered;
      return (
        <>
          <Camera 
            style = {StyleSheet.absoluteFill}
            device = {device}
            isActive = {true}
            frameProcessor={frameProcessor}
            frameProcessorFps={20}
          />
          <View style={StyleSheet.absoluteFill}>
            <Text style={styles.resultText}>
              Left arm angle =
              {poseresults.leftArm ? poseresults.leftArm.angle : 0}
            </Text>
            <Text style={styles.resultText}>
              Right arm angle= 
              {poseresults.rightArm ? poseresults.rightArm.angle : 0}
            </Text>
            <Text style={styles.resultText}>
              Width = {width} Height = {height}
            </Text>
          </View>
          <View style = {[
            StyleSheet.absoluteFill, 
            {zIndex:100}
            ]}>
            {
            /**There is some problem with *Only* rendering with one SvgLayer. It seems that
              * for only one SvgLayer receiving data, it cannot re-render the svgs inside.
              * Using two SvgLayers and switching one back and forth is the work around for this case.
            */}
            <SvgLayer poseresults={poseresults} svgViewBox={"0 0 " + width + " " + height} rendered={rendered} ></SvgLayer>
            <SvgLayer poseresults={poseresults} svgViewBox={"0 0 " + width + " " + height} rendered={!rendered} ></SvgLayer>
          </View>
        </>
      )
    return <Text>Other error occured</Text>;
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    resultText: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 20,
      color: 'white',
      fontWeight: 'bold',
    },
  });
export default CameraPage