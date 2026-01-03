import { useEffect, useRef } from "react";

// Custom hook for GSAP animations with cleanup
const useGSAP = (callback, dependencies = []) => {
  const contextRef = useRef(null);

  useEffect(() => {
    const ctx = callback();
    contextRef.current = ctx;

    return () => {
      // Cleanup GSAP animations
      if (
        contextRef.current &&
        typeof contextRef.current.revert === "function"
      ) {
        contextRef.current.revert();
      }
    };
  }, dependencies);

  return contextRef;
};

export default useGSAP;
