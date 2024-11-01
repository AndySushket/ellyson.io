/**
 * Created by Ellyson on 5/11/2018.
 */

import * as THREE from 'three';
import TemplateFor3D from 'test/projects/templates/mainTemplate3D';
import * as dat from 'dat.gui';

import vertexShader from './shaders/vertexShader.vert';
import fragmentShader from './shaders/fragmentShader.frag';

export default class Particles extends TemplateFor3D {
	constructor(props) {
		super(props);
		this.gui = new dat.GUI();
		this.gui.domElement.style.marginTop = '50px';
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
		const time = this.clock.getElapsedTime();

		this.shaderMaterial.uniforms.uTime.value = time;

		this.gui.updateDisplay();

	}
}
