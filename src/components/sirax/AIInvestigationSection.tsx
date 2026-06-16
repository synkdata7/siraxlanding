"use client";

import { motion } from "framer-motion";
import { Section } from "./Section";
import { Brain, FileText, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

const REPORT_LINES = [
  { text: "La identidad presenta un nivel alto de confianza.", delay: 0 },
  { text: "La CURP fue validada exitosamente contra RENAPO.", delay: 0.3 },
  { text: "El RFC presenta coincidencia con registros del SAT.", delay: 0.6 },
  { text: "No se encontraron coincidencias en listas de sanciones nacionales o internacionales.", delay: 0.9 },
  { text: "Se identificó presencia digital consistente mediante perfiles profesionales y actividad pública verificable.", delay: 1.2 },
  { text: "Nivel de riesgo: Bajo.", delay: 1.5 },
  { text: "Recomendación: APROBAR.", delay: 1.8 },
];

export function AIInvestigationSection() {
  return (
    <Section
      eyebrow="09 — AI Investigation Engine"
      title={
        <>
          Informes automáticos que{" "}
          <span className="sirax-text-gradient">cualquier auditor entendería</span>
        </>
      }
      description={
        <>
          La IA de Sirax traduce cada verificación en un informe narrativo en lenguaje natural,
          listo para revisión humana, expediente interno o auditoría regulatoria. Sin plantillas
          rígidas, sin texto boilerplate.
        </>
      }
    >
      <div className="grid lg:grid-cols-12 gap-8 items-center">
        {/* Report card */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl bg-black/40 border border-white/10 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-cyan-500/5 pointer-events-none" />
            <div className="relative flex items-center justify-between px-5 py-3 border-b border-white/5">
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4 text-violet-400" />
                <span className="text-xs font-mono text-muted-foreground">sirax · ai_report.md</span>
              </div>
              <div className="text-[10px] font-mono text-muted-foreground">generated · 1.2s</div>
            </div>
            <div className="relative p-5 space-y-3">
              <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5 text-violet-400" />
                Informe de Inteligencia de Identidad
              </div>
              {REPORT_LINES.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.15 }}
                  className="flex items-start gap-2.5 text-sm"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-foreground/90 leading-relaxed">{line.text}</span>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 2 }}
                className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-emerald-500/15 border border-emerald-400/30"
              >
                <span className="text-xs font-semibold text-emerald-300">APROBAR</span>
                <span className="text-[10px] text-muted-foreground">·</span>
                <span className="text-[10px] text-emerald-300/80">Risk: Bajo</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Benefits */}
        <div className="lg:col-span-5 space-y-4">
          <BenefitRow
            icon={<FileText className="h-4 w-4" />}
            title="Narrativa consistente"
            description="Cada informe sigue la misma estructura lógica: verificación, hallazgos, riesgo, recomendación."
          />
          <BenefitRow
            icon={<Brain className="h-4 w-4" />}
            title="Razonamiento trazable"
            description="Cada afirmación se vincula a la fuente de datos que la respalda: RENAPO, SAT, OpenSanctions, etc."
          />
          <BenefitRow
            icon={<Sparkles className="h-4 w-4" />}
            title="Multilenguaje"
            description="Informes disponibles en español, inglés y portugués para equipos transfronterizos."
          />
          <BenefitRow
            icon={<ArrowRight className="h-4 w-4" />}
            title="Exportable"
            description="Markdown, PDF y JSON para integrarse con tu CRM, GRC o sistema de expedientes."
          />
        </div>
      </div>
    </Section>
  );
}

function BenefitRow({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="flex gap-3 rounded-xl bg-white/[0.02] border border-white/5 p-4 hover:bg-white/[0.04] transition-colors"
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-400/10 text-violet-300 flex-shrink-0">
        {icon}
      </div>
      <div>
        <div className="text-sm font-semibold mb-0.5">{title}</div>
        <div className="text-xs text-muted-foreground leading-relaxed">{description}</div>
      </div>
    </motion.div>
  );
}
