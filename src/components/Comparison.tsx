import { Check, X, ShieldAlert, Award, Grid3X3, HelpCircle } from "lucide-react";
import { comparisonData } from "../data";

export default function Comparison() {
  return (
    <section id="comparison" className="relative py-24 bg-transparent">
      <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-neon-green bg-neon-green/5 px-3 py-1 rounded-full border border-neon-green/10">
            COMPETITIVE MATRIX
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight mt-4">
            How Mekanik AI Compares to General AI
          </h2>
          <p className="font-sans text-sm text-gray-400 mt-4 leading-relaxed">
            Most modern AI models are optimized to handle generic schoolwork essays or write commercial copywriting material. Mekanik AI focuses strictly on mechanical fault tables.
          </p>
        </div>

        {/* Matrix Card */}
        <div className="bg-mechanic-card backdrop-blur-md rounded-2xl border border-mechanic-border overflow-hidden">
          {/* Header block for desktop */}
          <div className="hidden lg:grid grid-cols-12 gap-4 bg-black/40 backdrop-blur-sm p-6 border-b border-mechanic-border text-xs font-mono font-bold tracking-widest text-gray-400 uppercase">
            <div className="col-span-4 flex items-center gap-1.5">
              <Grid3X3 className="w-4 h-4 text-neon-green" />
              <span>DIAGNOSTIC CAPABILITY</span>
            </div>
            <div className="col-span-4 text-neon-green text-shadow-glow pl-4">
              ● MEKANIK AI STACK (Android APP)
            </div>
            <div className="col-span-4 text-gray-500 pl-4">
              ✕ GENERIC ASSISTANTS (ChatGpt, Claude, etc.)
            </div>
          </div>

          <div className="divide-y divide-mechanic-border/70">
            {comparisonData.map((row, index) => (
              <div 
                key={index}
                className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-6 sm:p-8 hover:bg-white/[0.03] transition-all duration-200"
              >
                {/* Mobile Feature Header */}
                <div className="col-span-1 lg:col-span-4 flex flex-col justify-center">
                  <h4 className="font-display font-extrabold text-blue-50 lg:text-white text-sm tracking-wide">
                    {row.feature}
                  </h4>
                </div>

                {/* MEKANIK AI Info Block */}
                <div className="col-span-1 lg:col-span-4 bg-neon-green/5 lg:bg-transparent p-4 lg:p-0 rounded-lg lg:rounded-none border border-neon-green/10 lg:border-none space-y-1.5 lg:pl-4">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-neon-green lg:hidden flex items-center gap-1 mb-1.5">
                    <Check className="w-3.5 h-3.5 fill-neon-green text-black rounded" />
                    Mekanik AI Spec:
                  </span>
                  <div className="flex items-start gap-2.5 text-xs">
                    <span className="hidden lg:flex bg-neon-green/15 text-neon-green p-0.5 rounded shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    <p className="text-gray-200 font-sans leading-relaxed text-[11px] sm:text-xs">
                      {row.mekanik.text}
                    </p>
                  </div>
                </div>

                {/* GENERIC AI Info Block */}
                <div className="col-span-1 lg:col-span-4 bg-black/20 lg:bg-transparent p-4 lg:p-0 rounded-lg lg:rounded-none border border-mechanic-border lg:border-none space-y-1.5 lg:pl-4">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-gray-500 lg:hidden flex items-center gap-1 mb-1.5">
                    <X className="w-3.5 h-3.5 text-red-500" />
                    Generic AI Spec:
                  </span>
                  <div className="flex items-start gap-2.5 text-xs">
                    <span className="hidden lg:flex bg-red-950/15 text-red-500 p-0.5 rounded shrink-0 mt-0.5 border border-red-950">
                      <X className="w-3.5 h-3.5" />
                    </span>
                    <p className="text-gray-500 font-sans leading-relaxed text-[11px] sm:text-xs">
                      {row.generic.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Closing trust stamp */}
        <div className="mt-8 text-center bg-mechanic-card backdrop-blur-md rounded-xl p-5 border border-mechanic-border max-w-4xl mx-auto flex items-center justify-center gap-2.5">
          <Award className="w-5 h-5 text-neon-green shrink-0 animate-pulse" />
          <p className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-neon-green">
            Tailored, Production Ready, and Highly Optimized Automotive Fault Inference Engine.
          </p>
        </div>
      </div>
    </section>
  );
}
