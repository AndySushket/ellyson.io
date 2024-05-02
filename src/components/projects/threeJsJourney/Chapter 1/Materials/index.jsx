/**
 * Created by Ellyson on 5/11/2018.
 */

import * as THREE from 'three';
import TemplateFor3D from 'components/templates/mainTemplate3D';

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
		super.componentDidMount()
		this.init3D();
		this.initLight();
		this.initProject();
		this.initControls();
		this.animate();
		this.light.position.set(3.,1,33)
		this.ambientLight.intensity = .8;
	}

	animate() {
		if (!this.looped || !this.state.isTabActive) return;
		super.animate();
	}
}
