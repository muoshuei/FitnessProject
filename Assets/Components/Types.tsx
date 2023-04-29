export type ArmWrapper = {
    angle: number;
    shoulderX: number;
    shoulderY: number;
    elbowX: number;
    elbowY: number;
    wristX: number;
    wristY: number;
  }
export type MyObject = {
    landmarkListLength: number
    leftArm: ArmWrapper;
    rightArm: ArmWrapper;
  }