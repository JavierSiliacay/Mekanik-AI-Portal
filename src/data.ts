import { 
  FeatureItem, 
  FAQItem, 
  ComparisonRow, 
  DevProject, 
  VersionInfo,
  DiagnosticTestCase 
} from "./types";

export const versionData: VersionInfo = {
  version: "v1.0.1.",
  size: "30.5 MB",
  date: "June 2026",
  compatibility: "Android 8.0 (Oreo, API 26) or higher",
  apkName: "Mekanik-AI.apk",
  releaseNotes: [
    "Hybrid AI Routing System: Automatically falls back to local Llama 3.2 1B model when offline",
    "Multimodal dashboard scanning: Performance-tuned suspend-based Base64 encoding",
    "Throttled Jetpack Compose floating widget layout with smooth system gestures",
    "Hugging Face Hub native model downloader for Llama, SmolLM2, and Qwen",
    "Stream stabilization: Word-by-word UI rendering via Kotlin Flow and EventSource",
    "Added 150+ custom automotive diagnostic guides for instant offline reference"
  ]
};

export const featuresData: FeatureItem[] = [
  {
    id: "hybrid-ai",
    icon: "Cpu",
    title: "Hybrid AI Intelligence",
    badge: "Dual Engine",
    description: "Operates online via cloud connections or entirely offline without internet.",
    details: [
      "Online mode: Streams answers from high-capacity Google Gemma nodes",
      "Offline mode: Seamlessly boots lightweight models (Llama 3.2 1B, SmolLM2, Qwen 2.5) locally on-device",
      "MediaPipe LLM integration: Fully hardware-accelerated on modern mobile chipsets"
    ]
  },
  {
    id: "automotive-focus",
    icon: "Wrench",
    title: "Automotive-Tuned Knowledge",
    badge: "Domain Specialized",
    description: "Deeply calibrated for mechanics and car owners. It doesn't write poems; it fixes cars.",
    details: [
      "Extensive diagnostics on drivetrain, chassis, and electronic control units",
      "Decipher complex OBD-II DTC (Diagnostic Trouble Codes)",
      "Provides exact diagnostic procedures, safety warnings, and component values"
    ]
  },
  {
    id: "image-analysis",
    icon: "Camera",
    title: "Multimodal Image Scanning",
    badge: "Image Reading",
    description: "Snap a photo of warning lights, worn spark plugs, or engine leaks to receive an instant analysis.",
    details: [
      "Optimized Android memory footprint using offscreen suspending bitmap conversion",
      "Visual classification of dashboard mil warnings, leaks, and mechanical wear",
      "Step-by-step guidance indexed on the specific visual findings"
    ]
  },
  {
    id: "performance-first",
    icon: "Zap",
    title: "Zero-Stutter Performance",
    badge: "60 FPS UI",
    description: "Designed from ground up with Jetpack Compose, Kotlin Coroutines, and strict threading policy.",
    details: [
      "Heavy assets, model loaders, and image parsing offloaded to Dispatchers.IO and Default",
      "Zero UI stutters during chat streaming or local inference",
      "Extremely optimized floating chat head and layout widgets"
    ]
  },
  {
    id: "obd-ready",
    icon: "Gauge",
    title: "Future OBD-II & ECU Integration",
    badge: "Expanding Specs",
    description: "Pre-routed channels ready for standard ELM327 Bluetooth and direct OBD-II terminal telemetry.",
    details: [
      "Direct ECU live parameter readout blueprints",
      "Automatic code decoding from standard PID broadcasts",
      "Full offline code library match for over 18,000 generic and manufacturer-specific trouble codes"
    ]
  },
  {
    id: "offline-mgmt",
    icon: "DownloadCloud",
    title: "In-App Model Management",
    badge: "Local Freedom",
    description: "Download lightweight AI models directly inside the application from Hugging Face.",
    details: [
      "Supports Llama 3.2 1B, SmolLM2 1.7B, and Qwen 2.5 1.5B binaries",
      "Automated extraction, verification, and loading into local MediaPipe engine",
      "100% cloudless, private, and zero latency diagnostic responses"
    ]
  }
];

export const installationSteps = [
  {
    step: "01",
    title: "Download APK",
    description: "Tap the direct 'Download Mekanik AI APK' button on this portal to fetch the official signed package: Mekanik-AI.apk.",
    highlight: "Mekanik-AI.apk"
  },
  {
    step: "02",
    title: "Allow Unknown Sources",
    description: "Go to Settings > Security (or Search 'Install unknown apps') on your Android device and enable permissions for your browser or file manager.",
    highlight: "Settings > Security"
  },
  {
    step: "03",
    title: "Install Package",
    description: "Open your device's Downloads folder, select the downloaded Mekanik-AI.apk file, and press 'Install'. Wait for the layout check to finalize.",
    highlight: "Tap Install"
  },
  {
    step: "04",
    title: "Launch & Run",
    description: "Launch Mekanik AI from your app drawer. You can trigger the transparent floating widget or run diagnosing queries immediately!",
    highlight: "Start Diagnosing"
  }
];

export const comparisonData: ComparisonRow[] = [
  {
    feature: "Automotive Specialization",
    mekanik: { supported: true, text: "Fine-tuned purely for mechanical, vehicle, and OBD diagnostics. Avoids irrelevant responses." },
    generic: { supported: false, text: "Provides generic text. Lacks deep technical blueprints, specific wrench torque steps, or accurate DTC context." }
  },
  {
    feature: "Offline AI Inference",
    mekanik: { supported: true, text: "Runs on-device via Llama 3.2 1B (MediaPipe). Zero data connection required for shop use." },
    generic: { supported: false, text: "Requires active cellular or Wi-Fi connection. Fails in remote areas or inside metal-decked repair shops." }
  },
  {
    feature: "Multimodal Diagnostic Scanning",
    mekanik: { supported: true, text: "Processes diagnostic indicators, under-hood issues, and spark plug wear with targeted automotive advice." },
    generic: { supported: true, text: "Can parse general elements of images, but frequently misses mechanical anomalies or specific dashboard codes." }
  },
  {
    feature: "HUD Floating Shop Widget",
    mekanik: { supported: true, text: "Sleek, transparent, persistent widget stays overlayed on top of active service manuals or OBD logs." },
    generic: { supported: false, text: "Requires context switching between multiple apps. Interrupted workflow while diagnosing." }
  },
  {
    feature: "Future ECU PID Integration",
    mekanik: { supported: true, text: "Underlying architecture built for high-speed ECU stream reading, fault resets, and live sensor graphs." },
    generic: { supported: false, text: "Completely disconnected from vehicle hardware or physical inputs." }
  },
  {
    feature: "Privacy-First / No Account Required",
    mekanik: { supported: true, text: "Totally premium, standalone offline execution. Your logs, diagnostics, and photos never leave your phone." },
    generic: { supported: false, text: "Requires user accounts, cloud tracking, data selling, and subscription memberships." }
  }
];

export const developerBio = {
  name: "Javier Siliacay",
  role: "Web + IoT + AI Engineer",
  tagline: "I build web apps, program microcontrollers, and integrate AI. Web + IoT + AI — all in one stack.",
  avatarInitials: "JS",
  experience: [
    "Creator of Mekanik AI — Advanced Android Diagnostic Engine with Local Inference",
    "Architect of AutoWorx System & Inventory — Elite workshop and repair orchestration solutions",
    "Developer of SadBai-AI, TaraFix, and Circuito-AI — Integrated web services & on-device intelligence",
    "IoT Systems Developer — Specialized in embedded ESP32, DS18b20, OLED gauges & signal controllers"
  ],
  socials: {
    github: "https://github.com/JavierSiliacay",
    facebook: "https://www.facebook.com/siliacayjavier"
  }
};

export const faqData: FAQItem[] = [
  {
    question: "Is Mekanik AI completely free?",
    answer: "Yes, Mekanik AI is currently free to use. The APK is freely downloadable, features no ads, has no locked paywalls, and respects your repair autonomy entirely."
  },
  {
    question: "How does the Offline AI mode work?",
    answer: "Through the 'Offline Model Management' configuration screen, you can download compact LLM binaries like Llama 3.2 1B, SmolLM2, or Qwen directly. Once compiled, Mekanik AI runs these models completely locally using Google's MediaPipe GPU/CPU compiler — demanding no cellular service or internet access."
  },
  {
    question: "Do I need Google Play services to install the app?",
    answer: "No! Since Mekanik AI promotes diagnostic resilience, Google Play is NOT required. You can download the direct, secure sign-verified 'Mekanik-AI.apk' from this portal and sideload it on any standard Android devices."
  },
  {
    question: "Can it decode specific brand-related vehicle parameters?",
    answer: "Yes, Mekanik AI is specifically calibrated to distinguish manufacturer-specific codes (Trouble Codes beginning with P1, P2, P3, B, C, U) across Japanese, European, and Domestic vehicle networks (including VW, Ford, Toyota, BMW, Chrysler, GM, etc.)."
  },
  {
    question: "Can a physical OBD-II Bluetooth reader actually read the data?",
    answer: "Absolutely. The backend architecture of Mekanik AI is fully integrated with a Coroutine-driven Bluetooth stream parser. A future release will support linking ELM327 hardware directly to overlay real-time engine telemetry (PIDs) alongside the assistant."
  },
  {
    question: "Is there any danger of the model generating diagnostic errors?",
    answer: "Our Real-World Policy enforces that AI responses must rely only on true facts, strict code tables, or your exact symptoms. However, users should always practice standard workshop safety, consult service manuals, and verify instructions before executing physical repairs."
  }
];

export const diagnosticCases: DiagnosticTestCase[] = [
  {
    id: "test-01",
    title: "Check Engine Code P0301 (Cylinder 1 Misfire)",
    category: "OBD-II",
    input: "Explain DTC code P0301 on a 2015 Toyota Camry. What are my troubleshooting steps?",
    response: `### 🔴 Trouble Code P0301 - Cylinder 1 Misfire Detected (Toyota Camry 2.5L)

The ECM (Engine Control Module) has detected that Cylinder 1 is misfiring. This indicates incomplete combustion in that cylinder.

#### 🔍 Root Causes:
1. **Ignition Coil (Most Common):** Faulty coil boot or primary wind failure.
2. **Spark Plug:** Excessive electrode gap, carbon tracking, or wet fouling.
3. **Fuel Injector:** Clogged tip or poor electrical pulse from driver circuit.
4. **Compression:** Worn valves or cylinder head gasket weep.

#### 🔧 Diagnostic Procedure:
1. **Swap Test (Easiest):** Swap Ignition Coil 1 with Coil 2. Clear codes and test-drive.
   * *If code changes to P0302:* Replace the ignition coil.
   * *If code remains P0301:* Move to spark plug inspection.
2. **Inspect Plug 1:** Check for fuel saturation or cracked ceramic.
3. **Verify Injector Pulse:** Listen to the injector with a stethoscope for standard clicking.`
  },
  {
    id: "test-02",
    title: "Multimodal Spark Plug Scan",
    category: "Multimodal",
    imageType: "sparkplug",
    input: "[Image Uploaded: Spark Plug with heavy black powdery coating] Can you diagnose the condition of this spark plug?",
    response: `### 📸 Multimodal Visual Analysis: Carbon-Fouled Spark Plug

The provided image indicates clear **Carbon Fouling**. The insulator nose, electrodes, and threads are coated with a dry, black, velvety carbon deposit.

#### ⚠️ Diagnostics:
- **Condition:** Spark plug is misfiring because the electrical spark is leaking through the carbon coating to the metal shell instead of jumping the gap.
- **Root Causes:**
  1. Rich fuel mixture (leaky injector, fault in oxygen sensor, or clogged air filter).
  2. Sustained low-speed driving or short trips where the engine never reaches self-cleaning temperature.
  3. Weak ignition system secondary output.

#### 💡 Action Steps:
1. Replace the spark plug set to retrieve instant throttle response.
2. Inspect your Engine Air Filter and check LTFT (Long Term Fuel Trims) for rich conditions.`
  },
  {
    id: "test-03",
    title: "Thick White Smoke",
    category: "Symptom",
    input: "Thick white smoke is boiling out of my exhaust pipe when warming up. What does this mean?",
    response: `### 💨 Diagnostic Symptom: Thick White Exhaust Smoke

Unlike light steam condensation that disappears quickly, dense, billowing white smoke with a sweet smell indicates **coolant entering the combustion chambers**.

#### 🚨 Critical Issues:
1. **Blown Head Gasket:** Breached seal between the coolant jacket and the combustion cylinder.
2. **Cracked Engine block or Cylinder Head:** Structural crack letting coolant leak into the intake port or combustion chamber.

#### 🧪 Diagnostics Checklist:
- **Bubble Test:** Open the radiator cap (only when engine is completely cold) and check if bubbles rise to the neck while running. Bubble streams indicate compression gas is leaking into the cooling system.
- **Dipstick Inspection:** Pull the oil dipstick. If the oil looks like chocolate milkshake, coolant is mixing with the oil. *DO NOT run the engine to prevent bearing wash!*`
  },
  {
    id: "test-04",
    title: "Drivetrain MIL Warning Light",
    category: "Visual",
    imageType: "dashboard",
    input: "[Image Uploaded: Dashboard Yellow Exclamation Mark in a Gear Icon] What does this warning light mean?",
    response: `### 📸 Dashboard Indicator Diagnostic: Drivetrain / Transmission Warning

This yellow indicator represents a **Transmission/Drivetrain fault** (often labeled as AMT or Gearbox override warning on European or Asian vehicles).

#### 📊 Visual Summary:
- **Severity:** High. The transmission control unit (TCU) has registered a fault or entered 'Limp Home' mode to protect gears.
- **Common Triggers:**
  1. Low transmission fluid level or extreme fluid deterioration.
  2. Solenoid valves jamming or losing pressure control.
  3. Transmission fluid overtemperature.

#### 🔧 Next Actions:
1. Pull over safely and check for active hydraulic fluid leaks underneath.
2. Scan the TCU (using an OBD-II parser or expert scan tool) to grab transmission DTCs (typically starting with P0700 - P0899).`
  }
];
