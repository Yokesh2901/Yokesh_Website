import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  pointer: React.MutableRefObject<{ x: number; y: number }>;
}

export const ParticleField: React.FC<ParticleFieldProps> = ({ pointer }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 350; // Cleaner, calmer particle density

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color('#818cf8'); // Soft iris
    const c2 = new THREE.Color('#38bdf8'); // Soft sky
    const c3 = new THREE.Color('#c084fc'); // Soft lilac

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.5 + Math.random() * 3.0;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = (r * Math.sin(phi) * Math.sin(theta)) * 0.7; // Flattened slightly
      pos[i * 3 + 2] = r * Math.cos(phi);

      const chosen = i % 3 === 0 ? c1 : i % 2 === 0 ? c2 : c3;
      col[i * 3] = chosen.r;
      col[i * 3 + 1] = chosen.g;
      col[i * 3 + 2] = chosen.b;
    }

    return [pos, col];
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;

    pointsRef.current.rotation.y += delta * 0.04;

    const targetX = pointer.current.y * 0.12;
    const targetY = pointer.current.x * 0.15;
    pointsRef.current.rotation.x += (targetX - pointsRef.current.rotation.x) * 0.03;
    pointsRef.current.rotation.y += (targetY - pointsRef.current.rotation.y) * 0.03;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
};
