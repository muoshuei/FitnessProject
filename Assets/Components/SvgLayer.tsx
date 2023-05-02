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
          cx = {poseresults.leftArm.joint1X}
          cy = {poseresults.leftArm.joint1Y}
          r="5"
          fill="yellow"/>
        <Circle 
          cx = {poseresults.leftArm.joint2X}
          cy = {poseresults.leftArm.joint2Y}
          r="5"
          fill="green"/>
        <Circle 
          cx = {poseresults.leftArm.joint3X}
          cy = {poseresults.leftArm.joint3Y}
          r="5"
          fill="blue"/>
        <Circle 
          cx = {poseresults.rightArm.joint1X}
          cy = {poseresults.rightArm.joint1Y}
          r="5"
          fill="yellow"/>
        <Circle 
          cx = {poseresults.rightArm.joint2X}
          cy = {poseresults.rightArm.joint2Y}
          r="5"
          fill="green"/>
        <Circle 
          cx = {poseresults.rightArm.joint3X}
          cy = {poseresults.rightArm.joint3Y}
          r="5"
          fill="blue"/>
        <Line
          x1={poseresults.leftArm.joint1X}
          y1={poseresults.leftArm.joint1Y}
          x2={poseresults.leftArm.joint2X}
          y2={poseresults.leftArm.joint2Y}
          stroke="white"
          strokeWidth="2"/>
        <Line
          x1={poseresults.leftArm.joint2X}
          y1={poseresults.leftArm.joint2Y}
          x2={poseresults.leftArm.joint3X}
          y2={poseresults.leftArm.joint3Y}
          stroke="white"
          strokeWidth="2"/>
        <Line
          x1={poseresults.rightArm.joint1X}
          y1={poseresults.rightArm.joint1Y}
          x2={poseresults.rightArm.joint2X}
          y2={poseresults.rightArm.joint2Y}
          stroke="white"
          strokeWidth="2"/>
        <Line
          x1={poseresults.rightArm.joint2X}
          y1={poseresults.rightArm.joint2Y}
          x2={poseresults.rightArm.joint3X}
          y2={poseresults.rightArm.joint3Y}
          stroke="white"
          strokeWidth="2"/>
          <Line
          x1={poseresults.leftArm.joint1X}
          y1={poseresults.leftArm.joint1Y}
          x2={poseresults.rightArm.joint1X}
          y2={poseresults.rightArm.joint1Y}
          stroke="white"
          strokeWidth="2"/>
      </Svg>
    )
  }
export default SvgLayer;