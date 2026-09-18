import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { AppId } from '../types';
import { playWindowClose, playClick } from '../utils/audio';
import { DesktopIcon } from './DesktopIcons';

interface WindowFrameProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  appId: AppId;
  children: React.ReactNode;
}

export const WindowFrame: React.FC<WindowFrameProps> = ({
  isOpen,
  onClose,
  title,
  appId,
  children,
}) => {
  const handleClose = () => {
    playWindowClose();
    onClose();
  };

  // Keyboard shortcut: Esc to close window
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          id={`window-overlay-${appId}`}
          className="fixed inset-0 z-40 flex items-center justify-center p-4 sm:p-6 md:p-8 pb-16 sm:pb-20"
        >
          {/* Subtly dimmed/blurred desktop backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            className="absolute inset-0 bg-[#493D40]/12 backdrop-blur-[2px]"
          />

          {/* Application Window Frame */}
          <motion.div
            id={`window-${appId}`}
            initial={{ opacity: 0, scale: 0.96, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl bg-[#FFFDF8] border border-[#E2D8DA] rounded-xl sm:rounded-2xl shadow-[0_24px_50px_rgba(73,61,64,0.12),0_4px_16px_rgba(73,61,64,0.06)] overflow-hidden z-10 flex flex-col max-h-[84vh]"
          >
            {/* Desktop Window Title Bar */}
            <div className="flex items-center justify-between px-4 sm:px-5 py-3 bg-[#FAF8F5]/95 border-b border-[#EFE8EA] select-none">
              {/* Window Controls: Close, Minimize, Maximize */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleClose}
                  onMouseEnter={playClick}
                  title="Close Window"
                  className="w-3 h-3 rounded-full bg-[#E9A6B5] hover:bg-[#D47F95] border border-[#D47F95]/60 transition-colors flex items-center justify-center cursor-pointer group"
                >
                  <span className="opacity-0 group-hover:opacity-100 text-[8px] leading-none text-[#FFFDF8] font-bold">
                    ×
                  </span>
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  title="Minimize"
                  className="w-3 h-3 rounded-full bg-[#FCE8BD] border border-[#E2B755]/60 cursor-pointer"
                />
                <span
                  title="Maximize"
                  className="w-3 h-3 rounded-full bg-[#DDE8D7] border border-[#ADC5A3]/60 cursor-default"
                />
              </div>

              {/* Title & App Icon */}
              <div className="flex items-center gap-2 px-2 truncate max-w-[200px] sm:max-w-sm">
                <div className="w-4 h-4 flex-shrink-0 opacity-80">
                  <DesktopIcon id={appId} className="w-full h-full" isUnlocked={true} />
                </div>
                <span className="text-xs font-semibold tracking-wider text-[#493D40] font-mono truncate">
                  {title}
                </span>
              </div>

              {/* Close Button on Right */}
              <button
                id={`close-window-${appId}`}
                onClick={handleClose}
                onMouseEnter={playClick}
                aria-label="Close window"
                title="Close (Esc)"
                className="w-7 h-7 rounded-md flex items-center justify-center text-[#8E7B80] hover:text-[#493D40] hover:bg-[#EFE8EA] active:scale-95 transition-all cursor-pointer"
              >
                <X size={15} />
              </button>
            </div>

            {/* Window Content */}
            <div className="p-6 sm:p-8 overflow-y-auto flex-1 bg-[#FFFDF8]">
              {children}
            </div>

            {/* Window Status Bar */}
            <div className="px-4 py-1.5 bg-[#FAF8F5]/90 border-t border-[#EFE8EA] text-[10px] font-mono text-[#8E7B80] flex justify-between items-center select-none">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D47F95]/70" />
                Aisha OS • {appId}
              </span>
              <div className="flex items-center gap-1 opacity-40">
                <span className="w-1 h-1 rounded-full bg-[#8E7B80]" />
                <span className="w-1 h-1 rounded-full bg-[#8E7B80]" />
                <span className="w-1 h-1 rounded-full bg-[#8E7B80]" />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
