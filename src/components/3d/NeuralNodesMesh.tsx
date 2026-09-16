import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export type SimulationMode = 'forward' | 'backprop' | 'exploded';
export type ArchitectureType = 'cnn' | 'transformer' | 'pointcloud';
export type TrainingState = 'idle' | 'training' | 'adversarial' | 'pruned';

interface NeuralNodesMeshProps {
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  simMode: SimulationMode;
  archType?: ArchitectureType;
  trainingState?: TrainingState;
  onHoverNeuron?: (info: { id: string; activation: number; weight: number; layer: string } | null) => void;
  rotationOffset?: React.MutableRefObject<{ x: number; y: number }>;
}

interface NodeData {
  id: string;
  basePos: THREE.Vector3;
  explodedPos: THREE.Vector3;
  transformerPos: THREE.Vector3;
  pointCloudPos: THREE.Vector3;
  layer: number;
  index: number;
  layerName: string;
  baseColor: THREE.Color;
  activation: number;
  weight: number;
}

interface AxonData {
  start: THREE.Vector3;
  end: THREE.Vector3;
  startNode: NodeData;
  endNode: NodeData;
  isPruned: boolean;
}

export const NeuralNodesMesh: React.FC<NeuralNodesMeshProps> = ({
  pointer,
  simMode,
  archType = 'cnn',
  trainingState = 'idle',
  onHoverNeuron,
  rotationOffset
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const pulsePointsRef = useRef<THREE.Points>(null);
  const backpropPointsRef = useRef<THREE.Points>(null);
  const scannerLaserRef = useRef<THREE.Mesh>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  // Volumetric 3D Neural Architecture Configuration
  const { nodes, lineGeometry, pulseSeeds, layerFrames, transformerLines, pointCloudGeometry } = useMemo(() => {
    const allNodes: NodeData[] = [];
    const layersNodes: NodeData[][] = [[], [], [], []];

    // Total 24 nodes
    // Layer 0: Input Sensors (5 nodes, curved frontal arc)
    const l0Color = new THREE.Color('#0284c7');
    for (let i = 0; i < 5; i++) {
      const y = -1.5 + i * 0.75;
      const z = Math.cos((y / 1.5) * 0.8) * 0.4 - 0.2;
      const basePos = new THREE.Vector3(-2.8, y, z);
      const explodedPos = new THREE.Vector3(-4.2, y * 1.15, z * 1.4);
      // Transformer mapping: Query tokens
      const transformerPos = new THREE.Vector3(-2.2, -1.5 + i * 0.75, 0);
      // Point Cloud mapping: Conveyor input scrap
      const pointCloudPos = new THREE.Vector3(-2.0 + Math.random() * 0.8, -1.0 + Math.random() * 0.5, -1.0 + Math.random() * 2.0);

      const node: NodeData = {
        id: `L0_N${i}`,
        basePos,
        explodedPos,
        transformerPos,
        pointCloudPos,
        layer: 0,
        index: i,
        layerName: 'Input Sensors [B, 3, 224, 224]',
        baseColor: l0Color,
        activation: +(0.5 + Math.random() * 0.48).toFixed(3),
        weight: +(Math.random() * 2 - 1).toFixed(2)
      };
      allNodes.push(node);
      layersNodes[0].push(node);
    }

    // Layer 1: Conv Feature Maps (8 nodes in 3D dual-column channel grid: 2x4)
    const l1Color = new THREE.Color('#4f46e5');
    for (let col = 0; col < 2; col++) {
      const x = col === 0 ? -1.25 : -0.75;
      const z = col === 0 ? -0.55 : 0.55;
      for (let row = 0; row < 4; row++) {
        const y = -1.35 + row * 0.9;
        const basePos = new THREE.Vector3(x, y, z);
        const explodedPos = new THREE.Vector3(x * 1.5 - 0.5, y * 1.15, z * 1.5);
        const idx = col * 4 + row;
        // Transformer mapping: Key tokens
        const transformerPos = new THREE.Vector3(0, -1.4 + idx * 0.4, (col === 0 ? -0.3 : 0.3));
        // Point Cloud mapping: Steel plate cluster
        const pointCloudPos = new THREE.Vector3(-0.5 + Math.random() * 1.0, -0.8 + Math.random() * 1.6, -1.0 + Math.random() * 2.0);

        const node: NodeData = {
          id: `L1_N${idx}`,
          basePos,
          explodedPos,
          transformerPos,
          pointCloudPos,
          layer: 1,
          index: idx,
          layerName: `Conv Feature Map [Ch ${idx * 16}]`,
          baseColor: l1Color,
          activation: +(0.4 + Math.random() * 0.58).toFixed(3),
          weight: +(Math.random() * 2 - 1).toFixed(2)
        };
        allNodes.push(node);
        layersNodes[1].push(node);
      }
    }

    // Layer 2: Latent Attention Space (7 nodes in 3D multi-head orbital manifold)
    const l2Color = new THREE.Color('#7c3aed');
    const centerNode: NodeData = {
      id: 'L2_N0',
      basePos: new THREE.Vector3(1.0, 0, 0),
      explodedPos: new THREE.Vector3(1.8, 0, 0),
      transformerPos: new THREE.Vector3(1.1, 0, 0),
      pointCloudPos: new THREE.Vector3(0.8 + Math.random() * 0.5, 0, 0),
      layer: 2,
      index: 0,
      layerName: 'Latent Attention Anchor [Head 0]',
      baseColor: l2Color,
      activation: 0.942,
      weight: 0.88
    };
    allNodes.push(centerNode);
    layersNodes[2].push(centerNode);

    for (let k = 0; k < 6; k++) {
      const angle = (k / 6) * Math.PI * 2;
      const y = Math.sin(angle) * 1.25;
      const z = Math.cos(angle) * 0.95;
      const x = 1.0 + Math.sin(angle * 2) * 0.25;
      const basePos = new THREE.Vector3(x, y, z);
      const explodedPos = new THREE.Vector3(x * 1.4 + 0.6, y * 1.2, z * 1.4);
      // Transformer mapping: Value tokens
      const transformerPos = new THREE.Vector3(2.2, -1.25 + k * 0.5, 0);
      // Point Cloud mapping: Galvanized pipe cluster
      const pointCloudPos = new THREE.Vector3(1.2 + Math.random() * 0.8, -0.6 + Math.random() * 1.2, -0.8 + Math.random() * 1.6);

      const node: NodeData = {
        id: `L2_N${k + 1}`,
        basePos,
        explodedPos,
        transformerPos,
        pointCloudPos,
        layer: 2,
        index: k + 1,
        layerName: `Latent Attention Space [Head ${k + 1}]`,
        baseColor: l2Color,
        activation: +(0.45 + Math.random() * 0.52).toFixed(3),
        weight: +(Math.random() * 2 - 1).toFixed(2)
      };
      allNodes.push(node);
      layersNodes[2].push(node);
    }

    // Layer 3: Decision Output Head (4 nodes)
    const l3Color = new THREE.Color('#059669');
    for (let i = 0; i < 4; i++) {
      const y = -1.2 + i * 0.8;
      const z = Math.sin(i * 1.4) * 0.3;
      const basePos = new THREE.Vector3(2.8, y, z);
      const explodedPos = new THREE.Vector3(4.2, y * 1.15, z * 1.3);
      const transformerPos = new THREE.Vector3(3.4, y * 0.8, z);
      const pointCloudPos = new THREE.Vector3(2.5, y * 0.8, 0);

      const node: NodeData = {
        id: `L3_N${i}`,
        basePos,
        explodedPos,
        transformerPos,
        pointCloudPos,
        layer: 3,
        index: i,
        layerName: `Decision Output Logit [Class ${i}]`,
        baseColor: l3Color,
        activation: +(0.6 + Math.random() * 0.38).toFixed(3),
        weight: +(Math.random() * 1.5).toFixed(2)
      };
      allNodes.push(node);
      layersNodes[3].push(node);
    }

    // Synaptic Inter-Layer Connections
    const allAxons: AxonData[] = [];
    const linePoints: number[] = [];
    const lineColors: number[] = [];

    for (let l = 0; l < layersNodes.length - 1; l++) {
      const cur = layersNodes[l];
      const next = layersNodes[l + 1];

      cur.forEach((startNode, startIdx) => {
        next.forEach((endNode, endIdx) => {
          const shouldConnect =
            (startIdx + endIdx) % 2 === 0 ||
            Math.abs(startIdx - endIdx) <= 3 ||
            (startNode.layer === 2 && startNode.index === 0);

          if (shouldConnect) {
            // Mark 40% of connections as prunable
            const isPruned = (startIdx * 7 + endIdx * 11) % 5 < 2;

            allAxons.push({
              start: startNode.basePos,
              end: endNode.basePos,
              startNode,
              endNode,
              isPruned
            });

            linePoints.push(startNode.basePos.x, startNode.basePos.y, startNode.basePos.z);
            linePoints.push(endNode.basePos.x, endNode.basePos.y, endNode.basePos.z);

            lineColors.push(startNode.baseColor.r, startNode.baseColor.g, startNode.baseColor.b);
            lineColors.push(endNode.baseColor.r, endNode.baseColor.g, endNode.baseColor.b);
          }
        });
      });
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.Float32BufferAttribute(linePoints, 3));
    geom.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3));

    // Transformer Cross-Attention lines (Q -> K -> V)
    const tfLines: number[] = [];
    layersNodes[0].forEach((q) => {
      layersNodes[1].forEach((k) => {
        tfLines.push(q.transformerPos.x, q.transformerPos.y, q.transformerPos.z);
        tfLines.push(k.transformerPos.x, k.transformerPos.y, k.transformerPos.z);
      });
    });
    layersNodes[1].forEach((k) => {
      layersNodes[2].forEach((v) => {
        tfLines.push(k.transformerPos.x, k.transformerPos.y, k.transformerPos.z);
        tfLines.push(v.transformerPos.x, v.transformerPos.y, v.transformerPos.z);
      });
    });
    const tfGeom = new THREE.BufferGeometry();
    tfGeom.setAttribute('position', new THREE.Float32BufferAttribute(tfLines, 3));

    // 3D Point Cloud conveyor ground geometry
    const pcPoints: number[] = [];
    for (let pi = 0; pi < 150; pi++) {
      pcPoints.push(-3.0 + Math.random() * 6.0, -1.6 + Math.random() * 0.1, -1.8 + Math.random() * 3.6);
    }
    const pcGeom = new THREE.BufferGeometry();
    pcGeom.setAttribute('position', new THREE.Float32BufferAttribute(pcPoints, 3));

    const pulses = allAxons.map((axon, idx) => ({
      axon,
      offset: (idx * 0.13) % 1.0,
      speed: 0.45 + (idx % 6) * 0.12
    }));

    const frames = [
      { x: -2.8, expX: -4.2, width: 0.6, height: 3.4, depth: 1.2, color: '#0284c7' },
      { x: -1.0, expX: -1.8, width: 1.2, height: 3.8, depth: 1.8, color: '#4f46e5' },
      { x: 1.0, expX: 2.0, width: 1.2, height: 3.6, depth: 2.2, color: '#7c3aed' },
      { x: 2.8, expX: 4.2, width: 0.6, height: 3.2, depth: 1.2, color: '#059669' }
    ];

    return {
      nodes: allNodes,
      lineGeometry: geom,
      transformerLines: tfGeom,
      pointCloudGeometry: pcGeom,
      pulseSeeds: pulses,
      layerFrames: frames
    };
  }, []);

  const pulsePositions = useMemo(() => new Float32Array(pulseSeeds.length * 3), [pulseSeeds]);
  const backpropPositions = useMemo(() => new Float32Array(pulseSeeds.length * 3), [pulseSeeds]);
  const currentPositionsRef = useRef<THREE.Vector3[]>(nodes.map((n) => n.basePos.clone()));

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;

    const dragX = rotationOffset?.current?.x || 0;
    const dragY = rotationOffset?.current?.y || 0;

    const baseRotX = 0.12 + pointer.current.y * 0.2 + dragX;
    const baseRotY = -0.32 + pointer.current.x * 0.28 + dragY + time * 0.04;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, baseRotX, 0.06);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, baseRotY, 0.06);
    groupRef.current.position.y = Math.sin(time * 0.9) * 0.08;

    // Laser scanner sweep in Point Cloud mode
    if (scannerLaserRef.current) {
      scannerLaserRef.current.position.x = Math.sin(time * 2) * 3.0;
    }

    // Determine target node coordinates based on Architecture Type and Exploded state
    const isExploded = simMode === 'exploded';
    nodes.forEach((node, idx) => {
      let target: THREE.Vector3;
      if (archType === 'transformer') {
        target = node.transformerPos;
      } else if (archType === 'pointcloud') {
        target = node.pointCloudPos;
      } else {
        target = isExploded ? node.explodedPos : node.basePos;
      }

      // Adversarial Noise Attack: inject high frequency perturbation jitter
      if (trainingState === 'adversarial') {
        const jitter = new THREE.Vector3(
          (Math.random() - 0.5) * 0.16,
          (Math.random() - 0.5) * 0.16,
          (Math.random() - 0.5) * 0.16
        );
        currentPositionsRef.current[idx].lerp(target.clone().add(jitter), 0.15);
      } else {
        currentPositionsRef.current[idx].lerp(target, 0.08);
      }
    });

    // Pulse signal speed multiplier during training
    const speedMult = trainingState === 'training' ? 2.4 : 1.0;

    // 1. Forward Propagation Signals
    if (pulsePointsRef.current) {
      pulseSeeds.forEach((seed, i) => {
        const progress = (time * (seed.speed * speedMult) + seed.offset) % 1.0;
        const start = currentPositionsRef.current[nodes.indexOf(seed.axon.startNode)];
        const end = currentPositionsRef.current[nodes.indexOf(seed.axon.endNode)];
        const pos = new THREE.Vector3().lerpVectors(start, end, progress);

        pos.y += Math.sin(progress * Math.PI) * 0.08;

        pulsePositions[i * 3] = pos.x;
        pulsePositions[i * 3 + 1] = pos.y;
        pulsePositions[i * 3 + 2] = pos.z;
      });
      pulsePointsRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // 2. Backpropagation Signals
    if (backpropPointsRef.current) {
      pulseSeeds.forEach((seed, i) => {
        const progress = 1.0 - ((time * (seed.speed * 1.3 * speedMult) + seed.offset) % 1.0);
        const start = currentPositionsRef.current[nodes.indexOf(seed.axon.startNode)];
        const end = currentPositionsRef.current[nodes.indexOf(seed.axon.endNode)];
        const pos = new THREE.Vector3().lerpVectors(start, end, progress);

        pos.y += Math.sin(progress * Math.PI) * 0.08;

        backpropPositions[i * 3] = pos.x;
        backpropPositions[i * 3 + 1] = pos.y;
        backpropPositions[i * 3 + 2] = pos.z;
      });
      backpropPointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* 3D Holographic Frames (Active in CNN mode) */}
      {archType === 'cnn' &&
        layerFrames.map((frame, fIdx) => {
          const isExploded = simMode === 'exploded';
          const posX = isExploded ? frame.expX : frame.x;
          return (
            <group key={`frame-${fIdx}`} position={[posX, 0, 0]}>
              <mesh>
                <boxGeometry args={[frame.width, frame.height, frame.depth]} />
                <meshBasicMaterial
                  color={frame.color}
                  wireframe
                  transparent
                  opacity={isExploded ? 0.25 : 0.12}
                />
              </mesh>
            </group>
          );
        })}

      {/* Point Cloud Scanner Laser Plane */}
      {archType === 'pointcloud' && (
        <>
          <mesh ref={scannerLaserRef} position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <planeGeometry args={[3.2, 4.0]} />
            <meshBasicMaterial
              color="#f43f5e"
              transparent
              opacity={0.25}
              side={THREE.DoubleSide}
            />
          </mesh>
          <points geometry={pointCloudGeometry}>
            <pointsMaterial size={0.05} color="#94a3b8" transparent opacity={0.6} />
          </points>
        </>
      )}

      {/* Synaptic Axons (CNN Mode) */}
      {archType === 'cnn' && (
        <lineSegments geometry={lineGeometry}>
          <lineBasicMaterial
            vertexColors
            transparent
            opacity={
              trainingState === 'pruned'
                ? 0.15
                : trainingState === 'adversarial'
                ? 0.55
                : simMode === 'backprop'
                ? 0.22
                : 0.38
            }
            depthWrite={false}
          />
        </lineSegments>
      )}

      {/* Transformer Cross-Attention Arcs (Transformer Mode) */}
      {archType === 'transformer' && (
        <lineSegments geometry={transformerLines}>
          <lineBasicMaterial color="#a78bfa" transparent opacity={0.35} depthWrite={false} />
        </lineSegments>
      )}

      {/* Forward Pass Signal Photons */}
      {(simMode === 'forward' || simMode === 'exploded') && archType !== 'pointcloud' && (
        <points ref={pulsePointsRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[pulsePositions, 3]} />
          </bufferGeometry>
          <pointsMaterial
            size={0.11}
            color={trainingState === 'training' ? '#10b981' : trainingState === 'adversarial' ? '#f43f5e' : '#38bdf8'}
            transparent
            opacity={0.95}
            sizeAttenuation
          />
        </points>
      )}

      {/* Backprop Loss Gradient Waves */}
      {simMode === 'backprop' && (
        <points ref={backpropPointsRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[backpropPositions, 3]} />
          </bufferGeometry>
          <pointsMaterial
            size={0.14}
            color="#f59e0b"
            transparent
            opacity={0.98}
            sizeAttenuation
          />
        </points>
      )}

      {/* Volumetric Neurons */}
      {nodes.map((node) => {
        const isHovered = hoveredNodeId === node.id;
        const pos = currentPositionsRef.current[nodes.indexOf(node)] || node.basePos;

        // Dynamic color reacting to Training/Adversarial Simulator state
        let nodeCoreColor = node.baseColor;
        let nodeEmissive = node.baseColor;
        if (trainingState === 'training') {
          nodeCoreColor = new THREE.Color('#10b981');
          nodeEmissive = new THREE.Color('#059669');
        } else if (trainingState === 'adversarial') {
          nodeCoreColor = new THREE.Color('#f43f5e');
          nodeEmissive = new THREE.Color('#e11d48');
        } else if (simMode === 'backprop') {
          nodeCoreColor = new THREE.Color('#f59e0b');
          nodeEmissive = new THREE.Color('#d97706');
        }

        return (
          <group
            key={node.id}
            position={pos}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredNodeId(node.id);
              onHoverNeuron?.({
                id: node.id,
                activation: node.activation,
                weight: node.weight,
                layer: node.layerName
              });
            }}
            onPointerOut={() => {
              setHoveredNodeId(null);
              onHoverNeuron?.(null);
            }}
          >
            {/* Inner Pulsating Quantum Core */}
            <mesh>
              <sphereGeometry args={[isHovered ? 0.13 : 0.10, 20, 20]} />
              <meshStandardMaterial
                color={nodeCoreColor}
                emissive={nodeEmissive}
                emissiveIntensity={isHovered ? 1.4 : trainingState === 'training' ? 1.2 : 0.85}
                roughness={0.15}
                metalness={0.8}
              />
            </mesh>

            {/* Outer Refractive Glass Shell */}
            <mesh>
              <sphereGeometry args={[isHovered ? 0.22 : 0.18, 20, 20]} />
              <meshPhysicalMaterial
                color="#ffffff"
                transparent
                opacity={isHovered ? 0.45 : 0.28}
                roughness={0.08}
                transmission={0.9}
                thickness={0.25}
                reflectivity={0.9}
              />
            </mesh>

            {/* Orbiting Activation Halo Ring */}
            {node.activation > 0.65 && (
              <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
                <torusGeometry args={[0.22, 0.012, 12, 32]} />
                <meshBasicMaterial
                  color={nodeCoreColor}
                  transparent
                  opacity={isHovered ? 0.8 : 0.45}
                />
              </mesh>
            )}

            {/* Hover Shockwave Pulse Ring */}
            {isHovered && (
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[0.24, 0.28, 32]} />
                <meshBasicMaterial
                  color="#ffffff"
                  transparent
                  opacity={0.8}
                  side={THREE.DoubleSide}
                />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
};
