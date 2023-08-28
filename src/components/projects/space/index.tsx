import Galaxy from "./Galaxy";
import Earth from "./Earth";
import Planet from "./Planet";

function Space({ children }: any): JSX.Element {
  return children;
}
Space.Galaxy = Galaxy;
Space.Earth = Earth;
Space.Planet = Planet;

export default Space;
