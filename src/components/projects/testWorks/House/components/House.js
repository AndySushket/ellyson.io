/**
 * Created by Ellyson on 6/9/2019.
 */
import * as THREE from 'three';
import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader';
import {FLOOR_POSITION} from './constants';

const house = require("assets/models/FBX/house4.FBX");
const grass = require("assets/img/map/grass.jpg");

const xPos = require(`assets/img/skyBox/planet/nebula-xpos.png`);
const xNeg = require(`assets/img/skyBox/planet/nebula-xneg.png`);
const yPos = require(`assets/img/skyBox/planet/nebula-ypos.png`);
const yNeg = require(`assets/img/skyBox/planet/nebula-yneg.png`);
const zPos = require(`assets/img/skyBox/planet/nebula-zpos.png`);
const zNeg = require(`assets/img/skyBox/planet/nebula-zneg.png`);

// const Zlib = require("three/examples/js/libs/inflate.min");
// window.Zlib = Zlib.Zlib;// for FBX Loader
function addGrass(){
	const texture = new THREE.TextureLoader().load(grass);
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set(2, 2);
	const geometry = new THREE.BoxGeometry(1200, 50, 1200).translate(0, -420, -50);
	const material = new THREE.MeshLambertMaterial({map: texture});
	return new THREE.Mesh(geometry, material)
}
export async function loadHouse() {
	const FBXParser = new FBXLoader();
	await FBXParser.load(house, (model) => {
		this.house = model;
		this.scene.add(model);
		model.scale.set(0.1, 0.1, 0.1);
		model.children.forEach((children) => {
			this.floors[children.name] = {mesh: children, size: new THREE.Box3().setFromObject(children).getSize(new THREE.Vector3())};
			children.receiveShadow = true;
			children.castShadow = true;
			children.material.bumpScale = 0.2;
		});
		model.add(addGrass());
		this.floors.House_Base.mesh.position.y = FLOOR_POSITION.base;
		this.floors.House_Middle.mesh.position.y = FLOOR_POSITION.middle;
		this.floors.House_Top.mesh.position.y = FLOOR_POSITION.top;
	}, this.updateLoadingBar.bind(this), console.log);
}

export function addSkyBox(scene, show){
	scene.background = show ?  new THREE.CubeTextureLoader().load([xPos,xNeg,yPos,yNeg,zPos,zNeg]) : null;
}
