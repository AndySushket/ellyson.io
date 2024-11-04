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
		this.camera.position.set(0, 0, 1);
	}

	initProject() {

		const PlaneGeometry = new THREE.PlaneGeometry(1, 1, 32, 32);

		this.shaderMaterial = new THREE.ShaderMaterial({
			uniforms: {
				uTime: { value: 0 },
			},
			vertexShader,
			fragmentShader,
		});


		const plane = new THREE.Mesh(PlaneGeometry, this.shaderMaterial);


		this.scene.add(plane);

	}

	async componentDidMount() {
		const dat = await import("dat.gui");
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
		const time = this.clock.getElapsedTime();

		this.shaderMaterial.uniforms.uTime.value = time;

		this.gui.updateDisplay();

	}
}
