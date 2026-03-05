import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { AdditiveBlending, Color, Vector3 } from "three";

type Position = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

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
  data: Position[];
}

function latLngToVec3(lat: number, lng: number, radius = 2.02) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

function ArcMesh({
  startLat,
  startLng,
  endLat,
  endLng,
  color,
}: {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color: string;
}) {
  const points = useMemo(() => {
    const a = latLngToVec3(startLat, startLng, 2.05);
    const b = latLngToVec3(endLat, endLng, 2.05);
    const mid = a.clone().add(b).multiplyScalar(0.5).normalize().multiplyScalar(2.45);
    return [a, mid, b];
  }, [startLat, startLng, endLat, endLng]);

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          itemSize={3}
          array={new Float32Array(points.flatMap((p) => [p.x, p.y, p.z]))}
        />
      </bufferGeometry>
      <lineBasicMaterial color={color} transparent opacity={0.75} />
    </line>
  );
}

function GlobeScene({ globeConfig, data }: WorldProps) {
  const groupRef = useRef<any>(null);
  const baseColor = globeConfig.globeColor ?? "#062056";
  const atmosphereColor = globeConfig.atmosphereColor ?? "#ffffff";
  const rotateSpeed = globeConfig.autoRotateSpeed ?? 0.5;

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    if (globeConfig.autoRotate === false) return;
    groupRef.current.rotation.y += delta * rotateSpeed * 0.22;
  });

  const sampledData = useMemo(() => data.slice(0, 28), [data]);

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshPhongMaterial
          color={new Color(baseColor)}
          emissive={new Color(globeConfig.emissive ?? "#062056")}
          emissiveIntensity={globeConfig.emissiveIntensity ?? 0.12}
          shininess={globeConfig.shininess ?? 1}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[2.16, 48, 48]} />
        <meshBasicMaterial
          color={new Color(atmosphereColor)}
          transparent
          opacity={0.12}
          blending={AdditiveBlending}
        />
      </mesh>

      {sampledData.map((arc, idx) => (
        <ArcMesh
          key={`${arc.order}-${idx}`}
          startLat={arc.startLat}
          startLng={arc.startLng}
          endLat={arc.endLat}
          endLng={arc.endLng}
          color={arc.color}
        />
      ))}
    </group>
  );
}

export function World(props: WorldProps) {
  const { globeConfig } = props;
  return (
    <Canvas
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
      camera={{ position: [0, 0.4, 6.5], fov: 45 }}
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
        minDistance={6.5}
        maxDistance={6.5}
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
