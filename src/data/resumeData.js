// Suraj Gupta - Resume Data
// All information extracted from CV - No hallucination

const resumeData = {
  personal: {
    name: "Suraj Gupta",
    title: "Front-End Web Developer",
    location: "Chhatarpur, New Delhi, India",
    email: "suraj802119@gmail.com",
    phone: "7903771301",
    linkedin: "https://www.linkedin.com/in/surajgupta23/",
    github: "https://github.com/surajgupta1601/",
  },

  summary:
    "Passionate Frontend Developer specializing in building modern, responsive, and scalable web applications. Experienced in creating seamless user experiences with clean code and pixel-perfect designs. Successfully delivered real-world projects across healthcare, education, and business domains, leveraging cutting-edge technologies to solve complex problems. Strong advocate for best practices, performance optimization, and user-centric design.",

  experience: [
    {
      role: "Frontend Developer Trainee",
      company: "HackHunt Cybersecure LLP",
      duration: "Sep 2025 - Present",
      location: "Remote",
      responsibilities: [
        "Developed and maintained responsive UI components",
        "Implemented new features based on requirements",
        "Collaborated with founders and team members",
        "Fixed UI bugs and optimized performance",
        "Followed Git best practices (commits, branches)",
      ],
    },
  ],

  training: [
    {
      title: "Front-End Web Development Training",
      organization: "Gokboru Tech Pvt Ltd",
      duration: "June 2024 – July 2024",
      achievements: [
        "Built responsive web applications using HTML, CSS, JavaScript",
        "Created Amazon Clone and To-Do List App",
        "Hands-on experience with APIs and UI development",
      ],
    },
  ],

  projects: [
    {
      name: "Wellness Tracker",
      repoName: "Wellness-Tracker",
      tech: ["React", "Tailwind CSS", "Recharts"],
      description:
        "A comprehensive wellness tracking app to track daily activities, monitor progress, and build healthy habits with data visualization.",
      features: [
        "Interactive dashboard with charts (Recharts)",
        "Dark/Light mode with system preference",
        "CSV export & offline local storage",
        "Responsive mobile-first design",
      ],
      github: "https://github.com/surajgupt1601/Wellness-Tracker",
      live: "#",
    },
    {
      name: "Portfolio – React",
      repoName: "Portfolio_New",
      tech: ["React", "Tailwind CSS", "Framer Motion", "GSAP"],
      description:
        "Modern portfolio website built with React, Tailwind CSS, and Framer Motion with stunning animations.",
      features: [
        "Glassmorphism design",
        "GSAP & Framer Motion animations",
        "Responsive & Interactive",
      ],
      github: "https://github.com/surajgupt1601/Portfolio_New",
      live: "#",
    },
    {
      name: "Student Management System",
      repoName: "Student-Management-System",
      tech: ["PHP", "MySQL", "Bootstrap", "JavaScript", "HTML", "CSS"],
      description:
        "A comprehensive system for managing student records and administrative tasks with role-based authentication.",
      features: [
        "Role-based authentication (Admin, Student)",
        "Admin panel reduced manual work by ~40%",
      ],
      github: "https://github.com/surajgupt1601/Student-Management-System",
      live: "#",
    },
    {
      name: "EcoTravel – AI-Powered Tourism",
      repoName: "EcoTravel",
      tech: ["React", "Node.js", "MongoDB", "Gemini API", "Tailwind CSS"],
      description:
        "Full-stack MERN web app that encourages sustainable tourism using Google Gemini API for AI-driven travel suggestions.",
      features: [
        "AI-powered travel suggestions (Gemini API)",
        "Carbon footprint calculator",
        "Eco-friendly hotel listings",
        "Interactive travel planner with maps",
      ],
      github: "https://github.com/surajgupt1601/EcoTravel",
      live: "#",
    },
    {
      name: "MediCare Plus – Healthcare Platform",
      repoName: "Medicare-Plus---Hospital-Service",
      tech: ["HTML", "CSS", "JavaScript", "Tailwind CSS", "GSAP", "Gemini API"],
      description:
        "A comprehensive healthcare platform with advanced features for patient care and medical consultations.",
      features: [
        "AI-based symptom checker",
        "Appointment booking & emergency help",
        "Video consultation & doctor availability",
      ],
      github:
        "https://github.com/surajgupt1601/Medicare-Plus---Hospital-Service",
      live: "https://medicare-plus-hospital-service.vercel.app",
    },
    {
      name: "ToDo List App",
      repoName: "ToDo-List",
      tech: ["HTML", "CSS", "JavaScript"],
      description:
        "A simple and elegant to-do list application for task management.",
      features: ["Add, edit, delete tasks", "Local storage persistence"],
      github: "https://github.com/surajgupt1601/ToDo-List",
      live: "https://surajgupt1601.github.io/ToDo-List/",
    },
  ],

  skills: {
    languages: ["C++", "JavaScript", "PHP"],
    web: ["HTML", "CSS"],
    frameworks: ["React", "Bootstrap", "Tailwind CSS", "jQuery"],
    tools: ["Git", "GitHub"],
    core: [
      "Responsive Design",
      "API Integration",
      "Team Collaboration",
      "Problem Solving",
    ],
  },

  certifications: [
    {
      name: "React Basics",
      issuer: "Coursera",
      date: "March 2024",
      link: "#",
    },
    {
      name: "HTML, CSS & JavaScript for Web Developers",
      issuer: "Coursera",
      date: "April 2024",
      link: "#",
    },
  ],

  education: [
    {
      degree: "MCA (Master of Computer Applications)",
      institution: "Lovely Professional University",
      duration: "2023 – 2025",
      score: "CGPA: 7.49",
    },
    {
      degree: "BCA (Bachelor of Computer Applications)",
      institution: "Veer Kunvar Singh University",
      duration: "2018 – 2021",
      score: "Percentage: 70.15%",
    },
  ],
};

export default resumeData;
