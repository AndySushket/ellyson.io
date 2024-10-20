/**
 * Created by Ellyson on 5/11/2018.
 */

import React from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { ARButton } from 'three/examples/jsm/webxr/ARButton';
import {analytics, logEvent} from "../../firebase/firebaseConfig";

export default class TemplateFor3D extends React.Component<any, any> {
  private static deleteScene(scene: THREE.Scene | undefined) {
    scene?.traverse((mesh: THREE.Object3D | THREE.Mesh | undefined) => {
      if (mesh instanceof THREE.Mesh) {
        mesh.geometry.dispose();
        if (mesh.material instanceof THREE.Material) {
          mesh.material.dispose && mesh.material.dispose();
        } else if (Array.isArray(mesh.material)) {
          const { length } = mesh.material;
          let i = -1;
          while (++i < length) {
            mesh.material[i]?.dispose && mesh.material[i].dispose();
          }
        }
      }
      mesh = undefined;
    });

    scene = undefined;
  }

  state: { checked: boolean; isTabActive: boolean };

  protected time: number;

  private buttonAr: HTMLElement | undefined;

  protected looped: boolean;

  protected clock: THREE.Clock;

  protected mouse: THREE.Vector2 = new THREE.Vector2();

  private resolution: THREE.Vector2;

  protected HEIGHT: number;

  protected WIDTH: number;

  protected scene: THREE.Scene | undefined;

  protected renderer: THREE.WebGLRenderer | undefined;

  protected camera: THREE.PerspectiveCamera | undefined;

  protected light: THREE.DirectionalLight | undefined;

  private ambientLight: THREE.AmbientLight | undefined;

  protected controls: any;

  private rayCaster: THREE.Raycaster | undefined;

  private onKeydown: any;

  protected canvasDiv: HTMLDivElement | null = null;

  constructor(props: any) {
    super(props);
    this.state = {
      checked: false,
      isTabActive: true,
    };
    this.time = 0;
    this.looped = true;
    this.clock = new THREE.Clock();
    this.mouse = new THREE.Vector2();
    this.resolution = new THREE.Vector2(window.innerWidth, window.innerHeight);
    this.HEIGHT = window.innerHeight;
    this.WIDTH = window.innerWidth;
  }


  handleVisibilityChange = () => {
    this.setState({ isTabActive: !document.hidden });
  };

  componentDidMount() {
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
    logEvent(analytics, `page: ${window.location.pathname}`);
  }

  componentWillUnmount(): void {
    if (this.scene) {
      TemplateFor3D.deleteScene(this.scene);
      this.scene.children.length = 0;
    }

    if (this.renderer) {
      this.renderer.renderLists.dispose();
      this.renderer.forceContextLoss();
      this.renderer = undefined;
    }

    if (this.camera) {
      this.camera = undefined;
    }
    this.looped = false;
    document.removeEventListener(
      "visibilitychange",
        this.handleVisibilityChange,
    );
  }

  initScene(): void {
    this.scene = new THREE.Scene();
  }

  initRenderer(param: THREE.WebGLRendererParameters | undefined): void {
    this.renderer = new THREE.WebGLRenderer(param);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(0x000000);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.canvasDiv?.appendChild(this.renderer.domElement);
  }

  initCamera(cameraParam: any): void {
    this.camera = new THREE.PerspectiveCamera(
      cameraParam?.fov || 75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000000,
    );
  }

  initLight(): void {
    this.light = new THREE.DirectionalLight(0xffffff, 1);
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    this.scene?.add(this.light, this.ambientLight);
  }

  initControls(dom = this.renderer?.domElement): void {
    if (this.camera) {
      this.controls = new OrbitControls(this.camera, dom);
    }
  }

  init3D(
    param?: THREE.WebGLRendererParameters | undefined,
    cameraParam?: any,
    additionalParam?: any,
  ): void {
    this.initRenderer(param);
    this.initScene();
    this.initCamera(cameraParam);
    window.addEventListener(
      "resize",
      this.handleWindowResize.bind(this),
      false,
    );
    this.looped = true;
    if (additionalParam) {
      if (additionalParam.ar) {
        if (this.renderer instanceof THREE.WebGLRenderer) {
          this.renderer.xr.enabled = true;
          this.renderer.setClearColor(0x000000, 0);
          const arButton = ARButton.createButton(this.renderer, {
            // optionalFeatures: [ 'dom-overlay', 'dom-overlay-for-handheld-ar' ],
            // domOverlay: { root: document.body },
            requiredFeatures: ["hit-test"],
          });
          document.body.appendChild(arButton);
        }
      }
    }
  }

  animate(): void {
    requestAnimationFrame(this.animate.bind(this));
    this.time++;
    // @ts-ignore
    this.renderer?.render(this.scene, this.camera);
  }

  handleWindowResize(): void {
    if (this.camera) {
      this.HEIGHT = window.innerHeight;
      this.WIDTH = window.innerWidth;
      this.renderer && this.renderer.setSize(this.WIDTH, this.HEIGHT);
      this.camera.aspect = this.WIDTH / this.HEIGHT;
      this.camera.updateProjectionMatrix();
    }
  }

  attachMouseMoveEvent(element?: any): void {
    (element || this.renderer?.domElement)?.addEventListener(
      "mousemove",
      this.onMouseMove.bind(this),
    );
  }

  attachKeydownEvent(): void {
    window.addEventListener("keydown", this.onKeydown.bind(this));
  }

  attachMouseClickEvent(): void {
    this.renderer?.domElement?.addEventListener(
      "click",
      this.onClick.bind(this),
    );
  }

  onMouseMove(e: MouseEvent): void {
    this.getMousePosition(e);
  }

  onClick(e: MouseEvent): void {
    this.getMousePosition(e);
  }

  getMousePosition(e: MouseEvent): void {
    this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }

  initRaycaster(): void {
    this.rayCaster = new THREE.Raycaster();
  }

  render(): React.ReactNode {
    return (
      <div>
        <header />
        <div
          ref={(ref) => {
            this.canvasDiv = ref;
          }}
          className="canvasDiv"
        />
      </div>
    );
  }
}
