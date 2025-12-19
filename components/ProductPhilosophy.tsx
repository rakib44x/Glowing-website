import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../theme.context';

const PhilosophyItem: React.FC<{ 
    title: string; 
    description: string; 
    index: number;
    isActive: boolean;
    onActivate: () => void;
}> = ({ title, description, index, isActive, onActivate }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onMouseEnter={onActivate}
            className={`group relative cursor-pointer py-8 border-b border-steel-ember/50 transition-all duration-500 ${isActive ? 'bg-steel-ember/10' : ''}`}
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between px-6">
                <div className="flex items-center space-x-4">
                     {/* Visual Trigger: Bullet point turns to spark on hover */}
                     <div className={`w-2 h-2 rounded-full transition-all duration-300 ${isActive ? 'bg-neon-red shadow-[0_0_10px_#FF0033] scale-150' : 'bg-stone-600'}`}></div>
                     
                     <h3 className={`font-header text-3xl md:text-5xl uppercase transition-colors duration-300 ${isActive ? 'text-white' : 'text-stone-500'}`}>
                        {title}
                     </h3>
                </div>

                {/* UX Trigger: Explanation precedes expression - revealed on active */}
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: isActive ? 1 : 0.4, x: isActive ? 0 : -10 }}
                    className="mt-2 md:mt-0 md:text-right"
                >
                    <p className={`font-ritual text-xl md:text-2xl transition-colors duration-300 ${isActive ? 'text-neon-red' : 'text-stone-700'}`}>
                        {description}
                    </p>
                </motion.div>
            </div>
            
            {/* Ambient Background Glow for Active State */}
            {isActive && (
                <motion.div 
                    layoutId="philosophyGlow"
                    className="absolute inset-0 bg-gradient-to-r from-neon-red/5 to-transparent pointer-events-none"
                    transition={{ duration: 0.3 }}
                />
            )}
        </motion.div>
    );
};

const ProductPhilosophy: React.FC = () => {
    const { productPhilosophy } = useTheme();
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    return (
        <section className="py-32 px-6 bg-black relative overflow-hidden">
            {/* Subtle UV Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(153,0,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(153,0,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(circle_at_center,black_60%,transparent_100%)] pointer-events-none"></div>

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="mb-20 text-center md:text-left">
                     <h2 className="font-tech text-neon-red tracking-[0.3em] text-sm mb-4 animate-pulse">
                         /// CORE PRINCIPLES ///
                     </h2>
                     <h2 className="font-header text-5xl md:text-7xl text-white uppercase">
                        {productPhilosophy.heading}
                     </h2>
                </div>

                <div className="flex flex-col">
                    {productPhilosophy.items.map((item, i) => (
                        <PhilosophyItem 
                            key={i}
                            index={i}
                            title={item.title}
                            description={item.description}
                            isActive={activeIndex === i}
                            onActivate={() => setActiveIndex(i)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductPhilosophy;
