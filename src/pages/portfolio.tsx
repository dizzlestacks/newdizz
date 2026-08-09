import { Link } from "wouter";
import { motion } from "framer-motion";
import logoPath from "@assets/dizzlestacks_logo_transparent.png";

const projects = [
  {
    index: "01",
    title: "THREEWAYSOUT",
    domain: "threewaysout.online",
    category: "GAME",
    url: "https://threewaysout.online",
  },
  {
    index: "02",
    title: "SELFDESTRUCT",
    domain: "selfdestruct.media",
    category: "MEDIA",
    url: "https://selfdestruct.media",
  },
  {
    index: "03",
    title: "YARDEES",
    domain: "yardees.net",
    category: "NET",
    url: "https://yardees.net",
  },
  {
    index: "04",
    title: "SAMEDI ET DIMANCHE",
    domain: "samedietdimanche.com",
    category: "SHOP",
    url: "https://samedietdimanche.com",
  },
  {
    index: "05",
    title: "WOKE ARE WE",
    domain: "wokearewe.com",
    category: "COM",
    url: "https://wokearewe.com",
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.1 } },
};

const rowVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export default function Portfolio() {
  return (
    <div className="min-h-[100dvh] w-full text-white px-6 py-10 sm:px-16 sm:py-14 lg:px-24 lg:py-20 selection:bg-accent selection:text-black">
      <div className="max-w-5xl w-full mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-16 sm:mb-24"
        >
          <Link href="/" data-testid="link-back" className="inline-block mb-12">
            <motion.img
              src={logoPath} alt="Home"
              className="w-8 h-8 sm:w-9 sm:h-9 object-contain"
              style={{ opacity: 0.35 }}
              whileHover={{ opacity: 0.85, scale: 1.08 }}
              whileTap={{ scale: 0.93 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
            />
          </Link>

          <div className="flex items-end justify-between border-b border-white/8 pb-8">
            <div>
              <p className="text-[9px] tracking-[0.45em] text-accent/50 font-sans font-light uppercase">
                Selected Work
              </p>
            </div>
            <span className="hidden sm:block text-[9px] tracking-[0.3em] text-white/18 font-sans font-light mb-1">
              {projects.length} PROJECTS
            </span>
          </div>
        </motion.div>

        {/* Project list */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {projects.map((project) => (
            <motion.a
              key={project.index}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={rowVariants}
              className="group relative block border-b border-white/6 py-8 sm:py-10 overflow-hidden"
              data-testid={`link-portfolio-${project.index}`}
            >
              {/* Hover gold rule */}
              <motion.div
                className="absolute left-0 top-0 h-px bg-accent/50 w-0 group-hover:w-full"
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                style={{ width: undefined }}
                whileHover={{ width: "100%" }}
              />

              <div className="flex items-center justify-between gap-6">
                {/* Left: index + title + domain */}
                <div className="flex items-center gap-6 sm:gap-10 min-w-0">
                  <span className="text-[10px] tracking-[0.25em] text-white/15 font-sans font-light shrink-0 w-6 text-right group-hover:text-accent/40 transition-colors duration-500">
                    {project.index}
                  </span>

                  <div className="min-w-0">
                    <motion.h2
                      className="text-xl sm:text-3xl md:text-4xl tracking-[0.18em] font-sans font-extralight text-white/50 group-hover:text-white transition-colors duration-400 leading-none truncate"
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 300, damping: 28 }}
                    >
                      {project.title}
                    </motion.h2>
                    <p className="mt-2.5 text-[9px] tracking-[0.32em] text-white/18 font-sans font-light group-hover:text-white/35 transition-colors duration-500 uppercase">
                      {project.domain}
                    </p>
                  </div>
                </div>

                {/* Right: category + arrow */}
                <div className="flex items-center gap-4 sm:gap-6 shrink-0">
                  <span className="hidden sm:block text-[8px] tracking-[0.38em] text-white/18 font-sans font-light group-hover:text-accent/60 transition-colors duration-400 uppercase border border-white/8 group-hover:border-accent/25 px-2.5 py-1 transition-all">
                    {project.category}
                  </span>
                  <motion.svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="text-white/15 group-hover:text-accent transition-colors duration-300"
                    whileHover={{ x: 3, y: -3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <path d="M3 13L13 3M13 3H6M13 3V10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                  </motion.svg>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

      </div>
    </div>
  );
}
