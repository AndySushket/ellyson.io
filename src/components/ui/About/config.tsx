import React from "react";

export const MY_SKILLS = [
  "JavaScript",
  "TypeScript",
  "Three.js",
  "GLSL",
  "GSAP",
  "React",
  "Redux",
  "Next.js",
  "Saga",
  "Reflux",
  "SASS",
  "LESS",
  "Webpack",
  "WebSocket",
  "Jest",
  "Node.js",
  "MongoDB",
  "Git",
  "Backbone",
  "SQL",
  "PHP",
  "jQuery",
  "Jira",
  "Blender",
  "Unreal Engine",
];

export const CONTACTS = {
  EMAIL: "%61%6e%64%79%2e%73%75%73%68%6b%65%74%40%67%6d%61%69%6c%2e%63%6f%6d",
  TWITTER: "https://twitter.com/_Ellyson_",
  FACEBOOK: "https://www.facebook.com/Just.Ellyson/",
  LINKEDIN: "https://www.linkedin.com/in/andrii-sushket/",
  INSTAGRAM: "https://www.instagram.com/andy_sushket/",
  LOCATION: "Luxembourg",
};

export function Summary() {
  return <>
    <h3>Summary</h3>
    <div>
      Passionate WebGL (Three.js) Frontend Developer with 7 years of experience.
      Excited about 3D challenges and problem-solving. Formerly at Logivations,
      shaping 3D warehouse solutions. Currently contributing to solar panel
      visualization at Svitla Systems. Working on a new visualization core for
      solar panels on roofs using various tools. Experienced in JS, TS, React,
      Redux, MongoDB and more. An adaptable team player. Eager to expand 3D
      knowledge and dive into C++ and Unreal Engine. Future-focused and ready
      for new adventures. Let's connect, I am open to collaborations,
      networking, and discussions on all things tech.
    </div>
  </>
}

export function Experience() {
  return <>
    <h3>Experience</h3>
    <div>
      <p>
        <span>
          <span className="underline">Senior Frontend Developer</span> | Svitla
          Systems Inc. - Remote
        </span>{" "}
        <span>10/2021 - Current</span>
      </p>
      <p className="stack">
        Stack: JavaScript, Three.js, React, Redux, Saga, Node.js, Webpack, SASS,
        MongoDB, WebSocket, Jest.
      </p>
      <p className="jobDescription">
        Developed a new rendering engine using Three.js, resulting in a tenfold
        increase in performance. Implemented synchronization between 3D objects
        and Google Maps tiles, ensuring interaction. Built-in support for
        quadtrees to optimize interactive operations such as intersection and
        selection. Optimized processes at the shader level to improve rendering
        performance.
      </p>
    </div>
    <div className="separator" />
    <div>
      <p>
        <span>
          <span className="underline">Frontend 3D Developer</span> | Logivations
          - Hybrid, Ukraine
        </span>{" "}
        <span>10/2017 - 10/2021</span>
      </p>
      <p className="stack">
        Stack: JavaScript, TypeScript, Three.js, React, Redux, Reflux, Backbone,
        LESS, Socket.io, Webpack.
      </p>
      <p className="jobDescription">
        Developed real-time visualizations, collaborating with ML for object
        detection and management. Revamped product packaging visualization,
        improving functionality and performance. Developed support for importing
        animated models, ensuring JSON data storage in the database.
      </p>
    </div>
    <div className="separator" />
    <div>
      <p>
        <span>
          <span className="underline">Frontend Developer</span> | ABC Hosting -
          Remote
        </span>{" "}
        <span>03/2017 - 10/2017</span>
      </p>
      <p className="stack">Stack: JavaScript, PHP, jQuery, HTML, and CSS.</p>
      <p className="jobDescription">
        Engineered templates for enhanced hosting functionality, optimizing user
        experience. Contributed to website animations to enrich user engagement
        and experience.
      </p>
    </div>
  </>
}

export function Education() {
  return <>
    <h3>Education</h3>
    <div>
      <p>
        <span className="underline">
          Engineer Specialist: Radio engineering
        </span>
        <span>2009 - 2016</span>
      </p>
      <p>Polytechnic University | Lviv/Ukraine</p>
    </div>
    <div>
      <p>
        <span className="underline">
          HTML\CSS, JavaScript, JavaScript Advanced Courses
        </span>{" "}
        <span>2016</span>
      </p>
      <p>Logos | Lviv/Ukraine</p>
    </div>
    <div>
      <p>
        <span className="underline">
          Three.js, Shaders, Post-processing, Blender, R3F Course
        </span>{" "}
        <span> 2023</span>
      </p>
      <p>Three.js Journey | Online</p>
    </div>
  </>
}
