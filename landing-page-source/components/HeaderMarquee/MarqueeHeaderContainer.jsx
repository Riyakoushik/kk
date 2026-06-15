import MarqueeTextSlider from "./MarqueeTextSlider";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MarqueeHeaderContainer = () => {
    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".pin-con",
                start: "top top",
                end: "+=20%",
                scrub: 1,
                pin: true,
                // markers: true,
            },
        });

        // 1️⃣ Animate height from 20vh → 0
        tl.fromTo(
            ".sticky-spacer",
            { height: "20vh" },
            { height: "0vh", ease: "none" }
        );

        // 2️⃣ Then remove it from layout
        tl.set(".sticky-spacer, .marquee-con-none", { display: "none" });
    });

    return (
        <section className=" w-full overflow-hidden">
            <div className="pin-con relative">
                <div className="marquee-con-none absolute top-0 -z-1">
                    <MarqueeTextSlider />
                </div>

                {/* SPACE RESERVER — extremely important */}
                <div className="sticky-spacer w-full h-[20vh]" />
            </div>
        </section>
    );
};

export default MarqueeHeaderContainer;
