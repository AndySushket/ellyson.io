import * as THREE from 'three';

class Renderer extends THREE.WebGLRenderer {
    constructor(param: THREE.WebGLRendererParameters | undefined) {
        super(param);
    }
}

export default Renderer;
