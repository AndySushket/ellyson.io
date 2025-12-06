# WebAssembly Integration Documentation

## Overview
This document provides information about the WebAssembly integration in the project, including recent fixes for memory access issues and recommendations for future development.

## Recent Fixes

### Issue: HEAPF32 is not available in the WebAssembly module
The application was encountering an error when trying to access the WebAssembly module's memory through the HEAPF32 property:
```
page.tsx:97 HEAPF32 is not available in the WebAssembly module. Make sure it is properly exported.
```

### Solution
1. **Export all heap views in the WebAssembly module**:
   - Updated the build.sh script to include all heap views in the EXPORTED_RUNTIME_METHODS flag:
   ```bash
   -s EXPORTED_RUNTIME_METHODS='["ccall", "cwrap", "HEAP8", "HEAPU8", "HEAP16", "HEAPU16", "HEAP32", "HEAPU32", "HEAPF32", "HEAPF64"]'
   ```

2. **Rebuilt the WebAssembly module**:
   - Ran the build.sh script to rebuild the WebAssembly module with the updated settings
   - Manually copied the updated files to the public/wasm directory to ensure the latest version is being used

## Recommendations for Further Testing

1. **Clear browser cache**:
   - The browser might be caching the old version of the WebAssembly files
   - Clear the browser cache or use incognito/private browsing mode to ensure the latest files are being loaded

2. **Check browser console for errors**:
   - Monitor the browser console for any errors related to WebAssembly module loading or initialization
   - Look for messages about HEAPF32 or memory access

3. **Verify module initialization**:
   - Add additional logging in the loadWasmModule method to verify that the module is being initialized correctly
   - Log the module object to see what properties are available

4. **Consider alternative memory access methods**:
   - If HEAPF32 continues to be unavailable, consider using other methods to access WebAssembly memory
   - For example, you could use the memory object directly or use the _malloc and _free functions to manage memory

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

## Additional Notes

The error about the manifest icon:
```
webAssembley:1 Error while trying to use the following icon from the Manifest: http://localhost:3001/logo.png (Resource size is not 
```
This is a separate issue related to the web app manifest and the logo.png resource. It's not directly related to the WebAssembly integration and should be addressed separately.
