import ScrollReveal from "./components/ScrollReveal";

const ScrollAnimationSection = () => {
  return (
    <div className="scroll-animation-wrapper w-full bg-[#000000] text-white overflow-x-hidden font-roboto">
      
      {/* About Section */}
      <section id="about" className="about h-screen w-full flex items-center justify-center px-8 relative overflow-hidden bg-[#000000]">
        <div className="w-[90%] md:w-[70%]">
          <ScrollReveal
            baseOpacity={0.05}
            enableBlur={true}
            baseRotation={2}
            blurStrength={8}
            containerClassName="w-full"
            textClassName="text-[clamp(1.5rem,4vw,3.75rem)] font-extrabold text-center tracking-tight leading-[1.125]"
            wordAnimationEnd="bottom 10%"
            rotationEnd="bottom 20%"
          >
            I'm from a small town where shortcuts aren't an option. Built my way up through execution and curiosity. Now I'm obsessed with one thing: building <a href="https://discord.com/invite/qDbEUEeg" target="_blank" rel="noopener noreferrer" className="plain-link">systems</a> that actually <a href="https://linkedin.com/in/tkoushik" target="_blank" rel="noopener noreferrer" className="plain-link">think</a>. <a href="https://github.com/Riyakoushik" target="_blank" rel="noopener noreferrer" className="plain-link">RIYA</a> is that bet.
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
};

export default ScrollAnimationSection;

