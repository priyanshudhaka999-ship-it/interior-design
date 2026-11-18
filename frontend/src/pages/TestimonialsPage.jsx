import React, { useEffect } from 'react';
import { useStudio } from '../context/StudioContext';
import RevealOnScroll from '../components/common/RevealOnScroll';
import SmartImage from '../components/common/SmartImage';
import {
  PageContainer,
  EditorialButton,
} from '../components/common/EditorialPrimitives';

const TestimonialsPage = () => {
  const { settings, testimonials } = useStudio();

  useEffect(() => {
    document.title = `Client Testimonials — ${settings.studioName || 'Atelier Vera'}`;
  }, [settings.studioName]);

  const publishedTestimonials = testimonials.filter((t) => t.published);

  return (
    <div className="bg-[#F8F7F3] text-[#292824] pt-14 sm:pt-20 pb-28 lg:pb-36">
      <PageContainer className="space-y-20">
        <div className="max-w-3xl space-y-5">
          <RevealOnScroll variant="text">
            <p className="text-xs uppercase tracking-[0.12em] text-[#77746D]">
              Client Reflections
            </p>
          </RevealOnScroll>
          <RevealOnScroll variant="heading" delay={0.05}>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[58px] text-[#292824] leading-[1.1]">
              Living With Atelier Vera
            </h1>
          </RevealOnScroll>
          <RevealOnScroll variant="text" delay={0.1}>
            <p className="text-sm text-[#77746D]">
              Note: Sample testimonials below are clearly marked as demo content until replaced with live patron reflections in the studio dashboard.
            </p>
          </RevealOnScroll>
        </div>

        <div className="divide-y divide-[#DEDAD1] border-y border-[#DEDAD1]">
          {publishedTestimonials.map((item, idx) => (
            <RevealOnScroll
              key={item._id}
              variant="heading"
              delay={idx * 0.06}
              className="py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
            >
              <div className="lg:col-span-8">
                <blockquote className="font-serif italic text-2xl sm:text-3xl lg:text-[34px] text-[#292824] leading-[1.35]">
                  “{item.feedback}”
                </blockquote>
              </div>
              <div className="lg:col-span-4 lg:pl-8 flex items-center gap-4">
                {item.clientPhoto?.url && (
                  <SmartImage
                    src={item.clientPhoto.url}
                    alt={item.clientName}
                    className="w-12 h-12 rounded-full object-cover grayscale shrink-0"
                  />
                )}
                <div className="space-y-0.5">
                  <p className="text-sm font-medium text-[#292824]">{item.clientName}</p>
                  <p className="text-xs text-[#77746D]">{item.projectType}</p>
                  {item.isDemoContent && (
                    <p className="text-[11px] text-[#777C61] pt-1">
                      Sample Client Reflection (Demo)
                    </p>
                  )}
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <div className="text-center space-y-6 pt-4">
          <h2 className="font-serif text-3xl text-[#292824]">
            Start a Conversation About Your Space
          </h2>
          <EditorialButton to="/book-consultation" variant="primary">
            Book a Consultation
          </EditorialButton>
        </div>
      </PageContainer>
    </div>
  );
};

export default TestimonialsPage;
