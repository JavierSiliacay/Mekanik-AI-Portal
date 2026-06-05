import { Github, Facebook, Shield, Scale, ExternalLink } from "lucide-react";
import MekanikLogo from "./MekanikLogo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-black/60 backdrop-blur-md border-t border-mechanic-border py-12 relative z-10 font-sans">
      {/* Blueprint Grid lines */}
      <div className="absolute inset-0 grid-bg opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-mechanic-border/70">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={handleScrollToTop}>
              <img src="/logo.png" alt="Mekanik AI Logo" className="w-8 h-8 rounded-full object-cover" />
              <span className="font-display font-black text-base text-white tracking-wider">
                MEKANIK <span className="text-neon-green">AI</span>
              </span>
            </div>
            
            <p className="font-sans text-xs text-gray-400 leading-relaxed max-w-sm">
              Symmetric offline-capable automotive diagnostic companion for Android devices. Engineered to process complex OBD trouble codes, dashboard alerts, and fault telemetry privately on-device.
            </p>

            <div className="flex items-center gap-3 pt-2 font-mono text-[10px] text-gray-500">
              <span className="flex h-1.5 w-1.5 rounded-full bg-neon-green" />
              <span>LICENSED UNDER APACHE-2.0 SYSTEM</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3 space-y-3 font-sans">
            <h5 className="font-mono text-[9px] text-gray-400 uppercase tracking-widest font-bold">
              PLATFORM SATELLITES
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://github.com/JavierSiliacay/mekanik-ai/releases"
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="text-gray-400 hover:text-neon-green transition-colors flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3 h-3 text-neon-green" />
                  APK Releases (GitHub)
                </a>
              </li>

              <li>
                <a
                  href="https://www.facebook.com/siliacayjavier"
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="text-gray-400 hover:text-neon-green transition-colors flex items-center gap-1.5"
                >
                  <Facebook className="w-3 h-3 text-neon-green" />
                  Contact Developer
                </a>
              </li>
            </ul>
          </div>

          {/* Legal references */}
          <div className="md:col-span-4 space-y-3 font-sans">
            <h5 className="font-mono text-[9px] text-gray-400 uppercase tracking-widest font-bold">
              REPAIR FREEDOM & PRIVACY
            </h5>
            <p className="text-[11px] text-gray-500 leading-relaxed">
              Mekanik AI respects your diagnostics boundaries. Sideloading direct binaries helps secure private vehicle history from continuous cloud tracking and cloud paywalls.
            </p>
            <div className="flex gap-4 text-[10px] text-gray-400 font-mono">
              <span className="cursor-not-allowed hover:text-neon-green transition-colors flex items-center gap-1">
                <Shield className="w-3 h-3" /> Privacy Policy
              </span>
              <span className="cursor-not-allowed hover:text-neon-green transition-colors flex items-center gap-1">
                <Scale className="w-3 h-3" /> Terms of Service
              </span>
            </div>
          </div>
        </div>

        {/* Footer Base */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono text-gray-500">
          <div>
            © {currentYear} Mekanik AI. All diagnostic procedures, code translations, and tools are provided under Apache-2.0 licenses.
          </div>
          <div>
            Designed and Developed by <span className="text-white">Javier Siliacay</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
