import React, { useState } from "react";
import { 
  MessageSquare, Camera, DownloadCloud, Layers, Eye, Smartphone, Check, HelpCircle, AlertTriangle 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ShowcaseTab {
  id: string;
  label: string;
  icon: any;
  title: string;
  subtitle: string;
  summary: string;
  screenVisual: () => React.ReactNode;
  bulletPoints: string[];
}

export default function ProductShowcase() {
  const [activeTab, setActiveTab] = useState<string>("home-chat");

  const tabs: ShowcaseTab[] = [
    {
      id: "home-chat",
      label: "Diagnostic Chat",
      icon: MessageSquare,
      title: "Real-Time Streaming Diagnostics",
      subtitle: "EventSource Streaming with Zero Thread Lag",
      summary: "Inside Mekanik AI, chat streams use Kotlin Coroutines Flow. Words are updated dynamically without blocking Jetpack Compose layout calculations.",
      bulletPoints: [
        "Structured headers isolate fault causes, hazard ratings, and procedures",
        "Hardware acceleration ensures zero frame drops during heavy model loads",
        "Retains state across Android lifecycle events cleanly with Room databases"
      ],
      screenVisual: () => (
        <div className="w-full h-full bg-[#07070a]/60 backdrop-blur-sm flex flex-col justify-between font-sans">
          {/* Mock Header */}
          <div className="bg-[#050505]/40 border-b border-mechanic-border px-3 py-2 flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1.5 text-white font-mono font-medium tracking-wide">
              <span className="h-1.5 w-1.5 rounded-full bg-neon-green" />
              <span>MEKANIK AI v1.2</span>
            </div>
            <span className="text-neon-green font-mono text-[9px] bg-neon-green/10 px-1 py-0.5 rounded">Gemma 2B</span>
          </div>
          
          {/* Thread Body */}
          <div className="flex-1 p-3 space-y-2.5 overflow-hidden">
            <div className="flex flex-col items-end max-w-[90%] ml-auto">
              <span className="text-[9px] font-mono text-gray-500 mb-0.5">USER</span>
              <div className="text-[11px] p-2.5 rounded-lg bg-neon-green/5 border border-neon-green/20 text-neon-green">
                Is it safe to drive with code P0301 cylinder 1 misfire?
              </div>
            </div>
            
            <div className="flex flex-col items-start max-w-[90%]">
              <span className="text-[9px] font-mono text-gray-500 mb-0.5">COGNITIVE ENGINE</span>
              <div className="text-[10px] p-2.5 rounded-lg bg-mechanic-gray text-gray-200 border border-mechanic-border/70 space-y-1">
                <span className="font-bold text-red-500 flex items-center gap-1">⚠️ RISK LEVEL: SEVERE RATING</span>
                <p className="text-gray-400">Continuous driving with P0301 is **not recommended**.</p>
                <div className="bg-black/40 p-1.5 rounded border border-gray-800/50 text-[9px] text-gray-300">
                  Fuel dumping into the catalytic converter will raise exhaust temps and cause permanent honeycomb meltdown.
                </div>
              </div>
            </div>
          </div>
 
          {/* Input simulation */}
          <div className="p-2 border-t border-mechanic-border bg-[#050505]/40 flex items-center justify-between text-[9px] text-gray-500 font-mono">
            <span>Ask anything about faults, torque, or fluids...</span>
            <span className="text-neon-green">✔ Connected</span>
          </div>
        </div>
      )
    },
    {
      id: "offline-models",
      label: "Offline Companion",
      icon: DownloadCloud,
      title: "In-App Private Model Store",
      subtitle: "Automatic binary fetch from Hugging Face Hub",
      summary: "Boot offline mode instantly. Our download wizard lets you pick weights from Hugging Face and saves them to local MediaPipe app storage safely.",
      bulletPoints: [
        "Offline choice: Llama 3.2 1B (Easiest), SmolLM2 1.7B, or Qwen 2.5 1.5B (Expert)",
        "Automated MD5 checksum check prevents corrupted weights downloads",
        "One-click loading directly calls the C++ NN API on Android device GPUs"
      ],
      screenVisual: () => (
        <div className="w-full h-full bg-[#07070a]/60 backdrop-blur-sm flex flex-col justify-between font-sans">
          {/* Tab Header */}
          <div className="bg-[#050505]/40 border-b border-mechanic-border px-3 py-2 flex items-center justify-between text-[11px] text-white">
            <span className="font-mono font-medium">AI CONFIGURATION</span>
            <span className="text-[9px] text-yellow-400 font-mono">LOCAL MODE: READY</span>
          </div>
 
          {/* Model cards */}
          <div className="flex-1 p-3 space-y-3 overflow-hidden">
            <div className="text-center pb-1.5 border-b border-mechanic-border/40">
              <span className="text-[9px] font-mono text-gray-400 block">LOCAL MODEL CONTROLLER</span>
            </div>
 
            {/* Selected model */}
            <div className="bg-black/30 border border-neon-green/60 rounded p-2 flex items-center justify-between">
              <div>
                <h5 className="text-[11px] font-display font-bold text-white leading-none">Llama 3.2 1B (Quantized)</h5>
                <span className="text-[9px] font-mono text-neon-green mt-1 block">Active on-device CPU/GPU</span>
              </div>
              <span className="text-[10px] text-black font-extrabold font-mono bg-neon-green px-1.5 py-0.5 rounded uppercase">
                LOADED
              </span>
            </div>
 
            {/* Alternative model */}
            <div className="bg-black/15 border border-mechanic-border/50 rounded p-2 flex items-center justify-between">
              <div>
                <h5 className="text-[11px] font-display text-gray-300 leading-none">SmolLM2 1.7B (Instruct)</h5>
                <span className="text-[8px] font-mono text-gray-500 mt-1 block">Size: 1.2 GB • Hugging Face Link</span>
              </div>
              <button className="text-[9px] text-neon-green hover:underline font-mono border border-neon-green/20 px-1.5 py-0.5 rounded bg-neon-green/5">
                DOWNLOAD
              </button>
            </div>
          </div>
 
          <div className="p-2 border-t border-mechanic-border bg-[#050505]/40 text-[9px] text-gray-500 font-mono text-center">
            Private, offline AI — No account required
          </div>
        </div>
      )
    },
    {
      id: "multimodal",
      label: "Multimodal Scanner",
      icon: Camera,
      title: "Visual Image Diagnosis",
      subtitle: "Base64 suspends conversion to bypass out-of-memory errors",
      summary: "Upload live photos of indicators, leak spots, worn brake discs, or spark plugs. Mekanik AI deciphers visual markers and produces instant lists of root issues.",
      bulletPoints: [
        "Memory-safe: Compresses high-res camera outputs into targeted 85% bitmaps",
        "Identifies dashboard telemetry lights including transmission overriding or glow-plugs",
        "Provides step-by-step diagnostic tips relative to the photo findings"
      ],
      screenVisual: () => (
        <div className="w-full h-full bg-[#07070a]/60 backdrop-blur-sm flex flex-col justify-between font-sans relative">
          {/* Camera View mockup */}
          <div className="absolute inset-x-2 top-2 h-[120px] border border-neon-green/40 bg-black/40 rounded flex flex-col justify-between overflow-hidden">
            {/* Visual camera reticle */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 border border-dashed border-neon-green/50 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
              <div className="w-12 h-12 border-2 border-neon-green/40 rounded flex items-center justify-center text-neon-green text-[9px] font-mono">
                FOCUS
              </div>
            </div>
            
            {/* Camera header info */}
            <div className="relative p-1 bg-[#050505]/60 text-[9px] font-mono text-gray-400 flex justify-between">
              <span>SUSPEND CONVERTING BASE64</span>
              <span className="text-neon-green font-bold">100% READY</span>
            </div>
            
            <div className="relative p-1 bg-[#050505]/60 text-[8px] font-mono text-neon-green text-center">
              DTC INDICATOR FOUND: CAN SIGNAL EXHAUST OVERRIDE P0420
            </div>
          </div>
 
          {/* Spacer */}
          <div className="pt-[130px] flex-1 p-2 space-y-2 overflow-hidden flex flex-col justify-between">
            <div className="bg-black/30 border border-mechanic-border p-2 rounded text-[10px]">
              <span className="text-neon-green font-mono text-[9px] block">MEKANIK ADVICE</span>
              <p className="text-gray-300 text-[10px] mt-1 italic">
                "The yellow MIL gear indicator suggests transmission slippage or fluid wear. Scan ECU channels immediately."
              </p>
            </div>
            
            <div className="flex gap-1.5 h-7">
              <div className="flex-1 bg-neon-green text-black font-mono font-bold text-[9px] flex items-center justify-center rounded">
                RE-SNAP PHOTO
              </div>
              <div className="flex-1 bg-mechanic-gray text-gray-300 font-mono text-[9px] flex items-center justify-center rounded border border-mechanic-border">
                ADD NOTE
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "floating-widget",
      label: "Floating HUD Widget",
      icon: Layers,
      title: "Jetpack Compose HUD Overlay",
      subtitle: "Persistence controls and system drag gestures optimized",
      summary: "Work under the hood comfortably. The sleek persistent floating widget overlays over mechanical manuals, wiring diagrams, or any OBD diagnostic logs.",
      bulletPoints: [
        "Responsive widget drag tracking: Throttled preferences prevent UI locks",
        "Instantly toggle transparency to read text underneath clearly",
        "Minimize to active bubble with simple side-docking gestures"
      ],
      screenVisual: () => (
        <div className="w-full h-full bg-[#07070a]/60 backdrop-blur-sm flex flex-col justify-between font-mono text-[10px] relative p-3">
          {/* Simulated blueprint drawing under overlay */}
          <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
          
          <div className="border border-dashed border-gray-800 p-2 rounded opacity-30 text-[8px] space-y-2">
            <span>AUTO-DIAG LOGGING SYSTEM v0.98</span>
            <div className="h-1 w-full bg-neon-green" />
            <div className="h-8 bg-gray-950/40 border border-gray-800 rounded flex items-center px-1">
              <span>STREAM: 0x8F90 CAN EN-FAIL ERR_CYL_1_MISFIRE</span>
            </div>
          </div>
 
          {/* Overlaid Persistent Floating Chat Node */}
          <div className="relative z-10 self-end w-[85%] bg-black/80 backdrop-blur-md border border-neon-green rounded shadow-2xl overflow-hidden mt-6">
            <div className="bg-neon-green text-black px-2 py-0.5 flex items-center justify-between text-[8px] font-bold">
              <span>MEKANIK AI FLOATING CONTROLS</span>
              <span>● HUD DRAGGING</span>
            </div>
            <div className="p-2 space-y-1.5 text-[9px] text-gray-300 font-sans">
              <span className="text-neon-green font-mono text-[8px]">LOCAL INFERENCE LLAMA</span>
              <p className="leading-tight">Verify Cylinder 1 ignition coil primary resistance [0.85Ω]. If higher, coil is faulty.</p>
            </div>
          </div>
 
          <span className="text-[8px] text-gray-500 block text-center absolute bottom-1 inset-x-0">
            Persistent companion overlay matching Jetpack bounds
          </span>
        </div>
      )
    }
  ];

  const activeTabData = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <section id="showcase" className="relative py-24 bg-transparent">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-full grid-bg opacity-15 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-neon-green bg-neon-green/5 px-3 py-1 rounded-full border border-neon-green/10">
            PRODUCT WALKTHROUGH
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight mt-4">
            A Clean Look Inside the <br />
            <span className="text-shadow-glow text-neon-green">Mekanik AI</span> Workshop Engine
          </h2>
          <p className="font-sans text-sm text-gray-400 mt-4 leading-relaxed">
            The app behaves strictly like a professional automotive diagnostic terminal, prioritizing dense layout structures over glossy fluff or bloated graphics overlays.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? "bg-neon-green text-black border-neon-green font-extrabold shadow-[0_0_15px_rgba(57,255,20,0.2)]"
                    : "bg-mechanic-card border-mechanic-border text-gray-400 hover:text-white hover:border-gray-500"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Tab Screen Presenter (Device mockup beside content) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-mechanic-card backdrop-blur-md rounded-2xl border border-mechanic-border p-6 sm:p-12 relative overflow-hidden">
          {/* Decorative Corner Grid */}
          <div className="absolute top-0 right-0 w-44 h-44 grid-bg-dense opacity-20 pointer-events-none" />

          {/* Side Content Panel */}
          <div className="lg:col-span-7 space-y-6">
            <span className="font-mono text-[10px] text-neon-green uppercase tracking-widest block bg-neon-green/5 border border-neon-green/20 px-2.5 py-1 rounded w-fit">
              {activeTabData.subtitle}
            </span>
            
            <h3 className="font-display font-black text-2xl sm:text-3xl text-white leading-tight">
              {activeTabData.title}
            </h3>
            
            <p className="font-sans text-sm text-gray-400 leading-relaxed">
              {activeTabData.summary}
            </p>

            <div className="border-t border-mechanic-border pt-6 space-y-3">
              <span className="font-mono text-[10px] text-gray-500 uppercase tracking-wider block">
                ENGINE IMPLEMENTATION SCHEMATICS:
              </span>
              {activeTabData.bulletPoints.map((bp, bpIdx) => (
                <div key={bpIdx} className="flex items-start gap-2 text-xs text-gray-300 leading-relaxed">
                  <span className="text-neon-green shrink-0 mt-1">✔</span>
                  <span>{bp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Side Device mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-72 h-[480px] bg-black border-[6px] border-mechanic-border rounded-[2.5rem] shadow-[0_15px_35px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col ring-2 ring-neon-green/25 ring-offset-[6px] ring-offset-black">
              {/* Device Speaker Notch overlay */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-4 w-28 bg-mechanic-border rounded-b-xl z-20 flex items-center justify-center">
                <div className="w-10 h-1 bg-black rounded-full" />
              </div>

              {/* Display content screen (loaded dynamically depending on tab) */}
              <div className="relative z-10 flex-1 pt-4 overflow-hidden">
                <activeTabData.screenVisual />
              </div>

              {/* Bottom device touch bar mockup */}
              <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 h-1 w-24 bg-gray-500 rounded-full z-20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
