/**
 * Created by Ellyson on 5/11/2018.
 */

import * as THREE from 'three';
import TemplateFor3D from 'components/common/mainTemplate3D';
import * as dat from "dat.gui";

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import Duck from '../static/models/Duck/glTF-Binary/Duck.glb';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader';

import envMap from '../static/environmentMaps/2/2k.hdr';
import { GroundedSkybox } from 'three/examples/jsm/objects/GroundedSkybox';

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

	initLight() {
		const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
		directionalLight.position.set(1, 1, 0);
		this.scene.add(directionalLight);
	}

	initProject() {


		const gltfLoader = new GLTFLoader()
		const cubeTextureLoader = new THREE.CubeTextureLoader()
		const rgbeLoader = new RGBELoader()
		const exrLoader = new EXRLoader()
		const textureLoader = new THREE.TextureLoader()

		const global = {}

		// this.scene.environmentIntensity = 1
		// this.scene.backgroundBlurriness = 0
		// this.scene.backgroundIntensity = 1

		this.gui.add(this.scene, 'environmentIntensity').min(0).max(10).step(0.001)
		this.gui.add(this.scene, 'backgroundBlurriness').min(0).max(1).step(0.001)
		this.gui.add(this.scene, 'backgroundIntensity').min(0).max(10).step(0.001)
		this.gui.add(this.scene.backgroundRotation, 'y').min(0).max(Math.PI * 2).step(0.001).name('backgroundRotationY')
		this.gui.add(this.scene.environmentRotation, 'y').min(0).max(Math.PI * 2).step(0.001).name('environmentRotationY')


		// // LDR cube texture
// const environmentMap = cubeTextureLoader.load([
//     '/environmentMaps/2/px.png',
//     '/environmentMaps/2/nx.png',
//     '/environmentMaps/2/py.png',
//     '/environmentMaps/2/ny.png',
//     '/environmentMaps/2/pz.png',
//     '/environmentMaps/2/nz.png'
// ])

// scene.environment = environmentMap
// scene.background = environmentMap

// // HDR (RGBE) equirectangular
// rgbeLoader.load('/environmentMaps/blender-2k.hdr', (environmentMap) =>
// {
//     environmentMap.mapping = THREE.EquirectangularReflectionMapping

//     // scene.background = environmentMap
//     scene.environment = environmentMap
// })

// // HDR (EXR) equirectangular
// exrLoader.load('/environmentMaps/nvidiaCanvas-4k.exr', (environmentMap) =>
// {
//     environmentMap.mapping = THREE.EquirectangularReflectionMapping

//     scene.background = environmentMap
//     scene.environment = environmentMap
// })

// // LDR equirectangular
// const environmentMap = textureLoader.load('/environmentMaps/blockadesLabsSkybox/anime_art_style_japan_streets_with_cherry_blossom_.jpg')
// environmentMap.mapping = THREE.EquirectangularReflectionMapping
// environmentMap.colorSpace = THREE.SRGBColorSpace
// scene.background = environmentMap
// scene.environment = environmentMap

		rgbeLoader.load(envMap, (environmentMap) =>
		{
			environmentMap.mapping = THREE.EquirectangularReflectionMapping

			this.scene.environment = environmentMap

			// Skybox
			const skybox = new GroundedSkybox(environmentMap, 15, 70)
			// skybox.material.wireframe = true
			skybox.position.y = 15
			this.scene.add(skybox)
		})

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

		// /**
//  * Real time environment map
//  */
// // Base environment map
// const environmentMap = textureLoader.load('/environmentMaps/blockadesLabsSkybox/interior_views_cozy_wood_cabin_with_cauldron_and_p.jpg')
// environmentMap.mapping = THREE.EquirectangularReflectionMapping
// environmentMap.colorSpace = THREE.SRGBColorSpace

// scene.background = environmentMap

// // Holy donut
// const holyDonut = new THREE.Mesh(
//     new THREE.TorusGeometry(8, 0.5),
//     new THREE.MeshBasicMaterial({ color: new THREE.Color(10, 4, 2) })
// )
// holyDonut.layers.enable(1)
// holyDonut.position.y = 3.5
// scene.add(holyDonut)

// // Cube render target
// const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(
//     256,
//     {
//         type: THREE.FloatType
//     }
// )

// scene.environment = cubeRenderTarget.texture

// // Cube camera
// const cubeCamera = new THREE.CubeCamera(0.1, 100, cubeRenderTarget)
// cubeCamera.layers.set(1)

		const torusKnot = new THREE.Mesh(
			new THREE.TorusKnotGeometry(1, 0.4, 100, 16),
			new THREE.MeshStandardMaterial({ roughness: 0, metalness: 1, color: 0xaaaaaa })
		)
		torusKnot.position.x = - 4
		torusKnot.position.y = 4
		this.scene.add(torusKnot)

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
