/**
 * Created by Ellyson on 15/09/2022.
 */
'use client';

import * as THREE from "three";
import { ReactNode } from "react";
import {
  Box,
  LinearProgress,
} from "@mui/material";

import TemplateFor3D from 'components/common/mainTemplate3D';
import vert from "./Shaders/vert.vert";
import waterVert from "./Shaders/water.vert";
import atmosphereVert from "./Shaders/atmosphereVert.vert";
import frag from "./Shaders/frag.frag";
import waterFrag from "./Shaders/water.frag";
import atmosphereFrag from "./Shaders/atmosphereFrag.frag";

// const OrbitControls = require('./components/controls')(THREE);

import dn from "./textures/skybox/space_10dn.png";
import up from "./textures/skybox/space_10up.png";
import lf from "./textures/skybox/space_10lf.png";
import rt from "./textures/skybox/space_10rt.png";
import ft from "./textures/skybox/space_10ft.png";
import bk from "./textures/skybox/space_10bk.png";

import earthMap from "./textures/earth/earthMap.webp";
import displaceMap from "./textures/earth/displaceMap.webp";
import nightEarthMap from "./textures/earth/nightEarthMap.webp";
import map4 from "./textures/earth/waternormals.webp";
import earthCloudMap from "./textures/earth/earthCloudsMap.webp";
import { DirectionalLight } from 'three';

export default class Main extends TemplateFor3D {
  static EarthRadiusKM: number = 6371;

  static EarthCircumferenceKM: number = 6371 * Math.PI * 2;

  private sphere: THREE.Mesh | undefined;

  private depthMaterial: any;

  private renderTarget: THREE.WebGLRenderTarget | undefined;

  private waterMesh: any;

  private loadingManager: THREE.LoadingManager | undefined;

  state: {
    checked: boolean;
    isTabActive: boolean;
    progress: number;
    buffer: number;
  };

  constructor(props: any) {
    super(props);
    this.state = {
      isTabActive: true,
      checked: false,
      progress: 0,
      buffer: 10,
    };
  }

  initControls(): void {
    if (this.camera) {
      this.camera?.position.set(7, 0, 0);
      this.camera.lookAt(new THREE.Vector3(-3, 1, 0));
      super.initControls();
      if (this.controls) {
        this.controls.maxDistance = 70;
        this.controls.minDistance = 3;
      }
    }
  }

  initShader(): void {
    const { progress, buffer } = this.state;

    const onStart = (url: string, loaded: number, total: number) => {
      console.log('onStart', url, loaded, total);
    };

    const onLoad = () => {
      console.log('onLoad');
      this.setState({ progress: 100, buffer: 100 });
    };

    const onProgress = (url: string, loaded: number, total: number) => {
      console.log('onProgress', url, loaded, total);
      this.setState({ progress: progress + 15, buffer: buffer + 15 });
    };

    const onError = (url: string) => {
      console.log('onError', url);
    };

    this.loadingManager = new THREE.LoadingManager(onLoad, onProgress, onError);

    this.loadingManager.onStart = onStart;
  }

  componentDidMount(): void {
    super.componentDidMount();
    this.init3D({ antialias: true }, { fov: 35 });

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
      const imageURLs = [ft.src, bk.src, up.src, dn.src, rt.src, lf.src];
      const textureCube = new THREE.CubeTextureLoader().load(imageURLs);
      textureCube.mapping = THREE.CubeRefractionMapping;
      this.scene.background = textureCube;
    }
  }

  initCubeSphere() {
    if (this.renderer) {
      const geometry = new THREE.BoxGeometry(1, 1, 1, 1000, 1000, 1000);
      const textureLoader = new THREE.TextureLoader(this.loadingManager);

      const texture = textureLoader.load(earthMap.src);
      const texture2 = textureLoader.load(nightEarthMap.src);
      const displacementMap = textureLoader.load(displaceMap.src);

      const cloudsMap = textureLoader.load(earthCloudMap.src);
      cloudsMap.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
      cloudsMap.minFilter = THREE.NearestFilter;
      const geometryCloud = new THREE.IcosahedronGeometry(2.02, 500);
      const matCloud = new THREE.MeshBasicMaterial({
        map: cloudsMap,
        alphaMap: cloudsMap,
        alphaTest: 0.2,
        transparent: true,
        side: THREE.FrontSide,
      });
      const cloudMesh = new THREE.Mesh(geometryCloud, matCloud);

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
            value: texture,
          },
          nightMap: {
            value: texture2,
          },
          displacementMap: {
            value: displacementMap,
          },
          uLight: { value: this.light?.position },
        },
        // wireframe: true
      });

      const noiseMap = textureLoader.load('https://i.imgur.com/gPz7iPX.jpg');
      const dudvMap = textureLoader.load('https://i.imgur.com/hOIsXiZ.png');

      noiseMap.wrapS = noiseMap.wrapT = THREE.RepeatWrapping;
      noiseMap.minFilter = THREE.NearestFilter;
      noiseMap.magFilter = THREE.NearestFilter;
      dudvMap.wrapS = dudvMap.wrapT = THREE.RepeatWrapping;

      const waterUniforms = {
        time: {
          value: 0,
        },
        threshold: {
          value: 0.1,
        },
        tDudv: {
          value: null,
        },
        tDepth: {
          value: null,
        },
        cameraNear: {
          value: 0,
        },
        cameraFar: {
          value: 0,
        },
        resolution: {
          value: new THREE.Vector2(),
        },
        foamColor: {
          value: new THREE.Color(0xffffff),
        },
        waterColor: {
          value: new THREE.Color(0x14c6a5),
        },
      };
      const dim = 2 ** 7 + 1;
      const atmosphereGeometry = new THREE.SphereGeometry(2.5, dim, dim);
      const atmosphereShader = new THREE.ShaderMaterial({
        vertexShader: atmosphereVert,
        fragmentShader: atmosphereFrag,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        transparent: true,
      });

      const mesh4 = new THREE.Mesh(atmosphereGeometry, atmosphereShader);

      const waterGeometry = new THREE.SphereGeometry(2.00975, dim, dim);
      const waterShader = new THREE.ShaderMaterial({
        defines: {
          DEPTH_PACKING: 1,
          ORTHOGRAPHIC_CAMERA: 0,
        },
        vertexShader: waterVert,
        fragmentShader: waterFrag,
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.fog, waterUniforms]),
        fog: true,
      });

      const mesh = new THREE.Mesh(geometry, material);

      this.waterMesh = new THREE.Mesh(
        waterGeometry,
        this.getCustomMaterial(this.light, map4, waterFrag, 2.00975),
      );

      this.scene?.add(mesh, /* this.waterMesh , */ mesh4, cloudMesh);

      if (this.light) {
        const helper = new THREE.DirectionalLightHelper(this.light, 5);
        // this.scene?.add( helper );

        this.light.lookAt(mesh.position);

        this.light.position.x = 5 * Math.sin(Math.PI);
        this.light.position.z = 5 * Math.cos(Math.PI);
        this.light.position.y = 0;
      }

      this.calcPosFromLatLonRad(49.8153, 6.1296, 2, mesh);
      this.calcPosFromLatLonRad(49.8397, 24.0297, 2, mesh);
    }
  }

  calcPosFromLatLonRad(lat: number, lon: number, radius: number, mesh: THREE.Mesh) {
    let x;
    let y;
    let z;

    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180) + Math.PI / 2;

    x = -(radius * Math.sin(phi) * Math.cos(theta));
    z = radius * Math.sin(phi) * Math.sin(theta);
    y = radius * Math.cos(phi);

    // Crear Esfera
    const geometry2 = new THREE.SphereGeometry(0.02, 64, 64);
    // Crear Material Esfera
    const material2 = new THREE.MeshPhysicalMaterial({
      color: 'red',
    });

    const earth2 = new THREE.Mesh(geometry2, material2);
    earth2.position.set(x, y, z);
    mesh.add(earth2);
    console.log(x, y, z);
    return [x, y, z];
  }

  getCustomMaterial(light: DirectionalLight | undefined, tex: {}, frag: string, radius: number) {
    const lightColor = light?.color.clone();
    const vertShader: string = waterVert;
    const fragShader: string = frag;

    const texture = new THREE.TextureLoader().load(map4.src);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(15, 15);
    texture.needsUpdate = true;
    const uniforms: {
      eye: { type: string; value: THREE.Vector3 | undefined };
      lightIntensity: { type: string; value: number | undefined };
      lightPosition: { type: string; value: THREE.Vector3 | undefined };
      tex: { type: string; value: THREE.Texture };
      lightColor: { type: string; value: THREE.Vector4 };
      vRadius: { type: string; value: number };
      time: { type: string; value: number };
    } = {
      // custom uniforms (your textures)

      tex: { type: 't', value: texture },
      time: { type: 'f', value: this.time },

      eye: { type: 'v3', value: this.camera?.position },

      vRadius: { type: 'f', value: radius },

      lightPosition: { type: 'v3', value: light?.position.clone() },
      lightColor: {
        type: 'v4',
        value: new THREE.Vector4(lightColor?.r, lightColor?.g, lightColor?.b, 1.0),
      },
      lightIntensity: { type: 'f', value: light?.intensity },
    };
    const meshFaceMaterial = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: vertShader,
      fragmentShader: fragShader,
      transparent: true,
    });
    return meshFaceMaterial;
  }

  animate(): void {
    if (!this.looped || !this.state.isTabActive) return;
    // const move = (this.time / 100) % 1;
    // this.depthMaterial && (this.scene.overrideMaterial = this.depthMaterial);
    // if(this.renderTarget) {
    //     this.renderer.setRenderTarget(this.renderTarget);
    //     this.renderer.render(this.scene, this.camera);
    //     this.renderer.setRenderTarget(null);
    // }
    //

    if (this.light) {
      this.light.position.x = 200 * Math.sin(this.time / 1500);
      this.light.position.z = 200 * Math.cos(this.time / 1500);
      this.light.position.y = 200 * Math.sin(this.time / 1500);

      // this.camera.position.set(200 * Math.sin(this.time / 500), 0, 200 * Math.cos(this.time / 500))
      // this.camera.lookAt(this.light.position)
    }

    // this.light.lookAt(new THREE.Vector3(0, 1, 0));
    this.scene?.children.forEach((children: any) => {
      if (children.material && children.material.uniforms?.uLight) {
        // console.log( children.material.uniforms.uLight)
        children.material.uniforms.uLight.value = this.light?.position;
      }
      children.rotation.y += 0.0001;
      if (this.waterMesh && this.waterMesh.material.uniforms.lightPosition) {
        // this.waterMesh.rotation.y += .000005;
        // this.waterMesh.rotation.y = (this.time / 500) - Math.PI /4;
      }
    });

    // this.camera.position.set( 5 * Math.sin(this.time / 1000), 0, 5 * Math.cos(this.time / 1000));
    // this.camera.lookAt(new THREE.Vector3());
    if (this.waterMesh && this.light) {
      this.waterMesh.material.uniforms.lightPosition.value = this.light.position;
      this.waterMesh.material.uniforms.time.value = this.time / 5000;
    }
    super.animate();
  }

  render(): ReactNode {
    const { progress, buffer } = this.state;

    return (
      <div>
        <Box
          sx={{ width: '100%' }}
          style={{
            transition: '1s',
            position: 'absolute',
            top: '47px',
            opacity: progress === 100 ? 0 : 1,
          }}
        >
          <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} />
        </Box>

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
