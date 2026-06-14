import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import "./footertitle.css";

gsap.registerPlugin(ScrollTrigger);

const FooterTitle = () => {
    const ftConRef = useRef(null);

    useGSAP(() => {
        if (!ftConRef.current) return;

        const innerChars = ftConRef.current.querySelectorAll(".ftCharInner");

        // Initial state - start from left (-120%)
        gsap.set(innerChars, { x: "-120%" });

        // Animation - move to normal position (0%)
        gsap.to(innerChars, {
            x: "0%",
            stagger: 0.02,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ftConRef.current,
                start: "top 90%",
                end: "top 80%",
                scrub: true,
            }
        });
    }, { scope: ftConRef });

    const name = "THALARI KOUSHIK";

    return (
        <section ref={ftConRef} className='relative z-1 w-full h-[35vh] md:h-[40vh] border-t border-[#c4c1b9]/20 font-manrope bg-black overflow-hidden flex flex-col justify-between py-8'>
            <div className='w-full max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center px-6 md:px-12 text-[#b1a696] text-[12px] uppercase tracking-wider gap-4'>
                <p>
                    BUILD BY THALARI KOUSHIK
                </p>
                <p className="flex gap-4">
                    <span>This website is using <a href="#" className='text-[#f2ede5] hover:underline'>cookies</a></span>
                    <span>All rights reserved © <a href="#" className='text-[#f2ede5] hover:underline'>2026</a></span>
                </p>
            </div>

            <div className='footer-title w-full text-center mt-auto mb-4 select-none'>
                <h1 className='text-[10vw] font-bold font-bebas text-[#f4efe7] leading-none tracking-tight flex justify-center overflow-hidden w-full'>
                    {name.split("").map((char, index) => (
                        <span key={index} className="ftChar inline-block overflow-hidden relative">
                            <span className="ftCharInner inline-block will-change-transform">
                                {char === " " ? "\u00A0" : char}
                            </span>
                        </span>
                    ))}
                </h1>
            </div>
        </section>
    );
};

export default FooterTitle;
