'use client';

// import React from 'react';

import * as THREE from 'three';
import TemplateFor3D from 'components/common/mainTemplate3D';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

import './style.scss';

const { GUI } =  require('dat.gui').default;
const engine = require('./engine.glb');

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
    uBaseColor: { value: new THREE.Color(0xc9c9c9) },
    uMetalness: { value: 1. },
    uRoughness: { value: 0.67 },
    uEffectIntensity: { value: 1.93 },
    uGlowColor1: { value: new THREE.Color(0x000000) }, // Red/Pink
    uGlowColor2: { value: new THREE.Color(0xcd4e4e) }, // Teal
    uGlowColor3: { value: new THREE.Color(0x000000) }, // Purple
    uGlowColor4: { value: new THREE.Color(0x630000) }, // Blue
    uGlowSpeed: { value: 1. },
    uGlowScale: { value: .9 },
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
            shader.uniforms.uEffectIntensity = this.customUniforms.uEffectIntensity;
            shader.uniforms.uGlowColor1 = this.customUniforms.uGlowColor1;
            shader.uniforms.uGlowColor2 = this.customUniforms.uGlowColor2;
            shader.uniforms.uGlowColor3 = this.customUniforms.uGlowColor3;
            shader.uniforms.uGlowColor4 = this.customUniforms.uGlowColor4;
            shader.uniforms.uGlowSpeed = this.customUniforms.uGlowSpeed;
            shader.uniforms.uGlowScale = this.customUniforms.uGlowScale;

            // Store reference to shader for debugging
            this.mesh!.userData.shader = shader;

            // Log to verify shader is being modified
            console.log('Shader being modified for mesh:', child.name);

            // Add custom code to vertex shader
            shader.vertexShader = shader.vertexShader.replace(
              '#include <common>',
              `
                #include <common>
                uniform float uTime;
                varying vec3 vWorldPos;
                varying vec3 vWorldNormal;
                `,
            );

            // Use project_vertex hook which is more reliable
            shader.vertexShader = shader.vertexShader.replace(
              '#include <project_vertex>',
              `
                #include <project_vertex>
                vWorldPos = (modelMatrix * vec4(transformed, 1.0)).xyz;
                vWorldNormal = normalize(normalMatrix * normal);
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
                uniform vec3 uGlowColor1;
                uniform vec3 uGlowColor2;
                uniform vec3 uGlowColor3;
                uniform vec3 uGlowColor4;
                uniform float uGlowSpeed;
                uniform float uGlowScale;
                varying vec3 vWorldPos;
                varying vec3 vWorldNormal;
                
                // Simplex noise functions for smooth gradients
                vec3 mod289_3(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
                vec4 mod289_4(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
                vec4 permute(vec4 x) { return mod289_4(((x*34.0)+1.0)*x); }
                vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
                
                float snoise(vec3 v) {
                  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
                  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
                  
                  vec3 i  = floor(v + dot(v, C.yyy));
                  vec3 x0 = v - i + dot(i, C.xxx);
                  
                  vec3 g = step(x0.yzx, x0.xyz);
                  vec3 l = 1.0 - g;
                  vec3 i1 = min(g.xyz, l.zxy);
                  vec3 i2 = max(g.xyz, l.zxy);
                  
                  vec3 x1 = x0 - i1 + C.xxx;
                  vec3 x2 = x0 - i2 + C.yyy;
                  vec3 x3 = x0 - D.yyy;
                  
                  i = mod289_3(i);
                  vec4 p = permute(permute(permute(
                    i.z + vec4(0.0, i1.z, i2.z, 1.0))
                    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
                  
                  float n_ = 0.142857142857;
                  vec3 ns = n_ * D.wyz - D.xzx;
                  
                  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
                  
                  vec4 x_ = floor(j * ns.z);
                  vec4 y_ = floor(j - 7.0 * x_);
                  
                  vec4 x = x_ *ns.x + ns.yyyy;
                  vec4 y = y_ *ns.x + ns.yyyy;
                  vec4 h = 1.0 - abs(x) - abs(y);
                  
                  vec4 b0 = vec4(x.xy, y.xy);
                  vec4 b1 = vec4(x.zw, y.zw);
                  
                  vec4 s0 = floor(b0)*2.0 + 1.0;
                  vec4 s1 = floor(b1)*2.0 + 1.0;
                  vec4 sh = -step(h, vec4(0.0));
                  
                  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
                  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
                  
                  vec3 p0 = vec3(a0.xy, h.x);
                  vec3 p1 = vec3(a0.zw, h.y);
                  vec3 p2 = vec3(a1.xy, h.z);
                  vec3 p3 = vec3(a1.zw, h.w);
                  
                  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
                  p0 *= norm.x;
                  p1 *= norm.y;
                  p2 *= norm.z;
                  p3 *= norm.w;
                  
                  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
                  m = m * m;
                  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
                }
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

            // Add effect hook AFTER output - use dithering_fragment which comes after output
            shader.fragmentShader = shader.fragmentShader.replace(
              '#include <dithering_fragment>',
              `
                // === RAYCAST-STYLE GRADIENT GLOW EFFECT ===
                
                // Create flowing noise patterns at different scales
                float glowTime = uTime * uGlowSpeed;
                vec3 noisePos = vWorldPos * 0.01 * uGlowScale;
                
                // Multiple noise layers for organic movement
                float noise1 = snoise(vec3(noisePos.xy * 1.0, glowTime * 0.5)) * 0.5 + 0.5;
                float noise2 = snoise(vec3(noisePos.yz * 1.5 + 100.0, glowTime * 0.3)) * 0.5 + 0.5;
                float noise3 = snoise(vec3(noisePos.xz * 0.8 + 200.0, glowTime * 0.7)) * 0.5 + 0.5;
                float noise4 = snoise(vec3(noisePos.xy * 2.0 + 300.0, glowTime * 0.4)) * 0.5 + 0.5;
                
                // Create smooth gradient transitions between colors
                float blend1 = smoothstep(0.0, 1.0, noise1);
                float blend2 = smoothstep(0.0, 1.0, noise2);
                float blend3 = smoothstep(0.0, 1.0, noise3);
                float blend4 = smoothstep(0.0, 1.0, noise4);
                
                // Mix colors in a flowing pattern
                vec3 glowColorA = mix(uGlowColor1, uGlowColor2, blend1);
                vec3 glowColorB = mix(uGlowColor3, uGlowColor4, blend2);
                vec3 gradientColor = mix(glowColorA, glowColorB, blend3);
                
                // Add pulsing intensity
                float pulse = sin(glowTime * 2.0) * 0.15 + 0.85;
                
                // Edge glow effect based on view angle (fresnel-like)
                vec3 viewDir = normalize(cameraPosition - vWorldPos);
                float fresnel = pow(1.0 - max(dot(viewDir, normalize(vWorldNormal)), 0.0), 3.0);
                
                // Combine effects
                float glowIntensity = (blend4 * 0.5 + fresnel * 0.5) * pulse * uEffectIntensity;
                
                // Apply glow to the output - additive blending for glow effect
                gl_FragColor.rgb = gl_FragColor.rgb + gradientColor * glowIntensity;
                
                // ===============================

                #include <dithering_fragment>
                `,
            );
          };

          // Force material to recompile with the new shader
          child.material.needsUpdate = true;

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
      baseColor: this.customUniforms.uBaseColor.value.getStyle(),
      metalness: this.customUniforms.uMetalness.value,
      roughness: this.customUniforms.uRoughness.value,
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

    // Glow Effect Controls
    const glowFolder = this.gui.addFolder('Raycast Glow Effect');

    const glowParams = {
      effectIntensity:this.customUniforms.uEffectIntensity.value,
      glowSpeed: this.customUniforms.uGlowSpeed.value,
      glowScale: this.customUniforms.uGlowScale.value,
      glowColor1: this.customUniforms.uGlowColor1.value.getStyle(),
      glowColor2: this.customUniforms.uGlowColor2.value.getStyle(),
      glowColor3: this.customUniforms.uGlowColor3.value.getStyle(),
      glowColor4: this.customUniforms.uGlowColor4.value.getStyle(),
    };

    glowFolder
      .add(glowParams, 'effectIntensity', 0, 3, 0.01)
      .name('Intensity')
      .onChange((value: number) => {
        this.customUniforms.uEffectIntensity.value = value;
      });

    glowFolder
      .add(glowParams, 'glowSpeed', 0.1, 2.0, 0.1)
      .name('Speed')
      .onChange((value: number) => {
        this.customUniforms.uGlowSpeed.value = value;
      });

    glowFolder
      .add(glowParams, 'glowScale', 0.5, 5.0, 0.1)
      .name('Scale')
      .onChange((value: number) => {
        this.customUniforms.uGlowScale.value = value;
      });

    glowFolder
      .addColor(glowParams, 'glowColor1')
      .name('Color 1')
      .onChange((value: string) => {
        this.customUniforms.uGlowColor1.value.set(value);
      });

    glowFolder
      .addColor(glowParams, 'glowColor2')
      .name('Color 2')
      .onChange((value: string) => {
        this.customUniforms.uGlowColor2.value.set(value);
      });

    glowFolder
      .addColor(glowParams, 'glowColor3')
      .name('Color 3')
      .onChange((value: string) => {
        this.customUniforms.uGlowColor3.value.set(value);
      });

    glowFolder
      .addColor(glowParams, 'glowColor4')
      .name('Color 4')
      .onChange((value: string) => {
        this.customUniforms.uGlowColor4.value.set(value);
      });

    glowFolder.open();
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

    // Update custom uniforms time for the glow effect
    this.customUniforms.uTime.value = this.time * 0.01;

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
