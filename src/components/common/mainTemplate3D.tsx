'use client';

import React from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ARButton } from 'three/examples/jsm/webxr/ARButton';
import CameraManager from 'core/CameraManager';
import Renderer from 'core/Renderer';
import Scene from 'core/Scene';

const isBrowser = typeof window !== 'undefined';

export default class TemplateFor3D extends React.Component<any, any> {
  static deleteScene(scene: THREE.Scene | undefined) {
    scene?.traverse((mesh: THREE.Object3D | THREE.Mesh | undefined) => {
      if (mesh instanceof THREE.Mesh) {
        mesh.geometry.dispose();
        if (mesh.material instanceof THREE.Material) {
          mesh.material.dispose && mesh.material.dispose();
        } else if (Array.isArray(mesh.material)) {
          for (const material of mesh.material) {
            material.dispose && material.dispose();
          }
        }
      }
      mesh = undefined;
    });

    scene = undefined;
  }

  state: { checked: boolean; isTabActive: boolean };
  protected cameraManager: CameraManager | undefined;
  protected time: number;
  protected looped: boolean;
  protected clock: THREE.Clock;
  protected mouse: THREE.Vector2;
  protected HEIGHT: number;
  protected WIDTH: number;
  protected scene: THREE.Scene | undefined;
  protected renderer: THREE.WebGLRenderer | undefined;
  protected camera: THREE.PerspectiveCamera | undefined;
  protected light: THREE.DirectionalLight | undefined;
  protected controls: any;

  protected buttonAr: HTMLElement | undefined;

  protected resolution: THREE.Vector2;

  protected ambientLight: THREE.AmbientLight | undefined;

  protected rayCaster: THREE.Raycaster | undefined;

  protected onKeydown: any;

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

    if (isBrowser) {
      this.resolution = new THREE.Vector2(window.innerWidth, window.innerHeight);
      this.HEIGHT = window.innerHeight;
      this.WIDTH = window.innerWidth;
    } else {
      this.resolution = new THREE.Vector2(0, 0);
      this.HEIGHT = 0;
      this.WIDTH = 0;
    }
  }

  handleVisibilityChange = () => {
    this.setState({ isTabActive: !document.hidden });
  };

  componentDidMount() {
    if (typeof window === 'undefined') return;
    if (isBrowser) {
      this.HEIGHT = window.innerHeight;
      this.WIDTH = window.innerWidth;
      this.resolution.set(this.WIDTH, this.HEIGHT);

      document.addEventListener('visibilitychange', this.handleVisibilityChange);

      window.addEventListener('resize', this.handleWindowResize, false);
    }
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
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    window.removeEventListener('resize', this.handleWindowResize);
  }

  initScene(): void {
    this.scene = new Scene();
  }

  initRenderer(param: THREE.WebGLRendererParameters | undefined): void {
    this.renderer = new Renderer(param);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(0x000000);
    this.renderer.setSize(this.WIDTH, this.HEIGHT);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.canvasDiv?.appendChild(this.renderer.domElement);
  }

  initCamera(cameraParam: any): void {
    this.camera = new THREE.PerspectiveCamera(
      cameraParam?.fov || 75,
      this.WIDTH / this.HEIGHT,
      0.1,
      1000000,
    );
    this.cameraManager = new CameraManager(this.camera);
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
    activeControls?: boolean,
  ): void {
    this.initRenderer(param);
    this.initScene();
    this.initCamera(cameraParam);
    this.initLight();

    if (activeControls) {
      this.initControls();
    }

    if (additionalParam && additionalParam.ar && this.renderer instanceof THREE.WebGLRenderer) {
      this.renderer.xr.enabled = true;
      this.renderer.setClearColor(0x000000, 0);

      const arButton = ARButton.createButton(this.renderer, {
        requiredFeatures: ['hit-test'],
      });
      document.body.appendChild(arButton);
    }
  }

  animate(): void {
    if (!this.looped) return;
    requestAnimationFrame(() => this.animate());
    this.time++;
    // @ts-ignore
    this.renderer?.render(this.scene, this.camera);
  }

  handleWindowResize = (): void => {
    if (this.camera) {
      this.HEIGHT = window.innerHeight;
      this.WIDTH = window.innerWidth;
      this.renderer?.setSize(this.WIDTH, this.HEIGHT);
      this.camera.aspect = this.WIDTH / this.HEIGHT;
      this.camera.updateProjectionMatrix();
    }
  };

  attachMouseMoveEvent(element?: any): void {
    (element || this.renderer?.domElement)?.addEventListener(
      'mousemove',
      this.onMouseMove.bind(this),
    );
  }

  attachKeydownEvent(): void {
    if (isBrowser) {
      window.addEventListener('keydown', this.onKeydown.bind(this));
    }
  }

  attachMouseClickEvent(): void {
    this.renderer?.domElement?.addEventListener('click', this.onClick.bind(this));
  }

  onMouseMove(e: MouseEvent): void {
    this.getMousePosition(e);
  }

  onClick(e: MouseEvent): void {
    this.getMousePosition(e);
  }

  getMousePosition(e: MouseEvent): void {
    this.mouse.x = (e.clientX / this.WIDTH) * 2 - 1;
    this.mouse.y = -(e.clientY / this.HEIGHT) * 2 + 1;
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
