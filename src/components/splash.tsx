import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import logoPath from "@assets/dizzlestacks_logo_transparent.png";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];
const easeIn = [0.4, 0, 1, 1] as [number, number, number, number];

export function SplashScreen({ onDone }: { onDone: () => void }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // At 1.8 s: begin TV-off compress animation
    const compressTimer = setTimeout(() => setExiting(true), 1800);
    // At 2.3 s: compress animation done (~0.38s) — signal parent to swap in the app
    const doneTimer = setTimeout(onDone, 2300);
    return () => { clearTimeout(compressTimer); clearTimeout(doneTimer); };
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#04070d", transformOrigin: "center" }}
      animate={exiting
        ? { scaleY: 0.008, filter: "brightness(6)", opacity: 1 }
        : { scaleY: 1,     filter: "brightness(1)", opacity: 1 }
      }
      transition={exiting
        ? { duration: 0.35, ease: easeIn }
        : { duration: 0 }
      }
    >
      {/* Ambient orb */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 360, height: 360, borderRadius: "50%",
          background: "radial-gradient(circle, hsl(38 50% 58% / 0.08) 0%, transparent 70%)",
        }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease }}
      />

      {/* Logo */}
      <motion.img
        src={logoPath} alt="Dizzlestacks"
        className="relative z-10 select-none pointer-events-none"
        style={{ width: 96, height: 96, objectFit: "contain" }}
        initial={{ opacity: 0, scale: 0.68, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1,    filter: "blur(0px)"  }}
        transition={{ duration: 1.05, delay: 0.08, ease }}
      />

      {/* Gold accent line */}
      <motion.div
        className="relative z-10 mt-5 h-px w-8"
        style={{ backgroundColor: "hsl(38 50% 58%)", transformOrigin: "center" }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 0.5 }}
        transition={{ duration: 0.75, delay: 0.7, ease }}
      />
    </motion.div>
  );
}
