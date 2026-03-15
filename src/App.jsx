import { useState, lazy, Suspense } from "react";

// Critical components - loaded immediately
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Loader from "./components/Loader";
import ScrollProgress from "./components/ScrollProgress";
import BackToTop from "./components/BackToTop";
import CustomCursor from "./components/CustomCursor";

// Lazy loaded components - only loaded when needed
const About = lazy(() => import("./components/About"));
const Skills = lazy(() => import("./components/Skills"));
const Projects = lazy(() => import("./components/Projects"));
const Experience = lazy(() => import("./components/Experience"));
const Education = lazy(() => import("./components/Education"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

import "./App.css";

// Minimal fallback skeleton shown while section loads
const SectionSkeleton = () => (
  <div className="w-full py-20 flex items-center justify-center">
    <div className="flex gap-2">
      <div
        className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
        style={{ animationDelay: "0ms" }}
      />
      <div
        className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"
        style={{ animationDelay: "150ms" }}
      />
      <div
        className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
        style={{ animationDelay: "300ms" }}
      />
    </div>
  </div>
);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <Loader onLoadingComplete={() => setIsLoading(false)} />}
      <CustomCursor />

      <div
        className={`App bg-gray-900 overflow-x-hidden max-w-full ${
          isLoading
            ? "opacity-0"
            : "opacity-100 transition-opacity duration-500"
        }`}
      >
        <ScrollProgress />
        <Navbar />
        <Hero />

        {/* Lazy loaded sections with skeleton fallback */}
        <Suspense fallback={<SectionSkeleton />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Experience />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Education />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Contact />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Footer />
        </Suspense>

        <BackToTop />
      </div>
    </>
  );
}

export default App;
