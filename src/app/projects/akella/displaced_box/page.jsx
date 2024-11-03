/**
 * Created by Ellyson on 5/11/2018.
 */

"use client";

import * as THREE from 'three';
import TemplateFor3D from 'components/common/mainTemplate3D';
import vertexShader from './vertexShader.vert';
import fragmentShader from './fragmentShader.frag';

const image2 = require("./image.png").default;
const image = require("./image2.png").default;

export default class DisplacedBox extends TemplateFor3D {

	constructor(){
		super();
		this.speedX = 0;
		// this.speedY = 0;
		this.fimalSpeed = 0;
	}

	initControls() {
		// const frustumSize = 10;
		// const aspect = this.WIDTH / this.HEIGHT;
		this.camera.position.set(0, 0, 4);
		super.initControls();
	}

	mouseVel(){
		let timestamp = null;
		let lastMouseX = null;
		let lastMouseY = null;

		document.body.addEventListener("mousemove", (e) => {
			if (timestamp === null) {
				timestamp = Date.now();
				lastMouseX = e.screenX;
				lastMouseY = e.screenY;
				return;
			}

			const now = Date.now();
			const dt =  now - timestamp > 0 ? now - timestamp : 0.1;
			const dx = e.screenX - lastMouseX;
			const dy = e.screenY - lastMouseY;
			this.speedX = Math.round(dx / dt * 100);
			this.speedY = Math.round(dy / dt * 100);

			timestamp = now;
			lastMouseX = e.screenX;
			lastMouseY = e.screenY;
		});
	}

	addObject() {
		// const number = 11;

		const t1 =  new THREE.TextureLoader().load(image.src);
		const t2 =  new THREE.TextureLoader().load(image2.src);
		// eslint-disable-next-line no-multi-assign
		t1.wrapS = t1.wrapT = t2.wrapS = t2.wrapT = THREE.MirroredRepeatWrapping;

		this.material = new THREE.ShaderMaterial({
			side: THREE.DoubleSide,
			uniforms: {
				time: {type: "f", value: 0},
				t1: {type: "t", value: t1},
				t2: {type: "t", value: t2},
			},
			vertexShader,
			fragmentShader,
		});

		this.geometry = new THREE.BoxGeometry(1, 1, 1, 200, 1, 200);
		const mesh = new THREE.Mesh(this.geometry, this.material);
		this.scene.add(mesh);
	}

	componentDidMount() {
		super.componentDidMount()
		this.init3D({antialias: true });
		this.initControls();
		this.mouseVel();
		this.addObject();
		this.animate();
	}

	animate() {
		if (!this.looped || !this.state.isTabActive) return;
		this.time += 0.01 + this.fimalSpeed;
		this.fimalSpeed = Math.abs(this.speedX) / 100;
		super.animate();
		if (this.scene) {
			this.material.uniforms.time.value = this.time;
		}
	}
}
