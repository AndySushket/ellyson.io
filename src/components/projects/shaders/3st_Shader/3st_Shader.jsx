/**
 * Created by Ellyson on 5/11/2018.
 */

import * as THREE from 'three';
import fragmentShader from './shader.frag';
import vertexShader from './shader.vert';
import TemplateFor3D from 'components/templates/mainTemplate3D';

export default class Shader3 extends TemplateFor3D {
	initControls() {
		super.initControls();
		this.camera.position.set(0, 0, 10);
	}

	initShader() {
		const geometry = new THREE.SphereGeometry(4, 30, 30);
		const array = [];

		for (let v = 0; v < geometry.attributes.position.array.length / 3; v++) {
			array.push(Math.random() * 3);
		}
		geometry.setAttribute("displacement", new THREE.Float32BufferAttribute(array, 1));
		const customMaterial = new THREE.ShaderMaterial({
			uniforms: {},
			vertexShader,
			fragmentShader
		});
		this.sphere = new THREE.Mesh(geometry, customMaterial);
		this.scene.add(this.sphere);
	}

	componentDidMount() {
		super.componentDidMount()
		this.init3D();
		this.initShader();
		this.initControls();
		this.animate();

	}

	animate() {
		if (!this.looped || !this.state.isTabActive) return;
		super.animate();
	}
}
