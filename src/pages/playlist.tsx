import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Music } from "lucide-react";
import logoPath from "@assets/dizzlestacks_logo_transparent.png";
import { SiSpotify, SiApplemusic, SiYoutube } from "react-icons/si";

const platforms = [
  { name: "SPOTIFY",     key: "Spotify",     Icon: SiSpotify,    color: "#1db954" },
  { name: "APPLE MUSIC", key: "Apple Music", Icon: SiApplemusic, color: "#fc3c44" },
  { name: "YOUTUBE",     key: "YouTube",     Icon: SiYoutube,    color: "#ff0000" },
];

const playlists = [
  { id: "01", title: "SO YOU THINK YOU CAN DANCE",       platform: "Apple Music", url: "https://music.apple.com/ca/playlist/so-you-think-you-can-dance/pl.u-6mo4l7KUlyb5Jk" },
  { id: "02", title: "90 & EARLY 2000s R&B — BET CLASSICS", platform: "Apple Music", url: "https://music.apple.com/ca/playlist/90-early-2000-r-b-bet-classics/pl.u-6mo4aPvClyb5Jk" },
  { id: "03", title: "90 & EARLY 2000s R&B — BET CLASSICS", platform: "Spotify",     url: "https://open.spotify.com/playlist/4rfXbBuICm6rTim7MPJFTK" },
  { id: "04", title: "90 & EARLY 2000s REGGAE",           platform: "Apple Music", url: "https://music.apple.com/ca/playlist/90-early-2000-reggae/pl.u-b3b88VNt5AZb4z" },
  { id: "05", title: "90 & EARLY 2000s REGGAE",           platform: "Spotify",     url: "https://open.spotify.com/playlist/77iMUDjTCVLtfRhGUUz3XX" },
  { id: "06", title: "90' & EARLY 2000' R&B (BET CLASSICS)", platform: "YouTube", url: "https://youtube.com/playlist?list=PLzMf8VJNzJ3LE-e8n-taiUYjAWY8nC0rU" },
];

const PLATFORM_COLORS: Record<string, string> = {
  Spotify:     "#1db954",
  "Apple Music": "#fc3c44",
  YouTube:     "#ff0000",
};

const BAR_HEIGHTS = [42, 68, 88, 55, 100, 62, 82, 35, 75, 50, 90, 44];
const BAR_PEAKS   = [70, 40, 60, 80,  50, 90, 38, 72, 55, 85, 42, 68];

function Equalizer() {
  return (
    <div className="relative flex items-center justify-center w-full h-52 sm:h-64 overflow-hidden select-none pointer-events-none">
      <div className="flex items-end gap-1 sm:gap-1.5" style={{ height: 80 }}>
        {BAR_HEIGHTS.map((h, i) => (
          <motion.div
            key={i}
            className="w-1 sm:w-1.5 rounded-full"
            style={{ height: `${h}%`, backgroundColor: "rgba(255,255,255,0.18)" }}
            animate={{ height: [`${h}%`, `${BAR_PEAKS[i]}%`, `${h}%`], opacity: [0.18, 0.45, 0.18] }}
            transition={{ duration: 1.4 + i * 0.07, repeat: Infinity, delay: i * 0.06, ease: "easeInOut" }}
          />
        ))}
      </div>
      <motion.div
        className="absolute bottom-[calc(50%-40px)]"
        style={{ width: 2, height: 40, backgroundColor: "hsl(38 50% 58% / 0.5)" }}
        animate={{ height: [40, 70, 40], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

export default function Playlist() {
  const [selected, setSelected] = useState<string | null>(null);

  const activePlatform = platforms.find((p) => p.key === selected);
  const filtered = selected ? playlists.filter((pl) => pl.platform === selected) : [];

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
      <Equalizer />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="px-6 sm:px-14 mb-8 sm:mb-10"
      >
        <p className="text-[9px] tracking-[0.45em] font-sans font-light"
          style={{ color: "hsl(38 50% 58% / 0.6)" }}>
          CURATED SELECTION
        </p>
      </motion.div>

      {/* Platform selector tiles */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="px-6 sm:px-14 mb-10 sm:mb-14 grid grid-cols-3 gap-3 max-w-lg"
      >
        {platforms.map(({ name, key, Icon, color }) => {
          const active = selected === key;
          return (
            <motion.button
              key={key}
              onClick={() => setSelected(active ? null : key)}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 350, damping: 22 }}
              className="group relative flex flex-col items-center justify-center gap-2 border py-5 overflow-hidden transition-colors duration-300"
              style={{
                borderColor: active ? color + "55" : "rgba(255,255,255,0.08)",
                background: active ? color + "12" : "transparent",
              }}
              data-testid={`btn-platform-${name.toLowerCase().replace(/\s/g, "-")}`}
            >
              {/* Top border line */}
              <div
                className="absolute top-0 left-0 h-px transition-all duration-500"
                style={{
                  width: active ? "100%" : "0%",
                  backgroundColor: color + "90",
                }}
              />
              {/* Bottom glow */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-400"
                style={{
                  background: `radial-gradient(ellipse at 50% 100%, ${color}18 0%, transparent 70%)`,
                  opacity: active ? 1 : 0,
                }}
              />

              <span
                className="relative z-10 transition-colors duration-300"
                style={{ fontSize: 22, color: active ? color : "rgba(255,255,255,0.2)" }}
              >
                <Icon />
              </span>
              <span
                className="relative z-10 text-[8px] tracking-[0.25em] font-sans font-light text-center leading-tight transition-colors duration-300"
                style={{ color: active ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.3)" }}
              >
                {name}
              </span>

              {/* Active indicator dot */}
              <AnimatePresence>
                {active && (
                  <motion.div
                    className="absolute bottom-2 w-1 h-1 rounded-full"
                    style={{ backgroundColor: color }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Playlist list — only shown when a platform is selected */}
      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="px-6 sm:px-14 pb-16 max-w-3xl"
          >
            {/* Section label */}
            <div className="flex items-center gap-3 mb-6">
              {activePlatform && (
                <span style={{ fontSize: 13, color: activePlatform.color + "cc" }}>
                  <activePlatform.Icon />
                </span>
              )}
              <span className="text-[9px] tracking-[0.38em] font-sans font-light"
                style={{ color: activePlatform ? activePlatform.color + "99" : "rgba(255,255,255,0.3)" }}>
                {activePlatform?.name}
              </span>
              <div className="flex-1 h-px" style={{ backgroundColor: "rgba(255,255,255,0.05)" }} />
              <span className="text-[9px] tracking-[0.2em] font-sans font-light text-white/18">
                {filtered.length} {filtered.length === 1 ? "PLAYLIST" : "PLAYLISTS"}
              </span>
            </div>

            {filtered.length === 0 ? (
              /* Empty state */
              <motion.div
                className="flex flex-col items-center justify-center py-20 gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
              >
                <Music className="w-6 h-6 text-white/12" />
                <p className="text-[10px] tracking-[0.3em] font-sans font-light text-white/20">
                  NO PLAYLISTS YET
                </p>
              </motion.div>
            ) : (
              /* Playlist rows */
              <motion.div
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
              >
                {filtered.map((pl, idx) => {
                  const plColor = PLATFORM_COLORS[pl.platform] ?? "#ffffff";
                  return (
                    <motion.a
                      key={pl.id}
                      href={pl.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        show: {
                          opacity: 1, x: 0,
                          transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
                        },
                      }}
                      whileHover={{ x: 4, backgroundColor: "rgba(255,255,255,0.025)" }}
                      whileTap={{ scale: 0.99 }}
                      transition={{ type: "spring", stiffness: 300, damping: 28 }}
                      className="group flex items-center gap-5 sm:gap-8 py-5 sm:py-6 border-b border-white/6 rounded-sm"
                      data-testid={`row-playlist-${pl.id}`}
                    >
                      {/* Index / play */}
                      <div className="shrink-0 w-7 flex items-center justify-center">
                        <span className="text-[10px] tracking-[0.2em] font-sans font-light text-white/18 group-hover:hidden">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <Play
                          className="hidden group-hover:block w-3.5 h-3.5"
                          style={{ color: plColor }}
                        />
                      </div>

                      {/* Title */}
                      <div className="min-w-0 flex-1">
                        <div className="text-sm sm:text-base tracking-[0.1em] font-sans font-light text-white/55 group-hover:text-white transition-colors duration-300 truncate">
                          {pl.title}
                        </div>
                      </div>

                      {/* Arrow */}
                      <motion.div
                        className="shrink-0"
                        whileHover={{ x: 3, y: -3 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M1 11L11 1M11 1H4M11 1V8"
                            stroke={`${plColor}66`}
                            className="group-hover:stroke-accent transition-colors duration-300"
                            strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </motion.div>
                    </motion.a>
                  );
                })}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
