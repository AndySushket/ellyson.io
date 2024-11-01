// modelViewMatrix is a matrix that contains the Mesh matrix (position, rotation, scale)
// viewMatrix is a matrix that contains the camera matrix (position, rotation, field of view, near, far).
// projectionMatrix is a matrix which transforms the 3D world into a 2D screen. (It clips space coordinates)
attribute float aRandom;

uniform vec2 uFrequency;
uniform float uTime;

//varying float vRandom;
varying vec2 vUv;
varying float vElevation;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float elevation = sin(uTime + modelPosition.x * uFrequency.x) * 0.1;
    elevation += sin(uTime + modelPosition.y * uFrequency.y) * 0.1;
    vElevation = elevation;

    modelPosition.z += elevation;

    vUv = uv;


//    modelPosition.z += aRandom * 0.1;
//    vRandom = aRandom;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;
}
