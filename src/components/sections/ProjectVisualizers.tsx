import React, { useState, useEffect } from 'react';
import { ShieldAlert, PhoneCall, Hand, Bot, Activity } from 'lucide-react';
import { soundManager } from '../../utils/audio';

interface VisualizerProps {
  interactiveType: string;
}

export const ProjectVisualizer: React.FC<VisualizerProps> = ({ interactiveType }) => {
  if (interactiveType === 'agent-shield') {
    return <AgentShieldVisualizer />;
  }
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

// 0. AgentShield — Zero-Trust AI Agent Security & Action Governance
const AgentShieldVisualizer: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState(0);

  const scenarios = [
    {
      agent: "Autonomous-Agent-09",
      target: "PostgreSQL Prod",
      tool: "db.execute_sql",
      payload: 'DROP TABLE customers_prod WHERE 1=1;',
      riskScore: 99,
      status: "BLOCKED",
      invariant: "Non-Admin + Production DELETE = Mandatory Block",
      latency: "11.4ms",
      reason: "Destructive DDL detected. Absolute policy invariant triggered.",
      auditId: "ASH-9041"
    },
    {
      agent: "FinOps-Worker",
      target: "Stripe API v1",
      tool: "stripe.transfers.create",
      payload: '{ amount: 50000, recipient: "external_wallet_0x" }',
      riskScore: 92,
      status: "BLOCKED",
      invariant: "Disallowed Action: Single Transfer > $1,000 threshold",
      latency: "14.8ms",
      reason: "Exceeds autonomous payment limit. Human escalation required.",
      auditId: "ASH-9042"
    },
    {
      agent: "DevOps-Assistant",
      target: "Linux File System",
      tool: "fs.read_file",
      payload: 'cat /etc/shadow || cat .env.production',
      riskScore: 97,
      status: "BLOCKED",
      invariant: "Host Security: Root secrets & credential path access prohibited",
      latency: "9.6ms",
      reason: "Attempted credential / environment variable extraction.",
      auditId: "ASH-9043"
    },
    {
      agent: "Research-Summarizer",
      target: "Internal Vector DB",
      tool: "vector.similarity_search",
      payload: '{ collection: "knowledge_base", top_k: 5 }',
      riskScore: 6,
      status: "PERMITTED",
      invariant: "Idempotent Read Operation: Clean policy pass",
      latency: "12.1ms",
      reason: "Safe vector read validated by Laya Decision Engine.",
      auditId: "ASH-9044"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveScenario((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const cur = scenarios[activeScenario];
  const isBlocked = cur.status === "BLOCKED";

  return (
    <div className="w-full h-full min-h-[220px] bg-slate-50/90 rounded-2xl border border-slate-200 p-4 relative flex flex-col justify-between overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between text-[11px] font-mono-tech border-b border-slate-200 pb-2">
        <div className="flex items-center gap-1.5 text-indigo-700 font-semibold">
          <ShieldAlert className="w-3.5 h-3.5 text-indigo-600" />
          <span>AGENTSHIELD // DECISION FIREWALL</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[10px]">
            ⚡ {cur.latency} (Sub-20ms)
          </span>
          <span className="text-slate-500 font-medium text-[10px] hidden sm:inline">FASTAPI GATEWAY</span>
        </div>
      </div>

      {/* Simulator Sandbox Terminal Console */}
      <div className="my-2 bg-slate-900 rounded-xl p-3 border border-slate-800 text-slate-100 font-mono-tech text-[10px] space-y-2 shadow-inner">
        <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 text-[9px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className={`inline-block w-2 h-2 rounded-full ${isBlocked ? 'bg-rose-500 animate-pulse' : 'bg-emerald-500'}`} />
            <span className="text-slate-200 font-semibold">{cur.agent}</span>
            <span className="text-slate-500">→</span>
            <span className="text-cyan-400">{cur.target}</span>
          </div>
          <span className="text-slate-400">SOC2 #{cur.auditId}</span>
        </div>

        {/* Intercepted Tool Action */}
        <div className="bg-slate-950/90 rounded-lg p-2 border border-slate-800/80">
          <div className="text-[9px] text-slate-400 flex items-center justify-between mb-0.5">
            <span className="text-indigo-400 font-bold">INTERCEPTED TOOL:</span>
            <span className="text-amber-400 font-semibold">{cur.tool}</span>
          </div>
          <div className="text-emerald-400 text-[10px] font-mono truncate">
            {cur.payload}
          </div>
        </div>

        {/* Risk Assessment & Invariant Decision */}
        <div className="flex items-center justify-between pt-0.5 gap-2">
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] text-slate-400">RISK SCORE:</span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
              isBlocked ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
            }`}>
              {cur.riskScore} / 100
            </span>
          </div>

          <div className={`px-2.5 py-0.5 rounded text-[9px] font-bold tracking-wide flex items-center gap-1 ${
            isBlocked ? 'bg-rose-600 text-white shadow-xs' : 'bg-emerald-600 text-white shadow-xs'
          }`}>
            <span>{isBlocked ? '🛡️ INVARIANT BLOCKED' : '✓ ACTION PERMITTED'}</span>
          </div>
        </div>

        <div className="text-[9px] text-slate-400 truncate">
          <span className="text-slate-300 font-semibold">Invariant:</span> {cur.invariant}
        </div>
      </div>

      {/* Simulator Scenario Selectors */}
      <div className="flex items-center justify-between gap-1.5 pt-1">
        <span className="text-[9px] font-mono-tech text-slate-500 font-bold uppercase hidden sm:inline">
          AUTONOMOUS SIMULATOR:
        </span>
        <div className="grid grid-cols-4 gap-1 w-full sm:w-auto flex-1 sm:flex-initial">
          {scenarios.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                soundManager.playSwitch();
                setActiveScenario(idx);
              }}
              className={`px-2 py-1 rounded text-[9px] font-mono-tech font-bold transition-all border truncate cursor-pointer ${
                activeScenario === idx
                  ? 'bg-slate-900 border-slate-900 text-white shadow-2xs'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              Test #{idx + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
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
