import React from "react";
import heroForDesktop from "./assets/herofordestop.png";

const HeroSection = () => {
  return (
    <div className="bg-[#000000] h-screen w-full flex flex-col items-center justify-start text-white overflow-hidden relative font-roboto pb-6">
      
      {/* Navigation Bar - Fixed absolute at top, 100% width */}
      <nav className="absolute top-0 left-0 w-full flex justify-between items-center px-9 py-6 z-50 text-[12px] font-light text-[#A0A0A0] uppercase tracking-wider bg-black/85 backdrop-blur-md">
        <span className="cursor-pointer hover:text-white transition-colors duration-200">THALARI KOUSHIK</span>
        <span className="hidden md:inline text-center">BUILDING THE PRODUCT</span>
        <span className="cursor-pointer hover:text-white transition-colors duration-200">CONTACT ME</span>
      </nav>

      {/* Hero Content Area - Takes up remaining screen space, flex column layout */}
      <div className="flex flex-col items-center justify-center pt-24 px-4 w-full h-full min-h-0 z-10 box-border">
        
        {/* Hero Text - Font Bebas Neue, 400 weight, 0.5px letter-spacing, uppercase, white, centered.
            Uses vh-clamped font size to scale down if the screen is short, preventing scroll. */}
        <h1 className="font-bebas text-[clamp(60px,18vh,240px)] font-normal uppercase tracking-[0.5px] text-white text-center leading-none mb-[16px]">
          THALARI KOUSHIK
        </h1>

        {/* Image Container - Constrained to fit within the viewport height, flex-1 and min-h-0 */}
        <div className="w-[95%] max-w-[1400px] flex-1 min-h-0 rounded-[16px] overflow-hidden shadow-[0_0_25px_rgba(255,255,255,0.15)] border border-white/20 transition-all duration-300 hover:shadow-[0_0_35px_rgba(255,255,255,0.2)] hover:border-white/30 flex items-center justify-center bg-[#111111]/30">
          <img
            src={heroForDesktop}
            alt="Hero for Desktop"
            className="w-full h-full object-contain block"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
