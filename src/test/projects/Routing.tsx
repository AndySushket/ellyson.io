// import React from 'react';
// import { Route, Routes } from 'react-router-dom';
//
// import Projects from '@/test/projects/Main/pages/ProjectsList';
// import Projects2 from '@/test/projects/Main/pages/ProjectsList/all';
// import About from '@/test/projects/Main/pages/About';
// import Space from 'test/projects/space';
// import Shaders from 'test/projects/shaders/Shaders';
// import MusicVisualization from 'test/projects/musicVisualisation/musicVisual';
// import SomeWorks from 'test/projects/someWorks/Works';
// import OtherPeoplesWork from 'test/projects/otherPeoplesWork/otherPeoplesWork';
// import Akella from 'test/projects/Akella/akella';
// import TutorialWorks from 'test/projects/tutorials/tutorialWorks';
// import MainFunc from 'test/projects/baseFunc/mainFunc';
// import Vasilika from 'test/projects/vasilika';
// import TestWork from 'test/projects/testWorks/testWork';
// import ThreeJsJourney from 'test/projects/threeJsJourney/threeJsJourney';
// import Main from '@/test/projects/Main/Background3D/Background3D';
//
// function Routing() {
//   return (
//     <Routes>
//       <Route path="/" element={<Main />}>
//         <Route index element={<About />} />
//         <Route path="projects" element={<Projects />} />
//         <Route path="projects2" element={<Projects2 />} />
//       </Route>
//       <Route path="Space">
//         <Route index element={<Space.Galaxy />} />
//         <Route path="Galaxy" element={<Space.Galaxy />} />
//         <Route path="Earth" element={<Space.Earth />} />
//         <Route path="Planet" element={<Space.Planet />} />
//       </Route>
//
//       <Route path="Shaders">
//         <Route index element={<Shaders.Shader1 />} />
//         <Route path="Shader1" element={<Shaders.Shader1 />} />
//         <Route path="Shader2" element={<Shaders.Shader2 />} />
//         <Route path="Shader3" element={<Shaders.Shader3 />} />
//         <Route path="Shader4" element={<Shaders.Shader4 />} />
//       </Route>
//
//       <Route path="MusicVisualization">
//         <Route index element={<MusicVisualization.MusicEqualizer />} />
//         <Route path="MusicVisualization" element={<MusicVisualization.MusicEqualizer />} />
//         <Route path="LandSlide" element={<MusicVisualization.LandSlide />} />
//       </Route>
//
//       <Route path="SomeWorks">
//         <Route index element={<SomeWorks.Aviator />} />
//         <Route path="Aviator" element={<SomeWorks.Aviator />} />
//         <Route path="PointLights" element={<SomeWorks.PointLights />} />
//       </Route>
//
//       <Route path="OtherPeoplesWork">
//         <Route index element={<OtherPeoplesWork.Portal />} />
//         <Route path="Portal" element={<OtherPeoplesWork.Portal />} />
//         <Route path="Benares" element={<OtherPeoplesWork.Benares />} />
//       </Route>
//
//       <Route path="Akella">
//         <Route index element={<Akella.Pepyaka />} />
//         <Route path="Pepyaka" element={<Akella.Pepyaka />} />
//         dw
//         <Route path="TriangleWallpaper" element={<Akella.TriangleWallpaper />} />
//         <Route path="CreepingStripes" element={<Akella.CreepingStripes />} />
//         <Route path="DisplacedBox" element={<Akella.DisplacedBox />} />
//       </Route>
//
//       <Route path="RemakeTutorialWorks">
//         <Route index element={<TutorialWorks.ThanosPortal />} />
//         <Route path="thanosPortal" element={<TutorialWorks.ThanosPortal />} />
//         <Route path="rain" element={<TutorialWorks.Rain />} />
//       </Route>
//
//       <Route path="MainFunc">
//         <Route index element={<MainFunc.PositionRotationScale />} />
//         <Route path="PositionRotationScale" element={<MainFunc.PositionRotationScale />} />
//         <Route path="Quaternion" element={<MainFunc.Quaternion />} />
//         <Route path="Matrix" element={<MainFunc.Matrix />} />
//       </Route>
//
//       <Route path="vasilika">
//         <Route index element={<Vasilika.Dance />} />
//         <Route path="Dance" element={<Vasilika.Dance />} />
//       </Route>
//
//       <Route path="TestWork">
//         <Route index element={<TestWork.House />} />
//         <Route path="House" element={<TestWork.House />} />
//       </Route>
//
//       <Route path="ThreeJsJourney">
//         <Route index element={<ThreeJsJourney.Texture />} />
//         <Route path="Texture" element={<ThreeJsJourney.Texture />} />
//         <Route path="HauntedHouse" element={<ThreeJsJourney.HauntedHouse />} />
//         <Route path="Particles" element={<ThreeJsJourney.Particles />} />
//         <Route path="GalaxyGenerator" element={<ThreeJsJourney.GalaxyGenerator />} />
//         <Route path="ScrollBasedAnimation" element={<ThreeJsJourney.ScrollBasedAnimation />} />
//         <Route path="Physics" element={<ThreeJsJourney.Physics />} />
//         <Route path="ImportModels" element={<ThreeJsJourney.ImportModels />} />
//         <Route path="Raycaster" element={<ThreeJsJourney.Raycaster />} />
//         <Route path="EnvMap" element={<ThreeJsJourney.EnvMap />} />
//         <Route path="RealisticRendering" element={<ThreeJsJourney.RealisticRendering />} />
//         <Route path="Shaders" element={<ThreeJsJourney.Shaders />} />
//         <Route path="ShadersPatterns" element={<ThreeJsJourney.ShadersPatterns />} />
//       </Route>
//     </Routes>
//   );
// }
//
// export default Routing;