import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IntroState } from '../types';
import SparkParticles from './SparkParticles';
import Logo from './Logo';
import SmokeEffect from './SmokeEffect';
import { useTheme } from '../theme.context';

interface IntroProps {
  onComplete: () => void;
}

const Intro: React.FC<IntroProps> = ({ onComplete }) => {
  const [state, setState] = useState<IntroState>(IntroState.INIT);
  const theme = useTheme();

  useEffect(() => {
    // Sequence Logic aligned exactly with client brief
    let timer1: ReturnType<typeof setTimeout>;
    let timer2: ReturnType<typeof setTimeout>;
    let timer3: ReturnType<typeof setTimeout>;
    let timer4: ReturnType<typeof setTimeout>;

    // Frame 1 Start: "After a ~2 second pause, center-screen text fades in softly"
    timer1 = setTimeout(() => {
      setState(IntroState.SPARK_TEXT);
    }, 2000);

    // Frame 2 Start: "Text fades out... MOTIFLUX... styled like a title card"
    timer2 = setTimeout(() => {
      setState(IntroState.LOGO_RISE);
    }, 6000); 

    // Frame 3: "Below logo... two lines appear"
    timer3 = setTimeout(() => {
      setState(IntroState.MANTRA);
    }, 10000); 

    // Frame 4: Scroll Reveal
    timer4 = setTimeout(() => {
      setState(IntroState.COMPLETE);
      onComplete();
    }, 16000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  // Skip button handler
  const handleSkip = () => {
    setState(IntroState.COMPLETE);
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center overflow-hidden">
      <SmokeEffect intensity="heavy" />
      <SparkParticles intensity={state === IntroState.LOGO_RISE || state === IntroState.MANTRA ? 'high' : 'low'} />
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_10%,_#000000_120%)] z-10 pointer-events-none"></div>

      <AnimatePresence mode="wait">
        {state === IntroState.SPARK_TEXT && (
          <motion.div
            key="spark-text"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(5px)" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="z-20 text-center px-4"
          >
            <h1 className="text-white font-ritual text-3xl md:text-5xl tracking-[0.2em] italic text-ash-grey">
              {theme.intro.sparkText}
            </h1>
          </motion.div>
        )}

        {(state === IntroState.LOGO_RISE || state === IntroState.MANTRA) && (
          <motion.div
            key="logo-container"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="z-20 flex flex-col items-center px-4"
          >
            <div className="relative w-32 h-32 md:w-64 md:h-64 mb-10">
              <div className="absolute inset-0 bg-neon-red blur-[80px] opacity-40 animate-pulse-slow"></div>
              <Logo className="w-full h-full text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" variant="fractured" />
            </div>
            
            <motion.h1 
               initial={{ opacity: 0, y: 30, letterSpacing: '0em' }}
               animate={{ opacity: 1, y: 0, letterSpacing: '0.1em' }}
               transition={{ delay: 0.5, duration: 1.5 }}
               className="font-header text-6xl md:text-9xl text-white glow-text-red mb-12 mix-blend-screen"
            >
              {theme.brand.name}
            </motion.h1>

            {state === IntroState.MANTRA && (
                <div className="flex flex-col items-center space-y-6">
                    {/* First Line: Fades in gently like smoke */}
                    <motion.p
                        initial={{ opacity: 0, x: -20, filter: "blur(5px)" }}
                        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="font-ritual text-xl md:text-3xl text-ash-grey tracking-[0.2em]"
                    >
                        {theme.intro.mantra1}
                    </motion.p>

                    {/* Second Line: Heat Distortion / Embers / Ignition */}
                    <motion.div
                        initial={{ opacity: 0, scale: 1.1, filter: 'blur(4px) brightness(0.5)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px) brightness(1.2)' }}
                        transition={{ delay: 1.2, duration: 0.2, type: 'tween' }} // Snappy ignition
                        className="relative"
                    >
                        <p className="font-header text-4xl md:text-6xl text-neon-red tracking-wider uppercase z-10 relative drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]">
                           {theme.intro.mantra2}
                        </p>
                        {/* Heat Haze Effect underneath */}
                        <div className="absolute inset-0 bg-neon-red blur-xl opacity-40 animate-pulse mix-blend-hard-light"></div>
                    </motion.div>
                </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        whileHover={{ opacity: 1, scale: 1.05 }}
        onClick={handleSkip}
        className="absolute bottom-12 text-xs font-tech text-ash-grey border border-ash-grey/30 px-4 py-2 hover:border-neon-red hover:text-neon-red hover:shadow-[0_0_10px_rgba(255,0,51,0.5)] transition-all z-50 uppercase tracking-widest"
      >
        {theme.intro.skipButton}
      </motion.button>
    </div>
  );
};

export default Intro;
