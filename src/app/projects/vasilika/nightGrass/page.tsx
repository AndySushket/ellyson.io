'use client';

import React from 'react';

import TemplateFor3D from 'components/common/mainTemplate3D';
import Meadow from './Meadow';
import FireFlies from './FireFlies';

import config from './config';
import { initSkyBox } from '@/app/projects/vasilika/nightGrass/skyBox';
import Robot from './Robot';
import * as THREE from 'three';

export default class NightGrass extends TemplateFor3D {

  robot: Robot | undefined;

  fireFlies: FireFlies | undefined;

  meadow: Meadow | undefined;

  componentWillUnmount() {
    super.componentWillUnmount();
  }

  initLight(): void {
    this.light = new THREE.DirectionalLight(0xffffff, .7);
    this.light.position.set(5, 5, 5);
    this.light.castShadow = true;
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    this.scene?.add(this.light, this.ambientLight);
  }

  setCameraConfig() {
    this.camera?.position.set(-25.9932, 3.9375, 5.5187);
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

    this.initProject();

    this.initControls();

    this.animate();
  }

  animate() {
    if (!this.looped || !this.state.isTabActive) return;

    super.animate();

    this.fireFlies?.moveFireFlies();

    this.robot?.updateAnimation(this.clock.getElapsedTime());

    this.meadow?.updateGrass(this.clock.getElapsedTime() * 0.3);

    this.controls?.update();
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
