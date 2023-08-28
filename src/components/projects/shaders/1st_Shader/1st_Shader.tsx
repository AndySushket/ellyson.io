/**
 * Created by Ellyson on 5/11/2018.
 */

import * as THREE from 'three';
import TemplateFor3D from 'components/templates/mainTemplate3D';
import fragmentShader from './shader.frag';
import vertexShader from './shader.vert';

export default class Shader1 extends TemplateFor3D {

	sphere: THREE.Mesh | undefined;
	initControls(): void {
		super.initControls();
		this.camera?.position.set(0, 0, 10);
	}

	initShader(): void {
		const geometry = new THREE.SphereGeometry(4, 30, 30);
		const customMaterial = new THREE.ShaderMaterial({
			uniforms: {},
			vertexShader,
			fragmentShader,
		});
		this.sphere = new THREE.Mesh(geometry, customMaterial);
		this.scene?.add(this.sphere);
	}

	componentDidMount(): void {
		this.init3D();
		this.initShader();
		this.initControls();
		this.animate();
	}

	animate(): void {
		if (!this.looped) return;
		super.animate();
	}
}
