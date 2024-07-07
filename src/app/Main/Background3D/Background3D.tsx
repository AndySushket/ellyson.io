/**
 * Created by Ellyson on 2/05/2024.
 */

import * as THREE from "three";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { BokehPass } from "three/examples/jsm/postprocessing/BokehPass";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass";

import { connect } from "react-redux";
import AnimationUtil from "utils/Animation";
import TemplateFor3D from "app/templates/mainTemplate3D";
import { setLocation } from "app/store/UI/UI";

class Background3D extends TemplateFor3D {
  private postprocessing: any | undefined = {};

  private composer: EffectComposer | undefined;

  private sphere: THREE.Object3D | undefined;

  private currentLocation: string = "/";

  initControls(): void {
    this.camera?.position.set(0, 0, 200);
  }

  initShader(): void {
    this.sphere = new THREE.Object3D();
    const geometry = new THREE.SphereGeometry(1, 4, 4);
    const material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      flatShading: true,
    });

    for (let i = 0; i < 100; i++) {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position
        .set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)
        .normalize();
      mesh.position.multiplyScalar(Math.random() * 400);
      mesh.rotation.set(
        Math.random() * 2,
        Math.random() * 2,
        Math.random() * 2,
      );
      mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 50;
      this.sphere.add(mesh);
    }
    this.scene?.add(this.sphere);
  }

  componentDidUpdate(prevProps: Readonly<any>) {
    const { currentLocation } = this;

    if (
      currentLocation !== this.props.currentPath ||
      currentLocation !== this.props.stateLocation
    ) {
      this.currentLocation =
        prevProps.currentPath !== this.props.currentPath
          ? this.props.currentPath
          : this.props.stateLocation;

      if (this.currentLocation === "/projects" && this.camera) {
        AnimationUtil.moveCamera({
          nextPosition: new THREE.Vector3(
            Math.random() * 300 - 150,
            Math.random() * 300 - 150,
            Math.random() * 300 - 150,
          ),
          camera: this.camera,
          ms: 1500,
          lookAtVector: new THREE.Vector3(),
        });
      }

      if (this.currentLocation === "/" && this.camera) {
        AnimationUtil.moveCamera({
          nextPosition: new THREE.Vector3(0, 0, 200),
          camera: this.camera,
          ms: 1500,
          lookAtVector: new THREE.Vector3(),
        });
      }
    }
  }

  componentDidMount(): void {
    super.componentDidMount();
    this.init3D(undefined, {});
    this.initShader();
    this.initLight();
    this.initControls();
    this.initPostprocessing();
    this.attachMouseMoveEvent();
    this.animate();
  }

  initPostprocessing() {
    const renderPass = new RenderPass(
      this.scene as THREE.Scene,
      this.camera as THREE.PerspectiveCamera,
    );

    const bokehPass = new BokehPass(
      this.scene as THREE.Scene,
      this.camera as THREE.PerspectiveCamera,
      {
        focus: 1.0,
        aperture: 0.025,
        maxblur: 0.01,
      },
    );

    const outputPass = new OutputPass();

    this.composer = new EffectComposer(this.renderer as THREE.WebGLRenderer);

    this.composer.addPass(renderPass);
    this.composer.addPass(bokehPass);
    this.composer.addPass(outputPass);

    this.postprocessing.composer = this.composer;
    this.postprocessing.bokeh = bokehPass;
  }

  animate(): void {
    if (!this.looped || !this.state.isTabActive) return;
    this.postprocessing.composer.render(0.2);
    AnimationUtil.updateAnimation();
    if (this.sphere) {
      this.sphere.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.rotation.x += 0.01;
        }
      });
    }
    requestAnimationFrame(this.animate.bind(this));
  }

  render(): React.ReactNode {
    return (
      <div>
        <div
          ref={(ref) => {
            this.canvasDiv = ref;
          }}
          className="canvasDiv main-canvasDiv"
        />
        <Outlet />
      </div>
    );
  }
}

function Background3DWithLocation({
  stateLocation,
  setLocationDispatch,
}: {
  stateLocation: string;
  setLocationDispatch: any;
}) {
  const location = useLocation();
  const [currentPath, setPath] = useState("");

  useEffect(() => {
    if (currentPath !== location.pathname) {
      setPath(location.pathname);
      if (stateLocation !== location.pathname) {
        setLocationDispatch(location.pathname);
      }
    }

    if (stateLocation !== currentPath && currentPath === location.pathname) {
      setPath(stateLocation);
    } else if (
      stateLocation !== currentPath &&
      currentPath !== location.pathname
    ) {
      setPath(location.pathname);
      setLocationDispatch(location.pathname);
    }
  }, [location, stateLocation]);

  return (
    <Background3D currentPath={currentPath} stateLocation={stateLocation} />
  );
}

function mapStateToProps(state: { ui: any }) {
  const {
    ui: { location },
  } = state;
  return { stateLocation: location };
}

const mapDispatchToProps = (
  dispatch: (arg0: { payload: undefined; type: "UI/setLocation" }) => any,
) => ({
  setLocationDispatch: (dest: void) => dispatch(setLocation(dest)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Background3DWithLocation);
