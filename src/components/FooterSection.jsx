import React, { useRef } from 'react';
import SwapButton from './SwapButton';

export function FooterSection() {
  const footerRef = useRef(null);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Projects', href: '#projects' },
    { label: 'AI', href: '/ai' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: 'mailto:tkjs.koushik@gmail.com' },
  ];

  return (
    <footer
      id="footer"
      ref={footerRef}
      className="
        pt-32 pb-10
        max-[767px]:pt-24
        max-[479px]:pt-20
        font-manrope text-white
        bg-black
        relative overflow-hidden
      "
    >
      <SwapButton text="Let's Talk" footerRef={footerRef} />
      <div
        className="
          w-full max-w-[1600px] mx-auto
          px-6 sm:px-8 xl:px-12
          max-[479px]:px-4
        "
      >
        {/* Top row */}
        <div
          className="
            flex flex-wrap justify-between items-end gap-8 mb-24 lg:mb-36
            max-[991px]:flex-col max-[991px]:justify-start max-[991px]:items-start
            max-[479px]:mb-16
          "
        >
          {/* Left: tagline */}
          <div className="max-w-[640px]">
            <h2
              className="
                text-white font-medium
                text-4xl sm:text-5xl lg:text-[54px] leading-[1.08] tracking-[-0.03em]
                max-[479px]:text-[32px] max-[479px]:leading-[1.15]
              "
            >
              Let's connect and create something great together.
            </h2>
          </div>

          {/* Right: nav links */}
          <div
            className="
              hidden md:flex flex-wrap justify-end items-end gap-6 sm:gap-8
            "
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="
                  group
                  text-white/80 hover:text-white transition-colors duration-200 no-underline
                  pt-[2px]
                  text-base sm:text-lg leading-6 font-medium
                  max-[479px]:text-xl
                "
              >
                <div>{link.label}</div>
                <div className="bg-transparent h-px mt-[2px] p-0 overflow-hidden">
                  <div
                    className="
                      bg-white h-full w-0
                      group-hover:w-full
                      transition-all duration-300 ease-in-out
                    "
                  />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Brand wordmark / banner */}
        <div className="w-full my-6 sm:my-12 select-none overflow-hidden pointer-events-none">
          <svg
            viewBox="0 0 1600 245"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto text-white opacity-95 transition-opacity duration-300 select-none block pointer-events-none"
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
        </div>

        {/* Bottom bar */}
        <div
          className="
            flex flex-wrap justify-between items-center gap-4 mt-12 pt-8
            border-t border-white/10
            text-xs sm:text-sm text-white/50
            max-[991px]:flex-col max-[991px]:items-start
          "
        >
          <div className="flex flex-wrap items-center gap-3">
            <span>
              Designed & developed with precision by{' '}
              <a
                href="https://thalarikoushik.in"
                className="text-white hover:underline transition-colors"
              >
                Thalari Koushik
              </a>
            </span>

            {/* Bullet dot */}
            <div className="bg-white/40 rounded-full flex-none w-[5px] h-[5px] mx-1 hidden sm:block" />

            <span>All rights reserved &copy; {new Date().getFullYear()}</span>
          </div>

          {/* Social / Legal Links */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-white/70">
            <a
              href="https://github.com/Riyakoushik"
              target="_blank"
              rel="noreferrer"
              className="text-white/60 hover:text-white underline-offset-4 hover:underline transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/tkoushik"
              target="_blank"
              rel="noreferrer"
              className="text-white/60 hover:text-white underline-offset-4 hover:underline transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://discord.com/invite/qDbEUEeg"
              target="_blank"
              rel="noreferrer"
              className="text-white/60 hover:text-white underline-offset-4 hover:underline transition-colors"
            >
              Discord
            </a>
            <a
              href="https://drive.google.com/file/d/1GMDRozMAPazkyNs1cyaFtNxC0nD_fB5I/view?usp=sharing"
              target="_blank"
              rel="noreferrer"
              className="text-white/60 hover:text-white underline-offset-4 hover:underline transition-colors"
            >
              Resume
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterSection;
