import React, { useEffect } from 'react';
import { useStudio } from '../context/StudioContext';
import RevealOnScroll from '../components/common/RevealOnScroll';
import SmartImage from '../components/common/SmartImage';
import {
  PageContainer,
  EditorialLink,
  EditorialButton,
} from '../components/common/EditorialPrimitives';

const ServicesPage = () => {
  const { settings, services } = useStudio();

  useEffect(() => {
    document.title = `Services — ${settings.studioName || 'Atelier Vera'}`;
  }, [settings.studioName]);

  const publishedServices = services
    .filter((s) => s.published)
    .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

  return (
    <div className="bg-[#F8F7F3] text-[#292824]">
      <section className="pt-14 sm:pt-20 pb-20">
        <PageContainer>
          <div className="max-w-3xl space-y-5">
            <RevealOnScroll variant="text">
              <p className="text-xs uppercase tracking-[0.12em] text-[#77746D]">
                Services & Practice Areas
              </p>
            </RevealOnScroll>
            <RevealOnScroll variant="heading" delay={0.05}>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-[58px] text-[#292824] leading-[1.1]">
                Comprehensive Interior Architecture
              </h1>
            </RevealOnScroll>
            <RevealOnScroll variant="text" delay={0.12}>
              <p className="text-base text-[#77746D] leading-relaxed">
                From initial spatial feasibility and bespoke kitchen engineering to full turnkey residential and commercial execution, each discipline is tailored to the architecture of your building.
              </p>
            </RevealOnScroll>
          </div>
        </PageContainer>
      </section>

      <section className="pb-28 lg:pb-36">
        <PageContainer className="divide-y divide-[#DEDAD1] border-t border-[#DEDAD1]">
          {publishedServices.map((service, index) => {
            const isReversed = index % 2 === 1;
            return (
              <div
                key={service._id}
                className="py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
              >
                <div
                  className={`lg:col-span-6 ${
                    isReversed ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <RevealOnScroll variant="image">
                    <div className="aspect-[16/11] overflow-hidden bg-[#EFEBE3]">
                      <SmartImage
                        src={service.image?.url}
                        alt={service.image?.alt || service.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </RevealOnScroll>
                </div>

                <div
                  className={`lg:col-span-6 space-y-6 ${
                    isReversed ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <RevealOnScroll variant="text">
                    <p className="text-xs text-[#777C61] tracking-[0.1em]">
                      0{index + 1} <span className="mx-2 text-[#DEDAD1]">/</span>{' '}
                      {service.estimatedTimeline}
                    </p>
                  </RevealOnScroll>

                  <RevealOnScroll variant="heading" delay={0.05}>
                    <h2 className="font-serif text-3xl sm:text-4xl text-[#292824]">
                      {service.title}
                    </h2>
                  </RevealOnScroll>

                  {service.subtitle && (
                    <RevealOnScroll variant="text" delay={0.08}>
                      <p className="text-sm text-[#77746D]">{service.subtitle}</p>
                    </RevealOnScroll>
                  )}

                  <RevealOnScroll variant="text" delay={0.12}>
                    <p className="text-base text-[#77746D] leading-relaxed">
                      {service.description}
                    </p>
                  </RevealOnScroll>

                  <RevealOnScroll variant="text" delay={0.16}>
                    <div className="pt-4 border-t border-[#DEDAD1] space-y-3">
                      <p className="text-xs uppercase tracking-[0.12em] text-[#77746D]">
                        Deliverables
                      </p>
                      <ul className="space-y-2 text-sm text-[#292824]">
                        {(service.deliverables || []).map((item, i) => (
                          <li key={i} className="flex items-baseline gap-3">
                            <span className="text-[#777C61]">—</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </RevealOnScroll>

                  <RevealOnScroll variant="text" delay={0.2}>
                    <div className="pt-4 flex flex-wrap items-center gap-6">
                      <EditorialLink
                        to={`/book-consultation?service=${encodeURIComponent(
                          service.title
                        )}`}
                      >
                        Book a Consultation
                      </EditorialLink>
                      <EditorialLink
                        to={`/contact?projectType=${encodeURIComponent(
                          service.title
                        )}`}
                      >
                        Send an Enquiry
                      </EditorialLink>
                    </div>
                  </RevealOnScroll>
                </div>
              </div>
            );
          })}
        </PageContainer>
      </section>

      <section className="py-24 bg-[#EFEBE3] border-t border-[#DEDAD1]">
        <PageContainer className="text-center max-w-2xl mx-auto space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl text-[#292824]">
            Unsure Which Scope Fits Your Property?
          </h2>
          <p className="text-base text-[#77746D]">
            Schedule an initial discovery consultation and our architects will review your floor plan and advise on spatial feasibility.
          </p>
          <div className="pt-2">
            <EditorialButton to="/book-consultation" variant="primary">
              Book a Consultation
            </EditorialButton>
          </div>
        </PageContainer>
      </section>
    </div>
  );
};

export default ServicesPage;
