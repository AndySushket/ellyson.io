/**
 * Created by Ellyson on 5/11/2018.
 */

import React from "react";
import * as THREE from "three";
import { Button } from "react-bootstrap";
import TemplateFor3D from "app/templates/mainTemplate3D";
import fragmentShader from "./shaders/shader.frag";
import vertexShader from "./shaders/shader.vert";

const trek4 = require("assets/sounds/music/music4.mp3");
const trek2 = require("assets/sounds/music/music.mp3");
const trek1 = require("assets/sounds/music/04_Heaven.flac");
const trek3 = require("assets/sounds/music/Snow Patrol - What If This Storm Ends.mp3");

export default class LandSlide extends TemplateFor3D {
  static CUBE_COUNT = 464;

  constructor() {
    super();
    this.state = {
      checked: false,
      isTabActive: !document.hidden,
      treks: [trek1, trek2, trek3, trek4],
    };
    this.initObjects();
  }

  async initObjects() {
    this.scene.background = await new THREE.Color(0x121212);

    // this.initControls();
    this.initAudioObject();
    this.initCubes();
  }

  // initControls() {
    // super.initControls();
    //
    // this.camera.position.set(0, 4, 1);
  // }

  initAudioObject() {
    this.audio = new Audio(this.state.treks[0]);
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const audioSrc = this.audioCtx.createMediaElementSource(this.audio);
    this.analyser = this.audioCtx.createAnalyser();
    const bufferLength = this.analyser.frequencyBinCount;
    this.analyser.fftSize = this.analyser.frequencyBinCount;
    this.analyser.minDecibels = -90;
    this.analyser.maxDecibels = -10;
    this.analyser.smoothingTimeConstant = 0.92;
    this.dataArray = new Uint8Array(bufferLength);
    this.timeByteData = new Uint8Array(bufferLength);
    audioSrc.connect(this.analyser);
    this.analyser.connect(this.audioCtx.destination);
  }

  initCubes() {
    let x = 0;
    let z = 0;

    const instancedBoxGeo = new THREE.InstancedBufferGeometry().copy(
      new THREE.BoxGeometry(2, 1, 2)
    );
    instancedBoxGeo.instanceCount = 0;

    const position = new Float32Array(LandSlide.CUBE_COUNT * 3);
    const index = new Float32Array(LandSlide.CUBE_COUNT);

    for (let i = 0; i < LandSlide.CUBE_COUNT * 3; i += 3) {
      position[i] = x;
      position[i + 1] = 0.5;
      position[i + 2] = z;
      index[i] = i;
      index[i + 1] = i + 1;
      index[i + 2] = i + 2;
      x += 3;
      if (x >= 86) {
        z += 5;
        x = 0;
      }
      instancedBoxGeo.instanceCount++;
    }

    instancedBoxGeo.setAttribute(
      "boxPosition",
      new THREE.InstancedBufferAttribute(position, 3)
    );
    instancedBoxGeo.setAttribute(
      "boxIndex",
      new THREE.InstancedBufferAttribute(index, 1)
    );

    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: { freqData: new THREE.Uniform(this.dataArray) },
      vertexShader,
      fragmentShader,
    });

    const waveFormMesh = new THREE.Mesh(instancedBoxGeo, shaderMaterial);
    this.scene.add(waveFormMesh);
  }

  async componentDidMount() {
    super.componentDidMount()
    await this.init3D();

    await this.camera.position.set(86 / 2, 88 / 3, 84 * 1.2);
    await this.camera.lookAt(new THREE.Vector3(86 / 2, 0, 88 / 2));
    await this.animate();
    await this.audioCtx.resume().then(async () => {
      await this.playTrack(0);
    });
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    this.audio.pause();
    this.scene = null;
  }

  animate() {
    if (!this.looped || !this.state.isTabActive) return;
    super.animate();
    this.analyser?.getByteFrequencyData(this.dataArray); // frequency
    this.analyser?.getByteTimeDomainData(this.timeByteData); // waveform
  }

  async playTrack(trackNumber) {
    this.audio.src = await this.state.treks[trackNumber];
    await this.audio.play();
  }

  render() {
    return (
      <div>
        <header className="playList">
          <Button onClick={() => this.playTrack(0)}>
            Depeche Mode - Heaven
          </Button>
          <Button onClick={() => this.playTrack(1)}>
            Pendulum - Still Grey
          </Button>
          <Button onClick={() => this.playTrack(2)}>
            Snow Patrol - What If This Storm Ends
          </Button>
          <Button onClick={() => this.playTrack(3)}>
            Daft Punk - too Long
          </Button>
        </header>
        <div ref={ (ref) => {this.canvasDiv = ref}} className="canvasDiv" />
      </div>
    );
  }
}
