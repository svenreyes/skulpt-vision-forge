import { Canvas } from '@react-three/fiber';
import { SmokeBackground } from './SmokeBackground';

/**
 * Full-screen cloudy background using Three.js and a custom GLSL shader.
 * Place this at the root of any page, before all content, for a seamless effect.
 */
export function CloudyBackground() {
  return (
    <Canvas
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none', // Let UI elements be clickable
      }}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      }}
      camera={{ position: [0, 0, 8], fov: 50 }}
    >
      <SmokeBackground />
    </Canvas>
  );
}
