/**
 * Created by Ellyson on 15/09/2022.
 */

import * as THREE from "three";
import React, { ReactNode } from "react";
import { Button, Container, Grid, IconButton, styled, Avatar, Paper } from "@mui/material";
import { Col, Collapse, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import {
  Facebook,
  Instagram,
  LinkedIn,
  Mail,
  Twitter,
} from "@mui/icons-material";
import TemplateFor3D from "./templates/mainTemplate3D";

const avatar = require("./MainPage/avatar.jpg");

export default class Projects extends TemplateFor3D {
  private sphere: THREE.Mesh | undefined;

  initControls(): void {
    super.initControls();
    this.camera?.position.set(0, 0, 10);
  }

  initShader(): void {
    const geometry = new THREE.SphereGeometry(4, 30, 30);
    const customMaterial = new THREE.ShaderMaterial();
    this.sphere = new THREE.Mesh(geometry, customMaterial);
    this.scene?.add(this.sphere);
  }

  componentDidMount(): void {
    this.init3D(undefined, {});
    this.initShader();
    this.initControls();
    this.animate();
  }

  animate(): void {
    if (!this.looped) return;
    super.animate();
  }

  skillList(): ReactNode {
    const list = [
      "JavaScript",
      "TypeScript",
      "React",
      "Redux",
      "Three.js",
      "React",
      "Redux",
      "Saga",
      "Reflux",
      "3D",
      "Node.js",
      "MongoDB",
      "GIT",
      "HTML",
      "CSS",
      "Backbone",
      "SQL",
      "Agile",
      "Jira",
      "Blender",
    ];
    return (
      <div>
        {list.map((el) => (
          <div
            style={{
              margin: "5px",
              borderRadius: "10px",
              border: "1px solid white",
              padding: "20px",
              width: "auto",
              height: "40px",
              color: "white",
              float: "left",
            }}
          >
            {el}
          </div>
        ))}
      </div>
    );
  }

  projectsList(): ReactNode {
    const Item = styled(Paper)(({ theme }) => ({
      backgroundColor: "#1A2027",
      ...theme.typography.body2,
      padding: theme.spacing(1),
      textAlign: "center",
      color: theme.palette.text.secondary,
    }));

    return (
      // <div className='project-list'>
      <Container
        className="about"
        style={{
          position: "absolute",
          top: "200px",
          left: "0",
          right: "0",
          margin: "0 auto",
        }}
        maxWidth="lg"
      >
        <h1 style={{ textAlign: "left", color: "white" }}>About me:</h1>
        <iframe
          style={{ borderRadius: "12px" }}
          src="https://open.spotify.com/embed/playlist/1I3XZ25iBe7CtQK3I3oj86?utm_source=generator"
          width="100%"
          height="352"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </Container>
      // </div>
    );
  }

  render(): ReactNode {
    return (
      <div>
        {this.projectsList()}
        <div ref="anchor" className="canvasDiv" />
      </div>
    );
  }
}
