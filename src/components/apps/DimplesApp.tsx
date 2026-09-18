import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { playSparkle } from '../../utils/audio';

export const DimplesApp: React.FC = () => {
  const [smiling, setSmiling] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSmiling(true);
      playSparkle();
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const handleToggleSmile = () => {
    setSmiling((prev) => {
      if (!prev) playSparkle();
      return !prev;
    });
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
      {/* Illustrated Face: neutral -> smiles -> dimples appear */}
      <div
        onClick={handleToggleSmile}
        title="Click to smile"
        className="relative w-36 h-36 flex items-center justify-center mb-6 cursor-pointer select-none group"
      >
        <svg viewBox="0 0 120 120" className="w-full h-full" fill="none">
          {/* Head circle */}
          <circle
            cx="60"
            cy="60"
            r="44"
            fill="#FFFDF8"
            stroke="#493D40"
            strokeWidth="2.5"
          />

          {/* Cheerful blush */}
          <motion.circle
            cx="34"
            cy="66"
            r="7"
            fill="#FAF0F3"
            initial={{ opacity: 0 }}
            animate={{ opacity: smiling ? 0.9 : 0.2 }}
            transition={{ duration: 0.6 }}
          />
          <motion.circle
            cx="86"
            cy="66"
            r="7"
            fill="#FAF0F3"
            initial={{ opacity: 0 }}
            animate={{ opacity: smiling ? 0.9 : 0.2 }}
            transition={{ duration: 0.6 }}
          />

          {/* Eyes: switch from neutral round eyes to curved joyful crescent eyes */}
          {smiling ? (
            <>
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                d="M40 50C44 45 50 45 54 50"
                stroke="#493D40"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                d="M66 50C70 45 76 45 80 50"
                stroke="#493D40"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </>
          ) : (
            <>
              <circle cx="47" cy="50" r="3.5" fill="#493D40" />
              <circle cx="73" cy="50" r="3.5" fill="#493D40" />
            </>
          )}

          {/* Mouth: neutral line -> curved happy smile */}
          <motion.path
            animate={{
              d: smiling
                ? 'M44 68C50 80 70 80 76 68'
                : 'M48 70C54 70 66 70 72 70',
            }}
            transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
            stroke="#493D40"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Left dimple (slightly deeper/more prominent) */}
          <motion.path
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: smiling ? 1 : 0,
              scale: smiling ? 1 : 0,
            }}
            transition={{ duration: 0.5, delay: 0.3 }}
            d="M36 65C34 68 34 73 36 76"
            stroke="#D47F95"
            strokeWidth="3.2"
            strokeLinecap="round"
          />

          {/* Right dimple (slightly less dramatic) */}
          <motion.path
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: smiling ? 1 : 0,
              scale: smiling ? 1 : 0,
            }}
            transition={{ duration: 0.5, delay: 0.35 }}
            d="M84 67C85.5 69.5 85.5 73 84 75"
            stroke="#E9A6B5"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Copy */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold tracking-widest text-[#8E7B80] uppercase">
          THE DIMPLES
        </h3>

        <p className="text-lg sm:text-xl font-serif text-[#493D40]">
          you know the ones
        </p>

        <div className="space-y-1 text-sm sm:text-base text-[#493D40] pt-1">
          <div>
            <span className="text-[#D47F95] font-semibold">left:</span> deeper
          </div>
          <div>
            <span className="text-[#8E7B80] font-medium">right:</span> slightly less dramatic
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#8E7B80] pt-2 italic">
          appearance: usually when Aisha is actually happy
        </p>
      </div>
    </div>
  );
};
