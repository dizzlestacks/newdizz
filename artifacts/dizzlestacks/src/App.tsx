import { useState, useCallback } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Cursor } from "@/components/cursor";
import { SplashScreen } from "@/components/splash";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Playlist from "@/pages/playlist";
import Portfolio from "@/pages/portfolio";
import Music from "@/pages/music";
import Gaming from "@/pages/gaming";

const queryClient = new QueryClient();

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

function AnimatedRoute({ component: Component }: { component: React.ComponentType }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.985, filter: "blur(6px)" }}
      animate={{
        opacity: 1, scale: 1, filter: "blur(0px)",
        transition: { duration: 0.65, ease },
      }}
      exit={{
        opacity: 0, scale: 1.01, filter: "blur(4px)",
        transition: { duration: 0.3, ease: [0.4, 0, 1, 1] as [number, number, number, number] },
      }}
    >
      <Component />
    </motion.div>
  );
}

function Router() {
  const [location] = useLocation();
  return (
    // initial={false} → suppresses AnimatedRoute entrance on the very first mount
    // (page-to-page transitions still work because Switch remounts on key change)
    <AnimatePresence mode="wait" initial={false}>
      <Switch key={location} location={location}>
        <Route path="/"          component={() => <AnimatedRoute component={Home} />} />
        <Route path="/playlist"  component={() => <AnimatedRoute component={Playlist} />} />
        <Route path="/portfolio" component={() => <AnimatedRoute component={Portfolio} />} />
        <Route path="/music"     component={() => <AnimatedRoute component={Music} />} />
        <Route path="/gaming"    component={() => <AnimatedRoute component={Gaming} />} />
        <Route                   component={() => <AnimatedRoute component={NotFound} />} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  if (typeof document !== "undefined") {
    document.documentElement.classList.add("dark");
  }

  // Start with splash done if already seen this session
  const [splashDone, setSplashDone] = useState(() => {
    try { return !!sessionStorage.getItem("splashSeen"); }
    catch { return false; }
  });

  const handleDone = useCallback(() => {
    try { sessionStorage.setItem("splashSeen", "1"); } catch {}
    setSplashDone(true);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {!splashDone ? (
          /* ── Splash only ── no Router underneath, no concurrent rendering */
          <SplashScreen onDone={handleDone} />
        ) : (
          /* ── App: TV-on expand from a bright thin line ── */
          <motion.div
            initial={{ scaleY: 0.01, filter: "brightness(6)" }}
            animate={{ scaleY: 1,    filter: "brightness(1)" }}
            transition={{ duration: 0.48, ease }}
            style={{ transformOrigin: "center" }}
          >
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <Router />
            </WouterRouter>
          </motion.div>
        )}
        <Toaster />
        <Cursor />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
