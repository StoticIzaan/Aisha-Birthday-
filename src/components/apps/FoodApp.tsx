import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { playClick } from '../../utils/audio';

export const FoodApp: React.FC = () => {
  const [lidLifted, setLidLifted] = useState(false);
  const [showTreats, setShowTreats] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setLidLifted(true);
      playClick();
    }, 500);

    const timer2 = setTimeout(() => {
      setShowTreats(true);
    }, 1100);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleToggleLid = () => {
    playClick();
    setLidLifted((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 text-center max-w-lg mx-auto">
      {/* Illustrated Food Scene (No cards) */}
      <div
        onClick={handleToggleLid}
        title="Click to toggle cloche"
        className="relative w-full h-44 flex items-center justify-center mb-6 cursor-pointer group"
      >
        {/* Serving Dish Platter */}
        <div className="relative flex flex-col items-center">
          {/* Animated Cloche Lid */}
          <motion.div
            initial={{ y: 0, rotate: 0 }}
            animate={{
              y: lidLifted ? -42 : 0,
              rotate: lidLifted ? -8 : 0,
              opacity: lidLifted ? 0.85 : 1,
            }}
            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            className="z-20 relative flex flex-col items-center"
          >
            {/* Cloche handle */}
            <div className="w-3.5 h-3.5 rounded-full bg-[#FAF8F5] border-2 border-[#493D40]" />
            {/* Cloche Dome */}
            <div className="w-40 h-18 bg-[#FFFDF8] border-2 border-b-0 border-[#493D40] rounded-t-full relative shadow-xs">
              <div className="absolute top-3 left-6 right-6 h-0.5 bg-[#EFE8EA]" />
            </div>
          </motion.div>

          {/* Kadhi Chawal Bowl inside platter */}
          <div className="relative z-10 -mt-1 flex flex-col items-center">
            {/* Revealed Kadhi Chawal */}
            <div className="w-36 h-14 bg-[#FEF0C8] rounded-b-full border-2 border-[#493D40] overflow-hidden relative flex items-center justify-center">
              {/* Rice and golden kadhi curry */}
              <div className="absolute inset-x-2 bottom-1 h-10 bg-[#FFFDF8] rounded-b-full border border-[#E5BD3C] flex items-center justify-center">
                <div className="w-20 h-5 bg-[#FEF0C8] rounded-full border border-[#E5BD3C]/60 flex items-center justify-center">
                  <span className="text-xs">🍚</span>
                </div>
              </div>
            </div>

            {/* Subtle Steam Rising once opened */}
            {lidLifted && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: [0, 0.7, 0], y: [-2, -18] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeOut' }}
                className="absolute -top-6 flex gap-4 text-[#8E7B80] text-xs select-none pointer-events-none"
              >
                <span>~</span>
                <span>~</span>
              </motion.div>
            )}

            {/* Platter Rim Base */}
            <div className="w-48 h-3.5 bg-[#FAF8F5] border-2 border-[#493D40] rounded-full mt-1" />
          </div>
        </div>

        {/* Milk Cake appearing on left */}
        <motion.div
          initial={{ opacity: 0, x: 20, scale: 0.8 }}
          animate={{
            opacity: showTreats ? 1 : 0,
            x: showTreats ? -120 : -90,
            scale: showTreats ? 1 : 0.8,
          }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="absolute flex flex-col items-center"
        >
          <div className="w-14 h-12 bg-[#FFFDF8] border-2 border-[#493D40] rounded-lg relative overflow-hidden flex flex-col justify-end p-0.5 shadow-2xs">
            <div className="h-4 bg-[#F5E6CC] border-b border-[#D7B185]" />
            <div className="h-5 bg-[#FFFDF8] flex items-center justify-center text-xs">
              🍰
            </div>
          </div>
          <span className="text-[11px] font-medium text-[#8E7B80] mt-1 whitespace-nowrap font-mono">
            milk cake
          </span>
        </motion.div>

        {/* Choco Chip Ice Cream appearing on right */}
        <motion.div
          initial={{ opacity: 0, x: -20, scale: 0.8 }}
          animate={{
            opacity: showTreats ? 1 : 0,
            x: showTreats ? 120 : 90,
            scale: showTreats ? 1 : 0.8,
          }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="absolute flex flex-col items-center"
        >
          <div className="w-12 h-14 flex flex-col items-center justify-center">
            <div className="w-10 h-8 bg-[#FFFDF8] border-2 border-[#493D40] rounded-t-full relative flex items-center justify-center">
              {/* Choco chips */}
              <span className="w-1 h-1 rounded-full bg-[#493D40] absolute top-2 left-2" />
              <span className="w-1 h-1 rounded-full bg-[#493D40] absolute top-3 right-2" />
              <span className="text-xs">🍦</span>
            </div>
            <div className="w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-t-[18px] border-t-[#D7B185] -mt-1" />
          </div>
          <span className="text-[11px] font-medium text-[#8E7B80] mt-1 whitespace-nowrap font-mono">
            choco chip
          </span>
        </motion.div>
      </div>

      {/* Text without any card wrapper */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="space-y-4 pt-2"
      >
        <p className="text-xs font-semibold tracking-widest text-[#8E7B80] uppercase">
          the food department
        </p>

        <div className="space-y-2 text-base sm:text-lg font-serif text-[#493D40]">
          <div>🍚 homemade kadhi chawal</div>
          <div>🍰 milk cake</div>
          <div>🍦 choco chip ice cream</div>
        </div>
      </motion.div>
    </div>
  );
};
