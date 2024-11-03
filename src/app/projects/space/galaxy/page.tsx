/**
 * Created by Ellyson on 5/11/2018.
 */

'use client';

import * as THREE from "three";
import TemplateFor3D from "test/projects/templates/mainTemplate3D";


import saturn from "assets/img/Galaxy/saturn.jpg";
import titano from "assets/img/Galaxy/titano2.jpg";
import titano2 from "assets/img/Galaxy/moon.jpg";

import dn from "assets/img/skyBox/galaxy/dn.png";
import up from "assets/img/skyBox/galaxy/up.png";
import lf from "assets/img/skyBox/galaxy/lf.png";
import rt from "assets/img/skyBox/galaxy/rt.png";
import ft from "assets/img/skyBox/galaxy/ft.png";
import bk from "assets/img/skyBox/galaxy/bk.png";
import vertexSaturn from "./Shaders/saturn.vert";
import fragSaturn from "./Shaders/saturn.frag";
import vertexDerbis from "./Shaders/ring.vert";
import fragDerbis from "./Shaders/ring.frag";
import vertTitan from "./Shaders/titan.vert";
import fragTitan from "./Shaders/titan.frag";

const textureLoader = new THREE.TextureLoader();

const shadowType = 1;
const speed = 0.002;
const n = 500000;

export default class Galaxy extends TemplateFor3D {
  
  saturn: THREE.Mesh | undefined;

    titano: THREE.Mesh | undefined;

    externalRing: THREE.Points | undefined;

    internalRing: THREE.Points | undefined;

    scene: THREE.Scene | undefined;

    camera: THREE.PerspectiveCamera | undefined;
    
  initCamera(cameraParam: any): void {
    super.initCamera(cameraParam);
    this.camera?.position.set(-285, 15, -115);
  }

  initControls() {
    super.initControls();
    this.controls.enablePan = false;
    this.controls.update();
  }

  initSaturn(): void {
    const saturnMaterial = new THREE.ShaderMaterial({
      uniforms: {
        saturnTexture: { value: textureLoader.load(saturn.src) },
        time: { value: 1.0 },
      },
      vertexShader: vertexSaturn,
      fragmentShader: fragSaturn,
    });
    this.saturn = new THREE.Mesh(
      new THREE.SphereGeometry(100, 64, 64),
      saturnMaterial
    );
    this.scene?.add(this.saturn);
  }

  initTitano(): void {
    const titanoMaterial = new THREE.ShaderMaterial({
      uniforms: {
        // @ts-ignore
        titanTexture: { type: "t", value: textureLoader.load(titano) },
        // @ts-ignore
        textureNormal: { type: "t", value: textureLoader.load(titano2) },
        time: { value: 1.0 },
      },
      vertexShader: vertTitan,
      fragmentShader: fragTitan,
    });
    this.titano = new THREE.Mesh(
      new THREE.SphereGeometry(20, 64, 64),
      titanoMaterial
    );
    this.scene?.add(this.titano);
  }

  initRings(): void {
    const internalRingGeometry = new THREE.BufferGeometry();
    const externalRingMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 10.0 },
        stretch: { value: new THREE.Vector3(290, 40, 180) },
        shadowType: { value: shadowType },
      },
      vertexShader: vertexDerbis,
      fragmentShader: fragDerbis,
    });

    const internalRingMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 10.0 },
        stretch: { value: new THREE.Vector3(190, 30, 135) },
        shadowType: { value: 1.0 },
      },
      vertexShader: vertexDerbis,
      fragmentShader: fragDerbis,
    });

    const thetas = new Float32Array(n);
    const delayX = new Float32Array(n);
    const delayZ = new Float32Array(n);

    for (let i = 0; i < n; i++) {
      thetas[i] = Math.random() * 2 * Math.PI;
      delayX[i] = (Math.random() - 0.5) * 80;
      delayZ[i] = (Math.random() - 0.5) * 30;
    }

    internalRingGeometry
      .setAttribute("base_angle", new THREE.BufferAttribute(thetas, 1))
      .setAttribute("offsetX", new THREE.BufferAttribute(delayX, 1))
      .setAttribute("offsetZ", new THREE.BufferAttribute(delayZ, 1))
      .setAttribute(
        "position",
        new THREE.BufferAttribute(new Float32Array(n * 3), 3)
      );

    this.externalRing = new THREE.Points(
      internalRingGeometry,
      externalRingMaterial
    );
    this.internalRing = new THREE.Points(
      internalRingGeometry.clone(),
      internalRingMaterial
    );
    this.scene?.add(this.internalRing);
    this.scene?.add(this.externalRing);
  }

  Saturn(): void {
    this.initSaturn();
    this.initTitano();
    this.initRings();
    this.initSkyBox();
  }

  initSkyBox(): void {
    const imageURLs = [lf.src, rt.src, dn.src, up.src, bk.src, ft.src];
    const textureCube = new THREE.CubeTextureLoader().load(imageURLs);
    textureCube.mapping = THREE.CubeRefractionMapping;
    if (this.scene) {
        this.scene.background = textureCube;
    }
  }

  componentDidMount(): void {
    super.componentDidMount()
    this.init3D();
    this.Saturn();
    this.initControls();
    this.animate();
  }

  animate(): void {
    if (!this.looped || !this.state.isTabActive) return;
    super.animate();
    if (this.saturn && this.titano && this.internalRing && this.externalRing) {
      this.saturn.rotation.y -= speed;
      (this.saturn.material as THREE.ShaderMaterial).uniforms.time.value += 0.3 * speed;
      (this.titano.material as THREE.ShaderMaterial).uniforms.time.value += 0.8 * speed;
      this.titano.geometry.rotateY(0.01);
      (this.internalRing.material as THREE.ShaderMaterial).uniforms.time.value += 0.55 * speed;
      (this.externalRing.material as THREE.ShaderMaterial).uniforms.time.value += 0.55 * speed;
      (this.internalRing.material as THREE.ShaderMaterial).uniforms.shadowType.value = shadowType;
      (this.externalRing.material as THREE.ShaderMaterial).uniforms.shadowType.value = shadowType;
    }
  }
}
