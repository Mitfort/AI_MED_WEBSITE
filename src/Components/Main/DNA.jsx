// DNA.jsx
import React from "react";
import { Canvas } from "@react-three/fiber";
import DNAGenerator from "./DNAGenerator";

export default function DNA({ listSize, onSelect }) {
  return (
    <div style={{ width: "100vw", height: "100vh", backgroundColor: "transparent" }}>
      <Canvas frameloop="always" key='dna-canvas' camera={{ position: [0, 5, 15], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 10, 10]} intensity={0.8} />
        <directionalLight position={[-10, 10, 10]} intensity={0.8} />
        <DNAGenerator listSize={listSize} onSelect={onSelect} />
      </Canvas>
    </div>
  );
}
