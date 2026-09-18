import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { playSparkle } from '../../utils/audio';

export const CuteApp: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setLoading(false);
          playSparkle();
          return 100;
        }
        return prev + 20;
      });
    }, 180);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
      {/* Animated Bow */}
      <motion.div
        animate={
          loading
            ? { rotate: [-4, 4, -4], y: [-2, 2, -2] }
            : { scale: [1, 1.1, 1], rotate: [0, -3, 3, 0] }
        }
        transition={{
          repeat: loading ? Infinity : 0,
          duration: loading ? 0.8 : 0.6,
          ease: 'easeInOut',
        }}
        className="mb-6"
      >
        <svg viewBox="0 0 100 80" className="w-24 h-20" fill="none">
          {/* Bow left wing */}
          <path
            d="M48 40C34 22 10 26 12 44C14 62 38 52 46 42"
            fill="#FAF0F3"
            stroke="#D47F95"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          <path d="M26 36C22 40 22 46 28 46" stroke="#E9A6B5" strokeWidth="2" strokeLinecap="round" />
          {/* Bow right wing */}
          <path
            d="M52 40C66 22 90 26 88 44C86 62 62 52 54 42"
            fill="#FAF0F3"
            stroke="#D47F95"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          <path d="M74 36C78 40 78 46 72 46" stroke="#E9A6B5" strokeWidth="2" strokeLinecap="round" />
          {/* Tails */}
          <path d="M46 44C40 56 32 68 26 72" stroke="#D47F95" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M54 44C60 56 68 68 74 72" stroke="#D47F95" strokeWidth="2.4" strokeLinecap="round" />
          {/* Center Knot */}
          <circle cx="50" cy="40" r="8" fill="#E9A6B5" stroke="#D47F95" strokeWidth="2.4" />
          <path d="M47 38A2 2 0 0 1 53 42" stroke="#FFFDF8" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </motion.div>

      {/* App title */}
      <h3 className="font-mono text-xs tracking-widest text-[#8E7B80] font-semibold mb-3 uppercase">
        CUTE.EXE
      </h3>

      {loading ? (
        <div className="w-full space-y-4 py-2">
          <p className="text-sm font-medium text-[#493D40]">
            running a very serious analysis...
          </p>
          <div className="w-48 h-2 bg-[#EFE8EA] rounded-full mx-auto overflow-hidden">
            <motion.div
              className="h-full bg-[#D47F95] rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <div className="text-xs font-semibold tracking-wider text-[#8E7B80] uppercase font-mono">
            result:
          </div>
          <p className="text-2xl font-serif text-[#493D40] font-medium">
            ridiculously cute
          </p>
          <div className="inline-block px-4 py-1.5 rounded-full bg-[#FAF8F5] border border-[#EFE8EA] text-[#493D40] text-sm font-medium shadow-2xs">
            status: no known cure 🎀
          </div>
        </motion.div>
      )}
    </div>
  );
};
