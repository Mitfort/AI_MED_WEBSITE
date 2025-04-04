import React, { useEffect, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader";
import { degToRad } from "three/src/math/MathUtils.js";

function DNAGenerator({ listSize, onSelect, componentTitles }) {
  const { scene, camera, raycaster } = useThree();
  const dnaRef = useRef(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [modelLoaded, setModelLoaded] = useState(false);

  useEffect(() => {
    const loader = new PLYLoader();
    loader.load("src/assets/DNA.ply", (geometry) => {
      geometry.computeVertexNormals();
      geometry.scale(-1, 1, 1);

      const colorPalette = [
        new THREE.Color(0xff0000), // 🔴 Contact
        new THREE.Color(0x00ff00), // 🟢 About
        new THREE.Color(0x0000ff), // 🔵 Projects
        new THREE.Color(0xffff00), // 🟡 Recrutation
      ];
      
      const colors = new Float32Array(geometry.attributes.position.count * 3);
      const segmentSize = Math.floor(geometry.attributes.position.count / listSize);

      for (let i = 0; i < geometry.attributes.position.count; i++) {
        const yPosition = geometry.attributes.position.array[i * 3 + 1]; // Get Y position
        const segmentIndex = Math.floor(i / segmentSize);
        let color;

        // Identify if vertex belongs to a vertical strand
        if (Math.abs(geometry.attributes.position.array[i * 3]) < 0.05) {
          color = new THREE.Color(0x000000); // 🖤 Make vertical strands black
        } else {
          color = colorPalette[segmentIndex % colorPalette.length]; // Keep rungs colored
        }

        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
      }

      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
            
      const material = new THREE.MeshStandardMaterial({
        vertexColors: true,
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.rotateZ(degToRad(90));
      mesh.rotateX(degToRad(150));
      mesh.scale.set(0.2, 0.2, 0.2);

      scene.add(mesh);
      dnaRef.current = mesh;
      setModelLoaded(true);

      camera.position.set(0, 5, 15);
      camera.lookAt(0, 0, 0);

      // ✅ Generate Labels (Bookmarks)
      const newBookmarks = [];
      for (let i = 0; i < listSize; i++) {
        const sprite = createLabel(componentTitles[i] || `Component ${i + 1}`);

        // 🎯 Aligned positions
        const ySpacing = 1.2; // adjust to control spacing between bookmarks
        const xOffset = ((-1)**(i+1))*(2.5);  // push labels out to the right side of the DNA
        const yPos =  1.25 - (i - listSize / 2) * ySpacing;
      
        sprite.position.set(xOffset, yPos, 0); // aligned to the side
        sprite.userData.index = i;
        sprite.material.color = colorPalette[i]
        scene.add(sprite);
        newBookmarks.push(sprite);
      }
      setBookmarks(newBookmarks);
    });

    return () => {
      if (dnaRef.current) {
        scene.remove(dnaRef.current);
        dnaRef.current.geometry.dispose();
        dnaRef.current.material.dispose();
      }
      bookmarks.forEach((sprite) => scene.remove(sprite));
    };
  }, [scene, camera, listSize, componentTitles]);

  const handleClick = (event) => {
    if (!dnaRef.current) return;

    raycaster.setFromCamera(
      {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      },
      camera
    );

    const intersects = raycaster.intersectObjects(bookmarks);

    if (intersects.length > 0) {
      const clickedSegment = intersects[0].object.userData.index;
      onSelect(clickedSegment);
    }
  };

  if(!modelLoaded) return null;

  return <primitive object={dnaRef.current} onPointerDown={handleClick} />;
}

function createLabel(text) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 512;
  canvas.height = 128;


  ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.font = "bold 48px Arial";
  ctx.textAlign = "center";
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.SpriteMaterial({ map: texture });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(2.5, 0.75, 1); // width, height, depth

  return sprite;
}

export default function DNA({ listSize, onSelect }) {
  const componentTitles = ["Contact", "About", "Projects", "Recrutation"]; // 🔥 Titles for labels

  return (
    <div style={{ width: "100vw", height: "100vh", backgroundColor: "#222" }}>
      <Canvas camera={{ position: [0, 5, 15], fov: 50 }}>
        <ambientLight intensity={5} />
        <pointLight position={[0, 10, 10]} intensity={10} />
        <directionalLight position={[-10, 10, 10]} intensity={10} />
        <DNAGenerator listSize={listSize} onSelect={onSelect} componentTitles={componentTitles} />
      </Canvas>
    </div>
  );
}
