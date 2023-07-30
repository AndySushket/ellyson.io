import ThanosPortal from "./thanos portal/thanosPortal";
import Rain from "./rain/Rain";

 function TutorialWorks({ children }: any): JSX.Element {
  return children;
}
TutorialWorks.ThanosPortal = ThanosPortal;
TutorialWorks.Rain = Rain;

export default TutorialWorks;
