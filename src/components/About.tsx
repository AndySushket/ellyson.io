/**
 * Created by Ellyson on 15/09/2022.
 */

import * as THREE from "three";
import React, { ReactNode } from "react";
import { Button, Container, Grid, IconButton, styled } from "@material-ui/core";
import { Col, Collapse, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Avatar, Paper } from "material-ui";
import {
  Facebook,
  Instagram,
  LinkedIn,
  Mail,
  Twitter,
} from "@material-ui/icons";
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
        <Grid
          container
          spacing={9}
          style={{
            background: "rgba(0,0,0,.3)",
            border: "solid 1px white",
            borderRadius: "15px",
          }}
        >
          <Grid item xs={4}>
            <Avatar src={avatar} size={300} />

            <h1 style={{ textAlign: "left", color: "white" }}>Skills:</h1>

            {this.skillList()}
            <div>
              <p>Contacts:</p>
              <IconButton
                href="https://www.instagram.com/andy_sushket/"
                target="_blank"
              >
                <Instagram />
              </IconButton>
              <IconButton
                href="https://www.facebook.com/Just.Ellyson/"
                target="_blank"
              >
                <Facebook />
              </IconButton>
              <IconButton href="https://twitter.com/_Ellyson_" target="_blank">
                <Twitter />
              </IconButton>
              <IconButton
                href="https://www.linkedin.com/in/andrii-sushket/"
                target="_blank"
              >
                <LinkedIn />
              </IconButton>
              <IconButton>
                <Mail />
              </IconButton>
            </div>
          </Grid>

          <Grid item xs={8}>
            <h1 style={{ textAlign: "left", color: "white" }}>About me:</h1>
            <Item
              style={{
                background: "rgba(0,0,0,.3)",
                border: "solid 1px white",
                borderRadius: "15px",
                color: "white",
              }}
            >
              3D Front-end Developer Svitla Systems Front-end 3D developer |
              2021 - Present Solar Panels: I'm working with an interface,
              visualization of roofs with solar panel data and a map API for
              drawing roofs and other objects in 3D. Stack: JavaScript,
              Three.js, React, Redux, Saga, Node.js, MongoDB, Socket.io
              Logivations: Front-end 3D developer | 2017 - 2021 Logistic tool: I
              was responsible for a 3D visualization of warehouses and packing
              cases. Also worked closely with the ML team for visualization in
              real-time detected people, forklifts and remotely controlled
              robotic forklifts. Stack: JavaScript, TypeScript, Three.js, React,
              Redux, Reflux, Backbone, Socket.io CBA Hosting Front-end developer
              | 2017 Web Hosting: I was responsible for the Frontend of the
              hosting page. Working with templates on the PHP side. Adding new
              features and animations. Stack: JavaScript, PHP, jQuery, HTML,
              CSS.
            </Item>
          </Grid>
        </Grid>
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
