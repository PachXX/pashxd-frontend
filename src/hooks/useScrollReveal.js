import { useEffect, useRef } from "react";

export function useScrollReveal() {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const elements = ref.current.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");

            // ✅ Stop observing after reveal (performance boost)
            observerInstance.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  return ref;
}