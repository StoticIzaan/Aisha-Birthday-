import React from 'react';
import { motion } from 'motion/react';
import { Sparkle, TinyHeart, HandDrawnBow } from './Ornaments';
import { playClick, playChime } from '../utils/audio';

interface Screen1Props {
  onNext: () => void;
}

export const Screen1: React.FC<Screen1Props> = ({ onNext }) => {
  const handleProceed = () => {
    playChime();
    onNext();
  };

  return (
    <motion.div
      id="screen-1-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="min-h-screen w-full flex items-center justify-center p-6 md:p-12 relative overflow-hidden bg-[#FFFDF8] bg-grain"
    >
      {/* Delicate floating background accents */}
      <div className="absolute top-12 left-14 opacity-30 pointer-events-none hidden md:block">
        <Sparkle size={20} color="#D47F95" />
      </div>
      <div className="absolute bottom-16 left-24 opacity-25 pointer-events-none hidden md:block">
        <TinyHeart size={16} color="#E9A6B5" />
      </div>
      <div className="absolute top-20 right-20 opacity-30 pointer-events-none hidden md:block">
        <HandDrawnBow size={24} color="#D47F95" />
      </div>
      <div className="absolute bottom-24 right-16 opacity-25 pointer-events-none hidden md:block">
        <Sparkle size={18} color="#E9A6B5" />
      </div>

      {/* Main card */}
      <motion.div
        id="screen-1-card"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1, ease: 'easeOut' }}
        className="w-full max-w-2xl bg-[#FFFDF8] rounded-3xl border border-[#EFE8EA] shadow-[0_12px_40px_rgba(73,61,64,0.05)] p-8 sm:p-12 md:p-14 relative z-10"
      >
        {/* Centralized Header Badge */}
        <div className="flex items-center justify-center gap-2 mb-8 pb-5 border-b border-[#EFE8EA]">
          <span className="w-2 h-2 rounded-full bg-[#E9A6B5]" />
          <span className="text-xs font-semibold tracking-widest text-[#8E7B80] uppercase font-mono">
            Aisha • Sweet 16
          </span>
          <span className="w-2 h-2 rounded-full bg-[#E9A6B5]" />
        </div>

        {/* Centralized Heading */}
        <h1
          id="screen-1-heading"
          className="text-3xl sm:text-4xl md:text-[2.6rem] font-normal text-[#493D40] leading-tight mb-8 font-serif text-center"
        >
          Happy birthday, Aisha
        </h1>

        {/* Letter Text */}
        <div
          id="screen-1-letter"
          className="text-[#493D40] text-base sm:text-lg leading-[1.85] font-normal tracking-normal space-y-4 font-sans text-opacity-95 max-w-xl mx-auto text-left"
        >
          <p>
            Happy birthday Aisha, sweet 16. It&apos;s been such a long journey, and honestly, I&apos;m really out of words because, I have no idea how to put so many years of our friendship into one message. It&apos;s genuinely amusing to me to think about how I&apos;ve watched you grow up through all these years. And now you&apos;ve left school and gone away, yet somehow our dynamic and our friendship have remained almost completely unchanged, even with the distance between us. I think that is one of the things I find so special about us, because not every connection manages to stay the same when circumstances change, and I genuinely feel like what we have is a very rare kind of connection, one that not everyone gets to experience. I am truly blessed to have you in my life, and to have gotten to know you through all these years, and I really hope you know just how special you are to me, and how grateful I am that, somehow, through all the changes, you are still such a constant in my life. Happy birthday again, Aisha. I hope your sweet 16 is everything you deserve, and that this year gives you so many reasons to be happy, grateful and proud of the person you are becoming. Because if there&apos;s one thing I hope you never forget , it&apos;s that there&apos;s someone here who is genuinely very grateful that you exist.
          </p>
        </div>

        {/* Centralized Action Button */}
        <div className="mt-10 pt-6 flex items-center justify-center border-t border-[#EFE8EA]">
          <button
            id="screen-1-next-btn"
            onClick={handleProceed}
            onMouseEnter={playClick}
            className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#FFFDF8] hover:bg-[#FAF8F5] border border-[#E9A6B5] hover:border-[#D47F95] text-[#493D40] font-medium text-base transition-all duration-200 shadow-2xs hover:shadow-xs hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] cursor-pointer"
          >
            <span>get here →</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
