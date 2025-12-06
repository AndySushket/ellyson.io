#!/bin/bash

source /Users/andysushket/WebstormProjects/emsdk/emsdk_env.sh

# Check if Emscripten is installed
if ! command -v emcc &> /dev/null; then
    echo "Error: Emscripten compiler (emcc) not found."
    echo "Please install Emscripten: https://emscripten.org/docs/getting_started/downloads.html"
    exit 1
fi

# Compile the C code to WebAssembly
emcc sphere.c \
    -o sphere.js \
    -s WASM=1 \
    -s EXPORTED_FUNCTIONS='["_calculateSphereVertices", "_calculateSphereColors", "_animateSphere", "_malloc", "_free"]' \
    -s EXPORTED_RUNTIME_METHODS='["ccall", "cwrap", "HEAP8", "HEAPU8", "HEAP16", "HEAPU16", "HEAP32", "HEAPU32", "HEAPF32", "HEAPF64"]' \
    -s ALLOW_MEMORY_GROWTH=1 \
    -s MODULARIZE=1 \
    -s EXPORT_NAME="createSphereModule" \
    -O3

# Get the absolute path to the project root directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../../../../../../" && pwd)"  # Go up 6 levels to reach the project root
PUBLIC_WASM_DIR="$PROJECT_ROOT/public/wasm"

echo "Script directory: $SCRIPT_DIR"

# Check if we're in the correct directory
if [[ ! -f "$SCRIPT_DIR/sphere.c" ]]; then
    echo "Error: This script must be run from the directory containing sphere.c"
    echo "Current directory: $(pwd)"
    echo "Expected directory: $SCRIPT_DIR"
    exit 1
fi

# Move the compiled files to the public directory
echo "Current directory: $(pwd)"
echo "Project root: $PROJECT_ROOT"
echo "Creating directory: $PUBLIC_WASM_DIR"
mkdir -p "$PUBLIC_WASM_DIR"
echo "Directory created, checking if it exists:"
ls -la "$PUBLIC_WASM_DIR" 2>/dev/null || echo "Directory not found or not accessible"

echo "Copying WebAssembly files to public directory"
cp "$SCRIPT_DIR/sphere.wasm" "$PUBLIC_WASM_DIR/" && echo "sphere.wasm copied successfully" || echo "Failed to copy sphere.wasm"
cp "$SCRIPT_DIR/sphere.js" "$PUBLIC_WASM_DIR/" && echo "sphere.js copied successfully" || echo "Failed to copy sphere.js"

echo "WebAssembly module built successfully!"
