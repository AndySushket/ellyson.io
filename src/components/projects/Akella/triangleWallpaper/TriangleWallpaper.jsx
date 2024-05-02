/**
 * Created by Ellyson on 5/11/2018.
 */

import React from "react";
import Delaunator from "delaunator";
import { Button } from "react-bootstrap";
import * as THREE from "three";
import TemplateFor3D from "components/templates/mainTemplate3D";
// import Mouse from "utils/plugins/mouse";
import Particle from "utils/plugins/particles";
import Perlin from "utils/plugins/perlin";
import vertexShader from "./shaders/vertexShader.vert";
import fragmentShader from "./shaders/fragmentShader.frag";

const image = require("assets/img/image.jpg");

export default class TriangleWallpaper extends TemplateFor3D {
  constructor() {
    super();
    this.raycaster = new THREE.Raycaster();
    this.triangles = this.Triangles();
  }

  Triangles() {
    this.dots = [];
    this.myDots = [];

    this.dots.push([0, 0]); // left-top corner
    this.dots.push([1366, 0]); // right-top corner
    this.dots.push([1366, 768]); // right-bottom corner
    this.dots.push([0, 768]); // left-bottom corner

    for (let i = 0; i < 3050; i++) {
      // simple dots
      this.dots.push([Math.random() * 1366, Math.random() * 768]);
    }

    this.dots.forEach((d) => {
      // dots with physics
      this.myDots.push(new Particle(d[0], d[1], 0));
    });

    const delaunay = Delaunator.from(this.dots);
    return delaunay.triangles;
  }

  onDocumentMouseDown(event) {
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    if (this.camera ) {
      this.raycaster.setFromCamera(mouse, this.camera.clone());
      if (this.state.checked)
        this.intersects = this.raycaster.intersectObject(this.planeMesh);
    }
  }

  initScene() {
    super.initScene();
    this.scene.background = new THREE.Color(0xffffff);
  }

  initControls() {
    super.initControls();
    this.camera.position.set(1366 / 2, 768 / 2, 770);
    this.controls.target.set(1366 / 2, 768 / 2, 0);
  }

  initPlateMesh() {
    const loader = new THREE.TextureLoader();
    loader.load(image, (texture) => {
      const position = [];
      const indexes = [];
      this.dots.forEach((d) => {
        position.push(d[0], d[1], 0);
      });
      for (let i = 0; i < this.triangles.length; i += 3) {
        indexes.push(
          this.triangles[i],
          this.triangles[i + 1],
          this.triangles[i + 2]
        );
      }
      this.geometry = new THREE.BufferGeometry();
      this.geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(new Float32Array(position), 3)
      );
      this.geometry.setIndex(indexes);
      const material = new THREE.ShaderMaterial({
        extensions: {
          derivatives: "#extension GL_OES_standard_derivatives : enable",
        },
        uniforms: {
          textureSampler: { type: "t", value: texture },
        },
        vertexShader,
        fragmentShader,
        side: THREE.DoubleSide,
      });

      this.geometry.computeBoundingBox();
      // --------------------------- for adapting image texture ------------------
      const { max } = this.geometry.boundingBox;
      const { min } = this.geometry.boundingBox;
      const offset = new THREE.Vector2(0 - min.x, 0 - min.y);
      const range = new THREE.Vector2(max.x - min.x, max.y - min.y);
      const posArray = this.geometry.getAttribute('position').array;
      const uv = [];

      for (let i = 0; i < posArray.length; i+= 3) {
        const v = new THREE.Vector3(posArray[i],
            posArray[i + 1],
            posArray[i + 2]);
        uv.push(
            (v.x + offset.x) / range.x,
            (v.y + offset.y) / range.y,
        );
      }
      this.geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
      // --------------------------- end  ------------------------
      this.planeMesh = new THREE.Mesh(this.geometry, material);
      this.scene.add(this.planeMesh);
    });
  }

  handleWindowResize() {
    this.HEIGHT = window.innerHeight;
    this.WIDTH = window.innerWidth;
    this.renderer?.setSize(this.WIDTH, this.HEIGHT);
    if (this.camera) {
      this.camera.aspect = this.WIDTH / this.HEIGHT;
      this.camera.updateProjectionMatrix();
    }
  }

  componentDidMount() {
    super.componentDidMount()
    this.init3D();
    this.initControls();
    this.initPlateMesh();
    // this.pos = new Mouse(this.renderer.domElement);
    window.addEventListener(
      "mousemove",
      this.onDocumentMouseDown.bind(this),
      false
    );
    window.addEventListener(
      "resize",
      this.handleWindowResize.bind(this),
      false
    );
    this.animate();
  }

  animate() {
    if (!this.looped || !this.state.isTabActive) return;
    super.animate();
    if (this.geometry) {
      const  position = this.geometry.getAttribute("position");
      this.myDots.forEach((d, i) => {
        if (this.state.checked) {
          if (this.intersects && this.intersects.length > 0)
            d.think(this.intersects[0].point);
          position.array[i * 3 + 2] = d.z;
        } else
          position.array[i * 3 + 2] =
            60 * Perlin(d.x / 50, d.y / 50, this.time / 100);
      });
      position.needsUpdate = true;
    }
  }

  render() {
    return (
      <div>
        <header>
          <Button
            onClick={() => this.setState({ checked: !this.state.checked })}
          >
            {!this.state.checked ? "MouseMod" : "Perlin Noise"}
          </Button>
        </header>
        <div ref={ (ref) => {this.canvasDiv = ref}} className="canvasDiv" />
      </div>
    );
  }
}
