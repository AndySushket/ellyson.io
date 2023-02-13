/**
 * Created by Ellyson on 5/11/2018.
 */

import TemplateFor3D from '../../../../templates/mainTemplate3D';
import * as THREE from 'three';

export default class Shader1 extends TemplateFor3D {
	initControls() {
		super.initControls();
		this.camera.position.set(0, 0, 10);
	}

	initProject() {


		const geometry = new THREE.PlaneGeometry(4, 4);

		const customMaterial = new THREE.MeshStandardMaterial({
			transparent: true,
			side: THREE.DoubleSide});
		this.sphere = new THREE.Mesh(geometry, customMaterial);
		this.scene.add(this.sphere);

	}

	componentDidMount() {
		this.init3D();
		this.initLight();
		this.initProject();
		this.initControls();
		this.animate();
		this.light.position.set(3.,1,33)
		this.ambientLight.intensity = .8;
	}

	animate() {
		if (!this.looped) return;
		super.animate();
	}
}
