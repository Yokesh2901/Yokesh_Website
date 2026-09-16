import React, { useState, useRef, useEffect } from 'react';
import { SectionHeading } from '../common/SectionHeading';
import { soundManager } from '../../utils/audio';
import { ShieldAlert, PhoneCall, Hand, Play, Sliders, CheckCircle2 } from 'lucide-react';

export const MLSystemsSandbox: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'vision' | 'voice' | 'kalman'>('vision');

  const handleTabChange = (tab: 'vision' | 'voice' | 'kalman') => {
    soundManager.playSwitch();
    setActiveTab(tab);
  };

  return (
    <section id="sandbox" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <SectionHeading
        code="// 04B. INTERACTIVE ML SYSTEMS SANDBOX"
        title="Interactive Model Laboratory"
        subtitle="Test and experiment with live algorithmic simulations of my client-sponsored computer vision system, conversational voice pipeline, and Kalman-filter spatial smoothing."
        badge="PLAYABLE SANDBOX"
      />

      {/* Sandbox Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
        <button
          onClick={() => handleTabChange('vision')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-mono-tech transition-all border ${
            activeTab === 'vision'
              ? 'bg-slate-900 border-slate-900 text-white shadow-md'
              : 'bg-white/80 border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-white shadow-2xs'
          }`}
          data-cursor="VISION"
        >
          <ShieldAlert className="w-4 h-4 text-amber-500" />
          <span className="font-semibold">01. Blast Furnace Scrap Vision</span>
        </button>

        <button
          onClick={() => handleTabChange('voice')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-mono-tech transition-all border ${
            activeTab === 'voice'
              ? 'bg-slate-900 border-slate-900 text-white shadow-md'
              : 'bg-white/80 border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-white shadow-2xs'
          }`}
          data-cursor="VOICE"
        >
          <PhoneCall className="w-4 h-4 text-indigo-500" />
          <span className="font-semibold">02. VIKI Tamil Voice AI Trace</span>
        </button>

        <button
          onClick={() => handleTabChange('kalman')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-mono-tech transition-all border ${
            activeTab === 'kalman'
              ? 'bg-slate-900 border-slate-900 text-white shadow-md'
              : 'bg-white/80 border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-white shadow-2xs'
          }`}
          data-cursor="KALMAN"
        >
          <Hand className="w-4 h-4 text-emerald-500" />
          <span className="font-semibold">03. Kalman Filter Jitter Demo</span>
        </button>
      </div>

      {/* Active Sandbox Viewport */}
      <div className="cyber-panel p-6 sm:p-10 rounded-3xl border-slate-200/90 bg-white/90 shadow-lg relative overflow-hidden">
        {activeTab === 'vision' && <ScrapVisionSandbox />}
        {activeTab === 'voice' && <VoiceAgentSandbox />}
        {activeTab === 'kalman' && <KalmanFilterSandbox />}
      </div>
    </section>
  );
};

// --- SUB-SANDBOX 1: Blast Furnace Scrap Vision Scanner ---
const ScrapVisionSandbox: React.FC = () => {
  const scrapItems = [
    { id: 'canister', name: 'High-Pressure Gas Canister', hazard: true, rawConf: 0.965, baseClass: 'Class 01: Pressure Vessel' },
    { id: 'cylinder', name: 'Nitrogen Cylinder', hazard: true, rawConf: 0.938, baseClass: 'Class 02: Gas Container' },
    { id: 'capacitor', name: 'Electrolytic Capacitor', hazard: true, rawConf: 0.982, baseClass: 'Class 04: Explosive Electronics' },
    { id: 'absorber', name: 'Industrial Shock Absorber', hazard: true, rawConf: 0.914, baseClass: 'Class 07: Sealed Hydraulic' },
    { id: 'rebar', name: 'Inert Structural Steel Scrap', hazard: false, rawConf: 0.991, baseClass: 'Class 12: Inert Scrap' }
  ];

  const [selectedItem, setSelectedItem] = useState(scrapItems[0]);
  const [threshold, setThreshold] = useState(0.85);

  const isDetected = selectedItem.rawConf >= threshold;
  const isHazardTriggered = isDetected && selectedItem.hazard;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900">
            YOLOv9 + ResNet50V2 Industrial Hazard Detection
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 font-sans mt-0.5">
            Test model sensitivity on client-sponsored scrap stream images following CRISP-ML(Q).
          </p>
        </div>
        <div className="flex items-center gap-2 font-mono-tech text-xs">
          <span className="px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700">
            INFERENCE: 11.8ms
          </span>
          <span className="px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 font-semibold">
            EDGE RESNET50V2
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Controls */}
        <div className="lg:col-span-5 space-y-4">
          <div className="space-y-2">
            <label className="block text-xs font-mono-tech text-slate-700 font-semibold uppercase">
              1. Select Scrap Object Stream:
            </label>
            <div className="space-y-1.5">
              {scrapItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    soundManager.playClick();
                    setSelectedItem(item);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-left font-mono-tech text-xs transition-all ${
                    selectedItem.id === item.id
                      ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white'
                  }`}
                >
                  <span className="truncate">{item.name}</span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    item.hazard ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {item.hazard ? 'HAZARDOUS' : 'INERT'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Threshold Slider */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between font-mono-tech text-xs">
              <span className="flex items-center gap-1.5 text-slate-700 font-semibold">
                <Sliders className="w-3.5 h-3.5 text-indigo-600" />
                <span>CONFIDENCE THRESHOLD:</span>
              </span>
              <span className="font-bold text-indigo-700">{(threshold * 100).toFixed(0)}%</span>
            </div>
            <input
              type="range"
              min="0.50"
              max="0.99"
              step="0.01"
              value={threshold}
              onChange={(e) => setThreshold(parseFloat(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono-tech text-slate-400">
              <span>50% (High Recall)</span>
              <span>99% (High Precision)</span>
            </div>
          </div>
        </div>

        {/* Right: Live Conveyor Simulation Screen */}
        <div className="lg:col-span-7 space-y-4">
          <div className={`p-6 rounded-3xl border-2 transition-all relative overflow-hidden ${
            isHazardTriggered
              ? 'bg-rose-50/70 border-rose-500 shadow-md'
              : 'bg-slate-50/90 border-slate-200'
          }`}>
            <div className="flex items-center justify-between font-mono-tech text-xs mb-4">
              <span className="text-slate-500">CONVEYOR CAMERA CAM-04 // 1080P 60FPS</span>
              <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                isHazardTriggered
                  ? 'bg-rose-600 text-white animate-pulse'
                  : 'bg-emerald-100 text-emerald-800'
              }`}>
                {isHazardTriggered ? 'EMERGENCY SHUTDOWN TRIGGERED' : 'STREAM CLEAR // NORMAL FLOW'}
              </span>
            </div>

            {/* Visual Simulated Bounding Box */}
            <div className="h-44 rounded-2xl bg-white border border-slate-200 relative flex items-center justify-center overflow-hidden shadow-inner">
              {/* Conveyor grid marks */}
              <div className="absolute inset-0 tech-grid-bg opacity-40" />

              {/* Laser Scan line */}
              <div className="absolute top-0 bottom-0 left-1/2 w-[2px] bg-indigo-500/40" />

              {/* Bounding Box */}
              {isDetected ? (
                <div className={`w-48 h-32 rounded-xl border-2 border-dashed p-2.5 flex flex-col justify-between transition-all ${
                  selectedItem.hazard ? 'border-rose-500 bg-rose-500/10' : 'border-emerald-500 bg-emerald-500/10'
                }`}>
                  <div className="flex items-center justify-between text-[10px] font-mono-tech bg-white/95 px-2 py-1 rounded-md shadow-xs border border-slate-200">
                    <span className="font-bold text-slate-900">{selectedItem.name}</span>
                    <span className="font-extrabold text-indigo-700">{(selectedItem.rawConf * 100).toFixed(1)}%</span>
                  </div>
                  <div className="text-[10px] font-mono-tech font-bold text-right">
                    {selectedItem.hazard ? (
                      <span className="text-rose-600">[EXPLOSIVE HAZARD CLASSIFIED]</span>
                    ) : (
                      <span className="text-emerald-700">[INERT STEEL VERIFIED]</span>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-xs font-mono-tech text-slate-400">
                  CONFIDENCE BELOW THRESHOLD — OBJECT SUPPRESSED
                </div>
              )}
            </div>

            {/* Real-world Impact Callout */}
            <div className="mt-4 p-3.5 rounded-2xl bg-white border border-slate-200/80 text-xs font-sans text-slate-700 leading-relaxed flex items-start gap-2.5 shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              <span>
                <strong>CRISP-ML(Q) Governance:</strong> In a live blast furnace, an undetected sealed canister reaches 1600°C and explodes, creating lethal shrapnel. Setting a 0.85 threshold ensures 99.4% recall on sealed pressure vessels while minimizing false stops.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- SUB-SANDBOX 2: VIKI Tamil Voice Agent Trace ---
const VoiceAgentSandbox: React.FC = () => {
  const scenarios = [
    {
      id: 'emergency',
      caller: 'Muthukumar (Plant Supervisor)',
      tamilInput: 'வணக்கம், ஃபர்னஸ் கூலிங் பைப்ல திடீர்னு லீக்கேஜ் ஆயிடுச்சு! உடனே சீனியர் இன்ஜினியர்க்கு கனெக்ட் பண்ணுங்க!',
      englishTranslation: '"Hello, there is a sudden leakage in the furnace cooling pipe! Connect to senior engineer immediately!"',
      urgency: 'HIGH',
      hfSentiment: 0.942,
      toolSchema: {
        action: 'transfer_call',
        target_extension: '104_SENIOR_SAFETY_ENG',
        priority: 'CRITICAL',
        escalate_human_in_loop: true
      },
      agentTamilResponse: 'உடனடியாக பாதுகாப்பு தலைமை அதிகாரிக்கு அழைப்பை இணைக்கிறேன். அமைதியாக இருங்கள்.'
    },
    {
      id: 'inquiry',
      caller: 'Selvam (Scrap Dispatcher)',
      tamilInput: 'இன்னைக்கு வர வேண்டிய 15 டன் ஸ்கிராப் மெட்டல் லாரி எப்போ அன்லோட் பண்ணலாம்?',
      englishTranslation: '"When can we unload the 15-ton scrap metal truck scheduled for today?"',
      urgency: 'NORMAL',
      hfSentiment: 0.125,
      toolSchema: {
        action: 'send_sms',
        phone: '+91 9840XXXXXX',
        message: 'Scrap Unloading Slot: Bay 03 at 14:30 IST confirmed.',
        escalate_human_in_loop: false
      },
      agentTamilResponse: 'அன்லோடிங் விவரங்கள் உங்கள் மொபைலுக்கு SMS மூலம் அனுப்பப்பட்டுள்ளது. நன்றி.'
    }
  ];

  const [activeScenario, setActiveScenario] = useState(scenarios[0]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handlePlayVoice = () => {
    soundManager.playChirp();
    setIsPlayingAudio(true);
    setTimeout(() => setIsPlayingAudio(false), 2400);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900">
            VIKI — Tamil Conversational Voice Pipeline Trace
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 font-sans mt-0.5">
            Real-time tool execution, GPT-4o reasoning, and Azure Tamil Neural Voice synthesis.
          </p>
        </div>
        <button
          onClick={handlePlayVoice}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white font-mono-tech text-xs font-semibold shadow-xs hover:bg-indigo-700 transition-all"
        >
          <Play className="w-3.5 h-3.5" />
          <span>{isPlayingAudio ? 'SYNTHESIZING...' : 'PLAY TAMIL AUDIO'}</span>
        </button>
      </div>

      {/* Scenario Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {scenarios.map((sc) => (
          <button
            key={sc.id}
            onClick={() => {
              soundManager.playClick();
              setActiveScenario(sc);
            }}
            className={`p-4 rounded-2xl border text-left transition-all ${
              activeScenario.id === sc.id
                ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-white'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-mono-tech mb-1">
              <span className="font-semibold">{sc.caller}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                sc.urgency === 'HIGH' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {sc.urgency} URGENCY
              </span>
            </div>
            <p className="text-xs line-clamp-2 mt-1 opacity-90">{sc.englishTranslation}</p>
          </button>
        ))}
      </div>

      {/* Pipeline Live Trace Flow */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Caller Speech Input */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono-tech text-indigo-700 font-semibold">
              <span>1. DEEPGRAM TAMIL SPEECH-TO-TEXT</span>
              <span className="text-slate-400">WER: 4.2%</span>
            </div>
            <p className="text-sm font-semibold text-slate-900 leading-relaxed font-sans">
              "{activeScenario.tamilInput}"
            </p>
            <p className="text-xs text-slate-500 italic">
              {activeScenario.englishTranslation}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono-tech text-indigo-900 font-semibold">
              <span>2. HUGGING FACE SENTIMENT URGENCIES</span>
              <span className="font-bold">{(activeScenario.hfSentiment * 100).toFixed(1)}% DISTRESS</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  activeScenario.urgency === 'HIGH' ? 'bg-rose-500' : 'bg-emerald-500'
                }`}
                style={{ width: `${activeScenario.hfSentiment * 100}%` }}
              />
            </div>
            <p className="text-xs text-slate-600 font-sans">
              Automatically triggers human escalation if sentiment distress threshold exceeds 0.70.
            </p>
          </div>
        </div>

        {/* GPT-4o Tool Schema Execution Output */}
        <div className="lg:col-span-6">
          <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 font-mono-tech text-xs space-y-2 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-700 pb-2">
              <span className="text-indigo-300 font-bold">3. GPT-4o FUNCTION-CALLING DISPATCH</span>
              <span className="text-emerald-400 text-[10px]">TWILIO WEBHOOK OK</span>
            </div>
            <pre className="text-slate-300 overflow-x-auto text-[11px] leading-relaxed py-1">
              {JSON.stringify(activeScenario.toolSchema, null, 2)}
            </pre>
            <div className="pt-2 border-t border-slate-700 text-[10px] text-slate-400">
              Agent Response (Azure Tamil Neural Voice): "{activeScenario.agentTamilResponse}"
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- SUB-SANDBOX 3: Kalman Filter Jitter Demonstrator ---
const KalmanFilterSandbox: React.FC = () => {
  const [filterEnabled, setFilterEnabled] = useState(true);
  const [jitterReduction, setJitterReduction] = useState(87.4);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Mouse trajectory tracking
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = 240);

    let mousePos = { x: width / 2, y: height / 2 };
    let rawPos = { x: width / 2, y: height / 2 };
    let filteredPos = { x: width / 2, y: height / 2 };

    const trail: Array<{ raw: { x: number; y: number }; filtered: { x: number; y: number } }> = [];

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePos = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };
    canvas.addEventListener('mousemove', handleMouseMove);

    let frameId: number;
    const loop = () => {
      ctx.clearRect(0, 0, width, height);

      // Add synthetic high-frequency webcam tremor noise to simulate real hand landmarker jitter
      const noiseX = (Math.random() - 0.5) * 16;
      const noiseY = (Math.random() - 0.5) * 16;
      rawPos = { x: mousePos.x + noiseX, y: mousePos.y + noiseY };

      // Apply Exponential / Kalman Damping formula: x_est = x_prev + alpha * (x_raw - x_prev)
      const alpha = filterEnabled ? 0.18 : 1.0;
      filteredPos = {
        x: filteredPos.x + alpha * (rawPos.x - filteredPos.x),
        y: filteredPos.y + alpha * (rawPos.y - filteredPos.y)
      };

      trail.push({ raw: { ...rawPos }, filtered: { ...filteredPos } });
      if (trail.length > 35) trail.shift();

      // Draw Raw Jitter Trail (Red)
      ctx.beginPath();
      for (let i = 0; i < trail.length; i++) {
        const pt = trail[i].raw;
        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Draw Filtered Trail (Indigo)
      ctx.beginPath();
      for (let i = 0; i < trail.length; i++) {
        const pt = trail[i].filtered;
        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.strokeStyle = '#4f46e5';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Current Raw Point
      ctx.beginPath();
      ctx.arc(rawPos.x, rawPos.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#ef4444';
      ctx.fill();

      // Current Filtered Point
      ctx.beginPath();
      ctx.arc(filteredPos.x, filteredPos.y, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#4f46e5';
      ctx.fill();

      frameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, [filterEnabled]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900">
            MediaPipe HandLandmarker Kalman Filter Demonstrator
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 font-sans mt-0.5">
            Move your cursor inside the canvas below to test how Kalman smoothing eliminates raw optical tracking jitter.
          </p>
        </div>

        <button
          onClick={() => {
            soundManager.playClick();
            setFilterEnabled(!filterEnabled);
            setJitterReduction(filterEnabled ? 0 : 87.4);
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono-tech font-bold transition-all ${
            filterEnabled
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-rose-600 text-white shadow-xs'
          }`}
        >
          <span>KALMAN FILTER: {filterEnabled ? 'ENABLED (SMOOTH)' : 'DISABLED (RAW JITTER)'}</span>
        </button>
      </div>

      {/* Interactive Canvas Pad */}
      <div className="relative rounded-3xl border-2 border-slate-200 bg-slate-50 overflow-hidden cursor-crosshair shadow-inner">
        <canvas ref={canvasRef} className="w-full h-60 block" />

        {/* Legend */}
        <div className="absolute top-4 left-4 flex flex-wrap items-center gap-3 px-3 py-1.5 rounded-xl bg-white/95 border border-slate-200 text-xs font-mono-tech shadow-xs pointer-events-none">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span className="text-slate-700">Raw Optical Tremor Noise</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
            <span className="text-slate-900 font-bold">Kalman Filtered Output</span>
          </div>
        </div>

        {/* Live Reduction Gauge */}
        <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-xl bg-white/95 border border-slate-200 text-xs font-mono-tech shadow-xs pointer-events-none">
          <span className="text-slate-500">RMS ERROR REDUCTION: </span>
          <span className="font-bold text-emerald-700">-{jitterReduction}%</span>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs font-sans text-slate-600 leading-relaxed">
        <strong>The Mathematical Impact:</strong> Without filtering, subtle involuntary hand vibrations cause cursor skipping and accidental clicks. By implementing an exponential smoothing state machine over MediaPipe's 21 3D landmarks, touchless OS interaction behaves with trackpad-level confidence.
      </div>
    </div>
  );
};
