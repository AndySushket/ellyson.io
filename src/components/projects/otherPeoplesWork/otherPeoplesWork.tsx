import React from "react";
import Portal from "./portal/myCode/Portal";
import Benares from "./Benares/Benares";

const OtherPeoplesWork = ({ children }: any): JSX.Element => <>{children}</>;
OtherPeoplesWork.Portal = Portal;
OtherPeoplesWork.Benares = Benares;

export default OtherPeoplesWork;
