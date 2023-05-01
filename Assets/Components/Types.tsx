export type ArmWrapper = {
    angle: number;
    shoulderX: number;
    shoulderY: number;
    elbowX: number;
    elbowY: number;
    wristX: number;
    wristY: number;
  }
// export type MyObject = {
//     landmarkListLength: number
//     leftArm: ArmWrapper;
//     rightArm: ArmWrapper;
//   }
export type Pushup = {
    angle: number;

    joint1X: number;
    joint1Y: number;
    joint1Z: number;

    joint2X: number;
    joint2Y: number;
    joint2Z: number;

    joint3X: number;
    joint3Y: number;
    joint3Z: number;
  }
export type MyObject = {
    landmarkListLength: number
    leftArm: Pushup;
    rightArm: Pushup;
    leftBack: Pushup;
    rightBack: Pushup;

  }