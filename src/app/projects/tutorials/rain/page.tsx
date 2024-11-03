'use client';

import React from "react";
import * as THREE from "three";
import TemplateFor3D from "test/projects/templates/mainTemplate3D";

import smoke from "assets/img/smoke.png";
import drop from "assets/img/drop.png";

export default class Rain extends TemplateFor3D {
  static rainCount = 15000;

  private cloudParticles: any[];

  private flash: THREE.PointLight = new THREE.PointLight(
    0x062d89,
    30,
    800,
    0
  );

  private ambient: THREE.AmbientLight | undefined;

  private directionalLight: THREE.DirectionalLight | undefined;

  // private portalLight: THREE.PointLight | undefined;

  private rainGeo: THREE.BufferGeometry | undefined;

  // private rainDrop: THREE.Vector3 | undefined;

  private rainMaterial: THREE.PointsMaterial | undefined;

  private rain: THREE.Points | undefined;

  private cloudGeo: THREE.PlaneGeometry | undefined;

  private cloudMaterial: THREE.MeshStandardMaterial | undefined;

  constructor(props: any) {
    super(props);
    this.cloudParticles = [];
    this.flash.position.set(200, 300, 100);
  }

  initControls() {
    // super.initControls();
    if (this.camera) {
      this.camera.position.z = 1;
      this.camera.rotation.x = 1.16;
      this.camera.rotation.y = -0.12;
      this.camera.rotation.z = 0.27;
    }
  }

  initLight() {
    this.ambient = new THREE.AmbientLight(0x666666);
    this.scene?.add(this.ambient);

    this.directionalLight = new THREE.DirectionalLight(0xffeedd);
    this.directionalLight.position.set(0, 0, 1);
    this.scene?.add(this.directionalLight);

    this.flash = new THREE.PointLight(0x062d89, 30, 500, 0.1);
    this.flash.position.set(200, 300, 100);
    this.scene?.add(this.flash);
    if (this.scene && this.camera) {
      this.scene.fog = new THREE.FogExp2(0x222233, 0.0015);
      this.camera.far = 1000;
      this.renderer?.setClearColor(this.scene.fog.color);
    }
  }

  componentDidMount() {
    super.componentDidMount()
    this.init3D(undefined, {});
    // point light fix
    if (this.renderer) {
      // this.renderer.useLegacyLights = true;
    }
    this.initLight();
    this.initControls();
    this.initRain();
    this.animate();
  }

  // initPointLight() {
  //   this.portalLight = new THREE.PointLight(0x062d89, 30, 600, 1.7);
  //   this.portalLight.position.set(0, 0, 0);
  //   this.portalLight.power = 0;
  //   this.scene?.add(this.portalLight);
  // }

  initRain() {
    const loader = new THREE.TextureLoader();
    loader.load(drop.src, (texture: any) => {
      const position = [];
      const originalPosition = [];
      const velocity = [];
      this.rainGeo = new THREE.BufferGeometry();
      for (let i = 0; i < Rain.rainCount; i++) {
        const tmp = Math.random() * 400 - 200;
        const tmp2 = Math.random() * 400 - 300;
        position.push(tmp, Math.random() * 500 - 250, tmp2);
        originalPosition.push(tmp, tmp2);
        velocity.push(0);
      }
      this.rainGeo.setAttribute(
        "position",
        new THREE.BufferAttribute(new Float32Array(position), 3)
      );
      this.rainGeo.setAttribute(
        "originalPosition",
        new THREE.BufferAttribute(new Float32Array(originalPosition), 2)
      );
      this.rainGeo.setAttribute(
        "velocity",
        new THREE.BufferAttribute(new Float32Array(velocity), 1)
      );
      this.rainMaterial = new THREE.PointsMaterial({
        color: 0xaaaaaa,
        size: 1,
        map: texture,
        depthTest: false,
        blending: THREE.AdditiveBlending,
        opacity: 1,
        transparent: true,
      });
      this.rain = new THREE.Points(this.rainGeo, this.rainMaterial);
      this.scene?.add(this.rain);
    });

    loader.load(smoke.src, (texture) => {
      this.cloudGeo = new THREE.PlaneGeometry(400, 400);
      this.cloudMaterial = new THREE.MeshStandardMaterial({
        map: texture,
        transparent: true,
      });

      for (let p = 0; p < 35; p++) {
        const cloud = new THREE.Mesh(this.cloudGeo, this.cloudMaterial);
        cloud.position.set(
          Math.random() * 800 - 400,
          500,
          Math.random() * 500 - 450
        );
        cloud.rotation.x = 1.16;
        cloud.rotation.y = -0.12;
        cloud.rotation.z = Math.random() * 360;
        cloud.material.opacity = 0.6;
        this.cloudParticles.push(cloud);
        this.scene?.add(cloud);
      }
    });
  }

  animate() {
    if (!this.looped || !this.state.isTabActive) return;
    this.cloudParticles.forEach((p) => {
      const { rotation } = p;
      rotation.z -= 0.001;
    });
    if (this.rainGeo && this.rainGeo && this.rain) {
      const position = this.rainGeo.getAttribute("position");
      const originalP = this.rainGeo.getAttribute("originalPosition");
      const velocity = this.rainGeo.getAttribute("velocity");

      position.needsUpdate = true;
      velocity.needsUpdate = true;

      const positionArray = position.array;
      const originalPArray = originalP.array;
      const velocityArray = velocity.array;

      for (let i = 0, { length } = velocityArray; i < length; i++) {
        velocityArray[i] -= Math.random() * 0.05;
        positionArray[i * 3 + 1] += velocityArray[i];

        if (originalPArray[i * 2 + 1] < 10 && originalPArray[i * 2 + 1] > -50) {
          positionArray[i * 3 + 1] += velocityArray[i] / 2;
        } else {
          positionArray[i * 3 + 1] += velocityArray[i];
        }
        if (positionArray[i * 3 + 1] < -200) {
          positionArray[i * 3 + 1] = 200;
          velocityArray[i] = 0;
        }
        if (
          originalPArray[i * 2 + 1] < 10 &&
          originalPArray[i * 2 + 1] > -50 &&
          originalPArray[i * 2] < 30 &&
          originalPArray[i * 2] > -30
        ) {
          if (positionArray[i * 3] < 0) {
            positionArray[i * 3] -= 0.2;
          } else {
            positionArray[i * 3] += 0.2;
          }
        }
        if (originalPArray[i * 2 + 1] < 10 && originalPArray[i * 2 + 1] > -50) {
          if (positionArray[i * 3] > 30) {
            positionArray[i * 3] = originalPArray[i * 2];
          } else if (positionArray[i * 3] < -30) {
            positionArray[i * 3] = originalPArray[i * 2];
          }
        }
      }

      this.rain.rotation.y += 0.002;
    }

    if (Math.random() > 0.93 || this.flash.power > 100) {
      if (this.flash.power < 100)
        this.flash.position.set(
          Math.random() * 400,
          300 + Math.random() * 200,
          100
        );
      this.flash.power = 50 + Math.random() * 500;
    }
    super.animate();
  }

  render() {
    return (
      <div>
        <header id="sky" style={{ width: "auto" }} />
        <div ref={ (ref) => {this.canvasDiv = ref}} className="canvasDiv" />
      </div>
    );
  }
}
