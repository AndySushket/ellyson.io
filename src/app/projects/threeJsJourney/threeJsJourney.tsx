import Texture from "./Chapter 1/Texture";
import HauntedHouse from "./Chapter 2/Haunted House";
import Particles from "./Chapter 2/Particles";
import GalaxyGenerator from "./Chapter 2/Galaxy generator";
import ScrollBasedAnimation from './Chapter 2/ScrollBasedAnimation';

function ThreeJsJourney({ children }: any): JSX.Element {
  return children;
}
ThreeJsJourney.Texture = Texture;
ThreeJsJourney.HauntedHouse = HauntedHouse;
ThreeJsJourney.Particles = Particles;
ThreeJsJourney.GalaxyGenerator = GalaxyGenerator;
ThreeJsJourney.ScrollBasedAnimation = ScrollBasedAnimation;

export default ThreeJsJourney;
