import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGraduationCap, FaCertificate } from "react-icons/fa";
import { SiCoursera } from "react-icons/si";
import resumeData from "../data/resumeData";
import { fadeIn, scaleIn } from "../utils/animations";

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".education-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 60,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="education"
      className="relative py-20 bg-gray-900"
    >
      <div className="container mx-auto px-6">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-display font-bold text-white mb-4">
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
            <h3 className="text-3xl font-display font-semibold text-white mb-8 flex items-center gap-3">
              <FaGraduationCap className="text-purple-400" />
              Education
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resumeData.education.map((edu, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ scale: 1.05 }}
                  className="education-card glass-card p-6 rounded-2xl"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                      <FaGraduationCap className="text-white text-2xl" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-display font-bold text-white mb-2">
                        {edu.degree}
                      </h4>
                      <p className="text-purple-400 font-semibold mb-1">
                        {edu.institution}
                      </p>
                      <p className="text-gray-500 text-sm mb-2">
                        {edu.duration}
                      </p>
                      <div className="inline-block px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full">
                        <span className="text-sm font-semibold text-purple-300">
                          {edu.score}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-3xl font-display font-semibold text-white mb-8 flex items-center gap-3">
              <FaCertificate className="text-pink-400" />
              Certifications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resumeData.certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ scale: 1.05 }}
                  className="education-card glass-card p-6 rounded-2xl"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-pink-500 to-orange-500">
                      <SiCoursera className="text-white text-2xl" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-display font-bold text-white mb-2">
                        {cert.name}
                      </h4>
                      <p className="text-pink-400 font-semibold mb-1">
                        {cert.issuer}
                      </p>
                      <p className="text-gray-500 text-sm">{cert.date}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
