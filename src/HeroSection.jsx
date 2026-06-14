import React from "react";
import heroForDesktop from "./assets/herofordestop.png";

const HeroSection = () => {
  return (
    <div className="bg-[#000000] min-h-screen w-full flex flex-col items-center justify-start text-white overflow-x-hidden relative font-roboto">
      
      {/* Navigation Bar - Fixed at top, 100% width, no extra padding, text color #CCCCCC */}
      <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-9 py-6 z-50 text-[14px] font-light text-[#CCCCCC] uppercase tracking-wider bg-black/80 backdrop-blur-md">
        <span className="cursor-pointer hover:text-white transition-colors duration-200">THALARI KOUSHIK</span>
        <span className="hidden md:inline text-center">BUILDING THE PRODUCT</span>
        <span className="cursor-pointer hover:text-white transition-colors duration-200">CONTACT ME</span>
      </nav>

      {/* Hero Content Area - Centered layout with top spacing to clear fixed nav */}
      <div className="flex flex-col items-center justify-center pt-32 pb-16 px-4 w-full z-10">
        
        {/* Hero Text - Font Bebas Neue, 900 weight, 2px letter-spacing, uppercase, white */}
        <h1 className="font-bebas text-5xl sm:text-7xl md:text-8xl lg:text-[110px] font-black uppercase tracking-[2px] text-white text-center leading-none mb-[20px]">
          THALARI KOUSHIK
        </h1>

        {/* Image Container - 90% wide, max 1200px, 12px rounded corners, white glow shadow, border */}
        <div className="w-[90%] max-w-[1200px] rounded-[12px] overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.1)] border border-white/20 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:border-white/30">
          <img
            src={heroForDesktop}
            alt="Hero for Desktop"
            className="w-full h-auto object-cover block"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
