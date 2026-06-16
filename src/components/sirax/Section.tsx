"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Section({ id, eyebrow, title, description, children, className = "" }: SectionProps) {
  return (
    <section id={id} className={`relative py-20 sm:py-28 ${className}`}>
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {(eyebrow || title || description) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-12 sm:mb-16"
          >
            {eyebrow && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-cyan-300 mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                {eyebrow}
              </div>
            )}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              {title}
            </h2>
            {description && (
              <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
                {description}
              </p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  items?: string[];
  delay?: number;
  accent?: "cyan" | "emerald" | "violet" | "amber" | "rose";
}

const accentClasses: Record<NonNullable<FeatureCardProps["accent"]>, string> = {
  cyan: "from-cyan-500/20 to-transparent text-cyan-300 border-cyan-400/20",
  emerald: "from-emerald-500/20 to-transparent text-emerald-300 border-emerald-400/20",
  violet: "from-violet-500/20 to-transparent text-violet-300 border-violet-400/20",
  amber: "from-amber-500/20 to-transparent text-amber-300 border-amber-400/20",
  rose: "from-rose-500/20 to-transparent text-rose-300 border-rose-400/20",
};

export function FeatureCard({ icon, title, description, items, delay = 0, accent = "cyan" }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4 }}
      className="sirax-card-glow group relative rounded-2xl bg-white/[0.025] border border-white/8 p-6 hover:bg-white/[0.04] transition-all"
    >
      <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${accentClasses[accent]} border backdrop-blur-md mb-4`}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold tracking-tight mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{description}</p>
      {items && (
        <ul className="space-y-1.5">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-2 text-xs text-muted-foreground">
              <span className="mt-1 h-1 w-1 rounded-full bg-current opacity-50 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}
