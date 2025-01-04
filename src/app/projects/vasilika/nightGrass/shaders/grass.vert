precision mediump float;
attribute vec3 offset;
attribute vec4 orientation;
attribute float halfRootAngleSin;
attribute float halfRootAngleCos;
attribute float stretch;
uniform float time;
uniform float bladeHeight;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPosition; // Мировая позиция вертекса
varying float frc;

//WEBGL-NOISE FROM https://github.com/stegu/webgl-noise
//Description : Array and textureless GLSL 2D simplex noise function. Author : Ian McEwan, Ashima Arts. Maintainer : stegu Lastmod : 20110822 (ijm) License : Copyright (C) 2011 Ashima Arts. All rights reserved. Distributed under the MIT License. See LICENSE file. https://github.com/ashima/webgl-noise https://github.com/stegu/webgl-noise
vec3 mod289(vec3 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec2 mod289(vec2 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec3 permute(vec3 x) {
    return mod289(((x*34.0)+1.0)*x);
} float

snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1; i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz; x12.xy -= i1; i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5; vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox; m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g; g.x  = a0.x  * x0.x  + h.x  * x0.y; g.yz = a0.yz * x12.xz + h.yz * x12.yw; return 130.0 * dot(m, g);
}
//END NOISE

//https://www.geeks3d.com/20141201/how-to-rotate-a-vertex-by-a-quaternion-in-glsl/
vec3 rotateVectorByQuaternion( vec3 v, vec4 q){
    return 2.0 * cross(q.xyz, v * q.w + cross(q.xyz, v)) + v;
}

//https://en.wikipedia.org/wiki/Slerp
vec4 slerp(vec4 v0, vec4 v1, float t) {
    // Only unit quaternions are valid rotations.
    // Normalize to avoid undefined behavior.
    normalize(v0);
    normalize(v1);

    // Compute the cosine of the angle between the two vectors.
    float dot_ = dot(v0, v1);

    // If the dot product is negative, slerp won't take
    // the shorter path. Note that v1 and -v1 are equivalent when
    // the negation is applied to all four components. Fix by
    // reversing one quaternion.
    if (dot_ < 0.0) {
        v1 = -v1;
        dot_ = -dot_;
    }

    const float DOT_THRESHOLD = 0.9995;
    if (dot_ > DOT_THRESHOLD) {
        // If the inputs are too close for comfort, linearly interpolate
        // and normalize the result.
        vec4 result = t*(v1 - v0) + v0;
        normalize(result);
        return result;
    }

    // Since dot is in range [0, DOT_THRESHOLD], acos is safe
    float theta_0 = acos(dot_);       // theta_0 = angle between input vectors
    float theta = theta_0*t;          // theta = angle between v0 and result
    float sin_theta = sin(theta);     // compute this value only once
    float sin_theta_0 = sin(theta_0); // compute this value only once
    float s0 = cos(theta) - dot_ * sin_theta / sin_theta_0;  // == sin(theta_0 - theta) / sin(theta_0)
    float s1 = sin_theta / sin_theta_0;
    return (s0 * v0) + (s1 * v1);
}
//Функция для вращения нормали в соответствии с кватернионом
vec3 rotateNormalByQuaternion(vec3 normal, vec4 q) {
    return normal + 2.0 * cross(q.xyz, cross(q.xyz, normal) + q.w * normal);
}


void main() {
    // Расчет относительной позиции вдоль высоты травинки
    frc = position.y / float(bladeHeight);

    // Генерация шума для эффекта ветра
    float noise = 1.0 - (snoise(vec2((time - offset.x / 50.0), (time - offset.z / 50.0))));

    // Определение начального направления травинки
    vec4 direction = vec4(0.0, halfRootAngleSin, 0.0, halfRootAngleCos);
    direction = slerp(direction, orientation, frc);

    // Базовая позиция с учетом растяжения
    vec3 pos = vec3(position.x, position.y + position.y * stretch, position.z);
    pos = rotateVectorByQuaternion(pos, direction);

    // Применение эффекта ветра
    float halfAngle = noise * 0.15;
    pos = rotateVectorByQuaternion(pos, normalize(vec4(sin(halfAngle), 0.0, -sin(halfAngle), cos(halfAngle))));

    // Вычисление мировой позиции вертекса для освещения
    vWorldPosition = (modelMatrix * vec4(pos + offset, 1.0)).xyz;

    // Трансформируем нормали с учетом всех вращений и преобразуем в пространство камеры
    vNormal = normalize(normalMatrix * rotateNormalByQuaternion(normal, direction));

    // Передача UV координат
    vUv = uv;

    // Установка финальной позиции в clip space
    gl_Position = projectionMatrix  * viewMatrix  *vec4(vWorldPosition, 1.0);
}
