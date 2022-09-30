import React from "react";
import {Route, Routes} from "react-router-dom";

import Codevember from "./projects/codevember/Codevember";
import Shaders from "./projects/shaders/Shaders";
import MusicVisualization from "./projects/musicVisualisation/musicVisual";
import SomeWorks from "./projects/someWorks/Works";
import OtherPeoplesWork from "./projects/otherPeoplesWork/otherPeoplesWork";
import Akella from "./projects/Akella/akella";
import TutorialWorks from "./projects/tutorials/tutorialWorks";
import MainFunc from "./projects/baseFunc/mainFunc";
import TestWork from "./projects/testWorks/testWork";
import Main from "./MainPage/Main";
import Projects from "./Projects";

export default function Routing() {
    return (<>
            <Routes>
                <Route path="/">
                    <Route index element={<Main/>}/>
                    <Route path="Codevember">
                        <Route index element={<Codevember.Galaxy/>}/>
                        <Route path={`Galaxy`} element={<Codevember.Galaxy/>}/>
                        <Route path={`Planet`} element={<SomeWorks.Planet/>}/>
                    </Route>

                    <Route path="Shaders">
                        <Route index element={<Shaders.Shader1/>}/>
                        <Route path={`Shader1`} element={<Shaders.Shader1/>}/>
                        <Route path={`Shader2`} element={<Shaders.Shader2/>}/>
                        <Route path={`Shader3`} element={<Shaders.Shader3/>}/>
                        <Route path={`Shader4`} element={<Shaders.Shader4/>}/>
                    </Route>

                    <Route path="MusicVisualization">
                        <Route index element={<MusicVisualization.MusicEqualizer/>}/>
                        <Route path={`MusicVisualization`} element={<MusicVisualization.MusicEqualizer/>}/>
                        <Route path={`LandSlide`} element={<MusicVisualization.LandSlide/>}/>
                    </Route>

                    <Route path="SomeWorks">
                        <Route index element={<SomeWorks.Planet/>}/>
                        <Route path={`Planet`} element={<SomeWorks.Planet/>}/>
                        <Route path={`Aviator`} element={<SomeWorks.Aviator/>}/>
                        <Route path={`PointLights`} element={<SomeWorks.PointLights/>}/>
                    </Route>

                    <Route path="OtherPeoplesWork">
                        <Route index element={<OtherPeoplesWork.Portal/>}/>
                        <Route path={`Portal`} element={<OtherPeoplesWork.Portal/>}/>
                        <Route path={`Benares`} element={<OtherPeoplesWork.Benares/>}/>
                    </Route>

                    <Route path="Akella">
                        <Route index element={<Akella.Pepyaka/>}/>
                        <Route path={`Pepyaka`} element={<Akella.Pepyaka/>}/>dw
                        <Route path={`TriangleWallpaper`} element={<Akella.TriangleWallpaper/>}/>
                        <Route path={`CreepingStripes`} element={<Akella.CreepingStripes/>}/>
                        <Route path={`DisplacedBox`} element={<Akella.DisplacedBox/>}/>
                    </Route>

                    <Route path="RemakeTutorialWorks">
                        <Route index element={<TutorialWorks.ThanosPortal/>}/>
                        <Route path={`thanosPortal`} element={<TutorialWorks.ThanosPortal/>}/>
                        <Route path={`rain`} element={<TutorialWorks.Rain/>}/>
                    </Route>

                    <Route path="MainFunc">
                        <Route index element={<MainFunc.PositionRotationScale/>}/>
                        <Route path={`PositionRotationScale`} element={<MainFunc.PositionRotationScale/>}/>
                        <Route path={`Quaternion`} element={<MainFunc.Quaternion/>}/>
                        <Route path={`Matrix`} element={<MainFunc.Matrix/>}/>
                    </Route>

                    <Route path="TestWork">
                        <Route index element={<TestWork/>}/>
                        <Route path={`thanosPortal`} element={<TestWork.House/>}/>
                    </Route>
                </Route>
                <Route path={'projects'} element={<Projects/>}/>
            </Routes>
        </>
    )
}