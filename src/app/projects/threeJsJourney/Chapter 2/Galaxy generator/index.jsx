/**
 * Created by Ellyson on 5/11/2018.
 */

import * as THREE from 'three';
import TemplateFor3D from 'app/templates/mainTemplate3D';
// @ts-ignore
import * as dat from "dat.gui";

export default class GalaxyGenerator extends TemplateFor3D {
  componentWillUnmount() {
			super.componentWillUnmount();
			this.gui.destroy();
  }

  initControls() {
    super.initControls();
    this.camera.position.set(0, 0, 10);
  }

  initProject() {
    this.parameters = {
      count: 100000,
      size: 0.01,
      radius: 5,
      branches: 3,
			spin: 1,
			randomness: 0.2,
			randomnessPower: 3,
			innerColor: '#ff6030',
			outerColor: '#1b7184',
    };
    this.gui
      .add(this.parameters, 'count')
      .min(100)
      .max(100000)
      .step(100)
      .onFinishChange(() => this.initGalaxy());
    this.gui
      .add(this.parameters, 'size')
      .min(0.001)
      .max(0.1)
      .step(0.001)
      .onFinishChange(() => this.initGalaxy());
    this.gui
      .add(this.parameters, 'radius')
      .min(1)
      .max(20)
      .step(1)
      .onFinishChange(() => this.initGalaxy());
    this.gui
      .add(this.parameters, 'branches')
      .min(2)
      .max(20)
      .step(1)
      .onFinishChange(() => this.initGalaxy());
		this.gui
			.add(this.parameters, 'spin')
			.min(-5)
			.max(5)
			.step(0.001)
			.onFinishChange(() => this.initGalaxy());
		this.gui
			.add(this.parameters, 'randomness')
			.min(0)
			.max(2)
			.step(0.001)
			.onFinishChange(() => this.initGalaxy());
		this.gui
			.add(this.parameters, 'randomnessPower')
			.min(1)
			.max(10)
			.step(0.001)
			.onFinishChange(() => this.initGalaxy());
		this.gui
			.addColor(this.parameters, 'innerColor')
			.onFinishChange(() => this.initGalaxy());
		this.gui
			.addColor(this.parameters, 'outerColor')
			.onFinishChange(() => this.initGalaxy());

    this.gui.domElement.style.marginTop = '50px';
    this.initGalaxy();
  }

  initGalaxy() {
    this.destroyGalaxy();

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(this.parameters.count * 3);
		const colors = new Float32Array(this.parameters.count * 3);

		const innerColor = new THREE.Color(this.parameters.innerColor);
		const outerColor = new THREE.Color(this.parameters.outerColor);



    for (let i = 0; i < this.parameters.count * 3; i++) {
      const i3 = i * 3;

			const radius = Math.random() * this.parameters.radius;
			const spiralAngle = radius * this.parameters.spin;
      const branchAngle = (i % this.parameters.branches) / this.parameters.branches * Math.PI * 2;


			const randomX = Math.pow(Math.random(), this.parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * this.parameters.randomness * radius;
			const randomY = Math.pow(Math.random(), this.parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * this.parameters.randomness * radius;
			const randomZ = Math.pow(Math.random(), this.parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * this.parameters.randomness * radius;

      positions[i3] = Math.cos(branchAngle + spiralAngle) * radius + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] =  Math.sin(branchAngle + spiralAngle) * radius + randomZ;

			const mixedColor = innerColor.clone();
			mixedColor.lerp(outerColor, radius / this.parameters.radius);

			colors[i3] = mixedColor.r;
			colors[i3 + 1] = mixedColor.g;
			colors[i3 + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
		geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const material = new THREE.PointsMaterial({
      size: this.parameters.size,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
			vertexColors: true,
    });
    this.galaxy = new THREE.Points(geometry, material);
    this.scene.add(this.galaxy);
  }

  destroyGalaxy() {
    if (this.galaxy) {
      this.scene.remove(this.galaxy);
      this.galaxy.geometry.dispose();
      this.galaxy.material.dispose();
      this.galaxy = null;
    }
  }

  componentDidMount() {
    super.componentDidMount();
    this.gui = new dat.GUI();
    this.init3D();
    this.initLight();
    this.initProject();
    this.initControls();
    this.animate();
  }

  animate() {
    if (!this.looped || !this.state.isTabActive) return;
    super.animate();
  }
}
