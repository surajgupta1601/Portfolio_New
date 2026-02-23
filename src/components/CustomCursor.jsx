import { useEffect, useRef, useState, useCallback } from "react";

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Only show on desktop
    if (typeof window === "undefined") return;
    if (window.innerWidth < 1024) {
      setIsMobile(true);
      return;
    }
    setIsMobile(false);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Main animation loop — ring follows with lerp, dot is instant
  const animate = useCallback(() => {
    // Lerp for the trailing ring (smooth follow)
    const lerp = 0.15;
    ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerp;
    ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerp;

    // Apply transforms directly — no React state, no spring, zero overhead
    if (dotRef.current) {
      dotRef.current.style.transform = `translate(${mousePos.current.x}px, ${mousePos.current.y}px) translate(-50%, -50%)`;
    }
    if (ringRef.current) {
      ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`;
    }

    rafId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-pointer") ||
        target.closest(".cursor-pointer")
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-pointer") ||
        target.closest(".cursor-pointer")
      ) {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseout", handleMouseOut, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Start the animation loop
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isMobile, animate, isVisible]);

  if (isMobile) return null;

  return (
    <>
      {/* Main cursor dot — instant, zero lag */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference"
        style={{
          width: isHovering ? 50 : 10,
          height: isHovering ? 50 : 10,
          opacity: isVisible ? 1 : 0,
          willChange: "transform",
          transition: "width 0.2s ease, height 0.2s ease, opacity 0.15s ease",
        }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: isHovering ? "rgba(255,255,255,0.15)" : "#fff",
            border: isHovering ? "2px solid #fff" : "none",
            transition: "background 0.2s ease, border 0.2s ease",
          }}
        />
      </div>

      {/* Trailing ring — smooth lerp follow */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9997]"
        style={{
          width: isHovering ? 60 : 36,
          height: isHovering ? 60 : 36,
          opacity: isVisible ? 0.4 : 0,
          willChange: "transform",
          transition: "width 0.25s ease, height 0.25s ease, opacity 0.15s ease",
        }}
      >
        <div className="w-full h-full rounded-full border border-purple-400/60" />
      </div>
    </>
  );
};

export default CustomCursor;
