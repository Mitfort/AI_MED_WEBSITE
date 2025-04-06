import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function ClickableDNA() {
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01;
    }
  });

  const handleClick = () => {
    console.log("CLICKED DNA!");
  };

  return (
    <group ref={groupRef}>
      <mesh onPointerDown={handleClick} position={[-1, 0, 0]}>
        <boxGeometry />
        <meshStandardMaterial color="red" />
      </mesh>
      <mesh onPointerDown={handleClick} position={[1, 0, 0]}>
        <boxGeometry />
        <meshStandardMaterial color="blue" />
      </mesh>
    </group>
  );
}

export default function App() {
  return (
    <Canvas
      style={{
        width: "100vw",
        height: "100vh",
        pointerEvents: "auto",
        background: "#222",
      }}
      camera={{ position: [0, 0, 10], fov: 75 }}
      frameloop="always"
    >
      <ambientLight />
      <directionalLight position={[5, 5, 5]} />
      <ClickableDNA />
    </Canvas>
  );
}