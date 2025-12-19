import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'clean' | 'fractured';
}

const Logo: React.FC<LogoProps> = ({ className = '', variant = 'clean' }) => {
  // Using an abstract octagon shape to represent the logo based on description
  // In a real scenario, this would be the actual SVG asset path
  
  const isFractured = variant === 'fractured';
  
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={className} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Octagon */}
      <path 
        d="M30 5 L70 5 L95 30 L95 70 L70 95 L30 95 L5 70 L5 30 Z" 
        stroke={isFractured ? "#FF0033" : "currentColor"} 
        strokeWidth={isFractured ? "3" : "4"}
        strokeLinejoin="round"
        className={isFractured ? "drop-shadow-[0_0_10px_rgba(255,0,51,0.8)]" : ""}
      />
      
      {/* The 'M' Shape */}
      <path 
        d="M25 75 L25 35 L50 60 L75 35 L75 75" 
        stroke={isFractured ? "#FF0033" : "currentColor"} 
        strokeWidth={isFractured ? "3" : "5"} 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className={isFractured ? "animate-pulse-slow drop-shadow-[0_0_15px_rgba(255,0,51,1)]" : ""}
      />

      {/* Fractures (Only visible in fractured mode) */}
      {isFractured && (
        <g stroke="#FF4500" strokeWidth="1" opacity="0.8">
           <path d="M5 30 L20 40" />
           <path d="M95 70 L80 60" />
           <path d="M50 60 L50 95" strokeDasharray="2 2" />
           <path d="M30 5 L40 20" />
        </g>
      )}
    </svg>
  );
};

export default Logo;
