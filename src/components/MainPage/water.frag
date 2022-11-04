#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D tex;
uniform float vRadius;

varying vec2 vUv;
varying vec3 vPosition01;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 lightDirection;


uniform vec3 lightPosition;
uniform vec4 lightColor;
uniform float lightIntensity;
uniform float time;

// chunk(shadowmap_pars_fragment);

vec4 getNormal( vec2 uv, float speed ) {
    float scaleFactor = 0.1;
    float x1 = uv.x +  sin(time*speed)*scaleFactor;
    float y1 = uv.y +  cos(time*speed)*scaleFactor;
    float x2 = uv.x -  sin(time*speed)*scaleFactor;
    float y2 = uv.y -  cos(time*speed)*scaleFactor;
    float x3 = uv.x -  sin(time*speed)*scaleFactor;
    float y3 = uv.y +  cos(time*speed)*scaleFactor;
    float x4 = uv.x +  sin(time*speed)*scaleFactor;
    float y4 = uv.y -  cos(time*speed)*scaleFactor;
    vec4 normal = texture2D(tex, vec2(x1, y2)) + texture2D(tex, vec2(x2, y2)) +
    texture2D(tex, vec2(x3, y3)) + texture2D(tex, vec2(x4, y4));

    normal.xyz = normal.xyz/4.0;
    return normal;
}


void main(void)
{
    vec3 blending = abs(vNormal);
    blending = (blending - 0.2) * 7.0;
    blending = max(blending, 0.0); // Force weights to sum to 1.0
    float b = (blending.x + blending.y + blending.z);
    blending /= vec3(b, b, b);

    float speed = 3.0;
    vec4 vec_texx = getNormal( vPosition01.yz, speed);
    vec4 vec_texy = getNormal( vPosition01.xz, speed);
    vec4 vec_texz = getNormal( vPosition01.xy, speed);

    vec4 normalTex = vec_texx * blending.x + vec_texy * blending.y + vec_texz * blending.z;

//    float a = max(0.1, dot(( (normalTex.rgb*2.0-1.0)+vNormal)/2.0, vec3(.75, 0., .75)));
    float a = max(0.1, dot( (normalTex.rgb)  , vec3(1.,1.,.0)));
    float opacity =  min(0.8, 0.9 - dot(vNormal , -1. * lightDirection));

    //vec4 color = vec4(0, 0.6, 0.701,1.0);
    vec4 color = vec4(0, 0.41, 0.851,1.0);
    color.xyz = color.xyz* .8;

    vec4 finalColor = lightColor*color*a;

    //        gl_FragColor = vec4(finalColor.xyz, 0.75);
    gl_FragColor = vec4(finalColor.xyz, finalColor.w * opacity * opacity);
}
