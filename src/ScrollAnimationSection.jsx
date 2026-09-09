import ScrollReveal from "./components/ScrollReveal";

const ScrollAnimationSection = () => {
  return (
    <div className="scroll-animation-wrapper w-full bg-[#000000] text-white overflow-x-hidden font-roboto">
      
      {/* About Section */}
      <section id="about" className="about min-h-[50vh] w-full flex items-start justify-start pt-16 md:pt-28 pb-16 relative overflow-hidden bg-[#000000]">
        <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-8 xl:px-12 max-[479px]:px-4">
          <ScrollReveal
            baseOpacity={0.15}
            enableBlur={true}
            baseRotation={2}
            blurStrength={8}
            containerClassName="w-full"
            textClassName="text-[clamp(1.5rem,3.8vw,3.25rem)] font-semibold text-left tracking-tight leading-[1.25]"
            wordAnimationEnd="bottom 40%"
            rotationEnd="bottom 50%"
          >
            I'm from a small town where shortcuts aren't an option. Built my way up through execution and curiosity. Now I'm obsessed with one thing: building <a href="https://discord.com/invite/qDbEUEeg" target="_blank" rel="noopener noreferrer" className="plain-link">systems</a> that actually <a href="https://linkedin.com/in/tkoushik" target="_blank" rel="noopener noreferrer" className="plain-link">think</a>. <a href="https://github.com/Riyakoushik" target="_blank" rel="noopener noreferrer" className="plain-link">RIYA</a> is that bet.
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
};

export default ScrollAnimationSection;

