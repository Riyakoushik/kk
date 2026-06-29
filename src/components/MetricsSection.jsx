import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const AnimatedNumber = ({ value }) => {
  const [displayValue, setDisplayValue] = useState("");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  useEffect(() => {
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
    const duration = 2800;
    const startTime = performance.now();

    const updateNumber = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
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

const MetricCard = ({ metric, index, showBrands, brands }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex flex-col items-center cursor-default relative w-full border border-transparent hover:border-zinc-900/50 rounded-2xl p-6 transition-all duration-300"
    >
      {/* Floating Pop-out Brand Icons (Appears in the top-right on hover) */}
      {showBrands && brands && (
        <div className="absolute top-3 right-3 z-20">
          <div className="relative flex items-center justify-end">
            <motion.div 
              className="flex gap-1.5 bg-zinc-900/90 backdrop-blur-md px-2 py-1 rounded-full border border-zinc-800/80 shadow-2xl"
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={isHovered ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 20, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
            >
              {brands.map((brand, i) => (
                <motion.div
                  key={i}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    backgroundColor: brand.bg,
                    border: brand.border || "1px solid rgba(255, 255, 255, 0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
                    overflow: "hidden",
                    padding: "4px"
                  }}
                  initial={{ scale: 0 }}
                  animate={isHovered ? { scale: 1 } : { scale: 0 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 280, 
                    damping: 18, 
                    delay: isHovered ? i * 0.05 : (brands.length - 1 - i) * 0.03 
                  }}
                >
                  <img 
                    src={brand.url} 
                    alt={brand.name} 
                    className="w-full h-full object-contain"
                    style={{ display: "block" }}
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      )}

      {/* Stat Value */}
      <span className="text-[clamp(5rem,9vw,8rem)] font-normal font-bebas tracking-normal text-white leading-none mb-2 select-none relative">
        <AnimatedNumber value={metric.value} />
      </span>
      
      {/* Stat Label */}
      <span className="text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-white/90 mb-3">
        {metric.label}
      </span>
      
      {/* Stat Description */}
      <p className="text-[13px] text-white/40 max-w-[265px] leading-relaxed font-light">
        {metric.description}
      </p>
    </motion.div>
  );
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

  // Specific brand configurations for the metrics boxes
  const cardsBrands = {
    0: [
      { name: "Claude", url: "https://unpkg.com/@lobehub/icons-static-svg@latest/icons/claude.svg", bg: "#FBF0DF" },
      { name: "Gemini", url: "https://unpkg.com/@lobehub/icons-static-svg@latest/icons/gemini.svg", bg: "#0F172A", border: "1px solid #1E293B" },
      { name: "Google", url: "https://unpkg.com/@lobehub/icons-static-svg@latest/icons/google.svg", bg: "#FFFFFF" },
      { name: "Kimi", url: "https://unpkg.com/@lobehub/icons-static-svg@latest/icons/kimi.svg", bg: "#FFFFFF" },
      { name: "Minimax", url: "https://unpkg.com/@lobehub/icons-static-svg@latest/icons/minimax.svg", bg: "#FFFFFF" }
    ],
    1: [
      { name: "Akamai", url: "https://vectorlogo.zone/logos/akamai/akamai-icon.svg", bg: "#FFFFFF" },
      { name: "AWS", url: "https://www.vectorlogo.zone/logos/amazon_aws/amazon_aws-icon.svg", bg: "#FFFFFF" },
      { name: "GCP", url: "https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg", bg: "#FFFFFF" }
    ],
    2: [
      { name: "Notion", url: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Notion-logo.svg", bg: "#FFFFFF" },
      { name: "Google Calendar", url: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg", bg: "#FFFFFF" }
    ]
  };

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

        {/* Grid of stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16 text-center">
          {metrics.map((metric, index) => (
            <MetricCard 
              key={index} 
              metric={metric} 
              index={index} 
              showBrands={index === 0 || index === 1 || index === 2}
              brands={cardsBrands[index]}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;
