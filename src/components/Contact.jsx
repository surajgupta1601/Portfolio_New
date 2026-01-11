import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
  FiCheck,
  FiAlertCircle,
} from "react-icons/fi";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import resumeData from "../data/resumeData";
import { fadeIn, slideUp } from "../utils/animations";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  // Validation functions
  const validateName = (name) => {
    if (!name.trim()) return "Name is required";
    if (name.trim().length < 2) return "Name must be at least 2 characters";
    if (!/^[a-zA-Z\s]+$/.test(name.trim()))
      return "Name can only contain letters";
    return "";
  };

  const validateEmail = (email) => {
    if (!email.trim()) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  };

  const validateMessage = (message) => {
    if (!message.trim()) return "Message is required";
    if (message.trim().length < 10)
      return "Message must be at least 10 characters";
    if (message.trim().length > 1000)
      return "Message must be less than 1000 characters";
    return "";
  };

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return validateName(value);
      case "email":
        return validateEmail(value);
      case "message":
        return validateMessage(value);
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }

    // Clear submit status when user modifies form
    if (submitStatus) {
      setSubmitStatus(null);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const validateForm = () => {
    const newErrors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      message: validateMessage(formData.message),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      // Simulate success (change to handle actual response)
      const isSuccess = true; // Change based on API response

      if (isSuccess) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setErrors({});
      } else {
        setSubmitStatus("error");
      }

      setIsSubmitting(false);

      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: FiMail,
      label: "Email",
      value: resumeData.personal.email,
      link: `mailto:${resumeData.personal.email}`,
    },
    {
      icon: FiPhone,
      label: "Phone",
      value: resumeData.personal.phone,
      link: `tel:${resumeData.personal.phone}`,
    },
    {
      icon: FiMapPin,
      label: "Location",
      value: resumeData.personal.location,
      link: null,
    },
  ];

  const socialLinks = [
    {
      icon: FaLinkedin,
      label: "LinkedIn",
      link: resumeData.personal.linkedin,
      color: "from-blue-500 to-blue-700",
    },
    {
      icon: FaGithub,
      label: "GitHub",
      link: resumeData.personal.github,
      color: "from-gray-700 to-gray-900",
    },
  ];

  return (
    <section
      id="contact"
      className="relative py-20 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900"
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
            Get In{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Touch
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg">
            Let's collaborate and create something amazing together!
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            variants={slideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-display font-semibold text-white mb-6">
              Contact Information
            </h3>

            {/* Contact Details */}
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{
                    x: 10,
                    transition: { type: "spring", stiffness: 400, damping: 15 },
                  }}
                  className="glass-card p-4 rounded-xl flex items-center gap-4"
                >
                  <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                    <item.icon className="text-white text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">{item.label}</p>
                    {item.link ? (
                      <a
                        href={item.link}
                        className="text-white font-semibold hover:text-purple-400 transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-white font-semibold">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="pt-6">
              <h4 className="text-xl font-display font-semibold text-white mb-4">
                Connect on Social Media
              </h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{
                      scale: 1.1,
                      rotate: 5,
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 15,
                      },
                    }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-4 rounded-xl bg-gradient-to-br ${social.color} text-white hover:shadow-2xl transition-all duration-300`}
                  >
                    <social.icon className="text-2xl" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={slideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <form
              onSubmit={handleSubmit}
              className="glass-card p-8 rounded-2xl space-y-6"
              noValidate
            >
              {/* Success/Error Message */}
              <AnimatePresence>
                {submitStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className={`p-4 rounded-xl flex items-center gap-3 ${
                      submitStatus === "success"
                        ? "bg-green-500/20 border border-green-500/50"
                        : "bg-red-500/20 border border-red-500/50"
                    }`}
                  >
                    {submitStatus === "success" ? (
                      <>
                        <FiCheck className="text-green-400 text-xl flex-shrink-0" />
                        <div>
                          <p className="text-green-400 font-semibold">
                            Message Sent Successfully!
                          </p>
                          <p className="text-green-300 text-sm">
                            Thank you for reaching out. I'll get back to you
                            soon.
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <FiAlertCircle className="text-red-400 text-xl flex-shrink-0" />
                        <div>
                          <p className="text-red-400 font-semibold">
                            Failed to Send Message
                          </p>
                          <p className="text-red-300 text-sm">
                            Please try again or contact me directly via email.
                          </p>
                        </div>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-400 mb-2 font-semibold"
                >
                  Name
                </label>
                <motion.input
                  whileFocus={{
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 400, damping: 15 },
                  }}
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white focus:outline-none transition-all duration-200 ${
                    errors.name
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-700 focus:border-purple-500"
                  }`}
                  placeholder="Your name"
                />
                <AnimatePresence>
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-400 text-sm mt-2 flex items-center gap-1"
                    >
                      <FiAlertCircle className="text-xs" />
                      {errors.name}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-400 mb-2 font-semibold"
                >
                  Email
                </label>
                <motion.input
                  whileFocus={{
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 400, damping: 15 },
                  }}
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white focus:outline-none transition-all duration-200 ${
                    errors.email
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-700 focus:border-purple-500"
                  }`}
                  placeholder="your@email.com"
                />
                <AnimatePresence>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-400 text-sm mt-2 flex items-center gap-1"
                    >
                      <FiAlertCircle className="text-xs" />
                      {errors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-400 mb-2 font-semibold"
                >
                  Message
                </label>
                <motion.textarea
                  whileFocus={{
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 400, damping: 15 },
                  }}
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows="5"
                  className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white focus:outline-none transition-all duration-200 resize-none ${
                    errors.message
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-700 focus:border-purple-500"
                  }`}
                  placeholder="Your message..."
                />
                <div className="flex justify-between items-center mt-2">
                  <AnimatePresence>
                    {errors.message && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-400 text-sm flex items-center gap-1"
                      >
                        <FiAlertCircle className="text-xs" />
                        {errors.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                  <p
                    className={`text-sm ml-auto ${
                      formData.message.length > 1000
                        ? "text-red-400"
                        : "text-gray-500"
                    }`}
                  >
                    {formData.message.length}/1000
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 400, damping: 15 },
                }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold text-lg flex items-center justify-center gap-2 hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <>
                    <FiSend />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
