import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FiMapPin,
  FiBriefcase,
  FiCode,
  FiCoffee,
  FiGitCommit,
  FiAward,
} from "react-icons/fi";
import { SiReact } from "react-icons/si";
import resumeData from "../data/resumeData";
import { fadeIn } from "../utils/animations";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = textRef.current?.querySelectorAll(".word");

      if (words && words.length > 0) {
        gsap.from(words, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 20,
          stagger: 0.03,
          duration: 0.8,
          ease: "power2.out",
        });
      }

      // Animate stat cards
      gsap.from(".stat-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 95%",
          toggleActions: "play none none none",
        },
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power3.out",
        immediateRender: false, // Prevents hiding cards before trigger fires
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const words = resumeData.summary.split(" ");

  const calculateExperience = () => {
    if (!resumeData.experience || resumeData.experience.length === 0) {
      return "Fresher";
    }

    const startDate = new Date("2025-09-01");
    const currentDate = new Date();

    const monthsDiff =
      (currentDate.getFullYear() - startDate.getFullYear()) * 12 +
      (currentDate.getMonth() - startDate.getMonth());

    if (monthsDiff < 6) {
      return `${monthsDiff}+ Months Experience`;
    } else if (monthsDiff < 12) {
      return "6+ Months Experience";
    } else {
      const years = Math.floor(monthsDiff / 12);
      return `${years}+ Years Experience`;
    }
  };

  const stats = [
    {
      icon: FiCode,
      value: "6+",
      label: "Projects Built",
      color: "from-purple-500 to-violet-600",
      shadowColor: "shadow-purple-500/20",
    },
    {
      icon: FiGitCommit,
      value: "200+",
      label: "Git Commits",
      color: "from-pink-500 to-rose-600",
      shadowColor: "shadow-pink-500/20",
    },
    {
      icon: FiCoffee,
      value: "10+",
      label: "Technologies",
      color: "from-blue-500 to-cyan-600",
      shadowColor: "shadow-blue-500/20",
    },
    {
      icon: FiAward,
      value: "2",
      label: "Certifications",
      color: "from-green-500 to-emerald-600",
      shadowColor: "shadow-green-500/20",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative pt-16 sm:pt-20 pb-10 sm:pb-14 bg-gray-900 overflow-x-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-600/5 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-pink-600/5 rounded-full blur-[80px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-full relative z-10">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-purple-400 font-semibold tracking-widest uppercase text-sm mb-4"
          >
            Get to know me
          </motion.p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Me
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto"></div>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="glass-card p-8 md:p-12 rounded-3xl relative overflow-hidden">
            {/* Decorative corner */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-bl-full" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-pink-500/10 to-transparent rounded-tr-full" />

            <div
              ref={textRef}
              className="text-xl md:text-2xl text-gray-300 leading-relaxed relative z-10"
            >
              {words.map((word, index) => (
                <span key={index} className="word inline-block mr-2">
                  {word}
                </span>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <div className="glass-card px-4 py-2 rounded-full hover:bg-white/10 transition-colors duration-300">
                <span className="text-purple-400 font-semibold">
                  <FiMapPin className="inline mr-1" />{" "}
                  {resumeData.personal.location}
                </span>
              </div>
              <div className="glass-card px-4 py-2 rounded-full hover:bg-white/10 transition-colors duration-300">
                <span className="text-pink-400 font-semibold">
                  <SiReact className="inline mr-1" /> React Developer
                </span>
              </div>
              <div className="glass-card px-4 py-2 rounded-full hover:bg-white/10 transition-colors duration-300">
                <span className="text-blue-400 font-semibold">
                  <FiBriefcase className="inline mr-1" />{" "}
                  {calculateExperience()}
                </span>
              </div>
            </motion.div>
          </div>

          {/* Stats Grid */}
          <div className="stats-grid grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className={`stat-card glass-card rounded-2xl p-6 text-center cursor-pointer group relative overflow-hidden ${stat.shadowColor} hover:shadow-2xl transition-shadow duration-300`}
              >
                {/* Background gradient on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />

                <div
                  className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} mb-3`}
                >
                  <stat.icon className="text-white text-xl" />
                </div>
                <AnimatedNumber value={stat.value} />
                <p className="text-gray-400 text-sm mt-1 group-hover:text-gray-300 transition-colors">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Animated number component for stats
const AnimatedNumber = ({ value }) => {
  const [displayValue, setDisplayValue] = useState("0");
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          // Extract number from value like "6+", "500+", "2"
          const numericValue = parseInt(value);
          const suffix = value.replace(/[0-9]/g, "");
          const duration = 1500;
          const startTime = Date.now();

          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * numericValue);
            setDisplayValue(current + suffix);
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <p
      ref={ref}
      className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
    >
      {displayValue}
    </p>
  );
};

export default About;
