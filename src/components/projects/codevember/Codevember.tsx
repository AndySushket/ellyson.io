import React from "react";
import Galaxy from "./1st_Day_Galaxy/Galaxy";

function Codevember({ children }: any): JSX.Element {
  return <>{children}</>;
}
Codevember.Galaxy = Galaxy;

export default Codevember;
