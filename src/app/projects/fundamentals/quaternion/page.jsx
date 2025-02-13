"use client";

import * as THREE from "three";
import TemplateFor3D from 'components/common/mainTemplate3D';

export default class Quaternion extends TemplateFor3D {
  componentWillUnmount() {
    super.componentWillUnmount();
    this.gui.destroy();
  }

  initControls() {
    super.initControls();
    this.camera.position.set(0, 0, 10);
  }

 async initPositionRotationScale() {
    const origin = new THREE.Vector3(0, 0, 0);
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshNormalMaterial();
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

    const beforeVector = new THREE.Vector3(1, 0, 0);
    this.afterVector = beforeVector.clone();

    const gridHelper = new THREE.GridHelper(100, 10);
    this.scene.add(gridHelper);
    const axisHelper = new THREE.AxesHelper(5);
    this.scene.add(axisHelper);

    const beforeArrow = new THREE.ArrowHelper(
      beforeVector.clone().normalize(),
      origin,
      beforeVector.length(),
      0xffff00
    );
    this.scene.add(beforeArrow);

    this.afterArrow = new THREE.ArrowHelper(
      this.afterVector.clone().normalize(),
      origin,
      this.afterVector.length() * 2,
      0xffffff
    );
    this.cube.add(this.afterArrow);
    const dat = await import("dat.gui");
    this.gui = new dat.GUI();
    this.positionFolder = this.gui.addFolder("QuaternionFunc");
    this.rotationFolder = this.gui.addFolder("rotationFunc");
    this.positionFolder.add(this.cube.quaternion, "x", -1, 1, 0.01);
    this.positionFolder.add(this.cube.quaternion, "y", -1, 1, 0.01);
    this.positionFolder.add(this.cube.quaternion, "z", -1, 1, 0.01);
    this.positionFolder.add(this.cube.quaternion, "w", -1, 1, 0.01);
    this.positionFolder.open();
    this.rotationFolder.add(this.cube.rotation, "x", -5, 5, 0.01);
    this.rotationFolder.add(this.cube.rotation, "y", -5, 5, 0.01);
    this.rotationFolder.add(this.cube.rotation, "z", -5, 5, 0.01);
    // positionFolder.domElement.style.pointerEvents = "none"
    this.rotationFolder.open();
  }

  async componentDidMount() {
    super.componentDidMount()
    this.init3D();
    await this.initPositionRotationScale();
    this.initControls();
    this.animate();
  }

  animate() {
    if (!this.looped || !this.state.isTabActive) return;
    this.afterArrow.quaternion.clone(this.cube.quaternion);
    // this.positionFolder.updateDisplay();
    // this.rotationFolder.updateDisplay();
    super.animate();
  }
}
