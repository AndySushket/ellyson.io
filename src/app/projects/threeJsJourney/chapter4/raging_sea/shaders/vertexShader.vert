#pragma glslify: cnoise = require('../../../../../../utils/shaderUtils/perlinNoise.glsl')

uniform float uTime;
uniform float uBigWavesElevation;
uniform vec2 uBigWavesFrequency;
uniform float uBigWavesSpeed;

uniform float uSmallWavesElevation;
uniform float uSmallWavesFrequency;
uniform float uSmallWavesSpeed;
uniform float uSmallWaveIterations;

varying float vElevation;

float classicNoise(vec2 uv) {
    return fract(sin(dot(uv ,vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float elavation =   sin(modelPosition.x * uBigWavesFrequency.x + uTime * uBigWavesSpeed) *
                        sin(modelPosition.z * uBigWavesFrequency.y + uTime * uBigWavesSpeed) *
                        uBigWavesElevation;

    for(float i = 1.; i <= uSmallWaveIterations; i++) {
        elavation -= abs(
            cnoise(
                vec3(
                    modelPosition.xz * uSmallWavesFrequency * i,
                    uTime * uSmallWavesSpeed
                )
            ) * uSmallWavesElevation / i
        );
    }

    modelPosition.y += elavation;
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPositon = projectionMatrix * viewPosition;

    vElevation = elavation;

    gl_Position = projectedPositon;
}
