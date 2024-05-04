import Aviator from "./aviator/Aviator";
import PointLights from "./pointLights/PointLights";

function SomeWorks({ children }: any): JSX.Element {
  return children;
}
SomeWorks.Aviator = Aviator;
SomeWorks.PointLights = PointLights;

export default SomeWorks;
