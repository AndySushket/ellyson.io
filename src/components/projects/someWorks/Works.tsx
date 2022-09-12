import React from "react";
import Planet from "./planet/Planet";
import Sky from "./sky/Sky";
import Aviator from "./aviator/Aviator";
import PointLights from "./pointLights/PointLights";

const SomeWorks = ({ children }: any): JSX.Element => <>{children}</>;
SomeWorks.Planet = Planet;
SomeWorks.Sky = Sky;
SomeWorks.Aviator = Aviator;
SomeWorks.PointLights = PointLights;

export default SomeWorks;
