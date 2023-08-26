import Galaxy from "./Galaxy";
import Earth from "./Earth";

function Space({ children }: any): JSX.Element {
  return children;
}
Space.Galaxy = Galaxy;
Space.Earth = Earth;

export default Space;
