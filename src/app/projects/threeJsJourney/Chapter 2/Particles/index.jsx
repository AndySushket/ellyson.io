/**
 * Created by Ellyson on 5/11/2018.
 */

import * as THREE from 'three';
import TemplateFor3D from 'app/templates/mainTemplate3D';
import img from './particles/2.png';

export default class Shader1 extends TemplateFor3D {
	initControls() {
		super.initControls();
		this.camera.position.set(0, 0, 10);
	}

	initProject() {
		// const particlesGeometry = new THREE.SphereGeometry(1, 32, 32);
		// const particlesMaterial = new THREE.PointsMaterial({
		// 	size: 0.1,
		// 	sizeAttenuation: true
		// });
		// this.particles = new THREE.Points(particlesGeometry, particlesMaterial);
		// this.scene.add(this.particles);

		//custom

		const particlesGeometry2 = new THREE.BufferGeometry();
		const count = 10000;
		const positions = new Float32Array(count * 3);
		const colors = new Float32Array(count * 3);

		for (let i = 0; i < count * 3; i++) {
			positions[i] = (Math.random() - 0.5) * 10;
			colors[i] = Math.random();
		}

		const textureLoader = new THREE.TextureLoader();
		const particleTexture = textureLoader.load(img);

		particlesGeometry2.setAttribute('position', new THREE.BufferAttribute(positions, 3));
		particlesGeometry2.setAttribute('color', new THREE.BufferAttribute(colors, 3));
		const particlesMaterial2 = new THREE.PointsMaterial({
			size: 0.1,
			sizeAttenuation: true,
			vertexColors: true,
			// color: new THREE.Color('#ff88cc'),
			map: particleTexture,
			transparent: true,
			alphaMap: particleTexture,
			// alphaTest: 0.001,
			// depthTest: false,
			depthWrite: false,
			blending: THREE.AdditiveBlending,
		});

		this.particles2 = new THREE.Points(particlesGeometry2, particlesMaterial2);
		this.scene.add(this.particles2);

		// const cube = new THREE.Mesh(
		// 	new THREE.BoxGeometry(),
		// 	new THREE.MeshBasicMaterial()
		// )
		// this.scene.add(cube)
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
		// this.particles2.rotation.y = this.time * 0.2;

		for (let i = 0; i < this.particles2.geometry.attributes.position.array.length; i += 3) {
			const x = this.particles2.geometry.attributes.position.array[i];
			this.particles2.geometry.attributes.position.array[i + 1] = Math.sin(x + time);
		}
		this.particles2.geometry.attributes.position.needsUpdate = true;
	}
}
