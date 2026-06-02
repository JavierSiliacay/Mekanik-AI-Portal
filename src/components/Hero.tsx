import { ArrowRight, Download, Eye, Terminal, Sparkles, Shield, Cpu, Gauge } from "lucide-react";
import { motion } from "motion/react";
import InteractiveWidget from "./InteractiveWidget";

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative bg-transparent flex flex-col pt-52 sm:pt-60 lg:pt-72 xl:pt-80 pb-16 overflow-hidden">
      {/* Immersive Background Canvas Effects */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      
      {/* Absolute Neon Glow Nodes */}
      <div className="absolute top-1/4 right-[10%] w-[35rem] h-[35rem] rounded-full bg-neon-green/[0.03] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-[5%] w-[30rem] h-[30rem] rounded-full bg-neon-green/[0.02] blur-[130px] pointer-events-none" />

      {/* Decorative vertical scanline matrix */}
      <div className="absolute inset-x-0 top-0 h-full w-full pointer-events-none overflow-hidden">
        <div className="w-full h-[2px] bg-red-500/0 bg-gradient-to-r from-transparent via-neon-green/10 to-transparent anim-scanline absolute top-0" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">


        {/* Hero Grid Wrapper */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 xl:gap-8 items-center">
          
          {/* Left Text Copy */}
          <div className="xl:col-span-5 space-y-6 text-left">
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-5xl text-white tracking-tight leading-[1.05]">
              Diagnose Smarter <br className="hidden sm:inline" />
              with <span className="text-neon-green text-shadow-glow">Mekanik AI</span>
            </h1>

            <p className="font-sans text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl">
              Your AI-powered automotive diagnostic assistant designed to help vehicle owners and mechanics diagnose problems, analyze automotive images, understand fault symptoms, and make informed maintenance decisions.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => scrollToSection("download")}
                className="px-6 py-3.5 bg-neon-green text-black font-mono text-xs font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 hover:bg-neon-green/90 transition-all duration-300 neon-glow-btn"
                id="hero-primary-download"
              >
                <Download className="w-4 h-4 shrink-0" />
                Download APK
              </button>
              
              <button
                onClick={() => scrollToSection("features")}
                className="px-6 py-3.5 bg-mechanic-card border border-mechanic-border backdrop-blur-md text-gray-300 font-mono text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 hover:bg-mechanic-gray hover:text-white hover:border-neon-green/50 transition-all duration-300"
                id="hero-secondary-features"
              >
                <Eye className="w-4 h-4 shrink-0" />
                Explore Features
              </button>
            </div>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-mechanic-border/50 max-w-md">
              <div className="space-y-1">
                <span className="font-mono text-[9px] text-gray-500 uppercase block">Inference Freedom</span>
                <p className="text-xs text-white font-sans font-medium flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-neon-green" /> 100% Offline Capable
                </p>
               </div>
              
              <div className="space-y-1">
                <span className="font-mono text-[9px] text-gray-500 uppercase block">Diagnostics Focus</span>
                <p className="text-xs text-white font-sans font-medium flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-neon-green" /> Multi-Model Android Core
                </p>
              </div>
            </div>
          </div>

          {/* Right Live Interactive Simulator Panel */}
          <div className="xl:col-span-7">
            {/* Embed full simulator inside hero to allow direct testing on page landing */}
            <div className="relative">
              <div className="absolute -inset-1 rounded-xl bg-neon-green/5 blur opacity-30" />
              <div className="relative border border-mechanic-border/70 bg-mechanic-card backdrop-blur-xl rounded-xl p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-mechanic-border/50 text-xs font-mono">
                  <span className="text-neon-green tracking-wider font-bold">● LIVE INTERACTIVE LAB</span>
                  <span className="text-gray-500">EXPERIENCE THE ANDROID SERVICE</span>
                </div>
                
                <InteractiveWidget />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
