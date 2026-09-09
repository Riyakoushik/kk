import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import test1Img from '../assets/test1.jpg';

export function LoadingScreen({ onComplete }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      onComplete?.();
    }, 1500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden pointer-events-none"
        >
          {/* Central Image in Loading Screen */}
          <motion.div
            layoutId="hero-central-badge"
            transition={{
              duration: 1.2,
              ease: [0.76, 0, 0.24, 1]
            }}
            className="w-48 h-48 sm:w-60 sm:h-60 rounded-full overflow-hidden border border-white/30 shadow-[0_0_50px_rgba(255,255,255,0.25)] relative"
          >
            <motion.img
              src={test1Img}
              alt="Loading..."
              className="w-full h-full object-cover"
              initial={{ scale: 1.15, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </motion.div>

          {/* Minimal Loading Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="mt-8 flex items-center gap-2.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            <span className="text-xs uppercase tracking-[0.25em] text-white/70 font-manrope">
              Initializing
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LoadingScreen;

