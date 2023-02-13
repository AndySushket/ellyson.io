varying vec3 vNormal;
varying vec3 vPosition;

void main(void)
{
    float checkLength = distance(vPosition, vec3(0.0,.0,.0));
    float intensity = pow(.5 -dot(vNormal, vec3(0.,0.,.9)), 3.0);
    if (intensity  > 1.2) {
        discard;
    }
    gl_FragColor = vec4(.3,.6,1.,1.) * intensity;
}