/**
 * Created by Ellyson on 5/11/2018.
 */

import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import {LinearProgress} from "@mui/material";
import React from "react";
import TemplateFor3D from "components/templates/mainTemplate3D";
import danceModel from "./danceModel.fbx";

export default class Index extends TemplateFor3D {

    constructor(props) {
        super(props);
        this.mixers = [];
        this.isLoaded = false;
        this.state = {
            loadProcess: 0,
            mixers: []
        };
    }

  componentWillUnmount() {
    super.componentWillUnmount();
  }

  initControls() {
    this.camera.position.set(0, 0, 10);
  }

  onSelect() {
    if (!this.isLoaded) {
      const loader = new FBXLoader();
      [danceModel].forEach((fbx, i) => {
          loader.load(fbx, (object) => {

              object.scale.setScalar(0.000001); // very big model

              const aabb = new THREE.Box3();
              aabb.setFromObject(object);

              i == 0 && this.camera.position.set(0, 0, aabb.max.z * 2);
              object.position.set(i * 3 * aabb.max.x, -1.5 * aabb.max.y, -aabb.max.z * 2);

              const mixer = new THREE.AnimationMixer(object);

              this.mixers.push(mixer);

              const action = mixer.clipAction(object.animations[0]);
              action.play();
              this.scene.add(object);
          }, (xhr) => {
              this.setState({loadProcess: xhr.loaded / xhr.total * 100});
          }, (error) => {
              console.log(error);
          });
      })
      this.isLoaded = true;
    }
  }

  componentDidMount() {
    this.init3D({ antialias: true, alpha: true }, undefined, {ar: true});
    this.initLight();
    this.buttonAr?.addEventListener( 'click', () => {
        //action on touch
    });
    this.onSelect()
    this.initControls();
    this.renderer?.setAnimationLoop(() => {
      this.animate();
    });
  }

  animate(timestamp, frame) {
    if (!this.looped) return;
    if (frame) {
      const referenceSpace = this.renderer.xr.getReferenceSpace();
        const pose = frame.getViewerPose(referenceSpace);
        if (pose) {
            const view = pose.views[0];
            const {camera} = this;
            camera.position.setFromMatrixPosition(view.transform.matrix);
            camera.quaternion.setFromRotationMatrix(view.transform.matrix);
            camera.updateMatrixWorld();
        }
    }

    const delta = this.clock.getDelta();
    this.mixers.forEach((mixer) => {
        mixer.update(delta);
    });
    this.renderer?.render(this.scene, this.camera);
  }


  render(): React.ReactNode {
    const { loadProcess } = this.state;
    return (
        <div>
          {loadProcess < 100 && <LinearProgress variant="determinate" value={loadProcess} />}
          <div ref={ (ref)=> { this.canvasDiv = ref}} className="canvasDiv" />
        </div>
    );
  }
}
