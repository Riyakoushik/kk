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
            <div className="menu-bottom">
              <a href="https://instagram.com/nameiskoushikthalari" target="_blank" rel="noopener noreferrer" className="hover:scale-110 active:scale-95 transition-transform duration-200" aria-label="Instagram">
                <svg className="w-8 h-8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <radialGradient id="menu-ig-grad" cx="30%" cy="107%" r="130%">
                      <stop offset="0%" stopColor="#fdf497"/>
                      <stop offset="5%" stopColor="#fdf497"/>
                      <stop offset="45%" stopColor="#fd5949"/>
                      <stop offset="60%" stopColor="#d6249f"/>
                      <stop offset="90%" stopColor="#285AEB"/>
                    </radialGradient>
                  </defs>
                  <path fill="url(#menu-ig-grad)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051c-.058 1.28-.072 1.689-.072 4.949 0 3.26.014 3.669.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.26 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.26-.014-3.669-.073-4.949-.2-4.357-2.618-6.78-6.979-6.98C15.668.014 15.26 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a href="https://discord.com/invite/qDbEUEeg" target="_blank" rel="noopener noreferrer" className="hover:scale-110 active:scale-95 transition-transform duration-200" aria-label="Discord">
                <svg className="w-8 h-8" fill="#5865F2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.094 13.094 0 0 1-1.873-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.195.373.289a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z" />
                </svg>
              </a>
              <a href={gmailComposeUrl} target="_blank" rel="noopener noreferrer" className="hover:scale-110 active:scale-95 transition-transform duration-200" aria-label="Gmail">
                <svg className="w-8 h-8" fill="#ea4335" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </a>
              <a href="https://linkedin.com/in/tkoushik" target="_blank" rel="noopener noreferrer" className="hover:scale-110 active:scale-95 transition-transform duration-200" aria-label="LinkedIn">
                <svg className="w-8 h-8" fill="#0A66C2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a href="https://github.com/Riyakoushik" target="_blank" rel="noopener noreferrer" className="hover:scale-110 active:scale-95 transition-transform duration-200" aria-label="GitHub">
                <svg className="w-8 h-8" fill="#ffffff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
              </a>
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
