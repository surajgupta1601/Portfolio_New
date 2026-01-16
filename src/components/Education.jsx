import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VanillaTilt from "vanilla-tilt";
import { FaGraduationCap, FaCertificate, FaCalendarAlt } from "react-icons/fa";
import { HiAcademicCap, HiBadgeCheck } from "react-icons/hi";
import resumeData from "../data/resumeData";
import { fadeIn } from "../utils/animations";

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".edu-card", {
        opacity: 0,
        y: 60,
      });

      gsap.to(".edu-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: "power3.out",
      });
    }, sectionRef);

    // VanillaTilt for cards
    cardRefs.current.forEach((ref) => {
      if (ref) {
        VanillaTilt.init(ref, {
          max: 10,
          speed: 400,
          glare: true,
          "max-glare": 0.2,
          scale: 1.02,
        });
      }
    });

    return () => {
      ctx.revert();
      cardRefs.current.forEach((ref) => {
        if (ref && ref.vanillaTilt) {
          ref.vanillaTilt.destroy();
        }
      });
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="education"
      className="relative py-16 sm:py-20 bg-gray-900 overflow-x-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30 overflow-hidden">
        <div className="absolute top-20 left-10 w-48 sm:w-72 h-48 sm:h-72 bg-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-48 sm:w-72 h-48 sm:h-72 bg-pink-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-full">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4">
            Education &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Certifications
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto"></div>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Education */}
          <div className="mb-16">
            <h3 className="text-2xl font-display font-semibold text-white mb-8 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                <HiAcademicCap className="text-white text-xl" />
              </div>
              Academic Background
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resumeData.education.map((edu, index) => (
                <div
                  key={index}
                  ref={addToRefs}
                  className="edu-card group relative cursor-pointer"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Gradient Border */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 p-[1px] opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-[1px] rounded-2xl bg-gray-900"></div>
                  </div>

                  {/* Card Content */}
                  <div className="relative p-6 rounded-2xl bg-gray-900/80 backdrop-blur-sm border border-purple-500/20 group-hover:border-purple-500/50 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <motion.div
                        className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/25"
                        whileHover={{ rotate: 360 }}
                        transition={{
                          duration: 0.6,
                          type: "spring",
                          stiffness: 200,
                        }}
                      >
                        <FaGraduationCap className="text-white text-2xl" />
                      </motion.div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-lg font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                          {edu.degree}
                        </h4>
                        <p className="text-purple-400 font-medium text-sm mb-2">
                          {edu.institution}
                        </p>

                        {/* Duration & Score */}
                        <div className="flex flex-wrap items-center gap-3 mt-3">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-800 text-gray-400 text-xs">
                            <FaCalendarAlt className="text-purple-400" />
                            {edu.duration}
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 text-xs font-semibold border border-purple-500/30">
                            {edu.score}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Decorative element */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-bl-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-2xl font-display font-semibold text-white mb-8 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-pink-500 to-orange-500">
                <HiBadgeCheck className="text-white text-xl" />
              </div>
              Professional Certifications
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resumeData.certifications.map((cert, index) => (
                <div
                  key={index}
                  ref={addToRefs}
                  className="edu-card group relative cursor-pointer"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Gradient Border */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 p-[1px] opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-[1px] rounded-2xl bg-gray-900"></div>
                  </div>

                  {/* Card Content */}
                  <div className="relative p-6 rounded-2xl bg-gray-900/80 backdrop-blur-sm border border-pink-500/20 group-hover:border-pink-500/50 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <motion.div
                        className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center shadow-lg shadow-pink-500/25"
                        whileHover={{ rotate: 360 }}
                        transition={{
                          duration: 0.6,
                          type: "spring",
                          stiffness: 200,
                        }}
                      >
                        <FaCertificate className="text-white text-2xl" />
                      </motion.div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-lg font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-purple-400 transition-all duration-300">
                          {cert.name}
                        </h4>
                        <p className="text-pink-400 font-medium text-sm mb-2">
                          {cert.issuer}
                        </p>

                        {/* Date & Verified */}
                        <div className="flex flex-wrap items-center gap-3 mt-3">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-800 text-gray-400 text-xs">
                            <FaCalendarAlt className="text-pink-400" />
                            {cert.date}
                          </span>
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-semibold border border-green-500/30">
                            <HiBadgeCheck className="text-sm" />
                            Verified
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Decorative element */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-pink-500/5 to-purple-500/5 rounded-bl-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
