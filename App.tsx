import React, { useState, useEffect } from 'react';
import Intro from './components/Intro';
import NarrativeScroll from './components/NarrativeScroll';
import InterfaceShowcase from './components/InterfaceShowcase';
import Features from './components/Features';
import Callouts from './components/Callouts';
import ProductPhilosophy from './components/ProductPhilosophy';
import Footer from './components/Footer';
import SparkParticles from './components/SparkParticles';
import SmokeEffect from './components/SmokeEffect';
import Logo from './components/Logo';
import GetAccessModal from './components/GetAccessModal';
import { motion } from 'framer-motion';
import { useTheme } from './theme.context';

function App() {
  const [introComplete, setIntroComplete] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    if (introComplete) {
      document.body.classList.remove('intro-active');
      setTimeout(() => setShowNav(true), 1000);
    } else {
      document.body.classList.add('intro-active');
    }
  }, [introComplete]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-pitch-black text-white selection:bg-neon-red selection:text-black">
      {!introComplete ? (
        <Intro onComplete={() => setIntroComplete(true)} />
      ) : (
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1.5 }}
           className="relative"
        >
          {/* Persistent Global Atmospherics */}
          <SmokeEffect intensity="light" />
          <SparkParticles intensity="low" className="opacity-40" />

          {/* Navigation */}
          <motion.nav 
            initial={{ y: -100 }}
            animate={{ y: showNav ? 0 : -100 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="fixed top-0 left-0 w-full z-40 px-8 py-6 flex justify-between items-center backdrop-blur-sm bg-black/20 border-b border-white/5"
          >
             <div 
                className="w-10 h-10 text-white hover:text-neon-red transition-colors duration-300 cursor-pointer"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
             >
                 <Logo variant="clean" />
             </div>
             <div className="flex items-center space-x-8 text-xs md:text-sm font-tech tracking-[0.2em] text-ash-grey">
                 <button 
                    onClick={() => scrollToSection('philosophy-section')}
                    className="relative group hover:text-white transition-colors uppercase"
                 >
                    {theme.nav.left}
                    <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-neon-red group-hover:w-full transition-all duration-300 shadow-[0_0_10px_#FF0033]"></span>
                 </button>
                 <button 
                    onClick={() => scrollToSection('interface-section')}
                    className="relative group hover:text-white transition-colors uppercase"
                 >
                    {theme.nav.right}
                    <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-neon-red group-hover:w-full transition-all duration-300 shadow-[0_0_10px_#FF0033]"></span>
                 </button>
                 <button 
                    onClick={() => setIsModalOpen(true)}
                    className="relative px-6 py-2 border border-stone-600 hover:border-neon-red hover:text-neon-red hover:shadow-[0_0_15px_rgba(255,0,51,0.3)] transition-all duration-300 uppercase bg-black/50 overflow-hidden group"
                 >
                    <span className="relative z-10">{theme.nav.cta}</span>
                    <div className="absolute inset-0 bg-neon-red/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                 </button>
             </div>
          </motion.nav>

          <main className="relative z-10">
             <NarrativeScroll id="philosophy-section" />
             <InterfaceShowcase id="interface-section" />
             <Features />
             <Callouts />
             <ProductPhilosophy />
          </main>
          
          <Footer />

          {/* Modal Portal */}
          <GetAccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </motion.div>
      )}
    </div>
  );
}

export default App;
