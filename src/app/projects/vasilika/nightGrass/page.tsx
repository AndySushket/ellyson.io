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
import LightMap from '@/app/projects/vasilika/nightGrass/LightMap';

const BLOOM_SCENE = 1;

THREE.Mesh.prototype.raycast = acceleratedRaycast;

export default class NightGrass extends TemplateFor3D {

  robot: Robot | undefined;

  fireFlies: FireFlies | undefined;

  meadow: Meadow | undefined;

  private composer: EffectComposer | undefined;
  private lightMap: LightMap | undefined;

  componentWillUnmount() {
    super.componentWillUnmount();
  }

  initLight(): void {
    this.light = new THREE.DirectionalLight(0xffffff, .5 );
    this.light.position.set(-5, 5, 15);
    this.light.castShadow = true;
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.05);
    this.scene?.add(this.light, this.ambientLight);
  }

  setCameraConfig() {
    const {
      camera: {
        main: { position, rotation },
      },
    } = config;
    this.camera?.position.set(position.x, position.y, position.z);
    this.camera?.rotation.set(rotation.x, rotation.y, rotation.z);
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
    this.robot = new Robot(this.scene, config.robot);
  }

  initFireFlies() {
    this.fireFlies = new FireFlies(config.fireflies, this);
    if (this.fireFlies?.fireFlies) {
      this.scene?.add(this.fireFlies.fireFlies);
    }
  }

  initLightMap() {
    this.lightMap = new LightMap(512, config.meadow.width, config.fireflies.count);
  }

  initProject() {
    this.initMeadow();

    this.initSkyBox();

    this.initRobot();

    this.setCameraConfig();

    this.initFireFlies();

    this.initLightMap();
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

    this.attachMouseMoveEvent(this.canvasDiv);

    this.animate();
  }

  animate() {
    if (!this.looped) return;
    if (!this.renderer || !this.scene || !this.camera) return;

    this.time += 1;

    this.composer?.render();

    this.fireFlies?.moveFireFlies();

    const fireflyPositions = this.fireFlies?.getFireflyPositions();

    if (fireflyPositions && this.meadow?.grassMesh.material) {
      this.lightMap?.update(this.renderer as THREE.WebGLRenderer, fireflyPositions);

      // Обновляем униформу в материале травы
      (this.meadow.grassMesh.material as THREE.ShaderMaterial).uniforms.lightMap.value =
        this.lightMap?.getTexture();
    }

    this.robot?.updateAnimation(this.clock.getElapsedTime());

    this.robot?.updateHeadRotation(this.mouse?.x, this.mouse?.y);

    this.meadow?.updateGrass(this.clock.getElapsedTime() * 0.3);

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
