import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import resumeData from "../data/resumeData";
import { fadeIn } from "../utils/animations";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split text into words for animation
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Split summary into words for animation
  const words = resumeData.summary.split(" ");

  // Calculate total experience dynamically
  const calculateExperience = () => {
    if (!resumeData.experience || resumeData.experience.length === 0) {
      return "Fresher";
    }

    // Get the earliest start date from experience
    const currentRole = resumeData.experience[0];
    const startDate = new Date("2025-09-01"); // Sep 2025
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

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-16 sm:py-20 bg-gray-900 overflow-x-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-full">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Me
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto"></div>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="glass-card p-8 md:p-12 rounded-3xl">
            <div
              ref={textRef}
              className="text-xl md:text-2xl text-gray-300 leading-relaxed"
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
              <div className="glass-card px-4 py-2 rounded-full">
                <span className="text-purple-400 font-semibold">
                  📍 {resumeData.personal.location}
                </span>
              </div>
              <div className="glass-card px-4 py-2 rounded-full">
                <span className="text-pink-400 font-semibold">
                  🎓 MCA Student
                </span>
              </div>
              <div className="glass-card px-4 py-2 rounded-full">
                <span className="text-blue-400 font-semibold">
                  💼 {calculateExperience()}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
