import * as THREE from 'three';

class LightMap {
  private renderTarget: THREE.WebGLRenderTarget;
  private lightScene: THREE.Scene;
  private camera: THREE.OrthographicCamera;
  private firefliesMesh: THREE.InstancedMesh;
  private fireFliesCount: number;

  constructor(resolution = 512, groundSize = 180, fireflyCount = 100) {

    this.fireFliesCount = fireflyCount;

    this.renderTarget = new THREE.WebGLRenderTarget(resolution, resolution, {
      format: THREE.RGBAFormat,
      type: THREE.FloatType,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter
    });

    this.camera = new THREE.OrthographicCamera(
      -groundSize/2,
      groundSize/2,
      groundSize/2,
      -groundSize/2,
      -1,
      1
    );

    this.camera.position.set(0, 0, 1); // Уменьшили высоту
    this.camera.lookAt(0, 0, 0);

    this.lightScene = new THREE.Scene();

    const circleGeometry = new THREE.CircleGeometry(2, 16);
    const gradientSize = 64;
    const data = new Uint8Array(gradientSize * gradientSize * 4);

    for(let y = 0; y < gradientSize; y++) {
      for(let x = 0; x < gradientSize; x++) {
        const index = (y * gradientSize + x) * 4;

        // Вычисляем расстояние от центра
        const dx = x - gradientSize/2;
        const dy = y - gradientSize/2;
        const distance = Math.sqrt(dx * dx + dy * dy) / (gradientSize/2);

        // Создаем плавное затухание
        const intensity = Math.max(0, 1 - distance);
        const value = Math.pow(intensity, 2.0) * 255;

        data[index] = 255;     // R
        data[index + 1] = 255; // G
        data[index + 2] = 255; // B
        data[index + 3] = value; // A
      }
    }

    const gradientTexture = new THREE.DataTexture(
      data,
      gradientSize,
      gradientSize,
      THREE.RGBAFormat
    );
    gradientTexture.needsUpdate = true;

    const fireflyMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      map: gradientTexture
    });

    this.firefliesMesh = new THREE.InstancedMesh(
      circleGeometry,
      fireflyMaterial,
      fireflyCount // максимальное количество светлячков
    );

    this.lightScene.add(this.firefliesMesh);
  }

  update(renderer: THREE.WebGLRenderer, positions: Float32Array) {
    const matrix = new THREE.Matrix4();

    for (let i = 0; i < this.fireFliesCount; i++) {
      const x = positions[i * 3];
      const y = positions[i * 3 + 2];
      const z = 0;

      matrix.makeTranslation(x, y, z);
      this.firefliesMesh.setMatrixAt(i, matrix);
    }

    this.firefliesMesh.count = this.fireFliesCount;
    this.firefliesMesh.instanceMatrix.needsUpdate = true;

    renderer.setRenderTarget(this.renderTarget);
    renderer.render(this.lightScene, this.camera);
    renderer.setRenderTarget(null);
  }

  getTexture(): THREE.Texture {
    return this.renderTarget.texture;
  }
}

export default LightMap;
