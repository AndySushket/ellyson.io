import Texture from "./Chapter 1/Texture";
import HauntedHouse from "./Chapter 2/Haunted House";
import Particles from "./Chapter 2/Particles";

function ThreeJsJourney({ children }: any): JSX.Element {
  return children;
}
ThreeJsJourney.Texture = Texture;
ThreeJsJourney.HauntedHouse = HauntedHouse;
ThreeJsJourney.Particles = Particles;

export default ThreeJsJourney;
