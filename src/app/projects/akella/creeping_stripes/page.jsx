"use client";

import * as THREE from 'three';
import TemplateFor3D from 'components/common/mainTemplate3D';
import vertexShader from './vertexShader.vert';
import fragmentShader from './fragmentShader.frag';

export default class Page extends TemplateFor3D {

	constructor(){
		super();
		this.colors = [
			new THREE.Color(0x588c73),
			new THREE.Color(0xf2e392),
			new THREE.Color(0xf2ae72),
			new THREE.Color(0xd96459),
			new THREE.Color(0x8c4646),
		]
	}

	initCamera() {
		const frustumSize = 10;
		const aspect = this.WIDTH / this.HEIGHT;
		this.camera = new THREE.OrthographicCamera(frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 	2,-1000, 1000);
		this.camera.position.set(0, 0, 4);
	}

	addObject() {
		const number = 11;

		this.material = new THREE.ShaderMaterial({
			side: THREE.DoubleSide,
			uniforms: {
				time: {type: "f", value: 0},
			},
			vertexShader,
			fragmentShader
		});

		this.geometry = new THREE.CylinderGeometry(2, 2, 1, 4, 1, true);

		this.instanceGeometry = new THREE.InstancedBufferGeometry();
		this.instanceGeometry.setAttribute('position', this.geometry.attributes.position);
		this.instanceGeometry.setAttribute('uv', this.geometry.attributes.uv);
		this.instanceGeometry.index = this.geometry.index;

		const offsetY = new Float32Array(number);
		const color = new Float32Array(number*3);
		for (let i = 0; i < number; i++) {
			offsetY[i] = i ;
			color[3 * i] = this.colors[i % 5].r;
			color[3 * i + 1] = this.colors[i % 5].g;
			color[3 * i + 2] = this.colors[i % 5].b;
		}
		this.instanceGeometry.instanceCount = number;
		this.instanceGeometry.setAttribute("offsetPos", new THREE.InstancedBufferAttribute(offsetY, 1));
		this.instanceGeometry.setAttribute("color", new THREE.InstancedBufferAttribute(color, 3));
		const mesh = new THREE.Mesh(this.instanceGeometry, this.material);
		mesh.rotation.set(Math.PI / 4, Math.PI / 4, Math.PI / 2);
		mesh.position.set(number /4 , number / 4, 0);
		this.scene.add(mesh);
	}

	componentDidMount() {
		super.componentDidMount()
		this.init3D({antialias: true });
		super.initControls();
		this.addObject();
		this.animate();
	}

	animate() {
		if (!this.looped || !this.state.isTabActive) return;
		this.time += 0.01;
		super.animate();
		if (this.scene) {
			this.material.uniforms.time.value = this.time;
		}
	}
}
