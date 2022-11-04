/**
 * Created by Ellyson on 15/09/2022.
 */

import TemplateFor3D from '../templates/mainTemplate3D';
import * as THREE from 'three';
import {ReactNode} from "react";
import vert from "./vert.vert"
import waterVert from "./water.vert"
import atmosphereVert from "./atmosphereVert.vert"
import frag from './frag.frag';
import waterFrag from './water.frag';
import atmosphereFrag from './atmosphereFrag.frag';
import {Instagram, Facebook, Twitter, LinkedIn, Mail} from '@material-ui/icons';
import {Button, IconButton} from "@material-ui/core";
import {Water} from "three/examples/jsm/objects/Water";
import drawThreeGeo from "./threeGeoJSON";
import myJson from './countries.json';


const map = require('./img.png');
const map2 = require('./displaceMap2.png');
const map3 = require('./image.png');
const map4 = require('./waternormals.png');
// const vert = require('./vert.vert').default;
// const frag = require('./frag.frag').default;

export default class Main extends TemplateFor3D {
    static EarthRadiusKM: number = 6371;
    static EarthCircumferenceKM: number = 6371 * Math.PI * 2;

    private sphere: THREE.Mesh | undefined;
    private depthMaterial: any;
    private renderTarget: THREE.WebGLRenderTarget | undefined;
    private waterMesh: any;

    initControls(): void {
        // super.initControls();
        this.camera?.position.set(-3, 1, -7);
        this.camera.lookAt(new THREE.Vector3(-3, 1, 0))
    }

    initShader(): void {
        // const geometry = new THREE.SphereBufferGeometry(4, 30, 30);
        // const customMaterial = new THREE.ShaderMaterial();
        // this.sphere = new THREE.Mesh(geometry, customMaterial);
        // this.scene?.add(this.sphere);
    }

    componentDidMount(): void {
        this.init3D({antialias: true}, {fov: 35});
        this.initLight();
        // this.ambientLight.intensity = 0.8;
        this.initShader();
        this.initControls();
        this.initCubeSphere();
        this.animate();
    }

    initCubeSphere() {

        const geometry2 = new THREE.BoxGeometry( 1, 1, 1, 1000, 1000, 1000);
        const geometry = new THREE.IcosahedronGeometry( 2, 500);

        const textureLoader = new THREE.TextureLoader();

        const texture = textureLoader.load(map);
        const texture2 = textureLoader.load(map3);
        const displacementMap = textureLoader.load(map2);

        texture.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
        texture.minFilter = THREE.LinearFilter;
        texture2.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
        texture2.minFilter = THREE.LinearFilter;
        displacementMap.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
        displacementMap.minFilter = THREE.LinearFilter;
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
            blending: THREE.NormalBlending,
            uniforms: {
                map: {
                    type: "t",
                    value: texture
                },
                nightMap: {
                    type: "t",
                    value: texture2
                },
                displacementMap: {
                    type: "t",
                    value: displacementMap
                },
                cube: {
                    type: "f",
                    value: 0
                },
                uLight: { value: this.light.position}

            },
            // wireframe: true
        });

        const noiseMap = textureLoader.load("https://i.imgur.com/gPz7iPX.jpg");
        const dudvMap = textureLoader.load("https://i.imgur.com/hOIsXiZ.png");

        noiseMap.wrapS = noiseMap.wrapT = THREE.RepeatWrapping;
        noiseMap.minFilter = THREE.NearestFilter;
        noiseMap.magFilter = THREE.NearestFilter;
        dudvMap.wrapS = dudvMap.wrapT = THREE.RepeatWrapping;

        var waterfallUniforms = {
            time: {
                value: 0
            },
            tNoise: {
                value: null
            },
            tDudv: {
                value: null
            },
            topDarkColor: {
                value: new THREE.Color(0x4e7a71)
            },
            bottomDarkColor: {
                value: new THREE.Color(0x0e7562)
            },
            topLightColor: {
                value: new THREE.Color(0xb0f7e9)
            },
            bottomLightColor: {
                value: new THREE.Color(0x14c6a5)
            },
            foamColor: {
                value: new THREE.Color(0xffffff)
            }
        };



        var waterUniforms = {
            time: {
                value: 0
            },
            threshold: {
                value: 0.1
            },
            tDudv: {
                value: null
            },
            tDepth: {
                value: null
            },
            cameraNear: {
                value: 0
            },
            cameraFar: {
                value: 0
            },
            resolution: {
                value: new THREE.Vector2()
            },
            foamColor: {
                value: new THREE.Color(0xffffff)
            },
            waterColor: {
                value: new THREE.Color(0x14c6a5)
            }
        };
        var dim = Math.pow(2, 7) + 1;
        const atmosphereGeometry = new THREE.SphereGeometry( 2.2, dim, dim);
        const atmosphereShader = new THREE.ShaderMaterial({
            vertexShader: atmosphereVert,
            fragmentShader: atmosphereFrag,
            blending: THREE.AdditiveBlending,
            side: THREE.BackSide,
            transparent: true
        });

        const mesh4 = new THREE.Mesh( atmosphereGeometry, atmosphereShader );


        const waterGeometry = new THREE.SphereGeometry( 2.00975, dim, dim);
        const waterShader = new THREE.ShaderMaterial({
            defines: {
                DEPTH_PACKING: 1,
                ORTHOGRAPHIC_CAMERA: 0
            },
            vertexShader: waterVert,
            fragmentShader: waterFrag,
            uniforms: THREE.UniformsUtils.merge([
                THREE.UniformsLib["fog"],
                waterUniforms,
            ]),
            fog: true
        });

        const mesh = new THREE.Mesh( geometry, material );
        const mesh2 = new THREE.Mesh( geometry2, material.clone() );
        mesh2.material.uniforms.cube.value = 1;

        this.waterMesh = new THREE.Mesh(waterGeometry, this.getCustomMaterial(this.light, map4, waterFrag, 2.00975));

        this.scene?.add( mesh2, this.waterMesh , mesh4);

        const helper = new THREE.DirectionalLightHelper( this.light, 5 );
        this.scene.add( helper );

        this.light.lookAt(mesh.position);

        this.light.position.x = 5 * Math.sin(Math.PI);
        this.light.position.z = 5 * Math.cos(Math.PI);
        this.light.position.y = 0

        this.calcPosFromLatLonRad(49.8153, 6.1296, 2);
        this.calcPosFromLatLonRad(49.8397, 24.0297, 2);

        drawThreeGeo(myJson, 2.0195,'sphere', {color: 0x80FF80}, mesh2, displacementMap);
    }

    calcPosFromLatLonRad(lat, lon, radius) {
        let x, y, z;

        let phi = (90 - lat) * (Math.PI / 180);
        let theta = (lon + 180) * (Math.PI / 180) + Math.PI /2 ;

        x = -(radius * Math.sin(phi) * Math.cos(theta));
        z = radius * Math.sin(phi) * Math.sin(theta);
        y = radius * Math.cos(phi);

        // Crear Esfera
        const geometry2 = new THREE.SphereGeometry(0.02, 64, 64);
        // Crear Material Esfera
        const material2 = new THREE.MeshPhysicalMaterial({
            color: "red"
        });

        const earth2 = new THREE.Mesh(geometry2, material2);
        earth2.position.set(x, y, z);
        this.scene?.add(earth2);
        console.log(x, y, z);
        return [x, y, z];
    }

    getCustomMaterial(light, tex, frag, radius){
        const lightColor = light.color.clone();
        const vertShader = waterVert;
        const fragShader = frag;

        const texture = new THREE.TextureLoader().load( map4 )
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(15,15);
        texture.needsUpdate = true;
        const uniforms = {    // custom uniforms (your textures)

            tex: { type: "t", value: texture },
            time: {type: 'f', value: this.time},

            eye: {type: 'v3', value: this.camera.position },

            vRadius: {type: "f", value: radius},

            lightPosition: {type: 'v3', value: light.position.clone()},
            lightColor: {type: 'v4', value: new THREE.Vector4(lightColor.r, lightColor.g, lightColor.b, 1.0)},
            lightIntensity: {type: 'f', value: light.intensity}

        };
        const meshFaceMaterial = new THREE.ShaderMaterial({

            uniforms: uniforms,
            vertexShader: vertShader,
            fragmentShader: fragShader,
            transparent: true
        });
        return meshFaceMaterial;

    }

    animate(): void {
        if (!this.looped) return;
        // const move = (this.time / 100) % 1;
        // this.depthMaterial && (this.scene.overrideMaterial = this.depthMaterial);
        // if(this.renderTarget) {
        //     this.renderer.setRenderTarget(this.renderTarget);
        //     this.renderer.render(this.scene, this.camera);
        //     this.renderer.setRenderTarget(null);
        // }
        //
        this.light.position.x = 200 * Math.sin(this.time / 500);
        this.light.position.z = 200 * Math.cos(this.time / 500);
        this.light.position.y = 0
        // this.light.lookAt(new THREE.Vector3(0, 1, 0));
        this.scene?.children.forEach((children) => {
            if(children.material && children.material.uniforms?.uLight) {
                // console.log( children.material.uniforms.uLight)
                children.material.uniforms.uLight.value = this.light.position;
                children.rotation.y += .0001;

            }

            if (this.waterMesh && this.waterMesh.material.uniforms.lightPosition) {
                this.waterMesh.rotation.y += .000005;
                // this.waterMesh.rotation.y = (this.time / 500) - Math.PI /4;
            }
        })

        // this.camera.position.set( 5 * Math.sin(this.time / 1000), 0, 5 * Math.cos(this.time / 1000));
        // this.camera.lookAt(new THREE.Vector3());
        if (this.waterMesh) {
            this.waterMesh.material.uniforms.lightPosition.value = this.light.position;
            this.waterMesh.material.uniforms.time.value = this.time / 5000;

        }
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