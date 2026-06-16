"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Fingerprint, Menu, X, ChevronDown } from "lucide-react";
import { AuthModal } from "./AuthModal";

const NAV_ITEMS = [
  { label: "Plataforma", href: "#plataforma" },
  { label: "Inteligencia", href: "#inteligencia" },
  { label: "Riesgo", href: "#riesgo" },
  { label: "API", href: "#api" },
  { label: "Casos de uso", href: "#casos" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("register");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openAuth = (mode: "login" | "register") => {
    setAuthMode(mode);
    setMobileOpen(false);
    setAuthOpen(true);
  };

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/70 backdrop-blur-xl border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="#top" className="flex items-center gap-2.5 group">
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-400/40 blur-md rounded-lg group-hover:bg-cyan-400/60 transition-all" />
                <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-emerald-400 text-black">
                  <Fingerprint className="h-5 w-5" />
                </div>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-lg font-semibold tracking-tight">
                  Sirax
                </span>
                <span className="text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
                  by SynkData
                </span>
              </div>
            </a>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-white/5"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Auth buttons */}
            <div className="hidden lg:flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => openAuth("login")}
                className="text-muted-foreground hover:text-foreground"
              >
                Iniciar sesión
              </Button>
              <Button
                size="sm"
                onClick={() => openAuth("register")}
                className="bg-gradient-to-r from-cyan-400 to-emerald-400 text-black hover:from-cyan-300 hover:to-emerald-300 font-semibold"
              >
                Solicitar acceso
              </Button>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden p-2 text-muted-foreground hover:text-foreground"
              aria-label="Menú"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden overflow-hidden bg-background/95 backdrop-blur-xl border-b border-white/5"
            >
              <div className="px-5 py-4 space-y-1">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-md"
                  >
                    {item.label}
                  </a>
                ))}
                <div className="pt-3 grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openAuth("login")}
                    className="border-white/10"
                  >
                    Iniciar sesión
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => openAuth("register")}
                    className="bg-gradient-to-r from-cyan-400 to-emerald-400 text-black"
                  >
                    Registrarme
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <AuthModal
        open={authOpen}
        onOpenChange={setAuthOpen}
        initialMode={authMode}
      />
    </>
  );
}
