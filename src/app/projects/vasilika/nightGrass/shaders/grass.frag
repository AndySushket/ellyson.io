#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform sampler2D map;
uniform sampler2D alphaMap;
uniform vec3 tipColor;
uniform vec3 bottomColor;
uniform float uLightIntensity;
uniform int fireflyCount;
uniform sampler2D lightMap;

const float FIREFLY_MAX_DIST_SQ = 25.0; // 5.0 * 5.0
const float FIREFLY_DECAY = 0.4;
const vec3 FIREFLY_COLOR = vec3(1.0, 1.0, 0.0);

struct DirectionalLight {
    vec3 direction;
    vec3 color;
};

uniform DirectionalLight directionalLights[1];
uniform vec3 ambientLightColor;

varying vec3 vNormal;
varying vec3 vWorldPosition;
varying vec2 vUv;
varying float frc;
varying float isClipped;
varying vec2 vLightMapUv;

void main() {
    // Early exit
    if (isClipped > 0.1 || texture2D(alphaMap, vUv).r < 0.15) {
        discard;
        return;
    }

    // Pre-calculate normalized normal
    vec3 normalizedNormal = normalize(vNormal);

    // Base lighting calculation
    float diff = max(dot(normalizedNormal, normalize(directionalLights[0].direction)), 0.0);
    vec3 lighting = ambientLightColor + (directionalLights[0].color * diff * uLightIntensity);

    // Firefly glow calculation
    vec3 vGlowEffect = vec3(0.);

    vec3 lightInfluence = texture2D(lightMap, vLightMapUv).rgb;

    vGlowEffect += FIREFLY_COLOR * lightInfluence;

    // Texture and color blending
    vec4 texColor = texture2D(map, vUv);
    vec4 col = mix(
        vec4(bottomColor, 1.0),
        mix(vec4(tipColor, 1.0), texColor, frc),
        frc
    );

    // Final color
    gl_FragColor = vec4(col.rgb * (lighting + clamp(vGlowEffect, 0.0, 1.0)), col.a);
}
