import React, { useRef } from 'react';
import './gallery.css';

import gbg1 from '../../assets/background1.png';

const Gallery = () => {
    const pageRef = useRef(null);

    // Generate repeating elements
    const generateCapsules = (quantity = 6) => {
        const capsules = [];
        for (let i = 1; i <= quantity; i++) {
            capsules.push(
                <h3 key={i} style={{ "--index": i }} className='tracking-tighter'>
                    Built Projects For Fun
                </h3>
            );
        }
        return capsules;
    };

    return (
        <section className="gallery-page4" ref={pageRef}>
            <div className="gallery-slider">
                <div
                    className="gallery-box"
                    style={{ "--time": "40s", "--quantity": 6 }}
                >
                    {generateCapsules(6)}
                </div>
            </div>

            <div className="gallery-background">
                <img src={gbg1} alt="Classic Capsule" />
            </div>
        </section>
    );
};

export default Gallery;
