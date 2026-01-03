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
      className="relative py-20 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-display font-bold text-white mb-4">
            Experience &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Training
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          {/* Timeline Line */}
          <div
            ref={timelineRef}
            className="timeline-line absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500"
          ></div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {allExperience.map((item, index) => (
              <motion.div key={index} className="timeline-item relative">
                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-0">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border-4 border-gray-900 shadow-lg shadow-purple-500/50"></div>
                </div>

                {/* Content */}
                <div
                  className={`flex items-center ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <div className="w-1/2"></div>
                  <div className="w-1/2 px-8">
                    <div className="glass-card p-6 rounded-2xl">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                          <FaBriefcase className="text-white text-xl" />
                        </div>
                        <div>
                          <h3 className="text-xl font-display font-bold text-white">
                            {item.role}
                          </h3>
                          {item.isTraining && (
                            <span className="text-xs text-purple-400 font-semibold">
                              TRAINING
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-purple-400 font-semibold mb-1">
                        {item.company}
                      </p>
                      <p className="text-gray-500 text-sm mb-4">
                        {item.duration}
                      </p>
                      <ul className="space-y-2">
                        {item.responsibilities.map((resp, idx) => (
                          <li
                            key={idx}
                            className="text-gray-300 text-sm flex items-start"
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
