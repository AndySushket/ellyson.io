'use client';

import React from 'react';
import * as THREE from 'three';
import TemplateFor3D from 'components/common/mainTemplate3D';

// Define the interface for the WebAssembly module
interface SphereModule {
  _calculateSphereVertices: (verticesPtr: number, resolutionSphere: number, radius: number) => void;
  _calculateSphereColors: (verticesPtr: number, colorsPtr: number, vertexCount: number) => void;
  _animateSphere: (
    verticesPtr: number,
    vertexCount: number,
    time: number,
    amplitude: number,
  ) => void;
  _malloc: (size: number) => number;
  _free: (ptr: number) => void;
  ccall: (funcName: string, returnType: string, argTypes: string[], args: any[]) => any;
  cwrap: (funcName: string, returnType: string, argTypes: string[]) => (...args: any[]) => any;
  HEAPF32: Float32Array;
}

declare global {
  interface Window {
    createSphereModule: () => Promise<SphereModule>;
  }
}

export default class WebAssemblySphere extends TemplateFor3D {
  private wasmModule: SphereModule | null = null;
  private sphereGeometry: THREE.BufferGeometry | null = null;
  private sphereMesh: THREE.Mesh | null = null;
  private verticesPtr: number = 0;
  private colorsPtr: number = 0;
  private vertexCount: number = 0;
  private resolutionSphere: number = 30;
  private radius: number = 1;
  private verticesArray: Float32Array | null = null;
  private colorsArray: Float32Array | null = null;

  constructor(props: any) {
    super(props);
    this.state = {
      ...this.state,
      wasmLoaded: false,
    };
  }

  async loadWasmModule() {
    try {
      // Load the WebAssembly module
      const scriptElement = document.createElement('script');
      scriptElement.src = '/wasm/sphere.js';
      scriptElement.async = true;

      // Wait for the script to load
      await new Promise<void>((resolve, reject) => {
        scriptElement.onload = () => resolve();
        scriptElement.onerror = () => reject(new Error('Failed to load WebAssembly script'));
        document.head.appendChild(scriptElement);
      });

      // Initialize the module
      const modulePromise = window.createSphereModule();
      this.wasmModule = await modulePromise;

      this.setState({ wasmLoaded: true });
      console.log('WebAssembly module loaded successfully');

      // Initialize the sphere after the module is loaded
      this.initSphere();
    } catch (error) {
      console.error('Failed to load WebAssembly module:', error);
    }
  }

  initSphere() {
    if (!this.wasmModule) return;

    // Calculate the number of vertices
    const numVertices = (this.resolutionSphere + 1) * (this.resolutionSphere + 1);
    this.vertexCount = numVertices * 3;

    // Allocate memory in the WebAssembly module
    this.verticesPtr = this.wasmModule._malloc(this.vertexCount * 4); // 4 bytes per float
    this.colorsPtr = this.wasmModule._malloc(this.vertexCount * 4);

    // Create arrays that map to the WebAssembly memory
    // Ensure byte offsets are properly aligned (must be multiples of 4 for Float32Array)
    // Convert the raw memory pointers to Float32Array indices by dividing by 4 (bytes per float)
    const verticesIndex = this.verticesPtr / 4;
    const colorsIndex = this.colorsPtr / 4;

    // Check if HEAPF32 is available
    if (!this.wasmModule.HEAPF32) {
      console.error('HEAPF32 is not available in the WebAssembly module. Make sure it is properly exported.');
      return;
    }

    // Create views into the HEAPF32 array starting at the calculated indices
    this.verticesArray = this.wasmModule.HEAPF32.subarray(
      verticesIndex,
      verticesIndex + this.vertexCount,
    );

    this.colorsArray = this.wasmModule.HEAPF32.subarray(
      colorsIndex,
      colorsIndex + this.vertexCount,
    );

    // Calculate the sphere vertices using WebAssembly
    this.wasmModule._calculateSphereVertices(this.verticesPtr, this.resolutionSphere, this.radius);

    // Calculate colors based on vertex positions
    this.wasmModule._calculateSphereColors(this.verticesPtr, this.colorsPtr, this.vertexCount);

    // Create a Three.js buffer geometry
    this.sphereGeometry = new THREE.BufferGeometry();

    // Create position and color attributes
    // Clone the arrays to ensure Three.js has its own copy of the data
    const positionAttribute = new THREE.BufferAttribute(Float32Array.from(this.verticesArray), 3);
    const colorAttribute = new THREE.BufferAttribute(Float32Array.from(this.colorsArray), 3);

    this.sphereGeometry.setAttribute('position', positionAttribute);
    this.sphereGeometry.setAttribute('color', colorAttribute);

    // Create indices for the sphere
    const indices = this.createSphereIndices();
    this.sphereGeometry.setIndex(indices);

    // Create a material that uses vertex colors
    const material = new THREE.MeshPhongMaterial({
      vertexColors: true,
      shininess: 80,
      side: THREE.DoubleSide,
    });

    // Create the mesh and add it to the scene
    this.sphereMesh = new THREE.Mesh(this.sphereGeometry, material);
    this.scene?.add(this.sphereMesh);
  }

  createSphereIndices() {
    const indices = [];
    const verticesPerRow = this.resolutionSphere + 1;

    for (let i = 0; i < this.resolutionSphere; i++) {
      for (let j = 0; j < this.resolutionSphere; j++) {
        const a = i * verticesPerRow + j;
        const b = i * verticesPerRow + j + 1;
        const c = (i + 1) * verticesPerRow + j;
        const d = (i + 1) * verticesPerRow + j + 1;

        // Add two triangles for each quad
        indices.push(a, b, c);
        indices.push(b, d, c);
      }
    }

    return indices;
  }

  updateSphere() {
    if (!this.wasmModule || !this.verticesArray || !this.sphereGeometry) return;

    // Check if HEAPF32 is available before proceeding
    if (!this.wasmModule.HEAPF32) {
      console.error('HEAPF32 is not available in the WebAssembly module. Make sure it is properly exported.');
      return;
    }

    // Animate the sphere using WebAssembly
    this.wasmModule._animateSphere(this.verticesPtr, this.vertexCount, this.time * 0.01, 0.005);

    // Update the position attribute with the new vertices
    const positionAttribute = this.sphereGeometry.attributes.position;

    // No need to create a new Float32Array, just copy the values directly
    positionAttribute.array.set(this.verticesArray);

    positionAttribute.needsUpdate = true;
  }

  initControls(): void {
    super.initControls();
    this.camera?.position.set(0, 0, 10);
  }

  componentDidMount(): void {
    super.componentDidMount();
    this.init3D();
    this.initControls();

    // Load the WebAssembly module
    this.loadWasmModule();

    this.animate();
  }

  componentWillUnmount(): void {
    // Free the WebAssembly memory when the component is unmounted
    if (this.wasmModule && this.verticesPtr && this.colorsPtr) {
      this.wasmModule._free(this.verticesPtr);
      this.wasmModule._free(this.colorsPtr);
    }

    super.componentWillUnmount();
  }

  animate(): void {
    if (!this.looped || !this.state.isTabActive) return;

    // Update the sphere if the WebAssembly module is loaded
    if (this.state.wasmLoaded) {
      this.updateSphere();
    }

    super.animate();
  }

  render(): React.ReactNode {
    return (
      <div>
        <div
          ref={(ref) => {
            this.canvasDiv = ref;
          }}
          className="canvasDiv"
        />
        <div
          className="info-panel"
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            background: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '15px',
            borderRadius: '5px',
            maxWidth: '400px',
          }}
        >
          <h2>WebAssembly + Three.js Demo</h2>
          <p>This demo shows a sphere generated and animated using WebAssembly.</p>
          <p>The vertex positions and colors are calculated in C code compiled to WebAssembly.</p>
          <p>The animation is also performed in WebAssembly for better performance.</p>
        </div>
      </div>
    );
  }
}
