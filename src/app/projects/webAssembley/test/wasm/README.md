# WebAssembly Build Documentation

## Overview
This document provides information about the WebAssembly build process for the sphere visualization component. It explains how to build the WebAssembly module and troubleshoot common issues.

## Build Process

### Prerequisites
- Emscripten SDK must be installed and configured
- The build script sources the Emscripten environment from `/Users/andysushket/WebstormProjects/emsdk/emsdk_env.sh`

### Building the WebAssembly Module
To build the WebAssembly module:

1. Navigate to the wasm directory:
   ```bash
   cd /Users/andysushket/WebstormProjects/ellyson.io/src/app/projects/webAssembley/test/wasm
   ```

2. Make the build script executable (if it's not already):
   ```bash
   chmod +x build.sh
   ```

3. Run the build script:
   ```bash
   ./build.sh
   ```

The build script will:
- Compile the C code to WebAssembly
- Create the necessary output files (`sphere.js` and `sphere.wasm`)
- Create the `public/wasm` directory in the project root if it doesn't exist
- Copy the compiled files to the `public/wasm` directory

## Recent Fixes

### Issue: Files not being copied to the public directory
The build script was not correctly copying the WebAssembly files to the public directory. This was due to:

1. Incorrect relative path calculation when determining the project root directory
2. Potential issues when running the script from different directories

### Solution
The build script has been updated to:

1. Use absolute paths instead of relative paths
2. Correctly calculate the project root directory
3. Add checks to ensure the script is run from the correct directory
4. Include debug output to help troubleshoot issues

## Troubleshooting

### Files not being copied to the public directory
If the WebAssembly files are not being copied to the public directory:

1. Make sure you're running the script from the wasm directory:
   ```bash
   cd /Users/andysushket/WebstormProjects/ellyson.io/src/app/projects/webAssembley/test/wasm
   ./build.sh
   ```

2. Check the debug output to see where the script thinks the project root is:
   ```
   Script directory: /Users/andysushket/WebstormProjects/ellyson.io/src/app/projects/webAssembley/test/wasm
   Project root: /Users/andysushket/WebstormProjects/ellyson.io
   ```

3. Verify that the public/wasm directory exists and is writable:
   ```bash
   ls -la /Users/andysushket/WebstormProjects/ellyson.io/public/wasm
   ```

### WebAssembly module not loading in the browser
If the WebAssembly module is not loading in the browser:

1. Check that the files are in the correct location:
   ```bash
   ls -la /Users/andysushket/WebstormProjects/ellyson.io/public/wasm
   ```

2. Clear your browser cache or use incognito/private browsing mode to ensure the latest files are being loaded

3. Check the browser console for errors related to WebAssembly module loading or initialization

## WebAssembly Module Interface

The current WebAssembly module exports the following functions:
- `_calculateSphereVertices`: Calculates vertices for a sphere
- `_calculateSphereColors`: Calculates colors based on vertex positions
- `_animateSphere`: Animates the sphere by modifying vertices
- `_malloc`: Allocates memory in the WebAssembly heap
- `_free`: Frees allocated memory

And the following runtime methods:
- `ccall`: Calls a C function with parameters
- `cwrap`: Creates a JavaScript function that calls a C function
- `HEAP8`, `HEAPU8`, `HEAP16`, `HEAPU16`, `HEAP32`, `HEAPU32`, `HEAPF32`, `HEAPF64`: Provides access to the WebAssembly memory as typed arrays
