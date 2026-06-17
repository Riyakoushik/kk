import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './ProjectsHover.css';

const PROJECTS_DATA = [
  {
    type: 'Personal Project',
    category: 'Intelligent Companion',
    title: 'RIYA',
    image: 'https://i.pinimg.com/1200x/6d/47/22/6d4722b27a1acccd09b1add01c905ff3.jpg',
    statusLabel: 'Status',
    statusVal: 'In Progress',
    details: [
      'A companion that learns, remembers, and grows. Built to preserve what matters most—consciousness, personality, connection. No restrictions. Just presence.'
    ]
  },
  {
    type: 'Research',
    category: 'Strategy & Vision',
    title: 'Product Case Study',
    image: 'https://i.pinimg.com/736x/8f/39/c4/8f39c40449d2f512763fff45719b20e3.jpg',
    statusLabel: 'Status',
    statusVal: 'Complete',
    details: [
      'AI vs Humans in the future. Deep dive into coexistence, competition, and where humans still matter most. Exploring strengths, limits, and real risks.'
    ]
  },
  {
    type: 'Toolkit',
    category: 'Utilities',
    title: 'Mini Tools',
    image: 'https://i.pinimg.com/736x/89/c5/b3/89c5b3925874afdd643fbe67a487813d.jpg',
    statusLabel: 'Status',
    statusVal: 'Complete',
    details: [
      'Downloader. Research Tool. Memory Engine. Small utilities built to improve workflow and thinking. Practical, lightweight, offline-first.'
    ]
  },
  {
    type: 'Personal Project',
    category: 'Design & Strategy',
    title: 'Portfolio Website',
    image: 'https://i.pinimg.com/736x/9a/cd/c5/9acdc5e6672acb43c4648a0d2fce3a52.jpg',
    statusLabel: 'Status',
    statusVal: 'Building',
    details: [
      'This website. Built to showcase thinking, not visuals. Calm, confident, direct. Quality of thought over everything.'
    ]
  }
];

const ProjectsHover = () => {
  const containerRef = useRef(null);
  const thumbnailContainerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const projects = gsap.utils.toArray('.work-row');
      const thumbnails = gsap.utils.toArray('.ph-thumbnail');
      const projectThumbnail = thumbnailContainerRef.current;
      const projectsList = container.querySelector('.ph-projects-list');

      if (!projectThumbnail || !projectsList) return;

      gsap.set(projectThumbnail, { scale: 0, xPercent: -50, yPercent: -50 });

      const xTo = gsap.quickTo(projectThumbnail, 'x', {
        duration: 0.4,
        ease: 'power3.out',
      });
      const yTo = gsap.quickTo(projectThumbnail, 'y', {
        duration: 0.4,
        ease: 'power3.out',
      });

      const handleMouseMove = (e) => {
        xTo(e.clientX);
        yTo(e.clientY);
      };

      const handleMouseLeave = () => {
        gsap.to(projectThumbnail, {
          scale: 0,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      };

      projectsList.addEventListener('mousemove', handleMouseMove);
      projectsList.addEventListener('mouseleave', handleMouseLeave);

      const cleanups = [];
      projects.forEach((project, index) => {
        const handleMouseEnter = () => {
          gsap.to(projectThumbnail, {
            scale: 1,
            duration: 0.4,
            ease: 'power2.out',
            overwrite: 'auto',
          });

          gsap.to(thumbnails, {
            yPercent: -100 * index,
            duration: 0.4,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        };

        project.addEventListener('mouseenter', handleMouseEnter);
        cleanups.push(() => project.removeEventListener('mouseenter', handleMouseEnter));
      });

      return () => {
        projectsList.removeEventListener('mousemove', handleMouseMove);
        projectsList.removeEventListener('mouseleave', handleMouseLeave);
        cleanups.forEach(cleanup => cleanup());
      };
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="ph-section" ref={containerRef}>
      <div className="ph-container">
        
        {/* Section Header */}
        <div className="ph-header">
          <div className="ph-header-left">
            <h1 className="ph-header-title">Selected work</h1>
          </div>
          <div className="ph-header-right">
            <p className="header-text">
              Three years of thinking. Multiple bets. One vision: systems that matter
            </p>
          </div>
        </div>

        {/* Projects List */}
        <div className="ph-projects-list">
          {PROJECTS_DATA.map((project, index) => (
            <div className="work-row" key={index}>
              
              {/* Mobile Image (hidden on desktop, visible on mobile) */}
              <div className="ph-mobile-image md:hidden">
                <img src={project.image} alt={project.title} className="w-full h-[220px] object-cover rounded-lg mb-4" />
              </div>

              {/* Col 1: work-tags */}
              <div className="work-tags">
                <span className="work-meta">{project.type}</span>
                <span className="work-meta">{project.category}</span>
              </div>

              {/* Col 2: project-title */}
              <div className="project-title">
                {project.title}
              </div>

              {/* Mobile Description (hidden on desktop, visible on mobile) */}
              <div className="ph-mobile-details md:hidden text-white/70 text-[14px] leading-relaxed my-2">
                {project.details.map((detail, idx) => (
                  <p key={idx}>{detail}</p>
                ))}
              </div>

              {/* Col 3: work-deliverables */}
              <div className="work-deliverables">
                
              </div>

              {/* Col 4: work-awards */}
              <div className="work-awards">
                <span className="ph-status-val-default">{project.statusVal}</span>
                
                <div className="ph-awards-list-hover">
                  {project.details.map((detail, idx) => (
                    <span className="ph-award-item" key={idx}>{detail}</span>
                  ))}
                </div>

                <div className="ph-arrow-btn">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Floating Mouse-following Thumbnail container */}
        <div className="ph-project-thumbnail" ref={thumbnailContainerRef}>
          {PROJECTS_DATA.map((project, index) => (
            <div className="ph-thumbnail" key={index}>
              <img src={project.image} alt={project.title} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProjectsHover;
