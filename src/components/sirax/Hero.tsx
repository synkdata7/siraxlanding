"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Globe2, Activity, Lock, Sparkles } from "lucide-react";
import { AuthModal } from "./AuthModal";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [authOpen, setAuthOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);

  // Animated particle network canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth * window.devicePixelRatio);
    let height = (canvas.height = canvas.offsetHeight * window.devicePixelRatio);
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const NODE_COUNT = 60;
    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.6 + 0.6,
      pulse: Math.random() * Math.PI * 2,
    }));

    let raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Move nodes
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.offsetWidth) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.offsetHeight) n.vy *= -1;
        n.pulse += 0.02;
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.32;
            ctx.strokeStyle = `rgba(123, 224, 255, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const n of nodes) {
        const pulse = (Math.sin(n.pulse) + 1) * 0.5;
        ctx.fillStyle = `rgba(123, 224, 255, ${0.4 + pulse * 0.4})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + pulse * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      width = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      height = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const openAuth = () => {
    setAuthOpen(true);
  };

  return (
    <section ref={ref} id="top" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 sirax-grid-bg sirax-radial-mask opacity-60" />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-70" />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-cyan-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[35rem] h-[35rem] bg-emerald-500/10 rounded-full blur-[120px]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60rem] h-[20rem] bg-gradient-to-b from-cyan-500/15 to-transparent blur-[100px]" />

      {/* Scan line */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent sirax-scan-line" />

      {/* Top fade */}
      <div className="absolute top-16 inset-x-0 h-32 bg-gradient-to-b from-background to-transparent pointer-events-none" />
      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none" />

      <motion.div
        style={{ opacity, y }}
        className="relative mx-auto max-w-7xl px-5 lg:px-8 w-full pt-28 pb-24"
      >
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs text-muted-foreground mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              Identity &amp; Risk Intelligence Platform · México &amp; Latinoamérica
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.05]"
            >
              Convierte cada identidad en{" "}
              <span className="sirax-text-gradient">inteligencia accionable</span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed"
            >
              Sirax centraliza fuentes gubernamentales, listas regulatorias, inteligencia
              de identidad digital, análisis relacional y evaluación automatizada de riesgo
              para darte una visión integral de personas físicas y morales — en segundos, no en días.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-8 flex flex-col sm:flex-row gap-3"
            >
              <Button
                size="lg"
                onClick={openAuth}
                className="bg-gradient-to-r from-cyan-400 to-emerald-400 text-black hover:from-cyan-300 hover:to-emerald-300 font-semibold group"
              >
                Solicitar acceso
                <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground"
            >
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> RENAPO · SAT · IMSS · RND
              </span>
              <span className="flex items-center gap-1.5">
                <Globe2 className="h-3.5 w-3.5 text-cyan-400" /> OFAC · ONU · OpenSanctions · PEP
              </span>
              <span className="flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 text-cyan-400" /> REST API &amp; Integraciones
              </span>
              <span className="flex items-center gap-1.5">
                <Activity className="h-3.5 w-3.5 text-emerald-400" /> AI Investigation Engine
              </span>
            </motion.div>
          </div>

          {/* Right: Floating dashboard preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <HeroDashboardPreview />
          </motion.div>
        </div>

        {/* Trust marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-20 pt-8 border-t border-white/5"
        >
          <div className="flex items-center justify-between gap-6 flex-wrap text-xs text-muted-foreground">
            <span className="flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              Confiado por equipos de compliance, fintech y RR.HH. en LATAM
            </span>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <span>CMV · Customer 360°</span>
              <span>Onboarding seguro</span>
              <span>Due diligence continuo</span>
              <span>Fraude &amp; Sanciones</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
    </section>
  );
}

function HeroDashboardPreview() {
  return (
    <div className="relative sirax-float">
      {/* Glow */}
      <div className="absolute -inset-6 bg-gradient-to-br from-cyan-500/20 via-emerald-500/10 to-transparent blur-3xl" />

      {/* Main card */}
      <div className="relative sirax-glass rounded-2xl p-5 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
          </div>
          <div className="text-[10px] text-muted-foreground font-mono">
            sirax · identity report
          </div>
        </div>

        {/* Identity header */}
        <div className="rounded-lg bg-white/[0.03] border border-white/5 p-3 mb-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-muted-foreground">Sujeto</div>
              <div className="text-sm font-semibold">Carlos Méndez Rivera</div>
              <div className="text-[10px] font-mono text-cyan-300/80">CURP · RFC · EMAIL</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-muted-foreground">Confianza</div>
              <div className="text-2xl font-bold sirax-text-gradient">96%</div>
            </div>
          </div>
        </div>

        {/* Scores */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <ScoreCard label="Trust Score" value={92} tone="emerald" />
          <ScoreCard label="Risk Score" value={8} tone="cyan" />
        </div>

        {/* Verification chips */}
        <div className="flex flex-wrap gap-1.5">
          {["RENAPO ✓", "SAT ✓", "OFAC ·", "PEP ·", "GitHub ✓", "LinkedIn ✓"].map((chip) => (
            <span
              key={chip}
              className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-white/10 bg-white/[0.03] text-muted-foreground"
            >
              {chip}
            </span>
          ))}
        </div>

        {/* AI recommendation */}
        <div className="mt-3 rounded-lg bg-emerald-500/10 border border-emerald-400/20 px-3 py-2">
          <div className="text-[10px] uppercase tracking-wider text-emerald-300/80 mb-0.5">
            AI Recommendation
          </div>
          <div className="text-xs font-semibold text-emerald-300">APROBAR · Riesgo Bajo</div>
        </div>
      </div>

      {/* Floating chip */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-6 -right-4 sirax-glass rounded-xl px-3 py-2 text-[11px]"
      >
        <div className="flex items-center gap-2">
          <Activity className="h-3.5 w-3.5 text-cyan-400" />
          <span className="text-muted-foreground">Background check en</span>
          <span className="text-cyan-300 font-mono">2.4s</span>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-5 -left-3 sirax-glass rounded-xl px-3 py-2 text-[11px]"
      >
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
          <span className="text-muted-foreground">Compliance:</span>
          <span className="text-emerald-300 font-mono">PASS</span>
        </div>
      </motion.div>
    </div>
  );
}

function ScoreCard({ label, value, tone }: { label: string; value: number; tone: "emerald" | "cyan" }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1200;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  const color = tone === "emerald" ? "from-emerald-400 to-emerald-300" : "from-cyan-400 to-cyan-300";

  return (
    <div ref={ref} className="rounded-lg bg-white/[0.03] border border-white/5 p-3">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
        {label}
      </div>
      <div className="flex items-end gap-1">
        <span className="text-xl font-bold">{display}</span>
        <span className="text-[10px] text-muted-foreground mb-1">/100</span>
      </div>
      <div className="mt-1.5 h-1 rounded-full bg-white/10 overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${color} transition-all duration-700`}
          style={{ width: `${display}%` }}
        />
      </div>
    </div>
  );
}
