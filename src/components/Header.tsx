import { useState, useEffect } from "react";
import { Github, Download, Menu, X, Cpu } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled || mobileMenuOpen
          ? "bg-mechanic-dark/95 backdrop-blur-md border-neon-green/20 py-3 shadow-[0_10px_30px_-15px_rgba(57,255,20,0.1)]"
          : "bg-transparent border-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="relative">
              <div className="absolute -inset-1.5 rounded-full bg-neon-green/25 blur-sm group-hover:bg-neon-green/45 transition duration-300" />
              <img src="/logo.png" alt="Mekanik AI Logo" className="w-14 h-14 relative z-10 transform group-hover:scale-105 transition-transform duration-300 rounded-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg leading-none text-white tracking-wider">
                MEKANIK <span className="text-neon-green text-shadow-glow">AI</span>
              </span>
              <span className="font-mono text-[9px] text-gray-500 tracking-widest mt-0.5">
                DIAGNOSTIC ENGINE
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 font-sans">
            {["features", "showcase", "comparison", "download", "developer", "faq"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-xs text-gray-400 font-mono tracking-wider uppercase hover:text-white transition-colors duration-200 relative group py-1"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-neon-green transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Header Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button
              id="header-cta-download"
              onClick={() => scrollToSection("download")}
              className="px-4 py-2 bg-black border border-neon-green text-neon-green font-mono text-xs uppercase tracking-widest rounded-md hover:bg-neon-green hover:text-black transition-all duration-300 neon-glow-btn flex items-center gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              APK Release
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center gap-2">

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border border-mechanic-border rounded-md text-gray-400 hover:text-white hover:border-neon-green transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-mechanic-dark/95 backdrop-blur-md border-b border-neon-green/10 ${
          mobileMenuOpen ? "max-h-[500px] opacity-100 py-3" : "max-h-0 opacity-0 py-0 pointer-events-none"
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-3">
          {["features", "showcase", "comparison", "download", "developer", "faq"].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className="block w-full text-left py-2 px-3 text-sm font-mono tracking-wider text-gray-400 hover:text-neon-green rounded hover:bg-mechanic-gray/40 transition-all uppercase"
            >
              {item}
            </button>
          ))}
          <div className="pt-4 border-t border-mechanic-border/50 flex flex-col gap-3 px-3">
            <button
              onClick={() => scrollToSection("download")}
              className="w-full py-2.5 bg-neon-green text-black font-mono text-xs font-bold text-center uppercase tracking-widest rounded flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(57,255,20,0.3)] hover:scale-[1.02] transition-transform"
            >
              <Download className="w-4 h-4" />
              Download Mekanik AI
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
