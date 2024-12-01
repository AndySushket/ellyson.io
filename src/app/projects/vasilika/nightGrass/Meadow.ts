import * as THREE from 'three';
import { getAttributeData, getYPosition } from './utils';

import grassDiffTexture from './assets/blade_diffuse.jpg';
import grassAlphaTexture from './assets/blade_alpha.jpg';

import vertexShader from './shaders/grass.vert';
import fragmentShader from './shaders/grass.frag';

class Meadow {

  groundMesh: THREE.Mesh = new THREE.Mesh();

  grassMesh: THREE.Mesh = new THREE.Mesh();

  constructor(config: any, context: any) {
    this.initGround(config);
    this.initGrass(config, context);
  }

  initGround({meadow: {width}} : {meadow: {width: number}}) {
    const groundGeom = new THREE.PlaneGeometry(width, width, 32, 32);
    groundGeom.lookAt(new THREE.Vector3(0, 1, 0));

    const posArray = groundGeom.attributes.position.array;
    for (let i = 0; i < posArray.length; i++) {
      const i3 = i * 3;
      posArray[i3 + 1] = getYPosition(posArray[i3], posArray[i3 + 2]);
    }
    groundGeom.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    this.groundMesh = new THREE.Mesh(
      groundGeom,
      new THREE.MeshStandardMaterial({ color: 0x000f00,wireframe: true }),
    );
  }

  initGrass(
    config: any,
    context: any,
  ) {
    const { meadow: {
      grass: { bladeWidth, bladeHeight, joints, instances },
      width,
    }} = config;
    const attributeData = getAttributeData(instances, width);
    const baseGeom: any = new THREE.PlaneGeometry(bladeWidth, bladeHeight, 1, joints).translate(
      0,
      bladeHeight / 2,
      0,
    );

    const instancedGeometry = new THREE.InstancedBufferGeometry().copy(baseGeom);
    instancedGeometry.instanceCount = instances;
    instancedGeometry.setAttribute(
      'offset',
      new THREE.InstancedBufferAttribute(new Float32Array(attributeData.offsets), 3),
    );
    instancedGeometry.setAttribute(
      'orientation',
      new THREE.InstancedBufferAttribute(new Float32Array(attributeData.orientations), 4),
    );
    instancedGeometry.setAttribute(
      'stretch',
      new THREE.InstancedBufferAttribute(new Float32Array(attributeData.stretches), 1),
    );
    instancedGeometry.setAttribute(
      'halfRootAngleCos',
      new THREE.InstancedBufferAttribute(new Float32Array(attributeData.halfRootAngleCos), 1),
    );
    instancedGeometry.setAttribute(
      'halfRootAngleSin',
      new THREE.InstancedBufferAttribute(new Float32Array(attributeData.halfRootAngleSin), 1),
    );

    this.grassMesh = new THREE.Mesh(
      instancedGeometry,
      this.getGrassMaterial(context.light, context.ambientLight),
    );
  }

  getGrassMaterial(
    directionalLight: THREE.DirectionalLight,
    ambientLight: THREE.AmbientLight,
  ) {
    const loader = new THREE.TextureLoader();
    const map = loader.load(grassDiffTexture.src);
    const alphaMap = loader.load(grassAlphaTexture.src);

    return new THREE.ShaderMaterial({
      uniforms: {
        bladeHeight: { value: 1 },
        map: { value: map },
        alphaMap: { value: alphaMap },
        time: { value: 0 },
        tipColor: { value: new THREE.Color(0.0, 0.6, 0.0).convertSRGBToLinear() },
        bottomColor: { value: new THREE.Color(0.0, 0.1, 0.0).convertSRGBToLinear() },
        ...THREE.UniformsLib.lights,
        uLightIntensity: { value: directionalLight.intensity },
        ambientLightColor: { value: ambientLight.color.clone().convertSRGBToLinear() },
      },
      vertexShader,
      fragmentShader,
      side: THREE.DoubleSide,
      lights: true,
    });
  }



  updateGrass(delta: number) {
    if (!this.grassMesh) return;
    const material = this.grassMesh.material as THREE.ShaderMaterial;
    material.uniforms.time.value = delta;
  }
}

export default Meadow;
