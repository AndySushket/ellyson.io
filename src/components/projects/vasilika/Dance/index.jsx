/**
 * Created by Ellyson on 5/11/2018.
 */

import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import {LinearProgress} from "@mui/material";
import React from "react";
import TemplateFor3D from "components/templates/mainTemplate3D";
import model from "./bellydancing.fbx";
import model2 from "./model3.fbx";
import model3 from "./Bellydancing (1).fbx";

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

      // document.addEventListener('touchstart', {handleEvent: (event) => {
      //     // alert();
      // }});

    if (!this.isLoaded) {
      const loader = new FBXLoader();

      [model, model2, model3].forEach((fbx, i) => {
          loader.load(fbx, (object) => {

              // object.scale.setScalar(0.000001); // very big model

              const aabb = new THREE.Box3();
              aabb.setFromObject(object);

              i == 0 && this.camera.position.set(0, 0, aabb.max.z * 2);
              object.position.set(i * 3 * aabb.max.x, -1.5 * aabb.max.y, -aabb.max.z * 2);

              const mixer = new THREE.AnimationMixer(object);

              this.mixers.push(mixer);

              const action = mixer.clipAction(object.animations[0]);
              action.play();

              console.log(this.mixers);
              this.scene.add(object);
          }, (xhr) => {
              this.setState({loadProcess: xhr.loaded / xhr.total * 100});
          }, (error) => {
              console.log(error, i);
          });
      })
      this.isLoaded = true;
    }
  }

  componentDidMount() {
    this.init3D({ antialias: true, alpha: true }, undefined, {ar: true});
    this.initLight();
    this.buttonAr?.addEventListener( 'click', () => {
      console.log("AR MODE");
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
    // if (this.mixer) this.mixer.update( this.clock.getDelta() * 1.5 );
      this.mixers.forEach((mixer) => {

          mixer.update(delta);
      });
    this.renderer?.render(this.scene, this.camera);
  }


  render(): React.ReactNode {
    const { loadProcess } = this.state;
    return (
        <div>
          {/* <header /> */}
          {loadProcess < 100 && <LinearProgress variant="determinate" value={loadProcess} />}
          <div ref={ (ref)=> { this.canvasDiv = ref}} className="canvasDiv" />
        </div>
    );
  }
}
