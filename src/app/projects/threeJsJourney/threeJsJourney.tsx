import Texture from "./Chapter 1/Texture";
import HauntedHouse from "./Chapter 2/Haunted House";

function ThreeJsJourney({ children }: any): JSX.Element {
  return children;
}
ThreeJsJourney.Texture = Texture;
ThreeJsJourney.HauntedHouse = HauntedHouse;

export default ThreeJsJourney;
