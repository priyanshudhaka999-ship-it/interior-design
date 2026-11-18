import React, { useEffect } from 'react';
import { useStudio } from '../context/StudioContext';
import RevealOnScroll from '../components/common/RevealOnScroll';
import BeforeAfterSlider from '../components/common/BeforeAfterSlider';
import {
  PageContainer,
  EditorialLink,
} from '../components/common/EditorialPrimitives';

const BeforeAfterPage = () => {
  const { settings, projects } = useStudio();

  useEffect(() => {
    document.title = `Transformations — ${settings.studioName || 'Atelier Vera'}`;
  }, [settings.studioName]);

  const transformationProjects = projects.filter(
    (p) => p.published && p.beforeAfter?.enabled
  );

  return (
    <div className="bg-[#F8F7F3] text-[#292824] pt-14 sm:pt-20 pb-28 lg:pb-36">
      <PageContainer className="space-y-20 lg:space-y-28">
        <div className="max-w-3xl space-y-5">
          <RevealOnScroll variant="text">
            <p className="text-xs uppercase tracking-[0.12em] text-[#77746D]">
              Spatial Transformations
            </p>
          </RevealOnScroll>
          <RevealOnScroll variant="heading" delay={0.05}>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[58px] text-[#292824] leading-[1.1]">
              Before & After Studies
            </h1>
          </RevealOnScroll>
          <RevealOnScroll variant="text" delay={0.12}>
            <p className="text-base text-[#77746D] leading-relaxed">
              Move the comparison handle across each study to observe how structural partition removal, daylight calibration, and integrated joinery reframe existing architecture.
            </p>
          </RevealOnScroll>
        </div>

        <div className="divide-y divide-[#DEDAD1] border-t border-[#DEDAD1]">
          {transformationProjects.map((project) => (
            <div key={project._id} className="py-20 lg:py-28 space-y-10">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div className="space-y-2 max-w-2xl">
                  <p className="text-xs text-[#77746D]">
                    {project.location} <span className="mx-1.5 text-[#DEDAD1]">/</span>{' '}
                    {project.category}
                  </p>
                  <h2 className="font-serif text-3xl sm:text-4xl text-[#292824]">
                    {project.title}
                  </h2>
                  <p className="text-sm sm:text-base text-[#77746D] leading-relaxed pt-1">
                    {project.beforeAfter.transformationSummary}
                  </p>
                </div>
                <EditorialLink to={`/projects/${project.slug}`}>
                  Read Case Study
                </EditorialLink>
              </div>

              <BeforeAfterSlider
                beforeImage={project.beforeAfter.beforeImage?.url}
                afterImage={project.beforeAfter.afterImage?.url}
                beforeLabel="Prior Condition"
                afterLabel="Completed Space"
              />
            </div>
          ))}
        </div>
      </PageContainer>
    </div>
  );
};

export default BeforeAfterPage;
