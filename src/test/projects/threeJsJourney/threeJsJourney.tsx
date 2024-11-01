import Texture from "./Chapter 1/Texture";
import HauntedHouse from "./Chapter 2/Haunted House";
import Particles from "./Chapter 2/Particles";
import GalaxyGenerator from "./Chapter 2/Galaxy generator";
import ScrollBasedAnimation from './Chapter 2/ScrollBasedAnimation';
import Physics from './Chapter 3/Physics';
import ImportModels from './Chapter 3/ImportModels';
import Raycaster from './Chapter 3/Raycaster';
import EnvMap from './Chapter 3/EnvMap';
import RealisticRendering from './Chapter 3/realisticRender';
import Shaders from './Chapter 4/Shader 1';
import ShadersPatterns from './Chapter 4/Shader Patterns';

function ThreeJsJourney({ children }: any): JSX.Element {
  return children;
}
ThreeJsJourney.Texture = Texture;
ThreeJsJourney.HauntedHouse = HauntedHouse;
ThreeJsJourney.Particles = Particles;
ThreeJsJourney.GalaxyGenerator = GalaxyGenerator;
ThreeJsJourney.ScrollBasedAnimation = ScrollBasedAnimation;
ThreeJsJourney.Physics = Physics;
ThreeJsJourney.ImportModels = ImportModels;
ThreeJsJourney.Raycaster = Raycaster;
ThreeJsJourney.EnvMap = EnvMap;
ThreeJsJourney.RealisticRendering = RealisticRendering;
ThreeJsJourney.Shaders = Shaders;
ThreeJsJourney.ShadersPatterns = ShadersPatterns;

export default ThreeJsJourney;
