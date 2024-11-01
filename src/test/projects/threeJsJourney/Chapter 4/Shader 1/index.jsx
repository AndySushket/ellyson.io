/**
 * Created by Ellyson on 5/11/2018.
 */

import * as THREE from 'three';
import TemplateFor3D from 'test/projects/templates/mainTemplate3D';
import * as dat from 'dat.gui';

import vertexShader from './shaders/vertexShader.vert';
import fragmentShader from './shaders/fragmentShader.frag';

import texture from './static/textures/flag-french.jpg';

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

		const count = PlaneGeometry.attributes.position.count;
		const randoms = new Float32Array(count);
		for (let i = 0; i < count; i++) {
			randoms[i] = Math.random();
		};
		PlaneGeometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1));

		const textureLoader = new THREE.TextureLoader();
		const textureMap = textureLoader.load(texture);
		this.shaderMaterial = new THREE.ShaderMaterial({

			uniforms: {
				uTime: { value: 0 },
				uFrequency: { value: new THREE.Vector2(10, 5) },
				uColor: { value: new THREE.Color('orange') },
				uTexture: { value: textureMap },
			},
			vertexShader,
			fragmentShader,
			transparent: true,
		});

		this.gui.add(this.shaderMaterial.uniforms.uFrequency.value, 'x').min(0).max(20).step(0.01).name('Frequency X');

		this.gui.add(this.shaderMaterial.uniforms.uFrequency.value, 'y').min(0).max(20).step(0.01).name('Frequency Y');

		const plane = new THREE.Mesh(PlaneGeometry, this.shaderMaterial);

		plane.scale.y = 2 / 3;

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
