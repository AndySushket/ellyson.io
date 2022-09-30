uniform sampler2D displacementMap;
uniform sampler2D map;
uniform float cube;

varying vec3 vNormal;
varying vec3 vvNormal;
varying float vMapFix;
varying vec3 worldPosition;
//varying float worldHeight;

varying vec2 vUv;
const float seamWidth = 0.01;


//const float seamWidth = 0.01;
void main() {

//    void main () {
//

//        float c = -R.y / r;
//        float theta = acos (c);
//        float phi = atan (R.x, -R.z);
//        float seam =
//        max (0.0, 1.0 - abs (R.x / r) / seamWidth) *
//        clamp (1.0 + (R.z / r) / seamWidth, 0.0, 1.0);
//        gl_FragColor = texture2D (map, vec2 (
//        1. - (0.5 + phi / 6.2831852),
//        theta / 3.1415926
//        ), );
//    }
//`
//});

    if(cube > 0.) {
        vec3 R = worldPosition;
        float r = length (R);
        float c = -R.y / r;
        float theta = acos (c);
        float phi = atan (R.x, -R.z);
        float seam =
        max (0.0, 1.0 - abs (R.x / r) / seamWidth) *
        clamp (1.0 + (R.z / r) / seamWidth, 0.0, 1.0);
        gl_FragColor = texture2D (map, vec2 (
        1. - (0.5 + phi / 6.2831852),
        theta / 3.1415926
        ), -2.0 * log2(1.0 + c * c) -12.3 * seam);
//        worldHeight = texture2D (map, vec2 (
//        1. - (0.5 + phi / 6.2831852),
//        theta / 3.1415926
//        ), -2.0 * log2(1.0 + c * c) -12.3 * seam).r;
    } else {
        gl_FragColor = vec4( texture2D (map, vUv));
    }




//    vec4 texture = texture2D( map, vUv.xy, vMapFix );
//    gl_FragColor = vec4(vUv, texture.z, 1.);
//    gl_FragColor = vec4(vNormal,  1.);
//    gl_FragColor = vec4(texture);
}