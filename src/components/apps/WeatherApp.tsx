import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { playClick } from '../../utils/audio';

type WeatherState = 'sunny' | 'cloudy' | 'rainy' | 'stormy';

export const WeatherApp: React.FC = () => {
  const [currentWeather, setCurrentWeather] = useState<WeatherState>('sunny');

  useEffect(() => {
    const states: WeatherState[] = ['sunny', 'cloudy', 'rainy', 'stormy'];
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % states.length;
      setCurrentWeather(states[index]);
    }, 2400);

    return () => clearInterval(interval);
  }, []);

  const handleNextWeather = () => {
    playClick();
    const states: WeatherState[] = ['sunny', 'cloudy', 'rainy', 'stormy'];
    const currentIndex = states.indexOf(currentWeather);
    const nextIndex = (currentIndex + 1) % states.length;
    setCurrentWeather(states[nextIndex]);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
      {/* Dynamic weather environment container */}
      <div
        onClick={handleNextWeather}
        title="Click to cycle weather"
        className={`w-full h-36 rounded-2xl border transition-colors duration-700 flex flex-col items-center justify-center relative overflow-hidden mb-6 cursor-pointer select-none group ${
          currentWeather === 'sunny'
            ? 'bg-[#FFFDF8] border-[#EFE8EA]'
            : currentWeather === 'cloudy'
            ? 'bg-[#FAF8F5] border-[#EFE8EA]'
            : currentWeather === 'rainy'
            ? 'bg-[#F4F7F9] border-[#D6E0E6]'
            : 'bg-[#ECEEF0] border-[#C8CFD4]'
        }`}
      >
        {/* Weather state visual */}
        <AnimatePresence mode="wait">
          {currentWeather === 'sunny' && (
            <motion.div
              key="sunny"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 16, ease: 'linear' }}
                  className="w-14 h-14 rounded-full border-2 border-dashed border-[#F0C987] flex items-center justify-center"
                />
                <div className="w-10 h-10 rounded-full bg-[#FFFDF8] border-2 border-[#E8B042] absolute top-2 left-2 flex items-center justify-center text-lg">
                  ☀️
                </div>
              </div>
              <span className="text-xs font-semibold text-[#8E7B80] mt-2 font-mono">sunny</span>
            </motion.div>
          )}

          {currentWeather === 'cloudy' && (
            <motion.div
              key="cloudy"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 20, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center"
            >
              <div className="text-4xl">☁️</div>
              <span className="text-xs font-semibold text-[#8E7B80] mt-2 font-mono">partly cloudy</span>
            </motion.div>
          )}

          {currentWeather === 'rainy' && (
            <motion.div
              key="rainy"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center"
            >
              <div className="text-4xl">🌧️</div>
              {/* Rain lines */}
              <div className="flex gap-2 text-xs text-[#7FA6C2] font-mono mt-0.5">
                <span className="animate-pulse">/</span>
                <span className="animate-pulse delay-75">/</span>
                <span className="animate-pulse delay-150">/</span>
              </div>
              <span className="text-xs font-semibold text-[#8E7B80] mt-1 font-mono">rainy</span>
            </motion.div>
          )}

          {currentWeather === 'stormy' && (
            <motion.div
              key="stormy"
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center"
            >
              <div className="text-4xl">⛈️</div>
              <span className="text-xs font-semibold text-[#493D40] mt-2 font-mono">stormy</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* State indicator dots */}
        <div className="absolute bottom-2 flex gap-1.5">
          {(['sunny', 'cloudy', 'rainy', 'stormy'] as WeatherState[]).map((st) => (
            <div
              key={st}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                currentWeather === st ? 'bg-[#493D40] w-3' : 'bg-[#8E7B80]/40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Copy */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold tracking-widest text-[#8E7B80] uppercase font-mono">
          TODAY&apos;S WEATHER
        </h3>

        <div className="space-y-1.5 text-base sm:text-lg font-sans text-[#493D40]">
          <div>
            <span className="text-[#8E7B80]">currently:</span>{' '}
            <span className="font-serif font-medium text-lg sm:text-xl text-[#493D40]">Aisha</span>
          </div>
          <div>
            <span className="text-[#8E7B80]">temperature:</span>{' '}
            <span className="font-medium">unpredictable</span>
          </div>
          <div>
            <span className="text-[#8E7B80]">conditions:</span>{' '}
            <span className="font-medium">changing rapidly</span>
          </div>
          <div className="pt-1 text-sm sm:text-base text-[#493D40] font-medium">
            forecast: genuinely impossible to tell
          </div>
        </div>
      </div>
    </div>
  );
};
