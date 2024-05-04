import {
	LinearFilter,
	Mesh,
	MeshBasicMaterial,
	NearestFilter,
	RGBAFormat,
	PlaneGeometry,
	WebGLRenderTarget,
} from 'utils/libs/threejs/three_v0.106';

class Portal extends Mesh {
	static setupGeometry() {
		Portal.geometry = new PlaneGeometry(1, 1, 1, 1);
	}

	constructor({
						width = 1,
						height = 1,
						textureWidth = 512,
						textureHeight = 512,
						position = [0, height * 0.5, 0],
						rotation = [0, 0, 0],
						scene,
						renderTarget,
					}) {
		if (!Portal.geometry) {
			Portal.setupGeometry();
		}
		if (!renderTarget) {
			renderTarget = new WebGLRenderTarget(
				textureWidth,
				textureHeight,
				{
					minFilter: LinearFilter,
					magFilter: NearestFilter,
					format: RGBAFormat,
				}
			);
		}
		super(
			Portal.geometry,
			new MeshBasicMaterial({
				map: renderTarget.texture,
			})
		);
		this.isPortal = true;
		this.scale.set(width, height, 1);
		this.position.set(...position);
		this.rotation.set(...rotation);
		this.renderTarget = renderTarget;
		this.scene = scene;
		this.visible = false;
	}
}

export default Portal;
