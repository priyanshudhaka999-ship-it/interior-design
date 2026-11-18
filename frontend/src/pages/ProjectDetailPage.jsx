import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useStudio } from '../context/StudioContext';
import RevealOnScroll from '../components/common/RevealOnScroll';
import SmartImage from '../components/common/SmartImage';
import BeforeAfterSlider from '../components/common/BeforeAfterSlider';
import {
  PageContainer,
  ProjectPreviewCard,
} from '../components/common/EditorialPrimitives';

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const { settings, projects } = useStudio();

  const publishedProjects = projects.filter((p) => p.published);
  const currentIndex = publishedProjects.findIndex(
    (p) => p.slug === slug || p._id === slug
  );
  const project =
    currentIndex !== -1
      ? publishedProjects[currentIndex]
      : projects.find((p) => p.slug === slug || p._id === slug);

  useEffect(() => {
    if (project) {
      document.title = `${project.title} — ${settings.studioName || 'Atelier Vera'}`;
    }
  }, [project, settings.studioName]);

  if (!project) {
    return (
      <PageContainer className="py-28 text-center space-y-6">
        <h1 className="font-serif text-3xl text-[#292824]">Project Not Found</h1>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm text-[#292824] border-b border-[#292824] pb-0.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Projects</span>
        </Link>
      </PageContainer>
    );
  }

  const prevProject =
    publishedProjects.length > 1
      ? publishedProjects[
          (currentIndex - 1 + publishedProjects.length) % publishedProjects.length
        ]
      : null;
  const nextProject =
    publishedProjects.length > 1
      ? publishedProjects[(currentIndex + 1) % publishedProjects.length]
      : null;

  const relatedProjects = publishedProjects
    .filter((p) => p._id !== project._id)
    .slice(0, 2);

  return (
    <article className="bg-[#F8F7F3] text-[#292824] pt-12 sm:pt-16 pb-28 lg:pb-36">
      <PageContainer className="space-y-20 lg:space-y-28">
        {/* Header & Metadata */}
        <div className="space-y-10">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-[#77746D] hover:text-[#292824] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Projects</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8 space-y-4">
              <RevealOnScroll variant="heading">
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-[58px] text-[#292824] leading-[1.08]">
                  {project.title}
                </h1>
              </RevealOnScroll>
              <RevealOnScroll variant="text" delay={0.08}>
                <p className="text-base sm:text-lg text-[#77746D] max-w-2xl">
                  {project.shortDescription}
                </p>
              </RevealOnScroll>
            </div>

            <RevealOnScroll
              variant="text"
              delay={0.14}
              className="lg:col-span-4 grid grid-cols-3 gap-6 border-t lg:border-t-0 border-[#DEDAD1] pt-6 lg:pt-0 text-xs"
            >
              <div>
                <p className="text-[#77746D] uppercase tracking-[0.1em]">Location</p>
                <p className="text-[#292824] mt-1">{project.location}</p>
              </div>
              <div>
                <p className="text-[#77746D] uppercase tracking-[0.1em]">Category</p>
                <p className="text-[#292824] mt-1">{project.category}</p>
              </div>
              <div>
                <p className="text-[#77746D] uppercase tracking-[0.1em]">Year</p>
                <p className="text-[#292824] mt-1">{project.completionYear}</p>
              </div>
            </RevealOnScroll>
          </div>
        </div>

        {/* Expansive Cover Photograph */}
        <RevealOnScroll variant="image">
          <div className="aspect-[16/9] overflow-hidden bg-[#EFEBE3]">
            <SmartImage
              src={project.coverImage?.url}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        </RevealOnScroll>

        {/* Editorial Case Study Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 border-t border-[#DEDAD1] pt-16">
          <div className="lg:col-span-5 space-y-6">
            <RevealOnScroll variant="text">
              <p className="text-xs uppercase tracking-[0.12em] text-[#77746D]">
                Architectural Overview
              </p>
            </RevealOnScroll>
            <RevealOnScroll variant="heading" delay={0.05}>
              <p className="font-serif text-2xl sm:text-3xl text-[#292824] leading-relaxed">
                {project.overview}
              </p>
            </RevealOnScroll>

            {project.materialsPalette?.length > 0 && (
              <RevealOnScroll variant="text" delay={0.12} className="pt-4 space-y-2">
                <p className="text-xs uppercase tracking-[0.12em] text-[#77746D]">
                  Materiality
                </p>
                <p className="text-sm text-[#292824]">
                  {project.materialsPalette.join(' · ')}
                </p>
              </RevealOnScroll>
            )}
          </div>

          <div className="lg:col-span-7 space-y-10">
            <RevealOnScroll variant="text" className="space-y-2">
              <h2 className="font-serif text-2xl text-[#292824]">Design Concept</h2>
              <p className="text-base text-[#77746D] leading-relaxed">
                {project.designConcept}
              </p>
            </RevealOnScroll>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 border-t border-[#DEDAD1] pt-8">
              <RevealOnScroll variant="text" delay={0.06} className="space-y-2">
                <h3 className="font-serif text-xl text-[#292824]">Site Challenges</h3>
                <p className="text-sm text-[#77746D] leading-relaxed">
                  {project.challenges}
                </p>
              </RevealOnScroll>
              <RevealOnScroll variant="text" delay={0.12} className="space-y-2">
                <h3 className="font-serif text-xl text-[#292824]">Architectural Solutions</h3>
                <p className="text-sm text-[#77746D] leading-relaxed">
                  {project.solutions}
                </p>
              </RevealOnScroll>
            </div>
          </div>
        </div>

        {/* Varied-Scale Editorial Image Gallery */}
        {project.gallery?.length > 0 && (
          <section className="space-y-12 lg:space-y-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              {project.gallery.map((img, i) => {
                const isFull = i % 3 === 0;
                const colSpan = isFull
                  ? 'lg:col-span-12'
                  : i % 3 === 1
                  ? 'lg:col-span-7'
                  : 'lg:col-span-5 lg:mt-16';
                const aspect = isFull
                  ? 'aspect-[16/9]'
                  : i % 3 === 1
                  ? 'aspect-[4/3]'
                  : 'aspect-[4/5]';

                return (
                  <RevealOnScroll
                    key={i}
                    variant="image"
                    delay={(i % 2) * 0.08}
                    className={`${colSpan} space-y-3`}
                  >
                    <div className={`overflow-hidden bg-[#EFEBE3] ${aspect}`}>
                      <SmartImage
                        src={img.url}
                        alt={img.alt || `${project.title} study ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {img.alt && (
                      <p className="text-xs text-[#77746D]">{img.alt}</p>
                    )}
                  </RevealOnScroll>
                );
              })}
            </div>
          </section>
        )}

        {/* Before & After Comparison Where Available */}
        {project.beforeAfter?.enabled && (
          <section className="space-y-8 border-t border-[#DEDAD1] pt-16">
            <div className="max-w-2xl space-y-3">
              <p className="text-xs uppercase tracking-[0.12em] text-[#77746D]">
                Transformation Study
              </p>
              <h2 className="font-serif text-3xl text-[#292824]">
                Before & After Intervention
              </h2>
              <p className="text-sm text-[#77746D] leading-relaxed">
                {project.beforeAfter.transformationSummary}
              </p>
            </div>
            <BeforeAfterSlider
              beforeImage={project.beforeAfter.beforeImage?.url}
              afterImage={project.beforeAfter.afterImage?.url}
            />
          </section>
        )}

        {/* Previous and Next Project Navigation */}
        {prevProject && nextProject && (
          <nav
            aria-label="Project Navigation"
            className="border-y border-[#DEDAD1] py-10 grid grid-cols-1 sm:grid-cols-2 gap-8"
          >
            <Link
              to={`/projects/${prevProject.slug}`}
              className="group flex flex-col items-start space-y-1"
            >
              <span className="text-xs text-[#77746D] inline-flex items-center gap-1.5">
                <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                Previous Project
              </span>
              <span className="font-serif text-2xl text-[#292824] group-hover:text-[#777C61] transition-colors">
                {prevProject.title}
              </span>
            </Link>

            <Link
              to={`/projects/${nextProject.slug}`}
              className="group flex flex-col sm:items-end space-y-1 sm:text-right"
            >
              <span className="text-xs text-[#77746D] inline-flex items-center gap-1.5">
                Next Project
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="font-serif text-2xl text-[#292824] group-hover:text-[#777C61] transition-colors">
                {nextProject.title}
              </span>
            </Link>
          </nav>
        )}

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="space-y-10">
            <h2 className="font-serif text-3xl text-[#292824]">Related Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {relatedProjects.map((rel, idx) => (
                <ProjectPreviewCard
                  key={rel._id}
                  project={rel}
                  aspectClass="aspect-[16/10]"
                  delay={idx * 0.1}
                />
              ))}
            </div>
          </section>
        )}
      </PageContainer>
    </article>
  );
};

export default ProjectDetailPage;
