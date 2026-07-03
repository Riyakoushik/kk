import React, { useRef } from "react";
import SwapButton from "./SwapButton";

const Skiper19 = () => {
  const footerRef = useRef(null);

  return (
    <footer
      ref={footerRef}
      className="relative font-jakarta-sans w-full bg-black py-20 px-8 text-white overflow-hidden min-h-[450px]"
    >
      <SwapButton text="Let's Talk" footerRef={footerRef} />
      <h1 className="mt-24 text-center text-[15.5vw] font-bold leading-[0.9] tracking-tighter lg:text-[16.6vw] whitespace-nowrap select-none pointer-events-none">
        Talari koushik
      </h1>
      <div className="mt-20 flex w-full flex-col items-start gap-8 px-4 font-medium lg:mt-0 lg:flex-row lg:justify-between relative">
        <div className="flex w-full items-center justify-between gap-12 uppercase lg:w-fit lg:justify-center text-white/50 text-xs tracking-wider">
          <p className="w-fit">
            Location <br />
            <span className="text-white">Kurnool, India & Remote</span>
          </p>
          <p className="w-fit text-right lg:text-left">
            Role <br />
            <span className="text-white">Product Manager / AI Specialist</span>
          </p>
        </div>
        <div className="flex w-full flex-wrap items-center justify-between gap-12 uppercase lg:w-fit lg:justify-center text-white/50 text-xs tracking-wider">
          <p className="w-fit">
            Education & training <br />
            <span className="text-white">BCA Graduate / McKinsey Forward</span>
          </p>
          <p className="w-fit text-right lg:text-left">
            Status <br />
            <span className="text-white">Open to Opportunities (Full-Time)</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export { Skiper19 };



