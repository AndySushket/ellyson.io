/**
 * Created by Ellyson on 5/11/2018.
 */

import * as THREE from 'three';
import TemplateFor3D from 'test/projects/templates/mainTemplate3D';
import * as dat from 'dat.gui';
import * as CANNON from 'cannon-es';

import px from './static/textures/environmentMaps/0/px.png';
import nx from './static/textures/environmentMaps/0/nx.png';
import py from './static/textures/environmentMaps/0/py.png';
import ny from './static/textures/environmentMaps/0/ny.png';
import pz from './static/textures/environmentMaps/0/pz.png';
import nz from './static/textures/environmentMaps/0/nz.png';

import hitSound from './static/sounds/hit.mp3';

export default class Particles extends TemplateFor3D {
  constructor(props) {
    super(props);
    this.gui = new dat.GUI();
    this.gui.domElement.style.marginTop = '50px';
    this.objectsToUpdate = [];

    this.debugObject = {
      createSphere: () => {
        this.createSphere(Math.random() * 0.5, {
          x: (Math.random() - 0.5) * 3,
          y: 3,
          z: (Math.random() - 0.5) * 3,
        });
      },
      createBox: () => {
        this.createBox(Math.random(), Math.random(), Math.random(), {
          x: (Math.random() - 0.5) * 3,
          y: 3,
          z: (Math.random() - 0.5) * 3,
        });
      },
      reset: () => {
        this.objectsToUpdate.forEach((obj) => {
          obj.body.removeEventListener('collide');
          this.worlds.remove(obj.body);
          this.scene.remove(obj.mesh);
        });

        this.objectsToUpdate.length = 0;
      }
    };

    this.gui.add(this.debugObject, 'createSphere');
    this.gui.add(this.debugObject, 'createBox');
    this.gui.add(this.debugObject, 'reset');
    console.log(CANNON);
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    this.gui.destroy();
  }

  initControls() {
    super.initControls();
    this.camera.position.set(0, 3, 10);
  }

  initSound() {
    this.hitSound = new Audio(hitSound);
  }

  initProject() {
    // const textureLoader = new THREE.TextureLoader()

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 10),
      new THREE.MeshStandardMaterial({
        color: '#777777',
        metalness: 0.3,
        roughness: 0.4,
        envMapIntensity: 0.5,
      }),
    );
    floor.receiveShadow = true;
    floor.rotation.x = -Math.PI * 0.5;
    this.scene.add(floor, this.sphereMesh);

    //physics

    this.worlds = new CANNON.World({
      gravity: new CANNON.Vec3(0, -9.82, 0),
      // optimisation
      broadphase: new CANNON.SAPBroadphase(this.worlds),
      allowSleep: true,
    });



    // const plasticMaterial = new CANNON.Material('plastic');
    // const concreteMaterial = new CANNON.Material('concrete');
    const defaultMaterial = new CANNON.Material('default'); // can be used same material for all objects

    const plasticConcreteContactMaterial = new CANNON.ContactMaterial(
      defaultMaterial,
      defaultMaterial,
      {
        friction: 0.1,
        restitution: 0.7,
      },
    );
    //
    // const sphereShape = new CANNON.Sphere(0.5)
    // this.sphereBody = new CANNON.Body({
    // 	mass: 1,
    // 	position: new CANNON.Vec3(0, 3, 0),
    // 	shape: sphereShape,
    // 	// material: defaultMaterial
    // });

    this.worlds.addContactMaterial(plasticConcreteContactMaterial);
    this.worlds.defaultContactMaterial = plasticConcreteContactMaterial; //if all body without or some one without material

    // this.sphereBody.applyLocalForce(new CANNON.Vec3(150, 0, 0), new CANNON.Vec3(0, 0, 0))
    // this.worlds.addBody(this.sphereBody)

    const floorShape = new CANNON.Plane();
    this.floorBody = new CANNON.Body({
      mass: 0,
      shape: floorShape,
      // material: defaultMaterial
    });
    this.floorBody.mass = 0;
    this.floorBody.addShape(floorShape);
    this.floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(-1, 0, 0), Math.PI * 0.5);
    this.worlds.addBody(this.floorBody);
  }

  createSphere(radius = 0.5, position = { x: 0, y: 3, z: 0 }) {
    const cubeTextureLoader = new THREE.CubeTextureLoader();

    const environmentMapTexture = cubeTextureLoader.load([px, nx, py, ny, pz, nz]);

    //Mesh
    this.sphereMesh = new THREE.Mesh(
      new THREE.SphereGeometry(radius, 32, 32),
      new THREE.MeshStandardMaterial({
        metalness: 0.3,
        roughness: 0.4,
        envMapIntensity: 0.5,
        envMap: environmentMapTexture,
      }),
    );
    this.sphereMesh.castShadow = true;
    this.sphereMesh.position.copy(position);
    this.scene.add(this.sphereMesh);

    //Cannon
    const sphereShape = new CANNON.Sphere(radius);
    this.sphereBody = new CANNON.Body({
      mass: 1,
      position: new CANNON.Vec3().copy(position),
      shape: sphereShape,
      // material: defaultMaterial
    });

    this.sphereBody.addEventListener('collide', (e) => {
      const impactStrength = e.contact.getImpactVelocityAlongNormal();

      if (impactStrength > 1.5) {
        this.hitSound.currentTime = 0;
        this.hitSound.volume = Math.random();
        this.hitSound.play();
      }
    });

    this.worlds.addBody(this.sphereBody);

    this.objectsToUpdate.push({
      mesh: this.sphereMesh,
      body: this.sphereBody,
    });
  }

  createBox(width = 1, height= 1, depth = 1, position = { x: 0, y: 3, z: 0 }) {
    const cubeTextureLoader = new THREE.CubeTextureLoader();

    const environmentMapTexture = cubeTextureLoader.load([px, nx, py, ny, pz, nz]);

    //Mesh
    this.boxMesh = new THREE.Mesh(
      new THREE.BoxGeometry(width, height, depth),
      new THREE.MeshStandardMaterial({
        metalness: 0.3,
        roughness: 0.4,
        envMapIntensity: 0.5,
        envMap: environmentMapTexture,
      }),
    );
    this.boxMesh.castShadow = true;
    this.boxMesh.position.copy(position);
    this.scene.add(this.boxMesh);

    //Cannon
    const boxShape = new CANNON.Box(new CANNON.Vec3(width / 2, height / 2, depth / 2));
    this.boxBody = new CANNON.Body({
      mass: 1,
      position: new CANNON.Vec3().copy(position),
      shape: boxShape,
      // material: defaultMaterial
    });

    this.boxBody.addEventListener('collide', (e) => {
      const impactStrength = e.contact.getImpactVelocityAlongNormal();
      if (impactStrength > 1.5) {
        this.hitSound.volume = Math.random();
        this.hitSound.currentTime = 0;
        this.hitSound.play();
      }
    });

    this.worlds.addBody(this.boxBody);

    this.objectsToUpdate.push({
      mesh: this.boxMesh,
      body: this.boxBody,
    });
  }

  componentDidMount() {
    super.componentDidMount();
    this.init3D();
    this.initLight();
    this.initSound();
    this.initProject();
    this.initControls();
    // this.createSphere(0.5, { x: 0, y: 3, z: 0 });
    // this.createSphere(.5, { x:.5, y: 4, z: 0 });
    // this.createSphere(.5, { x: 1, y: 5, z: 0 });
    this.animate();
  }

  animate() {
    if (!this.looped || !this.state.isTabActive) return;
    super.animate();
    const time = this.clock.getElapsedTime();
    const delta = this.clock.getDelta();

    // Update physics world

    // this.sphereBody.applyForce(new CANNON.Vec3(-.5, 0, 0), this.sphereBody.position);
    // this.worlds.step(1 / 60, delta, 3); //old
    this.worlds.fixedStep() //new

    this.objectsToUpdate.forEach((obj) => {
      console.log(obj.body.position);
      obj.mesh.position.copy(obj.body.position);
      obj.mesh.quaternion.copy(obj.body.quaternion);
    });
  }
}
