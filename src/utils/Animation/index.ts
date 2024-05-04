import * as TWEEN from "@tweenjs/tween.js";
import { Camera, Euler, Vector3 } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const EASING = {
  QuadraticOut: TWEEN.Easing.Quadratic.Out,
  ExponentialOut: TWEEN.Easing.Exponential.Out
}

class Animation {
  tween: TWEEN.Tween<any> | undefined = undefined;

  onStartAnimate: () => void = () => {};

  onStopAnimation: () => void = () => {};

  removeCallbackOnLastChainedTween = () => {
    // @ts-ignore
    if (this.tween && this.tween._chainedTweens.length > 0) {
      const chainedTween =
        // @ts-ignore
        this.tween._chainedTweens[this.tween._chainedTweens.length - 1];
      chainedTween._onCompleteCallback = () => null;
      // @ts-ignore
      return this.tween._chainedTweens.length;
    }
    return 0;
  };

  getNewTween = (
    start: any,
    end: any,
    ms: number,
    callback: () => void,
    callbackComplete = () => {},
    easing: (amount: number) => number = EASING.QuadraticOut
  ) =>
    new TWEEN.Tween(start)
      .to(end, ms)
      .interpolation(TWEEN.Interpolation.CatmullRom)
      .onUpdate(callback)
      .easing(easing)
      .start()
      .onComplete(() => {
        this.tween = undefined;
        this.onStopAnimation && this.onStopAnimation();
        callbackComplete();
      });

  initTween = (camera: Camera) => {
    if (!this.tween) {
      this.tween = new TWEEN.Tween(camera);
      this.onStartAnimate?.();
    }
    this.removeCallbackOnLastChainedTween();
  };

  setStartStopAnimation = (
    onStartAnimate: () => void,
    onStopAnimation: () => void,
  ) => {
    this.onStartAnimate = onStartAnimate;
    this.onStopAnimation = onStopAnimation;
  };

  updateAnimation = () => TWEEN.update();

  rotateCamera = ({
    startRotation,
    endRotation,
    camera,
    controls,
    callbackComplete = () => {},
    angle,
  }: {
    startRotation: Euler;
    endRotation: Euler;
    camera: Camera;
    controls: OrbitControls;
    callbackComplete: () => void;
    angle: number;
  }) => {
    this.initTween(camera);
    // @ts-ignore
    this.tween._chainedTweens.push(
      this.getNewTween(
        startRotation,
        endRotation,
        700,
        () => {
          camera.rotation.set(
            startRotation.x,
            startRotation.y,
            startRotation.z,
          );
        },
        () => {
          if (controls) {
            // controls.setTarget(camera.position.x, 0, camera.position.z);
            // controls.rotate(angle);
          }
          callbackComplete();
        },
      ),
    );
  };

  moveCamera = (
    nextPosition: Vector3,
    camera: Camera,
    callbackComplete = () => {},
    ms: number = 700,
    easing?: (amount: number) => number
  ) => {
    const cameraPosition = camera.position.clone();

    this.initTween(camera);
    // @ts-ignore
    this.tween._chainedTweens.push(
      this.getNewTween(
        cameraPosition,
        nextPosition,
          ms,
        () => {
          camera.position.copy(cameraPosition);
        },
        () => {
          callbackComplete();
        },
          easing
      ),
    );
  };

  removeAll = () => {
    TWEEN.removeAll();
    this.tween = undefined;
    this.onStartAnimate = () => {};
    this.onStopAnimation = () => {};
  };
}

const AnimationUtil = new Animation();

export default AnimationUtil;
