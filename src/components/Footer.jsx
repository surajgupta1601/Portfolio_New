import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import { FiMail, FiLinkedin, FiGithub, FiArrowUp } from "react-icons/fi";
import resumeData from "../data/resumeData";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-black py-12 sm:py-16 overflow-x-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 max-w-full">
        <div className="max-w-6xl mx-auto">
          {/* Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
            {/* Brand */}
            <div className="text-center md:text-left">
              <motion.a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("#home");
                }}
                className="text-3xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 inline-block mb-3"
                whileHover={{ scale: 1.05 }}
              >
                SG
              </motion.a>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
                Passionate Frontend Developer crafting beautiful and responsive
                web experiences.
              </p>
            </div>

            {/* Quick Links */}
            <div className="text-center">
              <h4 className="text-white font-semibold mb-4 text-sm tracking-widest uppercase">
                Quick Links
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {navLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    whileHover={{ x: 4 }}
                    className="text-gray-400 hover:text-purple-400 transition-colors text-sm py-1"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="text-center md:text-right">
              <h4 className="text-white font-semibold mb-4 text-sm tracking-widest uppercase">
                Connect
              </h4>
              <div className="flex gap-4 justify-center md:justify-end">
                <motion.a
                  href={`mailto:${resumeData.personal.email}`}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 rounded-xl glass-card text-gray-400 hover:text-purple-400 hover:bg-purple-400/10 transition-all duration-300"
                >
                  <FiMail className="text-xl" />
                </motion.a>
                <motion.a
                  href={resumeData.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 rounded-xl glass-card text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 transition-all duration-300"
                >
                  <FiLinkedin className="text-xl" />
                </motion.a>
                <motion.a
                  href={resumeData.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 rounded-xl glass-card text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  <FiGithub className="text-xl" />
                </motion.a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-8" />

          {/* Copyright */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © {currentYear} {resumeData.personal.name}. All rights reserved.
            </p>
            <p className="text-gray-400 flex items-center gap-2 text-sm">
              Made with{" "}
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                <FaHeart className="text-red-500" />
              </motion.span>{" "}
              and{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-semibold">
                React
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
