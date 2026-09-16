import React, { useState } from 'react';
import { FileText, ArrowRight, Terminal, Layers, Play, RotateCcw, Maximize2, Sparkles, Zap, AlertTriangle, Scissors, Box, Cpu } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import { NeuralCoreCanvas } from '../3d/NeuralCoreCanvas';
import type { SimulationMode, ArchitectureType, TrainingState } from '../3d/NeuralNodesMesh';
import { GithubIcon, LinkedinIcon } from '../common/BrandIcons';
import { scrollToSection } from '../../utils/helpers';
import { soundManager } from '../../utils/audio';

interface HeroSectionProps {
  onOpenResume: () => void;
  onOpenCommandPalette: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenResume,
  onOpenCommandPalette
}) => {
  const [simMode, setSimMode] = useState<SimulationMode>('forward');
  const [archType, setArchType] = useState<ArchitectureType>('cnn');
  const [trainingState, setTrainingState] = useState<TrainingState>('idle');
  const [hoveredNeuron, setHoveredNeuron] = useState<{
    id: string;
    activation: number;
    weight: number;
    layer: string;
  } | null>(null);

  const handleModeSwitch = (mode: SimulationMode) => {
    soundManager.playSwitch();
    setSimMode(mode);
  };

  const handleArchSwitch = (arch: ArchitectureType) => {
    soundManager.playSwitch();
    setArchType(arch);
  };

  const handleTrainEpoch = () => {
    soundManager.playTrainingSurge();
    setTrainingState('training');
    setTimeout(() => setTrainingState('idle'), 3200);
  };

  const handleInjectNoise = () => {
    soundManager.playAdversarialGlitch();
    setTrainingState('adversarial');
    setTimeout(() => setTrainingState('idle'), 2800);
  };

  const handlePrune8Bit = () => {
    soundManager.playPruningSlice();
    setTrainingState('pruned');
    setTimeout(() => setTrainingState('idle'), 4000);
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] pt-28 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center overflow-hidden"
    >
      {/* Soft Ambient Warm Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-indigo-100/40 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[400px] bg-sky-100/40 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column: Human Touch & Technical Positioning */}
        <div className="lg:col-span-6 space-y-6 text-left">
          {/* Calm Status Pill */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-indigo-100 bg-white/85 shadow-xs backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-beacon" />
            <span className="font-mono-tech text-xs font-semibold tracking-wider text-indigo-900 uppercase">
              {portfolioData.personal.headline}
            </span>
          </div>

          {/* Name & Title */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight text-slate-900 leading-[1.05]">
              <span>{portfolioData.personal.name}</span>
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-medium text-slate-600">
              {portfolioData.personal.title}
            </h2>
          </div>

          {/* Human-Centered Engineering Statement */}
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-xl">
            {portfolioData.personal.summary}
          </p>

          {/* Key Facts / Engineering Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2">
            <div className="cyber-panel p-3.5 rounded-2xl">
              <div className="font-mono-tech text-[11px] text-slate-500 uppercase tracking-wider">Experience</div>
              <div className="text-lg font-bold text-indigo-900 font-display mt-0.5">
                {portfolioData.personal.experienceYears} Years
              </div>
            </div>
            <div className="cyber-panel p-3.5 rounded-2xl">
              <div className="font-mono-tech text-[11px] text-slate-500 uppercase tracking-wider">LeetCode</div>
              <div className="text-lg font-bold text-indigo-900 font-display mt-0.5">
                {portfolioData.personal.leetcodeProblems} Solved
              </div>
            </div>
            <div className="cyber-panel p-3.5 rounded-2xl">
              <div className="font-mono-tech text-[11px] text-slate-500 uppercase tracking-wider">Dataset</div>
              <div className="text-lg font-bold text-indigo-900 font-display mt-0.5">
                486 Images
              </div>
            </div>
            <div className="cyber-panel p-3.5 rounded-2xl">
              <div className="font-mono-tech text-[11px] text-slate-500 uppercase tracking-wider">Methodology</div>
              <div className="text-lg font-bold text-indigo-900 font-display mt-0.5">
                CRISP-ML(Q)
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <button
              onClick={() => {
                soundManager.playClick();
                scrollToSection('projects');
              }}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-indigo-600 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              data-cursor="PROJECTS"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                scrollToSection('sandbox');
              }}
              className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-900 font-mono-tech text-xs transition-all shadow-xs"
              data-cursor="PLAYGROUND"
            >
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Live ML Sandbox</span>
            </button>

            <button
              onClick={() => {
                soundManager.playOpenModal();
                onOpenResume();
              }}
              className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-mono-tech text-xs transition-all shadow-xs"
              data-cursor="RESUME"
            >
              <FileText className="w-4 h-4 text-indigo-600" />
              <span>Resume</span>
            </button>

            <button
              onClick={() => {
                soundManager.playSwitch();
                onOpenCommandPalette();
              }}
              className="flex items-center gap-2 px-4 py-3.5 rounded-2xl border border-slate-200 bg-white/70 hover:bg-white text-slate-600 font-mono-tech text-xs transition-all shadow-xs"
              data-cursor="SEARCH"
              title="Open Command Palette (Cmd+K)"
            >
              <Terminal className="w-4 h-4 text-slate-500" />
              <span className="hidden sm:inline">Commands</span>
            </button>
          </div>

          {/* Verification Channels */}
          <div className="flex items-center gap-4 pt-3 border-t border-slate-200/80">
            <span className="font-mono-tech text-xs text-slate-500 uppercase tracking-wider">
              Verified Profiles:
            </span>
            <a
              href={portfolioData.personal.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-xs font-mono-tech text-slate-700 hover:text-indigo-600 transition-colors"
              data-cursor="GITHUB"
            >
              <GithubIcon className="w-3.5 h-3.5 text-slate-900" />
              <span>GitHub</span>
            </a>
            <a
              href={portfolioData.personal.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-xs font-mono-tech text-slate-700 hover:text-indigo-600 transition-colors"
              data-cursor="LINKEDIN"
            >
              <LinkedinIcon className="w-3.5 h-3.5 text-blue-600" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Right Column: Interactive 3D Deep Neural Network Model */}
        <div className="lg:col-span-6 h-[460px] sm:h-[520px] lg:h-[580px] relative w-full flex items-center justify-center">
          <div className="w-full h-full cyber-panel rounded-3xl p-3 relative overflow-hidden border border-slate-200/80 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.08)] bg-white/80">
            {/* Top Interactive Mode & Architecture Switcher */}
            <div className="absolute top-3 left-3 right-3 z-20 flex flex-col gap-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                {/* Architecture Selector Tabs */}
                <div className="flex items-center gap-1 p-1 rounded-xl bg-white/95 border border-slate-200 shadow-xs backdrop-blur-md">
                  <button
                    onClick={() => handleArchSwitch('cnn')}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-mono-tech transition-all ${
                      archType === 'cnn'
                        ? 'bg-slate-900 text-white font-semibold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Layers className="w-3 h-3 text-indigo-400" />
                    <span>CNN / MLP</span>
                  </button>

                  <button
                    onClick={() => handleArchSwitch('transformer')}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-mono-tech transition-all ${
                      archType === 'transformer'
                        ? 'bg-purple-600 text-white font-semibold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Cpu className="w-3 h-3 text-purple-200" />
                    <span>TRANSFORMER (QKV)</span>
                  </button>

                  <button
                    onClick={() => handleArchSwitch('pointcloud')}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-mono-tech transition-all ${
                      archType === 'pointcloud'
                        ? 'bg-teal-600 text-white font-semibold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Box className="w-3 h-3 text-teal-200" />
                    <span>3D POINT CLOUD</span>
                  </button>
                </div>

                {/* Simulation Mode Controller Pills */}
                <div className="flex items-center gap-1 p-1 rounded-xl bg-white/90 border border-slate-200/80 shadow-xs backdrop-blur-md">
                  <button
                    onClick={() => handleModeSwitch('forward')}
                    className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-mono-tech transition-all ${
                      simMode === 'forward'
                        ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                    title="Forward Inference Pass"
                  >
                    <Play className="w-2.5 h-2.5" />
                    <span>FWD</span>
                  </button>

                  <button
                    onClick={() => handleModeSwitch('backprop')}
                    className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-mono-tech transition-all ${
                      simMode === 'backprop'
                        ? 'bg-amber-500 text-white font-semibold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                    title="Backpropagation Loss Gradients"
                  >
                    <RotateCcw className="w-2.5 h-2.5" />
                    <span>BACK</span>
                  </button>

                  <button
                    onClick={() => handleModeSwitch('exploded')}
                    className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-mono-tech transition-all ${
                      simMode === 'exploded'
                        ? 'bg-purple-600 text-white font-semibold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                    title="Exploded 3D Tensor View"
                  >
                    <Maximize2 className="w-2.5 h-2.5" />
                    <span>EXPLODE</span>
                  </button>
                </div>
              </div>

              {/* Interactive Training & Pruning Simulator Controls */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-900/90 text-white text-[10px] font-mono-tech shadow-md backdrop-blur-md">
                <span className="text-slate-400 pl-2 pr-1 font-bold">SIMULATOR:</span>
                <button
                  onClick={handleTrainEpoch}
                  disabled={trainingState !== 'idle'}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all ${
                    trainingState === 'training'
                      ? 'bg-emerald-500 text-white font-bold animate-pulse'
                      : 'hover:bg-slate-800 text-emerald-400'
                  }`}
                  title="Train 1 Epoch with AdamW Optimizer"
                >
                  <Zap className="w-3 h-3" />
                  <span>{trainingState === 'training' ? 'TRAINING (AdamW)...' : 'Train (AdamW)'}</span>
                </button>

                <button
                  onClick={handleInjectNoise}
                  disabled={trainingState !== 'idle'}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all ${
                    trainingState === 'adversarial'
                      ? 'bg-rose-600 text-white font-bold animate-bounce'
                      : 'hover:bg-slate-800 text-amber-400'
                  }`}
                  title="Inject Adversarial Perturbation Noise"
                >
                  <AlertTriangle className="w-3 h-3" />
                  <span>{trainingState === 'adversarial' ? 'NOISE ATTACK!' : 'Inject Noise'}</span>
                </button>

                <button
                  onClick={handlePrune8Bit}
                  disabled={trainingState !== 'idle'}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all ${
                    trainingState === 'pruned'
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'hover:bg-slate-800 text-cyan-300'
                  }`}
                  title="8-Bit Quantization & 40% Weight Pruning"
                >
                  <Scissors className="w-3 h-3" />
                  <span>{trainingState === 'pruned' ? 'PRUNED 40%' : '8-Bit Prune'}</span>
                </button>
              </div>
            </div>

            {/* Hover Neuron Inspection Tooltip */}
            {hoveredNeuron && (
              <div className="absolute top-28 left-4 z-20 px-3 py-2 rounded-xl bg-slate-900/90 text-white font-mono-tech text-[10px] shadow-lg border border-slate-700 pointer-events-none animate-fadeIn">
                <div className="text-indigo-300 font-bold">{hoveredNeuron.layer} // {hoveredNeuron.id}</div>
                <div className="text-slate-300 mt-0.5">
                  Activation: <span className="text-emerald-400 font-semibold">{hoveredNeuron.activation}</span> | Weight: <span className="text-amber-400 font-semibold">{hoveredNeuron.weight}</span>
                </div>
              </div>
            )}

            {/* 3D Canvas */}
            <NeuralCoreCanvas
              simMode={simMode}
              archType={archType}
              trainingState={trainingState}
              onHoverNeuron={setHoveredNeuron}
            />

            {/* Bottom Dynamic Telemetry & Dimensions */}
            <div className="absolute bottom-3 left-3 right-3 z-20 pointer-events-none flex flex-wrap items-center justify-between px-3.5 py-2 rounded-xl bg-white/95 border border-slate-200/90 text-[10px] font-mono-tech text-slate-700 shadow-sm backdrop-blur-md">
              {trainingState === 'training' ? (
                <div className="flex items-center gap-2 text-emerald-600 font-bold animate-pulse w-full justify-between">
                  <span>⚡ OPTIMIZING: AdamW (lr=3e-4)</span>
                  <span>Loss: 0.038 ↓ | Acc: 98.6% ↑</span>
                </div>
              ) : trainingState === 'adversarial' ? (
                <div className="flex items-center gap-2 text-rose-600 font-bold animate-pulse w-full justify-between">
                  <span>⚠️ ADVERSARIAL PERTURBATION: ε = 0.08</span>
                  <span>Loss: 2.391 ↑ | Alert Triggered</span>
                </div>
              ) : trainingState === 'pruned' ? (
                <div className="flex items-center gap-2 text-cyan-700 font-bold w-full justify-between">
                  <span>✂️ QUANTIZED (INT8): 40% Synapses Pruned</span>
                  <span>Size: 35.2MB (-75%) | Latency: 4.8ms</span>
                </div>
              ) : (
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2 text-slate-500">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-beacon" />
                    <span>STATUS: {archType.toUpperCase()} READY</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span>Loss: <strong className="text-slate-900">0.054</strong></span>
                    <span>Val Acc: <strong className="text-indigo-600">97.8%</strong></span>
                    <span>DPR: <strong className="text-slate-900">1.75x</strong></span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
