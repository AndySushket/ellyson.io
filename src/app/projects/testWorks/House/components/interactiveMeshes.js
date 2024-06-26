/**
 * Created by Ellyson on 6/9/2019.
 */

import * as THREE from 'three';

export default function getInterectiveMeshes(){
	const blueMesh = new THREE.Mesh(new THREE.BoxGeometry(79.6, 75.0, 41.0).translate(-15.0, -2.0, 14.5),
		new THREE.MeshBasicMaterial({color: new THREE.Color("blue"),transparent: true, opacity: 0}));
	blueMesh.name = "blue";

	const greenGeometry = new THREE.BoxGeometry(79.6, 75.0, 30.0);
	const greenStairs = new THREE.BoxGeometry(30.0, 35.0, 30.0);
	const greenStairsArray = greenStairs.getAttribute('position');
	greenStairsArray.set([-10], 1);
	greenStairsArray.set([-10], 4);
	greenStairsArray.needsUpdate = true;

	// greenGeometry.merge(greenStairs.translate(55.0, -20.0, 0)); //todo fix merge
	const greenMesh = new THREE.Mesh(greenGeometry.translate(-15.0, -2.0, -22.0),
		new THREE.MeshBasicMaterial({color: new THREE.Color("green"),transparent: true, opacity: 0}));
	greenMesh.name = "green";

	const redMesh = new THREE.Mesh(new THREE.BoxGeometry(78.6, 65.0, 74.0).translate(-16.0, 102.5, 0),
		new THREE.MeshBasicMaterial({color: new THREE.Color("red"),transparent: true, opacity: 0}));
	redMesh.name = "red";

	return [blueMesh, greenMesh, redMesh];
}
