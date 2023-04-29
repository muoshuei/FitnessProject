import { PropsWithChildren } from 'react';
import React from 'react';
import Svg, {
    Circle,
    Line
  } from 'react-native-svg';
import { MyObject } from './Types';

type SvgProps = PropsWithChildren<{
    poseresults: MyObject;
    svgViewBox: string;
    rendered: boolean;
}>;
const SvgLayer = ({children, poseresults, svgViewBox, rendered}: SvgProps) =>{
  console.log("Calling SygLayer with rendered->" + rendered);
    if(rendered){
      console.log("Is rendered");
      return (<></>)
    }
    if (!svgViewBox)
    {
      console.log("svgViewBoxNotFound");
      return (<Svg height="100%" width="100%" viewBox="0 0 720 1280"></Svg>)
    }
      
    if (!(poseresults.leftArm || poseresults.rightArm)){
      console.log("Cannot get arm coordinate.");
      return (<Svg height="100%" width="100%" viewBox={svgViewBox}></Svg>)
    }
      
    console.log("Rendering...");

    return (
      <Svg height="100%" width="100%" viewBox={svgViewBox}>
        <Circle 
          cx = "0"
          cy = "0"
          r="50"
          fill="white"/>
        <Circle 
          cx = "0"
          cy = "100%"
          r="50"
          fill="red"/>
        <Circle 
          cx = "100%"
          cy = "0"
          r="50"
          fill="red"/>
        <Circle 
          cx = "100%"
          cy = "100%"
          r="50"
          fill="white"/> 
        <Circle 
          cx = {poseresults.leftArm.shoulderX}
          cy = {poseresults.leftArm.shoulderY}
          r="5"
          fill="yellow"/>
        <Circle 
          cx = {poseresults.leftArm.elbowX}
          cy = {poseresults.leftArm.elbowY}
          r="5"
          fill="green"/>
        <Circle 
          cx = {poseresults.leftArm.wristX}
          cy = {poseresults.leftArm.wristY}
          r="5"
          fill="blue"/>
        <Circle 
          cx = {poseresults.rightArm.shoulderX}
          cy = {poseresults.rightArm.shoulderY}
          r="5"
          fill="yellow"/>
        <Circle 
          cx = {poseresults.rightArm.elbowX}
          cy = {poseresults.rightArm.elbowY}
          r="5"
          fill="green"/>
        <Circle 
          cx = {poseresults.rightArm.wristX}
          cy = {poseresults.rightArm.wristY}
          r="5"
          fill="blue"/>
        <Line
          x1={poseresults.leftArm.shoulderX}
          y1={poseresults.leftArm.shoulderY}
          x2={poseresults.leftArm.elbowX}
          y2={poseresults.leftArm.elbowY}
          stroke="white"
          strokeWidth="2"/>
        <Line
          x1={poseresults.leftArm.elbowX}
          y1={poseresults.leftArm.elbowY}
          x2={poseresults.leftArm.wristX}
          y2={poseresults.leftArm.wristY}
          stroke="white"
          strokeWidth="2"/>
        <Line
          x1={poseresults.rightArm.shoulderX}
          y1={poseresults.rightArm.shoulderY}
          x2={poseresults.rightArm.elbowX}
          y2={poseresults.rightArm.elbowY}
          stroke="white"
          strokeWidth="2"/>
        <Line
          x1={poseresults.rightArm.elbowX}
          y1={poseresults.rightArm.elbowY}
          x2={poseresults.rightArm.wristX}
          y2={poseresults.rightArm.wristY}
          stroke="white"
          strokeWidth="2"/>
          <Line
          x1={poseresults.leftArm.shoulderX}
          y1={poseresults.leftArm.shoulderY}
          x2={poseresults.rightArm.shoulderX}
          y2={poseresults.rightArm.shoulderY}
          stroke="white"
          strokeWidth="2"/>
      </Svg>
    )
  }
export default SvgLayer;