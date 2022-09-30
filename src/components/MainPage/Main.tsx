/**
 * Created by Ellyson on 15/09/2022.
 */

import TemplateFor3D from '../templates/mainTemplate3D';
import * as THREE from 'three';
import {ReactNode} from "react";
import vert from "./vert.vert"
import frag from './frag.frag';
import {Instagram, Facebook, Twitter, LinkedIn, Mail} from '@material-ui/icons';
import {Button, IconButton} from "@material-ui/core";


const map = require('./img.png');
const map2 = require('./download1.jpeg');
// const vert = require('./vert.vert').default;
// const frag = require('./frag.frag').default;

export default class Main extends TemplateFor3D {
    static EarthRadiusKM: number = 6371;
    static EarthCircumferenceKM: number = 6371 * Math.PI * 2;

    private sphere: THREE.Mesh | undefined;

    initControls(): void {
        super.initControls();
        this.camera?.position.set(0, 0, 10);
    }

    initShader(): void {
        // const geometry = new THREE.SphereBufferGeometry(4, 30, 30);
        // const customMaterial = new THREE.ShaderMaterial();
        // this.sphere = new THREE.Mesh(geometry, customMaterial);
        // this.scene?.add(this.sphere);
    }

    componentDidMount(): void {
        this.init3D(undefined);
        this.initLight();
        // this.ambientLight.intensity = 0.8;
        this.initShader();
        this.initControls();
        this.initCubeSphere();
        this.animate();
    }

    initCubeSphere() {
        const geometry2 = new THREE.BoxGeometry( 2, 2, 2, 50, 100, 100);
        const geometry = new THREE.IcosahedronGeometry( 2, 500);

        const texture = new THREE.TextureLoader().load(map);
        const displacementMap = new THREE.TextureLoader().load(map2);
            const colors = [
                0x00ff00,
                0x00ff00,
                0x0000ff,
                0x0000ff,
                0xff0000,
                0xff0000
            ];

        const material: THREE.ShaderMaterial = new THREE.ShaderMaterial({
            vertexShader: vert,
            fragmentShader: frag,
            uniforms: {
                map: {
                    type: "t",
                    value: texture
                },
                displacementMap: {
                    type: "t",
                    value: displacementMap
                },
                cube: {
                    type: "f",
                    value: 0
                }

            },
            // wireframe: true
        });

        const mesh = new THREE.Mesh( geometry, material );
        const mesh2 = new THREE.Mesh( geometry2, material.clone() );
        mesh2.material.uniforms.cube.value = 1;
        mesh2.position.x = 3;
        mesh.position.x = -3;
        mesh.rotation.y = -Math.PI /2;

        this.scene?.add( mesh, mesh2 );
    }

    animate(): void {
        if (!this.looped) return;
        this.scene?.children.forEach((children) => (children.rotation.y += 0.003))
        super.animate();
    }

    navigationPanel(): ReactNode {
        return
    }

    render(): ReactNode {
        return <div>
            {this.navigationPanel()}
            <div ref="anchor" className="canvasDiv"/>
        </div>
    }
}