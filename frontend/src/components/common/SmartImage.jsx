import React, { useState } from 'react';

const FALLBACK_SVG =
  "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='800' viewBox='0 0 1200 800'%3E%3Crect width='1200' height='800' fill='%23EAE5DC'/%3E%3Crect x='80' y='80' width='1040' height='640' fill='none' stroke='%23777C61' stroke-width='2'/%3E%3Cline x1='80' y1='560' x2='1120' y2='560' stroke='%23DDD8CE' stroke-width='1.5'/%3E%3Ctext x='600' y='390' font-family='Georgia, serif' font-size='28' fill='%23292824' text-anchor='middle'%3EATELIER VERA — Architectural Study%3C/text%3E%3Ctext x='600' y='430' font-family='sans-serif' font-size='15' fill='%2377746D' text-anchor='middle'%3EWarm Minimalist Interior Photography%3C/text%3E%3C/svg%3E";

const SmartImage = ({ src, alt = 'Atelier Vera Interior Architecture', className = '', ...props }) => {
  const [imgSrc, setImgSrc] = useState(src || FALLBACK_SVG);

  return (
    <img
      src={imgSrc}
      alt={alt}
      loading="lazy"
      onError={() => {
        if (imgSrc !== FALLBACK_SVG) setImgSrc(FALLBACK_SVG);
      }}
      className={className}
      {...props}
    />
  );
};

export default SmartImage;
