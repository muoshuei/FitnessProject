import * as REA from 'react-native-reanimated';
import React from 'react';
import {
    StyleSheet,
    Text,
    View
  } from 'react-native';
import { useCameraDevices, Camera, useFrameProcessor} from 'react-native-vision-camera';

import type { Frame } from 'react-native-vision-camera'
import { MyObject } from './Types';
import SvgLayer from './SvgLayer';

/**
 * Do decode.
 */
export function decode(frame: Frame): MyObject {
  'worklet'
  return __decode(frame);
}

const CameraPage = ({navigation}:any) => {

    const [hasPermission, setHasPermission] = React.useState(false);
    const [poseresults, setPoseResults] = React.useState({} as MyObject);
    const [[width, height], setWidthHeight] = React.useState([0,0]);
    // const [Results, setResults] = React.useState([] as TextResult[]);
    const devices = useCameraDevices();
    const device = devices.back;

    const frameProcessor = useFrameProcessor((frame) => {
      'worklet'
      console.log("FrameProcessor Loaded");
      const results : MyObject = decode(frame);
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
      fontSize: 20,
      color: 'white',
      fontWeight: 'bold',
    },
  });
export default CameraPage