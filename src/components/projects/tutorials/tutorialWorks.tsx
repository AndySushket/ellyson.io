import {Component} from "react";
import ThanosPortal from "./thanos portal/thanosPortal";
import Rain from "./rain/Rain";

 const TutorialWorks = ({ children }: any): JSX.Element => <>{children}</>;
TutorialWorks.ThanosPortal = ThanosPortal;
TutorialWorks.Rain = Rain;

export default TutorialWorks;
