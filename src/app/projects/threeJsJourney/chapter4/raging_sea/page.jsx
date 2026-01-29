'use client';

import * as THREE from 'three';
import TemplateFor3D from 'components/common/mainTemplate3D';

import vertexShader from './shaders/vertexShader.vert';
import fragmentShader from './shaders/fragmentShader.frag';

export default class Particles extends TemplateFor3D {
  constructor(props) {
    super(props);
    this.objectsToUpdate = [];
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    this.gui.destroy();
  }

  initControls() {
    super.initControls();
    this.camera.position.set(0, .5, 2);
    this.controls.target.set(0, 0, 0);
    this.controls.enableDamping = true;
  }

  initProject() {
    this.debugObject = {}

    const PlaneGeometry = new THREE.PlaneGeometry(2, 2, 512, 512);
    this.debugObject.depthColor = '#186691';
    this.debugObject.surfaceColor = '#9bd8ff';
    this.shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uBigWavesElevation: { value: 0.2 },
        uBigWavesFrequency: { value: new THREE.Vector2(4, 1.5) },
        uBigWavesSpeed: { value: 0.75 },

        uSmallWavesElevation: { value: 0.15 },
        uSmallWavesFrequency: { value: 3 },
        uSmallWavesSpeed: { value: 0.2 },
        uSmallWaveIterations: { value: 4 },

        uDepthColor: { value: new THREE.Color(this.debugObject.depthColor) },
        uSurfaceColor: { value: new THREE.Color(this.debugObject.surfaceColor) },
        uColorOffset: { value: 0.345 },
        uColorMultiplier: { value: 5 },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
    });

    const water = new THREE.Mesh(PlaneGeometry, this.shaderMaterial);
    water.rotation.x = -Math.PI * .5;

    this.gui.add(water.material.uniforms.uBigWavesElevation, 'value').min(0).max(1).step(0.01).name('uBigWavesElevation');
    this.gui.add(water.material.uniforms.uBigWavesFrequency.value, 'x').min(0).max(10).step(0.01).name('uBigWavesFrequencyX');
    this.gui.add(water.material.uniforms.uBigWavesFrequency.value, 'y').min(0).max(10).step(0.01).name('uBigWavesFrequencyY');
    this.gui.add(water.material.uniforms.uBigWavesSpeed, 'value').min(0).max(5).step(0.01).name('uBigWavesSpeed');

    this.gui.add(water.material.uniforms.uColorOffset, 'value').min(0).max(1).step(0.001).name('uColorOffset');
    this.gui.add(water.material.uniforms.uColorMultiplier, 'value').min(0).max(10).step(0.001).name('uColorMultiplier');

    this.gui.add(water.material.uniforms.uSmallWavesElevation, 'value').min(0).max(1).step(0.01).name('uSmallWavesElevation');
    this.gui.add(water.material.uniforms.uSmallWavesFrequency, 'value').min(0).max(30).step(0.01).name('uSmallWavesFrequency');
    this.gui.add(water.material.uniforms.uSmallWavesSpeed, 'value').min(0).max(5).step(0.01).name('uSmallWavesSpeed');
    this.gui.add(water.material.uniforms.uSmallWaveIterations, 'value').min(0).max(5).step(1).name('uSmallWaveIterations');

    this.gui.addColor(this.debugObject, 'depthColor').onChange(() => {
      water.material.uniforms.uDepthColor.value.set(this.debugObject.depthColor);
    });
    this.gui.addColor(this.debugObject, 'surfaceColor').onChange(() => {
      water.material.uniforms.uSurfaceColor.value.set(this.debugObject.surfaceColor);
    });

    this.scene.add(water);
  }

  async componentDidMount() {
    const dat = await import('dat.gui');
    this.gui = new dat.GUI();
    this.gui.domElement.style.marginTop = '50px';
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

    this.shaderMaterial.uniforms.uTime.value = this.clock.getElapsedTime();

    this.gui.updateDisplay();
  }
}
