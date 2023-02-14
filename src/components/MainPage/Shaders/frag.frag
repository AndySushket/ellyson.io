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


        float index = (worldPosition.z + worldPosition.z/80.);

        vec3 R = worldPosition;
        float r = length (R);
        float c = -R.y / r;
        float theta = acos (c);
        float phi = atan (R.x, -R.z);
        float seam =
        max (0.0, 1.0 - abs (R.x / r) / seamWidth) *
        clamp (1.0 + (R.z / r) / seamWidth, 0.0, 1.0);

        vec2 UV = vec2 (
        1. - (0.5 + phi / 6.2831852),
        theta / 3.1415926
        );

        vec4 dayTimeFragColor = texture2D (map, UV, -2.0 * log2(1.0 + c * c) -12.3 * seam);
        vec4 nightTimeFragColor = texture2D (nightMap, UV, -2.0 * log2(1.0 + c * c) -12.3 * seam);
        vec4 countriesFragColor = texture2D (countriesMap, UV, -2.0 * log2(1.0 + c * c) -12.3 * seam);

//        if (sqrt(worldHeight) < 0.05) {
//            discard;
//        }
//        dayTimeFragColor.a =  worldPosition.z;
//        nightTimeFragColor.a = - worldPosition.z;
//        worldHeight = texture2D (map, vec2 (
//        1. - (0.5 + phi / 6.2831852),
//        theta / 3.1415926
//        ), -2.0 * log2(1.0 + c * c) -12.3 * seam).r;
//        float c = vDist;
//        vec3 d = dayTimeFragColor.xyz * dayTimeFragColor.a + nightTimeFragColor.rgb * nightTimeFragColor.a * (0.5 - dayTimeFragColor.a);

        float intensity = 1.05 - dot(vvNormal, vec3(0.,0.,1.));
        vec3 atmpsphere = vec3(.3,.6,1.) * pow(intensity, 1.5);
        vec4 mixed = mix(nightTimeFragColor, dayTimeFragColor, vDist);
//        gl_FragColor = nightTimeFragColor + dayTimeFragColor;
//        gl_FragColor = vec4(vDist,0.,0.,1.);
//        gl_FragColor = vec4(d,1.);
        gl_FragColor = vec4(atmpsphere + mixed.xyz, mixed.w);
//
////        gl_FragColor = vec4( texture2D (map, vUv));
////        gl_FragColor = vec4(vDist,0.,0.,1.);
//        vec4 dayTimeFragColor = texture2D (map, vUv);
//        vec4 nightTimeFragColor = texture2D (nightMap, vUv);
////        gl_FragColor = mix(nightTimeFragColor, dayTimeFragColor, vDist);
//        gl_FragColor = vec4(0.,0.,0.,1.);
//




//    vec4 texture = texture2D( map, vUv.xy, vMapFix );
//    gl_FragColor = vec4(vUv, texture.z, 1.);
//    gl_FragColor = vec4(vNormal,  1.);
//    gl_FragColor = vec4(texture);
}