import React from 'react';
import { Link } from 'react-router-dom';
import { useStudio } from '../../context/StudioContext';

const Footer = () => {
  const { settings } = useStudio();
  const cleanWa = String(settings.whatsappNumber || '919820000000').replace(/[^0-9]/g, '');

  return (
    <footer className="bg-[#EFEBE3] border-t border-[#DEDAD1] text-[#292824]">
      <div className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#DEDAD1]">
          {/* Column 1: Wordmark & Short Description */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-serif text-2xl tracking-[0.05em] text-[#292824]">
                {settings.studioName || 'Atelier Vera'}
              </span>
            </Link>
            <p className="text-sm text-[#77746D] leading-relaxed max-w-sm">
              An interior architecture and spatial design studio dedicated to calm proportion, natural light, and tactile material honesty.
            </p>
          </div>

          {/* Column 2: Main Navigation */}
          <div className="md:col-span-2 space-y-3">
            <p className="text-xs uppercase tracking-[0.12em] text-[#77746D]">Navigation</p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/projects" className="text-[#292824] hover:text-[#777C61] transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-[#292824] hover:text-[#777C61] transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-[#292824] hover:text-[#777C61] transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/book-consultation" className="text-[#292824] hover:text-[#777C61] transition-colors">
                  Book a Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Studio Links */}
          <div className="md:col-span-2 space-y-3">
            <p className="text-xs uppercase tracking-[0.12em] text-[#77746D]">Studio</p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="text-[#292824] hover:text-[#777C61] transition-colors">
                  About the Studio
                </Link>
              </li>
              <li>
                <Link to="/process" className="text-[#292824] hover:text-[#777C61] transition-colors">
                  Our Process
                </Link>
              </li>
              <li>
                <Link to="/transformations" className="text-[#292824] hover:text-[#777C61] transition-colors">
                  Transformations
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-[#292824] hover:text-[#777C61] transition-colors">
                  Client Testimonials
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Social */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs uppercase tracking-[0.12em] text-[#77746D]">Contact</p>
            <div className="space-y-2 text-sm text-[#77746D]">
              <p className="text-[#292824]">{settings.address}</p>
              <p>{settings.phone}</p>
              <p>{settings.email}</p>
              <div className="pt-2 flex items-center gap-5 text-sm text-[#292824]">
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#777C61] transition-colors"
                >
                  Instagram
                </a>
                <a
                  href={`https://wa.me/${cleanWa}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#777C61] transition-colors"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#77746D]">
          <p>{settings.footerNote}</p>
          <div className="flex items-center gap-6 shrink-0">
            <span>
              © {new Date().getFullYear()} {settings.studioName || 'Atelier Vera'}
            </span>
            <Link to="/admin/login" className="text-[#77746D]/70 hover:text-[#292824] transition-colors">
              Studio Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
