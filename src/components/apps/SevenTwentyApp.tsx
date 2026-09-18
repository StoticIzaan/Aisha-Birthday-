import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkle, TinyHeart } from '../Ornaments';
import { playClockUnlockChime } from '../../utils/audio';

/**
 * Checks if the system time falls within the 7:20 active window:
 * Every day between 7:20 PM (19:20:00) and 9:20 PM (21:20:00)
 */
export const checkIsSevenTwentyUnlocked = (dateInput?: Date): boolean => {
  let now = dateInput || new Date();

  // Support ?previewTime or ?time URL query parameter for testing/previewing without changing system clock
  if (!dateInput && typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const testTime = params.get('previewTime') || params.get('time');

    if (testTime) {
      const parsed = new Date(testTime);

      if (!isNaN(parsed.getTime())) {
        now = parsed;
      }
    }
  }

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const totalSeconds =
    hours * 3600 +
    minutes * 60 +
    seconds;

  const startSeconds = 19 * 3600 + 20 * 60; // 19:20:00 (7:20 PM)
  const endSeconds = 21 * 3600 + 20 * 60; // 21:20:00 (9:20 PM)

  return (
    totalSeconds >= startSeconds &&
    totalSeconds < endSeconds
  );
};

interface SevenTwentyAppProps {
  isUnlocked?: boolean;
  onAutoRelock?: () => void;
}

export const SevenTwentyApp: React.FC<SevenTwentyAppProps> = ({
  isUnlocked: propIsUnlocked,
  onAutoRelock,
}) => {
  // Live dynamic time state inside SevenTwentyApp
  const [currentDate, setCurrentDate] = useState<Date>(
    () => new Date()
  );

  const [handsSettled, setHandsSettled] = useState(false);

  // Dynamic interval to check the system clock every 500ms
  useEffect(() => {
    const updateTick = () => {
      let now = new Date();

      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(
          window.location.search
        );

        const testTime =
          params.get('previewTime') || params.get('time');

        if (testTime) {
          const parsed = new Date(testTime);

          if (!isNaN(parsed.getTime())) {
            now = parsed;
          }
        }
      }

      setCurrentDate(now);
    };

    updateTick();

    const timer = setInterval(updateTick, 500);

    return () => clearInterval(timer);
  }, []);

  // Compute unlocked state directly from current dynamic system time
  const isUnlocked = useMemo(() => {
    if (typeof propIsUnlocked === 'boolean') {
      return propIsUnlocked;
    }

    return checkIsSevenTwentyUnlocked(currentDate);
  }, [propIsUnlocked, currentDate]);

  // Track the previous unlock state.
  // This ensures the window only auto-closes when it actually
  // transitions from unlocked -> locked.
  //
  // IMPORTANT:
  // If the user opens the app AFTER 9:20, both the previous
  // state and current state are locked, so the locked message
  // stays visible instead of immediately closing.
  const previousUnlockedRef = React.useRef(isUnlocked);

  useEffect(() => {
    if (previousUnlockedRef.current && !isUnlocked) {
      if (onAutoRelock) {
        onAutoRelock();
      }
    }

    previousUnlockedRef.current = isUnlocked;
  }, [isUnlocked, onAutoRelock]);

  // Settle clock hands once unlocked
  useEffect(() => {
    if (isUnlocked) {
      playClockUnlockChime();

      const timer = setTimeout(() => {
        setHandsSettled(true);
      }, 700);

      return () => clearTimeout(timer);
    } else {
      setHandsSettled(false);
    }
  }, [isUnlocked]);

  return (
    <AnimatePresence mode="wait">
      {!isUnlocked ? (
        /* LOCKED STATE: Before 7:20 PM or after 9:20 PM */
        <motion.div
          key="locked"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center justify-center p-8 text-center max-w-sm mx-auto"
        >
          {/* Subtle lock illustration */}
          <div className="w-16 h-16 rounded-full bg-[#FAF8F5] border border-[#EFE8EA] flex items-center justify-center mb-6 shadow-2xs">
            <svg
              viewBox="0 0 24 24"
              className="w-8 h-8"
              fill="none"
            >
              <rect
                x="4"
                y="10"
                width="16"
                height="11"
                rx="2.5"
                fill="#FFFDF8"
                stroke="#493D40"
                strokeWidth="1.8"
              />

              <path
                d="M8 10V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V10"
                stroke="#493D40"
                strokeWidth="1.8"
                strokeLinecap="round"
              />

              <circle
                cx="12"
                cy="15"
                r="1.5"
                fill="#493D40"
              />
            </svg>
          </div>

          <div className="space-y-2 text-[#493D40]">
            <p className="font-serif text-xl sm:text-2xl font-normal text-[#493D40]">
              not yet
            </p>

            <p className="text-sm sm:text-base text-[#8E7B80] font-normal font-sans">
              come back at 7:20
            </p>
          </div>
        </motion.div>
      ) : (
        /* UNLOCKED SPECIAL SCENE: Every day, 7:20 PM - 9:20 PM */
        <motion.div
          key="unlocked"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          transition={{
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="flex flex-col items-center justify-center p-6 sm:p-10 text-center max-w-lg mx-auto relative"
        >
          {/* Floating subtle celebratory accents */}
          <div className="absolute top-4 left-6 pointer-events-none opacity-30">
            <Sparkle size={18} color="#D47F95" />
          </div>

          <div className="absolute top-6 right-8 pointer-events-none opacity-30">
            <TinyHeart size={16} color="#E9A6B5" />
          </div>

          <div className="absolute bottom-6 left-10 pointer-events-none opacity-25">
            <Sparkle size={14} color="#D47F95" />
          </div>

          <div className="absolute bottom-8 right-12 pointer-events-none opacity-25">
            <TinyHeart size={14} color="#E9A6B5" />
          </div>

          {/* Expanded Analog Clock */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative w-48 h-48 sm:w-56 sm:h-56 mb-8 flex items-center justify-center"
          >
            {/* Warm subtle halo glow */}
            <div className="absolute inset-0 rounded-full bg-[#FAF0F3]/30 blur-xl scale-110 pointer-events-none" />

            <svg
              viewBox="0 0 200 200"
              className="w-full h-full relative z-10"
              fill="none"
            >
              {/* Clock Outer Rim */}
              <circle
                cx="100"
                cy="100"
                r="92"
                fill="#FFFDF8"
                stroke="#493D40"
                strokeWidth="2.8"
              />

              <circle
                cx="100"
                cy="100"
                r="84"
                fill="none"
                stroke="#EFE8EA"
                strokeWidth="1.5"
              />

              {/* 12 Hour Ticks */}
              {Array.from({ length: 12 }).map((_, i) => {
                const angle =
                  (i * 30 * Math.PI) / 180;

                const isQuarter = i % 3 === 0;

                const rOuter = 82;
                const rInner = isQuarter ? 68 : 74;

                const x1 =
                  100 +
                  rOuter * Math.sin(angle);

                const y1 =
                  100 -
                  rOuter * Math.cos(angle);

                const x2 =
                  100 +
                  rInner * Math.sin(angle);

                const y2 =
                  100 -
                  rInner * Math.cos(angle);

                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={
                      isQuarter
                        ? '#493D40'
                        : '#8E7B80'
                    }
                    strokeWidth={
                      isQuarter ? 2.5 : 1.5
                    }
                    strokeLinecap="round"
                  />
                );
              })}

              {/* Subtle Numbers 12, 3, 6, 9 */}
              <text
                x="100"
                y="44"
                textAnchor="middle"
                fill="#493D40"
                fontSize="13"
                fontFamily="Lora, serif"
                fontWeight="500"
              >
                12
              </text>

              <text
                x="162"
                y="104"
                textAnchor="middle"
                fill="#493D40"
                fontSize="13"
                fontFamily="Lora, serif"
                fontWeight="500"
              >
                3
              </text>

              <text
                x="100"
                y="166"
                textAnchor="middle"
                fill="#493D40"
                fontSize="13"
                fontFamily="Lora, serif"
                fontWeight="500"
              >
                6
              </text>

              <text
                x="38"
                y="104"
                textAnchor="middle"
                fill="#493D40"
                fontSize="13"
                fontFamily="Lora, serif"
                fontWeight="500"
              >
                9
              </text>

              {/* Hour Hand: precisely points to 7 at 7:20 */}
              <motion.line
                x1="100"
                y1="100"
                x2="100"
                y2="54"
                stroke="#493D40"
                strokeWidth="3.5"
                strokeLinecap="round"
                initial={{
                  x2: 100,
                  y2: 54,
                }}
                animate={{
                  x2: 70,
                  y2: 135,
                }}
                transition={{
                  duration: 1.4,
                  ease: [0.34, 1.3, 0.64, 1],
                }}
              />

              {/* Minute Hand: precisely points to 4 at 20 minutes */}
              <motion.line
                x1="100"
                y1="100"
                x2="100"
                y2="34"
                stroke="#D47F95"
                strokeWidth="2.6"
                strokeLinecap="round"
                initial={{
                  x2: 100,
                  y2: 34,
                }}
                animate={{
                  x2: 157,
                  y2: 133,
                }}
                transition={{
                  duration: 1.7,
                  ease: [0.34, 1.3, 0.64, 1],
                }}
              />

              {/* Center Pivot */}
              <circle
                cx="100"
                cy="100"
                r="5"
                fill="#D47F95"
              />

              <circle
                cx="100"
                cy="100"
                r="2"
                fill="#FFFDF8"
              />
            </svg>
          </motion.div>

          {/* Special Scene Text */}
          <motion.div
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: handsSettled ? 1 : 0,
              y: handsSettled ? 0 : 12,
            }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h2 className="text-3xl sm:text-4xl font-serif text-[#493D40] font-normal">
              7:20 PM
            </h2>

            <p className="text-base sm:text-lg text-[#8E7B80] font-normal font-sans">
              the exact minute you entered the world
            </p>

            <p className="text-lg sm:text-xl font-serif text-[#D47F95] font-medium pt-2">
              happy birthday, Aisha 🎀
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};