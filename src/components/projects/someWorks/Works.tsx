import React from "react";
import Planet from "./planet/Planet";
import Aviator from "./aviator/Aviator";
import PointLights from "./pointLights/PointLights";

const SomeWorks = ({ children }: any): JSX.Element => <>{children}</>;
SomeWorks.Planet = Planet;
SomeWorks.Aviator = Aviator;
SomeWorks.PointLights = PointLights;

export default SomeWorks;
