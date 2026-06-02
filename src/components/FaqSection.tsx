import { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { faqData } from "../data";
import { motion, AnimatePresence } from "motion/react";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(1); // default open first item

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-24 bg-transparent font-sans">
      {/* Blueprint Grid backdrop overlay */}
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-neon-green bg-neon-green/5 px-3 py-1 rounded-full border border-neon-green/10">
            KNOWLEDGE BASE
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight mt-4">
            Frequently Asked Questions
          </h2>
          <p className="font-sans text-sm text-gray-400 mt-4 leading-relaxed font-normal">
            Need further clarifications on model sizes, custom APK distributions, or mechanical reliability? We've indexed direct technical explanations.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`border backdrop-blur-md rounded-xl transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-mechanic-card border-neon-green/50 shadow-[0_0_15px_rgba(57,255,20,0.05)]"
                    : "bg-mechanic-card/30 hover:bg-mechanic-card/60 border-mechanic-border hover:border-neon-green/20"
                }`}
              >
                {/* Accordion Trigger Header */}
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left px-5 py-5 sm:px-6 flex items-center justify-between gap-4 font-display font-extrabold text-sm text-white focus:outline-none transition-colors duration-200"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className={`w-4 h-4 shrink-0 transition-colors ${
                      isOpen ? "text-neon-green text-shadow-glow" : "text-gray-500"
                    }`} />
                    <span className="leading-tight select-none">{faq.question}</span>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-neon-green shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                  )}
                </button>

                {/* Animated content expansion */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-xs sm:text-sm text-gray-300 font-sans leading-relaxed border-t border-mechanic-border/50 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
