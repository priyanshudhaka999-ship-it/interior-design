import React, { useEffect } from 'react';
import { useStudio } from '../context/StudioContext';
import RevealOnScroll from '../components/common/RevealOnScroll';
import SmartImage from '../components/common/SmartImage';
import {
  PageContainer,
  EditorialButton,
} from '../components/common/EditorialPrimitives';

const AboutPage = () => {
  const { settings } = useStudio();

  useEffect(() => {
    document.title = `About the Studio — ${settings.studioName || 'Atelier Vera'}`;
  }, [settings.studioName]);

  return (
    <div className="bg-[#F8F7F3] text-[#292824]">
      {/* Opening Studio Introduction */}
      <section className="pt-14 sm:pt-20 pb-24 lg:pb-32">
        <PageContainer className="space-y-16">
          <div className="max-w-4xl space-y-6">
            <RevealOnScroll variant="text">
              <p className="text-xs uppercase tracking-[0.12em] text-[#77746D]">
                About the Studio
              </p>
            </RevealOnScroll>
            <RevealOnScroll variant="heading" delay={0.05}>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-[60px] text-[#292824] leading-[1.1]">
                Architecture shaped by stillness, natural light, and tactile restraint.
              </h1>
            </RevealOnScroll>
          </div>

          <RevealOnScroll variant="image" delay={0.12}>
            <div className="aspect-[16/9] overflow-hidden bg-[#EFEBE3]">
              <SmartImage
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85"
                alt="Atelier Vera architectural dining room study"
                className="w-full h-full object-cover"
              />
            </div>
          </RevealOnScroll>

          {/* Studio Story */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8">
            <div className="lg:col-span-4">
              <RevealOnScroll variant="text">
                <p className="text-xs uppercase tracking-[0.12em] text-[#77746D]">
                  Our Story
                </p>
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-8 space-y-6 max-w-2xl">
              <RevealOnScroll variant="heading">
                <p className="font-serif text-2xl sm:text-3xl text-[#292824] leading-relaxed">
                  {settings.studioName} was founded on a simple conviction: the most memorable spaces are not the most decorated, but the most thoughtfully proportioned.
                </p>
              </RevealOnScroll>
              <RevealOnScroll variant="text" delay={0.1}>
                <p className="text-base text-[#77746D] leading-relaxed">
                  Rather than treating interior design as surface styling applied at the end of construction, our architects begin with the raw structural envelope. We study the movement of daylight across rooms, realign thresholds, conceal mechanical systems within bespoke timber joinery, and select natural stones and lime plasters that soften acoustics and invite touch.
                </p>
              </RevealOnScroll>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Founder Profile */}
      <section className="py-24 lg:py-36 bg-[#EFEBE3] border-y border-[#DEDAD1]">
        <PageContainer>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5">
              <RevealOnScroll variant="image">
                <div className="aspect-[4/5] overflow-hidden bg-[#F8F7F3]">
                  <SmartImage
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=85"
                    alt="Elena Rostova — Principal Architect"
                    className="w-full h-full object-cover"
                  />
                </div>
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-7 space-y-6 max-w-2xl">
              <RevealOnScroll variant="text">
                <p className="text-xs uppercase tracking-[0.12em] text-[#77746D]">
                  Founder & Principal Architect (Fictional Studio Profile)
                </p>
              </RevealOnScroll>
              <RevealOnScroll variant="heading" delay={0.05}>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#292824]">
                  Elena Rostova
                </h2>
              </RevealOnScroll>
              <RevealOnScroll variant="text" delay={0.1}>
                <blockquote className="font-serif italic text-xl sm:text-2xl text-[#292824] leading-relaxed">
                  “When a room is stripped of visual noise, you begin to notice the warmth of afternoon light on honed limestone and the quiet grain of solid timber.”
                </blockquote>
              </RevealOnScroll>
              <RevealOnScroll variant="text" delay={0.16}>
                <p className="text-base text-[#77746D] leading-relaxed">
                  Educated in architectural conservation in Milan before establishing her practice in Mumbai, Elena leads every commission alongside a dedicated team of interior architects, millwork detailers, and material researchers.
                </p>
              </RevealOnScroll>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Design Philosophy & Studio Values (Editorial List, No Card Boxes) */}
      <section className="py-24 lg:py-36">
        <PageContainer className="space-y-20">
          <div className="max-w-2xl space-y-4">
            <RevealOnScroll variant="text">
              <p className="text-xs uppercase tracking-[0.12em] text-[#77746D]">
                Philosophy & Values
              </p>
            </RevealOnScroll>
            <RevealOnScroll variant="heading" delay={0.05}>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] text-[#292824]">
                Principles That Guide Our Work
              </h2>
            </RevealOnScroll>
          </div>

          <div className="divide-y divide-[#DEDAD1] border-t border-b border-[#DEDAD1]">
            {[
              {
                num: '01',
                title: 'Spatial Calm Over Ornament',
                body: 'We resolve circulation, ceiling geometry, and natural sightlines first, ensuring every room feels composed even before furniture is introduced.',
              },
              {
                num: '02',
                title: 'Honest Materiality',
                body: 'We work exclusively with authentic materials—honed Kota and travertine, quarter-sawn oak, reclaimed Burma teak, slaked lime plaster, and raw linen.',
              },
              {
                num: '03',
                title: 'Acoustic & Circadian Comfort',
                body: 'True residential luxury lies in how a home sounds at dusk and how indirect warm-dim architectural lighting supports rest.',
              },
              {
                num: '04',
                title: 'Generational Craftsmanship',
                body: 'We collaborate closely with master cabinetmakers and stone masons to build custom furniture and architectural joinery tailored to each floor plate.',
              },
            ].map((item, idx) => (
              <RevealOnScroll
                key={item.num}
                variant="heading"
                delay={idx * 0.06}
                className="py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-baseline"
              >
                <span className="lg:col-span-2 text-xs text-[#777C61] tracking-[0.1em]">
                  {item.num}
                </span>
                <h3 className="lg:col-span-4 font-serif text-2xl sm:text-3xl text-[#292824]">
                  {item.title}
                </h3>
                <p className="lg:col-span-6 text-base text-[#77746D] leading-relaxed">
                  {item.body}
                </p>
              </RevealOnScroll>
            ))}
          </div>

          {/* Restrained Consultation CTA */}
          <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <h3 className="font-serif text-2xl sm:text-3xl text-[#292824]">
                Discuss Your Project With Our Studio
              </h3>
              <p className="text-sm text-[#77746D]">
                Private consultations are available in studio or on site by appointment.
              </p>
            </div>
            <EditorialButton to="/book-consultation" variant="primary">
              Book a Consultation
            </EditorialButton>
          </div>
        </PageContainer>
      </section>
    </div>
  );
};

export default AboutPage;
