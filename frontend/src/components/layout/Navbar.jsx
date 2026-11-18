import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useStudio } from '../../context/StudioContext';

const STUDIO_SUBLINKS = [
  { label: 'About the Studio', to: '/about' },
  { label: 'Our Process', to: '/process' },
  { label: 'Transformations', to: '/transformations' },
  { label: 'Client Testimonials', to: '/testimonials' },
];

const Navbar = () => {
  const { settings } = useStudio();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [studioOpen, setStudioOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileStudioOpen, setMobileStudioOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isStudioRoute = STUDIO_SUBLINKS.some((item) =>
    location.pathname.startsWith(item.to)
  );

  // Subtle scroll state
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setStudioOpen(false);
    setMobileOpen(false);
  }, [location.pathname]);

  // Close Studio dropdown when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setStudioOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setStudioOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const navItemClass = ({ isActive }) =>
    `relative py-1 text-sm transition-colors duration-200 ${
      isActive
        ? 'text-[#292824] font-medium after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1px] after:bg-[#292824]'
        : 'text-[#77746D] hover:text-[#292824]'
    }`;

  return (
    <header
      className={`sticky top-0 z-40 bg-[#F8F7F3] border-b border-[#DEDAD1] transition-shadow duration-300 ${
        scrolled ? 'shadow-[0_4px_24px_rgba(41,40,36,0.03)]' : ''
      }`}
    >
      <div className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-16 h-20 flex items-center justify-between">
        {/* Left: Atelier Vera Wordmark + Small Subtitle */}
        <Link to="/" className="flex flex-col">
          <span className="font-serif text-2xl tracking-[0.06em] text-[#292824] leading-none">
            {settings.studioName || 'Atelier Vera'}
          </span>
          <span className="text-[11px] text-[#77746D] tracking-[0.08em] mt-1">
            Interior Architecture
          </span>
        </Link>

        {/* Middle: Strictly FOUR Main Navigation Items */}
        <nav className="hidden lg:flex items-center space-x-11" aria-label="Primary Navigation">
          <NavLink to="/projects" className={navItemClass}>
            Projects
          </NavLink>

          <NavLink to="/services" className={navItemClass}>
            Services
          </NavLink>

          {/* Studio Dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setStudioOpen(true)}
            onMouseLeave={() => setStudioOpen(false)}
          >
            <button
              type="button"
              onClick={() => setStudioOpen((prev) => !prev)}
              aria-expanded={studioOpen}
              aria-haspopup="true"
              className={`relative py-1 text-sm inline-flex items-center gap-1.5 transition-colors duration-200 ${
                isStudioRoute
                  ? 'text-[#292824] font-medium after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1px] after:bg-[#292824]'
                  : 'text-[#77746D] hover:text-[#292824]'
              }`}
            >
              <span>Studio</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  studioOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            <AnimatePresence>
              {studioOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-0 top-full pt-3 w-52 z-50"
                >
                  <div className="bg-[#F8F7F3] border border-[#DEDAD1] py-2.5 px-4 shadow-[0_12px_32px_rgba(41,40,36,0.06)] flex flex-col space-y-1">
                    {STUDIO_SUBLINKS.map((sub) => (
                      <NavLink
                        key={sub.to}
                        to={sub.to}
                        onClick={() => setStudioOpen(false)}
                        className={({ isActive }) =>
                          `py-2 text-sm transition-colors duration-150 ${
                            isActive
                              ? 'text-[#292824] font-medium'
                              : 'text-[#77746D] hover:text-[#292824]'
                          }`
                        }
                      >
                        {sub.label}
                      </NavLink>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <NavLink to="/contact" className={navItemClass}>
            Contact
          </NavLink>
        </nav>

        {/* Right: Single Primary CTA */}
        <div className="hidden lg:flex items-center">
          <Link
            to="/book-consultation"
            className="px-6 py-2.5 bg-[#292824] text-[#F8F7F3] text-sm font-normal hover:bg-[#777C61] transition-colors duration-200"
          >
            Book a Consultation
          </Link>
        </div>

        {/* Mobile Hamburger Trigger */}
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="lg:hidden p-2 text-[#292824] hover:text-[#77746D] transition-colors"
          aria-label="Open navigation menu"
          aria-expanded={mobileOpen}
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Right-to-Left Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-50 bg-[#292824]/30 lg:hidden"
              aria-hidden="true"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-xs bg-[#F8F7F3] border-l border-[#DEDAD1] flex flex-col justify-between overflow-y-auto lg:hidden"
              aria-label="Mobile Navigation"
            >
              <div className="p-7">
                <div className="flex items-center justify-between border-b border-[#DEDAD1] pb-5">
                  <div className="flex flex-col">
                    <span className="font-serif text-xl text-[#292824]">
                      {settings.studioName || 'Atelier Vera'}
                    </span>
                    <span className="text-[11px] text-[#77746D]">Interior Architecture</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    className="p-1.5 text-[#292824] hover:text-[#77746D]"
                    aria-label="Close navigation menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="mt-8 flex flex-col space-y-4">
                  <NavLink
                    to="/projects"
                    onClick={() => setMobileOpen(false)}
                    className="font-serif text-2xl text-[#292824] hover:text-[#777C61]"
                  >
                    Projects
                  </NavLink>

                  <NavLink
                    to="/services"
                    onClick={() => setMobileOpen(false)}
                    className="font-serif text-2xl text-[#292824] hover:text-[#777C61]"
                  >
                    Services
                  </NavLink>

                  {/* Expandable Studio Submenu */}
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => setMobileStudioOpen((prev) => !prev)}
                      aria-expanded={mobileStudioOpen}
                      className="w-full flex items-center justify-between font-serif text-2xl text-[#292824]"
                    >
                      <span>Studio</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          mobileStudioOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {mobileStudioOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22 }}
                          className="overflow-hidden pl-3 border-l border-[#DEDAD1] flex flex-col space-y-2.5 pt-1"
                        >
                          {STUDIO_SUBLINKS.map((sub) => (
                            <NavLink
                              key={sub.to}
                              to={sub.to}
                              onClick={() => setMobileOpen(false)}
                              className="text-sm text-[#77746D] hover:text-[#292824]"
                            >
                              {sub.label}
                            </NavLink>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <NavLink
                    to="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="font-serif text-2xl text-[#292824] hover:text-[#777C61]"
                  >
                    Contact
                  </NavLink>
                </nav>
              </div>

              <div className="p-7 border-t border-[#DEDAD1] bg-[#EFEBE3]/50">
                <Link
                  to="/book-consultation"
                  onClick={() => setMobileOpen(false)}
                  className="w-full py-3.5 px-5 bg-[#292824] text-[#F8F7F3] text-sm text-center block hover:bg-[#777C61] transition-colors"
                >
                  Book a Consultation
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
