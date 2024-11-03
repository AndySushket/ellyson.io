"use client";

import * as THREE from "three";
import TemplateFor3D from 'components/common/mainTemplate3D';

export default class Matrix extends TemplateFor3D {
  componentWillUnmount() {
    super.componentWillUnmount();
    this.gui.destroy();
  }

  initControls() {
    super.initControls();
    this.camera.position.set(0, 0, 10);
  }

  async initPositionRotationScale() {
    const geometry = new THREE.BoxGeometry(5, 5, 5);
    const material = new THREE.MeshNormalMaterial();
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

    const dat = await import("dat.gui");
    this.gui = new dat.GUI();
    const positionFolder = this.gui.addFolder("position");

    this.Page = this.cube.matrix.clone();
    this.cube.matrixAutoUpdate = false;
    this.Page.elements.forEach((elem, i) => {
      positionFolder.add(this.Page.elements, i, -5, 5, 0.1);
    });
    positionFolder.add(this, "applyMatrix");

    positionFolder.open();
  }

  async componentDidMount() {
    super.componentDidMount()
    this.init3D();
    await this.initPositionRotationScale();
    this.initControls();
    this.animate();
  }

  applyMatrix() {
    this.cube.applyMatrix(this.Page);
  }

  animate() {
    if (!this.looped || !this.state.isTabActive) return;
    super.animate();
  }
}
