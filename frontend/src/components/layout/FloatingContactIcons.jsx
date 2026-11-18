import React from 'react';
import { MessageCircle, Instagram } from 'lucide-react';
import { useStudio } from '../../context/StudioContext';

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
        className="w-10 h-10 bg-[#F8F7F3] border border-[#DEDAD1] text-[#292824] flex items-center justify-center hover:bg-[#292824] hover:text-[#F8F7F3] transition-colors duration-200"
      >
        <Instagram className="w-4 h-4" />
      </a>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Studio on WhatsApp"
        title="Direct WhatsApp Consultation"
        className="w-10 h-10 bg-[#292824] text-[#F8F7F3] flex items-center justify-center hover:bg-[#777C61] transition-colors duration-200"
      >
        <MessageCircle className="w-4 h-4" />
      </a>
    </div>
  );
};

export default FloatingContactIcons;
