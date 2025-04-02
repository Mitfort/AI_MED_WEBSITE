import React, { useEffect, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader";

function DNAGenerator() {
  const { scene, camera } = useThree();
  const dnaRef = useRef(null);

  useEffect(() => {
    const loader = new PLYLoader();

    loader.load("src/assets/DNA.ply", (geometry) => {
      geometry.computeVertexNormals();
      geometry.scale(-1, 1, 1); 
      
      console.log("✅ Loaded PLY Geometry", geometry);
      console.log("Vertices:", geometry.attributes.position?.count || "❌ No vertices!");
      console.log("Faces:", geometry.index ? geometry.index.count / 3 : "❌ No faces!");
      
      const material = new THREE.MeshStandardMaterial({
        color: 0x00ff00,
        wireframe: true,
      });
      
      
      

      const mesh = new THREE.Mesh(geometry, material);
      mesh.rotateZ(70)
      mesh.position.set(0, 0, 0);
      mesh.scale.set(0.2,0.2,0.2); 



      scene.add(mesh);
      dnaRef.current = mesh;

      console.log("✅ DNA Model Loaded!");

      camera.position.set(0, 5, 15);
      camera.lookAt(0, 0, 0);
    });

    return () => {
      if (dnaRef.current) {
        scene.remove(dnaRef.current);
        dnaRef.current.geometry.dispose();
        dnaRef.current.material.dispose();
        console.log("🗑️ DNA Model Removed!");
      }
    };
  }, [scene, camera]);

  return null;
}

export default function DNA() {
  return (
    <div style={{ width: "100vw", height: "100vh", backgroundColor: "#222" }}>
      <Canvas camera={{ position: [0, 5, 15], fov: 50 }}>
        <ambientLight intensity={5} />
        <pointLight position={[0, 10, 10]} intensity={10} />
        <directionalLight position={[-10, 10, 10]} intensity={10} />

        <gridHelper args={[100, 50]} />

        <DNAGenerator />
      </Canvas>
    </div>
  );
}
