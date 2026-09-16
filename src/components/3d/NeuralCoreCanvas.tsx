import React, { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { NeuralNodesMesh, type SimulationMode, type ArchitectureType, type TrainingState } from './NeuralNodesMesh';
import { GimbalRings } from './GimbalRings';
import { ParticleField } from './ParticleField';
import { Move3d } from 'lucide-react';

interface NeuralCoreCanvasProps {
  simMode?: SimulationMode;
  archType?: ArchitectureType;
  trainingState?: TrainingState;
  onHoverNeuron?: (info: { id: string; activation: number; weight: number; layer: string } | null) => void;
}

export const NeuralCoreCanvas: React.FC<NeuralCoreCanvasProps> = ({
  simMode = 'forward',
  archType = 'cnn',
  trainingState = 'idle',
  onHoverNeuron
}) => {
  const pointer = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rotationOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const lastMouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
      }
    } catch {
      setHasWebGL(false);
    }

    const handleMouseMove = (e: MouseEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(e.clientY / window.innerHeight) * 2 + 1;

      if (isDragging.current) {
        const deltaX = (e.clientX - lastMouse.current.x) * 0.005;
        const deltaY = (e.clientY - lastMouse.current.y) * 0.005;
        rotationOffset.current.y += deltaX;
        rotationOffset.current.x += deltaY;
        lastMouse.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  if (!hasWebGL) {
    return (
      <div className="w-full h-full flex items-center justify-center relative bg-slate-50/50 rounded-2xl">
        <div className="text-center p-6 space-y-2">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 font-mono-tech text-sm font-bold">
            NN
          </div>
          <p className="text-xs text-slate-500 font-mono-tech">Deep Neural Network Architecture Active</p>
        </div>
      </div>
    );
  }

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    lastMouse.current = { x: e.clientX, y: e.clientY };
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      className="w-full h-full relative cursor-grab active:cursor-grabbing select-none"
    >
      {/* Interactive 3D Orbit Tip Badge */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-slate-200/80 shadow-xs backdrop-blur-md font-mono-tech text-[10px] text-slate-500">
        <Move3d className="w-3 h-3 text-indigo-600" />
        <span>DRAG TO ROTATE 3D PERSPECTIVE</span>
      </div>

      <Canvas
        camera={{ position: [1.6, 0.9, 6.0], fov: 46 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.95} />
        <directionalLight position={[6, 8, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-5, 3, 2]} intensity={0.85} color="#38bdf8" />
        <pointLight position={[5, -3, 2]} intensity={0.7} color="#a855f7" />

        <NeuralNodesMesh
          pointer={pointer}
          simMode={simMode}
          archType={archType}
          trainingState={trainingState}
          onHoverNeuron={onHoverNeuron}
          rotationOffset={rotationOffset}
        />
        <GimbalRings />
        <ParticleField pointer={pointer} />
      </Canvas>
    </div>
  );
};
