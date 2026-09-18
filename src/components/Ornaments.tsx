import React from 'react';

export const Sparkle: React.FC<{ className?: string; color?: string; size?: number }> = ({
  className = '',
  color = '#E9A6B5',
  size = 16,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12 2C12 7.52285 7.52285 12 2 12C7.52285 12 12 16.4771 12 22C12 16.4771 16.4771 12 22 12C16.4771 12 12 7.52285 12 2Z"
      fill={color}
    />
  </svg>
);

export const TinyHeart: React.FC<{ className?: string; color?: string; size?: number }> = ({
  className = '',
  color = '#E9A6B5',
  size = 14,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z"
      fill={color}
    />
  </svg>
);

export const DoodleStar: React.FC<{ className?: string; color?: string; size?: number }> = ({
  className = '',
  color = '#D47F95',
  size = 18,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12 3L14.2 9.5H21L15.5 13.5L17.7 20L12 16L6.3 20L8.5 13.5L3 9.5H9.8L12 3Z"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const HandDrawnBow: React.FC<{ className?: string; color?: string; size?: number }> = ({
  className = '',
  color = '#D47F95',
  size = 20,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M14 16C10 11 4 12 5 17C6 22 12 20 14 17"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M18 16C22 11 28 12 27 17C26 22 20 20 18 17"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <circle cx="16" cy="16.5" r="2.5" fill={color} />
    <path d="M15 18C14 21 11 24 9 25" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    <path d="M17 18C18 21 21 24 23 25" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);
