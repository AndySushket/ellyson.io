'use client';

import * as THREE from 'three';
import TemplateFor3D from 'components/common/mainTemplate3D';
import React from 'react';
import './styles.scss';
import gradient from './gradients/3.jpg';
import gsap from 'gsap';

const isBrowser = typeof window !== "undefined";

export default class ScrollBasedAnimation extends TemplateFor3D {
	constructor() {
		super();
		this.currentSection = 0;

		this.params = {
			color: 0xffd1
		};

		if (!isBrowser) return;

		this.attachMouseMoveEvent(window);
		this.scroll = window.scrollY;
		window.addEventListener('scroll', () => {
			this.scroll = window.scrollY;
			const newSection = Math.round(window.scrollY / window.innerHeight);

			if (this.currentSection !== newSection) {
				this.currentSection = newSection;

				gsap.to(
					this.sectionMeshes[this.currentSection].rotation,
					{
						duration: 1.5,
						ease: 'power2.inOut',
						x: "+=6",
						y: "+=3",
						z: "+=1.5",
					}
				);

			}
		});
	}
	componentWillUnmount() {
		super.componentWillUnmount();
		this.gui.destroy();
	}

	initControls() {
		// super.initControls();
		this.camera.position.set(0, 0, 6);
	}

	initLight() {
		const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
		directionalLight.position.set(1, 1, 0);
		this.scene.add(directionalLight);
	}

	initProject() {

		const textureLoader = new THREE.TextureLoader();
		const gradientTexture = textureLoader.load(gradient.src);
		gradientTexture.magFilter = THREE.NearestFilter;

		//group for camera

		this.cameraGroup = new THREE.Group();
		this.scene.add(this.cameraGroup);
		this.cameraGroup.add(this.camera);

		//Meshes


		this.objectDistance = 4;
		const matrial = new THREE.MeshToonMaterial({ color: this.params.color, gradientMap: gradientTexture });

		const mesh1 = new THREE.Mesh(
			new THREE.TorusGeometry(1, 0.4, 16, 60),
			matrial
		);

		const mesh2 = new THREE.Mesh(
			new THREE.ConeGeometry(1, 2, 32),
			matrial
		);

		const mesh3 = new THREE.Mesh(
			new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
			matrial
		);

		mesh1.position.y = -this.objectDistance * 0;
		mesh2.position.y = -this.objectDistance * 1;
		mesh3.position.y = -this.objectDistance * 2;

		mesh1.position.x = 1;
		mesh2.position.x = -1;
		mesh3.position.x = 1;

		this.sectionMeshes = [mesh1, mesh2, mesh3];

		this.scene.add(mesh1, mesh2, mesh3);

		this.gui.addColor(this.params, 'color').onChange(() => {
			matrial.color.set(this.params.color);
			this.particles.material.color.set(this.params.color);
		})



		this.prevTime = 0;
	}

	initParticles() {

		const count = 200;
		const positions = new Float32Array(count * 3);
		// const colors = new Float32Array(count * 3);

		for (let i = 0; i < count; i++) {
			const i3 = i * 3;
			positions[i3] = (Math.random() - 0.5) * 10;
			positions[i3 + 1] = this.objectDistance * 0.5 - Math.random() * this.objectDistance * this.sectionMeshes.length;
			positions[i3 + 2] = (Math.random() - 0.5) * 10;

			// colors[i] = Math.random();
		}

		const particlesGeometry = new THREE.BufferGeometry();
		// const textureLoader = new THREE.TextureLoader();
		// const particleTexture = textureLoader.load(img);

		particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
		// particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
		const particlesMaterial = new THREE.PointsMaterial({
			color: this.params.color,
			size: 0.03,
			sizeAttenuation: true,
			// vertexColors: true,
			// // map: particleTexture,
			// transparent: true,
			// // alphaMap: particleTexture,
			// depthWrite: false,
			// blending: THREE.AdditiveBlending,
		});

		this.particles = new THREE.Points(particlesGeometry, particlesMaterial);
		this.scene.add(this.particles);
	}

	async componentDidMount() {
		super.componentDidMount();
		const dat = await import("dat.gui");
		this.gui = new dat.GUI();
		this.gui.domElement.style.marginTop = '50px';
		this.init3D({alpha: true}, {fov: 35});
		this.renderer.setClearAlpha(0); // alternative to {alpha: true}
		this.initLight();
		this.initProject();
		this.initControls();
		this.initParticles();
		this.animate();
	}

	animate() {
		if (!this.looped || !this.state.isTabActive) return;
		super.animate();

		const elapsedTime = this.clock.getElapsedTime();
		const deltaTime = elapsedTime - this.prevTime;
		this.prevTime = elapsedTime;

		const { scroll } = this;

		//animate camera
		this.camera.position.y = -scroll / window.innerHeight * this.objectDistance;

		const parallaxX = -this.mouse.x;
		const parallaxY = -this.mouse.y;

		this.cameraGroup.position.x += (parallaxX - this.cameraGroup.position.x) * deltaTime * 2;
		this.cameraGroup.position.y += (parallaxY - this.cameraGroup.position.y) * deltaTime * 2;

		//animate section meshes
		this.sectionMeshes.forEach((mesh, index) => {
			mesh.rotation.x += deltaTime * 0.1;
			mesh.rotation.y += deltaTime * 0.12;
		});



	}

	render() {
		return (
			<div className="scrollAnimation">
				<div
					ref={(ref) => {
						this.canvasDiv = ref;
					}}
					className="canvasDiv main-canvasDiv"
				/>
				<section className="section">
					<h1>My Portfolio</h1>
				</section>
				<section className="section">
					<h2>My projects</h2>
				</section>
				<section className="section">
					<h2>Contact me</h2>
				</section>

			</div>
		);
	}

}
