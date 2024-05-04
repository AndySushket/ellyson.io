import House from "./House";

function TestWork({ children }: any): JSX.Element {
  return children;
}
TestWork.House = House;

export default TestWork;
