import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export const MedicineApp: React.FC = () => {
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTextVisible(true);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-6 text-center max-w-lg mx-auto">
      {/* Animated Stethoscope & Heartbeat Line */}
      <div className="relative w-full max-w-sm h-28 flex flex-col items-center justify-center mb-6">
        <svg viewBox="0 0 280 80" className="w-full h-full" fill="none">
          {/* Stethoscope Path with drawing stroke animation */}
          {/* Earpieces */}
          <motion.path
            d="M80 18V28C80 38 90 44 95 44C100 44 110 38 110 28V18"
            stroke="#493D40"
            strokeWidth="2.6"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
          />
          <motion.circle
            cx="80"
            cy="18"
            r="2.8"
            fill="#493D40"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          />
          <motion.circle
            cx="110"
            cy="18"
            r="2.8"
            fill="#493D40"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          />

          {/* Stethoscope Tube */}
          <motion.path
            d="M95 44V54C95 62 105 66 112 60C118 54 110 46 102 52C98 56 100 64 108 68H130"
            stroke="#493D40"
            strokeWidth="2.6"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.1, delay: 0.3, ease: 'easeInOut' }}
          />
          {/* Chestpiece */}
          <motion.circle
            cx="135"
            cy="68"
            r="6"
            fill="#EAE4E5"
            stroke="#493D40"
            strokeWidth="2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.1 }}
          />
          <motion.circle
            cx="135"
            cy="68"
            r="2.5"
            fill="#FFFDF8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.1 }}
          />

          {/* Heartbeat ECG Line traveling from chestpiece to the right */}
          <motion.path
            d="M145 68H175L182 54L188 78L194 62L198 70L202 68H240"
            stroke="#D47F95"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.9, ease: 'easeOut' }}
          />

          {/* Traveling pulse dot */}
          <motion.circle
            r="2.2"
            fill="#D47F95"
            animate={{
              cx: [145, 175, 182, 188, 194, 198, 202, 240],
              cy: [68, 68, 54, 78, 62, 70, 68, 68],
              opacity: [0, 1, 1, 1, 1, 1, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 2.2,
              delay: 1.6,
              ease: 'easeInOut',
            }}
          />
        </svg>
      </div>

      {/* Copy */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: textVisible ? 1 : 0, y: textVisible ? 0 : 10 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-[#493D40] text-sm sm:text-base leading-relaxed space-y-4 font-sans text-center"
      >
        <div className="text-xs font-semibold tracking-widest text-[#8E7B80] uppercase font-mono">
          medicine
        </div>

        <p className="font-normal">
          you have wanted this since you were a kid
          <br />
          and honestly, I love that you never let it just stay a childhood dream
        </p>

        <p className="font-normal">
          you are smart, hardworking, determined, and you actually put in the work for the things you care about
        </p>

        <p className="text-lg font-serif text-[#493D40] font-medium py-1">
          future cardio surgeon 🩺
        </p>

        <p className="font-normal text-[#8E7B80]">
          I genuinely hope you get there
          <br />
          because watching you work toward something you have wanted for so long is pretty damn special
        </p>
      </motion.div>
    </div>
  );
};
