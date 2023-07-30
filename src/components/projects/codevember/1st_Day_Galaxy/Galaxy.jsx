/**
 * Created by Ellyson on 5/11/2018.
 */

import * as THREE from "three";
import TemplateFor3D from "components/templates/mainTemplate3D";
import fragTitan from "./Shaders/titan.frag";
import vertTitan from "./Shaders/titan.vert";
import fragDerbis from "./Shaders/ring.frag";
import vertexDerbis from "./Shaders/ring.vert";
import fragSaturn from "./Shaders/saturn.frag";
import vertexSaturn from "./Shaders/saturn.vert";

const saturn = require("assets/img/Galaxy/saturn.jpg");
const titano = require("assets/img/Galaxy/titano2.jpg");
const titano2 = require("assets/img/Galaxy/moon.jpg");

const dn = require(`assets/img/skyBox/galaxy/dn.png`);
const up = require(`assets/img/skyBox/galaxy/up.png`);
const lf = require(`assets/img/skyBox/galaxy/lf.png`);
const rt = require(`assets/img/skyBox/galaxy/rt.png`);
const ft = require(`assets/img/skyBox/galaxy/ft.png`);
const bk = require(`assets/img/skyBox/galaxy/bk.png`);

const textureLoader = new THREE.TextureLoader();

const shadowType = 1;
const speed = 0.002;
const n = 500000;

export default class Galaxy extends TemplateFor3D {
  initCamera() {
    super.initCamera();
    this.camera.position.set(-285, 15, -115);
  }

  initControls() {
    super.initControls();
    this.controls.enablePan = false;
    this.controls.update();
  }

  initSaturn() {
    const saturnMaterial = new THREE.ShaderMaterial({
      uniforms: {
        saturnTexture: { type: "t", value: textureLoader.load(saturn) },
        time: { value: 1.0 },
      },
      vertexShader: vertexSaturn,
      fragmentShader: fragSaturn,
    });
    this.saturn = new THREE.Mesh(
      new THREE.SphereGeometry(100, 64, 64),
      saturnMaterial
    );
    this.scene.add(this.saturn);
  }

  initTitano() {
    const titanoMaterial = new THREE.ShaderMaterial({
      uniforms: {
        titanTexture: { type: "t", value: textureLoader.load(titano) },
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
    this.scene.add(this.titano);
  }

  initRings() {
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
    this.scene.add(this.internalRing);
    this.scene.add(this.externalRing);
  }

  Saturn() {
    this.initSaturn();
    this.initTitano();
    this.initRings();
    this.initSkyBox();
  }

  initSkyBox() {
    const imageURLs = [lf, rt, dn, up, bk, ft];
    const textureCube = new THREE.CubeTextureLoader().load(imageURLs);
    textureCube.mapping = THREE.CubeRefractionMapping;
    this.scene.background = textureCube;
  }

  componentDidMount() {
    this.init3D();
    this.Saturn();
    this.initControls();
    this.animate();
  }

  animate() {
    if (!this.looped) return;
    super.animate();
    this.saturn.rotation.y -= speed;
    this.saturn.material.uniforms.time.value += 0.3 * speed;
    this.titano.material.uniforms.time.value += 0.8 * speed;
    this.titano.geometry.rotateY(0.01);
    this.internalRing.material.uniforms.time.value += 0.55 * speed;
    this.externalRing.material.uniforms.time.value += 0.55 * speed;
    this.internalRing.material.uniforms.shadowType.value = shadowType;
    this.externalRing.material.uniforms.shadowType.value = shadowType;
  }
}
