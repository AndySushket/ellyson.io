/**
 * Created by Ellyson on 5/11/2018.
 */

import * as THREE from "three";
import TemplateFor3D from "test/projects/templates/mainTemplate3D";
import { Sky } from "three/examples/jsm/objects/Sky";

//floor
const floorAlpha = require("./resources/floor/alpha.webp");
const floorColor = require("./resources/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_diff_1k.jpg");
const floorNormal = require("./resources/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_nor_gl_1k.jpg");
const floorARM = require("./resources/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_arm_1k.jpg");
const floorDISP = require("./resources/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_disp_1k.jpg");

//walls
const wallsColor = require("./resources/wall/castle_brick_broken_06_1k/castle_brick_broken_06_diff_1k.jpg");
const wallsNormal = require("./resources/wall/castle_brick_broken_06_1k/castle_brick_broken_06_nor_gl_1k.jpg");
const wallsARM = require("./resources/wall/castle_brick_broken_06_1k/castle_brick_broken_06_arm_1k.jpg");

//roof
const roofColor = require("./resources/roof/roof_slates_02_1k/roof_slates_02_diff_1k.jpg");
const roofNormal = require("./resources/roof/roof_slates_02_1k/roof_slates_02_nor_gl_1k.jpg");
const roofARM = require("./resources/roof/roof_slates_02_1k/roof_slates_02_arm_1k.jpg");

//bush

const bushColor = require("./resources/bush/leaves_forest_ground_1k/leaves_forest_ground_diff_1k.jpg");
const bushNormal = require("./resources/bush/leaves_forest_ground_1k/leaves_forest_ground_nor_gl_1k.jpg");
const bushARM = require("./resources/bush/leaves_forest_ground_1k/leaves_forest_ground_arm_1k.webp");

//graves

const graveColor = require("./resources/grave/plastered_stone_wall_1k/plastered_stone_wall_diff_1k.jpg");
const graveNormal = require("./resources/grave/plastered_stone_wall_1k/plastered_stone_wall_nor_gl_1k.jpg");
const graveARM = require("./resources/grave/plastered_stone_wall_1k/plastered_stone_wall_arm_1k.jpg");

//doors

const doorColor = require("./resources/door/color.jpg");
const doorNormal = require("./resources/door/normal.jpg");
const doorAlpha = require("./resources/door/alpha.jpg");
const doorAO = require("./resources/door/ambientOcclusion.jpg");
const doorHeight = require("./resources/door/height.jpg");
const doorMetalness = require("./resources/door/metalness.jpg");
const doorRoughness = require("./resources/door/roughness.jpg");

export default class HauntedHouse extends TemplateFor3D {
  initControls() {
    super.initControls();
    this.camera.position.set(0, 0, 10);
  }

  initLight() {
    const ambientLight = new THREE.AmbientLight("#86cdff", 0.275);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight("#86cdff", 1);
    directionalLight.castShadow = true;
    directionalLight.position.set(3, 2, -8);

    directionalLight.shadow.mapSize.width = 256;
    directionalLight.shadow.mapSize.height = 256;
    directionalLight.shadow.camera.top = 8;
    directionalLight.shadow.camera.right = 8;
    directionalLight.shadow.camera.bottom = -8;
    directionalLight.shadow.camera.left = -8;
    directionalLight.shadow.camera.near = 1;
    directionalLight.shadow.camera.far = 20;
    this.scene.add(directionalLight);

    const doorLight = new THREE.PointLight("#ff7d46", 5);
    doorLight.position.set(0, 2.2, 2.5);
    this.house.add(doorLight);
  }

  initProject() {
    ///texture
    const textureLoader = new THREE.TextureLoader();

    const floorAlphaTexture = textureLoader.load(floorAlpha);
    const floorColorTexture = textureLoader.load(floorColor);
    floorColorTexture.colorSpace = THREE.SRGBColorSpace;
    floorColorTexture.wrapS = THREE.RepeatWrapping;
    floorColorTexture.wrapT = THREE.RepeatWrapping;
    floorColorTexture.repeat.set(8, 8);
    const floorNormalTexture = textureLoader.load(floorNormal);
    floorNormalTexture.wrapS = THREE.RepeatWrapping;
    floorNormalTexture.wrapT = THREE.RepeatWrapping;
    floorNormalTexture.repeat.set(8, 8);
    const floorARMTexture = textureLoader.load(floorARM);
    floorARMTexture.wrapS = THREE.RepeatWrapping;
    floorARMTexture.wrapT = THREE.RepeatWrapping;
    floorARMTexture.repeat.set(8, 8);
    const floorDISPTexture = textureLoader.load(floorDISP);
    floorDISPTexture.wrapS = THREE.RepeatWrapping;
    floorDISPTexture.wrapT = THREE.RepeatWrapping;
    floorDISPTexture.repeat.set(8, 8);

    const wallsColorTexture = textureLoader.load(wallsColor);
    wallsColorTexture.colorSpace = THREE.SRGBColorSpace;
    const wallsNormalTexture = textureLoader.load(wallsNormal);
    const wallsARMTexture = textureLoader.load(wallsARM);

    const roofColorTexture = textureLoader.load(roofColor);
    roofColorTexture.colorSpace = THREE.SRGBColorSpace;
    const roofNormalTexture = textureLoader.load(roofNormal);
    const roofARMTexture = textureLoader.load(roofARM);

    roofColorTexture.wrapS = THREE.RepeatWrapping;
    roofColorTexture.wrapT = THREE.RepeatWrapping;
    roofColorTexture.repeat.set(3, 1);

    roofNormalTexture.wrapS = THREE.RepeatWrapping;
    roofNormalTexture.wrapT = THREE.RepeatWrapping;
    roofNormalTexture.repeat.set(3, 1);

    roofARMTexture.wrapS = THREE.RepeatWrapping;
    roofARMTexture.wrapT = THREE.RepeatWrapping;
    roofARMTexture.repeat.set(3, 1);

    const bushColorTexture = textureLoader.load(bushColor);
    bushColorTexture.colorSpace = THREE.SRGBColorSpace;
    const bushNormalTexture = textureLoader.load(bushNormal);
    const bushARMTexture = textureLoader.load(bushARM);

    bushColorTexture.wrapS = THREE.RepeatWrapping;
    bushColorTexture.repeat.set(2, 1);

    bushNormalTexture.wrapS = THREE.RepeatWrapping;
    bushNormalTexture.repeat.set(2, 1);

    bushARMTexture.wrapS = THREE.RepeatWrapping;
    bushARMTexture.repeat.set(2, 1);

    const graveColorTexture = textureLoader.load(graveColor);
    graveColorTexture.colorSpace = THREE.SRGBColorSpace;
    const graveNormalTexture = textureLoader.load(graveNormal);
    const graveARMTexture = textureLoader.load(graveARM);

    graveColorTexture.repeat.set(0.3, 0.4);
    graveNormalTexture.repeat.set(0.3, 0.4);
    graveARMTexture.repeat.set(0.3, 0.4);

    const doorColorTexture = textureLoader.load(doorColor);
    doorColorTexture.colorSpace = THREE.SRGBColorSpace;
    const doorNormalTexture = textureLoader.load(doorNormal);
    const doorAlphaTexture = textureLoader.load(doorAlpha);
    const doorARMTexture = textureLoader.load(doorAO);
    const doorHeightTexture = textureLoader.load(doorHeight);
    const doorMetalnessTexture = textureLoader.load(doorMetalness);
    const doorRoughnessTexture = textureLoader.load(doorRoughness);

    ///objects

    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);

    const sphereMaterial = new THREE.MeshStandardMaterial({
      roughness: 0.7,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    this.scene.add(sphere);

    //floor

    const floorGeometry = new THREE.PlaneGeometry(20, 20, 100, 100);
    const floorMaterial = new THREE.MeshStandardMaterial({
      alphaMap: floorAlphaTexture,
      map: floorColorTexture,
      transparent: true,
      aoMap: floorARMTexture,
      roughnessMap: floorARMTexture,
      metalnessMap: floorARMTexture,
      normalMap: floorNormalTexture,
      displacementMap: floorDISPTexture,
      displacementScale: 0.3,
      displacementBias: -0.1,
    });

    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.receiveShadow = true;

    floor.rotation.x = -Math.PI * 0.5;
    this.scene.add(floor);

    //house

    this.house = new THREE.Group();
    this.scene.add(this.house);

    //walls

    const wallsGeometry = new THREE.BoxGeometry(4, 2.5, 4);
    const wallsMaterial = new THREE.MeshStandardMaterial({
      map: wallsColorTexture,
      aoMap: wallsARMTexture,
      roughnessMap: wallsARMTexture,
      metalnessMap: wallsARMTexture,
      normalMap: wallsNormalTexture,
    });
    const walls = new THREE.Mesh(wallsGeometry, wallsMaterial);
    walls.position.y = 1.25;
    walls.castShadow = true;
    walls.receiveShadow = true;
    this.house.add(walls);

    //roof

    const roofGeometry = new THREE.ConeGeometry(3.5, 2, 4);
    const roofMaterial = new THREE.MeshStandardMaterial({
      map: roofColorTexture,
      aoMap: roofARMTexture,
      roughnessMap: roofARMTexture,
      metalnessMap: roofARMTexture,
      normalMap: roofNormalTexture,
    });

    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.y = 2.5 + 1;
    roof.rotation.y = Math.PI * 0.25;
    roof.castShadow = true;
    this.house.add(roof);

    //door

    const doorGeometry = new THREE.PlaneGeometry(2.2, 2.2, 100, 100);
    const doorMaterial = new THREE.MeshStandardMaterial({
      map: doorColorTexture,
      // normalMap: doorNormalTexture,
      alphaMap: doorAlphaTexture,
      // aoMap: doorARMTexture,
      displacementMap: doorHeightTexture,
      displacementScale: 0.15,
      displacementBias: -0.04,
      // transparent: true,
      // metalnessMap: doorMetalnessTexture,
      // roughnessMap: doorRoughnessTexture,
    });
    const door = new THREE.Mesh(doorGeometry, doorMaterial);
    door.position.y = 1;
    door.position.z = 2 + 0.01;
    this.house.add(door);

    //bushes

    const bushGeometry = new THREE.SphereGeometry(1, 32, 32);
    const bushMaterial = new THREE.MeshStandardMaterial({
      map: bushColorTexture,
      aoMap: bushARMTexture,
      roughnessMap: bushARMTexture,
      metalnessMap: bushARMTexture,
      normalMap: bushNormalTexture,
    });
    const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
    bush1.scale.set(0.5, 0.5, 0.5);
    bush1.position.set(0.8, 0.5, 2.2);
    this.house.add(bush1);

    const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);

    bush2.scale.set(0.25, 0.25, 0.25);
    bush2.position.set(1.4, 0.25, 2.6);
    this.house.add(bush2);

    const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);

    bush3.scale.set(0.4, 0.4, 0.4);
    bush3.position.set(-1.6, 0.2, 2.7);
    this.house.add(bush3);

    const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
    bush4.scale.set(0.15, 0.15, 0.15);

    bush4.position.set(-1.5, 0.1, 2.7);
    this.house.add(bush4);

    const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
    const graveMaterial = new THREE.MeshStandardMaterial({
      map: graveColorTexture,
      aoMap: graveARMTexture,
      roughnessMap: graveARMTexture,
      metalnessMap: graveARMTexture,
      normalMap: graveNormalTexture,
    });

    const graves = new THREE.Group();

    for (let i = 0; i < 50; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 6 + 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const grave = new THREE.Mesh(graveGeometry, graveMaterial);
      grave.position.set(x, 0.4, z);
      grave.rotation.x = (Math.random() - 0.5) * 0.4;
      grave.rotation.y = (Math.random() - 0.5) * 0.4;
      grave.rotation.z = (Math.random() - 0.5) * 0.4;
      grave.scale.y = 0.8 + Math.random() * 0.5;
      graves.add(grave);
      grave.castShadow = true;
      grave.receiveShadow = true;
    }

    this.scene.add(graves);

    this.ghost1 = new THREE.PointLight("#8800ff", 6);
    this.ghost1.castShadow = true;
    this.scene.add(this.ghost1);
    this.ghost2 = new THREE.PointLight("#ff0088", 6);
    this.ghost2.castShadow = true;
    this.scene.add(this.ghost2);
    this.ghost3 = new THREE.PointLight("#ff0000", 6);
    this.ghost3.castShadow = true;
    this.scene.add(this.ghost3);

    this.ghost1.shadow.mapSize.width = 256;
    this.ghost1.shadow.mapSize.height = 256;
    this.ghost1.shadow.camera.far = 10;

    this.ghost2.shadow.mapSize.width = 256;
    this.ghost2.shadow.mapSize.height = 256;
    this.ghost2.shadow.camera.far = 10;

    this.ghost3.shadow.mapSize.width = 256;
    this.ghost3.shadow.mapSize.height = 256;
    this.ghost3.shadow.camera.far = 10;

    const sky = new Sky();
    sky.scale.setScalar(100);
    this.scene.add(sky);

    const skyUniforms = sky.material.uniforms;
    skyUniforms["turbidity"].value = 10;
    skyUniforms["rayleigh"].value = 2;
    skyUniforms["mieCoefficient"].value = 0.01;
    skyUniforms["mieDirectionalG"].value = 0.95;
    skyUniforms["sunPosition"].value.set(0.3, -0.038, -0.95);

    this.scene.fog = new THREE.FogExp2("#262837", 0.1, 15);
  }

  componentDidMount() {
    super.componentDidMount();
    this.init3D();
    this.initProject();
    this.initLight();
    this.initControls();
    this.animate();
  }

  animate() {
    if (!this.looped || !this.state.isTabActive) return;
    const elapsedTime = this.clock.getElapsedTime();
    const ghost1Angle = elapsedTime * 0.5;
    this.ghost1.position.x = Math.sin(ghost1Angle) * 4;
    this.ghost1.position.z = Math.cos(ghost1Angle) * 4;
    this.ghost1.position.y =
      Math.sin(ghost1Angle) *
      Math.sin(ghost1Angle * 2.34) *
      Math.sin(ghost1Angle * 3.45);

    const ghost2Angle = -elapsedTime * 0.38;
    this.ghost2.position.x = Math.sin(ghost2Angle) * 5;
    this.ghost2.position.z = Math.cos(ghost2Angle) * 5;
    this.ghost2.position.y =
      Math.sin(ghost2Angle) *
      Math.sin(ghost2Angle * 2.34) *
      Math.sin(ghost2Angle * 3.45);

    const ghost3Angle = elapsedTime * 0.23;
    this.ghost3.position.x = Math.sin(ghost3Angle) * 6;
    this.ghost3.position.z = Math.cos(ghost3Angle) * 6;
    this.ghost3.position.y =
      Math.sin(ghost3Angle) *
      Math.sin(ghost3Angle * 2.34) *
      Math.sin(ghost3Angle * 3.45);
    super.animate();
  }
}
