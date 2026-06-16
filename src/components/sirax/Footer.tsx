"use client";

import { Fingerprint, Mail, Globe2, ShieldCheck, Lock } from "lucide-react";

const LINKS = [
  {
    title: "Plataforma",
    items: [
      { label: "Verificación de Identidad", href: "#inteligencia" },
      { label: "Inteligencia Gubernamental", href: "#inteligencia" },
      { label: "Compliance Screening", href: "#inteligencia" },
      { label: "Knowledge Graph", href: "#riesgo" },
    ],
  },
  {
    title: "Soluciones",
    items: [
      { label: "Fintechs", href: "#casos" },
      { label: "Bancos", href: "#casos" },
      { label: "RR.HH. y Onboarding", href: "#casos" },
      { label: "Marketplaces", href: "#casos" },
    ],
  },
  {
    title: "Recursos",
    items: [
      { label: "Documentación API", href: "#api" },
      { label: "Casos de uso", href: "#casos" },
      { label: "Análisis & Dashboards", href: "#" },
      { label: "Confianza & Seguridad", href: "#" },
    ],
  },
  {
    title: "Empresa",
    items: [
      { label: "Contacto", href: "mailto:contacto@daxserdig.site" },
      { label: "Aviso de Privacidad", href: "#" },
      { label: "Términos de Servicio", href: "#" },
      { label: "Estado del servicio", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-background/60 backdrop-blur-sm mt-auto">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-14">
        <div className="grid lg:grid-cols-12 gap-10">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-400/40 blur-md rounded-lg" />
                <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-emerald-400 text-black">
                  <Fingerprint className="h-5 w-5" />
                </div>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-lg font-semibold tracking-tight">Sirax</span>
                <span className="text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
                  by SynkData
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Plataforma de Verificación de Identidad, Background Checks, Compliance e
              Inteligencia de Riesgo para México y Latinoamérica.
            </p>

            <a
              href="mailto:contacto@daxserdig.site"
              className="mt-4 inline-flex items-center gap-2 text-xs text-cyan-300 hover:text-cyan-200 transition-colors"
            >
              <Mail className="h-3.5 w-3.5" />
              contacto@daxserdig.site
            </a>

            <div className="mt-5 flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> Zero-Trust
              </span>
              <span className="flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 text-cyan-400" /> AES-256
              </span>
              <span className="flex items-center gap-1.5">
                <Globe2 className="h-3.5 w-3.5 text-cyan-400" /> LATAM
              </span>
            </div>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {LINKS.map((col) => (
              <div key={col.title}>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  {col.title}
                </div>
                <ul className="space-y-2">
                  {col.items.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div>
            © {new Date().getFullYear()} Sirax · Powered by SynkData. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-foreground transition-colors">Privacidad</a>
            <a href="#" className="hover:text-foreground transition-colors">Términos</a>
            <a href="#" className="hover:text-foreground transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
