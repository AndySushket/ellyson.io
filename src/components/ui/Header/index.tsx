import React from 'react';
import CustomLink from '@/components/common/CustomLink';

export default function Header () {
  return (
    <div className="header">
      <div className="leftHeader">
        <span data-text="Andy Sushket" className="glitch-text">Andy Sushket</span>
      </div>
      <div className="rightHeader">
        <div>
          <CustomLink dest="/">
            <span data-text="Home" className="glitch-text">Home</span>
          </CustomLink>
        </div>
        /
        <div>
          <CustomLink dest="/projects">
            <span data-text="Projects" className="glitch-text">Projects</span>
          </CustomLink>
        </div>
      </div>
    </div>
  );
}
