attribute vec3 center;

uniform sampler2D displacementMap;

varying vec3 vCenter;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vvNormal;
varying float vMapFix;
varying float vDist;
varying float worldHeight;
//varying float worldHeight;
varying vec3 worldPosition;
const float seamWidth = 0.01;

//#define PI 3.14159
//#define SIZE 4
#define PI 3.14159265358979323846264

float aTan2(float x, float y)
{
    if (y < 0. && x < 0.) {
        return atan(y, x) - PI;
    } else {
        return atan(y, x) + PI;
    }
}

vec2 PointToCoordinate(vec3 pointOnUnitSphere) {
    vec3 normilizedP = normalize(pointOnUnitSphere);
    float latitude = asin(normilizedP.y);
    float longitude = atan(normilizedP.x, normilizedP.z);
    return vec2(0.5 + (longitude / (2. * PI)), 0.5 + latitude / PI);
}

vec4 getHeight(vec2 uv) {
    vec4 texture = texture2D(displacementMap, uv);
    return texture;
}

//vec3 orthogonal(vec3 v) {
//    return normalize(abs(v.x) > abs(v.z) ? vec3(-v.y, v.x, 0.0)
//    : vec3(0.0, -v.z, v.y));
//}

vec3 displace(vec3 point) {
    //    float x2 =  point.x * point.x;
    //    float y2 =  point.y * point.y;
    //    float z2 =  point.z * point.z;
    //
    //    float newX = point.x * sqrt(1. - (y2 + z2) / 2. + y2 * z2 / 3.);
    //    float newY = point.y * sqrt(1. - (z2 + x2) / 2. + z2 * x2 / 3.);
    //    float newZ = point.z * sqrt(1. - (x2 + y2) / 2. + x2 * y2 / 3.);
    return normalize(point);
}

vec3 orthogonal(vec3 v) {
    return normalize(abs(v.x) > abs(v.z) ? vec3(-v.y, v.x, 0.0)
    : vec3(0.0, -v.z, v.y));
}

float map(float value, float min1, float max1, float min2, float max2) {
    return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

float normalize(float v) {
    return map(v, -1.0, 1.0, 0.0, 1.0);
}

void main() {
    vvNormal = normal;
//        vec3 displacedPosition = displace(position);
        //        vUv = PointToCoordinate(displacedPosition);
        float r = length (position);
        float c = -position.y / r;
        float theta = acos (c);
        float phi = atan(position.x, -position.z);
//        vUv =  vec2(1. - (0.5 + phi / 6.2831852),
//        theta / 3.1415926);

        float offset = .001;
        vec3 tangent = orthogonal(normal);
        vec3 bitangent = normalize(cross(normal, tangent));
        vec3 neighbour1 = position + tangent * offset;
        vec3 neighbour2 = position + bitangent * offset;
//        vec3 displacedNeighbour1 = displace(neighbour1);
//        vec3 displacedNeighbour2 = displace(neighbour2);
        vec3 displacedTangent = neighbour1 - position;
        vec3 displacedBitangent = neighbour2 - position;
        vec3 displacedNormal = normalize(cross(displacedTangent, displacedBitangent));
//        vec4 noiseTex = getHeight(vUv);
//        float noise = noiseTex.r ;
        vec3 newPosition2 = position;
//        vNormal = normalize(normalMatrix * displacedNormal);
        //        vNormal = normal;

//        float seam =
//        max (0.0, 1.0 - abs (displacedPosition.x / r) / 0.01) *
//        clamp (1.0 + (displacedPosition.z / r) / 0.01, 0.0, 1.0);
//        vMapFix =  -2.0 * log2(1.0 + c * c) -12.3 * seam;
//        worldPosition = ( vec4(displacedPosition, 1.)).xyz;
//
        float displaceFactor = 0.1;
        float displaceBias = 0.00;
//
//        vec3 R = worldPosition;
//        r = length(R);
//        c = -R.y / r;
//        theta = acos (c);
//        phi = atan (R.x, -R.z);
//        seam =
//        max (0.0, 1.0 - abs (R.x / r) / seamWidth) *
//        clamp (1.0 + (R.z / r) / seamWidth, 0.0, 1.0);

        worldHeight = texture2D(displacementMap, vec2 (
        1. - (0.5 + phi / 6.2831852),
        theta / 3.1415926
        )).r ;

        float heightMin = 0.;
        float heightMax = .2;


        float heightMeters = heightMin + (heightMax - heightMin) * sqrt(worldHeight);

vCenter = center;

        newPosition2.xyz += (displaceFactor * heightMeters - displaceBias) * normal;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition2 , 1.);

//        vDist = clamp(pow(normalize(dot(normalize(uLight) * vec3(1.,1.,1.) , newPosition2) * 2.), 1.), 0., 1.) ;
}