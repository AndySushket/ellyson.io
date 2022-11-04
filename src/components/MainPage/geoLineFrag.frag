uniform sampler2D displacementMap;
uniform sampler2D map;
uniform sampler2D nightMap;
uniform float cube;

varying vec3 vNormal;
varying vec3 vvNormal;
varying float vMapFix;
varying vec3 worldPosition;
varying float worldHeight;
varying float vDist;

//varying float worldHeight;

varying vec2 vUv;
const float seamWidth = 0.01;
///

varying vec3 vCenter;
//uniform float lineWidth;

float edgeFactorTri() {
    vec3 d = fwidth( vCenter.xyz );
    vec3 a3 = smoothstep( vec3( 0.0 ), d * 555., vCenter.xyz );
    return min( min( a3.x, a3.y ), a3.z );
}

void main() {
    float factor = edgeFactorTri();
    if (factor > 0.8) discard;// <===============
    gl_FragColor.rgb = mix(vec3(
    0.0), vec3(0.2), factor);
    glLineWidth = 14.;
    gl_FragColor.a = 1.0;
}