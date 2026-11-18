import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { useStudio } from '../context/StudioContext';
import RevealOnScroll from '../components/common/RevealOnScroll';
import SmartImage from '../components/common/SmartImage';
import {
  PageContainer,
  EditorialButton,
  EditorialLink,
  ProjectPreviewCard,
  EditorialQuote,
} from '../components/common/EditorialPrimitives';

const EASE = [0.22, 1, 0.36, 1];

const HomePage = () => {
  const { settings, projects, testimonials } = useStudio();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    document.title = `${settings.studioName || 'Atelier Vera'} — Interior Architecture`;
  }, [settings.studioName]);

  const publishedProjects = projects.filter((p) => p.published);
  const selectedProjects = publishedProjects
    .filter((p) => p.featured)
    .concat(publishedProjects.filter((p) => !p.featured))
    .slice(0, 3);

  const featuredTestimonial =
    testimonials.find((t) => t.published) || testimonials[0];

  const heroMotion = (delay = 0) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.75, delay, ease: EASE },
        };

  return (
    <div className="bg-[#F8F7F3] text-[#292824]">
      {/* SECTION 1 — EDITORIAL HERO */}
      <section className="pt-10 sm:pt-14 lg:pt-20 pb-24 lg:pb-36">
        <PageContainer className="space-y-12 lg:space-y-14">
          <div className="max-w-3xl space-y-6">
            <motion.h1
              {...heroMotion(0.05)}
              className="font-serif text-4xl sm:text-6xl lg:text-[68px] text-[#292824] leading-[1.06]"
            >
              Spaces That Feel Like Home.
            </motion.h1>
            <motion.p
              {...heroMotion(0.18)}
              className="text-base sm:text-lg text-[#77746D] leading-relaxed max-w-2xl"
            >
              {settings.heroIntroduction}
            </motion.p>
            <motion.div
              {...heroMotion(0.28)}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <EditorialButton to="/projects" variant="primary">
                Explore Our Work
              </EditorialButton>
              <EditorialButton to="/book-consultation" variant="secondary">
                Book a Consultation
              </EditorialButton>
            </motion.div>
          </div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.02 }}
            animate={prefersReducedMotion ? false : { opacity: 1, scale: 1 }}
            transition={{ duration: 1.05, delay: 0.2, ease: EASE }}
            className="overflow-hidden bg-[#EFEBE3]"
          >
            <div className="aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden">
              <SmartImage
                src={settings.heroImageUrl}
                alt="Warm minimalist limestone living space by Atelier Vera"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </PageContainer>
      </section>

      {/* SECTION 2 — STUDIO INTRODUCTION */}
      <section className="py-24 lg:py-36 border-t border-[#DEDAD1]">
        <PageContainer>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7 space-y-8">
              <RevealOnScroll variant="text">
                <p className="text-xs uppercase tracking-[0.12em] text-[#77746D]">
                  The Studio
                </p>
              </RevealOnScroll>
              <RevealOnScroll variant="heading" delay={0.06}>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] text-[#292824] leading-[1.2]">
                  We design quiet, enduring interiors shaped by natural light, architectural proportion, and honest materials.
                </h2>
              </RevealOnScroll>
              <RevealOnScroll variant="text" delay={0.14}>
                <p className="text-base text-[#77746D] leading-relaxed max-w-xl">
                  Approaching each commission as an integrated spatial whole, our practice unites structural clarity with tactile stone, solid timber millwork, and breathable mineral finishes that age with grace.
                </p>
              </RevealOnScroll>
              <RevealOnScroll variant="text" delay={0.2}>
                <div className="pt-2">
                  <EditorialLink to="/about">About the Studio</EditorialLink>
                </div>
              </RevealOnScroll>
            </div>

            <div className="lg:col-span-5">
              <RevealOnScroll variant="image" delay={0.12}>
                <div className="aspect-[4/5] overflow-hidden bg-[#EFEBE3]">
                  <SmartImage
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85"
                    alt="Architectural dining space and travertine detailing"
                    className="w-full h-full object-cover"
                  />
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* SECTION 3 — SELECTED PROJECTS (Asymmetric Editorial Composition) */}
      <section className="py-24 lg:py-36 border-t border-[#DEDAD1]">
        <PageContainer className="space-y-16 lg:space-y-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-3">
              <RevealOnScroll variant="text">
                <p className="text-xs uppercase tracking-[0.12em] text-[#77746D]">
                  Selected Works
                </p>
              </RevealOnScroll>
              <RevealOnScroll variant="heading" delay={0.05}>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] text-[#292824]">
                  Architectural Monographs
                </h2>
              </RevealOnScroll>
            </div>
            <RevealOnScroll variant="text" delay={0.1}>
              <EditorialLink to="/projects">Explore All Projects</EditorialLink>
            </RevealOnScroll>
          </div>

          {/* Asymmetric 3-Project Layout: 7-col landscape + 5-col offset portrait + 12-col full-width */}
          <div className="space-y-20 lg:space-y-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {selectedProjects[0] && (
                <div className="lg:col-span-7">
                  <ProjectPreviewCard
                    project={selectedProjects[0]}
                    aspectClass="aspect-[16/11]"
                    delay={0.05}
                  />
                </div>
              )}
              {selectedProjects[1] && (
                <div className="lg:col-span-5 lg:mt-24">
                  <ProjectPreviewCard
                    project={selectedProjects[1]}
                    aspectClass="aspect-[4/5]"
                    delay={0.15}
                  />
                </div>
              )}
            </div>

            {selectedProjects[2] && (
              <div className="lg:w-10/12">
                <ProjectPreviewCard
                  project={selectedProjects[2]}
                  aspectClass="aspect-[16/9]"
                  delay={0.1}
                />
              </div>
            )}
          </div>
        </PageContainer>
      </section>

      {/* SECTION 4 — OUR SERVICES (3 Curated Architectural Areas) */}
      <section className="py-24 lg:py-36 bg-[#EFEBE3]">
        <PageContainer className="space-y-16 lg:space-y-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <RevealOnScroll variant="text">
                <p className="text-xs uppercase tracking-[0.12em] text-[#77746D]">
                  Capabilities
                </p>
              </RevealOnScroll>
              <RevealOnScroll variant="heading" delay={0.05}>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] text-[#292824] leading-[1.15]">
                  Disciplined Spatial Design
                </h2>
              </RevealOnScroll>
            </div>
            <RevealOnScroll variant="text" delay={0.1}>
              <EditorialLink to="/services">Explore All Services</EditorialLink>
            </RevealOnScroll>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-14">
            {[
              {
                title: 'Residential Interiors',
                description:
                  'Holistic interior architecture for private residences, penthouses, primary bedroom sanctuaries, and custom modular culinary suites.',
                image:
                  'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1000&q=85',
              },
              {
                title: 'Commercial Interiors',
                description:
                  'Refined spatial identities for cultural galleries, flagship retail ateliers, hospitality lounges, and private executive family offices.',
                image:
                  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85',
              },
              {
                title: 'Renovation & Spatial Planning',
                description:
                  'Structural reconfiguration, heritage conservation, daylight optimization, and material direction for complex architectural shells.',
                image:
                  'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1000&q=85',
              },
            ].map((area, idx) => (
              <div key={area.title} className="space-y-6">
                <RevealOnScroll variant="image" delay={idx * 0.1}>
                  <Link to="/services" className="block overflow-hidden aspect-[4/3] bg-[#F8F7F3] group">
                    <SmartImage
                      src={area.image}
                      alt={area.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                    />
                  </Link>
                </RevealOnScroll>
                <RevealOnScroll variant="stagger" delay={idx * 0.1}>
                  <div className="space-y-2.5">
                    <h3 className="font-serif text-2xl sm:text-[28px] text-[#292824]">
                      {area.title}
                    </h3>
                    <p className="text-sm text-[#77746D] leading-relaxed">
                      {area.description}
                    </p>
                  </div>
                </RevealOnScroll>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* SECTION 5 — DESIGN APPROACH (3 Horizontal Editorial Stages) */}
      <section className="py-24 lg:py-36">
        <PageContainer className="space-y-16 lg:space-y-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <RevealOnScroll variant="text">
                <p className="text-xs uppercase tracking-[0.12em] text-[#77746D]">
                  Design Approach
                </p>
              </RevealOnScroll>
              <RevealOnScroll variant="heading" delay={0.05}>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] text-[#292824]">
                  From Dialogue to Handover
                </h2>
              </RevealOnScroll>
            </div>
            <RevealOnScroll variant="text" delay={0.1}>
              <EditorialLink to="/process">View Complete Six-Stage Process</EditorialLink>
            </RevealOnScroll>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 border-t border-[#DEDAD1] pt-12">
            {[
              {
                number: '01',
                title: 'Discovery',
                body: 'We begin by studying how natural light moves across your floor plate, understanding your daily rituals, and establishing clear architectural and investment parameters.',
              },
              {
                number: '02',
                title: 'Design Development',
                body: 'Scaled spatial zoning, custom millwork engineering, and physical trays of honed stone, timber, and unbleached textiles translate the concept into precise technical drawings.',
              },
              {
                number: '03',
                title: 'Execution & Handover',
                body: 'Working alongside master cabinetmakers and stone masons, we supervise every junction on site until the final piece of furniture is placed.',
              },
            ].map((stage, idx) => (
              <RevealOnScroll
                key={stage.number}
                variant="heading"
                delay={idx * 0.12}
                className="space-y-4"
              >
                <span className="text-xs text-[#777C61] tracking-[0.1em]">
                  {stage.number}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#292824]">
                  {stage.title}
                </h3>
                <p className="text-sm text-[#77746D] leading-relaxed">
                  {stage.body}
                </p>
              </RevealOnScroll>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* SECTION 6 — SINGLE EDITORIAL CLIENT TESTIMONIAL */}
      {featuredTestimonial && (
        <section className="py-24 lg:py-36 border-t border-[#DEDAD1]">
          <PageContainer className="space-y-10">
            <EditorialQuote
              quote={featuredTestimonial.feedback}
              author={featuredTestimonial.clientName}
              roleOrProject={featuredTestimonial.projectType}
              photoUrl={featuredTestimonial.clientPhoto?.url}
              isDemo={featuredTestimonial.isDemoContent}
            />
            <div className="text-center pt-2">
              <EditorialLink to="/testimonials">Read Client Reflections</EditorialLink>
            </div>
          </PageContainer>
        </section>
      )}

      {/* SECTION 7 — FINAL CONTACT CTA */}
      <section className="py-28 lg:py-36 bg-[#EFEBE3] border-t border-[#DEDAD1]">
        <PageContainer>
          <div className="max-w-2xl mx-auto text-center space-y-7">
            <RevealOnScroll variant="heading">
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-[54px] text-[#292824] leading-[1.12]">
                Let’s Create Something Meaningful.
              </h2>
            </RevealOnScroll>
            <RevealOnScroll variant="text" delay={0.1}>
              <p className="text-base text-[#77746D] leading-relaxed">
                Whether you are planning a private residence, restoring a heritage property, or shaping a commercial space, we welcome a quiet conversation about your project.
              </p>
            </RevealOnScroll>
            <RevealOnScroll variant="text" delay={0.18}>
              <div className="pt-2">
                <EditorialButton to="/book-consultation" variant="primary">
                  Book a Consultation
                </EditorialButton>
              </div>
            </RevealOnScroll>
          </div>
        </PageContainer>
      </section>
    </div>
  );
};

export default HomePage;
