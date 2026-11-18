import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';
import SmartImage from './SmartImage';

export const PageContainer = ({ children, className = '' }) => (
  <div className={`max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-16 ${className}`}>
    {children}
  </div>
);

export const SectionHeading = ({
  label,
  title,
  description,
  align = 'left',
  className = '',
}) => (
  <div
    className={`${
      align === 'center' ? 'text-center mx-auto max-w-2xl' : 'max-w-3xl'
    } space-y-4 ${className}`}
  >
    {label && (
      <RevealOnScroll variant="text">
        <p className="text-xs tracking-[0.12em] uppercase text-[#77746D]">{label}</p>
      </RevealOnScroll>
    )}
    {title && (
      <RevealOnScroll variant="heading" delay={0.05}>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] text-[#292824] leading-[1.15]">
          {title}
        </h2>
      </RevealOnScroll>
    )}
    {description && (
      <RevealOnScroll variant="text" delay={0.12}>
        <p className="text-base text-[#77746D] leading-relaxed">{description}</p>
      </RevealOnScroll>
    )}
  </div>
);

export const EditorialButton = ({
  to,
  onClick,
  variant = 'primary',
  children,
  type = 'button',
  disabled = false,
  className = '',
}) => {
  const base =
    'inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm font-normal tracking-wide transition-colors duration-200 disabled:opacity-50';
  const styles =
    variant === 'primary'
      ? 'bg-[#292824] text-[#F8F7F3] hover:bg-[#777C61]'
      : variant === 'secondary'
      ? 'border border-[#292824] text-[#292824] hover:bg-[#EFEBE3]'
      : 'text-[#292824] editorial-link px-0 py-1';

  if (to) {
    return (
      <Link to={to} className={`${base} ${styles} ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${styles} ${className}`}
    >
      {children}
    </button>
  );
};

export const EditorialLink = ({ to, children, className = '' }) => (
  <Link
    to={to}
    className={`group inline-flex items-center gap-2 text-sm text-[#292824] hover:text-[#777C61] transition-colors duration-200 ${className}`}
  >
    <span className="border-b border-[#292824]/40 group-hover:border-[#777C61] pb-0.5 transition-colors">
      {children}
    </span>
    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
  </Link>
);

export const ProjectPreviewCard = ({
  project,
  aspectClass = 'aspect-[4/3]',
  delay = 0,
}) => (
  <div className="group block">
    <Link to={`/projects/${project.slug}`} className="block space-y-4">
      <RevealOnScroll variant="image" delay={delay}>
        <div className={`overflow-hidden bg-[#EFEBE3] ${aspectClass}`}>
          <SmartImage
            src={project.coverImage?.url}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
          />
        </div>
      </RevealOnScroll>
      <RevealOnScroll variant="stagger" delay={delay}>
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pt-1">
          <h3 className="font-serif text-2xl sm:text-[26px] text-[#292824] group-hover:text-[#777C61] transition-colors duration-200">
            {project.title}
          </h3>
          <p className="text-xs text-[#77746D] tracking-wide">
            {project.location} <span className="mx-1.5 text-[#DEDAD1]">/</span> {project.category}
          </p>
        </div>
      </RevealOnScroll>
    </Link>
  </div>
);

export const EditorialQuote = ({
  quote,
  author,
  roleOrProject,
  photoUrl,
  isDemo = true,
}) => (
  <div className="max-w-4xl mx-auto text-center space-y-8">
    <RevealOnScroll variant="heading">
      <blockquote className="font-serif italic text-2xl sm:text-3xl lg:text-[38px] text-[#292824] leading-[1.35]">
        “{quote}”
      </blockquote>
    </RevealOnScroll>
    <RevealOnScroll variant="text" delay={0.1}>
      <div className="flex flex-col items-center gap-3">
        {photoUrl && (
          <SmartImage
            src={photoUrl}
            alt={author}
            className="w-12 h-12 rounded-full object-cover grayscale"
          />
        )}
        <div className="space-y-0.5">
          <p className="text-sm font-medium text-[#292824]">{author}</p>
          <p className="text-xs text-[#77746D]">{roleOrProject}</p>
          {isDemo && (
            <p className="text-[11px] text-[#77746D]/80 pt-1">
              Sample Client Quote (Demo Content)
            </p>
          )}
        </div>
      </div>
    </RevealOnScroll>
  </div>
);
