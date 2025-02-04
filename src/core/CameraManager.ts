import { Camera } from 'three';
import { uuidv4 } from '@firebase/util';

class CameraManager {
  private cameras: Map<string, Camera>;

    constructor(camera: Camera,) {
      this.cameras = new Map();
      this.cameras.set('main', camera);
    }

    getMainCamera(): Camera {
      return this.cameras.get('main') as Camera;
    }

    addCamera(name: string, camera: Camera): string {
      if(!name) name = uuidv4();
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
