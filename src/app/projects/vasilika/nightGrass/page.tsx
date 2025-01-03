'use client';

import React from 'react';

import TemplateFor3D from 'components/common/mainTemplate3D';
import Meadow from './Meadow';
import FireFlies from './FireFlies';

import config from './config';
import { initSkyBox } from '@/app/projects/vasilika/nightGrass/skyBox';
import Robot from './Robot';
import * as THREE from 'three';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';

import { acceleratedRaycast } from 'three-mesh-bvh';

const BLOOM_SCENE = 1;

THREE.Mesh.prototype.raycast = acceleratedRaycast;

export default class NightGrass extends TemplateFor3D {

  robot: Robot | undefined;

  fireFlies: FireFlies | undefined;

  meadow: Meadow | undefined;

  private composer: EffectComposer | undefined;

  componentWillUnmount() {
    super.componentWillUnmount();
  }

  initLight(): void {
    this.light = new THREE.DirectionalLight(0xffffff, .2);
    this.light.position.set(5, 5, 5);
    this.light.castShadow = true;
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.05);
    this.scene?.add(this.light, this.ambientLight);
  }

  setCameraConfig() {
    this.camera?.position.set(-37.1715, 5.6308, 7.8920);
    this.camera?.rotation.set(-0.61972, -1.3156, -0.6042);
  }

  initMeadow() {
    this.meadow = new Meadow(config, this);
    if (this.meadow) {
      const { groundMesh, grassMesh } = this.meadow;
      this.scene?.add(groundMesh, grassMesh);
    }
  }

  initSkyBox(): void {
    if (!this.scene) return;
    this.scene.background = initSkyBox();
  }

  initRobot() {
    this.robot = new Robot(this.scene);
  }

  initFireFlies() {
    this.fireFlies = new FireFlies(config.fireflies, this);
    if (this.fireFlies?.group) {
      this.scene?.add(this.fireFlies.group);
    }
  }

  initProject() {
    this.initMeadow();

    this.initSkyBox();

    this.initRobot();

    this.setCameraConfig();

    this.initFireFlies();
  }

  componentDidMount() {
    super.componentDidMount();

    this.init3D({ antialias: true, alpha: true });

    if (!this.renderer || !this.scene || !this.camera) return;

    const params = {
      threshold: 0,
      strength: .1,
      radius: 0.01,
      exposure: 1
    };

    const renderScene = new RenderPass( this.scene, this.camera );

    const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
    bloomPass.threshold = params.threshold;
    bloomPass.strength = params.strength;
    bloomPass.radius = params.radius;

    const outputPass = new OutputPass();

    this.composer = new EffectComposer( this.renderer );
    this.composer.addPass( renderScene );
    this.composer.addPass( bloomPass );
    this.composer.addPass( outputPass );

    this.initProject();

    this.initControls();

    this.animate();
  }

  animate() {
    if (!this.looped || !this.state.isTabActive) return;

    this.time++;

    this.composer?.render();

    this.fireFlies?.moveFireFlies();

    this.robot?.updateAnimation(this.clock.getElapsedTime());

    this.meadow?.updateGrass(this.clock.getElapsedTime() * 0.3);

    this.controls?.update();

    requestAnimationFrame(() => this.animate());
  }

  render() {
    return (
      <div>
        <div
          ref={(ref) => {
            this.canvasDiv = ref;
          }}
          className="canvasDiv"
        />
      </div>
    );
  }
}
