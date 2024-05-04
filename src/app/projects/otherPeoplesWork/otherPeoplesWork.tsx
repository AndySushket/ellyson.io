import Portal from "./portal/myCode/Portal";
import Benares from "./Benares/Benares";

function OtherPeoplesWork({ children }: any): JSX.Element {
  return children;
}
OtherPeoplesWork.Portal = Portal;
OtherPeoplesWork.Benares = Benares;

export default OtherPeoplesWork;
