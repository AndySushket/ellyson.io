import { MeshBVH } from 'three-mesh-bvh';
import * as THREE from 'three';
import fireFlySprite from './assets/firefly.png';

class FireFlies {
  velocities: any;

  private context: any;

  private readonly config: any;

  private bvh: MeshBVH | undefined;

  public group: THREE.Group<THREE.Object3DEventMap> | undefined;

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
    const { speed, distance, count, spotLight, rotateParticles } = config;

    const fireFlies = new THREE.Group();

    fireFlies.rotation.y = rotateParticles;

    for (let i = 0; i < count; i++) {
      const fireFly = new THREE.Mesh(
        new THREE.SphereGeometry(0.1, 32, 32),
        new THREE.MeshStandardMaterial({
          color: 0xffff00,
          emissive: 0xffff00,
          emissiveIntensity: 100,
          transparent: true,
          opacity: 0.5,
        }),
      );

      if (spotLight.use) {
        const {
          color,
          intensity,
          distance: lightDistance,
          shadow: {
            mapSize: { width, height },
            camera: { far },
            castShadow,
          },
        } = spotLight;
        const light = new THREE.PointLight(color, intensity, lightDistance);
        light.castShadow = castShadow;
        light.shadow.mapSize.width = width;
        light.shadow.mapSize.height = height;
        light.shadow.camera.far = far;
        fireFly.add(light);
      }

      fireFlies.add(fireFly);

      this.velocities[i] = {
        x: (Math.random() - 0.5) * speed,
        z: (Math.random() - 0.5) * speed,
        yOffset: Math.random() * Math.PI * 2,
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
    for (let i = 0; i < 10; i += 1) {
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
    if(!this.group) return;

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

    let groundY = 0;

    const { rotation } = this.group;
    const sinY = Math.sin(-rotation.y); // sin угла вращения вокруг Y
    const cosY = Math.cos(-rotation.y); // cos угла вращения вокруг Y

    const { x, y, z } = mesh.position;

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

    mesh.position.set(
      mesh.position.x + this.velocities[index].x,
      newY,
      mesh.position.z + this.velocities[index].z,
    );
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
    if (!this.group || !this.group.children) return new Float32Array(0);

    const positions = new Float32Array(this.group.children.length * 3); // [x, y, z, x, y, z, ...]

    // Получаем матрицу вращения группы
    const { rotation } = this.group;
    const sinY = Math.sin(-rotation.y); // sin угла вращения вокруг Y
    const cosY = Math.cos(-rotation.y); // cos угла вращения вокруг Y

    this.group.children.forEach((mesh, index) => {
      const i = index * 3;

      // Локальные позиции светлячков (относительно группы)
      const { x, y, z } = mesh.position;

      // Преобразуем с учётом вращения группы по оси Y (формула вращения вокруг оси Y)
      const rotatedX = x * cosY - z * sinY;
      const rotatedZ = x * sinY + z * cosY;

      // Записываем в буфер с учётом вращения
      positions[i] = rotatedX;    // Новое положение X с учётом вращения
      positions[i + 1] = y;      // Y остаётся неизменным
      positions[i + 2] = rotatedZ; // Новое положение Z с учётом вращения
    });
    return positions;
  }
}

export default FireFlies;
