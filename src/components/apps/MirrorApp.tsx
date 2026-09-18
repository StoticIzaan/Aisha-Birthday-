import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { playSparkle } from '../../utils/audio';

export const MirrorApp: React.FC = () => {
  const [reflectionReady, setReflectionReady] = useState(false);
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => {
      setReflectionReady(true);
      playSparkle();
    }, 600);

    const t2 = setTimeout(() => {
      setTextVisible(true);
    }, 1200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-6 text-center max-w-lg mx-auto">
      {/* Hand Mirror with Reflection animation */}
      <div className="relative w-28 h-36 flex items-center justify-center mb-6">
        <svg viewBox="0 0 100 120" className="w-full h-full" fill="none">
          {/* Mirror frame */}
          <ellipse
            cx="50"
            cy="45"
            rx="34"
            ry="40"
            fill="#FAF8F5"
            stroke="#493D40"
            strokeWidth="2.2"
          />

          {/* Mirror glass */}
          <ellipse
            cx="50"
            cy="45"
            rx="27"
            ry="33"
            fill="#FFFDF8"
            stroke="#8E7B80"
            strokeWidth="1.2"
          />

          {/* Gentle reflection shimmer */}
          <motion.ellipse
            cx="50"
            cy="45"
            rx="24"
            ry="30"
            fill="#F5F3F4"
            initial={{ opacity: 0 }}
            animate={{ opacity: reflectionReady ? 0.5 : 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />

          {/* Diagonal reflective light streak */}
          <motion.path
            d="M36 28C42 22 55 22 62 26"
            stroke="#FFFDF8"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{
              opacity: reflectionReady ? 0.9 : 0,
              pathLength: reflectionReady ? 1 : 0,
            }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />

          {/* Handle */}
          <path
            d="M50 85V112"
            stroke="#493D40"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <circle cx="50" cy="114" r="2.8" fill="#EAE5E7" stroke="#493D40" strokeWidth="1.6" />
        </svg>
      </div>

      {/* Copy */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: textVisible ? 1 : 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="space-y-4 text-center font-sans"
      >
        <h3 className="text-xs font-semibold tracking-widest text-[#8E7B80] uppercase font-mono">
          BEHIND THE MIRROR
        </h3>

        <div className="text-sm sm:text-base leading-[1.8] text-[#493D40] space-y-3 font-normal max-w-md mx-auto">
          <p>
            there is an entire side of you that most people probably never get to see
          </p>
          <p>
            you do not really show vulnerability
            <br />
            you keep things to yourself
            <br />
            you bottle up a lot of what you feel
            <br />
            and you do not always tell people what is actually going on inside your head
          </p>
          <p>
            you can be completely composed on the outside while having so much going on underneath
          </p>
          <p>
            maybe you do not even realize how much of yourself you keep hidden
            <br />
            <span className="text-[#493D40] font-medium font-serif italic text-base sm:text-lg block pt-1">
              but that side of you matters too
            </span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
