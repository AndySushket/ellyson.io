/**
 * Created by Ellyson on 2/05/2024.
 */

"use client";

import React from 'react';
import dynamic from 'next/dynamic';

const Projects = dynamic(() => import('components/ui/ProjectsList/all'), { ssr: false });

function ProjectList() {

  return (
    <>
      <Projects />
    </>
  );
}

export default ProjectList;
