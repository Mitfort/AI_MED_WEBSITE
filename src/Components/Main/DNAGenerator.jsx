// DNAGenerator.jsx
import React, { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader";
import { degToRad } from "three/src/math/MathUtils.js";

function DNAGenerator({ listSize = 4, onSelect = () => {} }) {
  const { scene, camera, gl } = useThree();
  const groupRef = useRef();
  const meshesRef = useRef({ left: null, right: null });
  const splitProgress = useRef(0);
  const isSplitting = useRef(false);

  // Load and prepare DNA model
  useEffect(() => {
    const loader = new PLYLoader();
    loader.load(
      "src/assets/DNA.ply", // Make sure this is accessible from public folder or served path
      (geometry) => {
        geometry.computeVertexNormals();
        geometry.scale(-1, 1, 1);

        // Apply rotation before splitting
        const tempMatrix = new THREE.Matrix4();
        tempMatrix.makeRotationZ(degToRad(90)).multiply(
          new THREE.Matrix4().makeRotationX(degToRad(150))
        );
        geometry.applyMatrix4(tempMatrix);

        const colorPalette = [
          new THREE.Color(0xff0000),
          new THREE.Color(0x00ff00),
          new THREE.Color(0x0000ff),
          new THREE.Color(0xffff00),
        ];

        const colors = new Float32Array(geometry.attributes.position.count * 3);
        const segmentSize = Math.floor(geometry.attributes.position.count / listSize);

        for (let i = 0; i < geometry.attributes.position.count; i++) {
          const x = geometry.attributes.position.array[i * 3];
          const segmentIndex = Math.floor(i / segmentSize);
          const color =
            Math.abs(x) < 0.05
              ? new THREE.Color(0x000000)
              : colorPalette[segmentIndex % colorPalette.length];
          colors[i * 3] = color.r;
          colors[i * 3 + 1] = color.g;
          colors[i * 3 + 2] = color.b;
        }

        geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

        // Split into left and right
        const positions = geometry.attributes.position.array;
        const colorsArr = geometry.attributes.color.array;
        const leftPos = [], rightPos = [], leftCol = [], rightCol = [];

        for (let i = 0; i < geometry.attributes.position.count; i++) {
          const x = positions[i * 3];
          const pos = [positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]];
          const col = [colorsArr[i * 3], colorsArr[i * 3 + 1], colorsArr[i * 3 + 2]];

          if (x < 0) {
            leftPos.push(...pos);
            leftCol.push(...col);
          } else {
            rightPos.push(...pos);
            rightCol.push(...col);
          }
        }

        function createMesh(posArray, colArray) {
          const geo = new THREE.BufferGeometry();
          geo.setAttribute("position", new THREE.Float32BufferAttribute(posArray, 3));
          geo.setAttribute("color", new THREE.Float32BufferAttribute(colArray, 3));
          geo.computeVertexNormals();

          const mat = new THREE.MeshStandardMaterial({ vertexColors: true, side: THREE.DoubleSide });
          const mesh = new THREE.Mesh(geo, mat);
          mesh.scale.set(0.2, 0.2, 0.2);
          // mesh.rotation.z = degToRad(90);
          // mesh.rotation.x = degToRad(150);

          mesh.cursor = "pointer";
          mesh.name = "dna-part";

          return mesh;
        }

        const left = createMesh(leftPos, leftCol);
        const right = createMesh(rightPos, rightCol);

        groupRef.current.add(left);
        groupRef.current.add(right);

        meshesRef.current = { left, right };

        camera.position.set(0, 5, 15);
        camera.lookAt(0, 0, 0);
      },
      undefined,
      (err) => console.error("PLY load error:", err)
    );
  }, [listSize, camera]);

  // Split animation
  useFrame(() => {
    if (!isSplitting.current) return;
    if (splitProgress.current >= 5) return;

    const delta = 0.05;
    meshesRef.current.left.position.x -= delta;
    meshesRef.current.right.position.x += delta;
    splitProgress.current += delta;
  });

  // Click triggers split
  const onClick = () => {
    if (isSplitting.current) return;
    console.log("DNA clicked");
    isSplitting.current = true;
    onSelect(0);
  };

  return (
    <group ref={groupRef} onPointerDown={onClick} />
  );
}

export default DNAGenerator;
