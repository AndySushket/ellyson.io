/**
 * Created by Ellyson on 15/09/2022.
 */

import * as THREE from "three";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { BokehPass } from "three/examples/jsm/postprocessing/BokehPass";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass";

// Import the TWEEN library
import * as TWEEN from "@tweenjs/tween.js";
import TemplateFor3D from "components/templates/mainTemplate3D";

class MainPage3D extends TemplateFor3D {
  private postprocessing: any | undefined = {};

  private composer: EffectComposer | undefined;

  private sphere: THREE.Object3D | undefined;

  initControls(): void {
    this.camera?.position.set(0, 0, 200);
  }

  initShader(): void {
    this.sphere = new THREE.Object3D();
    const geometry = new THREE.SphereGeometry(1, 4, 4);
    const material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      flatShading: true,
    });

    for (let i = 0; i < 100; i++) {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position
        .set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)
        .normalize();
      mesh.position.multiplyScalar(Math.random() * 400);
      mesh.rotation.set(
        Math.random() * 2,
        Math.random() * 2,
        Math.random() * 2,
      );
      mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 50;
      this.sphere.add(mesh);
    }
    this.scene?.add(this.sphere);
  }

  // handleRouteChange() {
  //   if (this.props.location.pathname === "/projects") {
  //     // Set camera position and other settings as per your need.
  //     this.camera.position.z = 5;
  //
  //     // Depending upon your implementation and use case, you might also want to update your renderer
  //   }
  // }

  componentDidUpdate(prevProps: Readonly<any>) {
    if (prevProps.currentPath !== this.props.currentPath) {
      console.log("state ", this.props.currentPath);
      if (this.props.currentPath === "/main/projects" && this.camera) {
        console.log("state 2");

        new TWEEN.Tween(this.camera.position)
          .to(
            {
              x: Math.random() * 150 - 75, // changes x position to a random number between -25 and 25
              y: Math.random() * 150 - 75, // changes y position to a random number between -25 and 25
              z: Math.random() * 150 - 75, // changes z position to a random number between -25 and 25
            },
            2000,
          ) // takes 2000 milliseconds to tween to the new position
          .easing(TWEEN.Easing.Quadratic.Out) // smooth transition
          .onUpdate(() => {
            this.camera?.lookAt(new THREE.Vector3(0, 0, 0));
          })
          .start(); // start the tween immediately

        // Ensure to update the animations in your animation loop.
      }

      if (this.props.currentPath === "/main" && this.camera) {
        new TWEEN.Tween(this.camera.position)
            .to(
                {
                  x: 0, // changes x position to a random number between -25 and 25
                  y: 0, // changes y position to a random number between -25 and 25
                  z: 200, // changes z position to a random number between -25 and 25
                },
                2000,
            ) // takes 2000 milliseconds to tween to the new position
            .easing(TWEEN.Easing.Quadratic.Out) // smooth transition
            .onUpdate(() => {
              this.camera?.lookAt(new THREE.Vector3(0, 0, 0));
            })
            .start(); // start the tween immediately
      }
    }
  }

  componentDidMount(): void {
    super.componentDidMount();
    this.init3D(undefined, {});
    this.initShader();
    this.initLight();
    this.initControls();
    this.initPostprocessing();
    this.attachMouseMoveEvent();
    this.animate();
  }

  initPostprocessing() {
    const renderPass = new RenderPass(
      this.scene as THREE.Scene,
      this.camera as THREE.PerspectiveCamera,
    );

    const bokehPass = new BokehPass(
      this.scene as THREE.Scene,
      this.camera as THREE.PerspectiveCamera,
      {
        focus: 1.0,
        aperture: 0.025,
        maxblur: 0.01,
      },
    );

    const outputPass = new OutputPass();

    this.composer = new EffectComposer(this.renderer as THREE.WebGLRenderer);

    this.composer.addPass(renderPass);
    this.composer.addPass(bokehPass);
    this.composer.addPass(outputPass);

    this.postprocessing.composer = this.composer;
    this.postprocessing.bokeh = bokehPass;
  }

  animate(): void {
    if (!this.looped || !this.state.isTabActive) return;
    this.postprocessing.composer.render(0.2);
    if (!this.camera || !this.mouse) return;
    this.camera.position.x += (this.mouse.x - this.camera.position.x) * 0.036;
    this.camera.position.y += (-this.mouse.y - this.camera.position.y) * 0.036;
    TWEEN.update();
    if (this.sphere) {
      this.sphere.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.rotation.x += 0.01;
        }
      });
    }
    requestAnimationFrame(this.animate.bind(this));
  }

  render(): React.ReactNode {
    return (
      <div>
        <div
          ref={(ref) => {
            this.canvasDiv = ref;
          }}
          className="canvasDiv main-canvasDiv"
        />
        <Outlet />
      </div>
    );
  }
}

function MainWithLocation() {
  const location = useLocation();
  const [currentPath, setPath] = useState(location.pathname);

  useEffect(() => {
    setPath(location.pathname);
  }, [location]);

  return <MainPage3D currentPath={currentPath} />;
}

export default MainWithLocation;
