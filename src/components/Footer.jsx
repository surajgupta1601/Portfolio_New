import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import { FiMail, FiLinkedin, FiGithub } from "react-icons/fi";
import resumeData from "../data/resumeData";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-black py-8 sm:py-12 overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-full">
        <div className="flex flex-col items-center gap-6">
          {/* Social Links */}
          <div className="flex gap-6">
            <motion.a
              href={`mailto:${resumeData.personal.email}`}
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-full glass-card text-gray-400 hover:text-purple-400 transition-colors"
            >
              <FiMail className="text-xl" />
            </motion.a>
            <motion.a
              href={resumeData.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-full glass-card text-gray-400 hover:text-blue-400 transition-colors"
            >
              <FiLinkedin className="text-xl" />
            </motion.a>
            <motion.a
              href={resumeData.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-full glass-card text-gray-400 hover:text-white transition-colors"
            >
              <FiGithub className="text-xl" />
            </motion.a>
          </div>

          {/* Divider */}
          <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-gray-400 flex items-center gap-2 justify-center">
              Made with{" "}
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                <FaHeart className="text-red-500" />
              </motion.span>{" "}
              by{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-semibold">
                {resumeData.personal.name}
              </span>
            </p>
            <p className="text-gray-500 text-sm mt-2">
              © {currentYear} All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
