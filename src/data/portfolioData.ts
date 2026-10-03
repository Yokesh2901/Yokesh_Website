import type { PortfolioData } from './types';

export const portfolioData: PortfolioData = {
  personal: {
    name: "Yokesh S",
    headline: "ML // DATA // NLP // SYSTEMS",
    title: "Machine Learning & Data Systems Engineer",
    location: "Chennai, India",
    phone: "+91 7358342304",
    email: "yokeshsrinivasan29@gmail.com",
    github: "https://github.com/Yokesh2901",
    linkedin: "https://linkedin.com/in/yokesh-s-590332260",
    experienceYears: "2.5+",
    leetcodeProblems: "450+",
    summary: "Python-focused ML/Data engineer with 2.5+ years of professional experience building production ML systems, NLP-powered applications, and end-to-end data processing pipelines. Demonstrated track record delivering client-sponsored deep learning detection systems following CRISP-ML(Q) end-to-end, autonomous voice AI pipelines with LLM function-calling (GPT-4o), and cloud data pipelines on Azure Data Factory and Azure Synapse Analytics."
  },

  skills: [
    {
      id: "programming",
      name: "Programming Languages",
      badge: "CORE CODE",
      description: "Production scripting, typed application development, and database querying",
      skills: [
        { name: "Python (Primary)", verifiedContext: "Primary language for ML, CV, ETL, NLP, and backend API microservices." },
        { name: "SQL", verifiedContext: "Large-scale dataset querying, pipeline ingestion, data governance at Amazon & Innodata." },
        { name: "TypeScript", verifiedContext: "Engineered autonomous agent pipelines (StudCatalyst) and desktop applications (Aether)." },
        { name: "Java", verifiedContext: "Object-oriented fundamentals, algorithms, and backend systems." }
      ]
    },
    {
      id: "ml-nlp",
      name: "ML & NLP Engineering",
      badge: "INTELLIGENCE",
      description: "Statistical learning, natural language understanding, and LLM reasoning pipelines",
      skills: [
        { name: "Scikit-learn", verifiedContext: "Decision trees, Winsorization preprocessing, cross-validated classification models." },
        { name: "TensorFlow", verifiedContext: "Predictive deep neural networks and time-series sensor regression models." },
        { name: "NumPy & Pandas", verifiedContext: "High-throughput tabular data manipulation, feature scaling, and tensor wrangling." },
        { name: "Hugging Face", verifiedContext: "Sentiment analysis models and speech-to-text inference pipelines in production." },
        { name: "LLM Integration (GPT-4o, Gemini)", verifiedContext: "Function-calling tool schemas, conversational reasoning, and autonomous content generation." },
        { name: "Predictive Modeling", verifiedContext: "End-to-end feature pipelines, cross-validation, and production inference serialization." }
      ]
    },
    {
      id: "deep-learning-cv",
      name: "Deep Learning & Computer Vision",
      badge: "PERCEPTION",
      description: "Real-time object detection, transfer learning architectures, and spatial tracking",
      skills: [
        { name: "YOLOv9", verifiedContext: "Trained custom 12-class detection model for hazardous blast furnace scrap detection." },
        { name: "YOLOv8", verifiedContext: "Object detection integrated with landmark tracking in real-time control systems." },
        { name: "ResNet50V2", verifiedContext: "Deep residual classifier selected after rigorous multi-architecture benchmarking." },
        { name: "MediaPipe", verifiedContext: "HandLandmarker 21-point tracking for precision OS navigation and gesture mapping." },
        { name: "OpenCV", verifiedContext: "Image processing, real-time video stream manipulation, and color-space transforms." },
        { name: "Albumentations", verifiedContext: "Cutout, MixUp, CutMix, and spatial transforms for scrap imagery robustness." }
      ]
    },
    {
      id: "data-engineering",
      name: "Data Engineering & Cloud",
      badge: "DATA HIGHWAY",
      description: "Enterprise ETL pipelines, cloud analytics warehouses, and data governance",
      skills: [
        { name: "ETL Pipeline Design", verifiedContext: "Engineered pipelines integrating heterogeneous structured & unstructured data sources." },
        { name: "Data Ingestion & Processing", verifiedContext: "Built high-throughput processing scripts supporting ML model evaluation." },
        { name: "Azure Data Factory", verifiedContext: "Orchestrated cloud data pipelines and monitored scheduled data-flow activities." },
        { name: "Azure Synapse Analytics", verifiedContext: "Cloud warehousing, enterprise data architecture, and analytical queries." },
        { name: "Data Governance & Quality", verifiedContext: "Enforced data governance standards, validation suites, and accuracy checks at Innodata." }
      ]
    },
    {
      id: "backend-apis",
      name: "Backend & System APIs",
      badge: "INTERFACES",
      description: "Lightweight microservices, asynchronous webhooks, and third-party orchestration",
      skills: [
        { name: "Flask", verifiedContext: "Built microservice backends for real-time model inference and Twilio webhook routing." },
        { name: "RESTful API Integration", verifiedContext: "Architected multi-step API workflows connecting LLMs, voice, and telephony." },
        { name: "Webhooks", verifiedContext: "Asynchronous event handling for real-time telephony actions and social publishing." },
        { name: "JSON / Structured Data", verifiedContext: "Strict schema contracts for tool function-calling and automated agents." }
      ]
    },
    {
      id: "methodologies",
      name: "Methodology & Practices",
      badge: "STANDARDS",
      description: "Standardized ML lifecycle workflows, testing rigor, and collaborative engineering",
      skills: [
        { name: "CRISP-ML(Q)", verifiedContext: "Executed full lifecycle from business understanding to edge deployment and monitoring." },
        { name: "EDA (Exploratory Data Analysis)", verifiedContext: "Statistical hypothesis testing, distribution checks, and feature importance analysis." },
        { name: "Model Evaluation", verifiedContext: "Confusion matrices, precision/recall curves, mAP, and edge compression benchmarks." },
        { name: "Git & Version Control", verifiedContext: "Multi-branch collaborative version control and CI/CD ready workflows." },
        { name: "Testing & Debugging", verifiedContext: "Offline simulation modes, Kalman-filter smoothing validation, unit checks." },
        { name: "Agile Collaboration", verifiedContext: "Active sprint planning, cross-functional engineering at Amazon and Innodata." }
      ]
    }
  ],

  projects: [
    {
      id: "agent-shield",
      number: "01",
      title: "AgentShield — AI Agent Security & Action Governance Platform",
      subtitle: "A zero-trust decision firewall protecting enterprise databases and APIs from autonomous AI agent hallucinations and prompt injection.",
      category: "VOICE_AI_AGENTS",
      categoryLabel: "AI Agent Security & Action Governance",
      featured: true,
      technologies: ["FastAPI", "Python", "Laya AI Engine", "Prometheus", "React", "Tailwind CSS", "Zero-Trust Policies", "Docker", "SOC2 Logging"],
      problem: "As AI agents gain autonomous access to production tools—databases, payment gateways, file systems, and emails—a single hallucination or prompt injection can lead to irreversible corporate damage, unauthorized data exfiltration, or catastrophic database deletion.",
      approach: [
        "Architected an in-line asynchronous decision firewall built on FastAPI achieving sub-20ms interception latency before any tool code executes.",
        "Engineered the Laya AI Decision Engine to apply semantic reasoning and compute transparent 0–100 risk scores on incoming agent intent.",
        "Enforced deterministic, mathematically sound Zero-Trust security invariants (e.g., Non-Admin + Production DELETE = Mandatory Block) that can never be bypassed by LLM hallucinations.",
        "Built comprehensive observability with real-time Prometheus telemetry, immutable audit logging for SOC2 compliance, and a high-performance React/Tailwind analytics dashboard.",
        "Developed the Autonomous Agent Simulator, an interactive sandbox for AI developers to test agent workflows and verify firewall behavior before live deployment."
      ],
      result: "Delivered a sub-20ms enterprise action governance platform providing absolute mathematical policy guarantees and full SOC2 audit readiness against rogue agent actions.",
      metrics: [
        "Sub-20ms Interception Latency via async FastAPI gateway",
        "Zero-Trust Security Invariants (Mathematical policy guarantees)",
        "Prometheus real-time metrics & immutable SOC2 audit logging",
        "Autonomous Agent Simulator interactive testing sandbox"
      ],
      architecture: [
        "FastAPI In-Line Action Interception Gateway (<20ms)",
        "Laya AI Decision Engine (Semantic Reasoning & 0–100 Risk Scoring)",
        "Zero-Trust Invariant Engine (Deterministic Policy Enforcement)",
        "Prometheus Metrics & Immutable SOC2 Audit Logging",
        "React / Tailwind Real-Time Analytics Dashboard & Simulator"
      ],
      github: "https://github.com/Yokesh2901",
      interactiveType: "agent-shield"
    },
    {
      id: "blast-furnace-safety",
      number: "02",
      title: "Hazardous Substance Detection for Blast Furnace Safety",
      subtitle: "Client-sponsored computer vision system catching explosive sealed items in scrap metal streams",
      category: "FLAGSHIP_DL_CV",
      categoryLabel: "Deep Learning & Industrial Safety",
      featured: true,
      technologies: ["Python", "YOLOv9", "ResNet50V2", "Roboflow", "Flask", "AWS EC2/S3", "Power BI", "Albumentations", "OpenCV"],
      problem: "A scrap metal recycler faced severe safety hazards where sealed items (gas canisters, cylinders, capacitors, motors, shock absorbers) inside scrap metal could enter blast furnaces and explode, causing fatal injuries and millions in equipment destruction.",
      approach: [
        "Collected and annotated a custom 486-image, 12-class object detection dataset in Roboflow covering hazardous objects across diverse angles and lighting.",
        "Engineered an extensive augmentation pipeline (geometric transforms, color-space adjustments, noise injection, Cutout/MixUp/CutMix) via OpenCV and Albumentations.",
        "Executed CRISP-ML(Q) lifecycle: evaluated multiple candidate architectures before selecting a ResNet50V2-based classifier for the final detection pipeline.",
        "Designed edge-ready deployment on Flask with AWS EC2/S3 storage, model compression, and Power BI dashboards for operational scrap telemetry."
      ],
      result: "Delivered an end-to-end operational AI safety inspection system and comprehensive technical documentation to the client sponsor at Innodatatics.",
      metrics: [
        "486 custom annotated images across 12 hazardous classes",
        "Multi-model benchmark (YOLOv9 vs ResNet50V2)",
        "Zero-latency edge-compressed deployment architecture"
      ],
      architecture: [
        "Roboflow 12-Class Dataset Ingestion",
        "OpenCV & Albumentations Augmentation Layer",
        "ResNet50V2 Deep Classifier Engine",
        "Flask Microservice API on AWS EC2 & S3",
        "Power BI Operational Safety Dashboard"
      ],
      github: "https://github.com/Yokesh2901",
      interactiveType: "blast-furnace"
    },
    {
      id: "viki-voice-assistant",
      number: "03",
      title: "VIKI — Tamil AI Voice Assistant",
      subtitle: "Conversational Tamil voice agent with LLM reasoning, sentiment scoring, and telephony routing",
      category: "VOICE_AI_AGENTS",
      categoryLabel: "Voice AI & Conversational LLMs",
      featured: true,
      technologies: ["Python", "Flask", "GPT-4o", "Deepgram", "Azure Tamil TTS", "Hugging Face", "Twilio", "Vapi"],
      problem: "Traditional interactive voice response (IVR) systems fail to understand colloquial Tamil speech, cannot gauge caller emotional urgency, and lack real-time function-calling capabilities to trigger immediate backend actions.",
      approach: [
        "Configured a low-latency voice pipeline combining Deepgram for Tamil speech-to-text, Azure Tamil neural voice for speech synthesis, and GPT-4o for contextual reasoning.",
        "Formulated a structured tool-use function-calling schema enabling the agent to autonomously execute 'send_sms' and 'transfer_call'.",
        "Integrated Hugging Face sentiment analysis models to detect caller urgency and trigger an automated human-in-the-loop escalation route.",
        "Engineered a Flask webhook backend coordinating with Twilio, featuring an offline CLI simulation harness for rigorous testing."
      ],
      result: "Achieved an end-to-end autonomous Tamil voice pipeline capable of handling live telephone inquiries, dispatching SMS summaries, and executing warm transfers based on urgency.",
      metrics: [
        "Full Tamil conversational fluency with Azure Neural Voice",
        "Dual function-calling tool schema (send_sms, transfer_call)",
        "Hugging Face sentiment urgency classifier with human escalation"
      ],
      architecture: [
        "Twilio Telephony & Vapi Webhook Ingestion",
        "Deepgram Tamil Speech-to-Text Layer",
        "GPT-4o Reasoning with Structured Tool Schemas",
        "Hugging Face Sentiment Urgency Analyzer",
        "Flask Backend Dispatching SMS & Warm Transfers"
      ],
      github: "https://github.com/Yokesh2901",
      interactiveType: "voice-viki"
    },
    {
      id: "hand-gesture-control",
      number: "04",
      title: "Hand Gesture System Control",
      subtitle: "Real-time OS navigation using MediaPipe 21-landmark tracking and Kalman filter smoothing",
      category: "FLAGSHIP_DL_CV",
      categoryLabel: "Computer Vision & Spatial Computing",
      featured: true,
      technologies: ["Python", "OpenCV", "MediaPipe", "YOLOv8", "PyAutoGUI"],
      problem: "Touchless OS interaction requires sub-millisecond responsiveness without cursor jitter or erratic false activations caused by accidental hand movements.",
      approach: [
        "Employed MediaPipe's HandLandmarker to track 21 three-dimensional skeletal coordinates in real-time camera frames.",
        "Combined YOLOv8 hand detection with landmark tracking, mapping distinct finger-tip geometric configurations to cursor motion, left/right clicks, scrolling, and system volume.",
        "Engineered a Kalman-filter and exponential-smoothing utility layer that mathematically dampened high-frequency spatial noise, producing buttery cursor movement.",
        "Designed a finite state machine with strict activation gestures (open-hand to activate, closed fist to pause) to eliminate unintentional inputs.",
      ],
      result: "Delivered an intuitive, zero-jitter touchless OS control interface operating smoothly on standard consumer webcams without dedicated depth hardware.",
      metrics: [
        "21 3D landmarks tracked at camera native frame rates",
        "Kalman-filter & exponential smoothing cursor damping",
        "Zero-jitter state machine preventing accidental clicks"
      ],
      architecture: [
        "OpenCV Video Capture Stream",
        "YOLOv8 Hand Detector + MediaPipe 21-Landmark Mesh",
        "Kalman Filter & Exponential Smoothing Layer",
        "Gesture State Machine (Open Hand / Fist / Pinch)",
        "PyAutoGUI OS Native Event Injection"
      ],
      github: "https://github.com/Yokesh2901",
      interactiveType: "hand-gesture"
    },
    {
      id: "studcatalyst-agent",
      number: "05",
      title: "StudCatalyst — Autonomous GitHub-to-Instagram Agent",
      subtitle: "Scheduled pipeline analyzing repositories, rendering headless UI slides, and publishing carousels",
      category: "VOICE_AI_AGENTS",
      categoryLabel: "Autonomous Systems & Agentic Workflows",
      featured: true,
      technologies: ["TypeScript", "Node.js", "Playwright", "Gemini API", "Instagram Graph API"],
      problem: "Software engineers struggle to consistently market their open-source projects across visual platforms due to the manual labor of cloning, running code, taking screenshots, creating slides, writing copy, and formatting posts.",
      approach: [
        "Created a cron-based automation engine that periodically monitors target GitHub profiles for new repository commits.",
        "Downloads and inspects codebases to programmatically identify tech stacks, lines of code, and architectural languages.",
        "Spins up headless browser environments with Playwright to execute local dev servers, capture high-res screenshots, and compile rendered HTML/CSS slide layouts.",
        "Integrated the Gemini API for technical caption generation and published multi-image carousels directly via the Instagram Graph API with exponential-backoff retry logic and duplicate deduplication."
      ],
      result: "Engineered a zero-touch pipeline that transforms raw code repositories into polished, published visual carousel assets automatically.",
      metrics: [
        "100% automated repo-to-carousel publishing workflow",
        "Headless dev server execution & high-DPI rendering via Playwright",
        "Exponential backoff retry with persistent state deduplication"
      ],
      architecture: [
        "GitHub API Cron Ingestion & Repository Parser",
        "Playwright Headless Browser Sandbox",
        "HTML/CSS Slide Renderer (UI specs, code syntax)",
        "Gemini Multimodal Copywriting Engine",
        "Instagram Graph API Direct Publisher"
      ],
      github: "https://github.com/Yokesh2901",
      interactiveType: "agent-cron"
    },
    {
      id: "cnc-downtime-prediction",
      number: "06",
      title: "CNC Machine Downtime Prediction",
      subtitle: "Predictive industrial maintenance model forecasting equipment downtime from sensor streams",
      category: "DATA_SCIENCE_ML",
      categoryLabel: "Data Science & Predictive Modeling",
      featured: false,
      technologies: ["Python", "Scikit-learn", "TensorFlow", "Streamlit"],
      problem: "Unexpected failures in CNC milling and lathe machinery lead to costly factory stoppages, bottlenecking assembly lines and driving up unplanned maintenance expenses.",
      approach: [
        "Analyzed operational telemetry logs, temperature metrics, vibration sensors, and machine RPM history to isolate leading indicators of mechanical failure.",
        "Trained predictive machine learning models using Scikit-learn and TensorFlow to forecast impending machine downtime with high recall.",
        "Deployed the trained inference pipeline through an interactive Streamlit operational dashboard for real-time floor monitoring and proactive decision support."
      ],
      result: "Provided manufacturing stakeholders with actionable failure warnings before critical breakdown thresholds occurred.",
      metrics: [
        "Multi-sensor log analysis across vibration and thermal features",
        "Interactive real-time Streamlit operations dashboard"
      ],
      github: "https://github.com/Yokesh2901",
      interactiveType: "downtime-stream"
    },
    {
      id: "movie-audience-rating-predictor",
      number: "07",
      title: "Movie Audience Rating Predictor",
      subtitle: "End-to-end Decision Tree classification pipeline predicting Rotten Tomatoes audience reception",
      category: "DATA_SCIENCE_ML",
      categoryLabel: "Data Science & Feature Engineering",
      featured: false,
      technologies: ["Python", "Scikit-learn", "Streamlit", "Pandas", "NumPy"],
      problem: "Studios and distributors require quantitative projections of audience sentiment prior to release based solely on pre-production metadata.",
      approach: [
        "Handled comprehensive data preparation: missing value imputation, label encoding, and outlier treatment via Winsorization.",
        "Tuned a Decision Tree classification architecture using GridSearchCV k-fold cross-validation.",
        "Serialized the optimal model weights and data encoders via pickle for deployment into an interactive Streamlit user interface that generates instant audience predictions from title, genre, and director inputs."
      ],
      result: "Delivered a clean, transparent predictive pipeline backed by serialized encoders and a responsive Streamlit application.",
      metrics: [
        "Winsorization outlier treatment & GridSearchCV cross-validation",
        "Serialized pickle deployment pipeline"
      ],
      github: "https://github.com/Yokesh2901",
      interactiveType: "movie-rating"
    },
    {
      id: "employee-performance-scoring",
      number: "08",
      title: "Employee Performance Scoring System",
      subtitle: "Analytics application measuring operational productivity and quality metrics for Amazon operations",
      category: "DATA_SCIENCE_ML",
      categoryLabel: "Analytics & Business Intelligence",
      featured: false,
      technologies: ["Python", "SQL", "Streamlit", "Pandas"],
      problem: "Large-scale logistics and operations teams needed centralized visibility into individual and cohort productivity metrics without manual spreadsheet wrangling.",
      approach: [
        "Constructed analytical SQL queries to aggregate warehouse and operations logs across multiple performance dimensions.",
        "Engineered automated scoring algorithms evaluating productivity, error rates, and throughput against benchmark standards.",
        "Built a real-time Streamlit dashboard featuring automated recommendation logic to assist operations leads in sprint coaching."
      ],
      result: "Enabled transparent, data-driven performance tracking for the Amazon operations cohort with actionable recommendations.",
      metrics: [
        "Automated operational recommendation engine",
        "Real-time visibility across productivity and quality thresholds"
      ],
      github: "https://github.com/Yokesh2901",
      interactiveType: "employee-scoring"
    },
    {
      id: "algorithmic-trading-strategies",
      number: "09",
      title: "Quantitative Algorithmic Trading Strategies",
      subtitle: "Custom TradingView backtesting indicators including Antigravity and 5-minute intraday signals",
      category: "FULL_STACK_QUANT",
      categoryLabel: "Quantitative Finance & Algorithmic Trading",
      featured: false,
      technologies: ["Pine Script", "TradingView", "Financial Modeling"],
      problem: "Discretionary intraday trading suffers from emotional execution and lack of backtested statistical edge in volatile equity markets.",
      approach: [
        "Engineered the custom 'Antigravity' indicator using Pine Script to detect trend exhaustion and momentum inflections.",
        "Formulated and backtested an intraday 5-minute execution strategy optimized for Tata Steel, validating win rate, drawdown, and risk-reward ratios across historical market regimes."
      ],
      result: "Established a quantitative rule-based signal engine delivering systematic entry/exit execution on TradingView charts.",
      metrics: [
        "Custom Antigravity trend inflection algorithm",
        "5-minute intraday strategy calibrated on Tata Steel historical ticks"
      ],
      github: "https://github.com/Yokesh2901",
      interactiveType: "trading"
    },
    {
      id: "job-hunter-india",
      number: "10",
      title: "Job Hunter India — Indie Browser Game",
      subtitle: "Pixel-art satirical browser game with custom client-side router and Web Audio API synthesizer",
      category: "FULL_STACK_QUANT",
      categoryLabel: "Creative Development & Web Audio",
      featured: false,
      technologies: ["HTML", "CSS", "JavaScript", "Web Audio API"],
      problem: "Showcasing technical creativity, state machines, and real-time audio synthesis through an engaging interactive format.",
      approach: [
        "Built a zero-dependency, single-file client-side router powering seven playable mini-game levels: Resume Builder, Application Blast, LinkedIn Challenge, Online Assessment, Coding Round, HR Interview, and Outcome.",
        "Developed a custom procedural sound synthesis engine entirely within the browser using the Web Audio API (generating 8-bit retro soundscapes without loading external audio assets)."
      ],
      result: "Created a viral, highly interactive satirical web game demonstrating full-stack DOM mastery and Web Audio engineering.",
      metrics: [
        "7 distinct playable mini-game levels",
        "100% synthesized procedural audio using Web Audio API (0 external audio files)"
      ],
      github: "https://github.com/Yokesh2901",
      interactiveType: "game"
    },
    {
      id: "aether-and-multimango",
      number: "11",
      title: "Aether Desktop Companion & MultiMango Tracker",
      subtitle: "Interactive 22-state desktop dragon pet with GSAP particle engine & productivity browser extension",
      category: "FULL_STACK_QUANT",
      categoryLabel: "Desktop Systems & Extensions",
      featured: false,
      technologies: ["Electron", "TypeScript", "PixiJS", "GSAP", "Browser Extension API"],
      problem: "Creating high-framerate interactive desktop companions that run seamlessly on Windows without memory leaks or UI frame drops.",
      approach: [
        "Architected Aether with a dual-tsconfig TypeScript build configuration to ensure strict type boundaries between Electron main and renderer processes.",
        "Implemented 22 discrete behavioral state machines driven by PixiJS canvas rendering and GSAP animation timelines with component particle physics.",
        "Complementary tool: Built MultiMango Tracker, a personal productivity browser extension for daily task and metric monitoring."
      ],
      result: "Delivered a compilable, zero-error TypeScript desktop software companion with fluid animation mechanics.",
      metrics: [
        "22 distinct behavior state machines",
        "Strict two-tsconfig Electron TypeScript architecture",
        "Smooth hardware-accelerated PixiJS + GSAP particle system"
      ],
      github: "https://github.com/Yokesh2901",
      interactiveType: "desktop-pet"
    }
  ],

  experiences: [
    {
      id: "innodata",
      role: "Analyst",
      company: "Innodata",
      duration: "Feb 2026 – Jul 2026",
      location: "Chennai, India",
      responsibilities: [
        "Analyzed large-scale datasets using SQL and Python, applying rigorous data governance standards and quality checks to ensure accuracy before delivery.",
        "Collaborated with cross-functional stakeholders in an Agile environment, translating complex product requirements into technical approaches during sprint planning.",
        "Contributed to data governance frameworks that prevented schema drift and preserved high data integrity across client handoffs."
      ],
      tags: ["SQL", "Python", "Data Governance", "Quality Assurance", "Agile Collaboration"]
    },
    {
      id: "amazon",
      role: "ML Data Associate",
      company: "Amazon",
      duration: "Feb 2024 – Aug 2025",
      location: "Chennai, India",
      responsibilities: [
        "Built and tested robust SQL/Python data pipelines supporting machine learning model evaluation, improving processing efficiency and reliability.",
        "Worked independently within Agile sprint cycles alongside software engineers and product owners, owning tasks from initial data analysis through final delivery.",
        "Conducted metric validation and diagnostic queries on production ML outputs to identify data drifts and evaluation edge cases."
      ],
      tags: ["Python", "SQL", "ML Model Evaluation", "Data Pipelines", "Agile Sprints"]
    },
    {
      id: "innodatatics",
      role: "Data Science Intern",
      company: "Innodatatics",
      duration: "Feb 2024 – Jun 2024 | Jun 2025 – Nov 2025",
      location: "Chennai, India",
      responsibilities: [
        "Developed and tested ETL pipelines in Python and SQL, integrating structured and unstructured data sources for downstream modeling.",
        "Built cloud-based data pipelines using Azure Data Factory and Azure Synapse Analytics, owning documentation and data-flow architecture.",
        "Engineered the client-sponsored hazardous substance detection system for blast furnace safety, leading custom dataset curation and CRISP-ML(Q) lifecycle delivery."
      ],
      tags: ["Azure Data Factory", "Azure Synapse Analytics", "ETL Pipelines", "Python", "CRISP-ML(Q)"]
    }
  ],

  education: {
    degree: "BCA — Bachelor of Computer Applications",
    institution: "University of Madras",
    cgpa: "7.4 / 10",
    year: "Graduated 2023",
    details: [
      "Rigorous foundations in computer science, software engineering, databases, and mathematics.",
      "Hands-on coursework covering data structures, object-oriented programming, and statistical computing.",
      "Graduated with 7.4/10 cumulative grade point average."
    ]
  },

  certifications: [
    {
      title: "Microsoft Power BI — Certified",
      issuer: "Microsoft / 360DigiTMG",
      details: "Comprehensive certification covering data modeling, DAX queries, ETL transformation, and executive business intelligence dashboards."
    },
    {
      title: "Data Science Using Python & R Programming",
      issuer: "360DigiTMG",
      details: "In-depth applied data science curriculum spanning exploratory data analysis, machine learning algorithms, hypothesis testing, and model deployment."
    },
    {
      title: "Python 101 for Data Science (PY0101EN)",
      issuer: "IBM / CognitiveClass",
      details: "Foundational data science certification validating core Python programming, data structures, Pandas dataframes, and scientific computing."
    }
  ],

  highlights: [
    "Solved 450+ LeetCode problems, reflecting strong algorithmic mastery, optimization skills, and problem-solving fundamentals.",
    "Delivered a client-sponsored industrial computer vision safety system from raw data annotation through cloud deployment under CRISP-ML(Q).",
    "2.5+ years of real-world experience designing data pipelines, evaluating production ML models, and deploying cloud data architectures at Amazon, Innodata, and Innodatatics."
  ]
};
