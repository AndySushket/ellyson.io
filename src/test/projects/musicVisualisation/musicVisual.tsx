// import MusicEqualizer from "./musicVisualization/MusicVisualization";
import LandSlide from "./landSlide/LandSlide";

function MusicVisualization({ children }: any): JSX.Element {
  return children;
}
// MusicVisualization.MusicEqualizer = MusicEqualizer;
MusicVisualization.LandSlide = LandSlide;

export default MusicVisualization;
