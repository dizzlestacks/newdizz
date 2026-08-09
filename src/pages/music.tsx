import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import logoPath from "@assets/dizzlestacks_logo_transparent.png";
import { SiSoundcloud, SiYoutube, SiApplemusic, SiSpotify, SiTidal } from "react-icons/si";
import { Music2 } from "lucide-react";

const platforms = [
  { name: "SOUNDCLOUD",  Icon: SiSoundcloud, color: "#ff5500", url: "https://soundcloud.com/dizzlestacks" },
  { name: "YOUTUBE",     Icon: SiYoutube,    color: "#ff0000", url: "https://www.youtube.com/dizzlestacks" },
  { name: "APPLE MUSIC", Icon: SiApplemusic, color: "#fc3c44", url: "https://ffm.bio/dizzlestacksmusic" },
  { name: "SPOTIFY",     Icon: SiSpotify,    color: "#1db954", url: "https://ffm.bio/dizzlestacksmusic" },
  { name: "DEEZER",      Icon: Music2,       color: "#a238ff", url: "https://ffm.bio/dizzlestacksmusic" },
  { name: "TIDAL",       Icon: SiTidal,      color: "#c8f0fe", url: "https://tidal.com/artist/18051382" },
];

const RINGS = [1, 2, 3, 4, 5];

function SoundRings() {
  return (
    <div className="relative flex items-center justify-center w-full h-52 sm:h-72 overflow-hidden select-none pointer-events-none">
      {RINGS.map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-white/10"
          style={{ width: i * 68, height: i * 68 }}
          animate={{ scale: [1, 1.14, 1], opacity: [0.35, 0.06, 0.35] }}
          transition={{ duration: 3.5, delay: i * 0.45, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <motion.div
        className="absolute w-2.5 h-2.5 rounded-full"
        style={{ backgroundColor: "hsl(38 50% 58%)" }}
        animate={{ scale: [1, 1.8, 1], opacity: [0.9, 0.3, 0.9] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-6 h-6 rounded-full border"
        style={{ borderColor: "hsl(38 50% 58% / 0.35)" }}
        animate={{ scale: [1, 2.2, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

const tileVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.95 },
  show: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export default function Music() {
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
      <SoundRings />

      {/* Header text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="px-6 sm:px-14 mb-10 sm:mb-14"
      >
        <p className="text-[9px] tracking-[0.45em] font-sans font-light"
          style={{ color: "hsl(38 50% 58% / 0.6)" }}>
          LISTEN ON
        </p>
      </motion.div>

      {/* Platform grid */}
      <motion.div
        variants={gridVariants}
        initial="hidden"
        animate="show"
        className="px-6 sm:px-14 pb-16 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-3xl"
      >
        {platforms.map(({ name, Icon, color, url }) => (
          <motion.a
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            variants={tileVariants}
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="group relative flex flex-col items-center justify-center gap-3 border border-white/8 p-6 sm:p-8 overflow-hidden"
            style={{ minHeight: 130 }}
            data-testid={`link-music-${name.toLowerCase().replace(/\s/g, "-")}`}
          >
            {/* Hover glow */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
              style={{ background: `radial-gradient(ellipse at 50% 80%, ${color}18 0%, transparent 70%)` }}
            />
            {/* Top border sweep */}
            <motion.div
              className="absolute top-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500"
              style={{ backgroundColor: color + "80" }}
            />

            <motion.span
              className="relative z-10 transition-colors duration-300"
              style={{ fontSize: 28, color: "rgba(255,255,255,0.2)" }}
              whileHover={{ color }}
              transition={{ duration: 0.2 }}
            >
              <Icon />
            </motion.span>

            <span className="relative z-10 text-[9px] sm:text-[10px] tracking-[0.28em] font-sans font-light text-white/35 group-hover:text-white/80 transition-colors duration-300 text-center">
              {name}
            </span>

            <motion.div
              className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <ArrowUpRight className="w-3 h-3" style={{ color: color + "cc" }} />
            </motion.div>
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
}
