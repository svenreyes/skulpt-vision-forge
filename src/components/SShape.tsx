import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Center, useGLTF } from "@react-three/drei";
import type { Group, Mesh, MeshStandardMaterial, Vector3Tuple } from "three";

interface SShapeProps {
  position?: Vector3Tuple;
  positionMd?: Vector3Tuple;
}

/**
 * A simple 3D "S" curve built from a CatmullRom spline and TubeGeometry.
 * Slowly rotates to create a subtle animated background object.
 * @param position - Position for mobile screens
 * @param positionMd - Position for desktop screens (md breakpoint and up)
 */
export function SShape({ position = [0, 0, 0], positionMd }: SShapeProps) {
  const [currentPosition, setCurrentPosition] = useState<Vector3Tuple>([0, 0, 0]);
  const { size } = useThree();
  const groupRef = useRef<Group>(null!);
  
  // Update position based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && positionMd) {
        setCurrentPosition(positionMd);
      } else {
        setCurrentPosition(position);
      }
    };
    
    // Set initial position
    handleResize();
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [position, positionMd]);
  // Load the GLB model from the public folder (Vite will copy this path verbatim in production)
  const { scene } = useGLTF("/skulpt.glb");

  // Enforce a consistent "clay" material look across the imported meshes
  useEffect(() => {
    if (!scene) return;
    scene.traverse((obj) => {
      const mesh = obj as Mesh;
      const mat = (mesh as any).material as MeshStandardMaterial | MeshStandardMaterial[] | undefined;
      if (!mat) return;
      const applyClay = (m: MeshStandardMaterial) => {
        if (!m) return;
        m.color.set("#ffffff");
        m.roughness = 0.9; // matte
        m.metalness = 0.0; // non-metallic
        m.envMapIntensity = 0.2; // subtle environment response
      };
      if (Array.isArray(mat)) mat.forEach(applyClay);
      else applyClay(mat);
    });
  }, [scene]);

  // Rotate the model smoothly around the Y-axis
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.95; // 3% slower rotation
  });

  return (
    <group ref={groupRef} dispose={null} position={currentPosition}>
      {/* “Center” centers the model and applies a uniform scale so it fits the viewport */}
      <Center scale={.18}>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

// Preload the asset so it’s cached before the canvas mounts
useGLTF.preload("/skulpt.glb");
