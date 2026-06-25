import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const DesktopPromptModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if device is mobile or tablet (viewport width < 1024px)
    const checkViewport = () => {
      if (window.innerWidth < 1024) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    // Run check on mount
    checkViewport();

    // Listen for resize changes
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            backdropFilter: "blur(8px)",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            fontFamily: '"Roboto", "Manrope", sans-serif',
          }}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            style={{
              backgroundColor: "#000000",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: "24px",
              padding: "32px 24px",
              maxWidth: "400px",
              width: "100%",
              textAlign: "center",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.5)",
            }}
          >
            {/* Minimal Laptop/Desktop Icon */}
            <div style={{ marginBottom: "20px", display: "flex", justifyContent: "center" }}>
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ff9f1c"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </div>

            <h3
              style={{
                fontSize: "20px",
                fontWeight: 500,
                color: "#ffffff",
                margin: "0 0 12px 0",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Desktop Recommended
            </h3>

            <p
              style={{
                fontSize: "14px",
                lineHeight: "1.6",
                color: "rgba(255, 255, 255, 0.65)",
                margin: "0 0 24px 0",
              }}
            >
              This website is currently in development. For the best and most optimal experience, please view it on a desktop or laptop device.
            </p>

            <button
              onClick={() => setIsOpen(false)}
              style={{
                backgroundColor: "#ffffff",
                color: "#000000",
                border: "none",
                borderRadius: "30px",
                padding: "12px 32px",
                fontSize: "14px",
                fontWeight: 500,
                cursor: "pointer",
                transition: "opacity 0.2s ease",
                width: "100%",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Proceed Anyway
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
