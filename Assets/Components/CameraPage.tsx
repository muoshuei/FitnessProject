import * as REA from 'react-native-reanimated';
import React from 'react';
import {
    StyleSheet,
    Text
  } from 'react-native';
import { useCameraDevices, Camera, useFrameProcessor} from 'react-native-vision-camera';

import type { Frame } from 'react-native-vision-camera'

/**
 * Do decode.
 */
export function decode(frame: Frame): number {
  'worklet'
  return __decode(frame);
}

const CameraPage = ({navigation}:any) => {
    // const getCamPermission = async() =>{
    //   const newCameraPermission = await Camera.requestCameraPermission();
    //   console.log(newCameraPermission);
    // }
    const [hasPermission, setHasPermission] = React.useState(false);
    // const [Results, setResults] = React.useState([] as TextResult[]);
    const devices = useCameraDevices();
    const device = devices.back;
    // getCamPermission();

    const frameProcessor = useFrameProcessor((frame) => {
      'worklet'
      const results = decode(frame);
      console.log(frame.height + " *"  + frame.width + " = " + results);
    }, [])

    React.useEffect(() => {
      (async () => {
        const status = await Camera.requestCameraPermission();
        setHasPermission(status === 'authorized');
      })();
    }, []);
    if (device == null) return <Text>Camera not Loaded</Text>;
    if (hasPermission)
      return (
        <>
        <Camera 
        style = {StyleSheet.absoluteFill}
        device = {device}
        isActive = {true}
        frameProcessor={frameProcessor}
        frameProcessorFps={5}
        />
          <Text style={styles.resultText}>
            results
          </Text>
        </>
      )
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