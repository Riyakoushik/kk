import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import heroForDesktop from "./assets/herofordestop.png";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "AI", href: "/ai" },
  { label: "Blog", href: "/blog" },
];

const CONFETTI_COLORS = ["#ffffff", "#38bdf8", "#818cf8", "#34d399", "#f472b6", "#fbbf24", "#60a5fa"];

const HeroSection = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const [confettiBatches, setConfettiBatches] = useState([]);
  const tabsRef = useRef([]);
  const navTrackRef = useRef(null);

  const burstConfetti = () => {
    const count = 16;
    const batchId = Date.now();
    const newParticles = [];

    for (let i = 0; i < count; i++) {
      // Evenly-spaced base angle + slight randomness
      const baseAngle = (i * 360) / count;
      const angleRandom = (Math.random() - 0.5) * 16;
      const angleRad = ((baseAngle + angleRandom) * Math.PI) / 180;

      // Random distance outward (40px to 80px)
      const distance = 40 + Math.random() * 40;
      const dx = Math.cos(angleRad) * distance;
      const dy = Math.sin(angleRad) * distance;

      // Random rotation and size (4px to 6.5px small square)
      const rotation = (Math.random() - 0.5) * 540;
      const size = 4 + Math.random() * 2.5;
      const color = CONFETTI_COLORS[i % CONFETTI_COLORS.length];

      newParticles.push({
        id: `${batchId}-${i}`,
        dx,
        dy,
        rotation,
        size,
        color,
      });
    }

    setConfettiBatches((prev) => [...prev, { batchId, particles: newParticles }]);

    // Remove particles after ~0.9s animation finishes
    setTimeout(() => {
      setConfettiBatches((prev) => prev.filter((b) => b.batchId !== batchId));
    }, 950);
  };

  useEffect(() => {
    // Read the active tab's offsetLeft and offsetWidth on mount and activeIndex change
    const target = tabsRef.current[activeIndex];
    if (target) {
      setPillStyle({
        left: target.offsetLeft,
        width: target.offsetWidth,
        opacity: 1,
      });
    }

    const handleResize = () => {
      const currentTarget = tabsRef.current[activeIndex];
      if (currentTarget) {
        setPillStyle({
          left: currentTarget.offsetLeft,
          width: currentTarget.offsetWidth,
          opacity: 1,
        });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeIndex]);

  const handleTabClick = (e, index) => {
    setActiveIndex(index);
    const target = e.currentTarget;
    setPillStyle({
      left: target.offsetLeft,
      width: target.offsetWidth,
      opacity: 1,
    });
  };

  return (
    <section 
      id="hero" 
      aria-label="Introduction" 
      className="h-[100dvh] min-h-[100dvh] w-full flex flex-col items-center justify-between text-white overflow-hidden relative"
      style={{
        background: "linear-gradient(180deg, #1d4ed8 0%, #1e3a8a 25%, #0c1527 50%, #000000 78%)",
      }}
    >
      {/* 1. Continuous top edge roof bar across full width */}
      <div className="absolute top-0 left-0 w-full h-[7px] bg-[#090a0d] z-40 pointer-events-none" />

      {/* 2. Top-Attached Notch Navigation Bar */}
      <header className="absolute top-0 left-0 w-full flex items-start justify-center z-40 pointer-events-none">
        <nav 
          aria-label="Primary Navigation"
          className="relative pointer-events-auto flex items-center justify-between gap-4 sm:gap-7 px-5 sm:px-6 h-[48px] bg-[#090a0d] rounded-b-[20px] rounded-t-none transition-all duration-200"
        >
          {/* Left Outside Curved Shoulder */}
          <svg 
            width="18" 
            height="18" 
            viewBox="0 0 18 18" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            className="absolute top-[7px] -left-[17.5px] pointer-events-none"
            aria-hidden="true"
          >
            <path d="M18 0 H0 C9.94 0 18 8.06 18 18 V0 Z" fill="#090a0d" />
          </svg>

          {/* Right Outside Curved Shoulder */}
          <svg 
            width="18" 
            height="18" 
            viewBox="0 0 18 18" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            className="absolute top-[7px] -right-[17.5px] pointer-events-none"
            aria-hidden="true"
          >
            <path d="M0 0 H18 C8.06 0 0 8.06 0 18 V0 Z" fill="#090a0d" />
          </svg>

          {/* Part 1 (Left): Grok Bot Avatar + Thalari Koushik in Geist Pixel */}
          <a 
            href="/" 
            className="flex items-center gap-2.5 text-white no-underline group shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40 rounded-lg"
            aria-label="Thalari Koushik Home"
          >
            {/* Grok Bot Circle Face */}
            <div className="relative w-6 h-6 rounded-full bg-gradient-to-b from-neutral-800 to-black border border-white/25 flex items-center justify-center overflow-hidden shadow-inner group-hover:border-white/50 transition-colors">
              <svg viewBox="0 0 24 24" className="w-4 h-4 relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Two friendly pill-shaped robot eyes */}
                <rect 
                  x="6.5" 
                  y="9" 
                  width="3.2" 
                  height="5.5" 
                  rx="1.6" 
                  fill="#ffffff" 
                  className="transition-transform duration-150 ease-out group-hover:scale-y-50 origin-center" 
                />
                <rect 
                  x="14.3" 
                  y="9" 
                  width="3.2" 
                  height="5.5" 
                  rx="1.6" 
                  fill="#ffffff" 
                  className="transition-transform duration-150 ease-out group-hover:scale-y-50 origin-center" 
                />
                {/* Eye glint dots */}
                <circle cx="7.7" cy="10.2" r="0.7" fill="#38bdf8" />
                <circle cx="15.5" cy="10.2" r="0.7" fill="#38bdf8" />
              </svg>
            </div>
            <span className="font-geist-pixel-circle text-[13px] font-normal tracking-normal text-white/95 group-hover:text-white transition-colors">
              Thalari Koushik
            </span>
          </a>

          {/* Part 2 (Middle): Segmented Tab Control with Sliding Pill */}
          <div 
            ref={navTrackRef}
            className="hidden md:flex items-center relative py-0.5 px-0.5"
          >
            {/* Highlighted sliding pill */}
            <div
              className="absolute top-0 bottom-0 rounded-full bg-white/[0.1] border border-white/10 shadow-sm pointer-events-none"
              style={{
                left: `${pillStyle.left}px`,
                width: `${pillStyle.width}px`,
                opacity: pillStyle.opacity,
                transition: "left 0.4s cubic-bezier(0.65, 0, 0.35, 1), width 0.4s cubic-bezier(0.65, 0, 0.35, 1), opacity 0.2s ease",
              }}
            />

            {navItems.map((item, index) => {
              const isActive = activeIndex === index;
              return (
                <a
                  key={item.label}
                  ref={(el) => (tabsRef.current[index] = el)}
                  href={item.href}
                  onClick={(e) => handleTabClick(e, index)}
                  className="relative z-10 font-geist-pixel-circle text-[12.5px] font-normal px-3 py-1 rounded-full transition-colors no-underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40 cursor-pointer select-none"
                  style={{
                    color: isActive ? "#ffffff" : "#8d929d",
                    transition: "color 0.4s cubic-bezier(0.65, 0, 0.35, 1)",
                  }}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* Part 3 (Right): White pill CTA button & mobile trigger */}
          <div className="relative flex items-center gap-2 shrink-0">
            <a
              href="mailto:tkjs.koushik@gmail.com"
              onClick={burstConfetti}
              className="relative inline-flex items-center justify-center font-geist-pixel-circle text-[12px] font-normal text-black bg-white hover:bg-neutral-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white px-3.5 py-1.5 rounded-full transition-all duration-150 no-underline shadow-sm cursor-pointer"
            >
              <span className="relative z-10">Let's Talk</span>

              {/* Confetti Particles Container */}
              {confettiBatches.map((batch) => (
                <span key={batch.batchId} className="absolute inset-0 pointer-events-none flex items-center justify-center z-20">
                  {batch.particles.map((p) => (
                    <motion.span
                      key={p.id}
                      className="absolute pointer-events-none rounded-[1px] shadow-sm"
                      initial={{
                        x: 0,
                        y: 0,
                        scale: 1,
                        opacity: 1,
                        rotate: 0,
                      }}
                      animate={{
                        x: p.dx,
                        y: p.dy,
                        scale: 0,
                        opacity: 0,
                        rotate: p.rotation,
                      }}
                      transition={{
                        duration: 0.9,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      style={{
                        width: p.size,
                        height: p.size,
                        backgroundColor: p.color,
                      }}
                    />
                  ))}
                </span>
              ))}
            </a>

            {/* Mobile Menu Trigger */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-7 h-7 rounded-full text-white/70 hover:text-white hover:bg-white/[0.08] transition-colors focus:outline-none"
              aria-label="Toggle Navigation Menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg className="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {isMobileMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M4 8h16M4 16h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pointer-events-auto absolute top-[52px] left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[320px] bg-[#090a0d]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-2.5 shadow-[0_15px_35px_rgba(0,0,0,0.7)] flex flex-col gap-1 z-50">
            <a 
              href="#about" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-geist text-[13px] text-[#8d929d] hover:text-white hover:bg-white/[0.06] px-3.5 py-2 rounded-xl transition-colors no-underline"
            >
              About
            </a>
            <a 
              href="#projects" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-geist text-[13px] text-[#8d929d] hover:text-white hover:bg-white/[0.06] px-3.5 py-2 rounded-xl transition-colors no-underline"
            >
              Projects
            </a>
            <a 
              href="/ai" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-geist text-[13px] text-[#8d929d] hover:text-white hover:bg-white/[0.06] px-3.5 py-2 rounded-xl transition-colors no-underline"
            >
              AI
            </a>
            <a 
              href="/blog" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-geist text-[13px] text-[#8d929d] hover:text-white hover:bg-white/[0.06] px-3.5 py-2 rounded-xl transition-colors no-underline"
            >
              Blog
            </a>
          </div>
        )}
      </header>

      {/* Hero Content Area - 40:60 vertical split */}
      <div className="flex flex-col items-center justify-between w-full max-w-[1600px] mx-auto px-6 sm:px-8 xl:px-12 max-[479px]:px-4 h-full z-10 box-border pt-16 sm:pt-20 pb-6 sm:pb-8 gap-4">
        
        {/* Top 40% Height - Exact wordmark matching footer */}
        <div className="w-full h-[40%] flex items-center justify-center select-none overflow-hidden">
          <h1 className="w-full flex items-center justify-center m-0 p-0">
            <svg
              viewBox="0 0 1600 245"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto max-h-full text-white block select-none"
              aria-label="Thalari Koushik"
            >
              <text
                x="50%"
                y="57%"
                dominantBaseline="middle"
                textAnchor="middle"
                fill="currentColor"
                style={{
                  fontFamily: "'Manrope', 'Roboto', sans-serif",
                  fontSize: '218px',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                }}
              >
                Thalari Koushik
              </text>
            </svg>
          </h1>
        </div>

        {/* Bottom 60% Height - Picture Container */}
        <div 
          className="hero-image-container w-full h-[60%] rounded-[24px] sm:rounded-[36px] overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.08)] border border-white/15"
        >
          <img
            src={heroForDesktop}
            alt="Thalari Koushik — Visual Architecture and Digital Experience Showcase"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover block"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
