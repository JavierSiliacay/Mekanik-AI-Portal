import { Github, Facebook, Shield, Code, Server, Heart, ExternalLink, Sparkles } from "lucide-react";
import { developerBio } from "../data";

export default function DeveloperSection() {
  return (
    <section id="developer" className="relative py-24 bg-transparent font-sans">
      {/* Absolute Decorative Glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 rounded-full bg-neon-green/[0.01] blur-3xl pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-96 h-96 rounded-full bg-neon-green/[0.015] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-neon-green bg-neon-green/5 px-3 py-1 rounded-full border border-neon-green/10">
            THE DEVELOPER
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight mt-4">
            Meet the Solo Developer Behind the Project
          </h2>
          <p className="font-sans text-sm text-gray-400 mt-4 leading-relaxed">
            Mekanik AI is conceived and engineered with pristine performance standards by premium independent full-stack developer Javier Siliacay.
          </p>
        </div>

        {/* Center-aligned Developer Card with a modern cyberpunk bento design */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-mechanic-card backdrop-blur-md border border-mechanic-border rounded-2xl p-6 sm:p-10 relative overflow-hidden group hover:border-neon-green/20 transition-all duration-300">
            {/* Decorative Grid Network Background */}
            <div className="absolute inset-0 grid-bg-dense opacity-[0.06] pointer-events-none" />
            
            <div className="relative z-10 space-y-8">
              {/* Profile Header Block */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-mechanic-border/50">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl border border-neon-green/40 flex items-center justify-center relative overflow-hidden shrink-0">
                    <img src="/developer.gif" alt="Developer Avatar" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-display font-black text-xl text-white tracking-wide">
                      {developerBio.name}
                    </h3>
                    <p className="font-mono text-xs text-neon-green uppercase tracking-widest mt-0.5 font-bold">
                      {developerBio.role}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-[10px] font-mono text-gray-400">
                  <div className="flex items-center gap-1.5 bg-black/40 border border-mechanic-border px-2.5 py-1 rounded">
                    <span className="h-1.5 w-1.5 rounded-full bg-neon-green" />
                    <span>STATUS: ACTIVE</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-black/40 border border-mechanic-border px-2.5 py-1 rounded">
                    <span>LOCATION: GLOBAL</span>
                  </div>
                </div>
              </div>

              {/* Bio & Intro Phrase */}
              <div className="space-y-4">
                <p className="font-sans text-sm sm:text-base text-gray-300 leading-relaxed italic border-l-2 border-neon-green/40 pl-4 py-1">
                  "{developerBio.tagline}"
                </p>
              </div>

              {/* Core Engineering focus - Non-confidential technical breakdown */}
              <div className="space-y-6">
                <div className="flex items-center gap-1.5 font-mono text-xs text-gray-400 uppercase tracking-widest">
                  <Code className="w-4 h-4 text-neon-green" />
                  <span>CORE STACK & REAL GITHUB SHOWCASE</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
                  {/* AI & Diagnostics Block */}
                  <div className="p-4 bg-white/[0.01] border border-mechanic-border/50 rounded-xl hover:border-neon-green/35 hover:bg-white/[0.02] transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/[0.03]">
                        <Sparkles className="w-4 h-4 text-neon-green" />
                        <span className="text-xs font-display text-white font-bold uppercase tracking-wider">AI & Diagnostics</span>
                      </div>
                      <p className="text-[11px] text-gray-400 leading-relaxed mb-4">
                        Compiling lightweight local models running on-device with GPU/NPU acceleration, alongside context-guided automation tools.
                      </p>
                      
                      <div className="space-y-2 mt-auto">
                        <a 
                          href="https://github.com/JavierSiliacay/mekanik-ai"
                          target="_blank"
                          referrerPolicy="no-referrer"
                          className="flex items-center justify-between text-[10px] font-mono p-1.5 bg-black/60 border border-mechanic-border/30 rounded text-neon-green hover:border-neon-green/40 hover:bg-black/90 transition-all font-bold"
                        >
                          <span>📁 mekanik-ai</span>
                          <ExternalLink className="w-2.5 h-2.5 text-gray-500" />
                        </a>
                        <a 
                          href="https://github.com/JavierSiliacay/SadBai-AI"
                          target="_blank"
                          referrerPolicy="no-referrer"
                          className="flex items-center justify-between text-[10px] font-mono p-1.5 bg-black/60 border border-mechanic-border/30 rounded text-gray-300 hover:border-neon-green/40 hover:bg-black/90 transition-all font-bold"
                        >
                          <span>📁 SadBai-AI</span>
                          <ExternalLink className="w-2.5 h-2.5 text-gray-500" />
                        </a>
                        <a 
                          href="https://github.com/JavierSiliacay/Circuito-AI"
                          target="_blank"
                          referrerPolicy="no-referrer"
                          className="flex items-center justify-between text-[10px] font-mono p-1.5 bg-black/60 border border-mechanic-border/30 rounded text-gray-300 hover:border-neon-green/40 hover:bg-black/90 transition-all font-bold"
                        >
                          <span>📁 Circuito-AI</span>
                          <ExternalLink className="w-2.5 h-2.5 text-gray-500" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Enterprise Web Stack Block */}
                  <div className="p-4 bg-white/[0.01] border border-mechanic-border/50 rounded-xl hover:border-neon-green/35 hover:bg-white/[0.02] transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/[0.03]">
                        <Server className="w-4 h-4 text-neon-green" />
                        <span className="text-xs font-display text-white font-bold uppercase tracking-wider">Web Applications</span>
                      </div>
                      <p className="text-[11px] text-gray-400 leading-relaxed mb-4">
                        Architecting full-stack management and orchestration grids with offline capability, smooth gesture support, and dynamic state-flows.
                      </p>
                      
                      <div className="space-y-2 mt-auto">
                        <a 
                          href="https://github.com/JavierSiliacay/autoworx-system"
                          target="_blank"
                          referrerPolicy="no-referrer"
                          className="flex items-center justify-between text-[10px] font-mono p-1.5 bg-black/60 border border-mechanic-border/30 rounded text-gray-300 hover:border-neon-green/40 hover:bg-black/90 transition-all font-bold"
                        >
                          <span>📁 autoworx-system</span>
                          <ExternalLink className="w-2.5 h-2.5 text-gray-500" />
                        </a>
                        <a 
                          href="https://github.com/JavierSiliacay/TaraFix"
                          target="_blank"
                          referrerPolicy="no-referrer"
                          className="flex items-center justify-between text-[10px] font-mono p-1.5 bg-black/60 border border-mechanic-border/30 rounded text-gray-300 hover:border-neon-green/40 hover:bg-black/90 transition-all font-bold"
                        >
                          <span>📁 TaraFix</span>
                          <ExternalLink className="w-2.5 h-2.5 text-gray-500" />
                        </a>
                        <a 
                          href="https://github.com/JavierSiliacay/javiersiliacay-portfolio"
                          target="_blank"
                          referrerPolicy="no-referrer"
                          className="flex items-center justify-between text-[10px] font-mono p-1.5 bg-black/60 border border-mechanic-border/30 rounded text-gray-300 hover:border-neon-green/40 hover:bg-black/90 transition-all font-bold"
                        >
                          <span>📁 portfolio-hub</span>
                          <ExternalLink className="w-2.5 h-2.5 text-gray-500" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* IoT & Embedded Systems Block */}
                  <div className="p-4 bg-white/[0.01] border border-mechanic-border/50 rounded-xl hover:border-neon-green/35 hover:bg-white/[0.02] transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/[0.03]">
                        <Shield className="w-4 h-4 text-neon-green" />
                        <span className="text-xs font-display text-white font-bold uppercase tracking-wider">IoT & Hardware</span>
                      </div>
                      <p className="text-[11px] text-gray-400 leading-relaxed mb-4">
                        Programming microcontrollers (ESP32, Arduino) to host standalone servers, render OLED metrics/gauges, or track sensor signals.
                      </p>
                      
                      <div className="space-y-2 mt-auto">
                        <a 
                          href="https://github.com/JavierSiliacay/V8-Engine-OLED"
                          target="_blank"
                          referrerPolicy="no-referrer"
                          className="flex items-center justify-between text-[10px] font-mono p-1.5 bg-black/60 border border-mechanic-border/30 rounded text-gray-300 hover:border-neon-green/40 hover:bg-black/90 transition-all font-bold"
                        >
                          <span>📁 V8-Engine-OLED</span>
                          <ExternalLink className="w-2.5 h-2.5 text-gray-500" />
                        </a>
                        <a 
                          href="https://github.com/JavierSiliacay/TFT-WebServer-RPMGauge"
                          target="_blank"
                          referrerPolicy="no-referrer"
                          className="flex items-center justify-between text-[10px] font-mono p-1.5 bg-black/60 border border-mechanic-border/30 rounded text-gray-300 hover:border-neon-green/40 hover:bg-black/90 transition-all font-bold"
                        >
                          <span>📁 WebServer-Gauge</span>
                          <ExternalLink className="w-2.5 h-2.5 text-gray-500" />
                        </a>
                        <a 
                          href="https://github.com/JavierSiliacay/SuperMini-Jammer"
                          target="_blank"
                          referrerPolicy="no-referrer"
                          className="flex items-center justify-between text-[10px] font-mono p-1.5 bg-black/60 border border-mechanic-border/30 rounded text-gray-300 hover:border-neon-green/40 hover:bg-black/90 transition-all font-bold"
                        >
                          <span>📁 SuperMini-Jammer</span>
                          <ExternalLink className="w-2.5 h-2.5 text-gray-500" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Handles / Action Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-mechanic-border/50">
                <a
                  href={developerBio.socials.github}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="py-3 bg-mechanic-gray hover:bg-neon-green hover:text-black border border-mechanic-border rounded-lg font-mono text-2xs uppercase tracking-wider text-gray-300 transition-all duration-300 flex items-center justify-center gap-2 font-bold hover:shadow-[0_0_15px_rgba(57,255,20,0.15)]"
                >
                  <Github className="w-4 h-4 shrink-0" />
                  GitHub Workspace
                </a>
                <a
                  href={developerBio.socials.facebook}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="py-3 bg-mechanic-gray hover:bg-neon-green hover:text-black border border-mechanic-border rounded-lg font-mono text-2xs uppercase tracking-wider text-gray-300 transition-all duration-300 flex items-center justify-center gap-2 font-bold hover:shadow-[0_0_15px_rgba(57,255,20,0.15)]"
                >
                  <Facebook className="w-4 h-4 shrink-0" />
                  Facebook Profile
                </a>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-mechanic-border/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-2xs text-gray-500 font-sans">
              <div className="flex items-center gap-1.5">
                <span className="flex h-2 w-2 rounded-full bg-neon-green" />
                <span>Thank you for supporting Mekanik AI. For the latest updates, please visit this website. If you experience any issues with the app or have any concerns, please contact the developer through this website.</span>
              </div>
              <div className="flex items-center gap-1">
                <span>Made with</span>
                <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
