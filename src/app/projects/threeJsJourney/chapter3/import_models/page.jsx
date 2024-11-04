'use client';

import * as THREE from 'three';
import TemplateFor3D from 'components/common/mainTemplate3D';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import foxModel from '../static/models/Fox/glTF-Embedded/Fox.gltf';

export default class Particles extends TemplateFor3D {
  constructor() {
    super();
    this.mixer = null;
  }

  initControls() {
    super.initControls();
    this.camera.position.set(0, 0, 10);
  }

  initProject() {
    const gltfLoader = new GLTFLoader();

		console.log(foxModel);
    gltfLoader.load(foxModel, (gltf) => {
      gltf.scene.scale.set(0.025, 0.025, 0.025)
      this.scene.add(gltf.scene)

      // Animation
      this.mixer = new THREE.AnimationMixer(gltf.scene)
      const action = this.mixer.clipAction(gltf.animations[2])
      action.play()
    });

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 10),
      new THREE.MeshStandardMaterial({
        color: '#444444',
        metalness: 0,
        roughness: 0.5,
      }),
    );
    floor.receiveShadow = true;
    floor.rotation.x = -Math.PI * 0.5;
    this.scene.add(floor);
  }

  componentDidMount() {
    super.componentDidMount();
    this.init3D();
    this.initLight();
    this.initProject();
    this.initControls();
    this.animate();
  }

  animate() {
    if (!this.looped || !this.state.isTabActive) return;
    super.animate();
    const time = this.clock.getDelta();
    if (this.mixer) {
      this.mixer.update(time);
    }
  }
}
