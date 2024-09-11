import Aviator from "./aviator/Aviator";
import PointLights from "./pointLights/PointLights";
// import Shield from "./shield/index";

function SomeWorks({ children }: any): JSX.Element {
  return children;
}
SomeWorks.Aviator = Aviator;
SomeWorks.PointLights = PointLights;
// SomeWorks.Shield = Shield;

export default SomeWorks;
