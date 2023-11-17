/**
 * Created by Ellyson on 5/11/2018.
 */

import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import TemplateFor3D from "components/templates/mainTemplate3D";
import model from "./bellydancing.fbx";

export default class Index extends TemplateFor3D {

    constructor(props) {
        super(props);
        this.isLoaded = false;
    }

  componentWillUnmount() {
    super.componentWillUnmount();
    this.gui.destroy();
  }

  initControls() {
    super.initControls();
    this.camera.position.set(0, 0, 10);
  }

  onSelect() {

    if (!this.isLoaded) {
      console.log('loading')
      const loader = new FBXLoader();

      loader.load(model, (object) => {

        object.scale.setScalar(0.0001);

        const aabb = new THREE.Box3();
        aabb.setFromObject(object);

        this.camera.position.set(0, 0, aabb.max.z * 2);
        object.position.set(0, -aabb.max.y, -aabb.max.z * 2);
        // this.camera.lookAt(object.position);

        this.mixer = new THREE.AnimationMixer(object);

        const action = this.mixer.clipAction(object.animations[0]);
        action.play();

        object.traverse((child) => {

          if (child.isMesh) {

            child.castShadow = true;
            child.receiveShadow = true;

          }

        });

        this.scene.add(object);

      });

      this.isLoaded = true;

      console.log('loaded',window, this.renderer)
    }

    console.log(this.cube)
  }

  componentDidMount() {
    this.init3D(undefined, undefined, {ar: true});
    this.initLight();
    this.onSelect()
    this.initControls();
    this.animate();
  }

  applyMatrix() {
    this.cube.applyMatrix(this.Index);
  }

  animate() {
    if (!this.looped) return;
    if (this.mixer) this.mixer.update( this.clock.getDelta() );
    super.animate();
  }
}
