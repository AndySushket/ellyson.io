import React from "react";
import CustomLink from "app/templates/CustomLink";

export default function Header() {
  return (
    <div className="header">
      <div className="leftHeader">Andy Sushket</div>
      <div className="rightHeader">
        <div>
          <CustomLink dest="/">Home</CustomLink>
        </div>
        /
        <div>
          <CustomLink dest="/projects">Projects</CustomLink>
        </div>
      </div>
    </div>
  );
}
