import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const GimbalRings: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    // Slow, serene background rotation
    groupRef.current.rotation.z += delta * 0.04;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.08;
  });

  return (
    <group ref={groupRef} position={[0, 0, -0.5]}>
      {/* Subtle Coordinate Tensor Ring 1 */}
      <mesh rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[3.2, 0.008, 16, 100]} />
        <meshBasicMaterial color="#94a3b8" transparent opacity={0.25} />
      </mesh>

      {/* Subtle Coordinate Tensor Ring 2 */}
      <mesh rotation={[Math.PI / 1.8, Math.PI / 6, 0]}>
        <torusGeometry args={[3.6, 0.006, 16, 100]} />
        <meshBasicMaterial color="#a5b4fc" transparent opacity={0.2} />
      </mesh>
    </group>
  );
};
