
precision mediump float;
uniform sampler2D map;
uniform sampler2D alphaMap;
uniform vec3 tipColor;
uniform vec3 bottomColor;
uniform float uLightIntensity;

struct DirectionalLight {
    vec3 direction;
    vec3 color;
};

struct PointLight {
    vec3 position;
    vec3 color;
    float distance;
    float decay;
};

uniform DirectionalLight directionalLights[1];
#if NUM_POINT_LIGHTS > 0
uniform PointLight pointLights[NUM_POINT_LIGHTS];
#endif
uniform vec3 ambientLightColor;

varying vec3 vNormal;
varying vec3 vWorldPosition; // World coordinates of each vertex
varying vec2 vUv;
varying float frc;

void main() {
    // Directional Light calculations
    vec3 lightDir = normalize(directionalLights[0].direction);
    float diff = max(dot(vNormal, lightDir), 0.0);
    vec3 dirLightEffect = directionalLights[0].color * diff * uLightIntensity;

    // Ambient Light
    vec3 ambient = ambientLightColor;

    // Point Lights calculations with attenuation
    vec3 pointLightEffect = vec3(0.0);

    #if NUM_POINT_LIGHTS > 0
        for (int i = 0; i < NUM_POINT_LIGHTS; i++) {

                vec3 pointLightDir = normalize(pointLights[i].position - vWorldPosition);
                float distance = length(pointLights[i].position - vWorldPosition);
                float attenuation = 1.0 / (1.0 + pointLights[i].decay * distance * distance);
                float pointDiff = max(dot(vNormal, pointLightDir), 0.0);

                pointLightEffect += pointLights[i].color * pointDiff * attenuation;
        }
    #endif
    // Проверка прозрачности с alpha карты
    float alpha = texture2D(alphaMap, vUv).r;
    if (alpha < 0.15) discard;

    // Получение цвета из текстуры
    vec4 col = texture2D(map, vUv);
    col = mix(vec4(tipColor, 1.0), col, frc);
    col = mix(vec4(bottomColor, 1.0), col, frc);

    // Объединение эффектов освещения с цветом текстуры
    vec3 finalColor = col.rgb * (ambient + dirLightEffect + pointLightEffect);

    gl_FragColor = vec4(finalColor, col.a);
}
