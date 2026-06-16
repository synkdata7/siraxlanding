"use client";

import { motion } from "framer-motion";
import { Section } from "./Section";
import {
  Fingerprint,
  Landmark,
  Scale,
  Globe2,
  Smartphone,
  Network,
  Brain,
  Gauge,
  BarChart3,
  Plug,
} from "lucide-react";

const PILLARS = [
  { icon: Fingerprint, label: "Verificación de Identidad" },
  { icon: Landmark, label: "Inteligencia Gubernamental" },
  { icon: Scale, label: "Inteligencia de Cumplimiento" },
  { icon: Globe2, label: "Inteligencia de Identidad Digital" },
  { icon: Smartphone, label: "Inteligencia de Huella Digital" },
  { icon: Network, label: "Inteligencia de Relaciones" },
  { icon: Gauge, label: "Risk Intelligence Engine" },
  { icon: Brain, label: "AI Investigation Engine" },
  { icon: BarChart3, label: "Analytics & Reporting" },
  { icon: Plug, label: "API & Integrations" },
];

export function ArchitectureSection() {
  return (
    <Section
      id="plataforma"
      eyebrow="Arquitectura General"
      title={
        <>
          Una sola plataforma.{" "}
          <span className="sirax-text-gradient">Diez capas de inteligencia.</span>
        </>
      }
      description={
        <>
          SynkData Plataforma de Inteligencia de Identidad centraliza verificación, fuentes
          gubernamentales, compliance global, huella digital y análisis relacional en un solo
          motor que entrega resultados consistentes a través de API, dashboard y webhooks.
        </>
      }
    >
      <div className="relative">
        {/* Center hub */}
        <div className="hidden lg:block absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Hub card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 lg:col-start-5"
          >
            <div className="relative rounded-3xl bg-gradient-to-br from-cyan-500/10 via-emerald-500/5 to-transparent border border-white/10 p-8 text-center">
              <div className="absolute inset-0 rounded-3xl bg-cyan-500/5 blur-2xl" />
              <div className="relative">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-emerald-400 text-black mb-4">
                  <Network className="h-8 w-8" />
                </div>
                <div className="text-xl font-semibold tracking-tight">SynkData</div>
                <div className="text-xs text-muted-foreground mt-1">Plataforma de Inteligencia de Identidad</div>
                <div className="mt-4 grid grid-cols-2 gap-2 text-left">
                  <PillarStat label="Fuentes" value="40+" />
                  <PillarStat label="Latencia" value="<3s" />
                  <PillarStat label="Cobertura" value="LATAM" />
                  <PillarStat label="SLA" value="99.9%" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Pillars grid */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="group relative rounded-xl bg-white/[0.02] border border-white/8 p-4 hover:bg-white/[0.05] hover:border-cyan-400/30 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-300 group-hover:bg-cyan-400/20 transition-colors">
                  <p.icon className="h-4 w-4" />
                </div>
                <div className="text-xs font-medium leading-tight">{p.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function PillarStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-white/[0.03] border border-white/5 px-3 py-2">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="text-sm font-semibold">{value}</div>
    </div>
  );
}
