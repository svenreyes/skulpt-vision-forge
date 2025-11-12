import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useRef, useMemo } from 'react';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform float time;

  // 2D random noise
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }
  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }
  // Fractal Brownian Motion
  float fbm(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    float freq = 0.0;
    for (int i = 0; i < 6; i++) {
      value += amplitude * noise(st);
      st *= 2.0;
      amplitude *= 0.55;
    }
    return value;
  }
  void main() {
    // Scale and animate UVs for big, soft clouds
    float loopT = 36.0; // Increased from 24.0 to slow down the animation
    float t = mod(time, loopT);
    vec2 uv = vUv * 2.5;
    vec2 offset = vec2(
      sin(t * 2.0 * 3.14159 / loopT),
      cos(t * 2.0 * 3.14159 / loopT)
    ) * 0.8; // Reduced from 1.0 to make movement more subtle
    float n = fbm(uv + offset + 0.1 * sin(uv.yx + t * 0.1)); // Reduced from 0.15 to slow down
    float n2 = fbm(uv * 0.7 - offset * 0.3 - 0.1 * cos(uv.yx + t * 0.12)); // Reduced from 0.15 to slow down
    float cloud = smoothstep(0.3, 0.65, mix(n, n2, 0.5)); // Adjusted thresholds for softer clouds
    
    // Convert hex colors to RGB (0-1 range)
    vec3 color1 = vec3(0.7961, 0.8196, 0.8392); // #CBD1D6 (darker gray-blue)
    vec3 color2 = vec3(0.9686, 0.9725, 0.9765); // #F7F8F9 (lightest)
    vec3 color3 = vec3(0.9020, 0.9216, 0.9333); // #E6EBEE (medium)
    
    // Blend between the three colors based on noise
    vec3 color;
    if (cloud < 0.5) {
      color = mix(color1, color2, cloud * 2.0); // Dark to light transition
    } else {
      color = mix(color2, color3, (cloud - 0.5) * 2.0); // Light to medium transition
    }
    
    // Reduced opacity for a more subtle effect
    float alpha = 0.5 * cloud + 0.15;
    gl_FragColor = vec4(color, alpha);
  }
`;

export function SmokeBackground() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  // Create shader material
  const shaderMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        uniforms: {
          time: { value: 0 },
        },
      }),
    []
  );

  useFrame(({ clock }) => {
    if (shaderMaterial) {
      shaderMaterial.uniforms.time.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh position={[0, 0, -40]} scale={[100, 60, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <primitive object={shaderMaterial} attach="material" ref={materialRef} />
    </mesh>
  );
}
