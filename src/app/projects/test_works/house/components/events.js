import {colorsArray, FLOOR_POSITION, FLOOR_SIZE} from "./constants";

export function mouseMove(){
	if(this.rayCaster && this.interectiveMeshes && this.interectiveMeshes.length){
		this.rayCaster.setFromCamera( this.mouse, this.camera );
		const intersects = this.rayCaster.intersectObjects([...this.interectiveMeshes, this.linkObject.plane, this.saveScreen.plane]);
		if(intersects[0] && intersects[0].object.name && this.state.loaded){
			this.cssRenderer.renderer.domElement.style.cursor = "pointer";
			this.aimedObjectName = intersects[0].object.name;
		} else {
			this.cssRenderer.renderer.domElement.style.cursor = "auto";
			this.aimedObjectName = ""
		}
	}
}

export function addFloor(){
	this.additinalFloor++;
	this.floors.House_Middle.mesh.position.y = FLOOR_POSITION.middle + FLOOR_SIZE.middle * (this.additinalFloor);
	this.floors.House_Top.mesh.position.y = FLOOR_SIZE.top + FLOOR_SIZE.middle * (this.additinalFloor + 1);
	this.interectiveMeshes[2].position.y = FLOOR_SIZE.middle * (this.additinalFloor) * 0.1;
	this.saveScreen.positionY = 150 + FLOOR_SIZE.middle * (this.additinalFloor) * 0.1;
	if (this.additinalFloor === 0){
		this.floors.House_Top.mesh.position.y = FLOOR_POSITION.top;
		this.interectiveMeshes[2].position.y = FLOOR_POSITION.base;
		this.floors.House_Middle.mesh.visible = true;
	} else {
		const clonedFloor = this.floors.House_Middle.mesh.clone();
		this.additinalFloorArray[this.additinalFloor - 1] = clonedFloor;
		clonedFloor.position.y = FLOOR_POSITION.middle + FLOOR_SIZE.middle * (this.additinalFloor -1);
		this.house.add(clonedFloor);
	}
}

export async function deleteFloor() {
	this.additinalFloor--;
	if(this.additinalFloor === -1) {
		this.floors.House_Middle.mesh.visible = false;
		this.floors.House_Top.mesh.position.y = FLOOR_SIZE.top;
	} else if (this.additinalFloor > -1) {
		this.floors.House_Top.mesh.position.y = FLOOR_SIZE.top + FLOOR_SIZE.middle * (this.additinalFloor + 1);
	} else {
		this.additinalFloor = -1;
		return;
	}
	this.interectiveMeshes[2].position.y = FLOOR_SIZE.middle * (this.additinalFloor) * 0.1;
	this.saveScreen.positionY = 150 + FLOOR_SIZE.middle * (this.additinalFloor) * 0.1;
	const clonedFloor = this.additinalFloorArray[this.additinalFloor + 1] ;
	await this.house.remove(clonedFloor);
	this.floors.House_Middle.mesh.position.y = FLOOR_POSITION.middle + FLOOR_SIZE.middle * (this.additinalFloor);
	await this.additinalFloorArray.splice(this.additinalFloor + 1, 1);
}

export async function keydown(e) {
	if(Object.keys(this.floors).length){
		switch (e.keyCode){
			case 38: {
				addFloor.call(this);
				break
			}
			case 40:{
				await deleteFloor.call(this);
				break
			}
			default:
				break;
		}
	}
}

function removeFromScene(scene, cssScene, object){
	scene.remove(object.plane);
	cssScene.remove(object.cssObject);
	object.cssObject.remove(...object.cssObject.children);
	object.show = false;
}

function addToScene(scene, cssScene, object){
	scene.add(object.plane);
	cssScene.add(object.cssObject);
	object.cssObject.add(object.cssObject.userData.child);
	object.show = true;
}

export function click(e) {
	if(!this.controls.moving && this.state.loaded && e.which === 1){
		switch (this.aimedObjectName) {
			case "green": {
				this.currentColor.index = this.currentColor.index > 1 ? 0 : (this.currentColor.index + 1);
				console.log("changeLight", this.currentColor.index);
				this.changeLight(colorsArray[this.currentColor.index]);
				break;
			}
			case "blue": {
				if(this.linkObject.show) {
					removeFromScene(this.scene, this.cssScene, this.linkObject);
				} else {
					addToScene(this.scene, this.cssScene, this.linkObject);
				}
				break;
			}
			case "red": {
				if(this.saveScreen.show) {
					removeFromScene(this.scene, this.cssScene, this.saveScreen);
				} else {
					addToScene(this.scene, this.cssScene, this.saveScreen);
				}
				break;
			}
			default:
				break;
		}
	}
}
