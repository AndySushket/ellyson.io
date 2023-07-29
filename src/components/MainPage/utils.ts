import * as THREE from "three";

export function mapCubeUV_v1(
  geometry: THREE.BufferGeometry,
  cubeH: number = 0
): THREE.BufferGeometry {
  // converting all vertices into polar coordinates
  // geometry.faceVertexUvs[0] = []; // This clears out any UV mapping that may have already existed on the object

  // walking through all the faces defined by the object
  // ... we need to define a UV map for each of them
  const indexes = geometry.getIndex()?.array || [];
  const normal = geometry.getAttribute("normal")?.array || [];
  const position = geometry.getAttribute("position")?.array || [];
  const uvs = [];
  console.log(indexes.length, normal.length, position.length);
  for (let i = 0; i < indexes.length; i += 3) {
    const a = indexes[i];
    const b = indexes[i + 1];
    const c = indexes[i + 2];
    console.log("a, b, c", a, b, c);
    // const face = new THREE.Face(a, b, c);
    const faceSign = `${normal[a]}.${normal[b]}.${normal[c]}`;
    console.log("faceSign", faceSign);

    const ids = [a, b, c];
    for (let j = 0; j < ids.length; j++) {
      const vertexIndex = ids[j] * 3;
      const vertex = new THREE.Vector3(
        position[vertexIndex],
        position[vertexIndex + 1],
        position[vertexIndex + 1]
      );
      let tileIx = 0;
      let uvY = 0;
      let uvX = 0;
      switch (faceSign) {
        case "-1.0.0": // East
          uvY = vertex.y;
          uvX = vertex.z;
          tileIx = 0;
          break;
        case "0.0.1": // South
          uvY = vertex.y;
          uvX = vertex.x;
          tileIx = 1;
          break;
        case "1.0.0": // West
          uvY = vertex.y;
          uvX = -vertex.z;
          tileIx = 2;
          break;
        case "0.0.-1": // North
          uvY = vertex.y;
          uvX = -vertex.x;
          tileIx = 3;
          break;
        case "0.1.0": // Up
          uvY = -vertex.z;
          uvX = vertex.x;
          tileIx = 4.5; // "up" is 1.5 tile width distance from "north"
          break;
        case "0.-1.0": // Down
          uvY = vertex.z;
          uvX = vertex.x;
          tileIx = 6; // "down" if further 1.5 widths distance from "up"
          break;
      }
      uvY += cubeH / 2;
      uvX += cubeH / 2;
      uvY /= cubeH;
      uvX /= cubeH;
      uvX = (uvX + tileIx) / 8;
      uvs.push(uvX, uvY);
    }
  }
  console.log("uvs", uvs, geometry.getAttribute("uv"));
  geometry.setAttribute(
    "uv",
    new THREE.BufferAttribute(new Float32Array(uvs), 2)
  );
  // geometry.faces.forEach(function(face) {
  //
  //     var uvs = [];
  //
  //     var ids = [ 'a', 'b', 'c'],
  //         faceSign = face.normal.x+'.'+face.normal.y+'.'+face.normal.z;
  //
  //     for( var i = 0; i < ids.length; i++ ) {
  //
  //         // using the point to access the vertice
  //         var vertexIndex = face[ ids[ i ] ],
  //             vertex = geometry.vertices[ vertexIndex ],
  //             tileIx,
  //             uvY, uvX;
  //
  //         // face order in the image: West, East, Up, Down, South, North
  //         switch(faceSign) {
  //             case '1.0.0': // West
  //                 uvY = vertex.y;
  //                 uvX = -vertex.z;
  //                 tileIx = 0;
  //                 break;
  //             case '-1.0.0': // East
  //                 uvY = vertex.y;
  //                 uvX = vertex.z;
  //                 tileIx = 1;
  //                 break;
  //             case '0.1.0': // Up
  //                 uvY = -vertex.z;
  //                 uvX = vertex.x;
  //                 tileIx = 2;
  //                 break;
  //             case '0.-1.0': // Down
  //                 uvY = vertex.z;
  //                 uvX = vertex.x;
  //                 tileIx = 3;
  //                 break;
  //             case '0.0.1': // South
  //                 uvY = vertex.y;
  //                 uvX = vertex.x;
  //                 tileIx = 4;
  //                 break;
  //             case '0.0.-1': // North
  //                 uvY = vertex.y;
  //                 uvX = -vertex.x;
  //                 tileIx = 5;
  //                 break;
  //         }
  //
  //         // coordinate values range from [-cubeH/2, +cubeH/2]
  //         // here we're fixing moving the range to [0, +cubeH]
  //         uvY = uvY+cubeH/2;
  //         uvX = uvX+cubeH/2;
  //
  //         // each UV coordinate represents decimal range [0, +1]
  //         uvY = uvY/cubeH;
  //         uvX = uvX/cubeH;
  //
  //         // since the image contains multiple texture tiles (8 of them),
  //         // [uvX] must be adjusted to point to the part of the image
  //         // containing current tile
  //         uvX = (uvX + tileIx)/8;
  //
  //         uvs.push( uvX, uvY );
  //     }
  //
  //         geometry.faceVertexUvs[ 0 ].push( uvs );
  // });

  // geometry.uvsNeedUpdate = true;

  return geometry;
}

export function mapCubeUV_v2(
  geometry: {
    getIndex: () => { (): any; new (): any; array: never[] };
    getAttribute: (arg0: string) => { (): any; new (): any; array: never[] };
    setAttribute: (arg0: string, arg1: THREE.BufferAttribute) => void;
  },
  cubeH: number
) {
  // converting all vertices into polar coordinates
  // geometry.faceVertexUvs[0] = []; // This clears out any UV mapping that may have already existed on the object

  // walking through all the faces defined by the object
  // ... we need to define a UV map for each of them
  // geometry.faces.forEach(function(face) {
  //
  //     var uvs = [];
  //
  //     var ids = [ 'a', 'b', 'c'],
  //         faceSign = face.normal.x+'.'+face.normal.y+'.'+face.normal.z;
  //
  //     for( var i = 0; i < ids.length; i++ ) {
  //
  //         // using the point to access the vertice
  //         var vertexIndex = face[ ids[ i ] ],
  //             vertex = geometry.vertices[ vertexIndex ],
  //             tileIx,
  //             uvY, uvX;
  //
  //         // face order in the image: East, South, West, North, Up, Down
  //         switch(faceSign) {
  //             case '-1.0.0': // East
  //                 uvY = vertex.y;
  //                 uvX = vertex.z;
  //                 tileIx = 0;
  //                 break;
  //             case '0.0.1': // South
  //                 uvY = vertex.y;
  //                 uvX = vertex.x;
  //                 tileIx = 1;
  //                 break;
  //             case '1.0.0': // West
  //                 uvY = vertex.y;
  //                 uvX = -vertex.z;
  //                 tileIx = 2;
  //                 break;
  //             case '0.0.-1': // North
  //                 uvY = vertex.y;
  //                 uvX = -vertex.x;
  //                 tileIx = 3;
  //                 break;
  //             case '0.1.0': // Up
  //                 uvY = -vertex.z;
  //                 uvX = vertex.x;
  //                 tileIx = 4.5; // "up" is 1.5 tile width distance from "north"
  //                 break;
  //             case '0.-1.0': // Down
  //                 uvY = vertex.z;
  //                 uvX = vertex.x;
  //                 tileIx = 6; // "down" if further 1.5 widths distance from "up"
  //                 break;
  //         }
  //
  //         // coordinate values range from [-cubeH/2, +cubeH/2]
  //         // here we're fixing moving the range to [0, +cubeH]
  //         uvY = uvY+cubeH/2;
  //         uvX = uvX+cubeH/2;
  //
  //         // each UV coordinate represents decimal range [0, +1]
  //         uvY = uvY/cubeH;
  //         uvX = uvX/cubeH;
  //
  //         // since the image contains multiple texture tiles (8 of them),
  //         // [uvX] must be adjusted to point to the part of the image
  //         // containing current tile
  //         uvX = (uvX+tileIx)/8;
  //         console.log(uvX);
  //
  //         // if(faceSign!=='1.0.0') {
  //         // 	uvY = uvX = 0;
  //         // }
  //
  //         uvs.push( new THREE.Vector2( uvX, uvY ) );
  //     }
  //
  //     geometry.faceVertexUvs[ 0 ].push( uvs );
  // });
  //
  // geometry.uvsNeedUpdate = true;

  const indexes = geometry.getIndex()?.array || [];
  const normal = geometry.getAttribute("normal")?.array || [];
  const position = geometry.getAttribute("position")?.array || [];
  const uvs = [];
  for (let i = 0; i < indexes.length; i += 3) {
    const a = indexes[i];
    const b = indexes[i + 1];
    const c = indexes[i + 2];
    // const face = new THREE.Face(a, b, c);
    const faceSign = `${normal[a]}.${normal[b]}.${normal[c]}`;

    const ids = [a, b, c];
    for (let j = 0; j < ids.length; j++) {
      const vertexIndex = ids[j];
      const vertex = new THREE.Vector3(
        position[vertexIndex * 3],
        position[vertexIndex * 3 + 1],
        position[vertexIndex * 3 + 1]
      );
      let tileIx = 0;
      let uvY = 0;
      let uvX = 0;
      switch (faceSign) {
        case "-1.0.0": // East
          uvY = vertex.y;
          uvX = vertex.z;
          tileIx = 0;
          break;
        case "0.0.1": // South
          uvY = vertex.y;
          uvX = vertex.x;
          tileIx = 1;
          break;
        case "1.0.0": // West
          uvY = vertex.y;
          uvX = -vertex.z;
          tileIx = 2;
          break;
        case "0.0.-1": // North
          uvY = vertex.y;
          uvX = -vertex.x;
          tileIx = 3;
          break;
        case "0.1.0": // Up
          uvY = -vertex.z;
          uvX = vertex.x;
          tileIx = 4.5; // "up" is 1.5 tile width distance from "north"
          break;
        case "0.-1.0": // Down
          uvY = vertex.z;
          uvX = vertex.x;
          tileIx = 6; // "down" if further 1.5 widths distance from "up"
          break;
      }
      // here we're fixing moving the range to [0, +cubeH]
      uvY += cubeH / 2;
      uvX += cubeH / 2;

      // each UV coordinate represents decimal range [0, +1]
      uvY /= cubeH;
      uvX /= cubeH;
      uvX = (uvX + tileIx) / 8;
      uvs.push(uvX, uvY);
    }
  }
  geometry.setAttribute(
    "uv",
    new THREE.BufferAttribute(new Float32Array(uvs), 2)
  );

  return geometry;
}
