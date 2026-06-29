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
      <div className="mt-20 flex w-full flex-col items-start gap-5 px-4 font-medium lg:mt-0 lg:flex-row lg:justify-between relative">
        <div className="flex w-full items-center justify-between gap-12 uppercase lg:w-fit lg:justify-center text-white/50 text-xs tracking-wider">
          <p className="w-fit">
            punjab, india <br />
            and online
          </p>
          <p className="w-fit text-right lg:text-left">
            sep 1, 2025 <br /> the Moosa pind
          </p>
        </div>
        <div className="flex w-full flex-wrap items-center justify-between gap-12 uppercase lg:w-fit lg:justify-center text-white/50 text-xs tracking-wider">
          <p className="w-fit">
            online <br /> free
          </p>
          <p className="w-fit text-right lg:text-left">
            in person tickets <br /> $600
          </p>
        </div>
      </div>
    </footer>
  );
};

export { Skiper19 };



