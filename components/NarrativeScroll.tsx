import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useTheme } from '../theme.context';

const NarrativeBlock: React.FC<{ children: React.ReactNode; align?: 'left' | 'center' | 'right'; delay?: number }> = ({ children, align = 'center', delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-20% 0px -20% 0px", amount: 0.5 });
  
  const alignClass = align === 'left' ? 'text-left items-start' : align === 'right' ? 'text-right items-end' : 'text-center items-center';

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, filter: "blur(10px)", y: 50 }}
      animate={isInView ? { opacity: 1, filter: "blur(0px)", y: 0 } : { opacity: 0.1, filter: "blur(10px)", y: 50 }}
      transition={{ duration: 0.8, delay: delay }}
      className={`flex flex-col ${alignClass} py-16 md:py-32 max-w-5xl mx-auto px-6`}
    >
      {children}
    </motion.div>
  );
};

const NarrativeScroll: React.FC<{ id?: string }> = ({ id }) => {
  const { narrative } = useTheme();

  return (
    <section id={id} className="relative bg-pitch-black text-ash-grey min-h-screen pt-32 pb-48 z-10 scroll-mt-20">
      {/* Scroll Progress Line */}
      <div className="absolute top-0 left-6 md:left-1/2 w-px h-full bg-gradient-to-b from-transparent via-steel-ember to-transparent opacity-30 md:-translate-x-1/2"></div>

      <NarrativeBlock align="center">
        <p className="font-ritual text-3xl md:text-5xl leading-relaxed text-stone-300">
          {narrative.hero.line1}
        </p>
        <p className="font-header text-4xl md:text-6xl text-white mt-6 glow-text-purple">
          {narrative.hero.line2}
        </p>
      </NarrativeBlock>

      <NarrativeBlock align="left">
        <div className="border-l-4 border-neon-red pl-8 py-2 bg-gradient-to-r from-neon-red/5 to-transparent">
            <p className="font-ritual text-2xl md:text-3xl italic text-white whitespace-pre-line">
              {narrative.quote1}
            </p>
        </div>
      </NarrativeBlock>

      <NarrativeBlock align="right">
        <p className="font-mythic text-3xl md:text-4xl text-white">
          {narrative.dualText.left}
        </p>
        <p className="font-mythic text-3xl md:text-4xl text-neon-red mt-2 drop-shadow-[0_0_10px_rgba(255,0,51,0.5)]">
          {narrative.dualText.right}
        </p>
      </NarrativeBlock>

      <NarrativeBlock align="center">
        <h2 className="font-header text-5xl md:text-8xl mb-8 text-white tracking-wide uppercase whitespace-pre-line">
          {narrative.bigHeading}
        </h2>
        <p className="font-ritual text-xl md:text-3xl max-w-3xl text-stone-400 leading-relaxed">
          {narrative.description}
        </p>
      </NarrativeBlock>

      <div className="my-24 border-y border-steel-ember py-32 relative overflow-hidden group">
        <div className="absolute inset-0 bg-uv-purple opacity-5 group-hover:opacity-10 transition-opacity duration-1000"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <NarrativeBlock>
          <p className="font-header text-4xl md:text-6xl text-center relative z-10">
            {narrative.banner.line1}
            <br />
            <span className="text-neon-red glow-text-red">{narrative.banner.line2}</span>
          </p>
        </NarrativeBlock>
      </div>

      <NarrativeBlock align="center">
        <p className="font-ritual text-3xl md:text-5xl mb-4">{narrative.gateway.line1}</p>
        <p className="font-ritual text-3xl md:text-5xl mb-16 text-white">{narrative.gateway.line2}</p>
        <p className="font-tech text-sm tracking-[0.5em] text-neon-red uppercase animate-pulse">
          {narrative.gateway.sub}
        </p>
      </NarrativeBlock>

       <NarrativeBlock align="center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left border border-steel-ember p-10 md:p-16 relative group hover:border-neon-red hover:shadow-[0_0_30px_rgba(255,0,51,0.1)] transition-all duration-700 bg-black">
             <div className="space-y-6 font-ritual text-2xl text-stone-400">
                {narrative.gridBox.lines.map((line, i) => (
                   <p key={i} className={`group-hover:text-white transition-colors delay-${(i+1)*100}`}>{line}</p>
                ))}
             </div>
             <div className="flex items-center justify-center md:justify-start">
                <p className="font-header text-4xl md:text-6xl text-white">
                   {narrative.gridBox.punchline.white}<br/>
                   <span className="text-uv-purple glow-text-purple">{narrative.gridBox.punchline.colored}</span>
                </p>
             </div>
          </div>
       </NarrativeBlock>
    </section>
  );
};

export default NarrativeScroll;
