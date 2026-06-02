import { useState, useEffect } from "react";
import { Download, ShieldCheck, CheckCircle2, Terminal, RefreshCw, Smartphone, Users } from "lucide-react";
import { versionData, installationSteps } from "../data";
import { motion } from "motion/react";

export default function ApkDownload() {
  const [downloadCount, setDownloadCount] = useState(0);

  useEffect(() => {
    fetch('/api/downloads')
      .then(res => res.json())
      .then(data => {
        if (data && typeof data.count === 'number') {
          setDownloadCount(data.count);
        }
      })
      .catch(err => console.error('Error fetching download count:', err));
  }, []);

  const handleDownload = () => {
    fetch('/api/downloads/increment', { method: 'POST' })
      .then(res => res.json())
      .then(data => {
        if (data && typeof data.count === 'number') {
          setDownloadCount(data.count);
        }
      })
      .catch(err => {
        console.error('Error incrementing download count:', err);
        // Fallback local increment if server fails
        setDownloadCount(prev => prev + 1);
      });
  };

  return (
    <section id="download" className="relative py-24 bg-transparent font-sans">
      {/* Background visual glows */}
      <div className="absolute top-1/4 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-neon-green/[0.02] blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-y-1/2 w-96 h-96 rounded-full bg-neon-green/[0.01] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-neon-green bg-neon-green/5 px-3 py-1 rounded-full border border-neon-green/10">
            SECURE DISTRIBUTION
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight mt-4">
            Official Mekanik AI APK Download Center
          </h2>
          <p className="font-sans text-sm text-gray-400 mt-4 leading-relaxed">
            Mekanik AI bypasses Google Play Store surveillance constraints to guarantee complete mechanical privacy, custom offline independence, and direct installation integrity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Sideload Information / Spec Card */}
          <div className="lg:col-span-5 bg-mechanic-card backdrop-blur-md border border-neon-green/30 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-[0_0_30px_rgba(57,255,20,0.03)] relative overflow-hidden">
            {/* Decorative Matrix grid */}
            <div className="absolute inset-0 grid-bg-dense opacity-10 pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center gap-2.5 pb-4 border-b border-mechanic-border/50">
                <div className="p-2 bg-neon-green/10 text-neon-green rounded border border-neon-green/30">
                  <ShieldCheck className="w-6 h-6 text-neon-green" />
                </div>
                <div>
                  <span className="font-mono text-[9px] text-neon-green block tracking-wider uppercase">SIGNED STABLE BUILD</span>
                  <h3 className="font-display font-black text-xl text-white">APK Installation Node</h3>
                </div>
              </div>

              {/* Package Specs */}
              <div className="py-6 space-y-4 font-mono text-xs text-gray-400">
                <div className="flex justify-between py-1.5 border-b border-mechanic-border/50">
                  <span>FILE NAME</span>
                  <strong className="text-white font-medium">{versionData.apkName}</strong>
                </div>
                <div className="flex justify-between py-1.5 border-b border-mechanic-border/50">
                  <span>CURRENT VERSION</span>
                  <strong className="text-neon-green font-bold">{versionData.version}</strong>
                </div>
                <div className="flex justify-between py-1.5 border-b border-mechanic-border/50">
                  <span>PACKAGE SIZE</span>
                  <strong className="text-white font-medium">{versionData.size}</strong>
                </div>
                <div className="flex justify-between py-1.5 border-b border-mechanic-border/50">
                  <span>RELEASE DATE</span>
                  <strong className="text-white font-medium">{versionData.date}</strong>
                </div>
                <div className="flex justify-between py-1.5 border-b border-mechanic-border/50 pb-3">
                  <span>COMPATIBILITY</span>
                  <strong className="text-white font-medium text-right max-w-[200px]">{versionData.compatibility}</strong>
                </div>
              </div>

              {/* Version Release Notes */}
              <div className="space-y-3.5 bg-white/[0.03] rounded-xl p-4 border border-mechanic-border">
                <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block font-bold font-sans">
                  CORE CHANGELOG:
                </span>
                <ul className="space-y-2.5">
                  {versionData.releaseNotes.map((note, index) => (
                    <li key={index} className="flex gap-2 text-[11px] text-gray-300 font-sans leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-neon-green shrink-0 mt-0.5" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Direct Sideload APK Button */}
            <div className="relative z-10 mt-8 font-mono">
              <a
                href="/Mekanik-AI.apk"
                download="Mekanik-AI.apk"
                onClick={handleDownload}
                className="w-full py-4 bg-neon-green text-black font-mono font-black text-xs text-center uppercase tracking-[0.2em] rounded-xl flex items-center justify-center gap-3 hover:bg-neon-green/90 transition-all duration-300 neon-glow-btn shadow-[0_4px_20px_rgba(57,255,20,0.25)]"
                id="main-download-button"
              >
                <Download className="w-5 h-5 text-black animate-bounce" />
                Download Mekanik AI APK
              </a>
              <span className="font-mono text-[9px] text-gray-500 text-center block mt-3 uppercase tracking-wider">
                100% Malware Checked • SHA-256 Sign Verified SECURE BUILD
              </span>

              {/* Download Counter */}
              <div className="mt-5 flex items-center justify-center gap-3 bg-black/40 border border-mechanic-border py-3 px-4 rounded-xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-neon-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="p-2 bg-white/[0.03] border border-mechanic-border/50 rounded-lg">
                  <Users className="w-4 h-4 text-neon-green" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display font-black text-white text-lg leading-none tracking-tight">
                      {downloadCount.toLocaleString()}
                    </span>
                    <span className="flex h-1.5 w-1.5 rounded-full bg-neon-green animate-pulse" />
                  </div>
                  <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest mt-0.5 font-bold">
                    Active Global Installs
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sideload Installation Wizard (Beautiful Roadmap Timeline) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="bg-mechanic-card backdrop-blur-md border border-mechanic-border rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-8">
                <Terminal className="w-4 h-4 text-neon-green" />
                <h3 className="font-display font-bold text-sm text-white tracking-widest uppercase">
                  ANDROID SIDELOADING ROADMAP
                </h3>
              </div>

              {/* Sideload Timeline Items */}
              <div className="relative border-l border-mechanic-border/70 ml-3.5 sm:ml-5 pl-8 sm:pl-10 space-y-10 py-2">
                {installationSteps.map((item, stepIdx) => (
                  <div key={stepIdx} className="relative group">
                    {/* Glowing Number Icon Node */}
                    <div className="absolute -left-[45px] sm:-left-[53px] top-0 flex items-center justify-center w-8 h-8 rounded-full bg-mechanic-card backdrop-blur-md border border-mechanic-border text-neon-green font-mono font-bold text-xs group-hover:border-neon-green group-hover:shadow-[0_0_10px_rgba(57,255,20,0.2)] transition-all duration-300">
                      {item.step}
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-display font-extrabold text-sm text-white flex items-center gap-2 font-sans">
                        {item.title}
                        <span className="font-mono text-[9px] text-neon-green bg-neon-green/5 border border-neon-green/10 px-1.5 py-0.5 rounded">
                          {item.highlight}
                        </span>
                      </h4>
                      <p className="font-sans text-xs text-gray-400 leading-relaxed max-w-2xl">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Warning Advice Section */}
            <div className="mt-6 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 backdrop-blur-md flex gap-3 text-xs text-gray-400">
              <span className="text-yellow-500 font-mono font-bold text-base shrink-0 select-none">!</span>
              <div>
                <strong className="text-white font-sans font-semibold">Important Sideloading Advice:</strong> On Android 13/14, you may see a "Blocked by Play Protect" warning since the APK is compiled and distributed directly from developers via GitHub. This is normal. Simply tap <span className="text-white font-bold font-mono text-[10px] bg-black px-1.5 py-0.5 rounded">"Install anyway"</span> to finalize the operation securely.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
