/**
 * Created by Ellyson on 15/09/2022.
 */

import * as THREE from "three";
import React from "react";
import { Container } from "@mui/material";
import TemplateFor3D from "./templates/mainTemplate3D";

export default class Music extends TemplateFor3D {

  private static projectsList(): React.ReactNode {

    return (
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
              title="spotify"
              style={{ borderRadius: "12px" }}
              src="https://open.spotify.com/embed/playlist/1I3XZ25iBe7CtQK3I3oj86?utm_source=generator"
              width="100%"
              height="352"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
          />
        </Container>
    );
  }

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

  render(): React.ReactNode {
    return (
      <div>
        {Music.projectsList()}
        <div ref={ (ref) => {this.canvasDiv = ref}} className="canvasDiv" />
      </div>
    );
  }
}
