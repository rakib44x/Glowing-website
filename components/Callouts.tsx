import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../theme.context';

const Callouts: React.FC = () => {
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const { quotes } = useTheme();

    return (
        <section className="py-24 px-6 bg-black border-y border-steel-ember">
            <div className="max-w-4xl mx-auto flex flex-col items-start space-y-8">
                {quotes.map((quote) => (
                    <motion.div
                        key={quote.id}
                        onMouseEnter={() => setHoveredId(quote.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        className="relative cursor-pointer group w-full"
                    >
                        <h3 className={`font-header text-2xl md:text-5xl transition-colors duration-300 ${hoveredId === quote.id ? 'text-neon-red glow-text-red' : 'text-stone-700'}`}>
                            “{quote.text}”
                        </h3>
                        {/* Underline animation */}
                        <div className={`h-0.5 bg-neon-red mt-2 transition-all duration-300 ease-out ${hoveredId === quote.id ? 'w-full shadow-[0_0_10px_#FF0033]' : 'w-0'}`}></div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Callouts;
