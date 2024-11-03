"use client";

import React from "react";
import * as THREE from "three";
import { Button } from "react-bootstrap";
import TemplateFor3D from 'components/common/mainTemplate3D';
import fragmentShader from "./shader.frag";
import vertexShader from "./shader.vert";

import trek4 from "assets/sounds/music/music4.mp3";
import trek2 from "assets/sounds/music/music.mp3";
import trek1 from "assets/sounds/music/04_Heaven.flac";
import trek3 from "assets/sounds/music/Snow Patrol - What If This Storm Ends.mp3";

export default class MusicVisualization extends TemplateFor3D {
  static CUBE_COUNT = 464;

  constructor() {
    super();
    this.state = {
      checked: false,
      isTabActive: true,
      treks: [trek1, trek2, trek3, trek4],
    };
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

  initAudioObject(trek) {
    if (this.audio && this.audioCtx && this.audioSrc) {
      delete this.audio;
      delete this.audioCtx;
      delete this.audioSrc;
    }
    this.audio = new Audio(this.state.treks[trek]);
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioCtx = new window.AudioContext();
    this.audioSrc = this.audioCtx.createMediaElementSource(this.audio);
    this.analyser = this.audioCtx.createAnalyser();
    const bufferLength = this.analyser.frequencyBinCount;
    this.analyser.fftSize = this.analyser.frequencyBinCount;
    this.analyser.minDecibels = -90;
    this.analyser.maxDecibels = -10;
    this.analyser.smoothingTimeConstant = 0.92;
    this.dataArray = new Uint8Array(bufferLength);
    this.timeByteData = new Uint8Array(bufferLength);
    this.audioSrc.connect(this.analyser);
    this.analyser.connect(this.audioCtx.destination);
    if (this.waveFormMesh) {
      this.waveFormMesh.geometry.attributes.frequencyData.array =
        this.dataArray;
    }
  }

  initCubes() {
    let x = 0;
    let z = 0;

    const instancedBoxGeo = new THREE.InstancedBufferGeometry().copy(
      new THREE.BoxGeometry(2, 1, 2)
    );
    instancedBoxGeo.instanceCount = 0;

    const position = new Float32Array(MusicVisualization.CUBE_COUNT * 3);
    const index = new Float32Array(MusicVisualization.CUBE_COUNT);

    for (let i = 0; i < MusicVisualization.CUBE_COUNT * 3; i += 3) {
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
    instancedBoxGeo.setAttribute(
      "frequencyData",
      new THREE.InstancedBufferAttribute(this.dataArray, 1)
    );

    const shaderMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      side: THREE.DoubleSide,
    });

    this.waveFormMesh = new THREE.Mesh(instancedBoxGeo, shaderMaterial);

    this.scene?.add(this.waveFormMesh);
  }

  async componentDidMount() {
    super.componentDidMount()
    this.init3D(undefined, {});
    await this.initObjects();
    // await super.initControls();
    this.camera.position.set(86 / 2, 88 / 3, 84 * 1.2);
    this.camera.lookAt(new THREE.Vector3(86 / 2, 0, 88 / 2));
    this.animate();
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    this.audio.pause();
    this.scene = null;
  }

  animate() {
    console.log("animate");
    if (!this.looped || !this.state.isTabActive) return;
    super.animate();
    this.analyser?.getByteFrequencyData(this.dataArray); // frequency
    this.analyser?.getByteTimeDomainData(this.timeByteData); // waveform

    if (this.waveFormMesh && this.waveFormMesh.geometry) {
      this.waveFormMesh.geometry.attributes.frequencyData.needsUpdate = true;
    }
  }

  async playTrack(trackNumber) {
    if (this.audio) {
      await this.audio.pause()
    }
    await this.initAudioObject(trackNumber);
    const promise = this.audio.play();
    if (promise !== undefined) {
      promise.catch(() => {
        this.renderer.domElement.click();
        setTimeout(() => this.playTrack(trackNumber), 1500);
      });
    }
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
