import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Center, useGLTF } from "@react-three/drei";
import type { Group } from "three";

/**
 * A simple 3D "S" curve built from a CatmullRom spline and TubeGeometry.
 * Slowly rotates to create a subtle animated background object.
 */
export function SShape() {
  const groupRef = useRef<Group>(null!);
  // Load the GLB model from the public folder (Vite will copy this path verbatim in production)
  const { scene } = useGLTF("/skulpt.glb");

  // Rotate the model smoothly around the Y-axis
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 1.0; // Faster spin
  });

  return (
    <group ref={groupRef} dispose={null}>
      {/* “Center” centers the model and applies a uniform scale so it fits the viewport */}
      <Center scale={2}>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

// Preload the asset so it’s cached before the canvas mounts
useGLTF.preload("/skulpt.glb");
