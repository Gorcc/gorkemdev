"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const TRAIL_LENGTH = 10;

export const CustomCursor = () => {
  const [trail, setTrail] = useState<{ x: number; y: number }[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setTrail((prev) => {
        const next = [...prev, { x: e.clientX, y: e.clientY }];
        return next.length > TRAIL_LENGTH ? next.slice(-TRAIL_LENGTH) : next;
      });
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <>
      {trail.map((pos, i) => (
        <motion.div
          key={i}
          className="fixed pointer-events-none z-50"
          animate={{
            x: pos.x - 16,
            y: pos.y - 16,
            opacity: isVisible ? (i + 1) / TRAIL_LENGTH * 0.25 : 0,
            scale: 1 - i * 0.05,
          }}
          transition={{
            type: "spring",
            damping: 30,
            stiffness: 200,
            mass: 0.5,
          }}
          style={{ filter: "blur(6px)" }}
        >
          <div className="w-8 h-8 rounded-full bg-primary/40" />
        </motion.div>
      ))}
      {/* Subtle glow at the cursor tip */}
      {trail.length > 0 && (
        <motion.div
          className="fixed pointer-events-none z-50"
          animate={{
            x: trail[trail.length - 1].x - 32,
            y: trail[trail.length - 1].y - 32,
            opacity: isVisible ? 0.4 : 0,
          }}
          transition={{
            type: "spring",
            damping: 18,
            stiffness: 120,
            mass: 0.3,
          }}
        >
          <div className="w-20 h-20 rounded-full bg-primary/20 blur-2xl" />
        </motion.div>
      )}
    </>
  );
}; 