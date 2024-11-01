"use client";

import React from 'react';
import dynamic from 'next/dynamic';

// Динамический импорт
const About = dynamic(() => import('test/projects/Main/pages/About'), { ssr: false });

export default function Home() {
  return (
    <div className="home" suppressHydrationWarning>
      <div className="about-page">
        <About />
      </div>
    </div>
  );
}
