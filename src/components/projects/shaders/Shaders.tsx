import React from "react";

import Shader1 from "./1st_Shader/1st_Shader";
import Shader2 from "./2st_Shader/2st_Shader";
import Shader3 from "./3st_Shader/3st_Shader";
import Shader4 from "./4st_Shader/4st_Shader";

const Shaders = ({ children }: any): JSX.Element => <>{children}</>;
Shaders.Shader1 = Shader1;
Shaders.Shader2 = Shader2;
Shaders.Shader3 = Shader3;
Shaders.Shader4 = Shader4;

export default Shaders;