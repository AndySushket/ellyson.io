'use client';

import { CircularProgress } from '@mui/material';
import * as THREE from 'three';
import React from 'react';
import TemplateFor3D from 'components/common/mainTemplate3D';

export default class Dance extends TemplateFor3D {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillUnmount() {
    super.componentWillUnmount();
  }

  initGeometry() {
    // 795.9213651874743, 1021.5712385410519
    const point = {
      x: 1.5564538592513628,
      y: 22.742208330381633,
    };

    const startPointsArr = [
      // {
      //   "x": 1.5564538592513628,
      //   "y": -0.1,
      //   "z": 22.742208330381633
      // },
      {
        x: -31.39306791813048,
        y: -0.1,
        z: 21.218319308114,
      },
      {
        x: -30.776311319564158,
        y: -0.1,
        z: -24.432775678657897,
      },
      {
        x: 12.259355150017937,
        y: -0.1,
        z: -12.901403602398219,
      },
      {
        x: 2.8923833249035784,
        y: -0.1,
        z: 22.05661116199472,
      },
    ];

    const point2 = [161.23, 63.271];

    const array1 = [
      // [
      //   [
      //     10.494764979378665,
      //     -11.968319060596018
      //   ],
      //   [
      //     54.520241082800084,
      //     -0.1717282922885488
      //   ],
      //   [
      //     66.18055670275885,
      //     -43.688618618263654
      //   ],
      //   [
      //     22.15508059933744,
      //     -55.48520938657112
      //   ]
      // ]
      [
        [9.001556032178037, -11.106214472973377],
        [-33.890687210691524, -22.599156411459564],
        [-33.7836, 24.0708],
        [-0.4240965879931009, 24.0708],
      ],
      [
        [13.285363073229842, -27.0936],
        [-33.901, -27.0936],
        [-33.89358521138573, -23.862141647561216],
        [9.317108211967032, -12.283871240385011],
      ],
      [
        [10.494764979378665, -11.968319060596018],
        [14.547571792385817, -27.0936],
        [17.2255, -27.0936],
        [17.2255, -10.164824047352653],
      ],
      [
        [0.8381121311628748, 24.0708],
        [10.17921279958967, -10.790662293184385],
        [17.2255, -8.90261532819668],
        [17.2255, 24.0708],
      ],
    ];

    const array2 = [
    //   [
    //   [
    //     0.8381121311628748,
    //     24.0708
    //   ],
    //   [
    //     10.17921279958967,
    //     -10.790662293184385
    //   ],
    //   [
    //     17.2255,
    //     -8.90261532819668
    //   ],
    //   [
    //     17.2255,
    //     24.0708
    //   ]
    // ],
      [
        [
          -46.68423569120216,
          20.61408508469426
        ],
        [
          -2.658759587780736,
          32.41067585300173
        ],
        [
          9.001556032178037,
          -11.106214472973377
        ],
        [
          -35.02392007124338,
          -22.902805241280845
        ]
      ],
      [
        [
          -34.70836789145439,
          -24.08046200869248
        ],
        [
          9.317108211967032,
          -12.283871240385011
        ],
        [
          20.977423831925805,
          -55.800761566360116
        ],
        [
          -23.048052271495614,
          -67.59735233466758
        ]
      ],
      [
        [
          -1.4811028203691023,
          32.72622803279072
        ],
        [
          42.54437328305232,
          44.52281880109819
        ],
        [
          54.20468890301109,
          1.0059284751230848
        ],
        [
          10.17921279958967,
          -10.790662293184385
        ]
      ],
      [
        [
          10.494764979378665,
          -11.968319060596018
        ],
        [
          54.520241082800084,
          -0.1717282922885488
        ],
        [
          66.18055670275885,
          -43.688618618263654
        ],
        [
          22.15508059933744,
          -55.48520938657112
        ]
      ]
    ]

    const array3 = [];

    const modules = [];

    const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xff00ff];

    const geometry3 = new THREE.BufferGeometry();

    for (let i = 0; i < array1.length; i += 1) {
      const positionArray1 = [];
      const curArr = array1[i];
      for (let j = 0; j < curArr.length; j += 1) {
        const point = curArr[j];
        console.log(point);
        positionArray1.push(point[0], point[1], 0);
      }
      positionArray1.push(curArr[0][0], curArr[0][1], 0);
      const geometry1 = new THREE.BufferGeometry();
      const vertices1 = new Float32Array(positionArray1);
      geometry1.setAttribute('position', new THREE.BufferAttribute(vertices1, 3));
      const material = new THREE.LineBasicMaterial({ color: colors[i] });
      const line1 = new THREE.Line(geometry1, material);
      this.scene.add(line1);
    }

    // array1.forEach((point) => {
    //   positionArray1.push(point[0], point[1], 0);
    // });

    array2.forEach((points, i) => {
      const positionArray2 = [];
      points.forEach((point) => {
        positionArray2.push(point[0], point[1], 0);
      });
      positionArray2.push(points[0][0], points[0][1], 0);
      // positionArray2.push(points[0][0], points[0][1], 0);
      const geometry2 = new THREE.BufferGeometry();
      const vertices2 = new Float32Array(positionArray2);
      geometry2.setAttribute('position', new THREE.BufferAttribute(vertices2, 3)); //.translate(-array2[0][0], -array2[0][1], 0);

      const material2 = new THREE.LineBasicMaterial({ color: colors[i] });
      const line2 = new THREE.Line(geometry2, material2);
      this.scene.add(line2);
    });

    const positionArray3 = [];

    array3.forEach((point) => {
      positionArray3.push(point[0], point[1], 0);
    });

    const vertices3 = new Float32Array(positionArray3);

    geometry3.setAttribute('position', new THREE.BufferAttribute(vertices3, 3)); //.translate(-array3[0][0], -array3[0][1], 0);

    const material3 = new THREE.LineBasicMaterial({ color: 0x0000ff });
    const line3 = new THREE.Line(geometry3, material3);

    this.scene.add(line3);

    const size = 10;
    const divisions = 10;

    const gridHelper = new THREE.GridHelper(size, divisions);

    this.scene.add(gridHelper);

    for (let i = 0; i < startPointsArr.length; i++) {
      const point = startPointsArr[i];
      const startPoints = new THREE.Mesh(
        new THREE.SphereGeometry(0.3, 32, 32),
        new THREE.MeshBasicMaterial({ color: colors[i] }),
      );
      startPoints.position.set(point.x, point.z, 0);
      this.scene.add(startPoints);
      this.camera.position.x = point.x;
      this.camera.position.y = point.y;

      this.camera.lookAt(point.x, point.y, 0);
    }

    const startPoints2 = new THREE.Mesh(
      new THREE.SphereGeometry(0.3, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
    );
    startPoints2.position.set(point2[0], point2[1], 0);

    this.scene.add(startPoints2);
    // this.camera.position.z = ;
    // x: 796.1422, y: -0.1, z: 1018.2891
    // this.camera.position.x = array1[0][0];
    // this.camera.position.y = array1[0][1];
    // this.controls.target.set(array1[0][0], array1[0][1], 0);
    // this.controls.update();

    for (let i = 0; i < modules.length; i++) {
      const module = modules[i];
      const positionArray = [];
      // module.forEach((point) => {
      //   positionArray.push(point[0], point[1], 0);
      // });
      console.log(module);

      positionArray.push(module[0][0], module[0][1], 0);
      positionArray.push(module[2][0], module[2][1], 0);
      positionArray.push(module[3][0], module[3][1], 0);
      positionArray.push(module[1][0], module[1][1], 0);

      const vertices = new Float32Array(positionArray);
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

      const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
      const line = new THREE.Line(geometry, material);

      this.scene.add(line);
    }
    const angle = 165;
    this.camera.rotateZ((angle * Math.PI) / 180);
    // this.camera.rotateZ(Math.PI);
  }

  componentDidMount() {
    super.componentDidMount();
    this.init3D({ antialias: true, alpha: true });
    // this.initControls();
    this.camera.position.z = 73;

    this.initGeometry();

    this.animate();
  }

  animate(timestamp, frame) {
    // console.log("animate", !this.looped , !this.state.isTabActive);
    // if (!this.looped || !this.state.isTabActive) return;
    // console.log("animate");

    this.renderer?.render(this.scene, this.camera);
    // this.controls?.update();
    requestAnimationFrame(() => this.animate());
  }

  render() {
    const { loadProcess } = this.state;
    return (
      <div>
        {loadProcess > 0 && loadProcess < 100 && (
          <CircularProgress
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            variant="determinate"
            value={loadProcess}
          />
        )}
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
