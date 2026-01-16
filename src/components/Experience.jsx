import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaBriefcase } from "react-icons/fa";
import resumeData from "../data/resumeData";
import { slideInLeft, slideInRight } from "../utils/animations";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate timeline line
      gsap.from(".timeline-line", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 20%",
          scrub: 1,
        },
        scaleY: 0,
        transformOrigin: "top",
        ease: "none",
      });

      // Animate timeline items
      gsap.from(".timeline-item", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        x: (index) => (index % 2 === 0 ? -60 : 60),
        stagger: 0.3,
        duration: 0.8,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const allExperience = [
    ...resumeData.experience,
    ...resumeData.training.map((item) => ({
      role: item.title,
      company: item.organization,
      duration: item.duration,
      responsibilities: item.achievements,
      isTraining: true,
    })),
  ];

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-16 sm:py-20 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 overflow-x-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4">
            Experience &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Training
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          {/* Timeline Line - Positioned on left for mobile, center for desktop */}
          <div
            ref={timelineRef}
            className="timeline-line absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500"
          ></div>

          {/* Timeline Items */}
          <div className="space-y-8 md:space-y-12">
            {allExperience.map((item, index) => (
              <motion.div key={index} className="timeline-item relative">
                {/* Timeline Dot - Left aligned on mobile, center on desktop */}
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-0">
                  <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border-4 border-gray-900 shadow-lg shadow-purple-500/50"></div>
                </div>

                {/* Content - Full width on mobile (with left padding), half width on desktop */}
                <div
                  className={`flex items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Spacer - Hidden on mobile, visible on desktop */}
                  <div className="hidden md:block md:w-1/2"></div>
                  {/* Card Container - Full width on mobile (with left margin), half on desktop */}
                  <div className="w-full md:w-1/2 pl-12 pr-4 md:px-8">
                    <div className="glass-card p-4 sm:p-6 rounded-2xl">
                      <div className="flex items-center gap-2 sm:gap-3 mb-3">
                        <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                          <FaBriefcase className="text-white text-lg sm:text-xl" />
                        </div>
                        <div>
                          <h3 className="text-base sm:text-lg md:text-xl font-display font-bold text-white">
                            {item.role}
                          </h3>
                          {item.isTraining && (
                            <span className="text-xs text-purple-400 font-semibold">
                              TRAINING
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-purple-400 font-semibold text-sm sm:text-base mb-1">
                        {item.company}
                      </p>
                      <p className="text-gray-500 text-xs sm:text-sm mb-3 sm:mb-4">
                        {item.duration}
                      </p>
                      <ul className="space-y-1.5 sm:space-y-2">
                        {item.responsibilities.map((resp, idx) => (
                          <li
                            key={idx}
                            className="text-gray-300 text-xs sm:text-sm flex items-start"
                          >
                            <span className="text-pink-400 mr-2">•</span>
                            {resp}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
