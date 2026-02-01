uniform float uSize;

attribute float scale;

varying vec3 vColor;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPositon = projectionMatrix * viewPosition;

    vColor = color;

    gl_PointSize = uSize * scale;
    gl_PointSize *= (1./ -viewPosition.z);

    gl_Position = projectedPositon;
}
