import React from 'react';
import Button from '@mui/material/Button';
import Link from 'next/link';

export default function Header() {
  return (
    <div className="header">
      <div className="leftHeader">Andy Sushket</div>
      <div className="rightHeader">
        <div>
          <Button className="btn btn-primary-outline">
            <Link href="/">Home</Link>
          </Button>
        </div>
        /
        <div>
          <Button className="btn btn-primary-outline">
            <Link href="/projects">Projects</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
