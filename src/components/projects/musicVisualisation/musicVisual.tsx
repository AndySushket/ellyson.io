import React from "react";
import MusicEqualizer from "./musicVisualization/MusicVisualization";
import LandSlide from "./landSlide/LandSlide";

const MusicVisualization = ({ children }: any): JSX.Element => <>{children}</>;
MusicVisualization.MusicEqualizer = MusicEqualizer;
MusicVisualization.LandSlide = LandSlide;

export default MusicVisualization;
