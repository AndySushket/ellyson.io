'use client';

import * as THREE from 'three';
import React from 'react';
import TemplateFor3D from 'components/common/mainTemplate3D';

export default class Template extends TemplateFor3D {
  constructor(props: any) {
    super(props);
  }

  componentWillUnmount() {
    super.componentWillUnmount();
  }

  componentDidMount() {
    super.componentDidMount();
    this.init3D({ antialias: true, alpha: true });
  }

  animate() {
    if (!this.looped || !this.state.isTabActive) return;
    super.animate();
  }

  render() {
    return (
      <div>
        <div
          ref={(ref) => {
            this.canvasDiv = ref;
          }}
          className="canvasDiv"
        />
      </div>
    );
  }
}
