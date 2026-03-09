import { Canvas } from '@react-three/fiber';
import { SmokeBackground } from './SmokeBackground';

/**
 * Full-screen cloudy background using Three.js and a custom GLSL shader.
 * Place this at the root of any page, before all content, for a seamless effect.
 */
interface CloudyBackgroundProps {
  zIndex?: number;
  height?: string;
  dpr?: number | [number, number];
}

export function CloudyBackground({
  zIndex = 0,
  height = '100vh',
  dpr = [1, 1.5],
}: CloudyBackgroundProps = {}) {
  return (
    <Canvas
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height,
        zIndex,
        pointerEvents: 'none',
      }}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      }}
      dpr={dpr}
      camera={{ position: [0, 0, 8], fov: 50 }}
    >
      <SmokeBackground />
    </Canvas>
  );
}
