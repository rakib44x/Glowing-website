import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '../theme.context';

const InterfaceShowcase: React.FC<{ id?: string }> = ({ id }) => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });
    
    const { interface: content } = useTheme();

    const rotateX = useTransform(scrollYProgress, [0, 1], [15, -15]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);

    return (
        <section id={id} ref={containerRef} className="py-32 bg-black relative overflow-hidden perspective-1000 scroll-mt-20">
             {/* Glowing lines background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(153,0,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(153,0,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(circle_at_center,black_40%,transparent_100%)]"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-24">
                    <h2 className="font-header text-5xl md:text-7xl text-white mb-6">{content.heading}</h2>
                    <p className="font-ritual text-2xl text-stone-400">{content.subheading}</p>
                </div>

                {/* Simulated Interface Container with 3D Transform */}
                <motion.div 
                    style={{ rotateX, scale }}
                    className="relative w-full aspect-video md:aspect-[21/9] bg-stone-900/80 border border-steel-ember rounded-lg overflow-hidden backdrop-blur-md group shadow-[0_0_100px_rgba(153,0,255,0.1)] hover:shadow-[0_0_100px_rgba(255,0,51,0.2)] transition-shadow duration-1000"
                >
                    {/* Placeholder content representing the "Magma/Spark" interface */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-full relative">
                            {/* Central Dial/Orb */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-neon-red/30 shadow-[0_0_80px_rgba(255,0,51,0.3)] flex items-center justify-center animate-pulse-slow">
                                <div className="w-48 h-48 rounded-full bg-black border border-stone-800 flex items-center justify-center relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-neon-red/20 to-uv-purple/20"></div>
                                    <div className="w-2 h-2 bg-neon-red rounded-full animate-pulse shadow-[0_0_20px_#FF0033]"></div>
                                </div>
                            </div>
                            
                            {/* Grid Lines radiating */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(153,0,255,0.05)_70%)]"></div>

                            {/* Floating nodes */}
                            <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-uv-purple rounded-full blur-[4px] animate-flicker"></div>
                            <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-neon-red rounded-full blur-[2px] animate-pulse"></div>

                            {/* HUD Elements */}
                            <div className="absolute bottom-8 left-8 font-tech text-xs text-neon-red tracking-widest opacity-80 border-l-2 border-neon-red pl-2 whitespace-pre-line">
                                {content.hud.status}<br/>
                                {content.hud.flux}
                            </div>
                            <div className="absolute top-8 right-8 font-tech text-xs text-uv-purple tracking-widest opacity-80 text-right border-r-2 border-uv-purple pr-2 whitespace-pre-line">
                                {content.hud.resonance}<br/>
                                {content.hud.key}
                            </div>
                        </div>
                    </div>
                    
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-sm cursor-none">
                        <p className="font-header text-6xl text-white glow-text-red tracking-wider scale-110">{content.hoverText}</p>
                    </div>
                </motion.div>

                <div className="flex flex-wrap justify-center gap-12 mt-20">
                    {content.features.map((feat, i) => (
                        <React.Fragment key={i}>
                            <div className="text-center group cursor-default">
                                <h4 className="font-header text-2xl text-white mb-2 group-hover:text-neon-red transition-colors">{feat.title}</h4>
                                <p className="font-ritual text-stone-500 text-lg">{feat.sub}</p>
                            </div>
                            {i < content.features.length - 1 && (
                                <div className="w-px h-16 bg-steel-ember hidden md:block"></div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default InterfaceShowcase;
