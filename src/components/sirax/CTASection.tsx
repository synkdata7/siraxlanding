"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Fingerprint, Mail } from "lucide-react";
import { AuthModal } from "./AuthModal";

export function CTASection() {
  const [authOpen, setAuthOpen] = useState(false);

  const open = () => {
    setAuthOpen(true);
  };

  return (
    <section id="casos" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 sirax-grid-bg sirax-radial-mask opacity-40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] bg-cyan-500/10 rounded-full blur-[150px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-emerald-500/10 rounded-full blur-[120px]" />

      <div className="relative mx-auto max-w-5xl px-5 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs text-muted-foreground mb-6">
            <Fingerprint className="h-3.5 w-3.5 text-cyan-400" />
            Deja de ser una plataforma KYC más
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
            Conviértete en una{" "}
            <span className="sirax-text-gradient">Identity Intelligence Platform</span>
          </h2>

          <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Verificación de Identidad + Inteligencia Gubernamental + Compliance Screening +
            Análisis de Huella Digital + Inteligencia Relacional + Evaluación de Riesgo con IA.
            Compitiendo en la categoría de Inteligencia de Identidad, no en la de verificadores de CURP.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              onClick={open}
              className="bg-gradient-to-r from-cyan-400 to-emerald-400 text-black hover:from-cyan-300 hover:to-emerald-300 font-semibold group"
            >
              Solicitar acceso a la plataforma
              <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10"
            >
              <a href="mailto:soporte@sirax.lat">
                <Mail className="h-4 w-4 mr-2" />
                Hablar con el equipo
              </a>
            </Button>
          </div>

          <div className="mt-8 text-xs text-muted-foreground">
            Activación en menos de 24 h · Sin tarjeta de crédito · SLA 99.9%
          </div>
        </motion.div>
      </div>

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
    </section>
  );
}
