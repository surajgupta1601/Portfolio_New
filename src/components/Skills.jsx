import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SiCplusplus,
  SiJavascript,
  SiPhp,
  SiHtml5,
  SiCss3,
  SiReact,
  SiBootstrap,
  SiTailwindcss,
  SiJquery,
  SiGit,
  SiGithub,
} from "react-icons/si";
import { FaCode, FaUsers, FaPuzzlePiece } from "react-icons/fa";
import { MdApi, MdDevices } from "react-icons/md";
import resumeData from "../data/resumeData";
import { staggerContainer, scaleIn } from "../utils/animations";

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state
      gsap.set(".skill-card", {
        opacity: 0,
        y: 60,
      });

      // Animate to visible state
      gsap.to(".skill-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const skillIcons = {
    "C++": SiCplusplus,
    JavaScript: SiJavascript,
    PHP: SiPhp,
    HTML: SiHtml5,
    CSS: SiCss3,
    React: SiReact,
    Bootstrap: SiBootstrap,
    "Tailwind CSS": SiTailwindcss,
    jQuery: SiJquery,
    Git: SiGit,
    GitHub: SiGithub,
    "Responsive Design": MdDevices,
    "API Integration": MdApi,
    "Team Collaboration": FaUsers,
    "Problem Solving": FaPuzzlePiece,
  };

  const allSkills = [
    {
      category: "Languages",
      skills: resumeData.skills.languages,
      color: "purple",
    },
    {
      category: "Web Technologies",
      skills: resumeData.skills.web,
      color: "blue",
    },
    {
      category: "Frameworks & Libraries",
      skills: resumeData.skills.frameworks,
      color: "pink",
    },
    { category: "Tools", skills: resumeData.skills.tools, color: "green" },
    {
      category: "Core Skills",
      skills: resumeData.skills.core,
      color: "orange",
    },
  ];

  const getColorClasses = (color) => {
    const colors = {
      purple: "from-purple-500 to-purple-700 hover:shadow-purple-500/50",
      blue: "from-blue-500 to-blue-700 hover:shadow-blue-500/50",
      pink: "from-pink-500 to-pink-700 hover:shadow-pink-500/50",
      green: "from-green-500 to-green-700 hover:shadow-green-500/50",
      orange: "from-orange-500 to-orange-700 hover:shadow-orange-500/50",
    };
    return colors[color];
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-20 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900"
    >
      <div className="container mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-display font-bold text-white mb-4">
            Skills &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Expertise
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto"></div>
        </motion.div>

        <div className="max-w-6xl mx-auto space-y-12">
          {allSkills.map((category, idx) => (
            <div key={idx}>
              <h3 className="text-2xl font-display font-semibold text-white mb-6">
                {category.category}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {category.skills.map((skill, index) => {
                  const Icon = skillIcons[skill] || FaCode;
                  return (
                    <motion.div
                      key={index}
                      variants={scaleIn}
                      whileHover={{
                        scale: 1.1,
                        rotateY: 10,
                        rotateX: 10,
                        z: 50,
                      }}
                      className="skill-card glass-card p-6 rounded-2xl flex flex-col items-center justify-center gap-3 cursor-pointer group transition-all duration-300 hover:shadow-2xl"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <div
                        className={`p-4 rounded-full bg-gradient-to-br ${getColorClasses(
                          category.color
                        )} transition-all duration-300`}
                      >
                        <Icon className="text-3xl text-white" />
                      </div>
                      <span className="text-sm font-semibold text-gray-300 text-center group-hover:text-white transition-colors">
                        {skill}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
