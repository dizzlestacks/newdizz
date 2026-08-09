import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import logoPath from "@assets/dizzlestacks_logo_transparent.png";

const links = [
  { index: "01", name: "MUSIC",     sub: "Listen & Stream",    url: "/music",                               external: false },
  { index: "02", name: "VIDEOS",    sub: "Watch on YouTube",   url: "https://www.youtube.com/dizzlestacks", external: true  },
  { index: "03", name: "GAMING",    sub: "Dizzlestacks Gaming", url: "/gaming",                             external: false },
  { index: "04", name: "PORTFOLIO", sub: "Projects & Work",    url: "/portfolio",                           external: false },
  { index: "05", name: "PLAYLIST",  sub: "Curated Selection",  url: "/playlist",                            external: false },
  { index: "06", name: "BLOG",      sub: "",                   url: "https://dizzlestacks.tumblr.com/",    external: true  },
];

function NavItem({ item, delay }: { item: typeof links[number]; delay: number }) {
  const [hovered, setHovered] = useState(false);

  const inner = (
    <motion.div
      className="group relative flex flex-col items-center py-[1.05rem] sm:py-[1.2rem] overflow-hidden text-center"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileTap={{ scale: 0.99 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
    >
      {/* Radial hover wash */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(255,255,255,0.03) 0%, transparent 70%)" }}
      />

      {/* Name */}
      <div className="relative">
        <motion.span
          className="block font-sans font-extralight tracking-[0.3em] leading-none text-xl sm:text-2xl md:text-[1.7rem]"
          animate={{ color: hovered ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.42)" }}
          transition={{ duration: 0.28 }}
        >
          {item.name}
        </motion.span>
        {/* Gold underline expands from center */}
        <motion.span
          className="absolute -bottom-0.5 left-0 right-0 h-px"
          style={{ backgroundColor: "hsl(38 50% 58%)", transformOrigin: "center" }}
          animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 0.75 : 0 }}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Sub-label */}
      <motion.span
        className="text-[7px] sm:text-[8px] tracking-[0.3em] font-sans font-light mt-2 leading-none"
        animate={{ color: hovered ? "hsl(38 50% 58% / 0.65)" : "rgba(255,255,255,0.16)" }}
        transition={{ duration: 0.28 }}
      >
        {item.sub}
      </motion.span>
    </motion.div>
  );

  if (item.external) {
    return (
      <a href={item.url} target="_blank" rel="noopener noreferrer" className="block w-full"
        data-testid={`link-${item.name.toLowerCase()}`}>{inner}</a>
    );
  }
  return (
    <Link href={item.url} className="block w-full"
      data-testid={`link-${item.name.toLowerCase()}`}>{inner}</Link>
  );
}

export default function Home() {
  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center
                    relative overflow-hidden text-white selection:bg-accent selection:text-black px-8 sm:px-12 py-14">

      {/* ── Animated atmospheric orbs ── */}
      <motion.div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Top center — large cobalt bloom */}
        <motion.div style={{
          position: "absolute", width: 900, height: 600,
          top: "-18%", left: "50%", x: "-50%",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(18,55,120,0.55) 0%, rgba(10,30,70,0.22) 50%, transparent 70%)",
          filter: "blur(70px)",
        }}
          animate={{ scale: [1, 1.08, 1], y: [0, 20, 0], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Bottom right — warm amber */}
        <motion.div style={{
          position: "absolute", width: 700, height: 500,
          bottom: "-15%", right: "-8%",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(120,72,12,0.28) 0%, rgba(80,45,8,0.12) 45%, transparent 68%)",
          filter: "blur(80px)",
        }}
          animate={{ scale: [1, 1.14, 1], opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
        {/* Left mid — deep teal */}
        <motion.div style={{
          position: "absolute", width: 500, height: 700,
          top: "15%", left: "-10%",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(8,55,100,0.28) 0%, transparent 65%)",
          filter: "blur(90px)",
        }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 7 }}
        />
        {/* Bottom left — violet depth */}
        <motion.div style={{
          position: "absolute", width: 450, height: 400,
          bottom: "-5%", left: "5%",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(55,20,100,0.18) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0.55, 0.3] }}
          transition={{ duration: 17, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </motion.div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-lg flex flex-col items-center">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.78, filter: "blur(22px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.img
            src={logoPath}
            alt="DIZZLESTACKS"
            data-testid="img-logo"
            className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 object-contain"
            animate={{
              filter: [
                "drop-shadow(0 0 0px transparent)",
                "drop-shadow(0 0 36px hsl(38 50% 58% / 0.3)) drop-shadow(0 0 90px rgba(18,55,120,0.35))",
                "drop-shadow(0 0 0px transparent)",
              ],
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2.2 }}
            whileHover={{ scale: 1.07, transition: { duration: 0.4 } }}
          />
        </motion.div>

        {/* Ornament */}
        <motion.div
          className="mt-4 flex items-center gap-2.5"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.85, delay: 0.8 }}
        >
          <div className="w-8 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12))" }} />
          <div className="w-[3px] h-[3px] rounded-full" style={{ backgroundColor: "hsl(38 50% 58% / 0.6)" }} />
          <div className="w-8 h-px" style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.12), transparent)" }} />
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="mt-3.5 text-[7px] sm:text-[7.5px] tracking-[0.45em] font-sans font-light text-white/14 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.0 }}
        >
          ARTIST · CURATOR · CREATOR
        </motion.p>

        {/* Nav */}
        <nav className="w-full mt-10 sm:mt-12">
          {links.map((item, i) => (
            <NavItem key={item.name} item={item} delay={0.75 + i * 0.09} />
          ))}
        </nav>
      </div>

      {/* Footer */}
      <motion.p
        className="absolute bottom-5 left-0 right-0 text-center font-sans font-light z-10"
        style={{ fontSize: "7px", letterSpacing: "0.42em", color: "rgba(255,255,255,0.1)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1.4 }}
      >
        © 2026
      </motion.p>
    </div>
  );
}
