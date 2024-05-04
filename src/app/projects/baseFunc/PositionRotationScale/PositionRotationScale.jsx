/**
 * Created by Ellyson on 5/11/2018.
 */

import * as THREE from "three";
import * as dat from "dat.gui";
import TemplateFor3D from "app/templates/mainTemplate3D";

export default class PositionRotationScale extends TemplateFor3D {
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
    const rotationFolder = this.gui.addFolder("rotation");
    const scaleFolder = this.gui.addFolder("scale");
    positionFolder.add(this.cube.position, "x", -5, 5);
    positionFolder.add(this.cube.position, "y", -5, 5);
    positionFolder.add(this.cube.position, "z", -5, 5);
    positionFolder.open();
    rotationFolder.add(this.cube.rotation, "x", -5, 5);
    rotationFolder.add(this.cube.rotation, "y", -5, 5);
    rotationFolder.add(this.cube.rotation, "z", -5, 5);
    rotationFolder.open();
    scaleFolder.add(this.cube.scale, "x", 0, 5);
    scaleFolder.add(this.cube.scale, "y", 0, 5);
    scaleFolder.add(this.cube.scale, "z", 0, 5);
    scaleFolder.open();
  }

  componentDidMount() {
    super.componentDidMount()
    this.init3D();
    this.initPositionRotationScale();
    this.initControls();
    this.animate();
  }

  animate() {
    if (!this.looped || !this.state.isTabActive) return;
    super.animate();
  }
}
