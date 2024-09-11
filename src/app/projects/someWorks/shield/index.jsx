// import { Canvas, useThree } from '@react-three/fiber'
// import './App.css'
// import { BakeShadows, CameraControls, TransformControls, useDepthBuffer } from '@react-three/drei'
// import { useControls } from 'leva';
// import { useEffect, useMemo, useRef } from 'react';
// import { Color, DoubleSide, NormalBlending, ShaderMaterial, Vector2 } from 'three';
// import vertexShader from './vert.glsl';
// import fragmentShader from './frag.glsl';
// import TemplateFor3D from "src/app/templates/mainTemplate3D";
//
// const rimColorImpl = new Color("#fff");
// const shieldColorImpl = new Color("#f00");
//
// export default class Shield extends TemplateFor3D {
// 	state = {
// 		radius: {
// 			value: 3,
// 			max: 5,
// 			min: 1,
// 		},
// 		shieldColor: "#ff0000",
// 		rimColor: "#ffffff"
// 	}
// 	initControls() {
// 		super.initControls();
// 		this.camera.position.set(0, 0, 770);
// 	}
//
// 	initShield(){
// 		const db = useDepthBuffer({ size: 1024 });
//
//
// 		//canvas size without three fiber
// 		// const size =
//
// 		const size = {
// 			width: renderer.domElement.clientWidth,
// 			height: renderer.domElement.clientHeight
// 		}
// 		const dpr = window.devicePixelRatio || 1;
//
//
// 		const uniforms = useMemo(
// 			() => ({
// 				uDepthTexture: {
// 					value: db,
// 				},
// 				uResolution: {
// 					value: new Vector2(size.width * dpr, size.height * dpr),
// 				},
// 				uNear: {
// 					value: this.camera.near,
// 				},
// 				uFar: {
// 					value: this.camera.far,
// 				},
// 				uShieldColor: {
// 					value: shieldColorImpl.setStyle(shieldColor),
// 				},
// 				uRimColor: {
// 					value: rimColorImpl.setStyle(rimColor),
// 				}
// 			}),
// 			[db, size, camera]
// 		);
//
// 		const materialRef = useRef<ShaderMaterial>(null!);
//
//
// 		useEffect(() => {
//
// 			materialRef.current.uniforms.uShieldColor.value = shieldColorImpl.setStyle(shieldColor);
// 			materialRef.current.uniforms.uRimColor.value = rimColorImpl.setStyle(rimColor);
// 		}, [rimColor, shieldColor]);
//
// 		const geometry = new THREE.SphereGeometry(radius, 64, 64);
// 		const material = new THREE.ShaderMaterial({
// 			vertexShader,
// 			fragmentShader,
// 			uniforms,
// 			transparent: true,
// 			blending: NormalBlending,
// 			depthWrite: false,
// 			side: DoubleSide
// 		});
// 		const mesh = new THREE.Mesh(geometry, material);
// 		mesh.position.set(0, -0.5, 0);
// 		this.scene.add(mesh);
// 	}
//
// 	componentDidMount() {
// 		super.componentDidMount()
// 		this.init3D();
//
// 		this.initControls();
// 		this.animate();
// 	}
//
// 	componentDidUpdate(prevProps, prevState) {
// 		if (prevState.rimColor !== this.state.rimColor || prevState.shieldColor !== this.state.shieldColor) {
// 			this.material.uniforms.uRimColor.value = this.state.rimColor;
// 			this.material.uniforms.uShieldColor.value = this.state.shieldColor;
//
// 		}
// 	}
// }
//
//
//
// const Shield = () => {
//
//
//
//
//
//
//
//
//
//
// 	return (
// 		<>
// 			<TransformControls mode="translate">
// 				<mesh position={[0, -0.5, 0]}>
// 					<sphereGeometry args={[radius, 64, 64]} />
// 					<shaderMaterial
// 						ref={materialRef}
// 						vertexShader={vertexShader}
// 						fragmentShader={fragmentShader}
// 						uniforms={uniforms}
// 						transparent={true}
// 						blending={NormalBlending}
// 						depthWrite={false}
// 						side={DoubleSide}
// 					/>
// 				</mesh>
// 			</TransformControls>
// 		</>
// 	);
// };
//
//
// const World = () => {
// 	const dist = 3;
// 	return (
// 		<>
// 			<mesh castShadow position={[0, 0, -dist]} >
// 				<boxGeometry  />
// 				<meshStandardMaterial color={"hotpink"} />
// 			</mesh>
// 			<mesh castShadow position={[dist, 0, 0]} >
// 				<coneGeometry  />
// 				<meshStandardMaterial color={"tomato"} />
// 			</mesh>
// 			<mesh castShadow rotation={[-Math.PI/2, 0, 0]} position={[0, 0, dist]} >
// 				<torusGeometry  />
// 				<meshStandardMaterial color={"yellowgreen"} />
// 			</mesh>
// 			<mesh castShadow position={[-dist, 0, 0]} >
// 				<cylinderGeometry  />
// 				<meshStandardMaterial color={"lightblue"} />
// 			</mesh>
// 			<mesh receiveShadow rotation={[-Math.PI/2, 0, 0]} position={[0, -0.5, 0]}>
// 				<planeGeometry args={[10, 10]} />
// 				<meshStandardMaterial color={"white"} />
// 			</mesh>
// 		</>
// 	)
// }
//
//
// function App() {
//
// 	return (
// 		<>
// 			<div
// 				style={{
// 					height: "100vh"
// 				}}
// 			>
// 				<Canvas
// 					gl={{
// 						antialias: true,
// 						depth: true,
// 						stencil: true,
// 						alpha: true
// 					}}
// 					shadows
// 					camera={{
// 						position: [0, 5, 5]
// 					}}
// 				>
// 					<color attach="background" args={["black"]} />
// 					<ambientLight intensity={0.5} />
// 					<directionalLight
// 						castShadow
// 						position={[2,2,2]}
// 						intensity={1}
// 						shadow-mapSize-width={2048}
// 						shadow-mapSize-height={2048}
// 					/>
// 					<World/>
// 					<Shield/>
// 					<CameraControls makeDefault />
// 					<BakeShadows/>
// 				</Canvas>
// 			</div>
// 		</>
// 	)
// }
//
// export default App
