import Planet from "./planet/Planet";
import Aviator from "./aviator/Aviator";
import PointLights from "./pointLights/PointLights";

function SomeWorks({ children }: any): JSX.Element {
  return children;
}
SomeWorks.Planet = Planet;
SomeWorks.Aviator = Aviator;
SomeWorks.PointLights = PointLights;

export default SomeWorks;
