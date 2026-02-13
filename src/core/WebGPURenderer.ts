import * as THREE from 'three/webgpu';
import { WebGPURendererParameters } from 'three/src/renderers/webgpu/WebGPURenderer';

class Renderer extends THREE.WebGPURenderer {
  constructor(param: WebGPURendererParameters | undefined) {
    super(param);
  }
}

export default Renderer;
