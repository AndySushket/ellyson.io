import React from "react";
import Pepyaka from "./Pepyaka/Pepyaka";
import TriangleWallpaper from "./triangleWallpaper/TriangleWallpaper";
import CreepingStripes from "./Creeping stripes/Creeping stripes";
import DisplacedBox from "./Displaced box/Displaced box";

const Akella = ({ children }: any): JSX.Element => <>{children}</>;
Akella.DisplacedBox = DisplacedBox;
Akella.CreepingStripes = CreepingStripes;
Akella.TriangleWallpaper = TriangleWallpaper;
Akella.Pepyaka = Pepyaka;

export default Akella;