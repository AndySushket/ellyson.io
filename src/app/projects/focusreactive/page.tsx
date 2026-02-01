'use client';

// import React from 'react';

import * as THREE from 'three';
import TemplateFor3D from 'components/common/mainTemplate3D';

import engine from './engine.glb'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

import { GUI } from 'dat.gui';

import './style.scss';

// THREE.Mesh.prototype.raycast = acceleratedRaycast;

export default class NightGrass extends TemplateFor3D {
  private gui: GUI | any;

  private cameraTarget: THREE.Vector3 = new THREE.Vector3(-52, -2, 97);
  // private targetHelper: THREE.Mesh | null = null;
  // private cameraLine: THREE.Line | null = null;
  private engine: THREE.Group | undefined;

  private metallicMaterial: THREE.ShaderMaterial | null = null;

  private mesh: THREE.Mesh | null = null;

  private customUniforms = {
    uTime: { value: 0.0 },
    uBaseColor: { value: new THREE.Color(0xffffff) },
    uMetalness: { value: 0.9 },
    uRoughness: { value: 0.67 },
  };

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
    // //light changes
    // const lightFolder = this.gui.addFolder('Directional Light');
    // lightFolder.add(this.light!, 'intensity', 0, 2, 0.01).name('Intensity');
    // lightFolder.add(this.light!.position, 'x', -1000, 1000, 1).name('Position X');
    // lightFolder.add(this.light!.position, 'y', -1000, 1000, 1).name('Position Y');
    // lightFolder.add(this.light!.position, 'z', -1000, 1000, 1).name('Position Z');
    // lightFolder.add(this.light!.target.position, 'x', -1000, 1000, 1).name('Target X');
    // lightFolder.add(this.light!.target.position, 'y', -1000, 1000, 1).name('Target Y');
    // lightFolder.add(this.light!.target.position, 'z', -1000, 1000, 1).name('Target Z');
    // lightFolder.open();
  }

  initLight(): void {
    this.light = new THREE.DirectionalLight(0xffffff, 0.3);
    this.light.position.set(90, 24, 15);
    this.light.castShadow = true;
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

    this.gui = new GUI();
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

      // Apply metallic material to all meshes in the scene
      gltf.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          console.log('Found mesh:', child.name, 'Material type:', child.material.type);
          this.mesh = child;

          // Force unique shader cache key to prevent Three.js from using cached shader
          child.material.customProgramCacheKey = () => 'custom-metallic-shader-' + child.uuid;

          child.material.onBeforeCompile = (shader: any) => {
            // Add custom uniforms - use class-level uniforms so GUI can update them
            shader.uniforms.uTime = this.customUniforms.uTime;
            shader.uniforms.uBaseColor = this.customUniforms.uBaseColor;
            shader.uniforms.uMetalness = this.customUniforms.uMetalness;
            shader.uniforms.uRoughness = this.customUniforms.uRoughness;

            // Store reference to update uniforms later
            this.mesh!.userData.shader = shader;

            // Add custom code to vertex shader
            shader.vertexShader = shader.vertexShader.replace(
              '#include <common>',
              `
                #include <common>
                uniform float uTime;
                varying vec3 vWorldPos;
                `,
            );

            shader.vertexShader = shader.vertexShader.replace(
              '#include <worldpos_vertex>',
              `
                #include <worldpos_vertex>
                vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
                `,
            );

            // Add custom code to fragment shader - declare uniforms
            shader.fragmentShader = shader.fragmentShader.replace(
              '#include <common>',
              `
                #include <common>
                uniform float uTime;
                uniform float uEffectIntensity;
                uniform vec3 uBaseColor;
                uniform float uMetalness;
                uniform float uRoughness;
                varying vec3 vWorldPos;
                `,
            );

            // Override the base color (diffuse)
            shader.fragmentShader = shader.fragmentShader.replace(
              '#include <color_fragment>',
              `
                #include <color_fragment>
                diffuseColor.rgb = uBaseColor;
                `,
            );

            // Override metalness
            shader.fragmentShader = shader.fragmentShader.replace(
              '#include <metalnessmap_fragment>',
              `
                float metalnessFactor = uMetalness;
                #ifdef USE_METALNESSMAP
                  vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
                  metalnessFactor *= texelMetalness.b;
                #endif
                `,
            );

            // Override roughness
            shader.fragmentShader = shader.fragmentShader.replace(
              '#include <roughnessmap_fragment>',
              `
                float roughnessFactor = uRoughness;
                #ifdef USE_ROUGHNESSMAP
                  vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
                  roughnessFactor *= texelRoughness.g;
                #endif
                `,
            );

            // Add effect hook before output (for future visual effects)
            shader.fragmentShader = shader.fragmentShader.replace(
              '#include <output_fragment>',
              `
                // === CUSTOM EFFECTS SECTION ===
                // Add glitch, noise, distortion effects here
                // Example: outgoingLight = mix(outgoingLight, effectColor, uEffectIntensity);
                // ===============================

                #include <output_fragment>
                `,
            );
          };

          // Assign the new material to the mesh
          // child.material = newMaterial;
        }
      });

      this.scene?.add(gltf.scene);

      // Add GUI controls for the shader
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

    const shaderFolder = this.gui.addFolder('Metallic Shader');

    const params = {
      baseColor: '#ffffff',
      metalness: 0.9,
      roughness: 0.67,
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
    shaderFolder.open();
  }

  componentDidMount() {
    super.componentDidMount();

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

    // this.initControls();

    this.attachMouseMoveEvent(this.canvasDiv);

    this.animate();
  }

  animate() {
    if (!this.looped) return;
    if (!this.renderer || !this.scene || !this.camera) return;

    this.time += 1;

    this.camera.lookAt(this.cameraTarget);

    // Update shader uniforms
    if (this.metallicMaterial) {
      this.metallicMaterial.uniforms.uTime.value = this.time * 0.01;

      // Sync light position if light exists
      if (this.light) {
        this.metallicMaterial.uniforms.uLightPosition.value.copy(this.light.position);
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

    this.gui.updateDisplay();

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
