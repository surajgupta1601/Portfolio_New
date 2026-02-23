import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VanillaTilt from "vanilla-tilt";
import { FiGithub, FiExternalLink, FiStar, FiGitBranch } from "react-icons/fi";
import resumeData from "../data/resumeData";
import { fadeIn } from "../utils/animations";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef(null);
  const [githubData, setGithubData] = useState({});
  const [filter, setFilter] = useState("All");

  // Fetch GitHub stars for projects
  useEffect(() => {
    const fetchGithubData = async () => {
      const username = "surajgupt1601";
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100`,
        );
        if (response.ok) {
          const repos = await response.json();
          const repoMap = {};
          repos.forEach((repo) => {
            repoMap[repo.name] = {
              stars: repo.stargazers_count,
              forks: repo.forks_count,
              language: repo.language,
            };
          });
          setGithubData(repoMap);
        }
      } catch (error) {
        console.log("GitHub API rate limited or unavailable");
      }
    };
    fetchGithubData();
  }, []);

  // GSAP scroll animation — only once
  useEffect(() => {
    const cards = document.querySelectorAll(".project-card");
    gsap.set(cards, { opacity: 1, y: 0 });

    const ctx = gsap.context(() => {
      const sectionRect = sectionRef.current?.getBoundingClientRect();
      const isAlreadyInView =
        sectionRect && sectionRect.top < window.innerHeight;

      if (!isAlreadyInView) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              once: true,
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Extract unique technologies from all projects
  const allTech = [
    "All",
    ...new Set(resumeData.projects.flatMap((p) => p.tech || [])),
  ];

  const filteredProjects =
    filter === "All"
      ? resumeData.projects
      : resumeData.projects.filter((p) => p.tech?.includes(filter));

  // Color map for tech badges
  const techColorMap = {
    React: "from-cyan-500/20 to-blue-500/20 text-cyan-300 border-cyan-500/30",
    "Tailwind CSS":
      "from-sky-500/20 to-cyan-500/20 text-sky-300 border-sky-500/30",
    JavaScript:
      "from-yellow-500/20 to-amber-500/20 text-yellow-300 border-yellow-500/30",
    "Node.js":
      "from-green-500/20 to-emerald-500/20 text-green-300 border-green-500/30",
    MongoDB:
      "from-green-600/20 to-lime-600/20 text-green-400 border-green-600/30",
    HTML: "from-orange-500/20 to-red-500/20 text-orange-300 border-orange-500/30",
    CSS: "from-blue-500/20 to-indigo-500/20 text-blue-300 border-blue-500/30",
    PHP: "from-indigo-500/20 to-purple-500/20 text-indigo-300 border-indigo-500/30",
    MySQL: "from-blue-600/20 to-cyan-600/20 text-blue-400 border-blue-600/30",
    Bootstrap:
      "from-purple-500/20 to-violet-500/20 text-purple-300 border-purple-500/30",
    GSAP: "from-green-500/20 to-lime-500/20 text-green-300 border-green-500/30",
    "Framer Motion":
      "from-pink-500/20 to-purple-500/20 text-pink-300 border-pink-500/30",
    "Gemini API":
      "from-blue-400/20 to-indigo-400/20 text-blue-300 border-blue-400/30",
    Recharts: "from-red-500/20 to-pink-500/20 text-red-300 border-red-500/30",
  };

  const getDefaultColor = () =>
    "from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30";

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-16 sm:py-24 bg-gray-900 overflow-x-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-600/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-pink-600/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-full relative z-10">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-purple-400 font-semibold tracking-widest uppercase text-sm mb-4"
          >
            My recent work
          </motion.p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4">
            Featured{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Projects
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mb-8"></div>

          {/* Tech Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-2 justify-center max-w-3xl mx-auto"
          >
            {allTech.slice(0, 8).map((tech) => (
              <motion.button
                key={tech}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(tech)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  filter === tech
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30"
                    : "glass-card text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {tech}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => {
            const repoData = githubData[project.repoName] || {};
            return (
              <ProjectCard
                key={project.name}
                project={project}
                repoData={repoData}
                index={index}
                techColorMap={techColorMap}
                getDefaultColor={getDefaultColor}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Separate component so each card manages its own VanillaTilt lifecycle
const ProjectCard = ({
  project,
  repoData,
  index,
  techColorMap,
  getDefaultColor,
}) => {
  const tiltRef = useRef(null);

  useEffect(() => {
    const el = tiltRef.current;
    if (!el) return;

    VanillaTilt.init(el, {
      max: 12,
      speed: 400,
      glare: true,
      "max-glare": 0.25,
      scale: 1.03,
      gyroscope: true,
      gyroscopeMinAngleX: -20,
      gyroscopeMaxAngleX: 20,
      gyroscopeMinAngleY: -20,
      gyroscopeMaxAngleY: 20,
    });

    return () => {
      if (el.vanillaTilt) {
        el.vanillaTilt.destroy();
      }
    };
  }, []);

  return (
    <div
      ref={tiltRef}
      className="project-card glass-card rounded-2xl overflow-hidden group cursor-pointer relative"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Top gradient line */}
      <div className="h-1 w-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 opacity-60 group-hover:opacity-100 transition-opacity" />

      <div className="p-8">
        {/* Project Header */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-display font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
              {project.name}
            </h3>
            <div className="flex gap-3">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
                onClick={(e) => e.stopPropagation()}
              >
                <FiGithub className="text-xl" />
              </a>
              {project.live !== "#" && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-purple-400 transition-colors p-1 hover:bg-purple-400/10 rounded-lg"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FiExternalLink className="text-xl" />
                </a>
              )}
            </div>
          </div>

          {/* GitHub Stats */}
          {(repoData.stars !== undefined || repoData.forks !== undefined) && (
            <div className="flex gap-3 mb-3">
              <span className="inline-flex items-center gap-1 text-xs text-yellow-400/80">
                <FiStar className="text-yellow-400" />
                {repoData.stars || 0}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                <FiGitBranch />
                {repoData.forks || 0}
              </span>
              {repoData.language && (
                <span className="text-xs text-gray-500">
                  • {repoData.language}
                </span>
              )}
            </div>
          )}

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-3">
            {project.tech?.map((tech, idx) => (
              <span
                key={idx}
                className={`px-2.5 py-1 text-xs font-semibold rounded-full bg-gradient-to-r border ${
                  techColorMap[tech] || getDefaultColor()
                }`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 mb-4 leading-relaxed text-sm">
          {project.description}
        </p>

        {/* Features */}
        <div className="mb-4">
          <ul className="space-y-2">
            {project.features.map((feature, idx) => (
              <li
                key={idx}
                className="text-sm text-gray-400 flex items-start group/feature"
              >
                <span className="text-purple-400 mr-2 group-hover/feature:text-pink-400 transition-colors">
                  ▸
                </span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Hover Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};

export default Projects;
