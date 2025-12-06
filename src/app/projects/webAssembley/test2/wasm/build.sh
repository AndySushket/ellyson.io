#!/bin/bash

source /Users/andysushket/WebstormProjects/emsdk/emsdk_env.sh

# Check if Emscripten is installed
if ! command -v emcc &> /dev/null; then
    echo "Error: Emscripten compiler (emcc) not found."
    echo "Please install Emscripten: https://emscripten.org/docs/getting_started/downloads.html"
    exit 1
fi

# Get the absolute path to the project root directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../../../../../../" && pwd)"  # Go up 6 levels to reach the project root
PUBLIC_WASM_DIR="$PROJECT_ROOT/public/wasm"
NPM_WASM_DIR="$SCRIPT_DIR/../npm-wasm"

echo "Script directory: $SCRIPT_DIR"

# Check if we're in the correct directory
if [[ ! -f "$SCRIPT_DIR/sphere.c" ]]; then
    echo "Error: This script must be run from the directory containing sphere.c"
    echo "Current directory: $(pwd)"
    echo "Expected directory: $SCRIPT_DIR"
    exit 1
fi

# Create npm-wasm directory if it doesn't exist
mkdir -p "$NPM_WASM_DIR"

# Compile the C code to WebAssembly for npm usage
emcc sphere.c \
    -o "$NPM_WASM_DIR/sphere.js" \
    -s WASM=1 \
    -s EXPORTED_FUNCTIONS='["_calculateSphereVertices", "_calculateSphereColors", "_animateSphere", "_malloc", "_free"]' \
    -s EXPORTED_RUNTIME_METHODS='["ccall", "cwrap", "HEAP8", "HEAPU8", "HEAP16", "HEAPU16", "HEAP32", "HEAPU32", "HEAPF32", "HEAPF64"]' \
    -s ALLOW_MEMORY_GROWTH=1 \
    -s MODULARIZE=1 \
    -s EXPORT_ES6=1 \
    -s USE_ES6_IMPORT_META=0 \
    -s EXPORT_NAME="createSphereModule" \
    -O3

# Move the compiled files to the public directory for fallback
echo "Creating public directory: $PUBLIC_WASM_DIR"
mkdir -p "$PUBLIC_WASM_DIR"

echo "Copying WebAssembly files to public directory for fallback"
cp "$NPM_WASM_DIR/sphere.wasm" "$PUBLIC_WASM_DIR/" && echo "sphere.wasm copied successfully" || echo "Failed to copy sphere.wasm"
cp "$NPM_WASM_DIR/sphere.js" "$PUBLIC_WASM_DIR/" && echo "sphere.js copied successfully" || echo "Failed to copy sphere.js"

# Create an index.js file in the npm-wasm directory to make it importable
cat > "$NPM_WASM_DIR/index.js" << EOL
import createSphereModuleFactory from './sphere.js';
import wasmUrl from './sphere.wasm';

// Helper function to load the WebAssembly module
export async function loadSphereModule() {
  try {
    // Use the emscripten-wasm-loader pattern
    const createSphereModule = createSphereModuleFactory({
      locateFile: (path) => {
        if (path.endsWith('.wasm')) {
          return wasmUrl;
        }
        return path;
      }
    });

    return await createSphereModule();
  } catch (error) {
    console.error('Failed to load WebAssembly module:', error);
    throw error;
  }
}

export default loadSphereModule;
EOL

echo "WebAssembly module built successfully for npm usage!"
