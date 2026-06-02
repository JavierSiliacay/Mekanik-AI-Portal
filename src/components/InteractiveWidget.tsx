import { useState, useEffect, useRef, FormEvent } from "react";
import { 
  Send, Terminal, RefreshCw, Cpu, Camera, Globe, WifiOff, Sparkles, AlertTriangle, 
  ChevronRight, Wrench, ArrowRight, CornerDownLeft, Eye, HelpCircle, AlertCircle, Play, Pause,
  Car, Plus, Trash2, Bluetooth, Sliders, History
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { diagnosticCases } from "../data";
import { DiagnosticTestCase } from "../types";
import MekanikLogo from "./MekanikLogo";

export default function InteractiveWidget() {
  const [selectedCaseId, setSelectedCaseId] = useState<string>("test-01");
  const [messages, setMessages] = useState<Array<{ sender: "user" | "ai"; text: string; isStreaming?: boolean }>>([]);
  const [customInput, setCustomInput] = useState("");
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [isFloatingWidget, setIsFloatingWidget] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentModel, setCurrentModel] = useState<string>("Google Gemma Hub");
  const [isAutoSimulate, setIsAutoSimulate] = useState(true);
  const [autoCaseIdx, setAutoCaseIdx] = useState(0);

  // Mobile multi-tab states mirroring screenshots
  const [activeMobileTab, setActiveMobileTab] = useState<"garage" | "dashboard" | "scan_ai" | "scanner" | "history">("scan_ai");
  const [vehicles, setVehicles] = useState([
    { id: "v1", name: "My Baby Vios", year: "2020", model: "Toyota Vios", engine: "1.3L", plate: "KAJ-7123", odo: "10000 km", active: true }
  ]);
  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);
  const [newVehicleName, setNewVehicleName] = useState("");
  const [newVehicleModel, setNewVehicleModel] = useState("");
  const [newVehiclePlate, setNewVehiclePlate] = useState("");

  const [bluetoothConnected, setBluetoothConnected] = useState(false);
  const [isSearchingBluetooth, setIsSearchingBluetooth] = useState(false);
  const [selectedBluetoothDevice, setSelectedBluetoothDevice] = useState<string | null>(null);

  const [liveRpm, setLiveRpm] = useState(850);
  const [liveVoltage, setLiveVoltage] = useState(14.2);
  const [liveTemp, setLiveTemp] = useState(89);
  const [liveThrottle, setLiveThrottle] = useState(12.4);

  // Fluctuate standard engine parameter signals when paired
  useEffect(() => {
    if (!bluetoothConnected) {
      setLiveRpm(0);
      setLiveThrottle(0);
      return;
    }
    setLiveRpm(842);
    setLiveThrottle(12.4);
    
    const interval = setInterval(() => {
      setLiveRpm(prev => {
        const delta = Math.floor(Math.random() * 31) - 15; // -15 to 15
        const next = prev + delta;
        return next < 810 ? 825 : next > 890 ? 850 : next;
      });
      setLiveVoltage(prev => {
        const delta = (Math.random() * 0.1 - 0.05);
        const next = Number((prev + delta).toFixed(1));
        return next < 13.9 ? 14.1 : next > 14.4 ? 14.2 : next;
      });
      setLiveTemp(prev => {
        if (Math.random() > 0.75) {
          const delta = Math.random() > 0.5 ? 1 : -1;
          const next = prev + delta;
          return next < 86 ? 87 : next > 93 ? 91 : next;
        }
        return prev;
      });
      setLiveThrottle(prev => {
        if (Math.random() > 0.8) {
          const delta = Number((Math.random() * 0.4 - 0.2).toFixed(1));
          const next = Number((prev + delta).toFixed(1));
          return next < 11.5 ? 12.0 : next > 13.5 ? 12.6 : next;
        }
        return prev;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [bluetoothConnected]);

  const [isDtcScanning, setIsDtcScanning] = useState(false);
  const [scannedCodes, setScannedCodes] = useState<Array<{ code: string; desc: string; type: string }>>([]);
  const [scanTimestamp, setScanTimestamp] = useState<string | null>(null);

  const [historyLogs, setHistoryLogs] = useState<Array<{ id: string; timestamp: string; title: string; subtitle: string; status: "CLEARED" | "DETECTED" | "HEALTHY"; codesCount: number }>>([]);

  const hudScrollRef = useRef<HTMLDivElement>(null);
  const mainScrollRef = useRef<HTMLDivElement>(null);

  // Scroll only the target container elements internally (stops page-level layout/viewport jumps)
  useEffect(() => {
    if (hudScrollRef.current) {
      hudScrollRef.current.scrollTo({
        top: hudScrollRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
    if (mainScrollRef.current) {
      mainScrollRef.current.scrollTo({
        top: mainScrollRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages, isAnalyzing]);

  // Adjust model string
  useEffect(() => {
    if (isOfflineMode) {
      setCurrentModel("Llama 3.2 1B (MediaPipe local)");
    } else {
      setCurrentModel("Google Gemma Hub (Cloud API)");
    }
  }, [isOfflineMode]);

  // Automatic testing / simulation loop
  useEffect(() => {
    if (!isAutoSimulate) return;

    let isCancelled = false;
    let typeTimer: NodeJS.Timeout;
    let responseTimer: NodeJS.Timeout;
    let cycleTimer: NodeJS.Timeout;

    const runSimulationStep = () => {
      if (isCancelled) return;

      setActiveMobileTab("scan_ai");
      const testCase = diagnosticCases[autoCaseIdx];
      setSelectedCaseId(testCase.id);
      // Alternate offline modes to showcase both local CPU inference and Cloud intelligence
      setIsOfflineMode(autoCaseIdx % 2 === 1);

      // Reset simulated terminal interface
      setMessages([]);
      setCustomInput("");
      setIsAnalyzing(false);

      // 1. Pause briefly then start "typing" the diagnostic query
      typeTimer = setTimeout(() => {
        if (isCancelled) return;

        const originalText = testCase.input;
        let charIndex = 0;
        let runningText = "";

        const interval = setInterval(() => {
          if (isCancelled) {
            clearInterval(interval);
            return;
          }

          if (charIndex < originalText.length) {
            runningText += originalText[charIndex];
            setCustomInput(runningText);
            charIndex++;
          } else {
            clearInterval(interval);

            // 2. Pause on complete string, then send
            responseTimer = setTimeout(() => {
              if (isCancelled) return;

              setMessages([
                { sender: "user", text: originalText }
              ]);
              setCustomInput("");
              setIsAnalyzing(true);

              // 3. Setup streaming response word-by-word
              const responseWords = testCase.response.split(" ");
              let currentWordIdx = 0;

              // Append empty AI bubble
              setMessages(prev => [
                ...prev,
                { sender: "ai", text: "", isStreaming: true }
              ]);

              const streamInterval = setInterval(() => {
                if (isCancelled) {
                  clearInterval(streamInterval);
                  return;
                }

                if (currentWordIdx < responseWords.length) {
                  setMessages(prev => {
                    const updated = [...prev];
                    if (updated.length > 0) {
                      const last = updated[updated.length - 1];
                      if (last.sender === "ai") {
                        last.text = responseWords.slice(0, currentWordIdx + 1).join(" ");
                      }
                    }
                    return updated;
                  });
                  // Stream slightly random speeds
                  currentWordIdx += Math.max(1, Math.floor(Math.random() * 2) + 1);
                } else {
                  clearInterval(streamInterval);
                  setIsAnalyzing(false);
                  
                  setMessages(prev => {
                    const updated = [...prev];
                    if (updated.length > 0) {
                      updated[updated.length - 1].isStreaming = false;
                    }
                    return updated;
                  });

                  // 4. Case complete! Hold screen for 6.5s to let the user review, then jump to the next case!
                  cycleTimer = setTimeout(() => {
                    if (isCancelled) return;
                    setAutoCaseIdx(prev => (prev + 1) % diagnosticCases.length);
                  }, 6500);
                }
              }, 40);

            }, 600);
          }
        }, 18); // Typing rhythm
      }, 1200);
    };

    runSimulationStep();

    return () => {
      isCancelled = true;
      clearTimeout(typeTimer);
      clearTimeout(responseTimer);
      clearTimeout(cycleTimer);
    };
  }, [isAutoSimulate, autoCaseIdx]);

  // Handle user manual override selections
  const handleManualSelect = (caseId: string) => {
    setIsAutoSimulate(false); // Stop autoplay so user has full sandbox control
    setSelectedCaseId(caseId);
    
    // Clear and reload
    const testCase = diagnosticCases.find((tc) => tc.id === caseId);
    if (!testCase) return;

    setMessages([{ sender: "user", text: testCase.input }]);
    setCustomInput("");
    setIsAnalyzing(true);

    const words = testCase.response.split(" ");
    let idx = 0;
    
    setMessages(prev => [...prev, { sender: "ai", text: "", isStreaming: true }]);

    const interval = setInterval(() => {
      if (idx < words.length) {
        setMessages(prev => {
          const updated = [...prev];
          if (updated.length > 1) {
            updated[updated.length - 1].text = words.slice(0, idx + 1).join(" ");
          }
          return updated;
        });
        idx += Math.max(1, Math.floor(Math.random() * 2) + 1);
      } else {
        clearInterval(interval);
        setIsAnalyzing(false);
        setMessages(prev => {
          const updated = [...prev];
          if (updated.length > 1) {
            updated[updated.length - 1].isStreaming = false;
          }
          return updated;
        });
      }
    }, 40);
  };

  const handleCustomSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!customInput.trim() || isAnalyzing) return;

    setIsAutoSimulate(false); // Disable loop on manual interaction
    const userInput = customInput;
    setCustomInput("");

    setMessages(prev => [...prev, { sender: "user", text: userInput }]);
    setIsAnalyzing(true);

    setTimeout(() => {
      const words = generateMechanicResponse(userInput).split(" ");
      let currentIdx = 0;

      setMessages(prev => [...prev, { sender: "ai", text: "", isStreaming: true }]);

      const timer = setInterval(() => {
        if (currentIdx < words.length) {
          setMessages(prev => {
            const updated = [...prev];
            if (updated.length > 0) {
              const last = updated[updated.length - 1];
              if (last.sender === "ai") {
                last.text = words.slice(0, currentIdx + 1).join(" ");
              }
            }
            return updated;
          });
          currentIdx += Math.max(1, Math.floor(Math.random() * 2) + 1);
        } else {
          clearInterval(timer);
          setIsAnalyzing(false);
          setMessages(prev => {
            const updated = [...prev];
            if (updated.length > 0) {
              updated[updated.length - 1].isStreaming = false;
            }
            return updated;
          });
        }
      }, 40);
    }, 450);
  };

  const generateMechanicResponse = (input: string): string => {
    const query = input.toLowerCase();
    if (query.includes("oil") || query.includes("leak")) {
      return `### ⚙️ Diagnostic Feed: Fluid Leakage Analysis
      
A dark brown slick on bottom guards indicates **Motor Oil Leakage**.

#### 🔍 Top Culprits:
1. **Oil Pan Gasket:** Sealing aging.
2. **Valve Cover Gasket:** Drips down headers.
3. **Oil Filter:** Loose housing.

#### 🔧 Recommendation:
Clean surface, add fluorescent tracer dye, and scan with block UV guide.`;
    } else if (query.includes("noise") || query.includes("brake") || query.includes("squeal")) {
      return `### 🔊 Sound Analysis: Brake Friction Info

High-frequency metallic vibration when slowing down.

#### 🔎 Diagnostic Nodes:
- Wear Indicator rubbing rotors (below 2.5mm pad).
- Glayed ceramic composite face.

#### 🔧 Correct Action:
Replace worn discs immediately. Lubricate guide pins to avoid structural seizing.`;
    } else {
      return `### 🛠️ Mekanik Core Diagnostic Output

No generic code matched. Initializing expert module logs.

#### 🔬 Standby Diagnostics:
1. Scan standard OBD trouble codes using a CAN interface.
2. Inspect mechanical fluids for structural degradation.
3. Verify throttle voltages and injector pulses.`;
    }
  };

  // Active item
  const activeCase = diagnosticCases.find((tc) => tc.id === selectedCaseId);

  return (
    <div id="interactive-diagnostic-lab" className="flex flex-col items-center justify-center w-full font-sans">
      
      {/* Selector and Toggle Board - Slim and Space-Saving */}
      <div className="w-full max-w-[325px] mb-4 space-y-2 relative z-20">
        
        {/* Dynamic Auto Play Status Ribbon */}
        <div className="flex items-center justify-between bg-black/60 border border-mechanic-border/50 rounded-lg py-1.5 px-3">
          <div className="flex items-center gap-1.5">
            <span className={`flex h-2 w-2 rounded-full relative ${isAutoSimulate ? "bg-neon-green" : "bg-gray-600"}`}>
              {isAutoSimulate && <span className="absolute inset-0 rounded-full bg-neon-green/80 animate-ping" />}
            </span>
            <span className="font-mono text-[9px] uppercase tracking-wider text-gray-300 font-black">
              {isAutoSimulate ? "AUTOMATED TEST MODE ACTIVE" : "MANUAL INTERACTION"}
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              setIsAutoSimulate(!isAutoSimulate);
              if (!isAutoSimulate) {
                // If turning back on, trigger immediately
                setAutoCaseIdx((prev) => prev);
              }
            }}
            className={`flex items-center gap-1 px-2 py-0.5 rounded text-[8px] font-mono border font-black uppercase transition-all tracking-wider ${
              isAutoSimulate 
                ? "bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20" 
                : "bg-neon-green/10 border-neon-green/30 text-neon-green hover:bg-neon-green/15"
            }`}
          >
            {isAutoSimulate ? (
              <>
                <Pause className="w-2 h-2" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-2 h-2" />
                <span>Auto-Test</span>
              </>
            )}
          </button>
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-mono text-[8px] uppercase tracking-wider text-gray-400 font-bold block">
            DIAGNOSTIC WORKFLOW TESTER:
          </label>
          <div className="relative">
            <select
              value={selectedCaseId}
              onChange={(e) => handleManualSelect(e.target.value)}
              className="w-full bg-black border border-neon-green/30 hover:border-neon-green/50 rounded-md px-2.5 py-1.5 text-[10px] text-white focus:outline-none transition-all appearance-none font-sans cursor-pointer pr-8"
            >
              {diagnosticCases.map((tc) => (
                <option key={tc.id} value={tc.id} className="bg-mechanic-dark text-white text-[10px]">
                  [{tc.category}] {tc.title}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-2.5 flex items-center pointer-events-none text-neon-green">
              <ChevronRight className="w-3.5 h-3.5 rotate-90" />
            </div>
          </div>
        </div>
      </div>

      {/* COMPACT Android Mobile Mockup Area */}
      <div className="w-full flex justify-center items-center relative z-10 px-2 sm:px-0">
        
        {/* Shrunk physical chassis wrapper: scaled to elegant max-w-[325px] */}
        <div className="relative w-full max-w-[325px] bg-[#0c0d10] p-2.5 rounded-[36px] border-[5px] border-[#202329] shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_40px_rgba(57,255,20,0.05)] flex flex-col overflow-hidden">
          
          {/* Symmetrical Mini Speaker */}
          <div className="absolute top-[8px] left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gray-800 rounded-full z-50 pointer-events-none" />

          {/* Symmetrical Micro Punch hole camera */}
          <div className="absolute top-[14px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-black z-50 flex items-center justify-center pointer-events-none border border-gray-950">
            <div className="w-[2px] h-[2px] rounded-full bg-blue-900/60" />
          </div>

          {/* Internal Scaled Screen View area: scaled to height min-h-[550px] */}
          <div className="relative flex-1 flex flex-col bg-[#050608] rounded-[28px] overflow-hidden border border-gray-800/40 min-h-[550px] max-h-[550px] z-10 text-[9.5px]">
            
            {/* Ambient Background Grid Glow for terminal/diagnostic code style */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-[#1bde10]/[0.03] blur-[40px] pointer-events-none" />
            
            {/* Compactor Status bar */}
            <div className="px-4 pt-2 pb-1 bg-black text-gray-500 font-mono text-[8px] flex items-center justify-between relative z-40 select-none border-b border-white/[0.02]">
              <span className="font-bold text-white tracking-tight">09:41</span>
              <div className="flex items-center gap-1">
                <span className={`text-[6px] font-bold tracking-tight px-0.5 rounded border leading-none ${
                    isOfflineMode 
                      ? "text-amber-400 bg-amber-400/5 border-amber-500/20" 
                      : "text-neon-green bg-neon-green/5 border-neon-green/20"
                }`}>
                  {isOfflineMode ? "LOCAL" : "CLOUD"}
                </span>
                <span className="text-[7px]">📶</span>
                <div className="w-2.5 h-1.5 border border-gray-600 rounded p-[0.5px] flex items-center">
                  <div className="h-full w-[85%] bg-neon-green rounded-3xs" />
                </div>
              </div>
            </div>

            {/* Simulated Composable HUD or Regular View layout */}
            {isFloatingWidget ? (
              <div className="relative flex-1 p-3 flex flex-col justify-between bg-[#040507]/95 min-h-[495px]">
                <div className="absolute inset-0 grid-bg-dense opacity-10 pointer-events-none" />
                
                <div className="absolute top-8 right-6 opacity-[0.02] font-mono text-[50px] font-bold text-neon-green select-none">
                  ECU
                </div>
                
                {/* Simulated diagnostic stack underneath */}
                <div className="absolute inset-x-3 top-6 bottom-6 border border-dashed border-gray-800/60 rounded p-2 flex flex-col justify-between opacity-15 pointer-events-none font-mono text-[7px]">
                  <div>
                    <span className="text-neon-green block">OBD2 ENGINE STACK</span>
                    <div className="h-1 bg-gray-800 w-12 mt-1" />
                  </div>
                  <div className="h-8 bg-gray-900 border border-gray-800 rounded w-full" />
                  <div className="flex justify-between">
                    <span>CAN-BUS: 620K</span>
                    <span>BAUD: 115200</span>
                  </div>
                </div>

                {/* Composable persistent HUD floating widget */}
                <div className="relative z-15 flex-1 flex flex-col justify-end p-0.5">
                  <div className="w-full bg-black/95 border border-neon-green/60 rounded-lg shadow-[0_0_15px_rgba(57,255,20,0.12)] overflow-hidden flex flex-col">
                    <div className="bg-neon-green text-black px-2 py-0.5 flex items-center justify-between font-mono font-bold text-[7px] tracking-wide select-none">
                      <div className="flex items-center gap-1">
                        <Wrench className="w-2 h-2 animate-spin" style={{ animationDuration: '6s' }} />
                        <span>MEKANIK AI COMPOSABLE HUD</span>
                      </div>
                      <span className="bg-black text-neon-green px-0.5 rounded text-[5px] font-black uppercase">
                        {isOfflineMode ? "OFFLINE" : "CLOUD"}
                      </span>
                    </div>

                    {/* Chat inside HUD */}
                    <div ref={hudScrollRef} className="h-[260px] overflow-y-auto p-2 space-y-2 scrollbar-thin select-none">
                      {messages.map((msg, idx) => (
                        <div key={idx} className={`flex flex-col max-w-[90%] ${msg.sender === "user" ? "self-end items-end" : "self-start items-start"}`}>
                          <div className={`text-[8.5px] p-1.5 rounded-md leading-relaxed ${
                            msg.sender === "user"
                              ? "bg-neon-green/10 text-neon-green border border-neon-green/20 rounded-tr-none"
                              : "bg-mechanic-gray text-gray-200 border border-mechanic-border/70 rounded-tl-none"
                          }`}>
                            {msg.text}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Exit Toggle Button */}
                <div className="relative z-15 text-[7px] font-mono text-gray-500 bg-black/80 px-2 py-1.5 rounded border border-mechanic-border/50 flex justify-between items-center mt-1">
                  <span>Overlay active over CAN views</span>
                  <button onClick={() => setIsFloatingWidget(false)} className="text-neon-green hover:underline font-bold uppercase">Exit HUD</button>
                </div>
              </div>
            ) : (
              /* Inside-App view themed close to Javier's actual repository */
              <div className="flex flex-col flex-1 justify-between h-full bg-[#050608]">
                
                {/* Appbar - styled to match screenshots */}
                <div className="bg-black border-b border-mechanic-border/30 px-3 py-2 flex items-center justify-between shrink-0 select-none">
                  <div className="flex items-center gap-1.5">
                    <MekanikLogo className="w-4 h-4 shrink-0" />
                    <div>
                      <h4 className="text-[9px] font-display font-black tracking-wide text-white leading-none uppercase">
                        Mekanik AI
                      </h4>
                      <p className="text-[6.5px] font-mono text-neon-green leading-none mt-0.5 tracking-tight uppercase">
                        {activeMobileTab === "scan_ai" ? "COMPOSE_ASSIST" : activeMobileTab === "garage" ? "FLEET_MGR" : activeMobileTab === "scanner" ? "DTC_MONITOR" : activeMobileTab === "dashboard" ? "CAN_METRICS" : "SESSION_LOGS"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    {activeCase?.imageType && activeMobileTab === "scan_ai" && (
                      <div className="bg-neon-green/10 p-0.5 rounded shrink-0">
                        <Camera className="w-2.5 h-2.5 text-neon-green animate-pulse" />
                      </div>
                    )}
                    <span className="text-[6px] font-mono text-gray-400 tracking-tighter bg-mechanic-gray/50 px-1 py-0.5 rounded border border-mechanic-border/40 font-bold shrink-0 uppercase">
                      {isOfflineMode ? "OFFLINE" : "Online API"}
                    </span>
                  </div>
                </div>

                {/* Sub-header status bar log stream */}
                <div className="px-3 py-0.5 bg-[#0a0d0a] border-b border-[#1bde10]/10 flex items-center justify-between text-[6.5px] font-mono text-gray-400 select-none shrink-0">
                  <div className="flex items-center gap-1">
                    <Terminal className="w-1.5 h-1.5 text-neon-green" />
                    <span>TARGET: {vehicles.find(v => v.active)?.name || "Vios"}</span>
                  </div>
                  <span className="text-neon-green">SYS: {isOfflineMode ? "LOCAL" : "CLOUD"}</span>
                </div>

                {/* Main Screen Content Toggled by Tab */}
                <div className="flex-1 flex flex-col min-h-0 overflow-hidden relative">
                  
                  {/* TAB 1: GARAGE */}
                  {activeMobileTab === "garage" && (
                    <div className="flex-1 overflow-y-auto p-3 space-y-3 flex flex-col bg-[#050608]">
                      <div className="flex items-center gap-1.5 shrink-0">
                        <Car className="w-3.5 h-3.5 text-neon-green" />
                        <h3 className="text-[10px] font-display font-black text-white uppercase tracking-wider">
                          Mekanik Garage
                        </h3>
                      </div>
                      <p className="text-[7.5px] text-gray-400 leading-normal shrink-0">
                        Manage your fleet and select vehicles to connect OBD-II. Register profiles offline to log faults accurately.
                      </p>

                      <div className="flex items-center justify-between pt-1 border-t border-mechanic-border/20 shrink-0">
                        <span className="font-mono text-[8px] text-gray-400 font-bold uppercase">
                          Your Fleet ({vehicles.length})
                        </span>
                        <button 
                          type="button"
                          onClick={() => setShowAddVehicleModal(true)}
                          className="flex items-center gap-0.5 bg-neon-green text-black font-mono font-bold px-1.5 py-0.5 rounded text-[7px]"
                        >
                          <Plus className="w-2 h-2" />
                          <span>Add Vehicle</span>
                        </button>
                      </div>

                      {/* List Vehicles */}
                      <div className="space-y-1.5 flex-1 overflow-y-auto pr-0.5 scrollbar-thin">
                        {vehicles.map((v) => (
                          <div 
                            key={v.id} 
                            onClick={() => {
                              setVehicles(prev => prev.map(item => ({ ...item, active: item.id === v.id })));
                            }}
                            className={`p-2 rounded-md border cursor-pointer transition-all ${
                              v.active 
                                ? "bg-black border-neon-green shadow-[0_0_8px_rgba(57,255,20,0.06)]" 
                                : "bg-mechanic-gray/20 border-mechanic-border/40 opacity-70 hover:opacity-100"
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <div className="space-y-0.5">
                                <div className="flex items-center gap-1.5 font-sans">
                                  <span className="font-bold text-white text-[9px]">{v.name}</span>
                                  {v.active && (
                                    <span className="bg-neon-green text-black px-1 py-px rounded-[2px] font-mono text-[4.5px] font-black leading-none">
                                      ACTIVE
                                    </span>
                                  )}
                                </div>
                                <p className="font-mono text-[6.5px] text-gray-400 leading-none">{v.year} {v.model} • {v.engine}</p>
                                <p className="font-mono text-[6px] text-gray-500 leading-none">P/N: {v.plate} | Odo: {v.odo}</p>
                              </div>
                              
                              <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                                <button 
                                  type="button"
                                  onClick={() => {
                                    setVehicles(prev => prev.map(item => ({ ...item, active: item.id === v.id })));
                                  }}
                                  className={`p-1 rounded-full ${v.active ? 'bg-neon-green text-black' : 'bg-black text-gray-550'}`}
                                >
                                  <Play className="w-1.5 h-1.5 fill-current" />
                                </button>
                                {vehicles.length > 1 && (
                                  <button 
                                    type="button"
                                    onClick={() => {
                                      setVehicles(prev => prev.filter(item => item.id !== v.id));
                                    }}
                                    className="p-1 rounded-full bg-black text-red-505 hover:bg-neutral-900"
                                  >
                                    <Trash2 className="w-2 h-2" />
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Add Vehicle Modal Overlay */}
                      {showAddVehicleModal && (
                        <div className="absolute inset-2 bg-black border border-neon-green/30 rounded-lg p-3.5 z-50 flex flex-col justify-between shadow-[0_0_15px_rgba(0,0,0,0.9)] animate-fade-in text-[9.5px]">
                          <div className="space-y-2">
                            <h4 className="text-[8.5px] font-mono font-bold text-neon-green uppercase border-b border-mechanic-border/30 pb-1 flex justify-between items-center">
                              <span>Register New Profile</span>
                              <button onClick={() => setShowAddVehicleModal(false)} className="text-gray-500 hover:text-white">✕</button>
                            </h4>
                            <div className="space-y-1.5 font-sans">
                              <div>
                                <label className="block text-[6.5px] font-mono text-gray-400 uppercase leading-none mb-1">Nickname</label>
                                <input 
                                  type="text" 
                                  placeholder="My Baby Vios" 
                                  value={newVehicleName}
                                  onChange={(e) => setNewVehicleName(e.target.value)}
                                  className="w-full bg-[#0d0e12] border border-mechanic-border/50 rounded px-1.5 py-0.5 text-[8px] text-white focus:outline-none focus:border-neon-green"
                                />
                              </div>
                              <div>
                                <label className="block text-[6.5px] font-mono text-gray-400 uppercase leading-none mb-1">Make and Model</label>
                                <input 
                                  type="text" 
                                  placeholder="Toyota Vios 1.3L" 
                                  value={newVehicleModel}
                                  onChange={(e) => setNewVehicleModel(e.target.value)}
                                  className="w-full bg-[#0d0e12] border border-mechanic-border/50 rounded px-1.5 py-0.5 text-[8px] text-white focus:outline-none focus:border-neon-green"
                                />
                              </div>
                              <div>
                                <label className="block text-[6.5px] font-mono text-gray-400 uppercase leading-none mb-1">Plate Number</label>
                                <input 
                                  type="text" 
                                  placeholder="KAJ-7123" 
                                  value={newVehiclePlate}
                                  onChange={(e) => setNewVehiclePlate(e.target.value)}
                                  className="w-full bg-[#0d0e12] border border-mechanic-border/50 rounded px-1.5 py-0.5 text-[8px] text-white focus:outline-none focus:border-neon-green"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-1.5 pt-2">
                            <button 
                              type="button" 
                              onClick={() => setShowAddVehicleModal(false)}
                              className="flex-1 bg-black border border-mechanic-border/50 text-gray-400 font-mono py-1 rounded text-[7.5px] leading-tight"
                            >
                              Cancel
                            </button>
                            <button 
                              type="button" 
                              onClick={() => {
                                if (newVehicleName.trim()) {
                                  const newV = {
                                    id: "v-" + Date.now(),
                                    name: newVehicleName,
                                    year: "2023",
                                    model: newVehicleModel || "Custom Car",
                                    engine: "1.5L Eco",
                                    plate: newVehiclePlate || "N/A",
                                    odo: "1,200 km",
                                    active: true
                                  };
                                  setVehicles(prev => prev.map(item => ({ ...item, active: false })).concat(newV));
                                  setNewVehicleName("");
                                  setNewVehicleModel("");
                                  setNewVehiclePlate("");
                                  setShowAddVehicleModal(false);
                                }
                              }}
                              className="flex-1 bg-neon-green text-black font-mono font-bold py-1 rounded text-[7.5px] leading-tight"
                            >
                              Add Profile
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 2: DASHBOARD */}
                  {activeMobileTab === "dashboard" && (
                    <div className="flex-1 overflow-y-auto p-3 space-y-3 flex flex-col bg-[#050608] relative">
                      <div className="flex items-center gap-1.5 mb-0.5 shrink-0">
                        <Sliders className="w-3.5 h-3.5 text-neon-green" />
                        <h3 className="text-[10px] font-display font-black text-white uppercase tracking-wider">
                          ELM327 Connection
                        </h3>
                      </div>

                      {/* Adapter Switch Block */}
                      <div className="bg-black border border-mechanic-border/50 rounded-lg p-2 flex items-center justify-between shadow-[0_3px_10px_rgba(0,0,0,0.5)] shrink-0">
                        <div className="space-y-0.5">
                          <span className="font-mono text-[6.5px] text-gray-500 block uppercase font-bold">ELM327 ADAPTER STATUS</span>
                          <div className="flex items-center gap-1">
                            <span className={`inline-block w-1.5 h-1.5 rounded-full ${bluetoothConnected ? 'bg-neon-green animate-pulse' : 'bg-gray-600'}`} />
                            <span className="font-sans font-bold text-white text-[8px]">
                              {bluetoothConnected ? "Bluetooth Link Active" : "Bluetooth Disconnected"}
                            </span>
                          </div>
                        </div>
                        <button 
                          type="button"
                          onClick={() => {
                            if (bluetoothConnected) {
                              setBluetoothConnected(false);
                              setSelectedBluetoothDevice(null);
                            } else {
                              setIsSearchingBluetooth(true);
                            }
                          }}
                          className={`px-2 py-0.5 rounded text-[7.5px] font-mono font-bold uppercase ${
                            bluetoothConnected 
                              ? "bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/25" 
                              : "bg-neon-green text-black hover:bg-neon-green/95"
                          }`}
                        >
                          {bluetoothConnected ? "Drop" : "Connect"}
                        </button>
                      </div>

                      {/* Telemetry Mock Feeds */}
                      <div className="border border-dashed border-mechanic-border/30 rounded p-2 flex-1 flex flex-col justify-between min-h-[140px]">
                        <span className="font-mono text-[6.5px] text-gray-500 uppercase block select-none">CAN_BUS ENGINE STREAM</span>
                        
                        {bluetoothConnected ? (
                          <div className="grid grid-cols-2 gap-1.5 font-mono text-[7px] my-auto">
                            <div className="bg-black border border-mechanic-border/40 p-1 rounded text-center">
                              <span className="text-gray-500 block text-[6px]">ENGINE RPM</span>
                              <span className="text-neon-green font-bold text-[8.5px] animate-pulse">{liveRpm} RPM</span>
                            </div>
                            <div className="bg-black border border-mechanic-border/40 p-1 rounded text-center">
                              <span className="text-gray-500 block text-[6px]">ENGINE COOLANT</span>
                              <span className="text-white font-bold text-[8.5px]">{liveTemp} °C</span>
                            </div>
                            <div className="bg-black border border-mechanic-border/40 p-1 rounded text-center">
                              <span className="text-gray-500 block text-[6px]">LINE VOLTAGE</span>
                              <span className="text-white font-bold text-[8.5px]">{liveVoltage} V</span>
                            </div>
                            <div className="bg-black border border-mechanic-border/40 p-1 rounded text-center">
                              <span className="text-gray-500 block text-[6px]">THROTTLE VALVE</span>
                              <span className="text-white font-bold text-[8.5px]">{liveThrottle}%</span>
                            </div>
                          </div>
                        ) : (
                          <div className="py-6 text-center text-gray-500 text-[8px] space-y-1 my-auto">
                            <p className="font-bold text-amber-500">⚠️ Link Disconnected</p>
                            <p className="text-[6.5px] text-gray-600 max-w-[170px] mx-auto">Pair an OBDII emulator device here to toggle real-time metrics.</p>
                          </div>
                        )}

                        <div className="flex justify-between items-center pt-2 border-t border-mechanic-border/20 text-[6.5px] font-mono text-gray-500 leading-none select-none">
                          <span>BAUD: 115200</span>
                          <span>FRAME_ERR: 0%</span>
                        </div>
                      </div>

                      {/* Pair Device Dialogue Modal */}
                      {isSearchingBluetooth && (
                        <div className="absolute inset-2 bg-black border border-neon-green rounded-xl p-3 z-50 flex flex-col justify-between shadow-[0_0_15px_rgba(57,255,20,0.15)] select-none">
                          <div className="space-y-2">
                            <h4 className="text-[9px] font-sans font-black text-neon-green uppercase tracking-wide">
                              SELECT OBD-II ADAPTER
                            </h4>
                            <p className="text-[7.5px] text-gray-300 leading-tight">
                              Ensure the ELM327 device is properly paired and establish a connection.
                            </p>
                            
                            <div className="space-y-1 pt-1 font-mono">
                              <button 
                                type="button"
                                onClick={() => {
                                  setBluetoothConnected(true);
                                  setSelectedBluetoothDevice("OBDII-ELM327-V2.1");
                                  setIsSearchingBluetooth(false);
                                }}
                                className="w-full bg-[#0c0d10] border border-neon-green/30 hover:border-neon-green rounded px-2 py-1 text-[8px] text-white text-left flex justify-between items-center transition-all"
                              >
                                <span>OBDII-ELM327-V2.1</span>
                                <span className="text-[6px] text-neon-green font-bold">Pair</span>
                              </button>
                              
                              <button 
                                type="button"
                                onClick={() => {
                                  setBluetoothConnected(true);
                                  setSelectedBluetoothDevice("Toyota_ECU_Link");
                                  setIsSearchingBluetooth(false);
                                }}
                                className="w-full bg-[#0c0d10] border border-mechanic-border rounded px-2 py-1 text-[8px] text-white text-left flex justify-between items-center transition-all"
                              >
                                <span>Toyota_ECU_Link</span>
                                <span className="text-[6px] text-neon-green font-bold">Pair</span>
                              </button>
                            </div>
                          </div>

                          <button 
                            type="button"
                            onClick={() => setIsSearchingBluetooth(false)}
                            className="w-full border border-mechanic-border/60 text-gray-500 font-mono py-1 rounded text-[7.5px] font-bold uppercase text-center mt-2"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 3: SCAN AI (Original chatbot) */}
                  {activeMobileTab === "scan_ai" && (
                    <div className="flex-1 flex flex-col min-h-0">
                      
                      {/* Attachment scanning block with high visual alignment */}
                      {activeCase?.imageType && (
                        <div className="bg-black/50 px-2.5 py-1 border-b border-mechanic-border/30 backdrop-blur-sm flex items-center justify-between text-[8px] text-gray-400 font-mono shrink-0">
                          <div className="flex items-center gap-1">
                            <Camera className="w-2.5 h-2.5 text-neon-green animate-pulse" />
                            <span className="truncate max-w-[100px] text-[7.5px]">{activeCase.imageType === 'sparkplug' ? 'Engine_Spark.png' : 'Dashboard_Code.jpg'}</span>
                          </div>
                          <span className="text-[7px] text-neon-green font-bold shrink-0">240 KB</span>
                        </div>
                      )}

                      {/* Custom Chat message list */}
                      <div ref={mainScrollRef} className="flex-1 overflow-y-auto p-2.5 space-y-2 scrollbar-thin flex flex-col bg-gradient-to-b from-black to-[#050608]">
                        {messages.length === 0 && (
                          <div className="m-auto text-center p-3 opacity-30 flex flex-col items-center justify-center space-y-1 select-none">
                            <MekanikLogo className="w-8 h-8 opacity-40 animate-pulse" />
                            <p className="text-[7.5px] font-mono">Initializing local weights...</p>
                          </div>
                        )}

                        {messages.map((msg, idx) => (
                          <div
                            key={idx}
                            className={`flex flex-col max-w-[92%] ${
                              msg.sender === "user" ? "self-end items-end" : "self-start items-start"
                            }`}
                          >
                            {/* Name pill */}
                            <span className="text-[6.5px] font-mono text-gray-500 mb-0.5 tracking-tight px-1 uppercase scale-90 select-none">
                              {msg.sender === "user" ? "QUERY" : currentModel.includes("Llama") ? "LLAMA_1B_OFFLINE" : "GEMINI_G_SERVICE"}
                            </span>

                            {/* Bubble styling */}
                            <div
                              className={`text-[9px] p-2 rounded-lg leading-relaxed whitespace-pre-wrap font-sans ${
                                msg.sender === "user"
                                  ? "bg-neon-green/5 text-neon-green border border-neon-green/20 rounded-tr-none font-bold"
                                  : "bg-mechanic-gray/90 text-gray-200 border border-mechanic-border/60 rounded-tl-none leading-normal font-medium"
                              }`}
                            >
                              {msg.sender === "user" ? (
                                msg.text
                              ) : (
                                <div className="space-y-1 leading-normal font-sans text-gray-200">
                                  {msg.text.split("\n").map((line, lIdx) => {
                                    if (line.startsWith("### ")) {
                                      return (
                                        <h5 key={lIdx} className="font-display font-black text-neon-green text-[9.5px] mt-1 mb-0.5 uppercase tracking-wide">
                                          {line.replace("### ", "")}
                                        </h5>
                                      );
                                    }
                                    if (line.startsWith("#### ")) {
                                      return (
                                        <div key={lIdx} className="font-sans font-bold text-white text-[8.5px] mt-1 mb-0.5">
                                          {line.replace("#### ", "")}
                                        </div>
                                      );
                                    }
                                    return <p key={lIdx} className="text-[8.5px] text-gray-300 leading-tight mb-0.5">{line}</p>;
                                  })}
                                  {msg.isStreaming && (
                                    <span className="inline-block h-2 w-1 bg-neon-green ml-0.5 animate-pulse" />
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Chat Input Form placed precisely inside the Scan AI Tab layout */}
                      <form onSubmit={handleCustomSubmit} className="bg-black border-t border-mechanic-border/40 p-1.5 flex gap-1 z-35 shrink-0">
                        <input
                          type="text"
                          value={customInput}
                          onChange={(e) => {
                            setIsAutoSimulate(false); // Stop autoplay on typing
                            setCustomInput(e.target.value);
                          }}
                          disabled={isAnalyzing}
                          placeholder={
                            isAnalyzing 
                              ? "Streaming inference..." 
                              : "Ask about mechanics..."
                          }
                          className="flex-1 bg-[#090a0d] border border-mechanic-border/80 rounded px-2 py-1 text-[8.5px] text-white placeholder-gray-500 focus:outline-none focus:border-neon-green/80 transition-all font-sans leading-tight"
                        />
                        <button
                          type="submit"
                          disabled={isAnalyzing || !customInput.trim()}
                          className={`p-1 bg-neon-green text-black rounded flex items-center justify-center hover:bg-neon-green/90 transition-all cursor-pointer shrink-0 ${
                            (isAnalyzing || !customInput.trim()) ? "opacity-40 cursor-not-allowed" : "neon-glow-btn"
                          }`}
                        >
                          <Send className="w-2.5 h-2.5" />
                        </button>
                      </form>
                    </div>
                  )}

                  {/* TAB 4: SCANNER */}
                  {activeMobileTab === "scanner" && (
                    <div className="flex-1 overflow-y-auto p-3 space-y-3 flex flex-col bg-[#050608]">
                      
                      {/* Active Scanned Target banner */}
                      <div className="bg-black border border-mechanic-border/40 rounded-lg p-2 flex items-center justify-between shrink-0 shadow-sm leading-none">
                        <div className="space-y-1">
                          <span className="font-mono text-[6px] text-gray-500 uppercase block">ACTIVE SCAN TARGET</span>
                          <h4 className="text-[9.5px] font-sans font-extrabold text-neon-green leading-none">
                            {vehicles.find(v => v.active)?.name || "2020 Toyota Vios"}
                          </h4>
                        </div>
                        <span className="bg-mechanic-gray/50 text-gray-400 text-[6.5px] font-mono px-1.5 py-0.5 rounded border border-mechanic-border/30 font-bold uppercase leading-none">
                          OFFLINE
                        </span>
                      </div>

                      {/* DTC Diagnostic Centre details matching screenshot 2 */}
                      <div className="bg-black border border-mechanic-border/45 rounded-lg p-3 space-y-2.5 shrink-0">
                        <div className="space-y-0.5">
                          <h3 className="text-[9.5px] font-display font-black text-neon-green uppercase tracking-wide">
                            DTC DIAGNOSTIC CENTRE
                          </h3>
                          <p className="text-[7px] text-gray-400 leading-normal">
                            Connect standard Bluetooth adapters to pull error signals dynamically. Use offline-compiled parameters or online Gemini API telemetry.
                          </p>
                        </div>

                        {/* On-Device AI Toggle */}
                        <div className="flex items-center justify-between bg-mechanic-gray/20 p-1.5 rounded border border-mechanic-border/30">
                          <div className="leading-tight">
                            <span className="font-sans font-bold text-white text-[8px] block">
                              On-Device AI (100% Offline)
                            </span>
                            <span className="text-[6px] text-gray-500">
                              Resolves parameters locally in real-time.
                            </span>
                          </div>
                          <button 
                            type="button"
                            onClick={() => setIsOfflineMode(!isOfflineMode)}
                            className={`w-6 h-3.5 rounded-full p-[1px] transition-colors relative focus:outline-none ${
                              isOfflineMode ? "bg-[#39FF14]" : "bg-neutral-800"
                            }`}
                          >
                            <div className={`w-2.5 h-2.5 rounded-full bg-white shadow-sm transition-transform ${isOfflineMode ? "translate-x-2.5" : "translate-x-0"}`} />
                          </button>
                        </div>

                        {/* Scan controller buttons */}
                        <div className="grid grid-cols-2 gap-2 pt-0.5 font-mono">
                          <button 
                            type="button"
                            disabled={isDtcScanning}
                            onClick={() => {
                              if (!bluetoothConnected) return;
                              setIsDtcScanning(true);
                              setScannedCodes([]);
                              setTimeout(() => {
                                setIsDtcScanning(false);
                                const codes = [
                                  { code: "P0113", desc: "Intake Air Temp Circuit High Input", type: "Engine Electrical Intake" },
                                  { code: "P0300", desc: "Random/Multiple Cylinder Misfire Detected", type: "Combustion Ignition Feed" }
                                ];
                                setScannedCodes(codes);
                                setScanTimestamp(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
                                
                                // History entry
                                const historyItem = {
                                  id: "h-" + Date.now(),
                                  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                                  title: `OBD Audit - Faults Disclosed`,
                                  subtitle: "2 errors intercepted under ignition codes.",
                                  status: "DETECTED" as const,
                                  codesCount: 2
                                };
                                setHistoryLogs(prev => [historyItem, ...prev]);
                              }, 1500);
                            }}
                            className={`flex items-center justify-center gap-1 py-1 rounded border text-[8px] font-bold uppercase transition-all ${
                              !bluetoothConnected 
                                ? "bg-mechanic-gray/20 border-mechanic-border/30 text-gray-600 cursor-not-allowed" 
                                : "bg-black hover:bg-neutral-900 border-neon-green/45 text-neon-green"
                            }`}
                          >
                            <Cpu className="w-2.5 h-2.5 shrink-0" />
                            <span>{isDtcScanning ? "Reading..." : "DTC SCAN"}</span>
                          </button>

                          <button 
                            type="button"
                            onClick={() => {
                              setScannedCodes([]);
                              if (scannedCodes.length > 0) {
                                const resetItem = {
                                  id: "h-" + Date.now(),
                                  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                                  title: "OBD DTC Counter Reset",
                                  subtitle: "Friction and thermal logs cleaned.",
                                  status: "CLEARED" as const,
                                  codesCount: 0
                                };
                                setHistoryLogs(prev => [resetItem, ...prev]);
                              }
                            }}
                            className="flex items-center justify-center gap-1 py-1 rounded bg-black border border-mechanic-border hover:border-red-500/40 text-[8px] font-bold uppercase transition-all text-gray-300 hover:text-white hover:bg-neutral-950"
                          >
                            <RefreshCw className="w-2.5 h-2.5 shrink-0" />
                            <span>CLEAR DTC</span>
                          </button>
                        </div>

                        {/* BT warning block if disconnected */}
                        {!bluetoothConnected && (
                          <div className="bg-black border border-amber-600/10 px-2 py-1 rounded text-[6.5px] text-amber-500 font-bold leading-tight flex flex-col gap-0.5 animate-pulse">
                            <span className="flex items-center gap-1 shrink-0">
                              <AlertTriangle className="w-2.5 h-2.5 text-amber-500 shrink-0" /> OBD connection requested for scan operations.
                            </span>
                            <span className="text-gray-500 pl-3.5 leading-none">Select active connection on Dashboard tab first.</span>
                          </div>
                        )}
                      </div>

                      {/* Diagnostic codes result block */}
                      <div className="space-y-1.5 flex-1 overflow-y-auto">
                        <span className="font-mono text-[7px] text-gray-500 uppercase block font-black leading-none pb-1 border-b border-mechanic-border/10">
                          LOG INTERCEPT METRICS
                        </span>
                        
                        {isDtcScanning ? (
                          <div className="bg-[#050608] border border-neon-green/35 rounded-lg p-6 relative overflow-hidden flex flex-col items-center justify-center text-center space-y-1.5 min-h-[140px] select-none shadow-[0_0_15px_rgba(57,255,20,0.06)]">
                            <div className="absolute inset-0 bg-gradient-to-b from-[#1bde10]/[0.03] to-transparent pointer-events-none" />
                            {/* Radar sweep lines */}
                            <div className="absolute inset-x-0 top-0 h-[2px] bg-neon-green shadow-[0_0_8px_#39ff14] opacity-80 anim-scanline" />
                            <div className="h-7 w-7 rounded-full border border-dashed border-neon-green flex items-center justify-center animate-spin" style={{ animationDuration: '3s' }}>
                              <Cpu className="w-3.5 h-3.5 text-neon-green" />
                            </div>
                            <span className="font-mono text-neon-green text-[7.5px] font-black tracking-widest uppercase animate-pulse">Analyzing CAN Core...</span>
                            <span className="text-[5.5px] text-gray-500 font-mono tracking-wider uppercase leading-none">Scanning standard ECU frame signals</span>
                          </div>
                        ) : scannedCodes.length > 0 ? (
                          <div className="space-y-1">
                            {scannedCodes.map(sc => (
                              <div key={sc.code} className="bg-black border border-red-500/20 p-2 rounded-lg flex items-start gap-1.5 leading-tight text-[7px]">
                                <span className="bg-red-500/10 text-red-400 border border-red-500/30 px-1 py-0.5 rounded font-mono font-bold leading-none shrink-0 scale-95 font-sans">
                                  {sc.code}
                                </span>
                                <div className="space-y-0.5">
                                  <p className="text-white font-bold text-[8px]">{sc.desc}</p>
                                  <p className="text-[6.5px] font-mono text-gray-500 uppercase">{sc.type}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="bg-[#050608] border border-dashed border-mechanic-border/30 rounded-lg py-5 px-3 flex flex-col items-center justify-center text-center space-y-1 select-none my-auto">
                            <div className="h-5 w-5 rounded-full bg-[#1bde10]/10 flex items-center justify-center text-neon-green text-[10px] font-bold">
                              ✓
                            </div>
                            <h4 className="font-sans font-bold text-white text-[8.5px]">No Trouble Codes Intercepted</h4>
                            <p className="text-[6.5px] text-gray-500 max-w-[170px] leading-tight">Run a DTC scan to pull diagnostic metrics from engine.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* TAB 5: HISTORY */}
                  {activeMobileTab === "history" && (
                    <div className="flex-1 overflow-y-auto p-3 space-y-3 flex flex-col bg-[#050608]">
                      <div className="space-y-0.5 shrink-0">
                        <h3 className="text-[10px] font-display font-black text-neon-green uppercase tracking-wider">
                          DTC HISTORY LOGS
                        </h3>
                        <p className="text-[7px] font-mono text-gray-500 font-bold">
                          {vehicles.find(v => v.active)?.name || "Toyota Vios"} Crash Database
                        </p>
                      </div>

                      {historyLogs.length > 0 ? (
                        <div className="space-y-1.5 flex-1 overflow-y-auto scrollbar-thin">
                          {historyLogs.map(log => (
                            <div key={log.id} className="bg-black border border-mechanic-border/40 rounded-lg p-2 flex items-center justify-between text-[7px]">
                              <div className="space-y-0.5">
                                <span className="font-mono text-[5.5px] text-gray-500 block leading-none">{log.timestamp}</span>
                                <p className="text-white font-extrabold text-[8.5px] leading-tight">{log.title}</p>
                                <p className="text-gray-400 text-[6.5px] leading-none">{log.subtitle}</p>
                              </div>
                              <span className={`text-[6px] font-bold px-1 py-0.5 rounded font-mono uppercase shrink-0 scale-95 ${
                                log.status === "DETECTED" 
                                  ? "bg-red-500/10 border border-red-500/20 text-red-400" 
                                  : "bg-amber-400/10 border border-amber-500/20 text-amber-300"
                              }`}>
                                {log.status}
                              </span>
                            </div>
                          ))}
                          <button 
                            type="button"
                            onClick={() => setHistoryLogs([])}
                            className="w-full text-center text-gray-500 hover:text-white font-mono text-[7px] pt-1 uppercase select-none"
                          >
                            Clear History Stack
                          </button>
                        </div>
                      ) : (
                        <div className="m-auto text-center p-5 flex flex-col items-center justify-center space-y-1.5 select-none animate-fade-in">
                          <div className="h-7 w-7 rounded-full bg-[#1bde10]/10 flex items-center justify-center text-neon-green">
                            <History className="w-3.5 h-3.5 text-neon-green" />
                          </div>
                          <h4 className="font-sans font-bold text-white text-[9px]">No Diagnostic Logs Saved</h4>
                          <p className="text-[7.5px] text-gray-500 max-w-[160px] leading-tight">Scans executed from the Scanner tab record directly into local history archives to inspect offline.</p>
                        </div>
                      )}
                    </div>
                  )}

                </div>

                {/* Simulated Custom Navigation Tabs + HUD switches */}
                <div className="shrink-0 relative z-25">
                  
                  {/* Floating Overlay HUD Swapper Link */}
                  <div className="bg-black p-1 px-2.5 border-t border-mechanic-border/30 flex justify-between items-center select-none text-[8px] font-mono shrink-0">
                    <span className="text-gray-500 uppercase text-[7px]">HUD Overlay Node:</span>
                    <button
                      type="button"
                      onClick={() => setIsFloatingWidget(!isFloatingWidget)}
                      className={`px-1.5 py-0.5 border rounded-sm text-[7px] uppercase font-black transition-all ${
                        isFloatingWidget 
                          ? "bg-neon-green text-black border-neon-green" 
                          : "bg-black text-gray-500 border-mechanic-border/60 hover:text-neon-green hover:border-neon-green/50"
                      }`}
                    >
                      {isFloatingWidget ? "ACTIVE" : "LAUNCH"}
                    </button>
                  </div>

                  {/* Android 5-Tab Navigation Bar Representation */}
                  <div className="bg-black border-t border-mechanic-border/30 px-1 pt-1 pb-1.5 flex items-center justify-around text-center relative font-mono text-[6.5px] select-none text-gray-500">
                    
                    <button 
                      type="button"
                      onClick={() => {
                        setIsAutoSimulate(false);
                        setActiveMobileTab("garage");
                      }}
                      className={`flex-1 flex flex-col items-center gap-0.5 justify-center py-1 transition-all ${
                        activeMobileTab === "garage" ? "text-neon-green font-black scale-105" : "text-gray-500 hover:text-gray-300"
                      }`}
                    >
                      <Car className={`w-3.5 h-3.5 transition-transform ${activeMobileTab === "garage" ? "text-neon-green" : "text-gray-500"}`} />
                      <span className="text-[6.5px]">Garage</span>
                    </button>

                    <button 
                      type="button"
                      onClick={() => {
                        setIsAutoSimulate(false);
                        setActiveMobileTab("dashboard");
                      }}
                      className={`flex-1 flex flex-col items-center gap-0.5 justify-center py-1 transition-all ${
                        activeMobileTab === "dashboard" ? "text-neon-green font-black scale-105" : "text-gray-500 hover:text-gray-300"
                      }`}
                    >
                      <Sliders className={`w-3.5 h-3.5 transition-transform ${activeMobileTab === "dashboard" ? "text-neon-green" : "text-gray-500"}`} />
                      <span className="text-[6.5px]">Dashboard</span>
                    </button>

                    {/* Centered Green Sparkle Action Button */}
                    <div className="flex-1 flex flex-col items-center justify-center relative -mt-3.5 z-40">
                      <button 
                        type="button"
                        onClick={() => {
                          setIsAutoSimulate(false);
                          setActiveMobileTab("scan_ai");
                        }}
                        className={`h-8 w-8 rounded-full flex items-center justify-center shadow-[0_0_12px_rgba(57,255,20,0.25)] transition-all ${
                          activeMobileTab === "scan_ai" 
                            ? "bg-[#39FF14] text-black scale-110" 
                            : "bg-[#0f240f] text-neon-green border border-[#1bde10]/30 hover:bg-[#1bde10]/20"
                        }`}
                      >
                        <Sparkles className="w-3.5 h-3.5 fill-current shrink-0" />
                      </button>
                      <span className={`text-[6px] tracking-tight mt-0.5 font-bold uppercase transition-colors ${activeMobileTab === "scan_ai" ? "text-neon-green" : "text-gray-500"}`}>
                        Scan AI
                      </span>
                    </div>

                    <button 
                      type="button"
                      onClick={() => {
                        setIsAutoSimulate(false);
                        setActiveMobileTab("scanner");
                      }}
                      className={`flex-1 flex flex-col items-center gap-0.5 justify-center py-1 transition-all ${
                        activeMobileTab === "scanner" ? "text-neon-green font-black scale-105" : "text-gray-500 hover:text-gray-300"
                      }`}
                    >
                      <Cpu className={`w-3.5 h-3.5 transition-transform ${activeMobileTab === "scanner" ? "text-neon-green" : "text-gray-500"}`} />
                      <span className="text-[6.5px]">Scanner</span>
                    </button>

                    <button 
                      type="button"
                      onClick={() => {
                        setIsAutoSimulate(false);
                        setActiveMobileTab("history");
                      }}
                      className={`flex-1 flex flex-col items-center gap-0.5 justify-center py-1 transition-all ${
                        activeMobileTab === "history" ? "text-neon-green font-black scale-105" : "text-gray-500 hover:text-gray-300"
                      }`}
                    >
                      <History className={`w-3.5 h-3.5 transition-transform ${activeMobileTab === "history" ? "text-neon-green" : "text-gray-500"}`} />
                      <span className="text-[6.5px]">History</span>
                    </button>

                  </div>

                  {/* Bottom Home Indicator Bar */}
                  <div className="bg-black w-full pb-1 flex justify-center items-center pointer-events-none select-none shrink-0">
                    <div className="w-[45px] h-[3px] bg-white/20 rounded-full" />
                  </div>

                </div>

              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
