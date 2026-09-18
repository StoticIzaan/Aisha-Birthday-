import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { ScreenType } from './types';
import { Screen1 } from './components/Screen1';
import { Screen2 } from './components/Screen2';
import { Desktop } from './components/Desktop';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('screen1');

  const goToScreen2 = () => {
    setCurrentScreen('screen2');
  };

  const goToDesktop = () => {
    setCurrentScreen('desktop');
  };

  const returnToScreen1 = () => {
    setCurrentScreen('screen1');
  };

  return (
    <div className="w-full min-h-screen bg-[#FFFDF8] text-[#493D40] selection:bg-[#F8DDE4]/50 selection:text-[#493D40]">
      <AnimatePresence mode="wait">
        {currentScreen === 'screen1' && (
          <Screen1 key="screen1" onNext={goToScreen2} />
        )}
        {currentScreen === 'screen2' && (
          <Screen2 key="screen2" onEnter={goToDesktop} />
        )}
        {currentScreen === 'desktop' && (
          <Desktop key="desktop" onReturnHome={returnToScreen1} />
        )}
      </AnimatePresence>
    </div>
  );
}
