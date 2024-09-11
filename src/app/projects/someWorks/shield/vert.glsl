varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
void main() {
    vUv = uv;
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vec4 modelNormal = modelMatrix * vec4(normal, 0.0);
    vec4 mvPosition = viewMatrix * worldPos;
    gl_Position = projectionMatrix * mvPosition;
    vNormal = modelNormal.xyz;
    vPosition = worldPos.xyz;
}
