import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wifi, WifiOff, Volume2, VolumeX, BatteryCharging, Lock, Calendar as CalendarIcon, Heart } from 'lucide-react';
import { AppId, AppMetadata } from '../types';
import { DesktopIcon } from './DesktopIcons';
import { WindowFrame } from './WindowFrame';
import { Sparkle, TinyHeart, DoodleStar, HandDrawnBow } from './Ornaments';
import {
  playClick,
  playWindowOpen,
  playWindowClose,
  playChime,
  toggleMute,
  getIsMuted,
} from '../utils/audio';

import { CuteApp } from './apps/CuteApp';
import { HibiscusApp } from './apps/HibiscusApp';
import { DrinksApp } from './apps/DrinksApp';
import { FoodApp } from './apps/FoodApp';
import { MedicineApp } from './apps/MedicineApp';
import { WeatherApp } from './apps/WeatherApp';
import { DimplesApp } from './apps/DimplesApp';
import { TravelApp } from './apps/TravelApp';
import { MirrorApp } from './apps/MirrorApp';
import { SevenTwentyApp, checkIsSevenTwentyUnlocked } from './apps/SevenTwentyApp';

interface DesktopProps {
  onReturnHome: () => void;
}

const APPS: AppMetadata[] = [
  { id: 'cute', label: 'cute.exe', iconName: 'bow', windowTitle: 'cute.exe — analysis' },
  { id: 'hibiscus', label: 'hibiscus', iconName: 'flower', windowTitle: 'hibiscus' },
  { id: 'drinks', label: 'drinks', iconName: 'coffee', windowTitle: 'drinks' },
  { id: 'food', label: 'food', iconName: 'dish', windowTitle: 'food' },
  { id: 'medicine', label: 'medicine', iconName: 'stethoscope', windowTitle: 'medicine' },
  { id: 'weather', label: 'weather', iconName: 'cloud', windowTitle: "today's weather" },
  { id: 'dimples', label: 'dimples', iconName: 'face', windowTitle: 'dimples' },
  { id: 'travel', label: 'travel', iconName: 'plane', windowTitle: 'travel mode' },
  { id: 'mirror', label: 'mirror', iconName: 'mirror', windowTitle: 'mirror' },
  { id: 'seventwenty', label: '7:20', iconName: 'clock', windowTitle: '7:20' },
];

export const Desktop: React.FC<DesktopProps> = ({ onReturnHome }) => {
  const [activeApp, setActiveApp] = useState<AppId | null>(null);
  const [selectedApp, setSelectedApp] = useState<AppId | null>(null);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [muted, setMutedState] = useState<boolean>(() => getIsMuted());

  // System Tray popover states
  const [isWifiMenuOpen, setIsWifiMenuOpen] = useState<boolean>(false);
  const [isWifiConnected, setIsWifiConnected] = useState<boolean>(true);
  const [isBatteryMenuOpen, setIsBatteryMenuOpen] = useState<boolean>(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

  // Check URL param ?previewTime=... for easy developer/evaluator verification without system clock hacks
  const searchParams = useMemo(() => {
    if (typeof window !== 'undefined') {
      return new URLSearchParams(window.location.search);
    }
    return new URLSearchParams();
  }, []);

  // Update clock every second
  useEffect(() => {
    const interval = setInterval(() => {
      const urlTimeParam = searchParams.get('previewTime') || searchParams.get('time');
      if (urlTimeParam) {
        // Can simulate time progressing from specified parameter
        const parsed = new Date(urlTimeParam);
        if (!isNaN(parsed.getTime())) {
          setCurrentTime(parsed);
          return;
        }
      }
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, [searchParams]);

  // Determine if 7:20 is unlocked based on actual system date and time
  const isSevenTwentyUnlocked = useMemo(() => {
    return checkIsSevenTwentyUnlocked(currentTime);
  }, [currentTime]);

  // Automatic relock rule:
  // At exactly 9:20 PM: if the special scene is open, close it, return to normal desktop
  useEffect(() => {
    if (activeApp === 'seventwenty' && !isSevenTwentyUnlocked) {
      // Check if it's October 13, 2026 after 9:20 PM
      const year = currentTime.getFullYear();
      const month = currentTime.getMonth();
      const date = currentTime.getDate();
      const hours = currentTime.getHours();
      const minutes = currentTime.getMinutes();

      if (year === 2026 && month === 9 && date === 13) {
        if (hours > 21 || (hours === 21 && minutes >= 20)) {
          setActiveApp(null);
        }
      }
    }
  }, [currentTime, isSevenTwentyUnlocked, activeApp]);

  // Format system time for taskbar in 12-hour clock format (e.g. 7:20:00 PM)
  const formattedTime = useMemo(() => {
    return currentTime.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  }, [currentTime]);

  const formattedDate = useMemo(() => {
    return currentTime.toLocaleDateString([], {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  }, [currentTime]);

  const handleOpenApp = (id: AppId) => {
    playWindowOpen();
    setSelectedApp(id);
    setActiveApp(id);
    setIsWifiMenuOpen(false);
    setIsBatteryMenuOpen(false);
    setIsCalendarOpen(false);
  };

  const handleCloseApp = () => {
    playWindowClose();
    setActiveApp(null);
  };

  const handleHomeClick = () => {
    playChime();
    onReturnHome();
  };

  const handleToggleSound = () => {
    const newMuted = toggleMute();
    setMutedState(newMuted);
    if (!newMuted) {
      playClick();
    }
  };

  const currentAppMeta = APPS.find((a) => a.id === activeApp);

  return (
    <div
      id="desktop-container"
      onClick={() => {
        setSelectedApp(null);
        setIsWifiMenuOpen(false);
        setIsBatteryMenuOpen(false);
        setIsCalendarOpen(false);
      }}
      className="h-screen w-screen relative overflow-hidden bg-[#FAF7F2] bg-grain select-none flex flex-col justify-between"
    >
      {/* ━━━━━━━━━━━━━━━━━━━━ WALLPAPER LAYER ━━━━━━━━━━━━━━━━━━━━ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Extremely subtle ambient warm gradient */}
        <div className="absolute inset-0 bg-radial-[at_40%_30%] from-[#FFFDF9] via-[#FAF7F2] to-[#F5EFEB] opacity-90" />

        {/* Delicate desktop micro-grid texture for OS screen depth */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `radial-gradient(#493D40 0.75px, transparent 0.75px)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* Ambient atmospheric lighting blobs with slow, peaceful drift */}
        <motion.div
          animate={{
            scale: [1, 1.06, 1],
            opacity: [0.12, 0.2, 0.12],
            x: [0, 8, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 16,
            ease: 'easeInOut',
          }}
          className="absolute -top-32 -left-20 w-[420px] h-[420px] rounded-full bg-[#FAF0F3] blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.1, 0.16, 0.1],
            y: [0, -10, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 18,
            ease: 'easeInOut',
            delay: 2,
          }}
          className="absolute -bottom-24 right-1/4 w-[480px] h-[480px] rounded-full bg-[#F7EDF0] blur-3xl"
        />

        {/* Sparse illustrated desktop ornaments with gentle ambient breathing */}
        <div className="absolute top-[22%] right-[28%] opacity-20">
          <Sparkle size={15} color="#D47F95" />
        </div>
        <div className="absolute top-[38%] right-[18%] opacity-15">
          <DoodleStar size={18} color="#D47F95" />
        </div>
        <div className="absolute bottom-[28%] right-[36%] opacity-15">
          <TinyHeart size={13} color="#E9A6B5" />
        </div>
        <div className="absolute top-[14%] right-[12%] opacity-15">
          <HandDrawnBow size={18} color="#D47F95" />
        </div>

        {/* Subtle personalized wallpaper watermark typography */}
        <div className="absolute right-8 sm:right-14 bottom-16 sm:bottom-20 pointer-events-none select-none text-right opacity-25">
          <div className="font-serif text-3xl sm:text-5xl text-[#493D40]/75 tracking-tight font-normal">
            aisha
          </div>
          <div className="font-mono text-[10px] sm:text-xs tracking-[0.26em] text-[#8E7B80] uppercase mt-1">
            sweet sixteen • aisha os
          </div>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━ MAIN DESKTOP SURFACE ━━━━━━━━━━━━━━━━━━━━ */}
      <main
        id="desktop-main-area"
        className="relative z-10 flex-1 w-full h-full p-5 sm:p-8 md:p-10 pb-16 sm:pb-20 overflow-hidden flex flex-col justify-start items-start"
      >
        {/* Desktop Shortcuts - Real OS Column Arrangement with breathing room */}
        <div
          id="desktop-shortcuts-area"
          onClick={(e) => e.stopPropagation()}
          className="grid grid-flow-col grid-rows-5 gap-x-5 sm:gap-x-8 md:gap-x-10 gap-y-3 sm:gap-y-4 w-fit select-none"
        >
          {APPS.map((app, index) => {
            const isSelected = selectedApp === app.id;
            // Column 2 items have a very slight natural vertical offset for handcrafted organic desktop feel
            const isColumn2 = index >= 5;

            return (
              <div
                key={app.id}
                id={`desktop-app-${app.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedApp(app.id);
                  handleOpenApp(app.id);
                }}
                onMouseEnter={() => {
                  playClick();
                }}
                className={`group w-22 sm:w-24 p-2 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all duration-150 select-none ${
                  isColumn2 ? 'mt-0.5' : ''
                } ${
                  isSelected
                    ? 'bg-[#E9A6B5]/22 border border-[#D47F95]/40 shadow-2xs'
                    : 'bg-transparent border border-transparent hover:bg-[#493D40]/[0.035] hover:border-[#493D40]/10'
                } active:scale-[0.97]`}
              >
                {/* Illustrated icon sitting directly on the desktop surface */}
                <div className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center transition-transform duration-150 group-hover:-translate-y-0.5 group-active:translate-y-0 drop-shadow-[0_2px_4px_rgba(73,61,64,0.06)]">
                  <DesktopIcon
                    id={app.id}
                    className="w-full h-full"
                    isUnlocked={app.id === 'seventwenty' ? isSevenTwentyUnlocked : true}
                  />
                </div>

                {/* Small application name underneath - direct typography on desktop */}
                <span
                  className={`mt-1.5 text-[11px] sm:text-xs font-mono text-center leading-tight tracking-tight px-1 rounded truncate max-w-full ${
                    isSelected
                      ? 'text-[#493D40] font-semibold bg-[#D47F95]/15'
                      : 'text-[#493D40] font-medium group-hover:text-[#D47F95]'
                  }`}
                >
                  {app.label}
                </span>
              </div>
            );
          })}
        </div>
      </main>

      {/* ━━━━━━━━━━━━━━━━━━━━ TASKBAR / DOCK ━━━━━━━━━━━━━━━━━━━━ */}
      <footer
        id="desktop-taskbar"
        onClick={(e) => e.stopPropagation()}
        className="fixed bottom-0 left-0 right-0 w-full h-11 sm:h-12 bg-[#FFFDF8]/85 backdrop-blur-md border-t border-[#EFE8EA]/90 z-30 flex items-center justify-between px-3 sm:px-4 select-none shadow-[0_-2px_12px_rgba(73,61,64,0.03)]"
      >
        {/* Left Side: Start / OS Identity */}
        <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
          {/* Start / Home Button */}
          <button
            id="taskbar-home-btn"
            onClick={handleHomeClick}
            onMouseEnter={playClick}
            title="Return to Welcome Screen"
            aria-label="Return to Welcome Screen"
            className="h-8 px-2 sm:px-2.5 rounded-md bg-[#FFFDF8] hover:bg-[#FAF8F5] border border-[#E9A6B5]/60 hover:border-[#D47F95] active:scale-95 text-[#493D40] hover:text-[#D47F95] flex items-center gap-1.5 text-xs font-mono font-medium transition-all shadow-2xs cursor-pointer"
          >
            <span className="text-sm leading-none font-bold text-[#D47F95]">⌂</span>
            <span className="hidden sm:inline">Start</span>
          </button>

          <div className="h-4 w-px bg-[#EFE8EA]" />

          {/* OS Branding */}
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-xs sm:text-[13px] text-[#493D40] tracking-wider font-mono">
              AISHA OS
            </span>
            <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-[#FAF8F5] border border-[#EFE8EA] text-[#D47F95]">
              16.0
            </span>
          </div>
        </div>

        {/* Center: Running Application Task Area */}
        <div className="flex-1 flex items-center justify-center sm:justify-start px-2 sm:px-4 min-w-0">
          {activeApp ? (
            <button
              onClick={() => {
                playClick();
              }}
              title={`Active Window: ${currentAppMeta?.windowTitle}`}
              className="flex items-center gap-2 px-3 py-1 rounded-md bg-[#FAF8F5] border border-[#E9A6B5]/70 shadow-2xs relative text-xs font-mono font-medium text-[#493D40] max-w-[200px] sm:max-w-xs truncate cursor-pointer active:scale-98 transition-all"
            >
              <div className="w-3.5 h-3.5 flex-shrink-0">
                <DesktopIcon id={activeApp} className="w-full h-full" isUnlocked={true} />
              </div>
              <span className="truncate">{currentAppMeta?.label}</span>
              {/* Active task indicator notch */}
              <span className="absolute -bottom-1 left-2.5 right-2.5 h-[2px] bg-[#D47F95] rounded-full" />
            </button>
          ) : (
            <div className="hidden lg:flex items-center gap-2 text-[11px] font-mono text-[#8E7B80]/60 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-[#96B88F]" />
              <span>system ready • 10 shortcuts</span>
            </div>
          )}
        </div>

        {/* Right Side: System Tray & Clock */}
        <div className="flex items-center gap-2.5 sm:gap-4 text-xs text-[#8E7B80] flex-shrink-0">
          {/* System Status Indicators */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 text-[#8E7B80]">
            {/* Fake Wi-Fi Gimmick Button */}
            <button
              id="taskbar-wifi-btn"
              onClick={(e) => {
                e.stopPropagation();
                playClick();
                setIsWifiMenuOpen((prev) => !prev);
                setIsBatteryMenuOpen(false);
              }}
              title={isWifiConnected ? "Wi-Fi: Connected (AishaNet_5G) — Click for networks" : "Wi-Fi: Disconnected — Click to connect"}
              className={`p-1 sm:p-1.5 rounded-md transition-colors cursor-pointer flex items-center ${
                isWifiMenuOpen
                  ? 'bg-[#E9A6B5]/25 text-[#D47F95]'
                  : 'hover:bg-[#FAF8F5] text-[#493D40]'
              }`}
            >
              {isWifiConnected ? (
                <Wifi size={14} className="text-[#D47F95]" />
              ) : (
                <WifiOff size={14} className="text-[#8E7B80]/70" />
              )}
            </button>

            {/* Interactive Sound Toggle */}
            <button
              id="taskbar-sound-toggle"
              onClick={handleToggleSound}
              title={muted ? 'Sound Muted (click to enable)' : 'Sound Enabled (click to mute)'}
              className="p-1 rounded-md hover:bg-[#FAF8F5] hover:text-[#493D40] transition-colors cursor-pointer flex items-center"
            >
              {muted ? (
                <VolumeX size={14} className="text-[#8E7B80]" />
              ) : (
                <Volume2 size={14} className="text-[#D47F95]" />
              )}
            </button>

            {/* Battery Status & Percentage */}
            <button
              id="taskbar-battery-btn"
              onClick={(e) => {
                e.stopPropagation();
                playClick();
                setIsBatteryMenuOpen((prev) => !prev);
                setIsWifiMenuOpen(false);
              }}
              title="Battery: 100% (Sweet 16 Edition) — Click for power info"
              className={`px-1.5 py-1 rounded-md transition-colors flex items-center gap-1 cursor-pointer ${
                isBatteryMenuOpen
                  ? 'bg-[#E9A6B5]/25'
                  : 'hover:bg-[#FAF8F5]'
              }`}
            >
              <BatteryCharging size={14} className="text-[#D47F95] flex-shrink-0" />
              <span className="text-[11px] font-mono font-semibold text-[#493D40]">
                100%
              </span>
            </button>
          </div>

          <div className="h-4 w-px bg-[#EFE8EA]" />

          {/* Live System Time & Date (12-hour clock, click for interactive calendar) */}
          <button
            id="taskbar-system-time"
            onClick={(e) => {
              e.stopPropagation();
              playClick();
              setIsCalendarOpen((prev) => !prev);
              setIsWifiMenuOpen(false);
              setIsBatteryMenuOpen(false);
            }}
            title="Click to view Aisha OS Calendar"
            className={`flex flex-col sm:flex-row items-end sm:items-center sm:gap-2 font-mono text-xs font-medium px-2 py-1 rounded-md transition-colors cursor-pointer ${
              isCalendarOpen
                ? 'bg-[#E9A6B5]/25 text-[#493D40]'
                : 'hover:bg-[#FAF8F5] text-[#493D40]'
            }`}
          >
            <span className="font-semibold text-[#493D40] tracking-tight">{formattedTime}</span>
            <span className="hidden sm:inline text-[11px] text-[#8E7B80]">
              {formattedDate}
            </span>
          </button>
        </div>
      </footer>

      {/* ━━━━━━━━━━━━━━━━━━━━ FAKE WI-FI GIMMICK FLYOUT ━━━━━━━━━━━━━━━━━━━━ */}
      <AnimatePresence>
        {isWifiMenuOpen && (
          <motion.div
            id="wifi-flyout"
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="fixed bottom-13 sm:bottom-14 right-3 sm:right-24 z-40 w-72 sm:w-80 bg-[#FFFDF8] border border-[#E2D8DA] rounded-xl shadow-[0_16px_40px_rgba(73,61,64,0.14)] p-3.5 text-xs font-mono text-[#493D40] select-none"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[#EFE8EA]">
              <div className="flex items-center gap-2">
                <Wifi size={14} className="text-[#D47F95]" />
                <span className="font-semibold text-xs text-[#493D40]">Wi-Fi Network</span>
              </div>
              <button
                onClick={() => {
                  playClick();
                  setIsWifiConnected((prev) => !prev);
                }}
                className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors cursor-pointer ${
                  isWifiConnected
                    ? 'bg-[#E9A6B5]/25 text-[#493D40] border border-[#D47F95]/50'
                    : 'bg-[#FAF8F5] text-[#8E7B80] border border-[#EFE8EA]'
                }`}
              >
                {isWifiConnected ? 'Connected' : 'Turned Off'}
              </button>
            </div>

            {isWifiConnected ? (
              <div className="space-y-2.5">
                {/* Active Connected Network */}
                <div className="p-2.5 rounded-lg bg-[#FAF7F2] border border-[#E9A6B5]/50 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs flex items-center gap-1.5 text-[#493D40]">
                      <span className="w-2 h-2 rounded-full bg-[#96B88F] animate-pulse" />
                      AishaNet_5G
                    </span>
                    <span className="text-[10px] text-[#D47F95] font-semibold">100% Signal</span>
                  </div>
                  <div className="text-[10px] text-[#8E7B80] flex justify-between">
                    <span>Protocol: WPA3-Personal</span>
                    <span>IPv4: 16.10.20.26</span>
                  </div>
                  <div className="text-[10px] text-[#8E7B80]">
                    Speed: 1000 Mbps • Sweet Sixteen Band
                  </div>
                  <button
                    onClick={() => {
                      playClick();
                      setIsWifiConnected(false);
                    }}
                    className="mt-1 w-full py-1 rounded bg-[#FFFDF8] hover:bg-[#FAF8F5] border border-[#EFE8EA] text-[11px] text-[#D47F95] font-medium transition-colors cursor-pointer"
                  >
                    Disconnect
                  </button>
                </div>

                {/* Other Available Networks */}
                <div className="pt-0.5">
                  <div className="text-[10px] text-[#8E7B80] uppercase tracking-wider mb-1.5 px-0.5 font-semibold">
                    Available Networks
                  </div>
                  <div className="space-y-1">
                    {[
                      { name: 'ColdBrew_Lovers_5G', secured: true, strength: '95%' },
                      { name: 'Hibiscus_Garden_WiFi', secured: true, strength: '89%' },
                      { name: 'FutureDoctorAisha_Guest', secured: true, strength: '92%' },
                      { name: 'BirthdayBalloons_Free', secured: false, strength: '100%' },
                    ].map((network) => (
                      <div
                        key={network.name}
                        onClick={() => {
                          playClick();
                          setIsWifiConnected(true);
                        }}
                        className="flex items-center justify-between p-1.5 rounded hover:bg-[#FAF8F5] cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-1.5 truncate">
                          <Wifi size={12} className="text-[#8E7B80] flex-shrink-0" />
                          <span className="truncate text-[11px] text-[#493D40]">{network.name}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-[#8E7B80] flex-shrink-0">
                          {network.secured ? <Lock size={10} /> : <span className="text-[9px] text-[#96B88F]">Open</span>}
                          <span>{network.strength}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 text-center">
                <WifiOff size={22} className="mx-auto text-[#8E7B80] mb-2" />
                <p className="text-xs text-[#8E7B80] mb-2.5">Wi-Fi is currently disconnected.</p>
                <button
                  onClick={() => {
                    playClick();
                    setIsWifiConnected(true);
                  }}
                  className="px-3 py-1 rounded bg-[#FAF8F5] hover:bg-[#FAF0F3] border border-[#E9A6B5] text-[#D47F95] font-semibold text-xs transition-colors cursor-pointer"
                >
                  Turn On & Connect to AishaNet
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ━━━━━━━━━━━━━━━━━━━━ BATTERY GIMMICK FLYOUT ━━━━━━━━━━━━━━━━━━━━ */}
      <AnimatePresence>
        {isBatteryMenuOpen && (
          <motion.div
            id="battery-flyout"
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="fixed bottom-13 sm:bottom-14 right-2 sm:right-16 z-40 w-64 sm:w-72 bg-[#FFFDF8] border border-[#E2D8DA] rounded-xl shadow-[0_16px_40px_rgba(73,61,64,0.14)] p-3.5 text-xs font-mono text-[#493D40] select-none"
          >
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#EFE8EA]">
              <span className="font-semibold flex items-center gap-1.5 text-[#493D40]">
                <BatteryCharging size={14} className="text-[#D47F95]" />
                <span>Battery & Power</span>
              </span>
              <span className="text-[10px] font-bold text-[#D47F95] px-1.5 py-0.5 rounded bg-[#FAF0F3] border border-[#E9A6B5]/60">
                100% Charged
              </span>
            </div>

            <div className="space-y-2.5">
              <div className="p-2.5 rounded-lg bg-[#FAF7F2] border border-[#EFE8EA] flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[#8E7B80]">Power Status:</span>
                  <span className="font-semibold text-[11px] text-[#96B88F]">Sweet 16 Edition</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[#8E7B80]">Condition:</span>
                  <span className="font-semibold text-[11px] text-[#493D40]">Peak Performance</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[#8E7B80]">Remaining:</span>
                  <span className="font-semibold text-[11px] text-[#D47F95]">All Day Long</span>
                </div>
              </div>

              {/* Visual Progress Bar */}
              <div className="w-full bg-[#EFE8EA] rounded-full h-2 overflow-hidden">
                <div className="bg-[#D47F95] h-full rounded-full w-full" />
              </div>
              <p className="text-[10px] text-[#8E7B80] text-center pt-0.5">
                Cycle count: 16 • Battery health: 100%
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ━━━━━━━━━━━━━━━━━━━━ CALENDAR FLYOUT ━━━━━━━━━━━━━━━━━━━━ */}
      <AnimatePresence>
        {isCalendarOpen && (
          <motion.div
            id="calendar-flyout"
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="fixed bottom-13 sm:bottom-14 right-2 sm:right-4 z-40 w-76 sm:w-80 bg-[#FFFDF8] border border-[#E2D8DA] rounded-xl shadow-[0_16px_40px_rgba(73,61,64,0.14)] p-4 text-xs font-mono text-[#493D40] select-none"
          >
            {/* Header: Month & Sweet 16 highlight */}
            <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[#EFE8EA]">
              <div className="flex items-center gap-2">
                <CalendarIcon size={14} className="text-[#D47F95]" />
                <span className="font-semibold text-xs text-[#493D40]">October 2026</span>
              </div>
              <span className="text-[10px] font-bold text-[#D47F95] px-1.5 py-0.5 rounded bg-[#FAF0F3] border border-[#E9A6B5]/60 flex items-center gap-1">
                <Heart size={9} className="fill-[#D47F95]" />
                Aisha's Month
              </span>
            </div>

            {/* Days of the week header */}
            <div className="grid grid-cols-7 gap-1 text-center font-semibold text-[10px] text-[#8E7B80] mb-1.5">
              <span>Su</span>
              <span>Mo</span>
              <span>Tu</span>
              <span>We</span>
              <span>Th</span>
              <span>Fr</span>
              <span>Sa</span>
            </div>

            {/* October 2026 Calendar Grid (Oct 1 is Thursday -> 4 empty padding cells: Sun, Mon, Tue, Wed) */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {/* Previous month trailing days (padding) */}
              <span className="py-1 text-[#8E7B80]/30 text-[10px]">27</span>
              <span className="py-1 text-[#8E7B80]/30 text-[10px]">28</span>
              <span className="py-1 text-[#8E7B80]/30 text-[10px]">29</span>
              <span className="py-1 text-[#8E7B80]/30 text-[10px]">30</span>

              {/* October days 1 to 31 */}
              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                const isOct13 = day === 13;
                const isSelectedOrCurrent = currentTime.getDate() === day && currentTime.getMonth() === 9; // Month 9 is October (0-indexed)

                if (isOct13) {
                  return (
                    <div
                      key={day}
                      title="October 13: Aisha's 16th Birthday!"
                      className="relative py-1 rounded-md bg-[#FAF0F3] border border-[#E9A6B5] text-[#D47F95] font-bold flex flex-col items-center justify-center cursor-default shadow-2xs group"
                    >
                      <span className="leading-none">{day}</span>
                      <span className="absolute -top-1 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#D47F95]" />
                    </div>
                  );
                }

                return (
                  <div
                    key={day}
                    className={`py-1 rounded-md flex items-center justify-center transition-colors ${
                      isSelectedOrCurrent
                        ? 'bg-[#FAF8F5] border border-[#493D40]/30 font-semibold text-[#493D40]'
                        : 'text-[#493D40] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <span>{day}</span>
                  </div>
                );
              })}
            </div>

            {/* Special Birthday Note Banner inside Calendar */}
            <div className="mt-3 pt-2.5 border-t border-[#EFE8EA] flex items-center gap-2 text-[10px] text-[#8E7B80]">
              <div className="w-2 h-2 rounded-full bg-[#D47F95] flex-shrink-0" />
              <span className="leading-tight">
                <strong className="text-[#493D40]">Oct 13:</strong> Aisha's Sweet Sixteen ✨
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ━━━━━━━━━━━━━━━━━━━━ APPLICATION WINDOW OVERLAY ━━━━━━━━━━━━━━━━━━━━ */}
      <WindowFrame
        isOpen={activeApp !== null}
        onClose={handleCloseApp}
        title={currentAppMeta?.windowTitle || ''}
        appId={activeApp || 'cute'}
      >
        {activeApp === 'cute' && <CuteApp />}
        {activeApp === 'hibiscus' && <HibiscusApp />}
        {activeApp === 'drinks' && <DrinksApp />}
        {activeApp === 'food' && <FoodApp />}
        {activeApp === 'medicine' && <MedicineApp />}
        {activeApp === 'weather' && <WeatherApp />}
        {activeApp === 'dimples' && <DimplesApp />}
        {activeApp === 'travel' && <TravelApp />}
        {activeApp === 'mirror' && <MirrorApp />}
        {activeApp === 'seventwenty' && (
          <SevenTwentyApp
            isUnlocked={isSevenTwentyUnlocked}
            onAutoRelock={handleCloseApp}
          />
        )}
      </WindowFrame>
    </div>
  );
};
