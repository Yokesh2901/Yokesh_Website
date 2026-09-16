import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { soundManager } from '../../utils/audio';

interface ScrollAssemblyMeshProps {
  scrollProgress: number; // 0.0 to 1.0
  pointer: React.MutableRefObject<{ x: number; y: number }>;
}

export const ScrollAssemblyMesh: React.FC<ScrollAssemblyMeshProps> = ({
  scrollProgress,
  pointer
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const layerLinesRef = useRef<THREE.LineSegments>(null);
  const brainLinesRef = useRef<THREE.LineSegments>(null);
  const thoughtPulsesRef = useRef<THREE.Points>(null);

  // Smooth progress using frame damping (lerp)
  const currentProgress = useRef(0);

  // Brain & Neural Network Geometry Definitions
  const {
    particleCount,
    scatterPositions,
    nnPositions,
    brainPositions,
    particleColors,
    layerLineBuffer,
    brainLineBuffer,
    brainLineEndpoints
  } = useMemo(() => {
    const count = 320; // High particle density for brain definition
    const scatters: THREE.Vector3[] = [];
    const nnCoords: THREE.Vector3[] = [];
    const brainCoords: THREE.Vector3[] = [];
    const colors: THREE.Color[] = [];

    // 1. Neural Network 4-Layer Configuration (Stage 2: 0.3 - 0.65)
    const layerConfigs = [
      { count: 50, x: -2.5, yRange: 2.6, zRange: 0.8, color: '#0284c7' }, // Input
      { count: 100, x: -0.8, yRange: 3.2, zRange: 1.2, color: '#4f46e5' }, // Feature
      { count: 100, x: 0.8, yRange: 3.0, zRange: 1.2, color: '#7c3aed' }, // Latent
      { count: 70, x: 2.5, yRange: 2.2, zRange: 0.8, color: '#059669' } // Output
    ];

    let nnIdx = 0;
    const nnLayerNodes: THREE.Vector3[][] = [[], [], [], []];

    layerConfigs.forEach((cfg, layerIdx) => {
      const stepY = cfg.yRange / (cfg.count - 1 || 1);
      const startY = -cfg.yRange / 2;

      for (let i = 0; i < cfg.count; i++) {
        const y = startY + i * stepY;
        const z = (Math.sin(i * 1.7 + layerIdx) * 0.5 + (Math.random() - 0.5) * 0.3) * cfg.zRange;
        const pos = new THREE.Vector3(cfg.x, y, z);
        nnCoords.push(pos);
        nnLayerNodes[layerIdx].push(pos);
        nnIdx++;
      }
    });

    // Fill remaining if any
    while (nnCoords.length < count) {
      nnCoords.push(nnCoords[nnCoords.length % nnIdx].clone());
    }

    // 2. Anatomical 3D Brain Surface & Cortex Coordinates (Stage 3: 0.7 - 1.0)
    for (let i = 0; i < count; i++) {
      // Widely scattered random coordinates with high entropy (Stage 1)
      const rScatter = 7 + Math.random() * 8;
      const thetaScatter = Math.random() * Math.PI * 2;
      const phiScatter = Math.acos(2 * Math.random() - 1);
      scatters.push(
        new THREE.Vector3(
          rScatter * Math.sin(phiScatter) * Math.cos(thetaScatter),
          rScatter * Math.sin(phiScatter) * Math.sin(thetaScatter),
          rScatter * Math.cos(phiScatter)
        )
      );

      // Brain Hemisphere: Left (even) vs Right (odd)
      const isLeft = i % 2 === 0;
      const hemiSign = isLeft ? -1 : 1;
      const fissureGap = 0.22; // Distinct longitudinal fissure separation

      // Fibonacci / spherical angle distribution across hemisphere
      const phi = 0.2 + (i / count) * 2.6; // Superior to inferior
      const theta = -Math.PI / 2 + ((i * 1.618) % 1) * Math.PI; // Medial to lateral

      // Anatomical brain dimensions
      const Rz = 2.1; // Front-to-back length
      const Ry = 1.65; // Height (crown to temporal base)
      const Rx = 1.35; // Width of single hemisphere

      // Convolutions (Gyri & Sulci folds)
      const convolutions =
        0.13 * Math.sin(6 * theta) * Math.cos(7 * phi) +
        0.07 * Math.sin(13 * theta + 2 * phi) +
        0.04 * Math.cos(10 * phi);

      // Regional lobe shaping
      const zNorm = Math.sin(theta) * Math.sin(phi);
      const isFrontal = zNorm > 0.1;
      const isOccipital = zNorm < -0.3;
      const isCerebellum = zNorm < -0.4 && Math.cos(phi) < -0.3;

      let rMod = 1.0 + convolutions;
      if (isFrontal) rMod *= 1.08; // Frontal lobe expansion
      if (isOccipital && !isCerebellum) rMod *= 0.95; // Occipital taper
      if (isCerebellum) rMod *= 0.85; // Cerebellum tucked under

      const x = hemiSign * (fissureGap + Math.abs(Rx * Math.cos(theta) * Math.sin(phi) * rMod));
      const y = Ry * Math.cos(phi) * rMod - 0.1;
      const z = Rz * Math.sin(theta) * Math.sin(phi) * rMod;

      brainCoords.push(new THREE.Vector3(x, y, z));

      // Hemisphere Colors: Left = Deep Indigo/Electric Sky, Right = Violet/Teal
      if (isLeft) {
        colors.push(new THREE.Color(i % 3 === 0 ? '#0284c7' : '#4f46e5'));
      } else {
        colors.push(new THREE.Color(i % 3 === 0 ? '#06b6d4' : '#7c3aed'));
      }
    }

    // 3. Neural Network Layer Synapse Lines
    const layerLinePts: number[] = [];
    for (let l = 0; l < nnLayerNodes.length - 1; l++) {
      const cur = nnLayerNodes[l];
      const next = nnLayerNodes[l + 1];
      for (let ci = 0; ci < cur.length; ci += 2) {
        for (let ni = 0; ni < next.length; ni += 3) {
          if (Math.abs(ci - ni) < 18) {
            layerLinePts.push(cur[ci].x, cur[ci].y, cur[ci].z);
            layerLinePts.push(next[ni].x, next[ni].y, next[ni].z);
          }
        }
      }
    }

    const lGeom = new THREE.BufferGeometry();
    lGeom.setAttribute('position', new THREE.Float32BufferAttribute(layerLinePts, 3));

    // 4. Brain Cortical Synapse Lines (connecting neighboring nodes on same hemisphere + Corpus Callosum)
    const brainLinePts: number[] = [];
    const brainEndpoints: { start: THREE.Vector3; end: THREE.Vector3 }[] = [];

    for (let i = 0; i < count; i++) {
      const p1 = brainCoords[i];
      let connections = 0;

      for (let j = i + 1; j < count; j++) {
        if (connections >= 3) break;
        const p2 = brainCoords[j];
        const dist = p1.distanceTo(p2);

        // Connect intra-hemisphere neighbors OR inter-hemisphere corpus callosum
        const sameHemi = (i % 2 === 0) === (j % 2 === 0);
        if ((sameHemi && dist < 0.65) || (!sameHemi && Math.abs(p1.y - p2.y) < 0.35 && dist < 0.9)) {
          brainLinePts.push(p1.x, p1.y, p1.z);
          brainLinePts.push(p2.x, p2.y, p2.z);
          brainEndpoints.push({ start: p1, end: p2 });
          connections++;
        }
      }
    }

    const bGeom = new THREE.BufferGeometry();
    bGeom.setAttribute('position', new THREE.Float32BufferAttribute(brainLinePts, 3));

    return {
      particleCount: count,
      scatterPositions: scatters,
      nnPositions: nnCoords,
      brainPositions: brainCoords,
      particleColors: colors,
      layerLineBuffer: lGeom,
      brainLineBuffer: bGeom,
      brainLineEndpoints: brainEndpoints
    };
  }, []);

  // Set up particle buffer attribute
  const { particleBuffer, thoughtPulseBuffer } = useMemo(() => {
    const pGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const cols = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = scatterPositions[i].x;
      positions[i * 3 + 1] = scatterPositions[i].y;
      positions[i * 3 + 2] = scatterPositions[i].z;

      cols[i * 3] = particleColors[i].r;
      cols[i * 3 + 1] = particleColors[i].g;
      cols[i * 3 + 2] = particleColors[i].b;
    }

    pGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    pGeom.setAttribute('color', new THREE.BufferAttribute(cols, 3));

    // Thought pulses (action potentials traveling across cortical synapses)
    const tpCount = 36;
    const tpGeom = new THREE.BufferGeometry();
    const tpPos = new Float32Array(tpCount * 3);
    tpGeom.setAttribute('position', new THREE.BufferAttribute(tpPos, 3));

    return { particleBuffer: pGeom, thoughtPulseBuffer: tpGeom };
  }, [particleCount, scatterPositions, particleColors]);

  // Frame Update: Smooth 3-Stage Morph (Scattered -> NN Layers -> Complete Brain)
  useFrame((state, delta) => {
    currentProgress.current = THREE.MathUtils.lerp(
      currentProgress.current,
      scrollProgress,
      Math.min(delta * 5, 0.16)
    );

    const progress = currentProgress.current;
    const time = state.clock.getElapsedTime();

    // Group Orientation & Brain Heartbeat / Pulse
    if (groupRef.current) {
      // Subtle cursor tracking
      const targetRotX = pointer.current.y * 0.25;
      // Gentle continuous rotation that slows down into majestic brain presentation
      const targetRotY = pointer.current.x * 0.35 + (1 - progress) * 0.6 + time * 0.08;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);

      // Brain Organic Pulse when formed (progress > 0.8)
      const brainPulse = progress > 0.8 ? 1 + Math.sin(time * 2.8) * 0.025 : 1.0;
      const baseScale = THREE.MathUtils.lerp(0.85, 1.15, progress);
      const finalScale = baseScale * brainPulse;
      groupRef.current.scale.set(finalScale, finalScale, finalScale);
    }

    // 1. Particle Morphing across 3 stages:
    // Stage 1 -> 2 (0.0 to 0.45): Scatter -> Neural Network Layers
    // Stage 2 -> 3 (0.55 to 1.0): Neural Network Layers -> 3D Neural Brain
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;

      // Morph weights
      const tNN = THREE.MathUtils.clamp((progress - 0.05) / 0.4, 0, 1);
      const easedNN = 1 - Math.pow(1 - tNN, 3); // Ease out

      const tBrain = THREE.MathUtils.clamp((progress - 0.55) / 0.4, 0, 1);
      const easedBrain = Math.pow(tBrain, 2.2); // Smooth acceleration into brain shape

      for (let i = 0; i < particleCount; i++) {
        const scatter = scatterPositions[i];
        const nn = nnPositions[i];
        const brain = brainPositions[i];

        // First interpolate Scatter -> NN
        let curX = THREE.MathUtils.lerp(scatter.x, nn.x, easedNN);
        let curY = THREE.MathUtils.lerp(scatter.y, nn.y, easedNN);
        let curZ = THREE.MathUtils.lerp(scatter.z, nn.z, easedNN);

        // Add subtle floating turbulence during early phases
        if (progress < 0.6) {
          const turb = (1 - easedNN) * Math.sin(time * 1.8 + i) * 0.25;
          curX += turb;
          curY += turb;
        }

        // Then interpolate NN -> 3D Brain
        if (easedBrain > 0) {
          curX = THREE.MathUtils.lerp(curX, brain.x, easedBrain);
          curY = THREE.MathUtils.lerp(curY, brain.y, easedBrain);
          curZ = THREE.MathUtils.lerp(curZ, brain.z, easedBrain);
        }

        positions[i * 3] = curX;
        positions[i * 3 + 1] = curY;
        positions[i * 3 + 2] = curZ;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;

      // Particle size & glow dynamically adapts: smaller and more cohesive as the brain forms
      const material = particlesRef.current.material as THREE.PointsMaterial;
      material.size = THREE.MathUtils.lerp(0.12, 0.08, progress);
      material.opacity = THREE.MathUtils.lerp(0.7, 0.95, progress);
    }

    // 2. Layer lines: active during Stage 2 (0.25 - 0.70), then fades out
    if (layerLinesRef.current) {
      const mat = layerLinesRef.current.material as THREE.LineBasicMaterial;
      let alpha = 0;
      if (progress >= 0.2 && progress <= 0.65) {
        alpha = THREE.MathUtils.clamp((progress - 0.2) / 0.2, 0, 1);
      } else if (progress > 0.65 && progress <= 0.82) {
        alpha = 1 - THREE.MathUtils.clamp((progress - 0.65) / 0.17, 0, 1);
      }
      mat.opacity = alpha * 0.35;
      layerLinesRef.current.visible = alpha > 0.01;
    }

    // Audio energy from Web Audio API
    const audioEnergy = soundManager.getAudioEnergy();

    // 3. Brain Cortical lines: fades in during Stage 3 (0.70 - 1.0) and reacts to audio
    if (brainLinesRef.current) {
      const mat = brainLinesRef.current.material as THREE.LineBasicMaterial;
      const brainAlpha = THREE.MathUtils.clamp((progress - 0.68) / 0.28, 0, 1);
      mat.opacity = brainAlpha * (0.40 + audioEnergy * 0.45);
      brainLinesRef.current.visible = brainAlpha > 0.01;
    }

    // 4. Thought Pulses (Action Potentials): activate when the Brain is assembled (progress > 0.85)
    if (thoughtPulsesRef.current && brainLineEndpoints.length > 0) {
      const isBrainFormed = progress >= 0.85;
      thoughtPulsesRef.current.visible = isBrainFormed;

      if (isBrainFormed) {
        const pulsePositions = thoughtPulsesRef.current.geometry.attributes.position.array as Float32Array;
        const count = pulsePositions.length / 3;

        for (let p = 0; p < count; p++) {
          const edgeIdx = (p * 7) % brainLineEndpoints.length;
          const edge = brainLineEndpoints[edgeIdx];
          const speedMultiplier = 1.0 + audioEnergy * 2.0;
          const edgeT = (time * (1.2 + (p % 3) * 0.4) * speedMultiplier + p * 0.18) % 1.0;

          pulsePositions[p * 3] = THREE.MathUtils.lerp(edge.start.x, edge.end.x, edgeT);
          pulsePositions[p * 3 + 1] = THREE.MathUtils.lerp(edge.start.y, edge.end.y, edgeT);
          pulsePositions[p * 3 + 2] = THREE.MathUtils.lerp(edge.start.z, edge.end.z, edgeT);
        }
        thoughtPulsesRef.current.geometry.attributes.position.needsUpdate = true;

        // Scale thought pulses with audio volume energy
        const pMat = thoughtPulsesRef.current.material as THREE.PointsMaterial;
        pMat.size = 0.16 + audioEnergy * 0.22;
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Morphing Particles (Scatter -> NN -> 3D Brain) */}
      <points ref={particlesRef} geometry={particleBuffer}>
        <pointsMaterial
          size={0.10}
          vertexColors
          transparent
          opacity={0.85}
          sizeAttenuation
        />
      </points>

      {/* Stage 2: Neural Network Inter-Layer Lines */}
      <lineSegments ref={layerLinesRef} geometry={layerLineBuffer} visible={false}>
        <lineBasicMaterial
          color="#818cf8"
          transparent
          opacity={0}
          depthWrite={false}
        />
      </lineSegments>

      {/* Stage 3: 3D Brain Cortical Synapse Network */}
      <lineSegments ref={brainLinesRef} geometry={brainLineBuffer} visible={false}>
        <lineBasicMaterial
          color="#6366f1"
          transparent
          opacity={0}
          depthWrite={false}
        />
      </lineSegments>

      {/* Action Potential Thought Pulses traveling through the Brain */}
      <points ref={thoughtPulsesRef} geometry={thoughtPulseBuffer} visible={false}>
        <pointsMaterial
          size={0.16}
          color="#38bdf8"
          transparent
          opacity={0.95}
          sizeAttenuation
        />
      </points>
    </group>
  );
};
