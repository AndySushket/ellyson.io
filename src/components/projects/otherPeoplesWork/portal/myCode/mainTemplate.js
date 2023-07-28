/**
 * Created by Ellyson on 5/11/2018.
 */

import {Component, ReactNode} from 'react';
import * as THREE from '../../../../../utils/libs/threejs/three_v0.106';

// import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

export default class TemplateFor3D extends Component<any, any> {

    deleteScene(scene: THREE.Scene | undefined) {

        scene?.traverse((mesh: THREE.Object3D | THREE.Mesh | undefined) => {
            if (mesh instanceof THREE.Mesh) {
                mesh.geometry.dispose();
                if (mesh.material instanceof THREE.Material) {
                    mesh.material && mesh.material.dispose && mesh.material.dispose();
                } else if (Array.isArray(mesh.material)) {
                    const length = mesh.material.length;
                    let i = -1;
                    while (++i < length) {
                        mesh.material[i] && mesh.material[i].dispose && mesh.material[i].dispose();
                    }
                }
            }
            mesh = undefined;
        });

        scene = undefined;
    }

    state: {
        checked: false;
    }

    constructor(props: any) {
        super(props);
        this.state = {
            checked: false
        };
        this.time = 0;
        this.looped = true;
        this.clock = new THREE.Clock();
        this.mouse = new THREE.Vector2();
        this.resolution = new THREE.Vector2(window.innerWidth,window.innerHeight);
        this.HEIGHT = window.innerHeight;
        this.WIDTH = window.innerWidth;
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
    }

    initScene(): void {
        this.scene = new THREE.Scene();
    }

    initRenderer(param: THREE.WebGLRendererParameters | undefined): void {
        this.renderer = new THREE.WebGLRenderer(param);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setClearColor(0x000000);
        this.renderer.setSize( window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        // @ts-ignore
        this.refs?.anchor?.appendChild(this.renderer.domElement);
    }

    initCamera(cameraParam: any): void {
        this.camera = new THREE.PerspectiveCamera(cameraParam?.fov || 75, window.innerWidth / window.innerHeight, 0.1, 1000000);
    }

    initLight(): void {
        this.light = new THREE.DirectionalLight(0xffffff, 1.);
        this.ambientLight = new THREE.AmbientLight(0xffffff, .2);
        this.scene?.add(this.light, this.ambientLight);
    }

    // initControls(dom = this.renderer?.domElement): void {
    //     if (this.camera) {
    //         this.controls = new OrbitControls(this.camera, dom);
    //     }
    // }

    init3D(param: THREE.WebGLRendererParameters | undefined, cameraParam: any): void {
        this.initRenderer(param);
        this.initScene();
        this.initCamera(cameraParam);
        window.addEventListener('resize', this.handleWindowResize.bind(this), false);
        this.looped = true;
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

    attachMouseMoveEvent(): void {
        this.renderer?.domElement.addEventListener("mousemove", this.onMouseMove.bind(this));
    }

    attachKeydownEvent(): void {
        window.addEventListener("keydown", this.onKeydown.bind(this));
    }

    attachMouseClickEvent(): void {
        this.renderer?.domElement.addEventListener("click", this.onClick.bind(this));
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

    render(): ReactNode {
        return <div>
            <header/>
            <div ref="anchor" className="canvasDiv"/>
        </div>
    }
}
