precision mediump float; // perfomaance dependent

//varying float vRandom;
varying vec2 vUv;
varying float vElevation;

uniform vec3 uColor;
uniform sampler2D uTexture;

uniform float uTime;

void main() {
//    gl_FragColor = vec4(vRandom, vRandom * .5, 1., 1.0);
    vec3 textureColor = texture2D(uTexture, vUv).rgb;
    textureColor *= vElevation * 2.0 + .5;
    gl_FragColor = vec4(textureColor, 1.0);
}
