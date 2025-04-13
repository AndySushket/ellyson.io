'use client';

import * as THREE from 'three';
import TemplateFor3D from 'components/common/mainTemplate3D';
import fragmentShader from './shader.frag';
import vertexShader from './shader.vert';

export default class Presentation extends TemplateFor3D {

// Add these properties to your class
  protected landscapeElements: Array<{
    object: THREE.Object3D;
    speed: number;
    resetPosition: number;
  }> = [];
  protected movementSpeed: number = 0.2;
  protected trackSegments: Array<{
    object: THREE.Object3D;
    initialX: number;
    length: number;
  }> = [];



  initControls(): void {
    super.initControls();
    this.camera?.position.set(0, 0, 10);
  }

  initPresentationScene(): void {
    if (!this.scene) return;

    // 1. Create a simple train model
    const trainGroup = new THREE.Group();

    // Train body
    const bodyGeometry = new THREE.BoxGeometry(5, 2, 2);
    const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x3366CC });
    const trainBody = new THREE.Mesh(bodyGeometry, bodyMaterial);
    trainGroup.add(trainBody);

    // Train cabin
    const cabinGeometry = new THREE.BoxGeometry(2, 1, 2);
    const cabinMaterial = new THREE.MeshStandardMaterial({ color: 0x2255AA });
    const trainCabin = new THREE.Mesh(cabinGeometry, cabinMaterial);
    trainCabin.position.set(1.5, 1.5, 0);
    trainGroup.add(trainCabin);

    // Add windows to the train body
    const windowGeometry = new THREE.BoxGeometry(0.5, 0.5, 2.1);
    const windowMaterial = new THREE.MeshStandardMaterial({ color: 0xC0E0FF });

    // Add multiple windows along the train body
    for (let i = -1.5; i < 1.5; i += 1) {
      const trainWindow = new THREE.Mesh(windowGeometry, windowMaterial);
      trainWindow.position.set(i, 0.2, 0);
      trainGroup.add(trainWindow);
    }

    // Cabin window
    const cabinWindow = new THREE.BoxGeometry(1.5, 0.6, 2.1);
    const cabinWindowMesh = new THREE.Mesh(cabinWindow, windowMaterial);
    cabinWindowMesh.position.set(1.5, 1.5, 0);
    trainGroup.add(cabinWindowMesh);

    // Add wheels
    const wheelGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.5, 16);
    const wheelMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });

    // Front wheels
    const frontWheel1 = new THREE.Mesh(wheelGeometry, wheelMaterial);
    frontWheel1.rotation.z = Math.PI / 2;
    frontWheel1.position.set(1.5, -1, 1.25);
    trainGroup.add(frontWheel1);

    const frontWheel2 = new THREE.Mesh(wheelGeometry, wheelMaterial);
    frontWheel2.rotation.z = Math.PI / 2;
    frontWheel2.position.set(1.5, -1, -1.25);
    trainGroup.add(frontWheel2);

    // Back wheels
    const backWheel1 = new THREE.Mesh(wheelGeometry, wheelMaterial);
    backWheel1.rotation.z = Math.PI / 2;
    backWheel1.position.set(-1.5, -1, 1.25);
    trainGroup.add(backWheel1);

    const backWheel2 = new THREE.Mesh(wheelGeometry, wheelMaterial);
    backWheel2.rotation.z = Math.PI / 2;
    backWheel2.position.set(-1.5, -1, -1.25);
    trainGroup.add(backWheel2);

    // Add train to scene
    this.scene.add(trainGroup);

    // 2. Create a simple ground plane for reference
    const groundGeometry = new THREE.PlaneGeometry(1000, 100);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x355E3B, // Forest green color
      roughness: 0.8,
      metalness: 0.2
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2; // Make it horizontal
    ground.position.y = -2; // Position below the train
    this.scene.add(ground);

    // 3. Create railway tracks that will move infinitely
    this.createRailwayTracks();

    // 4. Create mountain landscape that will move infinitely
    this.landscapeElements = [];

    // Create mountain range with variations
    this.createInfiniteMountains();

    // 5. Add some foreground elements for depth perception
    this.createForegroundElements();

    // 6. Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 5);
    directionalLight.castShadow = true;
    this.scene.add(directionalLight);

    // Set up camera to view the side of the train
    if (this.camera) {
      this.camera.position.set(0, 3, 8); // Position camera to see the side of the train
      this.camera.lookAt(0, 0, 0); // Look at the train
    }

    // Set the speed of landscape movement
    this.movementSpeed = 0.2;
  }

// Create railway tracks that move infinitely
// Create railway tracks that move infinitely
  createRailwayTracks(): void {
    if (!this.scene) return;

    // Track segment length - make longer to reduce transitions
    const segmentLength = 12; // Longer segments mean fewer transitions
    const trackWidth = 2.;

    // Create more track segments to cover a wider area
    const trackCount = 30; // Increase count to ensure full coverage
    this.trackSegments = [];

    // Materials
    const railMaterial = new THREE.MeshStandardMaterial({
      color: 0x8B8878,  // Dark gray for rails
      metalness: 0.8,
      roughness: 0.4
    });

    const tieMaterial = new THREE.MeshStandardMaterial({
      color: 0x4A3C2A,  // Dark brown for wooden ties
      metalness: 0.1,
      roughness: 0.9
    });

    // Calculate total track length to ensure proper coverage
    const totalTrackLength = segmentLength * trackCount;
    // Start position (position first segment partly before the visible area)
    const startPosition = -totalTrackLength / 2;

    // Create all track segments
    for (let i = 0; i < trackCount; i++) {
      const segment = new THREE.Group();

      // Create railroad ties (sleepers)
      const tieCount = 8;  // More ties per segment for closer spacing
      const tieSpacing = segmentLength / (tieCount + 1);

      for (let j = 0; j < tieCount; j++) {
        const tieGeometry = new THREE.BoxGeometry(0.2, 0.2, trackWidth);
        const tie = new THREE.Mesh(tieGeometry, tieMaterial);

        // Position each tie with precise spacing
        tie.position.set(
          (j + 1) * tieSpacing - segmentLength / 2,
          -1.7,
          0
        );

        segment.add(tie);
      }

      // Create rails
      const railHeight = 0.1;
      const railWidth = 0.1;
      const railGeometry = new THREE.BoxGeometry(segmentLength, railHeight, railWidth);

      // Left rail
      const leftRail = new THREE.Mesh(railGeometry, railMaterial);
      leftRail.position.set(
        0,
        -1.6,
        -trackWidth / 2 + railWidth / 2
      );
      segment.add(leftRail);

      // Right rail
      const rightRail = new THREE.Mesh(railGeometry, railMaterial);
      rightRail.position.set(
        0,
        -1.6,
        trackWidth / 2 - railWidth / 2
      );
      segment.add(rightRail);

      // Position the entire segment
      segment.position.x = startPosition + i * segmentLength;

      this.scene.add(segment);
      this.trackSegments.push({
        object: segment,
        initialX: startPosition + i * segmentLength,
        length: segmentLength
      });
    }
  }

// Create a range of mountains with different sizes and positions
  createInfiniteMountains(): void {
    if (!this.scene) return;

    // Create three layers of mountains for parallax effect
    this.createMountainLayer(50, 0x556B2F, 40, 15, 20); // Far mountains (dark green)
    this.createMountainLayer(40, 0x708238, 25, 12, 12); // Mid mountains (medium green)
    this.createMountainLayer(30, 0x8FBC8F, 15, 8, 8);   // Near mountains (light green)
  }

// Create a layer of mountains with specified parameters
  createMountainLayer(count: number, color: number, distance: number, maxHeight: number, maxWidth: number): void {
    if (!this.scene) return;

    for (let i = 0; i < count; i++) {
      // Create a more natural mountain shape using multiple cones
      const mountainGroup = new THREE.Group();

      const mainPeakGeometry = new THREE.ConeGeometry(
        maxWidth * (0.5 + Math.random() * 0.5),
        maxHeight * (0.7 + Math.random() * 0.3),
        5 + Math.floor(Math.random() * 3)
      );

      const mountainMaterial = new THREE.MeshStandardMaterial({
        color: color + Math.random() * 0x101010, // Slight color variation
        roughness: 0.8,
        metalness: 0.1,
        flatShading: true
      });

      const mainPeak = new THREE.Mesh(mainPeakGeometry, mountainMaterial);
      mountainGroup.add(mainPeak);

      // Add some smaller peaks to make the mountains look more natural
      const smallPeakCount = 1 + Math.floor(Math.random() * 3);
      for (let j = 0; j < smallPeakCount; j++) {
        const smallPeakGeometry = new THREE.ConeGeometry(
          maxWidth * (0.3 + Math.random() * 0.3),
          maxHeight * (0.4 + Math.random() * 0.3),
          4 + Math.floor(Math.random() * 3)
        );

        const smallPeak = new THREE.Mesh(smallPeakGeometry, mountainMaterial);
        smallPeak.position.x = (Math.random() - 0.5) * maxWidth;
        smallPeak.position.y = -maxHeight * (0.2 + Math.random() * 0.1);
        mountainGroup.add(smallPeak);
      }

      // Position the mountain
      const posX = -100 + i * (200 / count) + Math.random() * 10;
      const posY = -2 + maxHeight / 2; // Position so base is at ground level
      mountainGroup.position.set(posX, posY, -distance - Math.random() * 10);

      this.scene.add(mountainGroup);
      this.landscapeElements.push({
        object: mountainGroup,
        speed: 0.1 + (40 - distance) * 0.01, // Closer mountains move faster (parallax)
        resetPosition: 100 // When to reset position
      });
    }
  }

// Create foreground elements like trees, rocks, etc.
  createForegroundElements(): void {
    if (!this.scene) return;

    // Add some trees to the foreground
    for (let i = 0; i < 30; i++) {
      const tree = this.createTree();
      const posX = -100 + Math.random() * 200;
      const posZ = 5 + Math.random() * 10;
      const side = Math.random() > 0.5 ? 1 : -1;
      tree.position.set(posX, -2, side * posZ);

      this.scene.add(tree);
      this.landscapeElements.push({
        object: tree,
        speed: 0.4, // Trees move faster as they're closest
        resetPosition: 100
      });
    }
  }

// Helper method to create a tree
  createTree(): THREE.Group {
    const treeGroup = new THREE.Group();

    // Tree trunk
    const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.3, 2, 8);
    const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.y = 1;
    treeGroup.add(trunk);

    // Tree foliage (using cone for simplicity)
    const foliageGeometry = new THREE.ConeGeometry(1, 3, 8);
    const foliageMaterial = new THREE.MeshStandardMaterial({
      color: 0x006400,
      roughness: 0.9
    });
    const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
    foliage.position.y = 3.5;
    treeGroup.add(foliage);

    return treeGroup;
  }

  componentDidMount(): void {
    super.componentDidMount();
    this.init3D();
    this.initPresentationScene();
    // this.initControls();
    this.animate();
  }

  animate(): void {
    if (!this.looped || !this.state.isTabActive) return;

    // Move all landscape elements with their respective speeds
    for (const element of this.landscapeElements) {
      // Move the element
      element.object.position.x -= element.speed;

      // If an element has moved far enough away, reset its position
      if (element.object.position.x < -element.resetPosition) {
        element.object.position.x = element.resetPosition;
      }
    }

    // Handle the railway tracks movement for infinite scrolling
    if (this.trackSegments && this.trackSegments.length > 0) {
      const trackSpeed = 0.2; // Match with other elements

      for (let i = 0; i < this.trackSegments.length; i++) {
        const segment = this.trackSegments[i];

        // Move the segment
        segment.object.position.x -= trackSpeed;

        // Calculate when the segment has completely passed out of view
        // We use a threshold based on total track length to ensure a new segment
        // is already in place before the old one disappears
        if (segment.object.position.x < -segment.length * 1.5) {
          // Find the rightmost segment to position this one after it
          let rightmostX = -Infinity;
          for (let j = 0; j < this.trackSegments.length; j++) {
            if (j !== i && this.trackSegments[j].object.position.x > rightmostX) {
              rightmostX = this.trackSegments[j].object.position.x;
            }
          }

          // Position this segment just after the rightmost one
          segment.object.position.x = rightmostX + segment.length;
        }
      }
    }

    super.animate();
  }
}
