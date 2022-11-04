uniform vec3 lightPosition;

varying vec2 vUv;
varying vec3 vPosition01;
varying vec3 vPosition;
varying float vMax;
varying vec3 vNormal;
varying vec3 lightDirection;
varying vec3 cameraVector;


// chunk(shadowmap_pars_vertex);
void main( void ) {
    vUv = uv;
    vPosition01 = normalize(position)/2.0 + vec3(0.5,0.5,0.5);
    vPosition = position;
    lightDirection = normalize(lightPosition - vPosition);
    cameraVector = normalize(normalMatrix*cameraPosition - vPosition);
    vNormal = normal;
    // chunk(shadowmap_vertex);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}