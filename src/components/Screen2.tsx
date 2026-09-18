import React from 'react';
import { motion } from 'motion/react';
import { Sparkle, TinyHeart } from './Ornaments';
import { playClick, playChime } from '../utils/audio';

interface Screen2Props {
  onEnter: () => void;
}

export const Screen2: React.FC<Screen2Props> = ({ onEnter }) => {
  const handleEnter = () => {
    playChime();

    // Request real browser fullscreen when entering the desktop
    if (document.documentElement.requestFullscreen) {
      void document.documentElement.requestFullscreen().catch(() => {});
    }

    onEnter();
  };

  return (
    <motion.div
      id="screen-2-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="min-h-screen w-full flex items-center justify-center p-6 md:p-12 relative overflow-hidden bg-[#FFFDF8] bg-grain"
    >
      {/* Delicate floating background accents */}
      <div className="absolute top-16 right-24 opacity-25 pointer-events-none hidden md:block">
        <Sparkle size={18} color="#D47F95" />
      </div>

      <div className="absolute bottom-20 left-20 opacity-20 pointer-events-none hidden md:block">
        <TinyHeart size={16} color="#E9A6B5" />
      </div>

      <motion.div
        id="screen-2-card"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1, ease: 'easeOut' }}
        className="w-full max-w-xl bg-[#FFFDF8] rounded-3xl border border-[#EFE8EA] shadow-[0_12px_40px_rgba(73,61,64,0.05)] p-8 sm:p-12 relative z-10"
      >
        {/* Centralized Header Badge */}
        <div className="flex items-center justify-center gap-2 mb-8 pb-5 border-b border-[#EFE8EA]">
          <span className="w-2 h-2 rounded-full bg-[#E9A6B5]" />

          <span className="text-xs font-semibold tracking-widest text-[#8E7B80] uppercase font-mono">
            System Boot • Aisha OS
          </span>

          <span className="w-2 h-2 rounded-full bg-[#E9A6B5]" />
        </div>

        {/* Centralized Content */}
        <div
          id="screen-2-content"
          className="text-[#493D40] text-base sm:text-lg leading-[1.85] font-normal tracking-normal space-y-6 font-sans text-opacity-95 text-center max-w-md mx-auto"
        >
          <p className="font-serif text-xl sm:text-2xl text-[#493D40] font-normal">
            okay, so i made this little thing for you
          </p>

          <p>
            it is basically a tiny corner of the internet that is just... very you
            <br />
            some things you will recognize immediately, some things you probably forgot you ever told me, and some things that are just little details i have somehow picked up over the years
          </p>

          <p>
            there is no particular order to any of it
            <br />
            just click around, open whatever catches your attention, and see what i made for you
          </p>
        </div>

        {/* Centralized Action Button */}
        <div className="mt-10 pt-6 flex items-center justify-center border-t border-[#EFE8EA]">
          <button
            id="screen-2-enter-btn"
            onClick={handleEnter}
            onMouseEnter={playClick}
            className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#FFFDF8] hover:bg-[#FAF8F5] border border-[#E9A6B5] hover:border-[#D47F95] text-[#493D40] font-medium text-base transition-all duration-200 shadow-2xs hover:shadow-xs hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] cursor-pointer"
          >
            <span>come in →</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
