#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec3 emissiveColor;
uniform float emissiveIntensity;

const vec3 LIGHT_DIRECTION = normalize(vec3(0.5, 1.0, 0.75));
const vec3 BASE_COLOR = vec3(1.0, 1.0, 0.0);
const float ALPHA = 0.5;

varying vec3 vNormal;
varying vec3 vWorldPosition;
varying float isClipped;

void main() {
    if (isClipped > 0.1) {
        discard;
        return;
    }

    float lightIntensity = max(dot(normalize(vNormal), LIGHT_DIRECTION), 0.0);
    vec3 emissive = emissiveColor * emissiveIntensity;
    float distSq = dot(vWorldPosition, vWorldPosition);
    float distanceFactor = 1.0 / (1.0 + distSq);

    vec3 finalColor = BASE_COLOR * lightIntensity + emissive * (1.0 + distanceFactor);

    gl_FragColor = vec4(finalColor, ALPHA);
}
