import React, { useState, useEffect } from "react";
import heroForDesktop from "./assets/herofordestop.png";

// Helper function to format date/time immediately on initialization to prevent layout shift ("LOADING..." glitch)
const getFormattedDateTime = () => {
  const now = new Date();
  return now.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  }).toUpperCase();
};

const HeroSection = () => {
  // Initialize state directly with the formatted time to prevent layout shift on reload
  const [dateTime, setDateTime] = useState(getFormattedDateTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(getFormattedDateTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#000000] h-screen w-full flex flex-col items-center justify-start text-white overflow-hidden relative font-roboto pb-6">
      
      {/* Navigation Bar - Fixed absolute at top, centered container aligning with the image/content below */}
      <nav className="absolute top-0 left-0 w-full z-50 bg-black/85 backdrop-blur-md py-6">
        <div className="w-[95%] max-w-[1600px] mx-auto flex justify-between items-center text-[18px] font-light text-white uppercase tracking-wider">
          <span>THALARI KOUSHIK</span>
          <span className="hidden md:inline text-center">BUILDING THE PRODUCT</span>
          <span>{dateTime}</span>
        </div>
      </nav>

      {/* Hero Content Area - Takes up remaining screen space, flex column layout */}
      <div className="flex flex-col items-center justify-center pt-24 w-full h-full min-h-0 z-10 box-border">
        
        {/* Hero Text - Font Bebas Neue, 400 weight, 0.5px letter-spacing, uppercase, white, centered.
            Uses a mathematically tuned clamp to align perfectly with the expanded 1600px container width
            without horizontal or vertical overflow. */}
        <h1 className="font-bebas text-[clamp(100px,min(18.5vw,30vh),280px)] font-normal uppercase tracking-[0.5px] text-white text-center leading-none mb-[16px] w-[95%] max-w-[1600px]">
          THALARI KOUSHIK
        </h1>

        {/* Image Container - Stretches wide to 95% (max 1600px) like the text, but height is constrained
            by flex-1 min-h-0 to guarantee no vertical scrolling. */}
        <div className="w-[95%] max-w-[1600px] flex-1 min-h-0 rounded-2xl overflow-hidden shadow-[0_0_25px_rgba(255,255,255,0.15)] border border-white/20 transition-all duration-300 hover:shadow-[0_0_35px_rgba(255,255,255,0.2)] hover:border-white/30">
          <img
            src={heroForDesktop}
            alt="Hero for Desktop"
            className="w-full h-full object-cover block"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
