import { MeshBVH } from 'three-mesh-bvh';
import * as THREE from 'three';
import { BufferAttribute, InterleavedBufferAttribute } from 'three';

import vertexShader from './shaders/fireflies.vert';
import fragmentShader from './shaders/fireflies.frag';

class FireFlies {
  velocities: any;

  private context: any;

  private readonly config: any;

  private bvh: MeshBVH | undefined;

  public fireFlies: THREE.InstancedMesh | undefined;

  constructor(config: any, context: any) {
    this.config = config;
    this.context = context;
    this.velocities = {};
    this.initFireFlies(config);

    if (this.context.meadow?.groundMesh?.geometry) {
      const geometry = this.context.meadow.groundMesh.geometry;

      if (!geometry.boundsTree) geometry.computeBoundsTree(); // Если нужно, пересчитать BVH
      this.bvh = new MeshBVH(geometry);
    }
  }

  initFireFlies(config: any) {
    const { speed, distance, count, rotateParticles } = config;

    const sphereGeom: any = new THREE.SphereGeometry(0.1, 32, 32);
    const sphereInstanceGeom = new THREE.InstancedBufferGeometry().copy(sphereGeom);
    const offsetArray = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      offsetArray[i * 3] = THREE.MathUtils.randFloat(distance.xMin, distance.xMax);
      offsetArray[i * 3 + 1] = 2;
      offsetArray[i * 3 + 2] = THREE.MathUtils.randFloat(distance.zMin, distance.zMax);

      this.velocities[i] = {
        x: (Math.random() - 0.5) * speed,
        z: (Math.random() - 0.5) * speed,
        yOffset: Math.random() * Math.PI * 2,
      };
    }

    sphereInstanceGeom.setAttribute('offset', new THREE.InstancedBufferAttribute(offsetArray, 3));
    sphereInstanceGeom.instanceCount = count;

    const fireFliesMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        emissiveColor: { value: new THREE.Color(0xffff00) }, // Желтый свет
        emissiveIntensity: { value: 100.0 }, // Интенсивность свечения
      },
      transparent: true,
    });

    const fireFlies = new THREE.InstancedMesh(
      sphereInstanceGeom,
      fireFliesMaterial,
      count
    );

    fireFlies.castShadow = false;
    fireFlies.receiveShadow = false;

    fireFlies.frustumCulled = false;

    fireFlies.rotation.y = rotateParticles;


    this.fireFlies = fireFlies;
  }

  moveFireFlies() {
    if (!this.fireFlies) return;
    const count = this.config.count;
    const offsetAttr = this.fireFlies.geometry.attributes.offset;
    for (let i = 0; i < count; i++) {
      this.moveFirefly(offsetAttr, i);
    }
    offsetAttr.needsUpdate = true;
  }

  moveFirefly(offsetArray: BufferAttribute | InterleavedBufferAttribute, index: number) {
    if (!(offsetArray instanceof THREE.BufferAttribute)) return;

    const distance = this.config.distance;
    // Update the velocity slightly to change direction
    this.updateVelocity(index);

    const array = offsetArray.array as Float32Array;

    const i = index * 3;

    const x = array[i];
    const y = array[i + 1];
    const z = array[i + 2];

    // Apply velocity to position

    // Check and reflect if the firefly goes out of bounds
    if (x < distance.xMin || x > distance.xMax) {
      this.velocities[index].x *= -1; // Reverse X direction
    }
    if (z < distance.zMin || z > distance.zMax) {
      this.velocities[index].z *= -1; // Reverse Y direction
    }

    let groundY = 0;

    const rotation = this.fireFlies?.rotation;
    if (!rotation) return;
    const sinY = Math.sin(-rotation.y); // sin угла вращения вокруг Y
    const cosY = Math.cos(-rotation.y); // cos угла вращения вокруг Y

    const rotatedX = x * cosY - z * sinY;
    const rotatedZ = x * sinY + z * cosY;

    const ray = new THREE.Ray(
      new THREE.Vector3(rotatedX, 100, rotatedZ),
      new THREE.Vector3(0, -1, 0),
    );

    if (this.bvh) {
      const hit = this.bvh.raycastFirst(ray);
      if (hit) {
        groundY = hit.point.y;
      }
    }

    const newY = groundY + Math.abs(Math.sin(this.velocities[index].yOffset) * 2);

    offsetArray.set([x + this.velocities[index].x, newY, z + this.velocities[index].z], i);
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

  getFireflyPositions(): Float32Array {
    if (!this.fireFlies) return new Float32Array(0);
    const count = this.config.count;

    const positions = new Float32Array(count * 3); // [x, y, z, x, y, z, ...]

    // Получаем матрицу вращения группы
    const { rotation } = this.fireFlies;
    const sinY = Math.sin(-rotation.y); // sin угла вращения вокруг Y
    const cosY = Math.cos(-rotation.y); // cos угла вращения вокруг Y

    for (let i = 0; i < count; i++) {
      const x = this.fireFlies.geometry.attributes.offset.getX(i);
      const y = this.fireFlies.geometry.attributes.offset.getY(i);
      const z = this.fireFlies.geometry.attributes.offset.getZ(i);

      const rotatedX = x * cosY - z * sinY;
      const rotatedZ = x * sinY + z * cosY;

      positions[i * 3] = rotatedX;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = rotatedZ;
    }

    return positions;
  }
}

export default FireFlies;
