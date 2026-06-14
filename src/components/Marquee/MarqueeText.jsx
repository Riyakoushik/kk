import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './marqueetext.css';

const MarqueeText = () => {
    const containerRef = useRef(null);
    const animationRef = useRef(null);
    const isForwardRef = useRef(true);

    useEffect(() => {
        if (!containerRef.current) return;

        // Start with default forward animation
        const startMarqueeAnimation = (direction = 'forward') => {
            // Kill any existing animation first
            if (animationRef.current) {
                animationRef.current.kill();
            }

            const duration = 15; // Speed adjustment (lower = faster)
            const targets = containerRef.current.querySelectorAll(".marquee-text-marquee");
            const stars = containerRef.current.querySelectorAll(".star-rotate");

            if (direction === 'forward') {
                animationRef.current = gsap.to(targets, {
                    x: '-200%',
                    duration: duration,
                    repeat: -1,
                    ease: "none",
                    modifiers: {
                        x: gsap.utils.unitize(x => parseFloat(x) % 100)
                    }
                });

                // Scroll down: rotate clockwise 110deg from current position
                gsap.to(stars, {
                    rotation: `+=110`,
                    duration: 0.5,
                    ease: "power2.out"
                });
            } else {
                animationRef.current = gsap.to(targets, {
                    x: '0%',
                    duration: duration,
                    repeat: -1,
                    ease: "none",
                    modifiers: {
                        x: gsap.utils.unitize(x => parseFloat(x) % 100)
                    }
                });

                // Scroll up: rotate anti-clockwise 110deg from current position
                gsap.to(stars, {
                    rotation: `-=110`,
                    duration: 0.5,
                    ease: "power2.out"
                });
            }
        };

        // Start initial animation
        startMarqueeAnimation('forward');
        isForwardRef.current = true;

        const handleWheel = (event) => {
            const newDirection = event.deltaY > 0 ? 'forward' : 'reverse';

            // Only change direction if it's different from current
            if ((newDirection === 'forward' && !isForwardRef.current) ||
                (newDirection === 'reverse' && isForwardRef.current)) {
                isForwardRef.current = newDirection === 'forward';
                startMarqueeAnimation(newDirection);
            }
        };

        // Add wheel event listener
        window.addEventListener("wheel", handleWheel);

        // Cleanup function
        return () => {
            window.removeEventListener("wheel", handleWheel);
            if (animationRef.current) {
                animationRef.current.kill();
            }
        };
    }, []);

    // Create multiple marquee items
    const marqueeItems = Array(6).fill(null).map((_, index) => (
        <div key={index} className="marquee-text-marquee">
            <h1 className="font-bebas tracking-wide uppercase">
                Wanna collaborate? Or just curious how I'm building this?
                <span className='star-rotate inline-block ml-4 text-[#aaa090]'>*</span>
            </h1>
        </div>
    ));

    return (
        <div ref={containerRef} className="marquee-text-container overflow-hidden py-4 border-y border-white/10 select-none">
            <div className="marquee-text-move">
                {marqueeItems}
            </div>
        </div>
    );
};

export default MarqueeText;
