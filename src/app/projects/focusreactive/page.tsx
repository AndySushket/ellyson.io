'use client';

// import React from 'react';

import * as THREE from 'three';
import TemplateFor3D from 'components/common/mainTemplate3D';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

import './style.scss';

const engine = require('./engine.glb');

// THREE.Mesh.prototype.raycast = acceleratedRaycast;

export default class NightGrass extends TemplateFor3D {
  private gui: any | undefined;

  private cameraTarget: THREE.Vector3 = new THREE.Vector3(-52, -2, 97);
  private targetHelper: THREE.Mesh | null = null;
  private cameraLine: THREE.Line | null = null;
  private engine: THREE.Mesh | undefined;

  private metallicMaterial: THREE.ShaderMaterial | null = null;

  private mesh: THREE.Mesh | null = null;

  private customUniforms = {
    uTime: { value: 0.0 },
    uBaseColor: { value: new THREE.Color(0xc9c9c9) },
    uMetalness: { value: 1 },
    uRoughness: { value: 0.67 },
    uEffectIntensity: { value: 1.93 },
    uGlowColor1: { value: new THREE.Color(0xcd4e4e) }, // Primary accent
    uGlowColor2: { value: new THREE.Color(0x630000) }, // Secondary accent
  };

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
    lightFolder.add(this.light!, 'intensity', 0, 2, 0.01).name('Intensity').onChange((value: number) => {
      if (this.metallicMaterial) {
        this.metallicMaterial.uniforms.uLightIntensity.value = value;
      }
    });
    lightFolder.add(this.light!.position, 'x', -1000, 1000, 1).name('Position X').onChange((value: number) => {;
      if (this.metallicMaterial) {
        this.metallicMaterial.uniforms.uLightPosition.value.x = value;
      }
    });
    lightFolder.add(this.light!.position, 'y', -1000, 1000, 1).name('Position Y').onChange((value: number) => {;
      if (this.metallicMaterial) {
        this.metallicMaterial.uniforms.uLightPosition.value.y = value;
      }
    });
    lightFolder.add(this.light!.position, 'z', -1000, 1000, 1).name('Position Z').onChange((value: number) => {;
      if (this.metallicMaterial) {
        this.metallicMaterial.uniforms.uLightPosition.value.z = value;
      }
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
    const pmremGenerator = new THREE.PMREMGenerator(this.renderer!);
    pmremGenerator.compileEquirectangularShader();

    // Create a simple gradient environment
    const envScene = new THREE.Scene();
    envScene.background = new THREE.Color(0x111111);
    const envMap = pmremGenerator.fromScene(envScene).texture;
    this.scene!.environment = envMap;

    gltfLoader.load(engine, (gltf) => {
      gltf.scene.scale.set(10, 10, 10);
      gltf.scene.position.set(0, 0, 0);
      gltf.scene.rotation.set(0, 0, -Math.PI / 2);

      this.engine = gltf.scene;
      console.log(gltf);

      // Create clean ShaderMaterial with normals and scene lights
      this.metallicMaterial = new THREE.ShaderMaterial({
        uniforms: {
          uTime: this.customUniforms.uTime,
          uBaseColor: this.customUniforms.uBaseColor,
          uMetalness: this.customUniforms.uMetalness,
          uRoughness: this.customUniforms.uRoughness,
          uEffectIntensity: this.customUniforms.uEffectIntensity,
          uGlowColor1: this.customUniforms.uGlowColor1,
          uGlowColor2: this.customUniforms.uGlowColor2,
          uLightPosition: { value: this.light ? this.light.position : new THREE.Vector3(100, 100, 100) },
          uLightColor: { value: this.light ? this.light.color : new THREE.Color(0xffffff) },
          uLightIntensity: { value: this.light ? this.light.intensity : 1.0 },
          uAmbientColor: { value: this.ambientLight ? this.ambientLight.color : new THREE.Color(0xffffff) },
          uAmbientIntensity: { value: this.ambientLight ? this.ambientLight.intensity : 0.2 },
        },
        side: THREE.DoubleSide,
        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vWorldPosition;
          varying vec3 vViewDirection;
          
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vec4 worldPos = modelMatrix * vec4(position, 1.0);
            vWorldPosition = worldPos.xyz;
            vViewDirection = normalize(cameraPosition - worldPos.xyz);
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float uTime;
          uniform vec3 uBaseColor;
          uniform float uMetalness;
          uniform float uRoughness;
          uniform float uEffectIntensity;
          uniform vec3 uGlowColor1;
          uniform vec3 uGlowColor2;
          uniform vec3 uLightPosition;
          uniform vec3 uLightColor;
          uniform float uLightIntensity;
          uniform vec3 uAmbientColor;
          uniform float uAmbientIntensity;
          
          varying vec3 vNormal;
          varying vec3 vWorldPosition;
          varying vec3 vViewDirection;
          
          void main() {
            vec3 viewDir = normalize(vViewDirection);
            
            // Flip normal for back faces
            vec3 normal = normalize(vNormal);
            if (!gl_FrontFacing) {
              normal = -normal;
            }
            
            // Directional light calculation
            vec3 lightDir = normalize(uLightPosition - vWorldPosition);
            float NdotL = max(dot(normal, lightDir), 0.0);
            
            // Specular (Blinn-Phong)
            vec3 halfDir = normalize(lightDir + viewDir);
            float NdotH = max(dot(normal, halfDir), 0.0);
            float shininess = mix(8.0, 128.0, 1.0 - uRoughness);
            float specular = pow(NdotH, shininess) * uMetalness;
            
            // Ambient
            vec3 ambient = uAmbientColor * uAmbientIntensity * uBaseColor;
            
            // Diffuse
            vec3 diffuse = uLightColor * uLightIntensity * NdotL * uBaseColor * (1.0 - uMetalness * 0.5);
            
            // Specular color (metallic surfaces tint specular with base color)
            vec3 specularColor = mix(vec3(1.0), uBaseColor, uMetalness) * specular * uLightIntensity;
            
            // Fresnel for edge glow
            float fresnel = 1.0 - max(dot(normal, viewDir), 0.0);
            fresnel = pow(fresnel, 2.0);
            
            // Time-based pulse
            float pulse = sin(uTime * 2.0) * 0.5 + 0.5;
            vec3 glowColor = mix(uGlowColor1, uGlowColor2, pulse);
            vec3 glow = glowColor * fresnel * uEffectIntensity;
            
            // Final color
            vec3 finalColor = ambient + diffuse + specularColor;// + glow;
            
            gl_FragColor = vec4(finalColor, 1.0);
          }
        `,
      });

      // Apply material to all meshes and disable shadows
      gltf.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          console.log('Found mesh:', child.name);
          this.mesh = child;

          // Disable shadows
          child.castShadow = false;
          child.receiveShadow = false;

          // Replace material with clean ShaderMaterial
          child.material = this.metallicMaterial!;
        }
      });

      this.scene?.add(gltf.scene);

      // Add GUI controls for the shader
      // this.addShaderGUI();
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
      baseColor: this.customUniforms.uBaseColor.value.getStyle(),
      metalness: this.customUniforms.uMetalness.value,
      roughness: this.customUniforms.uRoughness.value,
      effectIntensity: this.customUniforms.uEffectIntensity.value,
      glowColor1: this.customUniforms.uGlowColor1.value.getStyle(),
      glowColor2: this.customUniforms.uGlowColor2.value.getStyle(),
    };

    shaderFolder
      .addColor(params, 'baseColor')
      .name('Base Color')
      .onChange((value: string) => {
        this.customUniforms.uBaseColor.value.set(value);
      });

    shaderFolder
      .add(params, 'metalness', 0, 1, 0.01)
      .name('Metalness')
      .onChange((value: number) => {
        this.customUniforms.uMetalness.value = value;
      });

    shaderFolder
      .add(params, 'roughness', 0, 1, 0.01)
      .name('Roughness')
      .onChange((value: number) => {
        this.customUniforms.uRoughness.value = value;
      });

    shaderFolder
      .add(params, 'effectIntensity', 0, 3, 0.01)
      .name('Effect Intensity')
      .onChange((value: number) => {
        this.customUniforms.uEffectIntensity.value = value;
      });

    shaderFolder
      .addColor(params, 'glowColor1')
      .name('Glow Color 1')
      .onChange((value: string) => {
        this.customUniforms.uGlowColor1.value.set(value);
      });

    shaderFolder
      .addColor(params, 'glowColor2')
      .name('Glow Color 2')
      .onChange((value: string) => {
        this.customUniforms.uGlowColor2.value.set(value);
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
      { antialias: true, alpha: true, logarithmicDepthBuffer: true },
      {
        fov: 30,
        near: 1,
        far: 10000,
      },
    );

    if (!this.renderer || !this.scene || !this.camera) return;

    this.initProject();
    this.initLight();
    this.attachMouseMoveEvent(this.canvasDiv);
    this.animate();
  }

  animate() {
    if (!this.looped) return;
    if (!this.renderer || !this.scene || !this.camera) return;

    this.time += 1;

    // Update custom uniforms time for the glow effect
    this.customUniforms.uTime.value = this.time * 0.01;

    this.camera.lookAt(this.cameraTarget);

    // Update shader uniforms
    if (this.metallicMaterial) {
      this.metallicMaterial.uniforms.uTime.value = this.time * 0.01;

      // Sync light position if light exists
      if (this.light) {
        this.metallicMaterial.uniforms.uLightPosition.value.copy(this.light.position);
        this.metallicMaterial.uniforms.uLightColor.value.copy(this.light.color);
        this.metallicMaterial.uniforms.uLightIntensity.value = this.light.intensity;
      }

      // Sync ambient light if it exists
      if (this.ambientLight) {
        this.metallicMaterial.uniforms.uAmbientColor.value.copy(this.ambientLight.color);
        this.metallicMaterial.uniforms.uAmbientIntensity.value = this.ambientLight.intensity;
      }
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
