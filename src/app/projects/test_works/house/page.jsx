"use client";

import React from 'react';
import * as THREE from 'three';
import {Button, ProgressBar} from "react-bootstrap";

import gsap from "gsap";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import TemplateFor3D from 'components/common/mainTemplate3D';
import getInterectiveMeshes from './components/interactiveMeshes';
import {loadHouse, addSkyBox} from './components/House';
import {mouseMove, keydown, click, addFloor, deleteFloor} from './components/events';
import FlyingText from './components/flyingText';
import Light from './components/light';
import CssRenderer from './components/CSS3DRenderer';
import {COLORS, colorsArray} from './components/constants';

export default class House extends TemplateFor3D {

	state = {
		isTabActive: true,
		progress: 0,
		loaded: false,
		showSkyBox: false,
		width: 0,
		height: 0
	}

	constructor(){
		super();
		this.interectiveMeshes = getInterectiveMeshes();
		this.aimedObjectName = "";
		this.currentColor = {index: 0, color: COLORS.white.clone()};
		this.floors = {};
		this.additinalFloor = 0;
		this.additinalFloorArray = [];
		this.doorLight = new Light(this.currentColor);
		this.cssScene = new THREE.Scene();
	}

	initCamera() {
		super.initCamera();
	}

	initControls(domElement) {
		this.controls = new OrbitControls(this.camera, domElement);
		this.controls.enableKeys = false;
		this.resetCamera();
		this.controls.update();
	}

	resetCamera(){
		this.controls.enabled = false;
		this.controls.target.set(0,0,0);
		this.camera.position.set(219.2, 50.0, 120.0);
		this.camera.rotation.set(-.0, 1.04, 0);
	}

	async loadOrDeleteHouse() {
		if(!this.state.loaded){
			this.scene.add(...this.interectiveMeshes);
			this.controls.enabled = true;
			await loadHouse.call(this);
			await this.setState({ loaded: true });
		} else {
			this.scene.remove(this.house, ...this.interectiveMeshes, this.saveScreen.plane, this.linkObject.plane);
			this.cssScene.remove(this.linkObject.cssObject, this.saveScreen.cssObject);
			this.linkObject.cssObject.remove(this.linkObject.cssObject.userData.child);
			this.saveScreen.cssObject.remove(this.saveScreen.cssObject.userData.child);
			this.currentColor.index = 0;
			this.interectiveMeshes[2].position.y = 0;
			this.setState({loaded: false, progress: 0});
			this.linkObject.show = false;
			this.saveScreen.show = false;
			this.changeLight(colorsArray[this.currentColor.index]);
			this.resetCamera();
			this.scene.background = null;
			this.additinalFloor = 0;
		}
	}

	updateLoadingBar(e){
		this.setState({progress: Math.floor(e.loaded / e.total * 100)});
	}

	initDoorLight() {
		this.scene.add(this.doorLight.spotLight, this.doorLight.pointLight);
		console.log("add light");
		this.light.position.set(700 ,2000,500);
	}

	onClick(e){
		click.call(this, e);
	}

	handleWindowResize(){
		super.handleWindowResize();
		this.cssRenderer?.renderer.setSize(this.WIDTH, this.HEIGHT);
	}

	attachMouseMoveEvent() {
		this.cssRenderer.renderer.domElement.addEventListener("mousemove", this.onMouseMove.bind(this));
	}

	attachMouseClickEvent() {
		this.cssRenderer.renderer.domElement.addEventListener("mouseup", this.onClick.bind(this));
	}

	onMouseMove(e){
		super.onMouseMove(e);
		mouseMove.call(this);
	}

	async onKeydown(e) {
		await keydown.call(this, e);
	}

	changeLight(color) {
		gsap.to(this.currentColor.color, {
			r: color.r,
			g: color.g,
			b: color.b,
			duration: 0.3,
		});
	}

	loadModals(){
		this.linkObject = new FlyingText(50.0, 30.0, new THREE.Vector3(20.0, 0, 60.0), new THREE.Euler(0, Math.PI / 2, 0), "link", this);
		this.saveScreen = new FlyingText(80.0, 25.0, new THREE.Vector3(20.0, 150, 0.0), new THREE.Euler(0, Math.PI / 2, 0), "screen", this);
	}

	updateWidhtHeight(){
		this.setState({
			width: window.innerWidth,
			height: window.innerHeight
		})
	}

	async componentDidMount() {
		super.componentDidMount()
		this.updateWidhtHeight();
		this.init3D({alpha: true,antialias: true, preserveDrawingBuffer: true});
		this.renderer.physicallyCorrectLights = true;
		this.cssRenderer = new CssRenderer(this.renderer, this.canvasDiv);
		this.initControls(this.cssRenderer.renderer.domElement);
		super.initRaycaster();
		this.attachMouseMoveEvent();
		this.attachMouseClickEvent();
		this.attachKeydownEvent.bind(this);
		this.loadModals();
		this.initLight();
		this.initDoorLight();

		this.animate();
	}

	addSkyBox(){
		addSkyBox(this.scene, !this.state.showSkyBox);
		this.setState({showSkyBox: !this.state.showSkyBox})
	}

	animate() {
		if (!this.looped || !this.state.isTabActive) return;
		this.controls.update();
		this.linkObject?.animate(this.time);
		this.saveScreen?.animate(this.time);
		super.animate();
		this.cssRenderer.renderer.render(this.cssScene, this.camera);
	}

	render() {
		const {progress,loaded, width, height} = this.state;
		return <div>
			<ProgressBar style={{height: (progress === 100 ? "0" : "9px")}} now={this.state.progress} />
			<header className={!this.state.loaded ? "buttonInCenter" : ""}
					  style={{
						  right: (!this.state.loaded ? `${width / 2 + 150}px` : "15px"),
						  top: (!this.state.loaded ? `${height / 2 - 75}px` : "15px")
					  }}>
				<div className="buttons">
					<Button className={!loaded && "buttonInCenter"} onClick={() => this.loadOrDeleteHouse()}>
						{!loaded ? `Load Model` : `clear`}
					</Button>
					{loaded && <div>
						<div>
							<Button onClick={()=>addFloor.call(this)}>Add floor</Button>
						</div>
						<div>
							<Button onClick={()=>deleteFloor.call(this)}>Delete floor</Button>
						</div>
						<div>
							<Button onClick={()=>this.addSkyBox()}>skyBox</Button>
						</div>
					</div>}
				</div>
			</header>
			<div ref={ (ref) => {this.canvasDiv = ref}} className="canvasDiv"/>
		</div>
	}
}
