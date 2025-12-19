import React from 'react';
import Logo from './Logo';
import { useTheme } from '../theme.context';

const Footer: React.FC = () => {
  const { footer } = useTheme();
  return (
    <footer className="bg-black py-24 px-6 border-t border-steel-ember relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-64 bg-neon-red/10 blur-[100px] pointer-events-none"></div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        
        {/* Brand Tagline (Replaces the 'Final Note' list) */}
        <div className="font-ritual text-xl md:text-2xl text-stone-400 mb-16 tracking-widest uppercase">
            {footer.tagline}
        </div>

        {/* The Mantra */}
        <div className="mb-12">
            <p className="font-header text-4xl md:text-6xl text-neon-red glow-text-red mb-2">{footer.bigText.line1}</p>
            <p className="font-header text-4xl md:text-6xl text-white border-b-2 border-white inline-block pb-1">{footer.bigText.line2}</p>
        </div>

        <div className="w-16 h-16 mx-auto text-white opacity-50 hover:opacity-100 transition-opacity duration-300">
            <Logo variant="clean" className="w-full h-full" />
        </div>

        <div className="mt-12 text-stone-700 text-sm font-tech">
            © {new Date().getFullYear()} {footer.copyright}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
