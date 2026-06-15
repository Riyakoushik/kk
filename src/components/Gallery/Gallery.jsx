import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './gallery.css';

import gbg1 from '../../assets/background1.png';

gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
    const pageRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".gallery-page4",
                start: "top top",
                end: "+=120%", // Pins the page to take about 2 seconds of average scroll effort
                pin: true,
                scrub: 1,
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <section className="gallery-page4" ref={pageRef}>
            <div className="gallery-slider">
                <div className="gallery-marquee-container">
                    <div className="gallery-marquee-content">
                        <h3>Why koushik need to build all of this®?*</h3>
                        <h3>Why koushik need to build all of this®?*</h3>
                        <h3>Why koushik need to build all of this®?*</h3>
                    </div>
                    <div className="gallery-marquee-content" aria-hidden="true">
                        <h3>Why koushik need to build all of this®?*</h3>
                        <h3>Why koushik need to build all of this®?*</h3>
                        <h3>Why koushik need to build all of this®?*</h3>
                    </div>
                </div>
            </div>

            <div className="gallery-background">
                <img src={gbg1} alt="Classic Capsule" />
            </div>
        </section>
    );
};

export default Gallery;
