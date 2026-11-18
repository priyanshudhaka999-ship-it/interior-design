import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useStudio } from '../context/StudioContext';
import RevealOnScroll from '../components/common/RevealOnScroll';
import {
  PageContainer,
  ProjectPreviewCard,
} from '../components/common/EditorialPrimitives';

const CATEGORIES = [
  'All',
  'Residential',
  'Commercial',
  'Kitchen',
  'Living Room',
  'Bedroom',
  'Office',
  'Renovation',
];

const ProjectsPage = () => {
  const { settings, projects } = useStudio();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCat = searchParams.get('category') || 'All';
  const [activeCategory, setActiveCategory] = useState(
    CATEGORIES.includes(initialCat) ? initialCat : 'All'
  );

  useEffect(() => {
    document.title = `Projects — ${settings.studioName || 'Atelier Vera'}`;
  }, [settings.studioName]);

  useEffect(() => {
    const qCat = searchParams.get('category');
    if (qCat && CATEGORIES.includes(qCat)) {
      setActiveCategory(qCat);
    }
  }, [searchParams]);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    if (cat === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  };

  const publishedProjects = projects.filter((p) => p.published);
  const filteredProjects =
    activeCategory === 'All'
      ? publishedProjects
      : publishedProjects.filter((p) => p.category === activeCategory);

  return (
    <div className="bg-[#F8F7F3] text-[#292824] pt-14 sm:pt-20 pb-28 lg:pb-36">
      <PageContainer className="space-y-16 lg:space-y-20">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <RevealOnScroll variant="text">
            <p className="text-xs uppercase tracking-[0.12em] text-[#77746D]">
              Selected Works
            </p>
          </RevealOnScroll>
          <RevealOnScroll variant="heading" delay={0.05}>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[58px] text-[#292824] leading-[1.1]">
              Architectural Portfolio
            </h1>
          </RevealOnScroll>
        </div>

        {/* Restrained Minimal Text Category Filters */}
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-b border-[#DEDAD1] pb-5">
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => handleCategoryChange(category)}
                className={`text-sm pb-1 transition-colors duration-200 ${
                  isActive
                    ? 'text-[#292824] font-medium border-b border-[#292824]'
                    : 'text-[#77746D] hover:text-[#292824]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Asymmetric Editorial Portfolio Layout */}
        {filteredProjects.length === 0 ? (
          <div className="py-20 text-center space-y-4">
            <p className="font-serif text-2xl text-[#292824]">
              No projects currently archived under {activeCategory}.
            </p>
            <button
              type="button"
              onClick={() => handleCategoryChange('All')}
              className="text-sm text-[#777C61] underline"
            >
              View All Works
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-20 lg:gap-y-28 lg:gap-x-16 items-start">
            {filteredProjects.map((project, index) => {
              const pattern = index % 3;
              const colClass =
                pattern === 0
                  ? 'lg:col-span-7'
                  : pattern === 1
                  ? 'lg:col-span-5 lg:mt-20'
                  : 'lg:col-span-10 lg:col-start-2';
              const aspectClass =
                pattern === 0
                  ? 'aspect-[16/11]'
                  : pattern === 1
                  ? 'aspect-[4/5]'
                  : 'aspect-[16/9]';

              return (
                <div key={project._id} className={colClass}>
                  <ProjectPreviewCard
                    project={project}
                    aspectClass={aspectClass}
                    delay={(index % 2) * 0.08}
                  />
                </div>
              );
            })}
          </div>
        )}
      </PageContainer>
    </div>
  );
};

export default ProjectsPage;
