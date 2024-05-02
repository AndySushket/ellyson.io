/**
 * Created by Ellyson on 5/11/2018.
 */

import * as THREE from 'three';
import TemplateFor3D from 'components/templates/mainTemplate3D';
import AmbientOcclusionMap from './maps/Door_Wood_001_ambientOcclusion.jpg'
import baseColorMap from './maps/Door_Wood_001_basecolor.jpg'
import heightMap from './maps/Door_Wood_001_height.png'
import metallicMap from './maps/Door_Wood_001_metallic.jpg'
import normalMap from './maps/Door_Wood_001_normal.jpg'
import opacityMap from './maps/Door_Wood_001_opacity.jpg'
import roughnessMap from './maps/Door_Wood_001_roughness.jpg'
import testMap from './maps/1600px_COLOURBOX2446338.jpg'

export default class Shader1 extends TemplateFor3D {
	initControls() {
		super.initControls();
		this.camera.position.set(0, 0, 10);
	}

	initProject() {
		// first solution
		// const image = new Image();
		// const texture = new THREE.Texture(image);
		// image.onload = () => {
		// 	texture.needsUpdate = true;
		// }
		// image.src = baseColorMap;
		const loadingManager = new THREE.LoadingManager();

		loadingManager.onStart = (e) => {
			console.log("onStart", e);
		}

		loadingManager.onLoad = (e) => {
			console.log("onLoad", e);
		}

		loadingManager.onProgress = (e) => {
			console.log("onProgress", e);
		}

		loadingManager.onError = (e) => {
			console.log("onError", e);
		}

		const textureLoader = new THREE.TextureLoader(loadingManager);
		const colorTexture = textureLoader.load(
			baseColorMap,
			(e) => {
				console.log("load", e);
			},
			(e) => {
				console.log("progress", e);
			},
			(e) => {
				console.log("error", e);
			},
		);

		const ambientOcclusionTexture = textureLoader.load(AmbientOcclusionMap);
		const heightTexture = textureLoader.load(heightMap);
		const metallicTexture = textureLoader.load(metallicMap);
		const normalTexture = textureLoader.load(normalMap);
		const opacityTexture = textureLoader.load(opacityMap);
		const roughnessTexture = textureLoader.load(roughnessMap);
		const testTexture = textureLoader.load(testMap);

		testTexture.repeat.x = 22;
		testTexture.repeat.y = 22;

		testTexture.wrapS = THREE.RepeatWrapping;
		testTexture.wrapT = THREE.RepeatWrapping;

		// colorTexture.offset.x = 0.5;
		// colorTexture.offset.y = 0.5;

		// colorTexture.rotation = 1;
		// colorTexture.center.x = 0.5;
		// colorTexture.center.y = 0.5;

		// testTexture.minFilter = THREE.NearestFilter;
		testTexture.magFilter = THREE.NearestFilter;
		testTexture.generateMipmaps = false; // better perfomance if nearestFilter

		const geometry = new THREE.PlaneGeometry(4, 4);

		const customMaterial = new THREE.MeshStandardMaterial({map: colorTexture, normalMap: normalTexture, alphaMap: opacityTexture, metalnessMap: metallicTexture, bumpMap:heightTexture, roughnessMap:roughnessTexture, transparent: true, side: THREE.DoubleSide});
		this.sphere = new THREE.Mesh(geometry, customMaterial);
		this.scene.add(this.sphere);

	}

	componentDidMount() {
		super.componentDidMount()
		this.init3D();
		this.initLight();
		this.initProject();
		this.initControls();
		this.animate();
		this.light.position.set(3.,1,2)
		this.ambientLight.intensity = .8;
		const targetObject = new THREE.Object3D();
		this.light.target = targetObject;
		targetObject.position.set(115,0, 115);
	}

	animate() {
		if (!this.looped || !this.state.isTabActive) return;
		super.animate();
	}
}
