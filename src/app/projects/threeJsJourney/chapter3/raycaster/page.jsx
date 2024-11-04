'use client';

import * as THREE from 'three';
import TemplateFor3D from 'components/common/mainTemplate3D';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import Duck from '../static/models/Duck/glTF-Binary/Duck.glb';

export default class ScrollBasedAnimation extends TemplateFor3D {
	constructor() {
		super();
		this.currentIntersect = null;

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


		this.object1 = new THREE.Mesh(
			new THREE.SphereGeometry(0.5, 16, 16),
			new THREE.MeshBasicMaterial({ color: '#ff0000' })
		)
		this.object1.position.x = - 2

		this.object2 = new THREE.Mesh(
			new THREE.SphereGeometry(0.5, 16, 16),
			new THREE.MeshBasicMaterial({ color: '#ff0000' })
		)

		this.object3 = new THREE.Mesh(
			new THREE.SphereGeometry(0.5, 16, 16),
			new THREE.MeshBasicMaterial({ color: '#ff0000' })
		)
		this.object3.position.x = 2

		this.scene.add(this.object1, this.object2, this.object3)

		this.initRaycaster();
		const rayOrigin = new THREE.Vector3(- 3, 0, 0)
		const rayDirection = new THREE.Vector3(10, 0, 0)
		rayDirection.normalize();

		this.attachMouseMoveEvent();

		window.addEventListener('click', () =>
		{
			if(this.currentIntersect)
			{
				switch(this.currentIntersect.object)
				{
					case this.object1:
						console.log('click on object 1')
						break

					case this.object2:
						console.log('click on object 2')
						break

					case this.object3:
						console.log('click on object 3')
						break
				}
			}
		})

		const gltfLoader = new GLTFLoader()

		let model = null
		gltfLoader.load(
			Duck,
			(gltf) =>
			{
				this.model = gltf.scene
				this.model.position.y = - 1.2
				this.scene.add(this.model)
			}
		)

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

		const elapsedTime = this.clock.getElapsedTime();

		this.object1.position.y = Math.sin(elapsedTime * 0.3) * 1.5
		this.object2.position.y = Math.sin(elapsedTime * 0.8) * 1.5
		this.object3.position.y = Math.sin(elapsedTime * 1.4) * 1.5

		this.rayCaster?.setFromCamera(this.mouse, this.camera)

		const objectsToTest = [this.object1, this.object2, this.object3]
		const intersects = this.rayCaster?.intersectObjects(objectsToTest)

		if(intersects?.length)
		{
			if(!this.currentIntersect)
			{
				console.log('mouse enter')
			}

			this.currentIntersect = intersects[0]
		}
		else
		{
			if(this.currentIntersect)
			{
				console.log('mouse leave')
			}

			this.currentIntersect = null
		}

		// Test intersect with a model
		if(this.model)
		{
			const modelIntersects = this.rayCaster.intersectObject(this.model)

			if(modelIntersects.length)
			{
				this.model.scale.set(1.2, 1.2, 1.2)
			}
			else
			{
				this.model.scale.set(1, 1, 1)
			}
		}

	}

}
