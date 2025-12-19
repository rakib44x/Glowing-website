import React from 'react';
import { motion } from 'framer-motion';

const SmokeEffect: React.FC<{ intensity?: 'light' | 'heavy' }> = ({ intensity = 'light' }) => {
  const opacity = intensity === 'heavy' ? 0.4 : 0.15;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Layer 1: Slow Drifting Fog */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: opacity }}
        transition={{ duration: 2 }}
        className="absolute inset-0 w-[200%] h-[200%]"
        style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(50,50,50,0.4), transparent 60%)',
            filter: 'url(#fractal-noise) blur(30px)',
            top: '-50%',
            left: '-50%'
        }}
      >
        <div className="w-full h-full animate-fog-flow bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </motion.div>

      {/* Layer 2: localized smoke patches */}
      <div className="absolute top-0 left-0 w-full h-full mix-blend-screen opacity-30">
         <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-uv-purple/20 blur-[120px] rounded-full animate-pulse-slow"></div>
         <div className="absolute bottom-[20%] right-[20%] w-[600px] h-[600px] bg-neon-red/10 blur-[150px] rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  );
};

export default SmokeEffect;
