import React, { useState, useEffect, useRef } from "react";
import SplitType from "split-type";
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

const HeroSection = ({ isLoaded }) => {
  // Initialize state directly with the formatted time to prevent layout shift on reload
  const [dateTime, setDateTime] = useState(getFormattedDateTime);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Direct web Gmail compose URL (prevents mailto client configuration issues)
  const emailId = 'tkjs.koushik@gmail.com';
  const subject = encodeURIComponent('Inquiry: Collaborating on a New Project');
  const body = encodeURIComponent(
    `Hi Koushik,\n\nI visited your portfolio and would love to discuss a potential project collaboration.\n\nProject Details:\n- Project Type: [ Design / Development / Full-Stack / Creative Coding ]\n- Desired Timeline: [ e.g., 1-2 months ]\n- Rough Budget Range: [ e.g., $X,XXX ]\n- Project Description: \n\nLooking forward to connecting!\n\nBest,\n[ Your Name ]\n[ Your Company / Website ]`
  );
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailId}&su=${subject}&body=${body}`;

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(getFormattedDateTime());
    }, 1000);

    return () => clearInterval(timer);
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
    <div className="bg-[#000000] h-screen w-full flex flex-col items-center justify-start text-white overflow-x-hidden relative font-roboto pb-6">
      
      {/* Navigation Bar - Fixed absolute at top, centered container aligning with the image/content below */}
      <nav 
        className="absolute top-0 left-0 w-full z-50 bg-black/85 backdrop-blur-md py-6 translate-y-0 opacity-100"
      >
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
        
        {/* Hero Text - Font Bebas Neue, 400 weight, 0.5px letter-spacing, uppercase, white, centered. */}
        <h1 
          className="hero-title font-bebas text-[clamp(100px,min(18.5vw,30vh),280px)] font-normal uppercase tracking-[0.5px] text-white text-center leading-none mb-[16px] w-[95%] max-w-[1600px] translate-y-0 opacity-100 scale-100"
        >
          THALARI KOUSHIK
        </h1>

        {/* Image Container - Stretches wide to 95% (max 1600px) like the text, but height is constrained
            by flex-1 min-h-0 to guarantee no vertical scrolling. */}
        <div 
          className="hero-image-container w-[95%] max-w-[1600px] flex-1 min-h-0 rounded-2xl overflow-hidden shadow-[0_0_25px_rgba(255,255,255,0.15)] border border-white/20 transition-all duration-300 hover:shadow-[0_0_35px_rgba(255,255,255,0.2)] hover:border-white/30 translate-y-0 opacity-100 scale-100"
        >
          <img
            src={heroForDesktop}
            alt="Hero for Desktop"
            className="w-full h-full object-cover block"
          />
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
                    <a href="#about" onClick={handleClose} className="split-target">about</a>
                  </div>
                  <span className="split-target">who I am</span>
                </div>
                <div className="menu-item">
                  <div className="menu-item-link">
                    <div className="bg-hover"></div>
                    <a href="#projects" onClick={handleClose} className="split-target">projects</a>
                  </div>
                  <span className="split-target">selected work</span>
                </div>
                <div className="menu-item">
                  <div className="menu-item-link">
                    <div className="bg-hover"></div>
                    <a href="https://drive.google.com/file/d/1GMDRozMAPazkyNs1cyaFtNxC0nD_fB5I/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="split-target">resume</a>
                  </div>
                  <span className="split-target">view pdf</span>
                </div>
                <div className="menu-item">
                  <div className="menu-item-link">
                    <div className="bg-hover"></div>
                    <a href={gmailComposeUrl} target="_blank" rel="noopener noreferrer" className="split-target">contact</a>
                  </div>
                  <span className="split-target">email now</span>
                </div>
              </div>
            </div>
            <div className="menu-bottom">
              <div className="menu-sub-item">
                <div className="menu-title"><p className="split-target">instagram</p></div>
                <div className="menu-content">
                  <p className="split-target">
                    <a href="#instagram" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>connect</a>
                  </p>
                </div>
              </div>
              <div className="menu-sub-item">
                <div className="menu-title"><p className="split-target">discord</p></div>
                <div className="menu-content">
                  <p className="split-target">
                    <a href="#discord" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>connect</a>
                  </p>
                </div>
              </div>
              <div className="menu-sub-item">
                <div className="menu-title"><p className="split-target">gmail</p></div>
                <div className="menu-content">
                  <p className="split-target">
                    <a href={gmailComposeUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>email</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="menu-sidebar">
            <button 
              onClick={handleClose}
              aria-label="Close menu"
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
