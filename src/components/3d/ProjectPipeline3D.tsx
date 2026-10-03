import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Maximize2, Cpu } from 'lucide-react';
import { soundManager } from '../../utils/audio';

interface ProjectPipeline3DProps {
  interactiveType: string;
}

interface StageData {
  id: string;
  name: string;
  sub: string;
  color: string;
  xBase: number;
  xExploded: number;
  metric: string;
}

const PipelineMesh: React.FC<{
  stages: StageData[];
  isExploded: boolean;
  onHoverStage: (stage: StageData | null) => void;
}> = ({ stages, isExploded, onHoverStage }) => {
  const groupRef = useRef<THREE.Group>(null);
  const packetPointsRef = useRef<THREE.Points>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Set up traveling data packets between stages
  const { packetPositions, packetCount } = useMemo(() => {
    const count = 30;
    const pos = new Float32Array(count * 3);
    return { packetPositions: pos, packetCount: count };
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;

    // Gentle floating tilt
    groupRef.current.rotation.y = Math.sin(time * 0.4) * 0.12 - 0.15;
    groupRef.current.rotation.x = 0.18 + Math.cos(time * 0.3) * 0.05;

    // Update traveling data packets
    if (packetPointsRef.current) {
      const startX = isExploded ? stages[0].xExploded : stages[0].xBase;
      const endX = isExploded ? stages[stages.length - 1].xExploded : stages[stages.length - 1].xBase;

      for (let i = 0; i < packetCount; i++) {
        const offset = (i / packetCount + time * 0.35) % 1.0;
        const x = THREE.MathUtils.lerp(startX, endX, offset);
        const y = Math.sin(offset * Math.PI * 3 + time * 2) * 0.12;
        const z = Math.cos(offset * Math.PI * 2) * 0.18;

        packetPositions[i * 3] = x;
        packetPositions[i * 3 + 1] = y;
        packetPositions[i * 3 + 2] = z;
      }
      packetPointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* 4 Volumetric 3D Stage Blocks */}
      {stages.map((stage) => {
        const posX = isExploded ? stage.xExploded : stage.xBase;
        const isHovered = hoveredId === stage.id;

        return (
          <group
            key={stage.id}
            position={[posX, 0, 0]}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredId(stage.id);
              onHoverStage(stage);
              soundManager.playHover();
            }}
            onPointerOut={() => {
              setHoveredId(null);
              onHoverStage(null);
            }}
          >
            {/* Core Solid Computation Block */}
            <mesh>
              <boxGeometry args={[1.1, 1.4, 0.8]} />
              <meshStandardMaterial
                color={stage.color}
                emissive={stage.color}
                emissiveIntensity={isHovered ? 0.9 : 0.4}
                roughness={0.2}
                metalness={0.7}
              />
            </mesh>

            {/* Outer Dielectric Glass Shell */}
            <mesh>
              <boxGeometry args={[1.25, 1.55, 0.95]} />
              <meshPhysicalMaterial
                color="#ffffff"
                transparent
                opacity={isHovered ? 0.45 : 0.22}
                roughness={0.1}
                transmission={0.88}
                thickness={0.3}
                reflectivity={0.9}
              />
            </mesh>

            {/* Bounding Wireframe Frame */}
            <mesh>
              <boxGeometry args={[1.3, 1.6, 1.0]} />
              <meshBasicMaterial
                color={stage.color}
                wireframe
                transparent
                opacity={isHovered ? 0.7 : 0.25}
              />
            </mesh>
          </group>
        );
      })}

      {/* Connecting Pipe / Data Bus Conduit */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry
          args={[
            0.04,
            0.04,
            isExploded
              ? Math.abs(stages[stages.length - 1].xExploded - stages[0].xExploded)
              : Math.abs(stages[stages.length - 1].xBase - stages[0].xBase),
            16
          ]}
        />
        <meshStandardMaterial
          color="#818cf8"
          emissive="#6366f1"
          emissiveIntensity={0.5}
          transparent
          opacity={0.4}
          roughness={0.3}
        />
      </mesh>

      {/* Animated Traveling Data Packets */}
      <points ref={packetPointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[packetPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.14}
          color="#38bdf8"
          transparent
          opacity={0.95}
          sizeAttenuation
        />
      </points>
    </group>
  );
};

export const ProjectPipeline3D: React.FC<ProjectPipeline3DProps> = ({ interactiveType }) => {
  const [isExploded, setIsExploded] = useState(false);
  const [hoveredStage, setHoveredStage] = useState<StageData | null>(null);

  // Derive specialized 4-stage pipeline according to project type
  const stages: StageData[] = useMemo(() => {
    if (interactiveType === 'agent-shield') {
      return [
        { id: 'stg1', name: '01. Action Interceptor', sub: 'FastAPI In-Line Gateway', color: '#0284c7', xBase: -2.4, xExploded: -3.6, metric: '<20ms Latency' },
        { id: 'stg2', name: '02. Laya Decision Engine', sub: 'Semantic Reasoning & Risk Scoring', color: '#4f46e5', xBase: -0.8, xExploded: -1.2, metric: '0–100 Scale' },
        { id: 'stg3', name: '03. Zero-Trust Invariants', sub: 'Deterministic Policy Enforcement', color: '#f43f5e', xBase: 0.8, xExploded: 1.2, metric: 'Zero Bypass' },
        { id: 'stg4', name: '04. Prometheus & SOC2', sub: 'Immutable Audit Logging & Dashboard', color: '#059669', xBase: 2.4, xExploded: 3.6, metric: '100% Audited' }
      ];
    }
    if (interactiveType === 'blast-furnace') {
      return [
        { id: 'stg1', name: '01. Raw Video Ingest', sub: 'RTSP 1080p Conveyor Stream', color: '#0284c7', xBase: -2.4, xExploded: -3.6, metric: '60 FPS Ingestion' },
        { id: 'stg2', name: '02. YOLOv9 Detector', sub: 'Hazard Bounding Box Proposal', color: '#4f46e5', xBase: -0.8, xExploded: -1.2, metric: '18.4ms Latency' },
        { id: 'stg3', name: '03. ResNet50V2 Head', sub: 'Dense Material Verification', color: '#7c3aed', xBase: 0.8, xExploded: 1.2, metric: '98.8% Validation' },
        { id: 'stg4', name: '04. PLC Relay E-Stop', sub: 'Industrial Actuator Interlock', color: '#f43f5e', xBase: 2.4, xExploded: 3.6, metric: '<50ms Cutoff' }
      ];
    }
    if (interactiveType === 'viki-voice' || interactiveType === 'voice-viki') {
      return [
        { id: 'stg1', name: '01. Deepgram Tamil ASR', sub: 'Phonetic Token Ingestion', color: '#0284c7', xBase: -2.4, xExploded: -3.6, metric: 'Nova-2 Engine' },
        { id: 'stg2', name: '02. RoBERTa Sentiment', sub: 'Urgency & Affect Classification', color: '#4f46e5', xBase: -0.8, xExploded: -1.2, metric: '0.94 Confidence' },
        { id: 'stg3', name: '03. GPT-4o Tool Caller', sub: 'Structured JSON Schema Output', color: '#7c3aed', xBase: 0.8, xExploded: 1.2, metric: 'LangChain Graph' },
        { id: 'stg4', name: '04. Azure Neural TTS', sub: 'Bilingual Speech Synthesis', color: '#059669', xBase: 2.4, xExploded: 3.6, metric: '120ms Audio Out' }
      ];
    }
    if (interactiveType === 'hand-gesture') {
      return [
        { id: 'stg1', name: '01. Optical Tracking', sub: 'MediaPipe 21 Hand Landmarks', color: '#0284c7', xBase: -2.4, xExploded: -3.6, metric: 'Raw 3D Coordinates' },
        { id: 'stg2', name: '02. Kalman Filter', sub: 'Mathematical Tremor Smoothing', color: '#059669', xBase: -0.8, xExploded: -1.2, metric: '68% RMS Reduction' },
        { id: 'stg3', name: '03. Finite State Machine', sub: 'Pinch & Drag Gesture Logic', color: '#7c3aed', xBase: 0.8, xExploded: 1.2, metric: 'Deterministic States' },
        { id: 'stg4', name: '04. PyAutoGUI Driver', sub: 'Native OS Cursor Actuation', color: '#4f46e5', xBase: 2.4, xExploded: 3.6, metric: 'Zero Driver Lag' }
      ];
    }
    // Generic high-performance ML pipeline fallback
    return [
      { id: 'stg1', name: '01. Data Ingestion', sub: 'ETL Pipeline & Schema Validation', color: '#0284c7', xBase: -2.4, xExploded: -3.6, metric: 'CRISP-ML(Q)' },
      { id: 'stg2', name: '02. Feature Engineering', sub: 'Embedding & Dimensional Scaling', color: '#4f46e5', xBase: -0.8, xExploded: -1.2, metric: 'Z-Score Normalization' },
      { id: 'stg3', name: '03. Model Inference', sub: 'Trained Machine Learning Weights', color: '#7c3aed', xBase: 0.8, xExploded: 1.2, metric: 'Loss Converged' },
      { id: 'stg4', name: '04. API & Deployment', sub: 'FastAPI / Docker Production Pod', color: '#059669', xBase: 2.4, xExploded: 3.6, metric: 'Sub-100ms P99' }
    ];
  }, [interactiveType]);

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 p-4 relative overflow-hidden">
      {/* Header with Exploded View Toggle */}
      <div className="flex items-center justify-between gap-3 mb-2 z-20 relative">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <div className="font-mono-tech text-[10px] text-indigo-700 font-bold uppercase">
              3D Production System Pipeline
            </div>
            <div className="font-display text-xs text-slate-700">
              Live volumetric architectural stages with active data bus flow
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            soundManager.playSwitch();
            setIsExploded(!isExploded);
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono-tech transition-all border ${
            isExploded
              ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
          }`}
          data-cursor="EXPLODE"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span>{isExploded ? 'Consolidate 3D' : 'Explode Stages'}</span>
        </button>
      </div>

      {/* 3D Canvas Viewport */}
      <div className="h-60 sm:h-72 w-full relative rounded-xl overflow-hidden bg-white/80 border border-slate-200/80 shadow-inner">
        {/* Stage Inspection Telemetry Badge */}
        {hoveredStage && (
          <div className="absolute top-3 left-3 z-20 px-3.5 py-2 rounded-xl bg-slate-900/90 text-white font-mono-tech text-xs shadow-md border border-slate-700 pointer-events-none animate-fadeIn">
            <div className="text-indigo-300 font-bold">{hoveredStage.name}</div>
            <div className="text-slate-300 text-[11px] mt-0.5">{hoveredStage.sub}</div>
            <div className="text-emerald-400 font-semibold text-[10px] mt-1">Benchmark: {hoveredStage.metric}</div>
          </div>
        )}

        <Canvas
          camera={{ position: [0, 0, 6.2], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <ambientLight intensity={1.1} />
          <directionalLight position={[5, 8, 5]} intensity={1.5} color="#ffffff" />
          <pointLight position={[-4, 3, 2]} intensity={0.8} color="#38bdf8" />
          <pointLight position={[4, -3, 2]} intensity={0.7} color="#a855f7" />

          <PipelineMesh
            stages={stages}
            isExploded={isExploded}
            onHoverStage={setHoveredStage}
          />
        </Canvas>
      </div>

      {/* Stage Flow Labels Footer */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 text-[11px] font-mono-tech">
        {stages.map((stg) => (
          <div
            key={`footer-${stg.id}`}
            className="p-2 rounded-xl bg-white border border-slate-200/80 flex items-center gap-2 shadow-2xs"
          >
            <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: stg.color }} />
            <div className="truncate">
              <div className="font-semibold text-slate-800 truncate">{stg.name}</div>
              <div className="text-[10px] text-slate-400 truncate">{stg.metric}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
