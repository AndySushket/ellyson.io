import React from "react";
import Button from "@mui/material/Button";

export default function Header() {
  return (
    <div className="header">
      <div className="leftHeader">Andy Sushket</div>
      <div className="rightHeader">
        <div>
          <Button className="btn btn-primary-outline" href="/">Home</Button>
        </div>
        /
        <div>
          <Button className="btn btn-primary-outline" href="/projects">Projects</Button>
        </div>
      </div>
    </div>
  );
}
