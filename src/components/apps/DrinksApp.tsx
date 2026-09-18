import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { playClick } from '../../utils/audio';

export const DrinksApp: React.FC = () => {
  const [showLimonata, setShowLimonata] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLimonata(true);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
      {/* Illustrated drink counter / table */}
      <div className="relative w-72 h-44 mb-6 flex items-end justify-center">
        {/* Table Surface */}
        <div className="absolute bottom-2 left-2 right-2 h-3 bg-[#FAF8F5] rounded-full border border-[#EFE8EA]" />

        <div className="flex items-end justify-center gap-8 relative z-10 pb-4">
          {/* Cold Coffee Glass */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            whileTap={{ scale: 0.95 }}
            onClick={playClick}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col items-center cursor-pointer group"
          >
            <div className="relative w-16 h-28">
              {/* Straw */}
              <div className="absolute -top-4 right-4 w-1.5 h-10 bg-[#8E7B80] rounded-full rotate-12 z-0" />
              {/* Glass Cup */}
              <div className="w-16 h-28 bg-[#FFFDF8]/90 border-2 border-[#493D40] rounded-b-2xl rounded-t-sm relative overflow-hidden flex flex-col justify-end p-1 z-10 backdrop-blur-xs shadow-2xs">
                {/* Coffee Liquid */}
                <div className="w-full h-20 bg-[#9E7A65] rounded-b-xl relative overflow-hidden">
                  {/* Froth / Foam layer on top */}
                  <div className="absolute top-0 left-0 right-0 h-3.5 bg-[#FFFDF8] border-b border-[#EFE8EA] flex items-center justify-around px-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EAE5E0]" />
                    <span className="w-2 h-2 rounded-full bg-[#F5F2EE]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EAE5E0]" />
                  </div>
                  {/* Floating Ice Cubes */}
                  <motion.div
                    animate={{ y: [-1, 2, -1] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                    className="absolute top-5 left-2 w-3.5 h-3.5 border border-[#FFFDF8]/80 bg-[#FFFDF8]/40 rounded-xs"
                  />
                  <motion.div
                    animate={{ y: [1, -2, 1] }}
                    transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut', delay: 0.3 }}
                    className="absolute top-7 right-2 w-4 h-4 border border-[#FFFDF8]/80 bg-[#FFFDF8]/40 rounded-xs"
                  />
                </div>
              </div>
            </div>
            <span className="text-xs font-semibold text-[#493D40] mt-2 tracking-wide font-mono">
              COLD COFFEE
            </span>
          </motion.div>

          {/* Limonata Glass */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: showLimonata ? 1 : 0, y: showLimonata ? 0 : 15 }}
            whileTap={{ scale: 0.95 }}
            onClick={playClick}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col items-center cursor-pointer group"
          >
            <div className="relative w-16 h-28">
              {/* Lemon Slice rim garnish */}
              <div className="absolute -top-3 left-0 w-6 h-6 rounded-full border-2 border-[#493D40] bg-[#FFFDF8] flex items-center justify-center z-20">
                <div className="w-4 h-4 rounded-full bg-[#FDECB2] border border-[#E5BD3C]" />
              </div>
              {/* Glass Cup */}
              <div className="w-16 h-28 bg-[#FFFDF8]/90 border-2 border-[#493D40] rounded-b-2xl rounded-t-sm relative overflow-hidden flex flex-col justify-end p-1 z-10 backdrop-blur-xs shadow-2xs">
                {/* Limonata Liquid */}
                <div className="w-full h-22 bg-[#FEF6D2] rounded-b-xl relative overflow-hidden">
                  {/* Bubbles rising */}
                  <motion.div
                    animate={{ y: [16, -2], opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }}
                    className="absolute bottom-2 left-3 w-1.5 h-1.5 rounded-full bg-[#FFFDF8]"
                  />
                  <motion.div
                    animate={{ y: [20, -2], opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: 'linear', delay: 0.4 }}
                    className="absolute bottom-3 right-4 w-1.5 h-1.5 rounded-full bg-[#FFFDF8]"
                  />
                  <motion.div
                    animate={{ y: [18, -2], opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'linear', delay: 0.8 }}
                    className="absolute bottom-1 left-7 w-1 h-1 rounded-full bg-[#FFFDF8]"
                  />
                  {/* Subtle ice */}
                  <div className="absolute top-6 left-3 w-4 h-4 border border-[#FFFDF8]/90 bg-[#FFFDF8]/50 rounded-xs" />
                </div>
              </div>
            </div>
            <span className="text-xs font-semibold text-[#493D40] mt-2 tracking-wide font-mono">
              LIMONATA
            </span>
          </motion.div>
        </div>
      </div>

      {/* Copy */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="space-y-3"
      >
        <p className="text-xs font-semibold tracking-widest text-[#8E7B80] uppercase">
          your usuals
        </p>
        <div className="text-lg sm:text-xl font-serif text-[#493D40] space-y-1">
          <div>☕ COLD COFFEE</div>
          <div>🍋 LIMONATA</div>
        </div>
        <p className="text-sm text-[#8E7B80] font-normal leading-relaxed pt-2">
          somehow these two made the list
        </p>
      </motion.div>
    </div>
  );
};
