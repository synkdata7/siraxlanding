"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Section } from "./Section";
import { Gauge, TrendingUp, AlertTriangle, CheckCircle2, ShieldCheck } from "lucide-react";

export function RiskEngineSection() {
  return (
    <Section
      id="riesgo"
      eyebrow="07 · 08 — Risk & AI Investigation"
      title={
        <>
          Trust Score + Risk Score con{" "}
          <span className="sirax-text-gradient">recomendación automática</span>
        </>
      }
      description={
        <>
          El motor evalúa cada verificación y entrega dos métricas claras: cuánto confiar
          (Trust Score) y cuánto riesgo asumir (Risk Score). La IA integra todo en un informe
          narrativo listo para auditoría.
        </>
      }
    >
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Score gauges */}
        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
          <GaugeCard
            label="Trust Score"
            value={92}
            tone="emerald"
            subtitle="Confianza basada en verificaciones positivas"
          />
          <GaugeCard
            label="Risk Score"
            value={8}
            tone="cyan"
            subtitle="Riesgo calculado a partir de alertas y patrones"
          />

          {/* Recommendation */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="sm:col-span-2 rounded-2xl bg-gradient-to-br from-emerald-500/15 via-emerald-500/5 to-transparent border border-emerald-400/25 p-5"
          >
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span className="text-xs uppercase tracking-wider text-emerald-300">AI Recommendation</span>
                </div>
                <div className="text-2xl font-bold text-emerald-300">APROBAR</div>
                <div className="text-xs text-muted-foreground mt-1">Nivel de riesgo: Bajo · Trust: 92 · Risk: 8</div>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-400/15 text-emerald-300 text-xs font-mono">
                <ShieldCheck className="h-3.5 w-3.5" />
                Compliance PASS
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scoring breakdown */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl bg-white/[0.025] border border-white/8 p-5">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-4 w-4 text-emerald-400" />
              <h4 className="text-sm font-semibold">Trust Score — componentes</h4>
            </div>
            <div className="space-y-2">
              <ScoreRow label="RENAPO válido" value="+20" tone="emerald" />
              <ScoreRow label="RFC válido" value="+15" tone="emerald" />
              <ScoreRow label="SAT activo" value="+15" tone="emerald" />
              <ScoreRow label="Sin sanciones" value="+20" tone="emerald" />
              <ScoreRow label="Presencia profesional" value="+10" tone="emerald" />
              <ScoreRow label="GitHub activo" value="+5" tone="emerald" />
              <ScoreRow label="LinkedIn encontrado" value="+5" tone="emerald" />
            </div>
          </div>

          <div className="rounded-2xl bg-white/[0.025] border border-white/8 p-5">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-4 w-4 text-rose-400" />
              <h4 className="text-sm font-semibold">Risk Score — penalizaciones</h4>
            </div>
            <div className="space-y-2">
              <ScoreRow label="RND positivo" value="+100" tone="rose" />
              <ScoreRow label="OpenSanctions Match" value="+100" tone="rose" />
              <ScoreRow label="OFAC Match" value="+100" tone="rose" />
              <ScoreRow label="Correo temporal" value="+20" tone="amber" />
              <ScoreRow label="Identidad inconsistente" value="+50" tone="amber" />
            </div>
            <div className="mt-3 text-[10px] text-muted-foreground leading-relaxed">
              Cada regla es configurable por caso de uso y regulación. Los umbrales de aprobación pueden variar por industria.
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function GaugeCard({
  label,
  value,
  tone,
  subtitle,
}: {
  label: string;
  value: number;
  tone: "emerald" | "cyan";
  subtitle: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(0);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animated) {
          setAnimated(true);
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [animated]);

  useEffect(() => {
    if (!animated) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1400;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [animated, value]);

  const radius = 70;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (display / 100) * circ;
  const stroke = tone === "emerald" ? "#34d399" : "#22d3ee";

  return (
    <div ref={ref} className="rounded-2xl bg-white/[0.025] border border-white/8 p-5 relative overflow-hidden">
      <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl" style={{ backgroundColor: `${stroke}25` }} />
      <div className="relative flex items-center justify-between mb-3">
        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
          <div className="text-[11px] text-muted-foreground/70 mt-0.5 max-w-[140px] leading-tight">{subtitle}</div>
        </div>
        <Gauge className={`h-4 w-4 ${tone === "emerald" ? "text-emerald-400" : "text-cyan-400"}`} />
      </div>
      <div className="relative flex items-center justify-center">
        <svg viewBox="0 0 180 180" className="w-44 h-44 -rotate-90">
          <circle cx="90" cy="90" r={radius} stroke="rgba(255,255,255,0.06)" strokeWidth="10" fill="none" />
          <motion.circle
            cx="90"
            cy="90"
            r={radius}
            stroke={stroke}
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ filter: `drop-shadow(0 0 8px ${stroke}55)` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold">{display}</span>
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">/ 100</span>
        </div>
      </div>
    </div>
  );
}

function ScoreRow({ label, value, tone }: { label: string; value: string; tone: "emerald" | "rose" | "amber" }) {
  const colors = {
    emerald: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    rose: "text-rose-400 bg-rose-400/10 border-rose-400/20",
    amber: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  };
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className={`font-mono text-xs px-2 py-0.5 rounded-md border ${colors[tone]}`}>{value}</span>
    </div>
  );
}
