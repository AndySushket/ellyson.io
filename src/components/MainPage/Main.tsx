/**
 * Created by Ellyson on 15/09/2022.
 */

import * as THREE from "three";
import React from "react";
import TemplateFor3D from "components/templates/mainTemplate3D";

export default class Projects extends TemplateFor3D {


  private sphere: THREE.Mesh | undefined;

  initControls(): void {
    super.initControls();
    this.camera?.position.set(0, 0, 10);
  }

  initShader(): void {
    const geometry = new THREE.SphereGeometry(4, 30, 30);
    const customMaterial = new THREE.ShaderMaterial();
    this.sphere = new THREE.Mesh(geometry, customMaterial);
    this.scene?.add(this.sphere);
  }

  componentDidMount(): void {
    this.init3D(undefined, {});
    this.initShader();
    this.initControls();
    this.animate();
  }

  animate(): void {
    if (!this.looped) return;
    super.animate();
  }

  render(): React.ReactNode {
    return (
        <div>
          <div ref={ (ref) => {this.canvasDiv = ref}} className="canvasDiv" />
        </div>
    );
  }
}
