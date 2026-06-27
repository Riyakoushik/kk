import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const AnimatedNumber = ({ value }) => {
  const [displayValue, setDisplayValue] = useState("");
  const ref = useRef(null);
  // Trigger counting animation when the numbers scroll into view
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  useEffect(() => {
    // If not in view yet, parse and show zeroed version
    const prefix = value.startsWith("$") ? "$" : "";
    const cleanValue = value.replace(/^\$/, "");
    const suffixMatch = cleanValue.match(/[a-zA-Z% ]+$/);
    const suffix = suffixMatch ? suffixMatch[0] : "";
    const numericStr = cleanValue.replace(/[a-zA-Z% ]+$/, "");
    const target = parseFloat(numericStr);

    if (isNaN(target)) {
      setDisplayValue(value);
      return;
    }

    const decimalMatch = numericStr.match(/\.(\d+)/);
    const decimals = decimalMatch ? decimalMatch[1].length : 0;

    if (!isInView) {
      setDisplayValue(`${prefix}${parseFloat("0").toFixed(decimals)}${suffix}`);
      return;
    }

    let start = 0;
    const duration = 2800; // Slower count animation (2.8s)
    const startTime = performance.now();

    const updateNumber = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out quad
      const easeProgress = progress * (2 - progress);
      const current = start + easeProgress * (target - start);
      
      setDisplayValue(`${prefix}${current.toFixed(decimals)}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      }
    };

    requestAnimationFrame(updateNumber);
  }, [value, isInView]);

  return <span ref={ref}>{displayValue}</span>;
};

const MetricsSection = () => {
  const metrics = [
    {
      value: "8.2B",
      label: "tokens used",
      description: "Total input and output tokens processed during development"
    },
    {
      value: "$12",
      label: "development cost",
      description: "Total API cost incurred for generation and optimization"
    },
    {
      value: "3.2 YRS",
      label: "time elapsed",
      description: "Total build, run, and iteration time spent"
    },
    {
      value: "12%",
      label: "built by RIYA",
      description: "Percentage of the codebase built and refactored by the agent"
    }
  ];

  return (
    <section className="w-full bg-[#000000] text-white py-28 px-4 md:px-8 font-manrope overflow-hidden">
      <div className="max-w-[1600px] mx-auto w-[95%]">
        
        {/* Title / Heading */}
        <div className="flex flex-col items-start justify-start text-left mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-[clamp(1.75rem,4vw,3.25rem)] font-light tracking-tight max-w-4xl text-white/90 leading-tight uppercase font-manrope"
          >
            THE ENGINE <span className="font-extrabold text-white">BEHIND THE PROJECTS</span>
          </motion.h2>
        </div>

        {/* Grid of stats - group/grid enables hover state coordination */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16 text-center group/grid">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              className="flex flex-col items-center group cursor-default transition-all duration-500 ease-out opacity-30 group-hover/grid:opacity-60 hover:!opacity-100 transform hover:scale-105"
            >
              {/* Stat Value - Using Bebas Neue for extreme scale and impact */}
              <span className="text-[clamp(5rem,9vw,8rem)] font-normal font-bebas tracking-normal text-white leading-none mb-2 select-none">
                <AnimatedNumber value={metric.value} />
              </span>
              
              {/* Stat Label */}
              <span className="text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-white/90 mb-3 transition-colors duration-300">
                {metric.label}
              </span>
              
              {/* Stat Description */}
              <p className="text-[13px] text-white/40 group-hover:text-white/70 max-w-[265px] leading-relaxed font-light transition-colors duration-300">
                {metric.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;
