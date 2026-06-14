import React, { useState, useEffect, useRef } from "react";
import SplitType from "split-type";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroForDesktop from "./assets/herofordestop.png";

gsap.registerPlugin(ScrollTrigger);

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(getFormattedDateTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Scroll animation timeline merging intro text slide-out, image scale, and hero header reveals
  useEffect(() => {
    if (!heroRef.current) return;

    const nav = heroRef.current.querySelector("nav");
    const h1 = heroRef.current.querySelector(".hero-title");
    const imageContainer = heroRef.current.querySelector(".hero-image-container");
    const introTexts = heroRef.current.querySelectorAll(".banner-intro-text");
    const introContainer = heroRef.current.querySelector(".banner-intro-text-container");

    if (!nav || !h1 || !imageContainer || !introContainer) return;

    // Set initial states
    gsap.set(nav, { opacity: 0, y: -20 });
    gsap.set(h1, { opacity: 0, y: 30, scale: 0.98 });
    gsap.set(imageContainer, { scale: 0.7, opacity: 0 });

    const scrollAnim = ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top top",
      end: `+=${window.innerHeight * 1.8}px`,
      pin: true,
      scrub: 1,
      pinSpacing: true,
      onUpdate: (self) => {
        const progress = self.progress;

        // 1. Scale image container from 0.7 to 1.0 (smooth, physics-aware, no sudden scale(0) jumps)
        gsap.set(imageContainer, { 
          scale: 0.7 + Math.min(progress / 0.85, 1) * 0.3, 
          opacity: Math.min(progress / 0.3, 1) 
        });

        // 2. Slide THALARI KOUSHIK intro text out
        if (progress <= 0.8) {
          const textProgress = progress / 0.8;
          const moveDistance = window.innerWidth * 0.55;
          if (introTexts.length === 2) {
            gsap.set(introTexts[0], { x: -textProgress * moveDistance });
            gsap.set(introTexts[1], { x: textProgress * moveDistance });
          }
          gsap.set(introContainer, { opacity: 1 - textProgress });
        } else {
          gsap.set(introContainer, { opacity: 0 });
        }

        // 3. Fade in nav & main headline title near the end (from 75% to 100% progress)
        if (progress >= 0.75) {
          const revealProgress = (progress - 0.75) / 0.25;
          gsap.set(nav, { opacity: revealProgress, y: -20 + revealProgress * 20 });
          gsap.set(h1, { opacity: revealProgress, y: 30 - revealProgress * 30, scale: 0.98 + revealProgress * 0.02 });
        } else {
          gsap.set(nav, { opacity: 0, y: -20 });
          gsap.set(h1, { opacity: 0, y: 30, scale: 0.98 });
        }
      }
    });

    return () => {
      scrollAnim.kill();
    };
  }, []);

  // Close menu when clicking outside of it
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (event) => {
      const menuBox = menuRef.current?.querySelector(".menu");
      // Close if click is outside the menu box and not on the MENU toggle button itself
      if (menuBox && !menuBox.contains(event.target) && !event.target.closest("button")) {
        handleClose();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen || !menuRef.current) return;

    // 1. Initialize SplitType on all split targets
    const splitTargets = menuRef.current.querySelectorAll(".split-target");
    const splitInstance = new SplitType(splitTargets, { types: "words, chars" });

    // 2. Adjust widths and layout parameters based on rendered widths
    const menuItems = menuRef.current.querySelectorAll(".menu-item");
    menuItems.forEach((item) => {
      const linkElement = item.querySelector(".menu-item-link a");
      if (linkElement) {
        const width = linkElement.offsetWidth;
        const bgHover = item.querySelector(".menu-item-link .bg-hover");
        if (bgHover) bgHover.style.width = width + 30 + "px";
        const spanElement = item.querySelector("span");
        if (spanElement) spanElement.style.left = width + 40 + "px";
      }
    });

    // 3. Stagger menu items sliding in
    menuItems.forEach((item, index) => {
      setTimeout(() => {
        item.style.left = "0px";
      }, index * 50);
    });

    // 4. Set up shuffle text effect function
    const addShuffleEffect = (element) => {
      const chars = element.querySelectorAll(".char");
      if (!chars.length) return;
      const originalText = [...chars].map((char) => char.textContent);
      const shuffleInterval = 10;
      const resetDelay = 75;
      const additionalDelay = 150;

      chars.forEach((char, index) => {
        setTimeout(() => {
          const interval = setInterval(() => {
            char.textContent = String.fromCharCode(97 + Math.floor(Math.random() * 26));
          }, shuffleInterval);

          setTimeout(() => {
            clearInterval(interval);
            char.textContent = originalText[index];
          }, resetDelay + index * additionalDelay);
        }, index * shuffleInterval);
      });
    };

    const shuffleAll = () => {
      const shuffleTargets = menuRef.current.querySelectorAll(
        ".menu-item-link a, .menu-sub-item .menu-title p, .menu-sub-item .menu-content p"
      );
      shuffleTargets.forEach((target) => {
        addShuffleEffect(target);
      });
    };

    // Trigger initial shuffle
    shuffleAll();

    // 5. Setup event listeners
    const cleanupListeners = [];

    // Hover text color changes tracking active character
    menuItems.forEach((item) => {
      const linkElement = item.querySelector(".menu-item-link a");
      const chars = item.querySelectorAll("span .char");
      if (linkElement && chars.length) {
        const onMouseEnter = () => {
          chars.forEach((char, index) => {
            setTimeout(() => {
              char.classList.add("char-active");
            }, index * 50);
          });
        };
        const onMouseLeave = () => {
          chars.forEach((char) => {
            char.classList.remove("char-active");
          });
        };

        linkElement.addEventListener("mouseenter", onMouseEnter);
        linkElement.addEventListener("mouseleave", onMouseLeave);

        cleanupListeners.push(() => {
          linkElement.removeEventListener("mouseenter", onMouseEnter);
          linkElement.removeEventListener("mouseleave", onMouseLeave);
        });
      }
    });

    // Shuffle trigger on hover
    const hoverTargets = menuRef.current.querySelectorAll(
      ".menu-item, .menu-sub-item"
    );
    hoverTargets.forEach((item) => {
      const targetElement = item.querySelector(
        ".menu-item-link a, .menu-title p, .menu-content p"
      );
      const spanElement = item.querySelector("span");

      const onMouseEnter = () => {
        if (targetElement) addShuffleEffect(targetElement);
        if (spanElement) addShuffleEffect(spanElement);
      };

      if (targetElement) {
        targetElement.addEventListener("mouseenter", onMouseEnter);
        cleanupListeners.push(() => {
          targetElement.removeEventListener("mouseenter", onMouseEnter);
        });
      } else {
        item.addEventListener("mouseenter", onMouseEnter);
        cleanupListeners.push(() => {
          item.removeEventListener("mouseenter", onMouseEnter);
        });
      }
    });

    return () => {
      cleanupListeners.forEach((cleanup) => cleanup());
      splitInstance.revert();
    };
  }, [isMenuOpen]);

  const handleClose = () => {
    if (!menuRef.current) return;
    const menuItems = menuRef.current.querySelectorAll(".menu-item");
    menuItems.forEach((item, index) => {
      setTimeout(() => {
        item.style.left = "-100px";
      }, index * 50);
    });
    setTimeout(() => {
      setIsMenuOpen(false);
    }, menuItems.length * 50 + 200);
  };

  return (
    <div 
      ref={heroRef}
      className="bg-[#000000] h-screen w-full flex flex-col items-center justify-start text-white overflow-x-hidden relative font-roboto pb-6"
    >
      
      {/* Navigation Bar - Fixed absolute at top, centered container aligning with the image/content below */}
      <nav className="absolute top-0 left-0 w-full z-50 bg-black/85 backdrop-blur-md py-6">
        <div className="w-[95%] max-w-[1600px] mx-auto flex justify-between items-center text-[18px] font-light text-white uppercase tracking-wider">
          <span>THALARI KOUSHIK</span>
          <span className="hidden md:inline text-center">BUILDING THE PRODUCT</span>
          <div className="flex items-center gap-6">
            <span className="hidden sm:inline">{dateTime}</span>
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="cursor-pointer hover:opacity-85 active:scale-95 transition-all font-medium border border-white/20 px-4 py-1 rounded-full text-[14px]"
            >
              MENU
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Content Area - Takes up remaining screen space, flex column layout */}
      <div className="flex flex-col items-center justify-center pt-24 w-full h-full min-h-0 z-10 box-border">
        
        {/* Hero Text - Font Bebas Neue, 400 weight, 0.5px letter-spacing, uppercase, white, centered.
            Uses a mathematically tuned clamp to align perfectly with the expanded 1600px container width
            without horizontal or vertical overflow. */}
        <h1 className="hero-title font-bebas text-[clamp(100px,min(18.5vw,30vh),280px)] font-normal uppercase tracking-[0.5px] text-white text-center leading-none mb-[16px] w-[95%] max-w-[1600px]">
          THALARI KOUSHIK
        </h1>

        {/* Image Container - Stretches wide to 95% (max 1600px) like the text, but height is constrained
            by flex-1 min-h-0 to guarantee no vertical scrolling. */}
        <div className="hero-image-container w-[95%] max-w-[1600px] flex-1 min-h-0 rounded-2xl overflow-hidden shadow-[0_0_25px_rgba(255,255,255,0.15)] border border-white/20 transition-all duration-300 hover:shadow-[0_0_35px_rgba(255,255,255,0.2)] hover:border-white/30">
          <img
            src={heroForDesktop}
            alt="Hero for Desktop"
            className="w-full h-full object-cover block"
          />
        </div>
      </div>

      {/* Intro Overlay Text "THALARI KOUSHIK" - positioned over the viewport */}
      <div className="banner-intro-text-container absolute top-1/2 -translate-y-1/2 w-full flex gap-2 md:gap-4 z-20 pointer-events-none font-bebas">
        <div className="banner-intro-text flex-1 flex justify-end">
          <h1 className="text-[clamp(3.5rem,10vw,12rem)] leading-[0.9] font-normal uppercase text-[#ffffff] tracking-[0.5px]">
            THALARI
          </h1>
        </div>
        <div className="banner-intro-text flex-1 flex justify-start">
          <h1 className="text-[clamp(3.5rem,10vw,12rem)] leading-[0.9] font-normal uppercase text-[#ffffff] tracking-[0.5px]">
            KOUSHIK
          </h1>
        </div>
      </div>

      {/* Slide-out Menu Overlay Container */}
      <div 
        ref={menuRef}
        className={`menu-container ${isMenuOpen ? "open" : ""}`}
      >
        <div className="menu">
          <div className="menu-main">
            <div className="menu-top">
              <div className="menu-top-title">
                <p className="split-target">discover</p>
              </div>
              <div className="menu-top-content">
                <div className="menu-item">
                  <div className="menu-item-link">
                    <div className="bg-hover"></div>
                    <a href="#" className="split-target">story</a>
                  </div>
                  <span className="split-target">page 001</span>
                </div>
                <div className="menu-item">
                  <div className="menu-item-link">
                    <div className="bg-hover"></div>
                    <a href="#" className="split-target">Protocol</a>
                  </div>
                  <span className="split-target">20 ideas</span>
                </div>
                <div className="menu-item">
                  <div className="menu-item-link">
                    <div className="bg-hover"></div>
                    <a href="#" className="split-target">journal</a>
                  </div>
                  <span className="split-target">10 notes</span>
                </div>
                <div className="menu-item">
                  <div className="menu-item-link">
                    <div className="bg-hover"></div>
                    <a href="#" className="split-target">contact</a>
                  </div>
                  <span className="split-target">email now</span>
                </div>
                <div className="menu-item" id="active">
                  <div className="menu-item-link">
                    <div className="bg-hover"></div>
                    <a href="#" className="split-target">gallery</a>
                  </div>
                  <span className="split-target">check out</span>
                </div>
                <div className="menu-item">
                  <div className="menu-item-link">
                    <div className="bg-hover"></div>
                    <a href="#" className="split-target">about</a>
                  </div>
                  <span className="split-target">our office</span>
                </div>
              </div>
            </div>
            <div className="menu-bottom">
              <div className="menu-sub-item">
                <div className="menu-title"><p className="split-target">connect</p></div>
                <div className="menu-content"><p className="split-target">Discord</p></div>
              </div>
              <div className="menu-sub-item">
                <div className="menu-title"><p className="split-target">buy On</p></div>
                <div className="menu-content"><p className="split-target">Opensea</p></div>
              </div>
              <div className="menu-sub-item">
                <div className="menu-title"><p className="split-target">us-en</p></div>
                <div className="menu-content"><p className="split-target">2022</p></div>
              </div>
            </div>
          </div>
          <div className="menu-sidebar">
            <button 
              onClick={handleClose}
              className="close-btn text-[28px] text-white/75 hover:text-white transition-colors flex items-center justify-center h-auto w-full cursor-pointer focus:outline-none"
            >
              <svg className="w-6 h-6 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <div className="logo text-[24px] text-white/70 mb-6 flex items-center justify-center">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default HeroSection;
