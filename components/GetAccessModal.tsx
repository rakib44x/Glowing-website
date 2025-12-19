import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import { useTheme } from '../theme.context';

interface GetAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GetAccessModal: React.FC<GetAccessModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  
  const { modal, brand } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="relative w-full max-w-lg bg-black border border-steel-ember shadow-[0_0_50px_rgba(255,0,51,0.1)] overflow-hidden"
          >
            {/* Top Bar Decoration */}
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-neon-red to-transparent"></div>

            <div className="p-12 text-center relative z-10">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-stone-600 hover:text-white transition-colors text-xl"
              >
                ×
              </button>

              <div className="flex justify-center mb-8">
                <Logo variant="clean" className="w-16 h-16 text-white" />
              </div>

              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                   <h3 className="font-header text-4xl text-white glow-text-red">{modal.successTitle}</h3>
                   <p className="font-ritual text-xl text-stone-400 whitespace-pre-line">
                     {modal.successDesc}
                   </p>
                   <button 
                     onClick={onClose}
                     className="mt-8 px-8 py-3 bg-neon-red text-black font-header tracking-widest uppercase hover:bg-white transition-colors"
                   >
                     {modal.successButton}
                   </button>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  <h3 className="font-header text-4xl text-white">{modal.title}</h3>
                  <p className="font-ritual text-xl text-stone-400 whitespace-pre-line">
                    {modal.description}
                  </p>

                  <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mt-8">
                    <input 
                      type="email" 
                      placeholder={brand.emailPlaceholder}
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-steel-ember/30 border border-steel-ember px-6 py-4 text-center text-white font-tech text-sm tracking-wider focus:outline-none focus:border-neon-red focus:shadow-[0_0_15px_rgba(255,0,51,0.2)] transition-all placeholder:text-stone-600"
                    />
                    <button 
                      type="submit"
                      disabled={status === 'loading'}
                      className="px-6 py-4 bg-white text-black font-header text-xl tracking-widest uppercase hover:bg-neon-red hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === 'loading' ? modal.buttonLoading : modal.buttonIdle}
                    </button>
                  </form>
                </div>
              )}
            </div>
            
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-uv-purple/10 blur-[60px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-neon-red/10 blur-[60px] pointer-events-none"></div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default GetAccessModal;
