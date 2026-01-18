import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import VanillaTilt from "vanilla-tilt";
import { FiDownload } from "react-icons/fi";
import {
  SiReact,
  SiJavascript,
  SiTailwindcss,
  SiHtml5,
  SiCss3,
} from "react-icons/si";

import resumeData from "../data/resumeData";

const Hero = () => {
  const heroRef = useRef(null);
  const heroCardsRef = useRef([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse tracking for spotlight effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      setMousePosition({ x: clientX, y: clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate skill badges
      gsap.from(".skill-badge", {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        delay: 1,
        ease: "power2.out",
      });
    }, heroRef);

    // VanillaTilt for React card only (center card)
    const reactCard = heroCardsRef.current[0];
    if (reactCard) {
      VanillaTilt.init(reactCard, {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.3,
        scale: 1.05,
      });
    }

    return () => {
      ctx.revert();
      const reactCard = heroCardsRef.current[0];
      if (reactCard && reactCard.vanillaTilt) {
        reactCard.vanillaTilt.destroy();
      }
    };
  }, []);

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const skills = [
    { name: "React", icon: SiReact, color: "#61DAFB" },
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
    { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
    { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
    { name: "CSS3", icon: SiCss3, color: "#1572B6" },
  ];

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-x-hidden overflow-y-visible bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 w-full max-w-full"
    >
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-pink-600/10 to-blue-600/10">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(167,139,250,0.15),transparent_50%)]"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(244,114,182,0.15),transparent_50%)]"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.15),transparent_50%)]"></div>
        </div>
      </div>

      {/* Interactive spotlight effect */}
      <div
        className="spotlight-effect absolute inset-0 opacity-0 md:opacity-100 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(167, 139, 250, 0.15), transparent 40%)`,
        }}
      ></div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-2 sm:pb-10 md:pb-20 max-w-full overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block"
            >
              <div className="glass-card px-4 py-2 rounded-full inline-flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-sm text-gray-300">
                  Available for work
                </span>
              </div>
            </motion.div>

            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-purple-400 text-lg font-semibold mb-2">
                Hi, I'm
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-gradient">
                  {resumeData.personal.name}
                </span>
              </h1>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-300 font-light">
                {resumeData.personal.title}
              </h2>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-gray-400 leading-relaxed max-w-xl"
            >
              Crafting beautiful, responsive web experiences with modern
              technologies. Specialized in building scalable applications for
              healthcare, education, and business domains.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                onClick={scrollToProjects}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-semibold text-lg overflow-hidden shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View My Work
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.button>

              <motion.a
                href="/Resume_Suraj.pdf"
                download
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-4 border-2 border-purple-400/50 text-white rounded-2xl font-semibold text-lg hover:border-purple-400 hover:bg-purple-400/10 transition-all duration-300 flex items-center gap-2 backdrop-blur-sm"
              >
                <FiDownload className="group-hover:animate-bounce" />
                Download CV
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right - Floating Tech Cards - Diamond Pattern */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center lg:justify-end w-full"
          >
            {/* Container sized for content: 2 rows of small cards + React in middle - Responsive */}
            <div className="relative w-[280px] h-[320px] sm:w-[340px] sm:h-[400px] md:w-[380px] md:h-[440px] lg:w-[420px] lg:h-[480px]">
              {/* JavaScript Card - Top Left */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                whileHover={{
                  scale: 1.1,
                  rotate: -5,
                  transition: { type: "spring", stiffness: 400, damping: 15 },
                }}
                className="absolute top-0 left-0 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 glass-card rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-center gap-1 sm:gap-2 shadow-xl shadow-yellow-500/20 cursor-pointer"
              >
                <SiJavascript className="text-2xl sm:text-3xl md:text-4xl text-yellow-400" />
                <p className="text-[10px] sm:text-xs font-semibold text-white">
                  JavaScript
                </p>
              </motion.div>

              {/* CSS3 Card - Top Right */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  transition: { type: "spring", stiffness: 400, damping: 15 },
                }}
                className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 glass-card rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-center gap-1 sm:gap-2 shadow-xl shadow-blue-500/20 cursor-pointer"
              >
                <SiCss3 className="text-2xl sm:text-3xl md:text-4xl text-blue-400" />
                <p className="text-[10px] sm:text-xs font-semibold text-white">
                  CSS3
                </p>
              </motion.div>

              {/* Main React Card - Center */}
              <motion.div
                ref={(el) => (heroCardsRef.current[0] = el)}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="absolute top-[28%] left-[25%] -translate-x-1/2 -translate-y-1/2 w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 lg:w-52 lg:h-52 glass-card rounded-3xl p-4 sm:p-5 md:p-6 flex flex-col items-center justify-center gap-2 sm:gap-3 md:gap-4 shadow-2xl shadow-cyan-500/20 cursor-pointer z-10 hero-tilt-card"
              >
                <SiReact className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-cyan-400 animate-spin-slow" />
                <div className="text-center">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1">
                    React
                  </h3>
                  <p className="text-[10px] sm:text-xs text-gray-400">
                    Component-Based UI
                  </p>
                </div>
              </motion.div>

              {/* Tailwind Card - Bottom Left */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  transition: { type: "spring", stiffness: 400, damping: 15 },
                }}
                className="absolute bottom-0 left-0 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 glass-card rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-center gap-1 sm:gap-2 shadow-xl shadow-sky-500/20 cursor-pointer"
              >
                <SiTailwindcss className="text-2xl sm:text-3xl md:text-4xl text-sky-400" />
                <p className="text-[10px] sm:text-xs font-semibold text-white">
                  Tailwind
                </p>
              </motion.div>

              {/* HTML5 Card - Bottom Right */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                whileHover={{
                  scale: 1.1,
                  rotate: -5,
                  transition: { type: "spring", stiffness: 400, damping: 15 },
                }}
                className="absolute bottom-0 right-0 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 glass-card rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-center gap-1 sm:gap-2 shadow-xl shadow-orange-500/20 cursor-pointer"
              >
                <SiHtml5 className="text-2xl sm:text-3xl md:text-4xl text-orange-500" />
                <p className="text-[10px] sm:text-xs font-semibold text-white">
                  HTML5
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Floating Skill Badges */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-0 sm:mt-4 md:mt-8 lg:mt-12"
        >
          <div className="flex gap-4 justify-center flex-wrap max-w-4xl mx-auto">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                whileHover={{ scale: 1.1, y: -5 }}
                className="skill-badge glass-card px-6 py-3 rounded-2xl flex items-center gap-3 cursor-pointer group"
              >
                <skill.icon
                  className="text-2xl"
                  style={{ color: skill.color }}
                />
                <span className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
