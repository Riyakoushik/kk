import heroForDesktop from "./assets/herofordestop.png";

const HeroSection = () => {
  return (
    <section 
      id="hero" 
      aria-label="Introduction" 
      className="bg-[#000000] h-[100dvh] min-h-[100dvh] w-full flex flex-col items-center justify-center text-white overflow-hidden relative"
    >
      {/* Hero Content Area - 40:60 vertical split */}
      <div className="flex flex-col items-center justify-between w-full max-w-[1600px] mx-auto px-6 sm:px-8 xl:px-12 max-[479px]:px-4 h-full z-10 box-border pt-6 sm:pt-8 pb-6 sm:pb-8 gap-4">
        
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
