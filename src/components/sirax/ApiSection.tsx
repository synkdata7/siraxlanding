"use client";

import { motion } from "framer-motion";
import { Section } from "./Section";
import { Plug, Code2, Building2, Banknote, ShoppingCart, Users, Server, ArrowRight } from "lucide-react";

const ENDPOINTS = [
  { method: "POST", path: "/verify", desc: "Verificación integral de identidad" },
  { method: "POST", path: "/curp", desc: "Validación específica de CURP contra RENAPO" },
  { method: "POST", path: "/rfc", desc: "Validación de RFC y situación fiscal SAT" },
  { method: "POST", path: "/screening", desc: "Screening global y mexicano de sanciones" },
  { method: "POST", path: "/identity", desc: "Correlación de identidad y huella digital" },
  { method: "POST", path: "/risk", desc: "Cálculo de Trust Score y Risk Score" },
];

const INTEGRATIONS = [
  { icon: Users, label: "CRM", desc: "Salesforce, HubSpot, custom" },
  { icon: Banknote, label: "Fintechs", desc: "Onboarding y KYC continuo" },
  { icon: Server, label: "ERPs", desc: "SAP, Oracle, custom" },
  { icon: Building2, label: "HR Systems", desc: "Background checks de personal" },
  { icon: ShoppingCart, label: "Marketplaces", desc: "Verificación de vendedores" },
  { icon: Banknote, label: "Bancos", desc: "Compliance y prevención de fraude" },
];

export function ApiSection() {
  return (
    <Section
      id="api"
      eyebrow="11 — API & Integraciones"
      title={
        <>
          Una API REST para{" "}
          <span className="sirax-text-gradient">todo tu stack</span>
        </>
      }
      description={
        <>
          Los mismos endpoints que usamos internamente, disponibles vía REST. Integra Sirax
          con tu CRM, ERP, plataforma fintech o sistema de RR.HH. en horas, no en semanas.
        </>
      }
    >
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Endpoints list */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl bg-black/40 border border-white/10 overflow-hidden"
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-white/[0.02]">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Code2 className="h-4 w-4 text-cyan-400" />
                api.sirax.io/v1
              </div>
              <div className="text-[10px] font-mono text-muted-foreground">OpenAPI 3.1</div>
            </div>

            <div className="divide-y divide-white/5">
              {ENDPOINTS.map((ep, i) => (
                <motion.div
                  key={ep.path}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="flex items-center justify-between px-5 py-3 hover:bg-white/[0.02] transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-400/15 text-cyan-300 border border-cyan-400/30">
                      {ep.method}
                    </span>
                    <code className="text-sm font-mono">{ep.path}</code>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground hidden sm:inline">{ep.desc}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-cyan-300 group-hover:translate-x-1 transition-all" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Sample snippet */}
            <div className="px-5 py-4 bg-black/40 border-t border-white/5">
              <div className="text-[10px] text-muted-foreground mb-2 font-mono">{"// Ejemplo"}</div>
              <pre className="text-xs font-mono leading-relaxed overflow-x-auto">
{`curl -X POST https://api.sirax.io/v1/verify \\
  -H "Authorization: Bearer sk_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "curp": "MERC900101HDFLRN09",
    "rfc": "MERC900101AB1",
    "email": "carlos@empresa.com",
    "phone": "+525512345678"
  }'

// → 200 OK · trust_score: 92 · risk_score: 8 · recommendation: "APPROVE"`}
              </pre>
            </div>
          </motion.div>
        </div>

        {/* Integrations */}
        <div className="lg:col-span-5">
          <div className="flex items-center gap-2 mb-4">
            <Plug className="h-4 w-4 text-emerald-400" />
            <h4 className="text-sm font-semibold">Integraciones nativas</h4>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {INTEGRATIONS.map((it, i) => (
              <motion.div
                key={it.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-xl bg-white/[0.025] border border-white/8 p-4 hover:bg-white/[0.05] hover:border-cyan-400/30 transition-all"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-400/10 text-emerald-300 mb-2">
                  <it.icon className="h-4 w-4" />
                </div>
                <div className="text-sm font-semibold">{it.label}</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">{it.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
