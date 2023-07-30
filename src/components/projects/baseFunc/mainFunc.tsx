import PositionRotationScale from "./PositionRotationScale/PositionRotationScale";
import Quaternion from "./QuaternionFunc/QuaternionFunc";
import Matrix from "./MatrixFunc/Matrix";

function MainFunc({ children }: any): JSX.Element {
  return children;
}
MainFunc.PositionRotationScale = PositionRotationScale;
MainFunc.Quaternion = Quaternion;
MainFunc.Matrix = Matrix;

export default MainFunc;
