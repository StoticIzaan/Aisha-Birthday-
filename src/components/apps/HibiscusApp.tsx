import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { playSparkle } from '../../utils/audio';

export const HibiscusApp: React.FC = () => {
  const [bloomed, setBloomed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBloomed(true);
      playSparkle();
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const handleToggleBloom = () => {
    setBloomed((prev) => {
      if (!prev) playSparkle();
      return !prev;
    });
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
      {/* Blooming Hibiscus Illustration - Clickable */}
      <div
        onClick={handleToggleBloom}
        title="Click to bloom"
        className="relative w-36 h-36 flex items-center justify-center mb-6 cursor-pointer group"
      >
        <svg viewBox="0 0 120 120" className="w-full h-full" fill="none">
          {/* Stem & Leaves */}
          <path
            d="M60 110C60 90 58 75 60 65"
            stroke="#8E7B80"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <motion.path
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: bloomed ? 1 : 0.6, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            d="M58 85C46 80 40 92 48 96C56 100 58 90 58 85Z"
            fill="#FAF0F3"
            stroke="#D47F95"
            strokeWidth="1.8"
          />
          <motion.path
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: bloomed ? 1 : 0.6, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
            d="M62 80C74 75 80 87 72 91C64 95 62 85 62 80Z"
            fill="#FAF0F3"
            stroke="#D47F95"
            strokeWidth="1.8"
          />

          {/* Petals blooming from bud to wide open */}
          {/* Petal 1 Top */}
          <motion.path
            initial={{ scale: 0.4, transformOrigin: '60px 60px', opacity: 0.8 }}
            animate={{
              scale: bloomed ? 1 : 0.4,
              rotate: bloomed ? 0 : 15,
              opacity: 1,
            }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            d="M60 60C50 35 70 25 78 35C86 45 70 58 60 60Z"
            fill="#FAF0F3"
            stroke="#D47F95"
            strokeWidth="2.2"
          />
          {/* Petal 2 Right */}
          <motion.path
            initial={{ scale: 0.4, transformOrigin: '60px 60px', opacity: 0.8 }}
            animate={{
              scale: bloomed ? 1 : 0.4,
              rotate: bloomed ? 0 : -10,
              opacity: 1,
            }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
            d="M60 60C82 45 92 60 86 70C80 80 68 66 60 60Z"
            fill="#FAF0F3"
            stroke="#D47F95"
            strokeWidth="2.2"
          />
          {/* Petal 3 Bottom Right */}
          <motion.path
            initial={{ scale: 0.4, transformOrigin: '60px 60px', opacity: 0.8 }}
            animate={{
              scale: bloomed ? 1 : 0.4,
              rotate: bloomed ? 0 : 5,
              opacity: 1,
            }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            d="M60 60C70 82 54 92 46 86C38 80 52 68 60 60Z"
            fill="#FAF0F3"
            stroke="#D47F95"
            strokeWidth="2.2"
          />
          {/* Petal 4 Bottom Left */}
          <motion.path
            initial={{ scale: 0.4, transformOrigin: '60px 60px', opacity: 0.8 }}
            animate={{
              scale: bloomed ? 1 : 0.4,
              rotate: bloomed ? 0 : -15,
              opacity: 1,
            }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            d="M60 60C38 72 28 58 36 50C44 42 54 55 60 60Z"
            fill="#FAF0F3"
            stroke="#D47F95"
            strokeWidth="2.2"
          />
          {/* Petal 5 Top Left */}
          <motion.path
            initial={{ scale: 0.4, transformOrigin: '60px 60px', opacity: 0.8 }}
            animate={{
              scale: bloomed ? 1 : 0.4,
              rotate: bloomed ? 0 : 10,
              opacity: 1,
            }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            d="M60 60C44 40 54 26 66 30C72 34 62 52 60 60Z"
            fill="#FAF0F3"
            stroke="#D47F95"
            strokeWidth="2.2"
          />

          {/* Stamen/pistil extending outward */}
          <motion.g
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{ scale: bloomed ? 1 : 0.2, opacity: bloomed ? 1 : 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: 'easeOut' }}
            style={{ transformOrigin: '60px 60px' }}
          >
            <path
              d="M60 60C64 48 74 36 84 28"
              stroke="#D47F95"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            <circle cx="84" cy="28" r="3" fill="#E9A6B5" />
            <circle cx="80" cy="33" r="2.4" fill="#E9A6B5" />
            <circle cx="75" cy="39" r="2.4" fill="#E9A6B5" />
            <circle cx="69" cy="46" r="2.2" fill="#E9A6B5" />
            <circle cx="60" cy="60" r="4.5" fill="#D47F95" />
          </motion.g>
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="space-y-3"
      >
        <div className="text-xs font-semibold tracking-widest text-[#8E7B80] uppercase font-mono">
          FAVOURITE FLOWER
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif text-[#493D40] font-normal flex items-center justify-center gap-2">
          <span>🌺</span> HIBISCUS
        </h2>
        <p className="text-sm sm:text-base text-[#8E7B80] font-normal leading-relaxed pt-2 max-w-xs mx-auto">
          apparently, out of all the flowers in existence,
          <br />
          this one got the honour
        </p>
      </motion.div>
    </div>
  );
};
