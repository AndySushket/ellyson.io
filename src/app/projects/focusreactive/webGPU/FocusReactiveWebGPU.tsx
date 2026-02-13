'use client';

// import React from 'react';

import * as THREE from 'three/webgpu';
import { NodeMaterial } from 'three/webgpu';

// Disable color management BEFORE any colors are created
// This matches WebGL ShaderMaterial behavior where colors are passed as raw values
THREE.ColorManagement.enabled = false;

import {
  uniform,
  float,
  vec3,
  vec4,
  normalView,
  positionWorld,
  cameraPosition,
  normalize,
  max,
  dot,
  pow,
  mix,
  sin,
  faceDirection,
} from 'three/tsl';
import TemplateFor3D from 'components/common/mainTemplate3D';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

import './style.scss';

const engine = require('./engine.glb');

// THREE.Mesh.prototype.raycast = acceleratedRaycast;

export default class FocusReactive extends TemplateFor3D {
  private gui: any | undefined;

  private cameraTarget: THREE.Vector3 = new THREE.Vector3(-52, -2, 97);
  private targetHelper: THREE.Mesh | null = null;
  private cameraLine: THREE.Line | null = null;
  private engine: THREE.Group | undefined;

  private metallicMaterial: NodeMaterial | null = null;

  private mesh: THREE.Mesh | null = null;

  // TSL uniforms (matching WebGL customUniforms)
  // With ColorManagement disabled, colors are passed as raw values like in WebGL ShaderMaterial
  private uTime = uniform(0);

  private uBaseColor = uniform(new THREE.Color(0x595959));

  private uMetalness = uniform(1.0);

  private uRoughness = uniform(1.0);

  private uEffectIntensity = uniform(0.0);

  private uGlowColor1 = uniform(new THREE.Color(0xcd4e4e));

  private uGlowColor2 = uniform(new THREE.Color(0x630000));

  private uLightPosition = uniform(new THREE.Vector3(90, 24, 15));

  private uLightColor = uniform(new THREE.Color(0xffffff));

  private uLightIntensity = uniform(0.9);

  private uAmbientColor = uniform(new THREE.Color(0xffffff));

  private uAmbientIntensity = uniform(0.15);

  constructor(props: any) {
    super(props);
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    if (this.gui) {
      this.gui.destroy();
    }
  }

  guiCamera() {
    // // Create a visual helper for the camera target
    // const helperGeometry = new THREE.SphereGeometry(10, 16, 16);
    // const helperMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
    // this.targetHelper = new THREE.Mesh(helperGeometry, helperMaterial);
    // this.targetHelper.position.copy(this.cameraTarget);
    // this.scene?.add(this.targetHelper);
    //
    // // Create line from camera to target
    // const lineGeometry = new THREE.BufferGeometry().setFromPoints([
    //   this.camera!.position.clone(),
    //   this.cameraTarget.clone()
    // ]);
    // const lineMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 });
    // this.cameraLine = new THREE.Line(lineGeometry, lineMaterial);
    // this.scene?.add(this.cameraLine);
    //
    // const cameraFolder = this.gui.addFolder('Camera Position');
    // cameraFolder.add(this.camera!.position, 'x', -1500, 1500, 1).name('X');
    // cameraFolder.add(this.camera!.position, 'y', -1500, 1500, 1).name('Y');
    // cameraFolder.add(this.camera!.position, 'z', -1500, 1500, 1).name('Z');
    //
    //
    // const targetFolder = this.gui.addFolder('Camera Target');
    // targetFolder.add(this.cameraTarget, 'x', -1500, 1500, 1).name('X').onChange((value: number) => {
    //   if (this.targetHelper) this.targetHelper.position.x = value;
    // });
    // targetFolder.add(this.cameraTarget, 'y', -1500, 1500, 1).name('Y').onChange((value: number) => {
    //   if (this.targetHelper) this.targetHelper.position.y = value;
    // });
    // targetFolder.add(this.cameraTarget, 'z', -1500, 1500, 1).name('Z').onChange((value: number) => {
    //   if (this.targetHelper) this.targetHelper.position.z = value;
    // });
    //
    //
    // const fovController = this.gui.add(this.camera!, 'fov', 1, 180, 1).name('FOV');
    // fovController.onChange(() => {
    //   this.camera!.updateProjectionMatrix();
    // });
    //
    // const panCameraFolder = this.gui.addFolder('Pan Camera');
    // const panCameraParams = {
    //   panLeftX: () => {
    //     this.camera!.position.x -= 10;
    //     this.cameraTarget.x -= 10;
    //
    //     this.camera!.lookAt(this.cameraTarget);
    //
    //   },
    //   panRightX: () => {
    //     this.camera!.position.x += 10;
    //     this.cameraTarget.x += 10;
    //
    //     this.camera!.lookAt(this.cameraTarget);
    //     // this.gui.updateDisplay();
    //   },
    //   panUpY: () => {
    //     this.camera!.position.y += 10;
    //     this.cameraTarget.y += 10;
    //
    //     this.camera!.lookAt(this.cameraTarget);
    //   },
    //   panDownY: () => {
    //     this.camera!.position.y -= 10;
    //     this.cameraTarget.y -= 10;
    //
    //     this.camera!.lookAt(this.cameraTarget);
    //   },
    //   panForwardZ: () => {
    //     this.camera!.position.z -= 10;
    //     this.cameraTarget.z -= 10;
    //
    //     this.camera!.lookAt(this.cameraTarget);
    //   },
    //   panBackwardZ: () => {
    //     this.camera!.position.z += 10;
    //     this.cameraTarget.z += 10;
    //
    //     this.camera!.lookAt(this.cameraTarget);
    //   }}
    // panCameraFolder.add(panCameraParams, 'panLeftX').name('Pan Left');
    // panCameraFolder.add(panCameraParams, 'panRightX').name('Pan Right');
    // panCameraFolder.add(panCameraParams, 'panUpY').name('Pan Up');
    // panCameraFolder.add(panCameraParams, 'panDownY').name('Pan Down');
    // panCameraFolder.add(panCameraParams, 'panForwardZ').name('Pan Forward');
    // panCameraFolder.add(panCameraParams, 'panBackwardZ').name('Pan Backward');
    //
    //
    //
    // // Option to show/hide target helper
    // this.gui.add({ showHelper: true }, 'showHelper').name('Show Target').onChange((value: boolean) => {
    //   if (this.targetHelper) this.targetHelper.visible = value;
    //   if (this.cameraLine) this.cameraLine.visible = value;
    // });
    //
    //light changes
    const lightFolder = this.gui.addFolder('Directional Light');
    lightFolder
      .add(this.light!, 'intensity', 0, 2, 0.01)
      .name('Intensity')
      .onChange((value: number) => {
        this.uLightIntensity.value = value;
      });
    lightFolder
      .add(this.light!.position, 'x', -1000, 1000, 1)
      .name('Position X')
      .onChange((value: number) => {
        this.uLightPosition.value.x = value;
      });
    lightFolder
      .add(this.light!.position, 'y', -1000, 1000, 1)
      .name('Position Y')
      .onChange((value: number) => {
        this.uLightPosition.value.y = value;
      });
    lightFolder
      .add(this.light!.position, 'z', -1000, 1000, 1)
      .name('Position Z')
      .onChange((value: number) => {
        this.uLightPosition.value.z = value;
      });
    lightFolder.add(this.light!.target.position, 'x', -1000, 1000, 1).name('Target X');
    lightFolder.add(this.light!.target.position, 'y', -1000, 1000, 1).name('Target Y');
    lightFolder.add(this.light!.target.position, 'z', -1000, 1000, 1).name('Target Z');
    lightFolder.open();
  }

  initLight(): void {
    this.light = new THREE.DirectionalLight(0xffffff, 0.9);
    this.light.position.set(90, 24, 15);
    this.light.castShadow = false;
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.15);
    this.scene?.add(this.light, this.ambientLight);
  }

  async setCameraConfig() {
    // this.camera?.rotation.set(0, 0, 0);
    this.camera?.position.set(330, -71, -112);
    this.camera?.lookAt(this.cameraTarget);
    this.camera?.updateProjectionMatrix();

    // Add axes helper to visualize world coordinates
    const axesHelper = new THREE.AxesHelper(500);
    this.scene?.add(axesHelper);

    this.guiCamera();
  }

  async loadEngineModel() {
    const gltfLoader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
    gltfLoader.setDRACOLoader(dracoLoader);

    // Create a simple environment map for metallic reflections
    // const pmremGenerator = new THREE.PMREMGenerator(this.renderer!);
    //
    // // Create a simple gradient environment
    // const envScene = new THREE.Scene();
    // envScene.background = new THREE.Color(0x111111);
    // // In WebGPU, fromScene returns a Promise
    // const envMapRenderTarget = await pmremGenerator.fromScene(envScene);
    // this.scene!.environment = envMapRenderTarget.texture;
    // pmremGenerator.dispose();

    gltfLoader.load(engine, (gltf) => {
      gltf.scene.scale.set(10, 10, 10);
      gltf.scene.position.set(0, 0, 0);
      gltf.scene.rotation.set(0, 0, -Math.PI / 2);

      this.engine = gltf.scene;
      console.log(gltf);

      // Create TSL-based NodeMaterial for WebGPU
      // Using NodeMaterial with fragmentNode - this is the direct equivalent of ShaderMaterial's gl_FragColor
      this.metallicMaterial = new NodeMaterial();
      this.metallicMaterial.side = THREE.DoubleSide;

      // CRITICAL: WebGL shader uses normalMatrix which transforms to VIEW space
      // But then uses world-space light directions. We must replicate this EXACT behavior.
      //
      // WebGL vertex shader:
      //   vNormal = normalize(normalMatrix * normal);  // VIEW space
      //   vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;  // WORLD space
      //   vViewDirection = normalize(cameraPosition - worldPos.xyz);  // WORLD space
      //
      // WebGL fragment shader:
      //   vec3 lightDir = normalize(uLightPosition - vWorldPosition);  // WORLD space
      //   float NdotL = max(dot(normal, lightDir), 0.0);  // VIEW dot WORLD (mixed!)

      // normalView in TSL is already: normalize(normalMatrix * normal) - VIEW space
      // Flip for back faces (matches: if (!gl_FrontFacing) normal = -normal;)
      const normal = normalView.mul(faceDirection);

      // View direction in WORLD space (matches vViewDirection)
      const viewDir = normalize(cameraPosition.sub(positionWorld));

      // Light direction in WORLD space (matches lightDir)
      const lightDir = normalize(this.uLightPosition.sub(positionWorld));

      // NdotL: This mixes VIEW-space normal with WORLD-space lightDir
      // This is technically wrong but it's what the WebGL shader does!
      const NdotL = max(dot(normal, lightDir), float(0.0));

      // Ambient: uAmbientColor * uAmbientIntensity * uBaseColor
      const ambient = this.uAmbientColor.mul(this.uAmbientIntensity).mul(this.uBaseColor);

      // Diffuse: uLightColor * uLightIntensity * NdotL * uBaseColor * (1.0 - uMetalness * 0.5)
      const diffuse = this.uLightColor
        .mul(this.uLightIntensity)
        .mul(NdotL)
        .mul(this.uBaseColor)
        .mul(float(1.0).sub(this.uMetalness.mul(0.5)));

      // Specular (Blinn-Phong)
      // halfDir = normalize(lightDir + viewDir) - both in WORLD space
      const halfDir = normalize(lightDir.add(viewDir));
      // NdotH: VIEW-space normal dot WORLD-space halfDir (mixed, same as WebGL)
      const NdotH = max(dot(normal, halfDir), float(0.0));

      // shininess = mix(8.0, 128.0, 1.0 - uRoughness)
      const shininess = float(8.0).add(float(120.0).mul(float(1.0).sub(this.uRoughness)));

      // specular = pow(NdotH, shininess) * uMetalness
      const specular = pow(NdotH, shininess).mul(this.uMetalness);

      // specularColor = mix(vec3(1.0), uBaseColor, uMetalness) * specular * uLightIntensity
      const specularColor = mix(vec3(1.0, 1.0, 1.0), this.uBaseColor, this.uMetalness)
        .mul(specular)
        .mul(this.uLightIntensity);

      // Fresnel: VIEW-space normal dot WORLD-space viewDir (mixed, same as WebGL)
      const fresnel = float(1.0).sub(max(dot(normal, viewDir), float(0.0)));
      const fresnelPow = pow(fresnel, float(2.0));

      // Time-based pulse
      const pulse = sin(this.uTime.mul(2.0)).mul(0.5).add(0.5);
      const glowColor = mix(this.uGlowColor1, this.uGlowColor2, pulse);
      const glow = glowColor.mul(fresnelPow).mul(this.uEffectIntensity);

      // Final color = ambient + diffuse + specularColor (+ glow commented out to match WebGL)
      const finalColor = ambient.add(diffuse).add(specularColor).add(glow);

      // fragmentNode is the direct equivalent of gl_FragColor = vec4(finalColor, 1.0);
      this.metallicMaterial.fragmentNode = vec4(finalColor, 1.0);

      // Apply material to all meshes and disable shadows
      gltf.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          console.log('Found mesh:', child.name);
          this.mesh = child;

          // Disable shadows
          child.castShadow = false;
          child.receiveShadow = false;

          // Replace material with TSL NodeMaterial
          child.material = this.metallicMaterial!;
        }
      });

      this.scene?.add(gltf.scene);

      // Add shader GUI controls after model is loaded
      this.addShaderGUI();
    });
  }

  async initProject() {
    if (!this.renderer || !this.scene || !this.camera) return;
    await this.setCameraConfig();
    await this.loadEngineModel();
  }

  addShaderGUI() {
    if (!this.mesh) return;

    const shaderFolder = this.gui!.addFolder('Metallic Shader');

    const params = {
      baseColor: '#c9c9c9',
      metalness: this.uMetalness.value,
      roughness: this.uRoughness.value,
      effectIntensity: this.uEffectIntensity.value,
      glowColor1: '#cd4e4e',
      glowColor2: '#630000',
    };

    shaderFolder
      .addColor(params, 'baseColor')
      .name('Base Color')
      .onChange((value: string) => {
        this.uBaseColor.value.set(value);
      });

    shaderFolder
      .add(params, 'metalness', 0, 1, 0.01)
      .name('Metalness')
      .onChange((value: number) => {
        this.uMetalness.value = value;
      });

    shaderFolder
      .add(params, 'roughness', 0, 1, 0.01)
      .name('Roughness')
      .onChange((value: number) => {
        this.uRoughness.value = value;
      });

    shaderFolder
      .add(params, 'effectIntensity', 0, 3, 0.01)
      .name('Effect Intensity')
      .onChange((value: number) => {
        this.uEffectIntensity.value = value;
      });

    shaderFolder
      .addColor(params, 'glowColor1')
      .name('Glow Color 1')
      .onChange((value: string) => {
        this.uGlowColor1.value.set(value);
      });

    shaderFolder
      .addColor(params, 'glowColor2')
      .name('Glow Color 2')
      .onChange((value: string) => {
        this.uGlowColor2.value.set(value);
      });

    shaderFolder.open();
  }

  async componentDidMount() {
    await super.componentDidMount();

    // Dynamically load dat.gui only in the browser and await the module before creating GUI
    if (typeof window !== 'undefined') {
      const module = await import('dat.gui');
      this.gui = new module.GUI({ width: 310 });
    }

    this.init3D(
      { antialias: true, alpha: true },
      {
        fov: 30,
        near: 1,
        far: 10000,
      },
      undefined,
      undefined,
      true, // isWebGPU
    );

    if (!this.renderer || !this.scene || !this.camera) return;

    // Wait for the WebGPU renderer to initialize before proceeding
    if ('init' in this.renderer && typeof this.renderer.init === 'function') {
      await this.renderer.init();
    }

    // Match WebGL renderer settings
    this.renderer.toneMapping = THREE.NoToneMapping;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    await this.initProject();
    this.initLight();

    // Initialize uniforms after light is created (matching WebGL behavior)
    if (this.light) {
      this.uLightPosition.value.set(
        this.light.position.x,
        this.light.position.y,
        this.light.position.z,
      );
      this.uLightColor.value.copy(this.light.color);
      this.uLightIntensity.value = this.light.intensity;
    }
    if (this.ambientLight) {
      this.uAmbientColor.value.copy(this.ambientLight.color);
      this.uAmbientIntensity.value = this.ambientLight.intensity;
    }

    this.attachMouseMoveEvent(this.canvasDiv);
    this.animate();
  }

  animate() {
    if (!this.looped) return;
    if (!this.renderer || !this.scene || !this.camera) return;

    this.time += 1;
    this.uTime.value = this.time * 0.01; // Update time uniform for glow pulse

    this.camera.lookAt(this.cameraTarget);

    // Update light uniforms if light exists
    if (this.light) {
      this.uLightPosition.value.set(
        this.light.position.x,
        this.light.position.y,
        this.light.position.z,
      );
      this.uLightColor.value.copy(this.light.color);
      this.uLightIntensity.value = this.light.intensity;
    }

    // Update ambient light uniforms if ambient light exists
    if (this.ambientLight) {
      this.uAmbientColor.value.copy(this.ambientLight.color);
      this.uAmbientIntensity.value = this.ambientLight.intensity;
    }

    // Update camera-to-target line
    // if (this.cameraLine) {
    //   const positions = this.cameraLine.geometry.attributes.position;
    //   positions.setXYZ(0, this.camera.position.x, this.camera.position.y, this.camera.position.z);
    //   positions.setXYZ(1, this.cameraTarget.x, this.cameraTarget.y, this.cameraTarget.z);
    //   positions.needsUpdate = true;
    // }

    if (this.engine) {
      this.engine.rotation.x += 0.001;
    }

    this.gui?.updateDisplay();

    this.renderer.render(this.scene, this.camera);
    // this.controls?.update();

    requestAnimationFrame(() => this.animate());
  }

  render() {
    return (
      <div>
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
