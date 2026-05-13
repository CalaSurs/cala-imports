import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <motion.div
      style={{ scaleX: x }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-electric z-[100] origin-left"
    />
  );
}

export function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHover(!!t.closest("a,button,[role=button]"));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  return (
    <motion.div
      animate={{
        x: pos.x - (hover ? 18 : 6),
        y: pos.y - (hover ? 18 : 6),
        scale: hover ? 1 : 0.5,
        opacity: hover ? 1 : 0.6,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 28, mass: 0.4 }}
      className="hidden md:block pointer-events-none fixed top-0 left-0 z-[200] h-9 w-9 rounded-full border border-electric mix-blend-difference"
    />
  );
}
