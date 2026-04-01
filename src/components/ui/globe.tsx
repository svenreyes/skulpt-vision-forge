import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import {
  AdditiveBlending,
  Color,
  Vector3,
  BufferGeometry,
  Float32BufferAttribute,
  LineBasicMaterial,
  Line,
  PointsMaterial,
  Points,
} from "three";

export type GlobeConfig = {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  initialPosition?: {
    lat: number;
    lng: number;
  };
  autoRotate?: boolean;
  autoRotateSpeed?: number;
};

interface WorldProps {
  globeConfig: GlobeConfig;
  data: unknown[];
}

function buildGridLines(radius: number, segments: number) {
  const latLines: number[][] = [];
  const lngLines: number[][] = [];

  for (let lat = -60; lat <= 60; lat += 30) {
    const ring: number[] = [];
    const phi = (90 - lat) * (Math.PI / 180);
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      ring.push(
        -(radius * Math.sin(phi) * Math.cos(theta)),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta),
      );
    }
    latLines.push(ring);
  }

  for (let lng = 0; lng < 360; lng += 30) {
    const arc: number[] = [];
    const theta = (lng + 180) * (Math.PI / 180);
    for (let i = 0; i <= segments; i++) {
      const phi = (i / segments) * Math.PI;
      arc.push(
        -(radius * Math.sin(phi) * Math.cos(theta)),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta),
      );
    }
    lngLines.push(arc);
  }

  return { latLines, lngLines };
}

function buildSurfaceParticles(count: number, radius: number) {
  const verts: number[] = [];
  for (let i = 0; i < count; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    verts.push(
      -(radius * Math.sin(phi) * Math.cos(theta)),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta),
    );
  }
  return new Float32Array(verts);
}

function GlobeScene({ globeConfig }: WorldProps) {
  const groupRef = useRef<any>(null);
  const atmosphereColor = globeConfig.atmosphereColor ?? "#ffffff";
  const rotateSpeed = globeConfig.autoRotateSpeed ?? 0.5;

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    if (globeConfig.autoRotate === false) return;
    groupRef.current.rotation.y += delta * rotateSpeed * 0.22;
  });

  const gridLines = useMemo(() => {
    const { latLines, lngLines } = buildGridLines(2.005, 96);
    const mat = new LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.13 });
    return [...latLines, ...lngLines].map((verts) => {
      const geom = new BufferGeometry();
      geom.setAttribute("position", new Float32BufferAttribute(verts, 3));
      return new Line(geom, mat);
    });
  }, []);

  const surfacePoints = useMemo(() => {
    const positions = buildSurfaceParticles(3000, 2.01);
    const geom = new BufferGeometry();
    geom.setAttribute("position", new Float32BufferAttribute(positions, 3));
    const mat = new PointsMaterial({
      color: 0xffffff,
      size: 0.05,
      transparent: true,
      opacity: 0.65,
      sizeAttenuation: true,
      depthWrite: false,
    });
    return new Points(geom, mat);
  }, []);

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshPhongMaterial
          color={new Color(globeConfig.globeColor ?? "#000000")}
          emissive={new Color(globeConfig.emissive ?? "#000000")}
          emissiveIntensity={globeConfig.emissiveIntensity ?? 0.05}
          shininess={globeConfig.shininess ?? 0.4}
        />
      </mesh>

      {gridLines.map((line, i) => (
        <primitive key={`grid-${i}`} object={line} />
      ))}

      <primitive object={surfacePoints} renderOrder={0} />

      <mesh renderOrder={1}>
        <sphereGeometry args={[2.16, 48, 48]} />
        <meshBasicMaterial
          color={new Color(atmosphereColor)}
          transparent
          opacity={0.06}
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

export function World(props: WorldProps) {
  const { globeConfig } = props;
  return (
    <Canvas
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
      camera={{ position: [0, 0, 6.9], fov: 45 }}
    >
      <ambientLight color={globeConfig.ambientLight ?? "#38bdf8"} intensity={0.6} />
      <directionalLight
        color={globeConfig.directionalLeftLight ?? "#ffffff"}
        position={[-4, 1.2, 4]}
      />
      <directionalLight
        color={globeConfig.directionalTopLight ?? "#ffffff"}
        position={[-1.8, 5, 2.2]}
      />
      <pointLight
        color={globeConfig.pointLight ?? "#ffffff"}
        position={[-2, 5, 2]}
        intensity={0.8}
      />
      <GlobeScene {...props} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate={false}
        minDistance={6.9}
        maxDistance={6.9}
        minPolarAngle={Math.PI / 2.6}
        maxPolarAngle={Math.PI / 1.8}
      />
    </Canvas>
  );
}

export function hexToRgb(hex: string) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (_m, r, g, b) {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function genRandomNumbers(min: number, max: number, count: number) {
  const arr: number[] = [];
  while (arr.length < count) {
    const r = Math.floor(Math.random() * (max - min)) + min;
    if (arr.indexOf(r) === -1) arr.push(r);
  }
  return arr;
}
