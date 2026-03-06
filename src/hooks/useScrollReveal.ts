import { useEffect, useRef, useState } from "react";

export const useScrollReveal = (delay = 0) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return { ref, visible };
};

export const reveal = (visible: boolean) =>
  `transition-all duration-[1200ms] ease-out ${
    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
  }`;

export const stagger = (visible: boolean, index: number) => ({
  className: `transition-all duration-[900ms] ease-out ${
    visible
      ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-6"
  }`,
  style: { transitionDelay: visible ? `${index * 120}ms` : "0ms" },
});
