import { Camera } from 'three';
import { uuidv4 } from '@firebase/util';

class CameraManager {
  private cameras: Map<string, Camera> = new Map();
  private activeCameraName: string | undefined;

  constructor(camera: Camera) {
    if (camera) {
      const cameraName = uuidv4();
      this.cameras.set(cameraName, camera);
      this.activeCameraName = cameraName;
    }
  }

  getActiveCamera(): Camera | undefined {
    return this.cameras.get(<string>this.activeCameraName);
  }

  addCamera(name: string, camera: Camera): string {
    if (!name) name = uuidv4();
    this.cameras.set(name, camera);
    return name;
  }

  removeCamera(name: string): void {
    this.cameras.delete(name);
  }

  getCamera(name: string): Camera | undefined {
    return this.cameras.get(name);
  }
}

export default CameraManager;
