import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import logoPath from "@assets/dizzlestacks_logo_transparent.png";
import { SiYoutube, SiFacebook, SiTwitch, SiInstagram } from "react-icons/si";

const platforms = [
  { name: "YOUTUBE",   Icon: SiYoutube,   color: "#ff0000", url: "https://www.youtube.com/channel/UC2LQUqEcMRCqV6A94AYvorw", label: "Watch" },
  { name: "FACEBOOK",  Icon: SiFacebook,  color: "#1877f2", url: "https://www.facebook.com/profile.php?id=100087919131194", label: "Follow" },
  { name: "TWITCH",    Icon: SiTwitch,    color: "#9147ff", url: "https://www.twitch.tv/dizzlestacks", label: "Live", live: true },
  { name: "INSTAGRAM", Icon: SiInstagram, color: "#e1306c", url: "https://www.instagram.com/dizzlestacksgaming/", label: "Follow" },
];

function Reticle() {
  const cornerAngles = [45, 135, 225, 315];
  return (
    <div className="relative flex items-center justify-center w-full h-52 sm:h-72 overflow-hidden select-none pointer-events-none">
      {/* Outer slow-rotating ring */}
      <motion.svg
        width="200" height="200" viewBox="0 0 200 200" fill="none"
        className="absolute"
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="100" cy="100" r="90" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        {[0, 90, 180, 270].map((a) => (
          <line
            key={a}
            x1={100 + 85 * Math.cos((a * Math.PI) / 180)}
            y1={100 + 85 * Math.sin((a * Math.PI) / 180)}
            x2={100 + 92 * Math.cos((a * Math.PI) / 180)}
            y2={100 + 92 * Math.sin((a * Math.PI) / 180)}
            stroke="rgba(255,255,255,0.25)" strokeWidth="1.5"
          />
        ))}
      </motion.svg>

      {/* Inner counter-rotating ring */}
      <motion.svg
        width="120" height="120" viewBox="0 0 120 120" fill="none"
        className="absolute"
        animate={{ rotate: -360 }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="60" cy="60" r="50" stroke="rgba(255,255,255,0.09)" strokeWidth="1"
          strokeDasharray="8 6" />
        {cornerAngles.map((a) => (
          <circle
            key={a}
            cx={60 + 50 * Math.cos((a * Math.PI) / 180)}
            cy={60 + 50 * Math.sin((a * Math.PI) / 180)}
            r="2.5"
            fill="rgba(255,255,255,0.3)"
          />
        ))}
      </motion.svg>

      {/* Crosshair */}
      <div className="absolute flex items-center justify-center" style={{ width: 40, height: 40 }}>
        <motion.div
          className="absolute w-px bg-white/50"
          style={{ height: 28 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        />
        <motion.div
          className="absolute h-px bg-white/50"
          style={{ width: 28 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        />
        <motion.div
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: "hsl(38 50% 58%)" }}
          animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        />
      </div>
    </div>
  );
}

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const tileVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.94 },
  show: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export default function Gaming() {
  return (
    <div className="min-h-[100dvh] w-full text-white selection:bg-accent selection:text-black">
      {/* Logo back button */}
      <div className="px-6 pt-7 sm:px-14 sm:pt-9">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <Link href="/" data-testid="link-back">
            <motion.img
              src={logoPath} alt="Home"
              className="w-8 h-8 sm:w-9 sm:h-9 object-contain"
              style={{ opacity: 0.35 }}
              whileHover={{ opacity: 0.85, scale: 1.08 }}
              whileTap={{ scale: 0.93 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
            />
          </Link>
        </motion.div>
      </div>

      {/* Hero */}
      <Reticle />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="px-6 sm:px-14 mb-10 sm:mb-14"
      >
        <p className="text-[9px] tracking-[0.45em] font-sans font-light"
          style={{ color: "hsl(38 50% 58% / 0.6)" }}>
          DIZZLESTACKS GAMING
        </p>
      </motion.div>

      {/* Platform grid 2×2 */}
      <motion.div
        variants={gridVariants}
        initial="hidden"
        animate="show"
        className="px-6 sm:px-14 pb-16 grid grid-cols-2 gap-3 sm:gap-4 max-w-xl"
      >
        {platforms.map(({ name, Icon, color, url, label, live }) => (
          <motion.a
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            variants={tileVariants}
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            className="group relative flex flex-col items-center justify-center gap-3 border border-white/8 overflow-hidden"
            style={{ minHeight: 160, padding: "2rem 1.5rem" }}
            data-testid={`link-gaming-${name.toLowerCase()}`}
          >
            {/* Hover glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
              style={{ background: `radial-gradient(ellipse at 50% 90%, ${color}1a 0%, transparent 70%)` }}
            />
            <div
              className="absolute top-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500"
              style={{ backgroundColor: color + "80" }}
            />

            {/* Live badge */}
            {live && (
              <div className="absolute top-3 left-3 flex items-center gap-1.5">
                <motion.div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: "#9147ff" }}
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />
                <span className="text-[8px] tracking-[0.3em] font-sans font-light text-white/25">LIVE</span>
              </div>
            )}

            <motion.span
              className="relative z-10 transition-colors duration-300"
              style={{ fontSize: 36, color: "rgba(255,255,255,0.15)" }}
              whileHover={{ color }}
              transition={{ duration: 0.2 }}
            >
              <Icon />
            </motion.span>

            <div className="relative z-10 text-center">
              <div className="text-[10px] sm:text-[11px] tracking-[0.28em] font-sans font-light text-white/30 group-hover:text-white/75 transition-colors duration-300 mb-1">
                {name}
              </div>
              <div className="text-[8px] tracking-[0.3em] font-sans font-light"
                style={{ color: color + "70" }}>
                {label}
              </div>
            </div>

            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ArrowUpRight className="w-3 h-3" style={{ color: color + "aa" }} />
            </div>
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
}
