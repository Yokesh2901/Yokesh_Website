import React, { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollAssemblyMesh } from './ScrollAssemblyMesh';

interface ScrollAssemblyCanvasProps {
  scrollProgress: number; // 0.0 to 1.0
  className?: string;
}

export const ScrollAssemblyCanvas: React.FC<ScrollAssemblyCanvasProps> = ({
  scrollProgress,
  className = ''
}) => {
  const pointer = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }

    const handleMouseMove = (e: MouseEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!hasWebGL) return null;

  return (
    <div className={`w-full h-full relative select-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 7.2], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={1.1} />
        <directionalLight position={[6, 9, 6]} intensity={1.6} color="#ffffff" />
        <pointLight position={[-5, 4, 3]} intensity={0.9} color="#6366f1" />
        <pointLight position={[5, -4, 3]} intensity={0.7} color="#0284c7" />

        <ScrollAssemblyMesh
          scrollProgress={scrollProgress}
          pointer={pointer}
        />
      </Canvas>
    </div>
  );
};
