import React, { useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { InfiniteMarquee } from "./InfiniteMarquee";
import MagneticEffect from "./MagneticEffect";

const CoreEngineeringPanel = () => {
    return (
        <div className="w-screen h-full bg-black overflow-hidden" />
    );
};

export const IdentitySequence = ({ scrollYProgress, isVisible }) => {
    // Map the parent's scroll progress (0.4 to 0.85) to local progress (0 to 1).
    const localProgress = useTransform(scrollYProgress, [0.4, 0.85], [0, 1]);

    // 1. Card Transformation (Entrance & Scaling)
    const cardScale = useTransform(localProgress, [0, 0.4], [0.8, 1]);
    const cardY = useTransform(localProgress, [0, 0.4], ["60vh", "0vh"]);
    const cardBorderRadius = useTransform(localProgress, [0.1, 0.4], ["60px", "0px"]);

    // 2. Elements specific animations
    const phase0Opacity = useTransform(localProgress, [0, 0.15], [1, 0]);
    const cardContentOpacity = useTransform(localProgress, [0.1, 0.3], [0, 1]);

    const cardBgValue = "#000000";

    const marqueeItems = [
        <span key="1" className="text-[10rem] md:text-[16rem] font-black uppercase tracking-tighter mx-12 text-white leading-none">
            Saudade
        </span>,
        <div key="icon" className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-[#D1FF4D] flex items-center justify-center mx-12">
            <svg viewBox="0 0 100 100" className="w-20 h-20 md:w-32 md:h-32 fill-zinc-900">
                <path d="M50 0 C60 30 100 40 100 50 C100 60 60 70 50 100 C40 70 0 60 0 50 C0 40 40 30 50 0" />
            </svg>
        </div>
    ];

    return (
        <div className="relative w-screen h-full flex flex-col items-center justify-center overflow-hidden bg-black">
            {/* Phase 0: The Lead-in UI (Visible before card scales) */}
            <motion.div
                style={{ opacity: phase0Opacity }}
                className="absolute inset-0 z-0 flex flex-col items-center justify-center pointer-events-none -translate-y-12"
            >
                {/* Center Unified Action - Magnetic Group */}
                <div className="mb-16 pointer-events-auto">
                    <MagneticEffect>
                        <div className="group flex items-center gap-1 cursor-pointer">
                            <div className="relative px-10 py-5 rounded-full bg-[#D1FF4D] overflow-hidden transition-all duration-500">
                                <div className="absolute inset-0 bg-white -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                                <div className="relative z-10 h-7 overflow-hidden">
                                    <div className="flex flex-col transition-transform duration-500 ease-out group-hover:-translate-y-1/2">
                                        <span className="text-black font-bold text-xl leading-7 transition-colors duration-500">
                                            PROJECTS
                                        </span>
                                        <span className="text-black font-bold text-xl leading-7 transition-colors duration-500">
                                            PROJECTS
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="relative w-16 h-16 rounded-full bg-[#D1FF4D] overflow-hidden flex items-center justify-center transition-all duration-500">
                                <div className="absolute inset-0 bg-white -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                                <div className="relative z-10 h-8 overflow-hidden">
                                    <div className="flex flex-col transition-transform duration-500 ease-out group-hover:-translate-y-1/2">
                                        <ArrowUpRight className="w-8 h-8 text-black transition-colors duration-500" />
                                        <ArrowUpRight className="w-8 h-8 text-black transition-colors duration-500" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </MagneticEffect>
                </div>

                {/* Unified Bottom Labels Layer */}
                <div className="w-full max-w-[1200px] flex items-center justify-between px-12 text-white">
                    <div className="flex items-center gap-3 text-white/60 text-sm font-medium tracking-tight">
                        <motion.span
                            animate={{ y: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-4 h-4 flex items-center justify-center"
                        >
                            ↓
                        </motion.span>
                        <span>SCROLL</span>
                    </div>

                    <div className="text-white/60 text-sm font-medium tracking-tight">
                        A SHORT STORY
                    </div>
                </div>
            </motion.div>

            {/* The Main Card Container */}
            <motion.div
                style={{
                    scale: cardScale,
                    y: cardY,
                    borderRadius: cardBorderRadius,
                    backgroundColor: cardBgValue,
                    willChange: "transform, background-color",
                }}
                className="relative w-full h-full flex flex-col overflow-hidden origin-bottom z-10"
            >
                {/* Static SAUD - logo - ADE container */}
                <div className="relative w-full h-full flex items-center justify-center">
                    <motion.div 
                        style={{ opacity: cardContentOpacity }} 
                        className="flex items-center justify-center gap-4 md:gap-8 font-black uppercase tracking-tighter text-[8rem] sm:text-[10rem] md:text-[14rem] lg:text-[16rem] text-white leading-none select-none"
                    >
                        <span>SAUD</span>
                        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-36 md:h-36 lg:w-44 lg:h-44 rounded-full bg-[#D1FF4D] flex items-center justify-center shrink-0">
                            <svg viewBox="0 0 100 100" className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-30 lg:h-30 fill-zinc-900">
                                <path d="M50 0 C60 30 100 40 100 50 C100 60 60 70 50 100 C40 70 0 60 0 50 C0 40 40 30 50 0" />
                            </svg>
                        </div>
                        <span>ADE</span>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default function IdentitySequenceSection() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: sectionRef });
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 25, mass: 0.5 });
    const [isComp2Visible, setIsComp2Visible] = useState(false);
    const [showBorder, setShowBorder] = useState(true);

    const borderOpacity = useTransform(smoothProgress, [0.1, 0.15], [1, 0]);
    const xShift = useTransform(smoothProgress, [0, 0.1, 0.4, 1], ["0vw", "0vw", "-100vw", "-100vw"]);

    useMotionValueEvent(smoothProgress, "change", (v) => {
        if (v >= 0.20 && showBorder) setShowBorder(false);
        if (v < 0.15 && !showBorder) setShowBorder(true);

        if (v >= 0.30 && !isComp2Visible) setIsComp2Visible(true);
        if (v < 0.25 && isComp2Visible) setIsComp2Visible(false);
    });

    const { scrollYProgress: exitProgressRaw } = useScroll({
        target: sectionRef,
        offset: ["end end", "end start"]
    });

    const exitProgress = useSpring(exitProgressRaw, { stiffness: 100, damping: 30, restDelta: 0.001 });

    const exitScale = useTransform(exitProgress, [0, 1], [1, 0.85]);
    const exitOpacity = useTransform(exitProgress, [0, 1], [1, 0]);
    const exitBorderRadius = useTransform(exitProgress, [0, 1], ["0px", "40px"]);

    return (
        <div ref={sectionRef} className="relative h-[300vh] bg-black">
            <div className="sticky top-0 h-screen w-full overflow-hidden z-10">
                <motion.div
                    style={{ scale: exitScale, opacity: exitOpacity }}
                    className="w-full h-full relative origin-center"
                >
                    <motion.div
                        className="flex h-full"
                        style={{
                            width: "200vw",
                            x: xShift
                        }}
                    >
                        <div className="h-full w-screen flex-shrink-0">
                            <CoreEngineeringPanel scrollYProgress={smoothProgress} />
                        </div>
                        <div className="h-full w-screen flex-shrink-0">
                            <IdentitySequence isVisible={isComp2Visible} scrollYProgress={smoothProgress} />
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
