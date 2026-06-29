import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const WhatsAppIcon = ({ className, ...props }) => (
  <svg className={className} viewBox="0 0 16 16" fill="currentColor" {...props}>
    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
  </svg>
);

const GmailIcon = ({ className, ...props }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
  </svg>
);

export default function SwapButton({
  text = "Let's Talk",
  onClick,
  className = "",
  footerRef,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  // High performance motion values to bypass React re-renders on mousemove
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Calibrated spring physics for a premium, organic fluid lag
  const springX = useSpring(rawX, { stiffness: 60, damping: 20, mass: 0.8 });
  const springY = useSpring(rawY, { stiffness: 60, damping: 20, mass: 0.8 });

  useEffect(() => {
    const footer = footerRef?.current;
    if (!footer) return;

    const handleMouseMove = (e) => {
      const rect = footer.getBoundingClientRect();
      // Center the button under the mouse coordinates relative to the footer container
      const targetX = e.clientX - rect.left - 86;
      const targetY = e.clientY - rect.top - 24;

      rawX.set(targetX);
      rawY.set(targetY);
    };

    const handleMouseEnter = (e) => {
      const rect = footer.getBoundingClientRect();
      const targetX = e.clientX - rect.left - 86;
      const targetY = e.clientY - rect.top - 24;

      // Position the motion values instantly at the entry point so it scales in exactly at the cursor
      rawX.set(targetX);
      rawY.set(targetY);
      setIsActive(true);
    };

    const handleMouseLeave = () => {
      setIsActive(false);
      setShowOptions(false);
    };

    footer.addEventListener("mousemove", handleMouseMove);
    footer.addEventListener("mouseenter", handleMouseEnter);
    footer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      footer.removeEventListener("mousemove", handleMouseMove);
      footer.removeEventListener("mouseenter", handleMouseEnter);
      footer.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [footerRef, rawX, rawY]);

  const handleClick = (e) => {
    if (!showOptions) {
      e.stopPropagation();
      setShowOptions(true);
    }
    if (onClick) onClick(e);
  };

  return (
    <motion.div
      className={`absolute cursor-pointer z-10 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowOptions(false);
      }}
      onClick={handleClick}
      style={{
        x: springX,
        y: springY,
        pointerEvents: isActive ? "auto" : "none",
        left: 0,
        top: 0,
      }}
      animate={{
        opacity: isActive ? 1 : 0,
        scale: isActive ? 1 : 0.9, // Start from 0.9 to prevent entering from scale(0) as per design principles
      }}
      transition={{
        opacity: { duration: 0.2, ease: "easeOut" },
        scale: { duration: 0.25, ease: "easeOut" },
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          position: "relative",
          height: "48px",
          width: "172px",
        }}
      >
        {!showOptions ? (
          <>
            {/* Text Pill - moves left and tilts on hover */}
            <motion.div
              style={{
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "40px",
                paddingLeft: "20px",
                paddingRight: "20px",
                borderRadius: "9999px",
                backgroundColor: "#F97316",
              }}
              animate={{
                left: isHovered ? "0px" : "42px",
                rotate: isHovered ? -5 : 0,
              }}
              transition={{
                duration: 0.25,
                ease: "easeOut",
              }}
            >
              <span
                style={{
                  color: "white",
                  fontWeight: 500,
                  fontSize: "16px",
                  whiteSpace: "nowrap",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {text}
              </span>
            </motion.div>

            {/* Icon Circle - moves right on hover */}
            <motion.div
              style={{
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                borderRadius: "9999px",
                backgroundColor: "#F97316",
                overflow: "hidden",
              }}
              animate={{
                left: isHovered ? "112px" : "0px",
              }}
              transition={{
                duration: 0.25,
                ease: "easeOut",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </motion.div>
          </>
        ) : (
          <div
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
            }}
          >
            {/* WhatsApp Button */}
            <motion.a
              href="https://wa.me/917901490871"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "9999px",
                backgroundColor: "#25D366",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              whileHover={{ scale: 1.15, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <WhatsAppIcon style={{ width: "22px", height: "22px" }} />
            </motion.a>

            {/* Gmail Button */}
            <motion.a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=tkjs.koushik@gmail.com&su=Collaboration%20%2F%20Inquiry&body=Hi%20Koushik%2C%0A%0AI%20was%20exploring%20your%20portfolio%20and%20work%20(specifically%20your%20projects%20like%20RIYA)%20and%20wanted%20to%20reach%20out.%20I%27d%20love%20to%20connect%20and%20chat%20about%20potential%20collaboration%2C%20product%20strategy%2C%20or%20design%20inquiries.%0A%0ALooking%20forward%20to%20hearing%20from%20you!%0A%0ABest%20regards%2C"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "9999px",
                backgroundColor: "#EA4335",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              initial={{ scale: 0, rotate: 45 }}
              animate={{ scale: 1, rotate: 0 }}
              whileHover={{ scale: 1.15, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.05 }}
            >
              <GmailIcon style={{ width: "22px", height: "22px" }} />
            </motion.a>
          </div>
        )}
      </div>
    </motion.div>
  );
}
