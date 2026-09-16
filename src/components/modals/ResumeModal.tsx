import React from 'react';
import { X, Printer, Mail, Phone, MapPin } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import { soundManager } from '../../utils/audio';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleClose = () => {
    soundManager.playClick();
    onClose();
  };

  const handlePrint = () => {
    soundManager.playClick();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-900/40 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="w-full max-w-4xl cyber-panel rounded-3xl border border-slate-200 p-4 sm:p-8 relative my-auto shadow-2xl bg-white text-slate-900">
        {/* Modal Header Controls */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6 print:hidden">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-beacon" />
            <span className="font-mono-tech text-xs text-slate-800 font-bold uppercase tracking-wider">
              VERIFIED OFFICIAL RESUME DOSSIER
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white font-semibold text-xs shadow-sm hover:bg-indigo-600 transition-all"
              data-cursor="PRINT"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-white" />
              <span>PRINT / SAVE PDF</span>
            </button>

            <button
              onClick={handleClose}
              className="p-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-colors"
              data-cursor="CLOSE"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable ATS Document Body */}
        <div className="bg-[#ffffff] p-6 sm:p-10 rounded-2xl border border-slate-200 text-slate-800 font-sans text-xs sm:text-sm leading-relaxed max-h-[75vh] overflow-y-auto print:max-h-none print:p-0 print:border-none shadow-xs">
          {/* Header */}
          <div className="text-center border-b border-slate-200 pb-5 mb-5">
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 tracking-wide uppercase">
              {portfolioData.personal.name}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-2 text-xs font-mono-tech text-slate-600">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-indigo-600 print:hidden" />
                {portfolioData.personal.location}
              </span>
              <span>|</span>
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3 text-indigo-600 print:hidden" />
                {portfolioData.personal.phone}
              </span>
              <span>|</span>
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3 text-indigo-600 print:hidden" />
                {portfolioData.personal.email}
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-1.5 text-xs font-mono-tech text-indigo-700">
              <a href={portfolioData.personal.linkedin} target="_blank" rel="noreferrer">
                linkedin.com/in/yokesh-s-590332260
              </a>
              <span>|</span>
              <a href={portfolioData.personal.github} target="_blank" rel="noreferrer">
                github.com/Yokesh2901
              </a>
            </div>
          </div>

          {/* SUMMARY */}
          <div className="mb-5">
            <h2 className="font-mono-tech text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1 mb-2">
              SUMMARY
            </h2>
            <p className="text-slate-700 leading-relaxed font-sans text-xs sm:text-[13px]">
              {portfolioData.personal.summary}
            </p>
          </div>

          {/* CORE SKILLS */}
          <div className="mb-5">
            <h2 className="font-mono-tech text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1 mb-2">
              CORE SKILLS
            </h2>
            <div className="space-y-1 text-xs text-slate-700">
              <div>
                <strong className="text-slate-900 font-semibold">Languages: </strong>
                Python (Primary), SQL, TypeScript, Java
              </div>
              <div>
                <strong className="text-slate-900 font-semibold">ML & NLP: </strong>
                Scikit-learn, TensorFlow, NumPy, Pandas, Hugging Face (Sentiment Analysis, Speech-to-Text), LLM Integration (GPT-4o, Gemini), Predictive Modeling
              </div>
              <div>
                <strong className="text-slate-900 font-semibold">Deep Learning & CV: </strong>
                YOLOv9, YOLOv8, ResNet50V2, MediaPipe, OpenCV, Data Augmentation (Albumentations)
              </div>
              <div>
                <strong className="text-slate-900 font-semibold">Data Engineering: </strong>
                ETL Pipeline Design, Data Ingestion & Processing, Azure Data Factory, Azure Synapse Analytics, Data Governance & Quality
              </div>
              <div>
                <strong className="text-slate-900 font-semibold">Backend & APIs: </strong>
                Flask, RESTful API Integration, Webhooks, JSON/Structured Data
              </div>
              <div>
                <strong className="text-slate-900 font-semibold">Methodology & Practices: </strong>
                CRISP-ML(Q), EDA, Model Evaluation, Git, Testing & Debugging, Agile Collaboration
              </div>
            </div>
          </div>

          {/* PROJECTS */}
          <div className="mb-5">
            <h2 className="font-mono-tech text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1 mb-2">
              KEY PRODUCTION PROJECTS
            </h2>
            <div className="space-y-3">
              <div>
                <div className="font-bold text-slate-900">
                  ● VIKI — Tamil AI Voice Assistant <span className="font-normal text-slate-500 text-xs font-mono-tech">(Python, Flask, GPT-4o, Hugging Face, Deepgram, Twilio)</span>
                </div>
                <p className="text-xs text-slate-700 mt-0.5">
                  Built a production conversational AI pipeline: integrated an LLM (GPT-4o) for reasoning with a structured function-calling tool schema, and applied Hugging Face models for sentiment analysis and speech-to-text; built a Flask backend executing real-world actions triggered by model outputs, with a human-in-the-loop escalation path.
                </p>
              </div>

              <div>
                <div className="font-bold text-slate-900">
                  ● Hazardous Substance Detection for Blast Furnace Safety <span className="font-normal text-slate-500 text-xs font-mono-tech">(Python, YOLOv9, ResNet50V2, AWS, Flask)</span>
                </div>
                <p className="text-xs text-slate-700 mt-0.5">
                  Delivered a client-sponsored deep learning detection system end-to-end following CRISP-ML(Q): built a custom 486-image annotated dataset, applied a full data augmentation pipeline, developed and validated multiple model architectures, and designed a scalable Flask/EC2/S3 deployment architecture with model compression for edge deployment.
                </p>
              </div>

              <div>
                <div className="font-bold text-slate-900">
                  ● Hand Gesture System Control <span className="font-normal text-slate-500 text-xs font-mono-tech">(Python, OpenCV, MediaPipe, YOLOv8, PyAutoGUI)</span>
                </div>
                <p className="text-xs text-slate-700 mt-0.5">
                  Built a real-time hand-tracking system using MediaPipe's HandLandmarker to control the OS — cursor movement, left/right click, scroll, and volume — mapped to distinct finger-position gestures; combined YOLOv8-based detection with landmark tracking and a Kalman-filter/exponential-smoothing layer to reduce cursor jitter, with an activation-gesture state machine to prevent unintended input.
                </p>
              </div>

              <div>
                <div className="font-bold text-slate-900">
                  ● StudCatalyst Automation Agent <span className="font-normal text-slate-500 text-xs font-mono-tech">(TypeScript, Node.js, Gemini API)</span>
                </div>
                <p className="text-xs text-slate-700 mt-0.5">
                  Developed and implemented a production automation service integrating an LLM (Gemini) for content generation within a multi-step REST pipeline, with reliable error handling and retry logic.
                </p>
              </div>
            </div>
          </div>

          {/* PROFESSIONAL EXPERIENCE */}
          <div className="mb-5">
            <h2 className="font-mono-tech text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1 mb-2">
              PROFESSIONAL EXPERIENCE
            </h2>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-baseline font-bold text-slate-900">
                  <span>Analyst — Innodata</span>
                  <span className="font-mono-tech text-xs text-slate-500 font-normal">Feb 2026 – Jul 2026</span>
                </div>
                <ul className="list-disc pl-5 mt-1 text-xs text-slate-700 space-y-1">
                  <li>Analyzed large-scale datasets using SQL and Python, applying data governance standards and quality checks to ensure accuracy before delivery.</li>
                  <li>Collaborated with cross-functional stakeholders in an Agile environment, translating requirements into technical approaches during sprint planning.</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-baseline font-bold text-slate-900">
                  <span>ML Data Associate — Amazon</span>
                  <span className="font-mono-tech text-xs text-slate-500 font-normal">Feb 2024 – Aug 2025</span>
                </div>
                <ul className="list-disc pl-5 mt-1 text-xs text-slate-700 space-y-1">
                  <li>Built and tested SQL/Python data pipelines supporting ML model evaluation, improving processing efficiency and reliability.</li>
                  <li>Worked independently within Agile sprint cycles alongside engineers and product owners, owning tasks from analysis through delivery.</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-baseline font-bold text-slate-900">
                  <span>Data Science Intern — Innodatatics</span>
                  <span className="font-mono-tech text-xs text-slate-500 font-normal">Feb 2024 – Jun 2024 | Jun 2025 – Nov 2025</span>
                </div>
                <ul className="list-disc pl-5 mt-1 text-xs text-slate-700 space-y-1">
                  <li>Developed and tested ETL pipelines in Python and SQL, integrating structured and unstructured data sources.</li>
                  <li>Built cloud-based data pipelines using Azure Data Factory and Azure Synapse Analytics, owning documentation and data-flow architecture.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* EDUCATION */}
          <div className="mb-5">
            <h2 className="font-mono-tech text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1 mb-2">
              EDUCATION
            </h2>
            <div className="text-xs text-slate-700">
              <strong className="text-slate-900">BCA — Bachelor of Computer Applications</strong>, University of Madras | CGPA: 7.4/10 | 2023
            </div>
          </div>

          {/* CERTIFICATIONS & HIGHLIGHTS */}
          <div>
            <h2 className="font-mono-tech text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1 mb-2">
              CERTIFICATIONS & HIGHLIGHTS
            </h2>
            <ul className="list-disc pl-5 text-xs text-slate-700 space-y-1">
              <li>Microsoft Power BI — Certified | Data Science Using Python & R Programming — 360DigiTMG</li>
              <li>Python 101 for Data Science (PY0101EN) — IBM/CognitiveClass</li>
              <li>Solved 450+ LeetCode problems, reflecting strong algorithmic and problem-solving fundamentals.</li>
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-5 pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-mono-tech text-slate-500 print:hidden">
          <span>SOURCE: OFFICIAL PORTFOLIO ATTACHMENT</span>
          <button
            onClick={handleClose}
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            DISMISS [ESC]
          </button>
        </div>
      </div>
    </div>
  );
};
