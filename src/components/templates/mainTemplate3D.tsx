/**
 * Created by Ellyson on 5/11/2018.
 */

import {Component, ReactNode} from 'react';
import * as THREE from 'three';

const OrbitControls = require('three-orbit-controls')(THREE);

export default class TemplateFor3D extends Component<any, any> {

	state: {
		checked: false;
	}

	private time: number;
	protected looped: boolean;
	protected clock: THREE.Clock;
	private mouse: THREE.Vector2;
	private resolution: THREE.Vector2;
	private HEIGHT: number;
	private WIDTH: number;
	protected scene: THREE.Scene | undefined;
	protected renderer: THREE.WebGLRenderer | undefined;
	protected camera: THREE.PerspectiveCamera | undefined;
	private light: THREE.DirectionalLight | undefined;
	private ambientLight: THREE.AmbientLight | undefined;
	private controls: any;
	private rayCaster: THREE.Raycaster | undefined;
	private onKeydown: any;

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

	initCamera(): void {
		this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000000);
	}

	initLight(): void {
		this.light = new THREE.DirectionalLight(0xffffff, 1.);
		this.ambientLight = new THREE.AmbientLight(0xffffff, .2);
		this.scene?.add(this.light, this.ambientLight);
	}

	initControls(dom = this.renderer?.domElement): void {
		this.controls = new OrbitControls(this.camera, dom);
	}

	init3D(param: THREE.WebGLRendererParameters | undefined): void {
		this.initRenderer(param);
		this.initScene();
		this.initCamera();
		window.addEventListener('resize', this.handleWindowResize.bind(this), false);
		this.looped = true;
	}

	componentWillUnmount(): void {
		this.renderer = undefined;
		this.looped = false;
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
