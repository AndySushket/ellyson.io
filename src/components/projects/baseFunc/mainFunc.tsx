import React from "react";
import PositionRotationScale from "./PositionRotationScale/PositionRotationScale";
import Quaternion from "./QuaternionFunc/QuaternionFunc";
import Matrix from "./MatrixFunc/Matrix";

const MainFunc = ({ children }: any): JSX.Element => <>{children}</>;
MainFunc.PositionRotationScale = PositionRotationScale;
MainFunc.Quaternion = Quaternion;
MainFunc.Matrix = Matrix;

export default MainFunc;
