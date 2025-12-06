# WebAssembly with React and Three.js Example

This is a simple example of using WebAssembly with React and Three.js to create an interactive 3D visualization.

## Overview

The example demonstrates:
1. Compiling C code to WebAssembly using Emscripten
2. Loading a WebAssembly module in a React component
3. Using WebAssembly functions to generate and animate a 3D sphere
4. Integrating WebAssembly with Three.js for rendering

## Project Structure

- `wasm/sphere.c` - C code that defines functions for generating and animating a sphere
- `wasm/build.sh` - Shell script to compile the C code to WebAssembly
- `page.tsx` - React component that loads and uses the WebAssembly module

## How to Build the WebAssembly Module

1. Install Emscripten: https://emscripten.org/docs/getting_started/downloads.html
2. Navigate to the `wasm` directory:
   ```
   cd src/app/projects/webAssembley/wasm
   ```
3. Make the build script executable:
   ```
   chmod +x build.sh
   ```
4. Run the build script:
   ```
   ./build.sh
   ```

This will compile the C code to WebAssembly and copy the resulting files to the `public/wasm` directory.

## How it Works

1. The C code defines three main functions:
   - `calculateSphereVertices`: Calculates the vertices of a sphere
   - `calculateSphereColors`: Calculates colors for each vertex based on its position
   - `animateSphere`: Animates the sphere by applying a sine wave displacement to each vertex

2. The React component:
   - Loads the WebAssembly module
   - Allocates memory for the vertices and colors
   - Calls the WebAssembly functions to generate the sphere
   - Creates a Three.js geometry and material using the WebAssembly-generated data
   - Animates the sphere using the WebAssembly function
   - Properly manages WebAssembly memory allocation and deallocation

## Performance Benefits

Using WebAssembly for the vertex calculations and animations provides several benefits:
- Faster execution compared to JavaScript for computationally intensive tasks
- Reduced garbage collection pauses
- More predictable performance

## Memory Alignment Considerations

When working with WebAssembly memory and typed arrays like Float32Array, it's important to consider memory alignment:

- Float32Array requires 4-byte alignment (the byte offset must be a multiple of 4)
- WebAssembly memory is byte-addressed, and pointers returned by `_malloc` are byte addresses
- To create a Float32Array view of WebAssembly memory:
  - Convert byte addresses to Float32Array indices by dividing by 4 (bytes per float)
  - Use `HEAPF32.subarray(index, index + length)` instead of creating a new Float32Array with a byte offset
- When copying data to Three.js buffers, use `Float32Array.from()` to ensure proper alignment

Failing to handle memory alignment correctly can result in errors like:
```
RangeError: start offset of Float32Array should be a multiple of 4
```

## Further Improvements

This example could be extended in several ways:
- Add more complex geometry generation
- Implement physics simulations in WebAssembly
- Add user interaction with the WebAssembly module
- Optimize memory usage and transfers between JavaScript and WebAssembly
