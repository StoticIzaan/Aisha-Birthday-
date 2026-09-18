import React from 'react';
import { AppId } from '../types';

interface IconProps {
  id: AppId;
  className?: string;
  isUnlocked?: boolean;
}

export const DesktopIcon: React.FC<IconProps> = ({ id, className = 'w-12 h-12', isUnlocked = false }) => {
  switch (id) {
    case 'cute':
      // Bow icon
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Left loop */}
          <path
            d="M30 32C24 24 14 26 15 34C16 42 27 38 30 33"
            fill="#FAF0F3"
            stroke="#D47F95"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path d="M22 30C20 32 20 35 23 35" stroke="#E9A6B5" strokeWidth="1.6" strokeLinecap="round" />
          {/* Right loop */}
          <path
            d="M34 32C40 24 50 26 49 34C48 42 37 38 34 33"
            fill="#FAF0F3"
            stroke="#D47F95"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path d="M42 30C44 32 44 35 41 35" stroke="#E9A6B5" strokeWidth="1.6" strokeLinecap="round" />
          {/* Tails */}
          <path
            d="M30 34C28 38 23 44 20 46"
            stroke="#D47F95"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M34 34C36 38 41 44 44 46"
            stroke="#D47F95"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Knot */}
          <circle cx="32" cy="32" r="4.8" fill="#E9A6B5" stroke="#D47F95" strokeWidth="2" />
          <path d="M31 31A1 1 0 0 1 33 33" stroke="#FFFDF8" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );

    case 'hibiscus':
      // Hibiscus flower icon
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Petals */}
          <path
            d="M32 30C28 18 36 14 40 18C44 22 36 29 32 30Z"
            fill="#FAF0F3"
            stroke="#D47F95"
            strokeWidth="1.8"
          />
          <path
            d="M33 31C44 24 49 31 46 36C43 41 35 34 33 31Z"
            fill="#FAF0F3"
            stroke="#D47F95"
            strokeWidth="1.8"
          />
          <path
            d="M31 32C36 43 28 48 24 45C20 42 27 34 31 32Z"
            fill="#FAF0F3"
            stroke="#D47F95"
            strokeWidth="1.8"
          />
          <path
            d="M30 31C20 35 15 28 19 24C23 20 28 28 30 31Z"
            fill="#FAF0F3"
            stroke="#D47F95"
            strokeWidth="1.8"
          />
          <path
            d="M31 29C23 21 28 14 34 16C37 18 32 27 31 29Z"
            fill="#FAF0F3"
            stroke="#D47F95"
            strokeWidth="1.8"
          />
          {/* Stamen/pistil */}
          <path d="M31 31C33 25 39 19 44 15" stroke="#D47F95" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="44" cy="15" r="1.8" fill="#E9A6B5" />
          <circle cx="42" cy="18" r="1.4" fill="#E9A6B5" />
          <circle cx="39" cy="21" r="1.4" fill="#E9A6B5" />
          <circle cx="32" cy="32" r="2.8" fill="#D47F95" />
        </svg>
      );

    case 'drinks':
      // Cold coffee drink cup with subtle realistic beverage tones
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Straw */}
          <path d="M35 16L39 10H43" stroke="#8E7B80" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          {/* Cup outline */}
          <path
            d="M23 22H41L38 48C38 49.5 36.8 50.5 35.3 50.5H28.7C27.2 50.5 26 49.5 26 48L23 22Z"
            fill="#FAF8F5"
            stroke="#493D40"
            strokeWidth="1.8"
          />
          {/* Coffee liquid */}
          <path
            d="M24.5 29H39.5L37.8 47.5C37.8 48.3 37.1 49 36.3 49H27.7C26.9 49 26.2 48.3 26.2 47.5L24.5 29Z"
            fill="#A6836F"
            fillOpacity="0.85"
          />
          {/* Cup lid rim */}
          <path d="M21 22C21 21 22 20 23 20H41C42 20 43 21 43 22H21Z" fill="#FFFDF8" stroke="#493D40" strokeWidth="1.8" />
          {/* Ice cube / bubbles */}
          <rect x="29" y="33" width="6" height="6" rx="1.5" fill="#FFFDF8" fillOpacity="0.8" stroke="#FAF8F5" strokeWidth="1" />
          <circle cx="28" cy="43" r="1.5" fill="#FFFDF8" fillOpacity="0.8" />
          <circle cx="35" cy="42" r="1.2" fill="#FFFDF8" fillOpacity="0.8" />
        </svg>
      );

    case 'food':
      // Serving dish with lid handle
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Platter base */}
          <path d="M16 43H48C49.5 43 50 44 49 45C47 47 43 47.5 32 47.5C21 47.5 17 47 15 45C14 44 14.5 43 16 43Z" fill="#FAF8F5" stroke="#493D40" strokeWidth="1.8" />
          {/* Cloche Dome */}
          <path
            d="M20 42C20 28 26 23 32 23C38 23 44 28 44 42H20Z"
            fill="#FFFDF8"
            stroke="#493D40"
            strokeWidth="1.8"
          />
          {/* Cloche handle */}
          <path d="M30 23C30 20 34 20 34 23" stroke="#493D40" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="32" cy="19.5" r="2.2" fill="#D47F95" stroke="#493D40" strokeWidth="1.4" />
          {/* Subtle steam */}
          <path d="M28 16C28 14 30 13 29 11" stroke="#8E7B80" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M35 16C35 14 37 13 36 11" stroke="#8E7B80" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );

    case 'medicine':
      // Stethoscope: clean, slightly clinical/warm rather than pink
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Earpieces */}
          <path d="M24 16V22C24 28 29 32 32 32C35 32 40 28 40 22V16" stroke="#493D40" strokeWidth="2" strokeLinecap="round" />
          <circle cx="24" cy="16" r="2" fill="#493D40" />
          <circle cx="40" cy="16" r="2" fill="#493D40" />
          {/* Tubing down and loop */}
          <path d="M32 32V38C32 43 37 45 37 41C37 36 29 38 29 44C29 47 31 49 35 49H42" stroke="#493D40" strokeWidth="2" strokeLinecap="round" />
          {/* Chestpiece */}
          <circle cx="44" cy="49" r="4.5" fill="#E8DCE0" stroke="#493D40" strokeWidth="1.8" />
          <circle cx="44" cy="49" r="2" fill="#FFFDF8" />
        </svg>
      );

    case 'weather':
      // Cloud with natural weather visuals (warm sun, slate cloud, gentle rain)
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Sun peeking (warm golden sun) */}
          <circle cx="26" cy="24" r="7" fill="#FDEEBF" stroke="#E8B042" strokeWidth="1.8" />
          <path d="M26 14V12M18 19L16 17M34 19L36 17" stroke="#E8B042" strokeWidth="1.6" strokeLinecap="round" />
          {/* Cloud body */}
          <path
            d="M23 44H41C45 44 48 41 48 37C48 33.5 45.5 30.5 42 30.1C41.2 24.5 36.5 20.5 31 21C26.5 21.5 23 25 22.5 29.5C18.5 30 16 33.5 16 37C16 41 19 44 23 44Z"
            fill="#FAF8F5"
            stroke="#493D40"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          {/* Gentle raindrops */}
          <path d="M27 47L25 51" stroke="#7FA6C2" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M34 47L32 51" stroke="#7FA6C2" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M41 47L39 51" stroke="#7FA6C2" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );

    case 'dimples':
      // Smiling face with dimples
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Face outline */}
          <circle cx="32" cy="32" r="18" fill="#FFFDF8" stroke="#493D40" strokeWidth="1.8" />
          {/* Cheerful curved eyes */}
          <path d="M25 28C26.5 26.5 28.5 26.5 30 28" stroke="#493D40" strokeWidth="2" strokeLinecap="round" />
          <path d="M34 28C35.5 26.5 37.5 26.5 39 28" stroke="#493D40" strokeWidth="2" strokeLinecap="round" />
          {/* Smile */}
          <path d="M26 34C28 38 36 38 38 34" stroke="#493D40" strokeWidth="2" strokeLinecap="round" />
          {/* Left dimple (slightly deeper/more prominent) */}
          <path d="M22.5 33C21.5 35 21.5 37 22.5 39" stroke="#D47F95" strokeWidth="2.2" strokeLinecap="round" />
          {/* Right dimple (slightly less dramatic) */}
          <path d="M41.5 34C42 35.5 42 37 41.5 38" stroke="#E9A6B5" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );

    case 'travel':
      // Airplane: airy and light
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Flight dotted trail */}
          <path
            d="M17 46C20 42 24 41 29 40"
            stroke="#8E7B80"
            strokeWidth="1.6"
            strokeDasharray="2 3"
            strokeLinecap="round"
          />
          {/* Airplane angled up-right */}
          <g transform="translate(14, 12) rotate(15 20 20)">
            {/* Fuselage */}
            <path
              d="M18 10C21 7 24 7 26 10L27 24L37 29V32L26 28L25 36L29 39V41L23 40L17 41V39L21 36L20 28L9 32V29L19 24L18 10Z"
              fill="#F5F8FA"
              stroke="#493D40"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            {/* Cockpit window */}
            <circle cx="23" cy="12" r="1.5" fill="#493D40" />
          </g>
        </svg>
      );

    case 'mirror':
      // Hand mirror: quiet and neutral
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Mirror frame */}
          <ellipse cx="32" cy="27" rx="14" ry="17" fill="#FAF8F5" stroke="#493D40" strokeWidth="1.8" />
          {/* Mirror glass / reflective glow */}
          <ellipse cx="32" cy="27" rx="10.5" ry="13.5" fill="#FFFDF8" stroke="#8E7B80" strokeWidth="1.2" />
          <path d="M26 20C29 18 34 18 37 21" stroke="#8E7B80" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.7" />
          {/* Handle */}
          <path d="M32 44V53" stroke="#493D40" strokeWidth="2.8" strokeLinecap="round" />
          <circle cx="32" cy="54" r="2" fill="#E8DCE0" stroke="#493D40" strokeWidth="1.4" />
        </svg>
      );

    case 'seventwenty':
      // Analog clock showing 7:20
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Clock circle */}
          <circle cx="32" cy="32" r="18" fill="#FFFDF8" stroke="#493D40" strokeWidth="1.8" />
          {/* Tick marks 12, 3, 6, 9 */}
          <line x1="32" y1="16" x2="32" y2="18.5" stroke="#8E7B80" strokeWidth="1.4" strokeLinecap="round" />
          <line x1="48" y1="32" x2="45.5" y2="32" stroke="#8E7B80" strokeWidth="1.4" strokeLinecap="round" />
          <line x1="32" y1="48" x2="32" y2="45.5" stroke="#8E7B80" strokeWidth="1.4" strokeLinecap="round" />
          <line x1="16" y1="32" x2="18.5" y2="32" stroke="#8E7B80" strokeWidth="1.4" strokeLinecap="round" />

          {/* Hour hand pointing at ~7:20 position (220 deg) */}
          <line x1="32" y1="32" x2="26" y2="37" stroke="#493D40" strokeWidth="2.4" strokeLinecap="round" />
          {/* Minute hand pointing at 20 min = 4 o'clock (120 deg) */}
          <line x1="32" y1="32" x2="42" y2="38" stroke="#D47F95" strokeWidth="2" strokeLinecap="round" />
          {/* Center pivot dot */}
          <circle cx="32" cy="32" r="2.2" fill="#D47F95" />

          {/* Little padlock indicator if locked */}
          {!isUnlocked && (
            <g transform="translate(38, 38)">
              <rect x="2" y="5" width="12" height="10" rx="2" fill="#FFFDF8" stroke="#493D40" strokeWidth="1.4" />
              <path d="M5 5V3C5 1.5 6.5 0.5 8 0.5C9.5 0.5 11 1.5 11 3V5" stroke="#493D40" strokeWidth="1.4" strokeLinecap="round" fill="none" />
              <circle cx="8" cy="10" r="1.2" fill="#D47F95" />
            </g>
          )}
        </svg>
      );

    default:
      return null;
  }
};
