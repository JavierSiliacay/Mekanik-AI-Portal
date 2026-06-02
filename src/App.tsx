/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import ProductShowcase from "./components/ProductShowcase";
import Comparison from "./components/Comparison";
import ApkDownload from "./components/ApkDownload";
import DeveloperSection from "./components/DeveloperSection";
import FaqSection from "./components/FaqSection";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="bg-[#050505] text-white min-h-screen selection:bg-neon-green selection:text-black relative overflow-hidden">
      {/* Immersive Glow Orbs for Frosted Glass Backdrop */}
      <div className="glow-orb orb-1" />
      <div className="glow-orb orb-2" />
      <div className="glow-orb orb-3" />
      <div className="glow-orb orb-4" />
      <div className="glow-orb orb-5" />

      {/* Top Fixed Navigation */}
      <Header />

      <main className="relative z-10">
        {/* Hero Section with Interactive Live Terminal Mock */}
        <Hero />

        {/* Dense Technical Features Bento Grid */}
        <Features />

        {/* Visual Interface Simulator & Functional Tab Panels */}
        <ProductShowcase />

        {/* Specifications Matrix contrasting generic AI vs Mekanik AI */}
        <Comparison />

        {/* APK Sideload Center & Android Installation Roadmap Timeline */}
        <ApkDownload />

        {/* Professional developer credentials for Javier Siliacay */}
        <DeveloperSection />

        {/* Interactive FAQ Accordeon Panel */}
        <FaqSection />
      </main>

      {/* Corporate Styled Bottom Navigation & Links */}
      <Footer />
    </div>
  );
}

