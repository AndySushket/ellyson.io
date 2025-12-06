#include <math.h>
#include <stdlib.h>
#include <emscripten.h>

// Define the function to calculate sphere vertices
EMSCRIPTEN_KEEPALIVE
void calculateSphereVertices(float* vertices, int resolution, float radius) {
    int index = 0;

    // Calculate vertices for a sphere
    for (int i = 0; i <= resolution; i++) {
        float phi = M_PI * i / resolution;
        float sinPhi = sin(phi);
        float cosPhi = cos(phi);

        for (int j = 0; j <= resolution; j++) {
            float theta = 2 * M_PI * j / resolution;
            float sinTheta = sin(theta);
            float cosTheta = cos(theta);

            // Calculate x, y, z coordinates
            float x = radius * sinPhi * cosTheta;
            float y = radius * cosPhi;
            float z = radius * sinPhi * sinTheta;

            // Store the vertex
            vertices[index++] = x;
            vertices[index++] = y;
            vertices[index++] = z;
        }
    }
}

// Function to calculate sphere color based on position
EMSCRIPTEN_KEEPALIVE
void calculateSphereColors(float* vertices, float* colors, int vertexCount) {
    for (int i = 0; i < vertexCount; i += 3) {
        float x = vertices[i];
        float y = vertices[i + 1];
        float z = vertices[i + 2];

        // Normalize position to get color values between 0 and 1
        float length = sqrt(x*x + y*y + z*z);
        float nx = x / length;
        float ny = y / length;
        float nz = z / length;

        // Map normalized position to RGB color
        colors[i] = (nx + 1.0) / 2.0;     // R
        colors[i + 1] = (ny + 1.0) / 2.0; // G
        colors[i + 2] = (nz + 1.0) / 2.0; // B
    }
}

// Function to animate the sphere by modifying vertices
EMSCRIPTEN_KEEPALIVE
void animateSphere(float* vertices, int vertexCount, float time, float amplitude) {
    for (int i = 0; i < vertexCount; i += 3) {
        float x = vertices[i];
        float y = vertices[i + 1];
        float z = vertices[i + 2];

        // Calculate distance from origin
        float length = sqrt(x*x + y*y + z*z);

        // Normalize to get direction
        float nx = x / length;
        float ny = y / length;
        float nz = z / length;

        // Apply sine wave based on time and position
        float displacement = amplitude * sin(nx * 5 + time) * cos(ny * 5 + time) * sin(nz * 3 + time);

        // Update vertex position
        vertices[i] = x * (1.0 + displacement);
        vertices[i + 1] = y * (1.0 + displacement);
        vertices[i + 2] = z * (1.0 + displacement);
    }
}
