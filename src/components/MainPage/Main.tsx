/**
 * Created by Ellyson on 15/09/2022.
 */

import * as THREE from "three";
import React from "react";
import TemplateFor3D from "components/templates/mainTemplate3D";

// import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
// import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
// import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
//
// import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader';
// import { DotScreenShader } from 'three/examples/jsm/shaders/DotScreenShader';
// import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass';

export default class Projects extends TemplateFor3D {

  private postprocessing: any | undefined = {};
  private composer: EffectComposer | undefined;
  private sphere: THREE.Object3D | undefined;

  initControls(): void {
    // super.initControls();
    this.camera?.position.set(0, 0, 200);
    // this.camera.position.z = 200;
  }

  initShader(): void {
    this.sphere = new THREE.Object3D();
    const geometry = new THREE.SphereGeometry( 1, 4, 4 );
    const material = new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true } );

    for ( let i = 0; i < 100; i ++ ) {

      const mesh = new THREE.Mesh( geometry, material );
      mesh.position.set( Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5 ).normalize();
      mesh.position.multiplyScalar( Math.random() * 400 );
      mesh.rotation.set( Math.random() * 2, Math.random() * 2, Math.random() * 2 );
      mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 50;
      this.sphere.add( mesh );

    }
    // const geometry = new THREE.SphereGeometry(4, 30, 30);
    // const customMaterial = new THREE.ShaderMaterial();
    // this.sphere = new THREE.Mesh(geometry, customMaterial);
    this.scene?.add(this.sphere);
  }

  componentDidMount(): void {
    this.init3D(undefined, {});
    this.initShader();
    this.initLight();
    this.initControls();
    this.initPostprocessing();
    this.attachMouseMoveEvent();
    this.animate();
  }

  initCompresor(): void {
    // this.composer = new EffectComposer(this.renderer as THREE.WebGLRenderer);
    // const renderPass = new RenderPass(this.scene as THREE.Scene, this.camera as THREE.PerspectiveCamera);
    // this.composer.addPass(renderPass);
    // const rgbShiftPass = new ShaderPass(RGBShiftShader);
    // this.composer.addPass(rgbShiftPass);
    // const dotScreenPass = new ShaderPass(DotScreenShader);
    // this.composer.addPass(dotScreenPass);
    // const outputPass = new OutputPass();
    // this.composer.addPass(outputPass);
  }

  initPostprocessing() {

    const renderPass = new RenderPass( this.scene as THREE.Scene, this.camera as THREE.PerspectiveCamera );

    const bokehPass = new BokehPass( this.scene as THREE.Scene, this.camera as THREE.PerspectiveCamera, {
      focus: 1.0,
      aperture: 0.025,
      maxblur: 0.01
    } );

    const outputPass = new OutputPass();

    this.composer = new EffectComposer( this.renderer as THREE.WebGLRenderer );

    this.composer.addPass( renderPass );
    this.composer.addPass( bokehPass );
    this.composer.addPass( outputPass );

    this.postprocessing.composer = this.composer;
    this.postprocessing.bokeh = bokehPass;

  }

  animate(): void {
    if (!this.looped) return;
    this.postprocessing.composer.render( 0.2 );
    if (!this.camera || !this.mouse) return;
    this.camera.position.x += ( this.mouse.x - this.camera.position.x ) * 0.036;
    this.camera.position.y += ( - ( this.mouse.y ) - this.camera.position.y ) * 0.036;
    if (this.sphere) {
      this.sphere.traverse( ( obj ) => {
        if ( obj instanceof THREE.Mesh ) {
          obj.rotation.x += 0.01;
          // obj.rotation.y += 0.01;
        }
      });
    // this.sphere.rotation.y += 0.01;
    // this.sphere.rotation.x += 0.01;
    }
    requestAnimationFrame(this.animate.bind(this));
    // super.animate();
  }

  render(): React.ReactNode {
    return (
        <div>
          <div ref={ (ref) => {this.canvasDiv = ref}} className="canvasDiv" />
        </div>
    );
  }
}
