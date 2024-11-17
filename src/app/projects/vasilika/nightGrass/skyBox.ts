import xpos from 'assets/img/skyBox/planet/nebula-xpos.png';
import xneg from 'assets/img/skyBox/planet/nebula-xneg.png';
import ypos from 'assets/img/skyBox/planet/nebula-ypos.png';
import yneg from 'assets/img/skyBox/planet/nebula-yneg.png';
import zpos from 'assets/img/skyBox/planet/nebula-zpos.png';
import zneg from 'assets/img/skyBox/planet/nebula-zneg.png';
import * as THREE from 'three';

function initSkyBox()  {
  const imageURLs = [];

  imageURLs.push(xpos.src);
  imageURLs.push(xneg.src);
  imageURLs.push(ypos.src);
  imageURLs.push(yneg.src);
  imageURLs.push(zpos.src);
  imageURLs.push(zneg.src);

  const textureCube: THREE.CubeTexture = new THREE.CubeTextureLoader().load(imageURLs);
  textureCube.mapping = THREE.CubeRefractionMapping;
  return textureCube;
}

export { initSkyBox };
