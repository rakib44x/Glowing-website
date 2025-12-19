import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../theme.context';

const FeatureCard: React.FC<{ title: string; subtitle: string; description: string; index: number }> = ({ title, subtitle, description, index }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="group relative border-l-2 border-steel-ember pl-10 py-12 transition-all duration-500 hover:bg-gradient-to-r hover:from-steel-ember/10 hover:to-transparent"
        >
            {/* Active Border Indicator */}
            <div className="absolute left-[-2px] top-0 h-0 w-[2px] bg-neon-red group-hover:h-full transition-all duration-500 ease-in-out shadow-[0_0_15px_#FF0033]"></div>

            <div className="absolute -left-[11px] top-12 w-5 h-5 bg-black border-2 border-steel-ember group-hover:border-neon-red group-hover:bg-neon-red transition-all duration-300 rounded-full z-10 shadow-[0_0_10px_rgba(255,0,51,0.5)]"></div>
            
            <h3 className="font-tech text-sm text-uv-purple mb-3 uppercase tracking-[0.2em] group-hover:text-neon-red transition-colors">{subtitle}</h3>
            <h2 className="font-header text-5xl md:text-7xl text-white mb-8 group-hover:glow-text-red transition-all duration-300">{title}</h2>
            <p className="font-ritual text-2xl text-stone-400 leading-relaxed max-w-2xl group-hover:text-ash-grey transition-colors">{description}</p>
        </motion.div>
    );
};

const Features: React.FC = () => {
    const { pillarsSection } = useTheme();
    return (
        <section className="bg-pitch-black py-32 px-6 md:px-24 border-t border-steel-ember relative overflow-hidden">
             {/* Background Decoration */}
             <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-uv-purple/5 to-transparent pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                 <div className="mb-32">
                     <h2 className="font-header text-6xl md:text-9xl text-white mb-8 text-center md:text-left">{pillarsSection.heading} <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-red to-uv-purple animate-pulse">{pillarsSection.highlight}</span></h2>
                 </div>

                 <div className="grid grid-cols-1 gap-12">
                    {pillarsSection.cards.map((card, index) => (
                        <FeatureCard 
                            key={index}
                            index={index}
                            subtitle={card.subtitle}
                            title={card.title}
                            description={card.description}
                        />
                    ))}
                 </div>
            </div>
        </section>
    );
};

export default Features;
