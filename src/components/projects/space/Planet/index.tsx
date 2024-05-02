/**
 * Created by Ellyson on 5/11/2018.
 */

import * as THREE from "three";
import TemplateFor3D from "components/templates/mainTemplate3D";

import xpos from "assets/img/skyBox/planet/nebula-xpos.png";
import xneg from "assets/img/skyBox/planet/nebula-xneg.png";
import ypos from "assets/img/skyBox/planet/nebula-ypos.png";
import yneg from "assets/img/skyBox/planet/nebula-yneg.png";
import zpos from "assets/img/skyBox/planet/nebula-zpos.png";
import zneg from "assets/img/skyBox/planet/nebula-zneg.png";
import planet from "assets/img/map/planet.png";
import fragmentShader from "./shaders/fragmentShader.frag";
import vertexShader from "./shaders/vertexShader.vert";

export default class Planet extends TemplateFor3D {
  planet: THREE.Mesh | undefined;

  initScene(): void  {
    super.initScene();
    if (!this.scene) return;
    this.scene.background = new THREE.Color(0x000000);
  }

  initLight(): void  {
    const light: THREE.AmbientLight = new THREE.AmbientLight(0x404040, 2); // soft white light
    this.scene?.add(light);
  }

  initControls(): void  {
    super.initControls();
    if (!this.camera) return;
    this.camera.position.z = 320;
  }

  initPlanet(): void  {
    const texture: THREE.Texture = new THREE.TextureLoader().load(planet);
    const sphereGeo: THREE.SphereGeometry = new THREE.SphereGeometry(100, 32, 16);
    const sphereMaterial: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide,
      map: texture,
    });
    this.planet = new THREE.Mesh(sphereGeo, sphereMaterial);
    this.scene?.add(this.planet);
    const customMaterial: THREE.ShaderMaterial = new THREE.ShaderMaterial({
      uniforms: {},
      vertexShader,
      fragmentShader,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
    });

    const ballGeometry: THREE.SphereGeometry = new THREE.SphereGeometry(120, 32, 16);
    const ball: THREE.Mesh  = new THREE.Mesh(ballGeometry, customMaterial);
    this.scene?.add(ball);
  }

  initSkyBox(): void  {
    // const skyGeometry = new THREE.BoxGeometry(10000, 10000, 10000);
    const imageURLs = [];

    imageURLs.push(xpos);
    imageURLs.push(xneg);
    imageURLs.push(ypos);
    imageURLs.push(yneg);
    imageURLs.push(zpos);
    imageURLs.push(zneg);

    const textureCube: THREE.CubeTexture = new THREE.CubeTextureLoader().load(imageURLs);
    textureCube.mapping = THREE.CubeRefractionMapping;
    if (!this.scene) return;
    this.scene.background = textureCube;
  }

  componentDidMount(): void {
    super.componentDidMount()
    this.init3D();
    this.initLight();
    this.initPlanet();
    this.initSkyBox();
    this.initControls();
    this.animate();
  }

  animate(): void  {
    if (!this.looped || !this.state.isTabActive) return;
    super.animate();
    if (!this.planet) return;
    this.planet.rotation.y += 0.001;
  }
}
