"use client";

import { motion } from "framer-motion";
import { Section, FeatureCard } from "./Section";
import { Globe2, MapPin, Sparkles, Mail, Phone, AtSign, Check } from "lucide-react";

export function ComplianceAndDigitalSection() {
  return (
    <>
      <Section
        eyebrow="03 · 04 — Compliance & Identidad Digital"
        title={
          <>
            Screening global y{" "}
            <span className="sirax-text-gradient">huella digital completa</span>
          </>
        }
        description={
          <>
            Cubrimos listas sancionatorias internacionales y mexicanas con fuzzy matching
            inteligente y, en paralelo, reconstruimos la identidad digital del sujeto en
            correo, teléfono y usernames en más de 30 plataformas.
          </>
        }
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <FeatureCard
            icon={<Globe2 className="h-5 w-5" />}
            title="Screening Global"
            description="Listas internacionales con cobertura de sanciones, PEPs y watchlists."
            items={["OFAC", "ONU", "OpenSanctions", "PEP", "Watchlists", "Interpol (si aplica)"]}
            accent="violet"
          />
          <FeatureCard
            icon={<MapPin className="h-5 w-5" />}
            title="Screening México"
            description="Fuentes regulatorias y judiciales mexicanas integradas en una sola consulta."
            items={["SAT 69-B", "DOF", "SCJN", "Listas regulatorias"]}
            accent="rose"
            delay={0.05}
          />
          <FeatureCard
            icon={<Sparkles className="h-5 w-5" />}
            title="Matching Inteligente"
            description="Motor de matching con normalización y variantes fonéticas para reducir falsos negativos."
            items={["Fuzzy Matching", "Normalización de nombres", "Alias", "Coincidencias fonéticas"]}
            accent="cyan"
            delay={0.1}
          />
          <FeatureCard
            icon={<Mail className="h-5 w-5" />}
            title="Email Intelligence"
            description="Análisis profundo de cualquier correo electrónico para detectar fraude y reutilización."
            items={["HaveIBeenPwned", "Hunter.io", "Gravatar", "MX Records", "Detección de correo desechable", "Dominio corporativo"]}
            accent="cyan"
            delay={0.15}
          />
          <FeatureCard
            icon={<Phone className="h-5 w-5" />}
            title="Teléfono Intelligence"
            description="Identificación de operador, tipo de línea y reputación asociada al número."
            items={["Operador", "Tipo de línea", "País", "Detección de spam", "Reputación telefónica"]}
            accent="emerald"
            delay={0.2}
          />
          <FeatureCard
            icon={<AtSign className="h-5 w-5" />}
            title="Username Intelligence"
            description="Sherlock, Maigret y WhatsMyName correlacionan alias en más de 30 redes."
            items={["Sherlock", "Maigret", "WhatsMyName", "Correlación de alias", "Resultado: snupdrack → GitHub / GitLab / Reddit / X / Instagram / TikTok / Discord"]}
            accent="amber"
            delay={0.25}
          />
        </div>

        {/* Result snippet */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 rounded-2xl bg-black/40 border border-white/10 overflow-hidden"
        >
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5 bg-white/[0.02]">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="h-2 w-2 rounded-full bg-emerald-400" />
              digital-footprint.report.json
            </div>
            <div className="text-[10px] font-mono text-muted-foreground">200 OK · 1.8s</div>
          </div>
          <pre className="px-4 py-4 text-xs overflow-x-auto font-mono leading-relaxed">
{`{
  "username": "snupdrack",
  "presence_score": 89,
  "social_profiles": 12,
  "perfiles_de_desarrollador": 4,
  "presencia_comercial": true,
  "platforms": [
    "github", "gitlab", "reddit", "x",
    "instagram", "tiktok", "discord"
  ],
  "email_intelligence": {
    "disposable": false,
    "breached": true,
    "corporate_domain": true
  },
  "phone_intelligence": {
    "carrier": "Telcel",
    "line_type": "mobile",
    "spam_reports": 0
  }
}`}
          </pre>
        </motion.div>
      </Section>
    </>
  );
}
