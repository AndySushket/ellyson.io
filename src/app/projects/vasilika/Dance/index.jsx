/**
 * Created by Ellyson on 5/11/2018.
 */

import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import {CircularProgress} from "@mui/material";
import React from "react";
import TemplateFor3D from "app/templates/mainTemplate3D";
import danceModel from "./danceModel.fbx";

let hitTestSource = null;
let hitTestSourceRequested = false;
let reticle = null;

export default class Index extends TemplateFor3D {

    constructor(props) {
        super(props);
        this.mixers = [];
        hitTestSourceRequested = false;
        hitTestSource = null;
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
    // this.camera.position.set(0, 0, 10);
  }

  onSelect() {
    if (!this.isLoaded) {
      const loader = new FBXLoader();
      [danceModel].forEach((fbx, i) => {
          loader.load(fbx, (object) => {



              const aabb = new THREE.Box3();
              aabb.setFromObject(object);

              i == 0 && this.camera.position.set(0, 0, aabb.max.z * 2);
              object.position.set(i * 3 * aabb.max.x, -1.5 * aabb.max.y, -aabb.max.z * 2);

              const mixer = new THREE.AnimationMixer(object);

              this.mixers.push(mixer);

              const action = mixer.clipAction(object.animations[0]);
              action.play();
              const position = new THREE.Vector3();
              position.setFromMatrixPosition( reticle.matrix );
              object.position.set(position.x, position.y, position.z);
              object.scale.setScalar(0.000003);
              this.scene.add(object);
          }, (xhr) => {
              this.setState({loadProcess: xhr.loaded / xhr.total * 100});
          }, (error) => {
              console.log(error);
          });
      })

        this.scene.remove(reticle);


      this.isLoaded = true;
    }
  }

  initCircle() {
      reticle = new THREE.Mesh(
          new THREE.RingGeometry( 0.15, .2, 32 ).rotateX( - Math.PI / 2 ),
          new THREE.MeshBasicMaterial({side: THREE.DoubleSide})
      );
      this.scene.add( reticle );
      reticle.matrixAutoUpdate = false;
      reticle.visible = false;
  }

  initLight() {
      this.light = new THREE.DirectionalLight(0xffffff, 1);
      this.ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
      this.scene?.add(this.light, this.ambientLight);
  }

    componentDidMount() {
    super.componentDidMount();
    this.init3D({ antialias: true, alpha: true }, undefined, {ar: true});
    this.initLight();
    this.initCircle();

    const controller = this.renderer.xr.getController( 0 );
    controller.addEventListener( 'select', () => this.onSelect());
    this.scene.add( controller );
        console.log("=======", controller)
    this.initControls();
    this.renderer?.setAnimationLoop((time, frame) => {
      this.animate(time, frame);
    });
      this.renderer.xr.addEventListener( 'sessionstart',  ( event ) => {
          this.handleWindowResize();
          this.scene.add( reticle );
          reticle.visible = true;
      } );

      this.renderer.xr.addEventListener( 'sessionend',  ( event ) => {
          document.body.style.display = '';
          reticle.visible = false;
          this.scene.remove( ...this.scene.children );
      } );
  }

  animate(timestamp, frame) {
      if (!this.looped || !this.state.isTabActive) return;

    if (frame) {

        // if ( xr.enabled === true && xr.isPresenting === true ) {
        //
        //     if ( xr.cameraAutoUpdate === true ) xr.updateCamera( this.camera );
        //
        //     this.camera = xr.getCamera(); // use XR camera for rendering
        //
        // }

        const referenceSpace = this.renderer.xr.getReferenceSpace();
        const session = this.renderer.xr.getSession();

        if ( hitTestSourceRequested === false ) {

            session.requestReferenceSpace( 'viewer' ).then(  ( referenceSpace ) => {

                session.requestHitTestSource( { space: referenceSpace } ).then(  ( source ) => {

                    hitTestSource = source;

                } );

            } );

            session.addEventListener( 'end',  () => {

                hitTestSourceRequested = false;
                hitTestSource = null;

            } );

            hitTestSourceRequested = true;

        }

        if ( hitTestSource ) {

            const hitTestResults = frame.getHitTestResults( hitTestSource );

            if ( hitTestResults.length ) {

                const hit = hitTestResults[ 0 ];

                reticle.visible = true;
                reticle.matrix.fromArray( hit.getPose( referenceSpace ).transform.matrix );

            } else {

                reticle.visible = false;

            }

        }

    }

    const delta = this.clock.getDelta();
    this.mixers.forEach((mixer) => {
        mixer.update(delta);
    });
    this.renderer?.render(this.scene, this.camera);
  }

  render() {
    const { loadProcess } = this.state;
    return (
        <div>
          {loadProcess > 0 && loadProcess < 100 && <CircularProgress style={{position: 'absolute', top: "50%" , left: "50%",  transform: "translate(-50%, -50%)"}} variant="determinate" value={loadProcess} />}
          <div ref={ (ref)=> { this.canvasDiv = ref}} className="canvasDiv" />
        </div>
    );
  }
}
