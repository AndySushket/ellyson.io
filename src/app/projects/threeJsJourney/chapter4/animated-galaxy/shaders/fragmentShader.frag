varying vec3 vColor;

void main() {
        //circle shape
    float strength = distance(gl_PointCoord, vec2(0.5));
    strength = step(0.5, strength);
    strength = 1.0 - strength;

    //diffuse point
    float strength2 = distance(gl_PointCoord, vec2(0.5));
    strength2 *= 2.0;
    strength2 = 1.0 - strength2;

    //final color
    float strength3 = distance(gl_PointCoord, vec2(0.5));
    strength3 = 1. - strength3;
    strength3 = pow(strength3, 10.0);

    gl_FragColor = vec4(vec3(strength3) * vColor , 1.0);
    #include <colorspace_fragment>
}
