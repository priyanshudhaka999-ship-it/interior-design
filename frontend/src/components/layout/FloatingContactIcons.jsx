import React from 'react';
import { useStudio } from '../../context/StudioContext';

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
    <defs>
      <radialGradient id="instagramGlow" cx="30%" cy="107%" r="115%">
        <stop offset="0%" stopColor="#FDF497" />
        <stop offset="0.28" stopColor="#FDF497" />
        <stop offset="0.45" stopColor="#FD5949" />
        <stop offset="0.65" stopColor="#D6249F" />
        <stop offset="1" stopColor="#285AEB" />
      </radialGradient>
    </defs>
    <rect x="2" y="2" width="20" height="20" rx="5.5" fill="url(#instagramGlow)" />
    <circle cx="12" cy="12" r="5" fill="none" stroke="white" strokeWidth="2" />
    <circle cx="12" cy="12" r="2" fill="white" />
    <circle cx="17.2" cy="6.8" r="1.15" fill="white" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
    <path
      fill="#25D366"
      d="M12.04 2A9.95 9.95 0 0 0 3.5 17.1L2.08 22l5.05-1.32A10 10 0 1 0 12.04 2Z"
    />
    <path
      fill="#FFFFFF"
      d="M16.9 13.82c-.25-.12-1.48-.73-1.71-.81-.23-.09-.4-.12-.57.13-.16.24-.65.81-.8.98-.15.16-.3.18-.55.06-.25-.13-1.07-.39-2.03-1.25-.75-.67-1.26-1.49-1.4-1.74-.15-.25-.02-.38.11-.51.11-.11.25-.3.37-.45.12-.15.16-.25.24-.41.09-.16.04-.31-.02-.44-.06-.12-.57-1.37-.78-1.88-.21-.49-.42-.42-.57-.43h-.49c-.16 0-.43.06-.65.31-.22.24-.85.83-.85 2.03 0 1.19.87 2.35 1 2.51.12.16 1.71 2.62 4.15 3.67 1.73.75 2.41.81 3.27.68.53-.08 1.48-.61 1.69-1.19.21-.58.21-1.08.15-1.19-.06-.11-.23-.17-.48-.29Z"
    />
  </svg>
);

const FloatingContactIcons = () => {
  const { settings } = useStudio();
  const cleanPhone = String(settings.whatsappNumber || '919820000000').replace(/[^0-9]/g, '');
  const whatsappHref = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Hello ${settings.studioName}, I would like to enquire about an interior architecture consultation.`
  )}`;

  return (
    <div
      className="fixed bottom-6 right-5 sm:bottom-8 sm:right-8 z-30 flex flex-col gap-2.5"
      aria-label="Quick Studio Contact Channels"
    >
      <a
        href={settings.instagramUrl || 'https://instagram.com'}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit Studio Instagram Profile"
        title="Studio Instagram"
        className="w-12 h-12 rounded-full bg-white border border-white/90 shadow-[0_6px_18px_rgba(0,0,0,0.18)] flex items-center justify-center transition-transform duration-200 hover:scale-105"
      >
        <InstagramIcon />
      </a>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Studio on WhatsApp"
        title="Direct WhatsApp Consultation"
        className="w-12 h-12 rounded-full bg-white border border-white/90 shadow-[0_6px_18px_rgba(0,0,0,0.18)] flex items-center justify-center transition-transform duration-200 hover:scale-105"
      >
        <WhatsAppIcon />
      </a>
    </div>
  );
};

export default FloatingContactIcons;
