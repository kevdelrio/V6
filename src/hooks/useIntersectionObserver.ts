import React, { useState, useEffect, useRef } from 'react';

export const useIntersectionObserver = (): [React.RefObject<HTMLElement>, boolean] => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });

    const current = elementRef.current;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, []);

  return [elementRef, isVisible];
};
