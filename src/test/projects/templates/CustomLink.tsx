import {useLocation, useNavigate} from "react-router-dom";
import React from "react";
import { connect } from "react-redux";
import { Button } from "@mui/material";
import { setLocation } from "@/test/projects/store/UI/UI";

interface ICustomLink {
  dest: string;
  children: React.ReactNode;
  setLocation: (dest: string) => void;
}

// eslint-disable-next-line no-shadow
const CustomLink: React.FC<ICustomLink> = ({
  dest,
  children,
  setLocation,
}: ICustomLink) => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleDelayedLinkClick =
    (to: string, delay: number) => (event: any) => {
      event.preventDefault();
      setLocation(dest);
      if (!location.pathname.includes("/main")) {
        navigate(to);
      }
      setTimeout(() => {
        navigate(to);
      }, delay);
    };

  return (
    <Button color="primary" onClick={handleDelayedLinkClick(dest, 750)}>{children}</Button>
  );
};

function mapStateToProps(state: { ui: any }) {
  const {
    ui: { value },
  } = state;
  return { value };
}

const mapDispatchToProps = (
  dispatch: (arg0: { payload: undefined; type: "UI/setLocation" }) => any,
) => ({
  setLocation: (dest: void) => dispatch(setLocation(dest)),
});

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(CustomLink);
