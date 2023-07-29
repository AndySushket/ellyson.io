/**
 * Created by Ellyson on 5/11/2018.
 */

import * as THREE from "three";
import * as dat from "dat.gui";
import TemplateFor3D from "components/templates/mainTemplate3D";

export default class Matrix extends TemplateFor3D {
  componentWillUnmount() {
    super.componentWillUnmount();
    this.gui.destroy();
  }

  initControls() {
    super.initControls();
    this.camera.position.set(0, 0, 10);
  }

  initPositionRotationScale() {
    const geometry = new THREE.BoxGeometry(5, 5, 5);
    const material = new THREE.MeshNormalMaterial();
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

    this.gui = new dat.GUI();
    const positionFolder = this.gui.addFolder("position");

    this.Matrix = this.cube.matrix.clone();
    this.cube.matrixAutoUpdate = false;
    this.Matrix.elements.forEach((elem, i) => {
      positionFolder.add(this.Matrix.elements, i, -5, 5, 0.1);
    });
    positionFolder.add(this, "applyMatrix");

    positionFolder.open();
  }

  componentDidMount() {
    this.init3D();
    this.initPositionRotationScale();
    this.initControls();
    this.animate();
  }

  applyMatrix() {
    this.cube.applyMatrix(this.Matrix);
  }

  animate() {
    if (!this.looped) return;
    super.animate();
  }
}
