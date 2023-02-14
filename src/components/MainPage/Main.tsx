/**
 * Created by Ellyson on 15/09/2022.
 */

import TemplateFor3D from '../templates/mainTemplate3D';
import * as THREE from 'three';
import {ReactNode} from "react";
// @ts-ignore
import vert from "./Shaders/vert.vert"
// @ts-ignore
import waterVert from "./Shaders/water.vert"
// @ts-ignore
import atmosphereVert from "./Shaders/atmosphereVert.vert"
// @ts-ignore
import frag from './Shaders/frag.frag';
// @ts-ignore
import waterFrag from './Shaders/water.frag';
// @ts-ignore
import atmosphereFrag from './Shaders/atmosphereFrag.frag';
// const OrbitControls = require('./components/controls')(THREE);
const dn = require('./textures/skybox/space_10dn.png');
const up = require('./textures/skybox/space_10up.png');
const lf = require('./textures/skybox/space_10lf.png');
const rt = require('./textures/skybox/space_10rt.png');
const ft = require('./textures/skybox/space_10ft.png');
const bk = require('./textures/skybox/space_10bk.png');

const earthMap = require('./textures/earth/earthMap.png');
const displaceMap = require('./textures/earth/displaceMap.png');
const nightEarthMap = require('./textures/earth/nightEarthMap.png');
const map4 = require('./textures/earth/waternormals.png');
const earthCloudMap = require('./textures/earth/earthCloudsMap.jpg');

export default class Main extends TemplateFor3D {
    static EarthRadiusKM: number = 6371;
    static EarthCircumferenceKM: number = 6371 * Math.PI * 2;

    private sphere: THREE.Mesh | undefined;
    private depthMaterial: any;
    private renderTarget: THREE.WebGLRenderTarget | undefined;
    private waterMesh: any;

    initControls(): void {
        if(this.camera) {
            this.camera?.position.set(7, 0, 0);
            this.camera.lookAt(new THREE.Vector3(-3, 1, 0))
            super.initControls();
        }
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
        this.initSkyBox();

        this.animate();
    }

    initSkyBox() {
        if (this.scene) {
            const imageURLs = [ ft, bk, up, dn, rt, lf ];
            const textureCube = new THREE.CubeTextureLoader().load(imageURLs);
            textureCube.mapping = THREE.CubeRefractionMapping;
            this.scene.background = textureCube;
        }
    }

    initCubeSphere() {
        if(this.renderer) {
            const geometry = new THREE.BoxGeometry( 1, 1, 1, 1000, 1000, 1000);
            const textureLoader = new THREE.TextureLoader();



            const texture = textureLoader.load(earthMap);
            const texture2 = textureLoader.load(nightEarthMap);
            const displacementMap = textureLoader.load(displaceMap);

            const cloudsMap = textureLoader.load(earthCloudMap);
            cloudsMap.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
            cloudsMap.minFilter = THREE.NearestFilter;
            const geometryCloud = new THREE.IcosahedronGeometry( 2.02, 500);
            const matCloud = new THREE.MeshBasicMaterial({map: cloudsMap, alphaMap: cloudsMap, alphaTest:.2, transparent:true, side: THREE.FrontSide})
            const cloudMesh = new THREE.Mesh(geometryCloud,matCloud)

            texture.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
            texture.minFilter = THREE.NearestFilter;

            texture2.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
            texture2.minFilter = THREE.NearestFilter;

            displacementMap.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
            displacementMap.minFilter = THREE.NearestFilter;

            const material: THREE.ShaderMaterial = new THREE.ShaderMaterial({
                vertexShader: vert,
                fragmentShader: frag,
                blending: THREE.NormalBlending,
                uniforms: {
                    map: {
                        value: texture
                    },
                    nightMap: {
                        value: texture2
                    },
                    displacementMap: {
                        value: displacementMap
                    },
                    uLight: { value: this.light?.position}
                },
                // wireframe: true
            });

            const noiseMap = textureLoader.load("https://i.imgur.com/gPz7iPX.jpg");
            const dudvMap = textureLoader.load("https://i.imgur.com/hOIsXiZ.png");

            noiseMap.wrapS = noiseMap.wrapT = THREE.RepeatWrapping;
            noiseMap.minFilter = THREE.NearestFilter;
            noiseMap.magFilter = THREE.NearestFilter;
            dudvMap.wrapS = dudvMap.wrapT = THREE.RepeatWrapping;

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
            const atmosphereGeometry = new THREE.SphereGeometry( 2.5, dim, dim);
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

            this.waterMesh = new THREE.Mesh(waterGeometry, this.getCustomMaterial(this.light, map4, waterFrag, 2.00975));

            this.scene?.add( mesh, /*this.waterMesh ,*/ mesh4, cloudMesh);

            if (this.light) {

                const helper = new THREE.DirectionalLightHelper( this.light, 5 );
                // this.scene?.add( helper );

                this.light.lookAt(mesh.position);

                this.light.position.x = 5 * Math.sin(Math.PI);
                this.light.position.z = 5 * Math.cos(Math.PI);
                this.light.position.y = 0
            }

            this.calcPosFromLatLonRad(49.8153, 6.1296, 2);
            this.calcPosFromLatLonRad(49.8397, 24.0297, 2);
        }
    }

    calcPosFromLatLonRad(lat: number, lon: number, radius: number) {
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

    getCustomMaterial(light: THREE.DirectionalLight | undefined, tex: THREE.Texture, frag: string, radius: number){
        const lightColor = light?.color.clone();
        const vertShader = waterVert;
        const fragShader = frag;

        const texture = new THREE.TextureLoader().load( map4 )
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(15,15);
        texture.needsUpdate = true;
        const uniforms = {    // custom uniforms (your textures)

            tex: { type: "t", value: texture },
            time: {type: 'f', value: this.time},

            eye: {type: 'v3', value: this.camera?.position },

            vRadius: {type: "f", value: radius},

            lightPosition: {type: 'v3', value: light?.position.clone()},
            lightColor: {type: 'v4', value: new THREE.Vector4(lightColor?.r, lightColor?.g, lightColor?.b, 1.0)},
            lightIntensity: {type: 'f', value: light?.intensity}

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

        if (this.light) {
            this.light.position.x = 200 * Math.sin(this.time / 500);
            this.light.position.z = 200 * Math.cos(this.time / 500);
            this.light.position.y = 0;

            // this.camera.position.set(200 * Math.sin(this.time / 500), 0, 200 * Math.cos(this.time / 500))
            // this.camera.lookAt(this.waterMesh)
        }

        // this.light.lookAt(new THREE.Vector3(0, 1, 0));
        this.scene?.children.forEach((children: any) => {
            if(children.material && children.material.uniforms?.uLight) {
                // console.log( children.material.uniforms.uLight)
                children.material.uniforms.uLight.value = this.light?.position;


            }
            children.rotation.y += .0001;
            if (this.waterMesh && this.waterMesh.material.uniforms.lightPosition) {
                // this.waterMesh.rotation.y += .000005;
                // this.waterMesh.rotation.y = (this.time / 500) - Math.PI /4;
            }
        })

        // this.camera.position.set( 5 * Math.sin(this.time / 1000), 0, 5 * Math.cos(this.time / 1000));
        // this.camera.lookAt(new THREE.Vector3());
        if (this.waterMesh && this.light) {
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