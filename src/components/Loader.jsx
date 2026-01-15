import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Loader = ({ onLoadingComplete }) => {
  const [phase, setPhase] = useState("initial"); // initial, reveal, complete

  useEffect(() => {
    // Phase 1: Initial animation (logo appears)
    const timer1 = setTimeout(() => {
      setPhase("reveal");
    }, 1500);

    // Phase 2: Door opens
    const timer2 = setTimeout(() => {
      setPhase("complete");
      if (onLoadingComplete) onLoadingComplete();
    }, 2800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {phase !== "complete" && (
        <div className="fixed inset-0 z-[9999] overflow-hidden">
          {/* Left Door */}
          <motion.div
            initial={{ x: 0 }}
            animate={phase === "reveal" ? { x: "-100%" } : { x: 0 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900"
          >
            {/* Left door pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(167,139,250,0.3),transparent_50%)]"></div>
            </div>
          </motion.div>

          {/* Right Door */}
          <motion.div
            initial={{ x: 0 }}
            animate={phase === "reveal" ? { x: "100%" } : { x: 0 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-gray-900 via-purple-900 to-gray-900"
          >
            {/* Right door pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(244,114,182,0.3),transparent_50%)]"></div>
            </div>
          </motion.div>

          {/* Center Content (Logo/Name) - Rises from bottom */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={
              phase === "reveal"
                ? { y: 0, opacity: 0, scale: 1.5 }
                : { y: 0, opacity: 1 }
            }
            transition={{
              duration: phase === "reveal" ? 0.5 : 0.8,
              ease: "easeOut",
            }}
            className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
          >
            <div className="text-center">
              {/* Logo */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
                className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-2xl shadow-purple-500/50"
              >
                <span className="text-4xl font-bold text-white">SG</span>
              </motion.div>

              {/* Name with typewriter effect */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="text-3xl md:text-4xl font-display font-bold text-white mb-2"
              >
                Suraj Gupta
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-medium"
              >
                Frontend Developer
              </motion.p>

              {/* Loading bar */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3, duration: 1.2, ease: "easeInOut" }}
                className="mt-8 w-48 h-1 mx-auto bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-full origin-left"
              />
            </div>
          </motion.div>

          {/* Bottom particles rising effect */}
          {phase === "initial" && (
            <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: -200, opacity: [0, 1, 0] }}
                  transition={{
                    duration: 2,
                    delay: i * 0.2,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                  className="absolute w-2 h-2 rounded-full bg-gradient-to-t from-purple-500 to-pink-500"
                  style={{ left: `${12 + i * 12}%` }}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
