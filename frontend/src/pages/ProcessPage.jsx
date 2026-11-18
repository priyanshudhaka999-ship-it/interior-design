import React, { useEffect } from 'react';
import { useStudio } from '../context/StudioContext';
import RevealOnScroll from '../components/common/RevealOnScroll';
import { DESIGN_PROCESS_STAGES } from '../data/initialStudioData';
import {
  PageContainer,
  EditorialButton,
} from '../components/common/EditorialPrimitives';

const ProcessPage = () => {
  const { settings } = useStudio();

  useEffect(() => {
    document.title = `Our Process — ${settings.studioName || 'Atelier Vera'}`;
  }, [settings.studioName]);

  return (
    <div className="bg-[#F8F7F3] text-[#292824] pt-14 sm:pt-20 pb-28 lg:pb-36">
      <PageContainer className="space-y-20 lg:space-y-28">
        <div className="max-w-3xl space-y-5">
          <RevealOnScroll variant="text">
            <p className="text-xs uppercase tracking-[0.12em] text-[#77746D]">
              Our Process
            </p>
          </RevealOnScroll>
          <RevealOnScroll variant="heading" delay={0.05}>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[58px] text-[#292824] leading-[1.1]">
              A Six-Stage Architectural Methodology
            </h1>
          </RevealOnScroll>
          <RevealOnScroll variant="text" delay={0.12}>
            <p className="text-base text-[#77746D] leading-relaxed">
              Every commission progresses through six structured stages—ensuring thoughtful spatial resolution, tactile material alignment, and transparent site governance from initial sketch to handover.
            </p>
          </RevealOnScroll>
        </div>

        {/* Open Editorial Sequence (No Repetitive Boxes) */}
        <div className="divide-y divide-[#DEDAD1] border-y border-[#DEDAD1]">
          {DESIGN_PROCESS_STAGES.map((stage, idx) => (
            <RevealOnScroll
              key={stage.step}
              variant="heading"
              delay={idx * 0.05}
              className="py-14 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              <div className="lg:col-span-2 space-y-1">
                <span className="font-serif text-3xl text-[#777C61]">{stage.step}</span>
                <p className="text-xs text-[#77746D]">{stage.duration}</p>
              </div>

              <div className="lg:col-span-5">
                <h2 className="font-serif text-3xl sm:text-4xl text-[#292824]">
                  {stage.title}
                </h2>
              </div>

              <div className="lg:col-span-5 space-y-5">
                <p className="text-base text-[#77746D] leading-relaxed">
                  {stage.summary}
                </p>
                <div className="space-y-1.5 pt-2">
                  <p className="text-xs uppercase tracking-[0.12em] text-[#77746D]">
                    Key Milestones
                  </p>
                  <ul className="space-y-1 text-sm text-[#292824]">
                    {stage.deliverables.map((d) => (
                      <li key={d} className="flex items-baseline gap-2.5">
                        <span className="text-[#777C61]">—</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <div className="text-center max-w-xl mx-auto space-y-6 pt-4">
          <h2 className="font-serif text-3xl sm:text-4xl text-[#292824]">
            Begin Stage 01 With Our Studio
          </h2>
          <EditorialButton to="/book-consultation" variant="primary">
            Book a Consultation
          </EditorialButton>
        </div>
      </PageContainer>
    </div>
  );
};

export default ProcessPage;
