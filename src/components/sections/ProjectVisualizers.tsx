import React, { useState, useEffect } from 'react';
import { ShieldAlert, PhoneCall, Hand, Bot, Activity } from 'lucide-react';

interface VisualizerProps {
  interactiveType: string;
}

export const ProjectVisualizer: React.FC<VisualizerProps> = ({ interactiveType }) => {
  if (interactiveType === 'blast-furnace') {
    return <BlastFurnaceScanner />;
  }
  if (interactiveType === 'voice-viki') {
    return <VikiVoiceVisualizer />;
  }
  if (interactiveType === 'hand-gesture') {
    return <HandGestureVisualizer />;
  }
  if (interactiveType === 'agent-cron') {
    return <AgentCronVisualizer />;
  }
  return <TelemetryVisualizer type={interactiveType} />;
};

// 1. Blast Furnace Hazardous Object Scanner
const BlastFurnaceScanner: React.FC = () => {
  const [scanPos, setScanPos] = useState(20);
  const [detectedItem, setDetectedItem] = useState<{ name: string; conf: string; hazard: boolean }>({
    name: 'Sealed Gas Canister',
    conf: '96.4%',
    hazard: true
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setScanPos((prev) => (prev > 80 ? 15 : prev + 1.2));
    }, 40);

    const itemInterval = setInterval(() => {
      const items = [
        { name: 'High-Pressure Gas Canister', conf: '96.8%', hazard: true },
        { name: 'Industrial Shock Absorber', conf: '94.2%', hazard: true },
        { name: 'Electrolytic Capacitor', conf: '98.1%', hazard: true },
        { name: 'Sealed Motor Core', conf: '92.5%', hazard: true },
        { name: 'Inert Steel Fragment', conf: '99.1%', hazard: false }
      ];
      setDetectedItem(items[Math.floor(Math.random() * items.length)]);
    }, 3200);

    return () => {
      clearInterval(interval);
      clearInterval(itemInterval);
    };
  }, []);

  return (
    <div className="w-full h-full min-h-[220px] bg-slate-50/90 rounded-2xl border border-slate-200 p-4 relative overflow-hidden flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between text-[11px] font-mono-tech border-b border-slate-200 pb-2">
        <div className="flex items-center gap-1.5 text-amber-700 font-semibold">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
          <span>SCRAP CONVEYOR INFERENCE // CRISP-ML(Q)</span>
        </div>
        <span className="text-indigo-600 font-bold">YOLOv9 + ResNet50V2</span>
      </div>

      {/* Simulated Scrap Stream */}
      <div className="relative my-3 h-28 border border-slate-200 rounded-xl bg-white overflow-hidden flex items-center justify-center shadow-xs">
        {/* Moving Laser Scanner Line */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-indigo-500 shadow-sm z-10"
          style={{ left: `${scanPos}%` }}
        />

        {/* Bounding Box Simulation */}
        <div className="absolute w-32 h-20 border-2 border-dashed border-rose-500 bg-rose-50/70 rounded-lg flex flex-col justify-between p-2">
          <div className="flex items-center justify-between text-[9px] font-mono-tech text-rose-800 font-bold bg-white/95 px-1.5 py-0.5 rounded shadow-xs border border-rose-200">
            <span>{detectedItem.name}</span>
            <span>{detectedItem.conf}</span>
          </div>
          <div className="text-[8px] font-mono-tech text-rose-600 font-bold text-right">
            [HAZARDOUS DETECTED]
          </div>
        </div>

        <div className="text-slate-300 font-mono-tech text-xs tracking-widest select-none">
          CONVEYOR STREAM // 12 CLASSES
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-2 text-[10px] font-mono-tech">
        <div className="p-2 rounded-xl bg-white border border-slate-200 text-center shadow-2xs">
          <div className="text-slate-500">ANNOTATED</div>
          <div className="text-indigo-900 font-bold">486 IMAGES</div>
        </div>
        <div className="p-2 rounded-xl bg-white border border-slate-200 text-center shadow-2xs">
          <div className="text-slate-500">CLASSES</div>
          <div className="text-indigo-900 font-bold">12 HAZARDOUS</div>
        </div>
        <div className="p-2 rounded-xl bg-white border border-slate-200 text-center shadow-2xs">
          <div className="text-slate-500">DEPLOYMENT</div>
          <div className="text-emerald-700 font-bold">AWS EC2 / S3</div>
        </div>
      </div>
    </div>
  );
};

// 2. VIKI Voice Assistant
const VikiVoiceVisualizer: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev >= 4 ? 0 : prev + 1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { label: 'Deepgram STT', desc: 'Tamil Audio' },
    { label: 'GPT-4o', desc: 'Reasoning Schema' },
    { label: 'HF Sentiment', desc: 'Urgency Detection' },
    { label: 'Twilio Gateway', desc: 'Call / SMS Transfer' }
  ];

  return (
    <div className="w-full h-full min-h-[220px] bg-slate-50/90 rounded-2xl border border-slate-200 p-4 relative flex flex-col justify-between">
      <div className="flex items-center justify-between text-[11px] font-mono-tech border-b border-slate-200 pb-2">
        <div className="flex items-center gap-1.5 text-indigo-700 font-semibold">
          <PhoneCall className="w-3.5 h-3.5 text-indigo-600" />
          <span>TAMIL AI VOICE CONVERSATIONAL PIPELINE</span>
        </div>
        <span className="text-slate-600 font-medium">AZURE NEURAL TTS</span>
      </div>

      {/* Simulated Waveform */}
      <div className="my-2 flex items-center justify-center gap-1.5 h-16 bg-white rounded-xl border border-slate-200 px-3 shadow-xs">
        {[30, 65, 85, 45, 95, 60, 80, 30, 90, 70, 40, 85, 55, 90, 35].map((h, i) => (
          <div
            key={i}
            className="w-1.5 rounded-full bg-indigo-500 transition-all duration-300"
            style={{
              height: `${(h * (Math.sin(Date.now() / 300 + i) + 1.2)) / 2}%`,
              opacity: 0.5 + (i % 2) * 0.5
            }}
          />
        ))}
      </div>

      {/* Steps */}
      <div className="grid grid-cols-4 gap-1 text-[9px] font-mono-tech">
        {steps.map((step, idx) => {
          const isActive = activeStep === idx;
          return (
            <div
              key={step.label}
              className={`p-1.5 rounded-lg text-center border transition-all ${
                isActive
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-xs'
                  : 'bg-white border-slate-200 text-slate-600'
              }`}
            >
              <div className="font-bold truncate">{step.label}</div>
              <div className="text-[8px] truncate">{step.desc}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// 3. Hand Gesture System Control
const HandGestureVisualizer: React.FC = () => {
  const [gesture, setGesture] = useState('CURSOR_TRACKING');

  useEffect(() => {
    const gestures = ['CURSOR_TRACKING', 'LEFT_CLICK', 'SCROLL_UP', 'VOLUME_UP', 'SYSTEM_PAUSED'];
    const interval = setInterval(() => {
      setGesture(gestures[Math.floor(Math.random() * gestures.length)]);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full min-h-[220px] bg-slate-50/90 rounded-2xl border border-slate-200 p-4 relative flex flex-col justify-between">
      <div className="flex items-center justify-between text-[11px] font-mono-tech border-b border-slate-200 pb-2">
        <div className="flex items-center gap-1.5 text-indigo-700 font-semibold">
          <Hand className="w-3.5 h-3.5 text-indigo-600" />
          <span>MEDIAPIPE HANDLANDMARKER 3D</span>
        </div>
        <span className="text-emerald-700 font-semibold">KALMAN FILTER SMOOTHING</span>
      </div>

      {/* Skeletal Graph */}
      <div className="relative h-28 my-2 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-xs">
        <svg className="w-36 h-24 stroke-indigo-600 fill-indigo-600" viewBox="0 0 100 80">
          <path d="M 50 70 L 30 45 L 20 25" strokeWidth="1.5" fill="none" opacity="0.6" />
          <path d="M 50 70 L 40 35 L 35 15" strokeWidth="1.5" fill="none" opacity="0.6" />
          <path d="M 50 70 L 52 32 L 52 10" strokeWidth="1.5" fill="none" opacity="0.6" />
          <path d="M 50 70 L 65 38 L 70 18" strokeWidth="1.5" fill="none" opacity="0.6" />
          <path d="M 50 70 L 75 52 L 85 40" strokeWidth="1.5" fill="none" opacity="0.6" />

          <circle cx="50" cy="70" r="3" />
          <circle cx="30" cy="45" r="2" />
          <circle cx="20" cy="25" r="2" />
          <circle cx="40" cy="35" r="2" />
          <circle cx="35" cy="15" r="2" />
          <circle cx="52" cy="32" r="2" />
          <circle cx="52" cy="10" r="2.5" fill="#4f46e5" />
          <circle cx="65" cy="38" r="2" />
          <circle cx="70" cy="18" r="2" />
          <circle cx="75" cy="52" r="2" />
          <circle cx="85" cy="40" r="2" />
        </svg>

        <div className="absolute top-2 right-2 px-2.5 py-1 rounded-full bg-slate-900 text-white text-[9px] font-mono-tech shadow-xs">
          STATE: {gesture}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-[10px] font-mono-tech text-center">
        <div className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600">
          YOLOv8 DETECT
        </div>
        <div className="p-1.5 rounded-lg bg-white border border-slate-200 text-indigo-900 font-bold">
          21 3D LANDMARKS
        </div>
        <div className="p-1.5 rounded-lg bg-white border border-slate-200 text-emerald-700 font-bold">
          ZERO-JITTER
        </div>
      </div>
    </div>
  );
};

// 4. StudCatalyst Autonomous Agent
const AgentCronVisualizer: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[220px] bg-slate-50/90 rounded-2xl border border-slate-200 p-4 relative flex flex-col justify-between">
      <div className="flex items-center justify-between text-[11px] font-mono-tech border-b border-slate-200 pb-2">
        <div className="flex items-center gap-1.5 text-indigo-700 font-semibold">
          <Bot className="w-3.5 h-3.5 text-indigo-600" />
          <span>STUDCATALYST AUTONOMOUS PIPELINE</span>
        </div>
        <span className="text-slate-600">CRON TRIGGERED</span>
      </div>

      <div className="space-y-1.5 my-2 text-[10px] font-mono-tech">
        <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200 shadow-2xs">
          <span className="text-slate-700 font-medium">1. GitHub Ingestion</span>
          <span className="text-emerald-700 font-bold">[Repo Detected]</span>
        </div>
        <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200 shadow-2xs">
          <span className="text-slate-700 font-medium">2. Playwright Headless Sandbox</span>
          <span className="text-indigo-700 font-bold">[Slides Rendered]</span>
        </div>
        <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200 shadow-2xs">
          <span className="text-slate-700 font-medium">3. Gemini API Multimodality</span>
          <span className="text-purple-700 font-bold">[Copy Generated]</span>
        </div>
        <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200 shadow-2xs">
          <span className="text-slate-700 font-medium">4. Instagram Graph API</span>
          <span className="text-amber-700 font-bold">[Carousel Published]</span>
        </div>
      </div>

      <div className="text-[9px] font-mono-tech text-slate-500 text-right">
        EXPONENTIAL BACKOFF RETRY LOGIC & DEDUP PERSISTENCE
      </div>
    </div>
  );
};

// 5. Default Telemetry Visualizer
const TelemetryVisualizer: React.FC<{ type: string }> = ({ type }) => {
  return (
    <div className="w-full h-full min-h-[220px] bg-slate-50/90 rounded-2xl border border-slate-200 p-4 relative flex flex-col justify-between">
      <div className="flex items-center justify-between text-[11px] font-mono-tech border-b border-slate-200 pb-2">
        <div className="flex items-center gap-1.5 text-indigo-700 font-semibold">
          <Activity className="w-3.5 h-3.5 text-indigo-600" />
          <span>INFERENCE METRICS TELEMETRY</span>
        </div>
        <span className="text-slate-600 uppercase font-medium">{type.replace('-', ' ')}</span>
      </div>

      <div className="my-3 h-28 bg-white rounded-xl border border-slate-200 flex items-center justify-center p-3 relative overflow-hidden shadow-xs">
        <div className="w-full flex items-end justify-between gap-1.5 h-20">
          {[35, 60, 45, 80, 50, 90, 75, 40, 85, 65, 95, 70, 60, 88].map((val, idx) => (
            <div
              key={idx}
              className="flex-1 bg-gradient-to-t from-indigo-200 to-indigo-600 rounded-t"
              style={{ height: `${val}%` }}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] font-mono-tech text-slate-500">
        <span>PREDICTIVE ACCURACY: OPTIMIZED</span>
        <span className="text-indigo-700 font-semibold">STREAMLIT DEPLOYED</span>
      </div>
    </div>
  );
};
