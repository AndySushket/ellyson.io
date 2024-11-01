/**
 * Created by Ellyson on 5/11/2018.
 */

import * as THREE from 'three';
import TemplateFor3D from 'test/projects/templates/mainTemplate3D';
import * as dat from "dat.gui";

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

import HelmetModel from '../static/models/New Folder With Items/FlightHelmet.gltf';
import Duck from '../static/models/Duck/glTF/Duck.gltf';
import envMap from '../static/environmentMaps/0/2k.hdr';
import texture from '../static/textures/wood_cabinet_worn_long/wood_cabinet_worn_long_diff_1k.jpg';
import texture2 from '../static/textures/castle_brick_broken_06/castle_brick_broken_06_diff_1k.jpg';
import texture3 from '../static/textures/castle_brick_broken_06/castle_brick_broken_06_nor_gl_1k.png';
import texture4 from '../static/textures/castle_brick_broken_06/castle_brick_broken_06_arm_1k.jpg';
import texture5 from '../static/textures/wood_cabinet_worn_long/wood_cabinet_worn_long_nor_gl_1k.png';
import texture6 from '../static/textures/wood_cabinet_worn_long/wood_cabinet_worn_long_arm_1k.jpg';

export default class ScrollBasedAnimation extends TemplateFor3D {
	constructor() {
		super();
		this.gui = new dat.GUI();
		this.gui.domElement.style.marginTop = '50px';
		this.currentIntersect = null;

	}
	componentWillUnmount() {
		super.componentWillUnmount();
		this.gui.destroy();
	}

	initControls() {
		super.initControls();
		this.camera.position.set(0, 0, 6);
	}

	updateAllMaterials = () =>
	{
		this.scene.traverse((child) =>
		{
			if(child.isMesh)
			{
				child.castShadow = true
				child.receiveShadow = true
			}
		})
	}

	initLight() {
		const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
		directionalLight.position.set(1, 1, 0);
		this.scene.add(directionalLight);

		this.gui.add(directionalLight, 'intensity').min(0).max(10).step(0.001).name('lightIntensity')
		this.gui.add(directionalLight.position, 'x').min(- 10).max(10).step(0.001).name('lightX')
		this.gui.add(directionalLight.position, 'y').min(- 10).max(10).step(0.001).name('lightY')
		this.gui.add(directionalLight.position, 'z').min(- 10).max(10).step(0.001).name('lightZ')

		directionalLight.castShadow = true
		directionalLight.shadow.camera.far = 15
		directionalLight.shadow.normalBias = 0.027
		directionalLight.shadow.bias = - 0.004
		directionalLight.shadow.mapSize.set(512, 512)

		this.gui.add(directionalLight, 'castShadow')
		this.gui.add(directionalLight.shadow, 'normalBias').min(- 0.05).max(0.05).step(0.001)
		this.gui.add(directionalLight.shadow, 'bias').min(- 0.05).max(0.05).step(0.001)

		directionalLight.target.position.set(0, 4, 0)
		directionalLight.target.updateWorldMatrix()
	}

	initProject() {
		this.scene.environmentIntensity = 1
		this.gui
			.add(this.scene, 'environmentIntensity')
			.min(0)
			.max(10)
			.step(0.001)

		const gltfLoader = new GLTFLoader()
		const rgbeLoader = new RGBELoader()
		const textureLoader = new THREE.TextureLoader()

		rgbeLoader.load(envMap, (environmentMap) =>
		{
			environmentMap.mapping = THREE.EquirectangularReflectionMapping

			this.scene.background = environmentMap
			this.scene.environment = environmentMap
		})

		const currentFileUrl = import.meta.url;

// Конвертируем URL в объект
		const url = new URL(currentFileUrl);

// Получаем путь директории
		const directoryPath = url.pathname.substring(0, url.pathname.lastIndexOf('/'));

		// const basePath = `${process.env.PUBLIC_URL}/assets/models/`;
		// gltfLoader.setPath(directoryPath + 'static/models/FlightHelmet/glTF');
		gltfLoader.load(
			Duck,
			(gltf) =>
			{
				gltf.scene.scale.set(10, 10, 10)
				this.scene.add(gltf.scene)

				this.updateAllMaterials()
			}
		)


		const floorColorTexture = textureLoader.load(texture)
		const floorNormalTexture = textureLoader.load(texture5)
		const floorAORoughnessMetalnessTexture = textureLoader.load(texture6)

		floorColorTexture.colorSpace = THREE.SRGBColorSpace

		const floor = new THREE.Mesh(
			new THREE.PlaneGeometry(8, 8),
			new THREE.MeshStandardMaterial({
				map: floorColorTexture,
				normalMap: floorNormalTexture,
				aoMap: floorAORoughnessMetalnessTexture,
				roughnessMap: floorAORoughnessMetalnessTexture,
				metalnessMap: floorAORoughnessMetalnessTexture,
			})
		)

		floor.rotation.x = - Math.PI * 0.5
		this.scene.add(floor)

		const wallColorTexture = textureLoader.load(texture2)
		const wallNormalTexture = textureLoader.load(texture3)
		const wallAORoughnessMetalnessTexture = textureLoader.load(texture4)

		wallColorTexture.colorSpace = THREE.SRGBColorSpace

		const wall = new THREE.Mesh(
			new THREE.PlaneGeometry(8, 8),
			new THREE.MeshStandardMaterial({
				map: wallColorTexture,
				normalMap: wallNormalTexture,
				aoMap: wallAORoughnessMetalnessTexture,
				roughnessMap: wallAORoughnessMetalnessTexture,
				metalnessMap: wallAORoughnessMetalnessTexture,
			})
		)
		wall.position.y = 4
		wall.position.z = - 4
		this.scene.add(wall);

		// this.renderer.toneMapping = THREE.ACESFilmicToneMapping
		this.renderer.toneMapping = THREE.ReinhardToneMapping
		this.renderer.toneMappingExposure = 3

		this.gui.add(this.renderer, 'toneMapping', {
			No: THREE.NoToneMapping,
			Linear: THREE.LinearToneMapping,
			Reinhard: THREE.ReinhardToneMapping,
			Cineon: THREE.CineonToneMapping,
			ACESFilmic: THREE.ACESFilmicToneMapping
		})

		this.renderer.shadowMap.enabled = true
		this.renderer.shadowMap.type = THREE.PCFSoftShadowMap

		this.gui.add(this.renderer, 'toneMappingExposure').min(0).max(10).step(0.001)
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

		const elapsedTime = this.clock.getElapsedTime();

	}

}
