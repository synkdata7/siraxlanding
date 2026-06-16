"use client";

import { motion } from "framer-motion";
import { Section } from "./Section";
import { BarChart3, Activity, TrendingUp, Map, AlertOctagon } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar, Cell, PieChart, Pie } from "recharts";

const trendData = [
  { day: "Lun", procesadas: 1240, alertas: 18 },
  { day: "Mar", procesadas: 1480, alertas: 22 },
  { day: "Mié", procesadas: 1620, alertas: 14 },
  { day: "Jue", procesadas: 1390, alertas: 28 },
  { day: "Vie", procesadas: 1840, alertas: 19 },
  { day: "Sáb", procesadas: 920, alertas: 11 },
  { day: "Dom", procesadas: 740, alertas: 8 },
];

const regionData = [
  { region: "CDMX", value: 32, color: "#22d3ee" },
  { region: "Jalisco", value: 18, color: "#34d399" },
  { region: "Nuevo León", value: 22, color: "#a78bfa" },
  { region: "Puebla", value: 12, color: "#fbbf24" },
  { region: "Otro", value: 16, color: "#f472b6" },
];

const decisionData = [
  { name: "Aprobado", value: 78, color: "#34d399" },
  { name: "Revisión", value: 14, color: "#fbbf24" },
  { name: "Rechazado", value: 8, color: "#f87171" },
];

export function AnalyticsSection() {
  return (
    <Section
      eyebrow="10 — Analytics & Monitoring"
      title={
        <>
          Monitoreo ejecutivo en{" "}
          <span className="sirax-text-gradient">tiempo real</span>
        </>
      }
      description={
        <>
          Dashboard ejecutivo con solicitudes procesadas, distribución de riesgo, alertas,
          tendencias y casos aprobados / rechazados. Métricas operativas que tu equipo de
          compliance necesita en una sola vista.
        </>
      }
    >
      <div className="grid lg:grid-cols-12 gap-4">
        {/* KPIs */}
        <div className="lg:col-span-12 grid grid-cols-2 md:grid-cols-4 gap-3">
          <KpiCard icon={<Activity className="h-4 w-4" />} label="Solicitudes (24h)" value="9,230" delta="+12.4%" />
          <KpiCard icon={<TrendingUp className="h-4 w-4" />} label="Trust Score prom." value="87.3" delta="+1.2" />
          <KpiCard icon={<AlertOctagon className="h-4 w-4" />} label="Alertas" value="120" delta="-8.1%" tone="rose" />
          <KpiCard icon={<Map className="h-4 w-4" />} label="Coincidencias sanciones" value="3" delta="-1" tone="rose" />
        </div>

        {/* Trend chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-8 rounded-2xl bg-white/[0.025] border border-white/8 p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm font-semibold flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-cyan-400" />
                Volumen procesado y alertas
              </div>
              <div className="text-[11px] text-muted-foreground">Últimos 7 días</div>
            </div>
            <div className="flex items-center gap-3 text-[10px]">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-cyan-400" /> Procesadas
              </span>
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-rose-400" /> Alertas
              </span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="gradProcesadas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradAlertas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f87171" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="rgba(255,255,255,0.4)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "rgba(8,10,15,0.95)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  labelStyle={{ color: "rgba(255,255,255,0.7)" }}
                />
                <Area type="monotone" dataKey="procesadas" stroke="#22d3ee" strokeWidth={2} fill="url(#gradProcesadas)" />
                <Area type="monotone" dataKey="alertas" stroke="#f87171" strokeWidth={2} fill="url(#gradAlertas)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Decisiones pie */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-4 rounded-2xl bg-white/[0.025] border border-white/8 p-5"
        >
          <div className="text-sm font-semibold mb-1">Decisiones</div>
          <div className="text-[11px] text-muted-foreground mb-2">Aprobado / Revisión / Rechazado</div>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={decisionData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={38}
                  outerRadius={62}
                  paddingAngle={3}
                >
                  {decisionData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} stroke="transparent" />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "rgba(8,10,15,0.95)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1.5 mt-2">
            {decisionData.map((d) => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: d.color }} />
                  {d.name}
                </span>
                <span className="font-mono">{d.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Regiones bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="lg:col-span-12 rounded-2xl bg-white/[0.025] border border-white/8 p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm font-semibold">Riesgo por región</div>
              <div className="text-[11px] text-muted-foreground">Distribución porcentual de revisiones con alertas</div>
            </div>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionData}>
                <XAxis dataKey="region" stroke="rgba(255,255,255,0.4)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.04)" }}
                  contentStyle={{
                    background: "rgba(8,10,15,0.95)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {regionData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

function KpiCard({
  icon,
  label,
  value,
  delta,
  tone = "emerald",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  delta: string;
  tone?: "emerald" | "rose";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="rounded-xl bg-white/[0.025] border border-white/8 p-4"
    >
      <div className="flex items-center justify-between mb-2">
        <span className={`flex h-7 w-7 items-center justify-center rounded-md ${tone === "emerald" ? "bg-emerald-400/10 text-emerald-400" : "bg-rose-400/10 text-rose-400"}`}>
          {icon}
        </span>
        <span className={`text-[10px] font-mono ${tone === "emerald" ? "text-emerald-400" : "text-rose-400"}`}>
          {delta}
        </span>
      </div>
      <div className="text-xl font-bold">{value}</div>
      <div className="text-[10px] text-muted-foreground">{label}</div>
    </motion.div>
  );
}
