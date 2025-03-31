import React, { useEffect, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader";

function DNAGenerator() {
  const { scene } = useThree();
  const dnaRef = useRef(null); // ✅ Keep track of the loaded mesh

  useEffect(() => {
    const loader = new PLYLoader();
    loader.load("/assets/DNA.ply", (geometry) => { // ✅ Use absolute path
      geometry.computeVertexNormals();

      const material = new THREE.MeshStandardMaterial({
        color: 0x333333,
        emissive: 0xffff00,
        metalness: 0.8,
        roughness: 0.4,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.scale.set(5, 5, 5); // ✅ Scale up the model
      mesh.position.set(0, 0, 0); // ✅ Center the model

      scene.add(mesh);
      dnaRef.current = mesh; // ✅ Store mesh reference

      console.log("DNA Model Loaded! ✅");
    });

    return () => {
      if (dnaRef.current) {
        scene.remove(dnaRef.current);
        dnaRef.current.geometry.dispose();
        dnaRef.current.material.dispose();
        console.log("DNA Model Removed! 🗑️");
      }
    };
  }, []);

  return null;
}

export default function DNA() {
  return (
    <div style={{ width: "100vw", height: "100vh", backgroundColor: "#000" }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={1.5} />  {/* ✅ Brighter lighting */}
        <directionalLight position={[5, 5, 5]} intensity={2} />

        <DNAGenerator />
      </Canvas>
    </div>
  );
}
