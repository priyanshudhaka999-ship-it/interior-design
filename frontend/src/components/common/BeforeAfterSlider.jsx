import React, { useState } from 'react';
import SmartImage from './SmartImage';

const BeforeAfterSlider = ({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
}) => {
  const [position, setPosition] = useState(50);

  return (
    <div className="relative w-full overflow-hidden bg-[#EFEBE3] select-none">
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <SmartImage
          src={afterImage}
          alt={afterLabel}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <SmartImage
            src={beforeImage}
            alt={beforeLabel}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Minimal Divider Line & Handle */}
        <div
          className="absolute top-0 bottom-0 w-[1px] bg-[#F8F7F3] pointer-events-none"
          style={{ left: `${position}%` }}
        >
          <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#F8F7F3] border border-[#292824]/30 flex items-center justify-center text-[#292824] text-xs shadow-sm">
            ↔
          </div>
        </div>

        {/* Restrained Corner Labels */}
        <span className="absolute bottom-4 left-4 bg-[#F8F7F3]/90 text-[#292824] px-3 py-1 text-xs tracking-wide">
          {beforeLabel}
        </span>
        <span className="absolute bottom-4 right-4 bg-[#292824]/85 text-[#F8F7F3] px-3 py-1 text-xs tracking-wide">
          {afterLabel}
        </span>

        <input
          type="range"
          min="4"
          max="96"
          value={position}
          aria-label="Before and after comparison slider"
          onChange={(e) => setPosition(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
        />
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
