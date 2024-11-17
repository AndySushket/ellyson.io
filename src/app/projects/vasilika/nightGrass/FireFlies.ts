import * as THREE from 'three';
import fireFlySprite from './assets/firefly.png';

class FireFlies {
  velocities: any;

  private context: any;

  private readonly config: any;

  public group: THREE.Group<THREE.Object3DEventMap> | undefined;

  constructor(config: any, context: any) {
    this.config = config;
    this.context = context;
    this.velocities = {};
    this.initFireFlies(config);
  }

  initFireFlies(config: any) {
    const { speed, distance } = config;

    const textureLoader = new THREE.TextureLoader();
    const fireflyTexture = textureLoader.load(fireFlySprite.src);

    const fireFlies = new THREE.Group();

    for (let i = 0; i < 10; i++) {
      const fireFly = new THREE.Points(
        new THREE.BufferGeometry().setFromPoints([new THREE.Vector3()]),
        new THREE.PointsMaterial({
          size: 0.2,
          sizeAttenuation: true,
          map: fireflyTexture,
          transparent: true,
        }),
      );

      const light = new THREE.PointLight(0xffff00, 20, 3);
      light.castShadow = true;
      light.shadow.mapSize.width = 256;
      light.shadow.mapSize.height = 256;
      light.shadow.camera.far = 10;
      fireFly.add(light);
      light.position.set(Math.random() * 10, 2, Math.random() * 10);
      fireFlies.add(fireFly);
      const helper = new THREE.PointLightHelper(light, 1);
      this.context.scene?.add(helper);
      this.velocities[i] = {
        x: (Math.random() - 0.5) * speed,
        z: (Math.random() - 0.5) * speed,
      };
      // random location of mesh
      fireFly.position.set(
        THREE.MathUtils.randFloat(distance.xMin, distance.xMax),
        2,
        THREE.MathUtils.randFloat(distance.zMin, distance.zMax),
      );
    }
    this.group = fireFlies;
  }

  updateFireFlies() {
    for (let i = 0; i < 10; i+=1) {
      const fireFly = this.group?.children[i];
      if (fireFly) {
        const velocity = this.velocities[i];
        fireFly.position.x += velocity.x;
        fireFly.position.z += velocity.z;
        if (
          fireFly.position.x < this.config.distance.xMin ||
          fireFly.position.x > this.config.distance.xMax
        ) {
          this.updateVelocity(i);
        }
        if (
          fireFly.position.z < this.config.distance.zMin ||
          fireFly.position.z > this.config.distance.zMax
        ) {
          this.updateVelocity(i);
        }
      }
    }
  }

  moveFireFlies() {
    this.group?.children.forEach((mesh, index) => {
      this.moveFirefly(mesh, index);
    });
  }

  moveFirefly(mesh: THREE.Object3D<THREE.Object3DEventMap>, index: number) {
    const distance = this.config.distance;
    // Update the velocity slightly to change direction
    this.updateVelocity(index);

    // Apply velocity to position


    // Check and reflect if the firefly goes out of bounds
    if (mesh.position.x < distance.xMin || mesh.position.x > distance.xMax) {
      this.velocities[index].x *= -1; // Reverse X direction
    }
    if (mesh.position.z < distance.zMin || mesh.position.z > distance.zMax) {
      this.velocities[index].z *= -1; // Reverse Y direction
    }

    const posArray = this.context?.meadow.groundMesh.geometry.attributes.position.array;

    const height = this.getHeightAtPosition(mesh.position.x, mesh.position.z, posArray, 3, 4);

    mesh.position.set(mesh.position.x + this.velocities[index].x, height + 1, mesh.position.z + this.velocities[index].z);

  }

  getHeightAtPosition(x: number, y: number, posArray: [], fieldWidth: number, fieldDepth: number) {
    const distance = this.config.distance;
    const gridX = Math.floor(((x - distance.xMin) / (distance.xMax - distance.xMin)) * (fieldWidth - 1));
    const gridY = Math.floor(((y - distance.zMin) / (distance.zMax - distance.zMin)) * (fieldDepth - 1));

    // Находим индекс в posArray (предполагаем [x, y, z] для каждой вершины)
    const index = (gridY * fieldWidth + gridX) * 3 + 1; // +2 для Y значения

    return posArray[index] || 0; // Возвращаем высоту или 0, если вне границ
  }

  updateVelocity(index: number) {
    const { speed } = this.config;
    const velocity = this.velocities[index];

    // Slightly adjust direction by a small random angle
    const angleChange = (Math.random() - 0.5) * 0.1; // Change angle randomly between -0.05 and 0.05 radians

    // Apply rotation to the velocity vector
    const newVelocityX = velocity.x * Math.cos(angleChange) - velocity.z * Math.sin(angleChange);
    const newVelocityZ = velocity.x * Math.sin(angleChange) + velocity.z * Math.cos(angleChange);

    // Ensure the speed remains constant
    const length = Math.sqrt(newVelocityX * newVelocityX + newVelocityZ * newVelocityZ);
    this.velocities[index].x = (newVelocityX / length) * speed;
    this.velocities[index].z = (newVelocityZ / length) * speed;
  }
}

export default FireFlies;
