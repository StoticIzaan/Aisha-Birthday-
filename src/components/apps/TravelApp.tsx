import React from 'react';
import { motion } from 'motion/react';

export const TravelApp: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
      {/* Stylized sky/map container with moving clouds and flying airplane */}
      <div className="relative w-full h-40 bg-[#FAFBFD] rounded-2xl border border-[#E8EFF5] overflow-hidden mb-6 flex items-center justify-center shadow-2xs">
        {/* Stylized map dotted route line */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" fill="none">
          <path
            d="M 20 110 Q 120 40, 260 70 T 360 30"
            stroke="#CBD7E2"
            strokeWidth="2"
            strokeDasharray="4 6"
          />
        </svg>

        {/* Floating clouds */}
        <motion.div
          animate={{ x: [-40, 320] }}
          transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
          className="absolute top-4 text-xl opacity-60 pointer-events-none"
        >
          ☁️
        </motion.div>
        <motion.div
          animate={{ x: [-60, 340] }}
          transition={{ repeat: Infinity, duration: 16, ease: 'linear', delay: 4 }}
          className="absolute top-16 text-lg opacity-40 pointer-events-none"
        >
          ☁️
        </motion.div>

        {/* Flying tiny airplane moving along flight path */}
        <motion.div
          animate={{
            x: [-120, 160],
            y: [30, -30],
            rotate: [15, 8],
          }}
          transition={{
            repeat: Infinity,
            duration: 6,
            ease: 'easeInOut',
          }}
          className="absolute z-10"
        >
          <div className="text-2xl drop-shadow-xs">✈️</div>
        </motion.div>

        {/* Subtle travel items arranged neatly at the bottom edge */}
        <div className="absolute bottom-2 flex items-center justify-center gap-6 px-4 py-1 rounded-full bg-[#FFFDF8]/90 border border-[#EFE8EA] z-20 backdrop-blur-xs text-sm">
          <span title="Suitcase" className="text-base">🧳</span>
          <span className="text-[#8E7B80] text-xs">•</span>
          <span title="Passport" className="text-base">🛂</span>
          <span className="text-[#8E7B80] text-xs">•</span>
          <span title="Camera" className="text-base">📷</span>
        </div>
      </div>

      {/* Copy */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold tracking-widest text-[#8E7B80] uppercase font-mono">
          TRAVEL MODE ✈️
        </h3>

        <p className="text-base sm:text-lg font-serif text-[#493D40] leading-snug">
          one of those things you could probably never get bored of
        </p>

        <p className="text-sm sm:text-base text-[#8E7B80]">
          new places, new views, new stories
        </p>

        <div className="inline-block px-4 py-1.5 rounded-full bg-[#FAF8F5] border border-[#EFE8EA] text-[#493D40] text-xs sm:text-sm font-medium mt-2 shadow-2xs">
          status: always ready to go
        </div>
      </div>
    </div>
  );
};
