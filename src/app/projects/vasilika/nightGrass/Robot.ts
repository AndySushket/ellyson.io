import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

// @ts-ignore
import robot from './assets/models/robot.glb';

class Robot {
  mesh: THREE.Group;
  config: any;

  constructor(scene: THREE.Scene | undefined, config: any) {
    this.mesh = new THREE.Group();
    this.config = config;
    this.initFbxModel(scene, config);
  }

  initFbxModel(scene: THREE.Scene | undefined, config: any) {
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
    loader.setDRACOLoader(dracoLoader);

    loader.load(
      robot,
      (gltf) => {
        const group = gltf.scene;
        group.rotation.y = -Math.PI / 6;
        group.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        const { scale, position, rotationY } = config;

        group.scale.set(scale, scale, scale);
        group.position.set(position.x, position.y, position.z);
        group.rotation.y = rotationY;

        scene?.add(group);

        this.mesh = group;
        console.log('robot loaded', group);
      },
      undefined,
      (error) => {
        console.error(error);
      },
    );
  }

  updateAnimation(delta: number) {
    if (!this.mesh.children.length) return;

    const { position: { y } } = this.config;

    // move robot
    this.mesh.position.y = y + Math.sin(delta + 3) * 0.5;

    // head
    this.mesh.children[1].position.y = .4+ Math.sin(delta+ 7) * 0.007;
    this.mesh.children[2].position.y = Math.sin(delta+ 7) * 0.007;

    // arms
    this.mesh.children[3].position.y = Math.sin(delta+ 7) * 0.01;


  }
}

export default Robot;
