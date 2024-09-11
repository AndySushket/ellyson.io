uniform sampler2D uDepthTexture;
uniform vec2 uResolution;
uniform float uNear;
uniform float uFar;
uniform vec3 uShieldColor;
uniform vec3 uRimColor;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

#include <packing>


float LinearizeDepth(float depth) {
    float zNdc = 2.0 * depth - 1.0;
    float zEye = (2.0 * uFar * uNear) / ((uFar + uNear) - zNdc * (uFar - uNear));
    float linearDepth = (zEye - uNear) / (uFar - uNear);
    return linearDepth;
}

void main() {

    vec3 normal = normalize(vNormal);
    if(gl_FrontFacing) {
        normal *= -1.0;
    }

    vec3 viewDirection = normalize(cameraPosition - vPosition);
    float fresnel = 1. + dot(normal, viewDirection);
    fresnel = pow(fresnel, 4.0);

    vec2 worldCoords = gl_FragCoord.xy/uResolution;

    float sceneDepth = LinearizeDepth(texture2D(uDepthTexture, worldCoords).r);
    float bubbleDepth = LinearizeDepth(gl_FragCoord.z);

    float difference = abs( sceneDepth - bubbleDepth);
    float threshold = 0.0001;
    float normalizedDistance = clamp(difference / threshold, 0.0, 1.0);
    vec4 intersection = mix(vec4(1.0), vec4(0.0), normalizedDistance) ;
    intersection.rgb *= uRimColor;
    vec4 color = vec4(uShieldColor, 0.3);
    gl_FragColor = color + intersection + vec4(uRimColor, 1.0) * fresnel ;
}
