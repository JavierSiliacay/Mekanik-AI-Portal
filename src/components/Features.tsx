import { useState } from "react";
import { Cpu, Wrench, Camera, Zap, Gauge, DownloadCloud, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { featuresData } from "../data";
import { FeatureItem } from "../types";

const iconMap: Record<string, any> = {
  Cpu,
  Wrench,
  Camera,
  Zap,
  Gauge,
  DownloadCloud
};

export default function Features() {
  const [expandedId, setExpandedId] = useState<string | null>("hybrid-ai");

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="features" className="relative py-24 bg-transparent font-sans">
      {/* Visual background details */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-neon-green/[0.01] blur-3xl pointer-events-none" />
      <div className="absolute bottom-12 left-12 w-80 h-80 rounded-full bg-neon-green/[0.01] blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-neon-green bg-neon-green/5 px-3 py-1 rounded-full border border-neon-green/10">
            ENGINE CAPABILITIES
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight mt-4">
            Automotive Diagnostics Meets <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-white">
              Symmetric Local Intelligence
            </span>
          </h2>
          <p className="font-sans text-sm text-gray-400 mt-4 leading-relaxed">
            Mekanik AI rejects generic template definitions. It is a highly optimized engineering tool created to solve complex vehicle troubles anywhere — from a fully connected garage to remote forest roads without Wi-Fi.
          </p>
        </div>

        {/* Features Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuresData.map((feat: FeatureItem, index: number) => {
            const IconComponent = iconMap[feat.icon] || Wrench;
            const isExpanded = expandedId === feat.id;

            return (
              <motion.div
                key={feat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative bg-mechanic-card backdrop-blur-md rounded-xl border p-6 transition-all duration-300 flex flex-col justify-between ${
                  isExpanded 
                    ? "border-neon-green/60 shadow-[0_0_20px_rgba(57,255,20,0.08)] bg-white/[0.08]" 
                    : "border-mechanic-border hover:border-neon-green/30 hover:shadow-[0_0_15px_rgba(57,255,20,0.03)]"
                }`}
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center justify-center w-11 h-11 bg-black border border-mechanic-border text-neon-green rounded-lg group-hover:border-neon-green/30">
                      <IconComponent className="w-5.5 h-5.5 text-neon-green" />
                    </div>
                    {feat.badge && (
                      <span className="font-mono text-[9px] uppercase tracking-wider text-neon-green bg-neon-green/5 border border-neon-green/20 px-2.5 py-0.5 rounded">
                        {feat.badge}
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-display font-extrabold text-white text-base tracking-wide mb-2">
                    {feat.title}
                  </h3>
                  <p className="font-sans text-xs text-gray-400 leading-relaxed mb-4 min-h-[40px]">
                    {feat.description}
                  </p>
                  
                  {/* Expanding Details Panel */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3 border-t border-mechanic-border/70 space-y-2 mt-2">
                          <span className="font-mono text-[9px] tracking-wider text-gray-500 block uppercase">
                            Technical Blueprints:
                          </span>
                          {feat.details.map((detail, dIdx) => (
                            <div key={dIdx} className="flex items-start gap-2 text-[11px] text-gray-300 font-sans leading-relaxed">
                              <CheckCircle2 className="w-3.5 h-3.5 text-neon-green shrink-0 mt-0.5" />
                              <span>{detail}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Expansion Trigger Button */}
                <button
                  onClick={() => toggleExpand(feat.id)}
                  className="w-full mt-6 flex items-center justify-center gap-1.5 py-2 hover:bg-mechanic-gray/40 border border-transparent hover:border-mechanic-border rounded-lg text-[10px] font-mono uppercase tracking-wider text-gray-400 hover:text-neon-green transition-all"
                >
                  {isExpanded ? (
                    <>
                      <span>Hide Specifications</span>
                      <ChevronUp className="w-3 h-3 text-neon-green" />
                    </>
                  ) : (
                    <>
                      <span>View Specifications</span>
                      <ChevronDown className="w-3 h-3 text-gray-500" />
                    </>
                  )}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
