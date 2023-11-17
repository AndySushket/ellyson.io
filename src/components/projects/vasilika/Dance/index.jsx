/**
 * Created by Ellyson on 5/11/2018.
 */

import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import {LinearProgress} from "@mui/material";
import React from "react";
import TemplateFor3D from "components/templates/mainTemplate3D";
import model from "./bellydancing.fbx";

export default class Index extends TemplateFor3D {

    constructor(props) {
        super(props);
        this.isLoaded = false;
        this.state = {
            loadProcess: 0
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

      loader.load(model, (object) => {

        object.scale.setScalar(0.0001);

        const aabb = new THREE.Box3();
        aabb.setFromObject(object);

        this.camera.position.set(0, 0, aabb.max.z * 2);
        object.position.set(0, -1.5 * aabb.max.y, -aabb.max.z * 2);

        this.mixer = new THREE.AnimationMixer(object);

        const action = this.mixer.clipAction(object.animations[0]);
        action.play();

        this.scene.add(object);
      }, (xhr) => {
        this.setState({loadProcess: xhr.loaded / xhr.total * 100});
      }, (error) => {
        console.log(error);
      });

      this.isLoaded = true;
    }
  }

  componentDidMount() {
    this.init3D({ antialias: true, alpha: true }, undefined, {ar: true});
    this.initLight();
    const controller = this.renderer.xr.getController( 0 );
    controller.addEventListener( 'select', ()=> {
      // this.renderer.domElement.style.zIndex = "999999";
      let string = ""
      for (let i = 1; i < document.body.children.length; i++) {
        string += document.body.children[i].innerHTML;
      }
      alert(string);
    });
    this.onSelect()
    this.initControls();
    this.animate();
  }

  animate() {
    if (!this.looped) return;
    if (this.mixer) this.mixer.update( this.clock.getDelta() * 1.5 );
    super.animate();
  }


  render(): React.ReactNode {
    const { loadProcess } = this.state;
    return (
        <div>
          <header />
          {loadProcess < 100 && <LinearProgress variant="determinate" value={loadProcess} />}
          <div ref={ (ref)=> { this.canvasDiv = ref}} className="canvasDiv" />
        </div>
    );
  }
}
