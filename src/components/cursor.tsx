import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function Cursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const isTouch = useRef(false);

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);

  const dotX = useSpring(x, { damping: 28, stiffness: 900, mass: 0.3 });
  const dotY = useSpring(y, { damping: 28, stiffness: 900, mass: 0.3 });
  const ringX = useSpring(x, { damping: 38, stiffness: 180, mass: 0.6 });
  const ringY = useSpring(y, { damping: 38, stiffness: 180, mass: 0.6 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      isTouch.current = true;
      return;
    }

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element;
      setHovering(!!target.closest("a, button, [role='button'], [data-hoverable]"));
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [x, y]);

  if (isTouch.current) return null;

  return (
    <>
      {/* Precise dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.15 }}
      >
        <motion.div
          className="rounded-full bg-white"
          animate={{
            width:  clicking ? 6  : hovering ? 10 : 5,
            height: clicking ? 6  : hovering ? 10 : 5,
            opacity: clicking ? 0.6 : 1,
          }}
          transition={{ type: "spring", stiffness: 600, damping: 30 }}
        />
      </motion.div>

      {/* Ring follower */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="rounded-full border"
          animate={{
            width:  clicking ? 36 : hovering ? 52 : 32,
            height: clicking ? 36 : hovering ? 52 : 32,
            borderColor: hovering
              ? "hsl(38 50% 58% / 0.5)"
              : "rgba(255,255,255,0.18)",
            scale: clicking ? 0.85 : 1,
          }}
          transition={{ type: "spring", stiffness: 280, damping: 30 }}
        />
      </motion.div>
    </>
  );
}
