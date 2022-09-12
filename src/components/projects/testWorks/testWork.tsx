import React from "react";
import House from "./House";

const TestWork = ({ children }: any): JSX.Element => <>{children}</>;
TestWork.House = House;

export default TestWork;