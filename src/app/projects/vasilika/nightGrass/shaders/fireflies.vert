#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

attribute vec3 offset;

const float FRUSTUM_MARGIN = 0.2;

varying vec3 vNormal;
varying vec2 vUv;
varying vec3 vWorldPosition;
varying float isClipped;

void main() {
    vec4 projected = projectionMatrix * viewMatrix * modelMatrix * vec4(position + offset, 1.0);

    if (abs(projected.x) > projected.w + FRUSTUM_MARGIN ||
    abs(projected.y) > projected.w + FRUSTUM_MARGIN ||
    abs(projected.z) > projected.w + FRUSTUM_MARGIN) {
        isClipped = 1.0;
        gl_Position = projected;
        return;
    }

    isClipped = 0.0;
    vNormal = normalize(normalMatrix * normal);
    vUv = uv;

    vec3 transformedPosition = position + offset;
    vWorldPosition = (modelMatrix * vec4(transformedPosition, 1.0)).xyz;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformedPosition, 1.0);
}
