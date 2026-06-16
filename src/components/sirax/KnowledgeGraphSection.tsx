"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Section } from "./Section";
import { Network, Database, GitBranch, Share2 } from "lucide-react";

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  r: number;
  color: string;
  type: "core" | "primary" | "secondary";
}

interface Edge {
  from: string;
  to: string;
}

const NODES: Node[] = [
  { id: "persona", label: "Persona", x: 50, y: 50, r: 14, color: "#7be0ff", type: "core" },
  { id: "curp", label: "CURP", x: 22, y: 28, r: 9, color: "#4bd6c5", type: "primary" },
  { id: "rfc", label: "RFC", x: 78, y: 28, r: 9, color: "#4bd6c5", type: "primary" },
  { id: "email", label: "Email", x: 14, y: 60, r: 8, color: "#a78bfa", type: "secondary" },
  { id: "telefono", label: "Teléfono", x: 86, y: 60, r: 8, color: "#a78bfa", type: "secondary" },
  { id: "empresa", label: "Empresa", x: 28, y: 82, r: 10, color: "#fbbf24", type: "primary" },
  { id: "dominio", label: "Dominio", x: 72, y: 82, r: 8, color: "#a78bfa", type: "secondary" },
  { id: "github", label: "GitHub", x: 50, y: 14, r: 8, color: "#f472b6", type: "secondary" },
  { id: "linkedin", label: "LinkedIn", x: 8, y: 40, r: 7, color: "#f472b6", type: "secondary" },
  { id: "redes", label: "Redes Sociales", x: 92, y: 40, r: 7, color: "#f472b6", type: "secondary" },
];

const EDGES: Edge[] = [
  { from: "persona", to: "curp" },
  { from: "persona", to: "rfc" },
  { from: "persona", to: "email" },
  { from: "persona", to: "telefono" },
  { from: "persona", to: "empresa" },
  { from: "persona", to: "dominio" },
  { from: "persona", to: "github" },
  { from: "persona", to: "linkedin" },
  { from: "persona", to: "redes" },
  { from: "empresa", to: "rfc" },
  { from: "empresa", to: "dominio" },
  { from: "github", to: "dominio" },
  { from: "linkedin", to: "empresa" },
  { from: "email", to: "github" },
  { from: "telefono", to: "redes" },
];

export function KnowledgeGraphSection() {
  return (
    <Section
      eyebrow="05 · 06 — Huella Digital & Relacional"
      title={
        <>
          Visualiza relaciones ocultas con{" "}
          <span className="sirax-text-gradient">Knowledge Graph Engine</span>
        </>
      }
      description={
        <>
          Resolvemos identidades y exponemos redes ocultas: una persona no es un dato aislado,
          es un nodo conectado a CURP, RFC, correo, teléfono, empresa, dominio, GitHub, LinkedIn
          y redes sociales. Sirax encuentra las conexiones que importan.
        </>
      }
    >
      <div className="grid lg:grid-cols-12 gap-8">
        {/* Graph */}
        <div className="lg:col-span-7">
          <div className="relative rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/8 p-4 overflow-hidden">
            <div className="absolute inset-0 sirax-grid-bg opacity-30" />
            <div className="relative aspect-square max-w-2xl mx-auto">
              <GraphVisualization />
            </div>
            <div className="relative mt-4 flex flex-wrap items-center gap-3 text-[11px]">
              <LegendDot color="#7be0ff" label="Entidad central" />
              <LegendDot color="#4bd6c5" label="Identificadores oficiales" />
              <LegendDot color="#a78bfa" label="Datos de contacto" />
              <LegendDot color="#f472b6" label="Presencia digital" />
              <LegendDot color="#fbbf24" label="Vínculo corporativo" />
            </div>
          </div>
        </div>

        {/* Capabilities */}
        <div className="lg:col-span-5 space-y-4">
          <CapabilityRow
            icon={<Database className="h-4 w-4" />}
            title="Entity Resolution"
            description="Resolvemos si todos los datos pertenecen a la misma persona con un score de confianza."
          />
          <CapabilityRow
            icon={<GitBranch className="h-4 w-4" />}
            title="Detección de redes ocultas"
            description="Relaciones indirectas y patrones sospechosos entre personas, empresas y dominios."
          />
          <CapabilityRow
            icon={<Share2 className="h-4 w-4" />}
            title="Visualización interactiva"
            description="Grafo navegable construido sobre Neo4j, NetworkX y Cytoscape.js."
          />
          <CapabilityRow
            icon={<Network className="h-4 w-4" />}
            title="Identity Correlation Engine"
            description="Correlaciona nombre, CURP, RFC, correo, teléfono, dominio, empresa, redes sociales y username en una sola identidad."
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/5 border border-emerald-400/20 p-4"
          >
            <div className="text-[10px] uppercase tracking-wider text-emerald-300/80 mb-1">
              Resultado del motor de correlación
            </div>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold sirax-text-gradient">identity_confidence: 96</span>
              <span className="text-xs text-emerald-300">Alta coincidencia</span>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

function GraphVisualization() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>("persona");
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setPulse((p) => (p + 1) % NODES.length), 1500);
    return () => clearInterval(id);
  }, []);

  const getNode = (id: string) => NODES.find((n) => n.id === id)!;
  const isConnected = (id: string) =>
    active ? EDGES.some((e) => (e.from === active && e.to === id) || (e.to === active && e.from === id)) : false;

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7be0ff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#7be0ff" stopOpacity="0" />
          </radialGradient>
          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Edges */}
        {EDGES.map((edge, i) => {
          const a = getNode(edge.from);
          const b = getNode(edge.to);
          const highlighted =
            active && (edge.from === active || edge.to === active);
          return (
            <g key={`edge-${i}`}>
              <motion.line
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={highlighted ? "#7be0ff" : "rgba(255,255,255,0.12)"}
                strokeWidth={highlighted ? 0.45 : 0.25}
                strokeDasharray={highlighted ? "0" : "0.8 0.8"}
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.05 }}
              />
              {/* Animated pulse along edge when highlighted */}
              {highlighted && (
                <motion.circle
                  r="0.6"
                  fill="#7be0ff"
                  initial={{ cx: a.x, cy: a.y, opacity: 0 }}
                  animate={{ cx: [a.x, b.x], cy: [a.y, b.y], opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              )}
            </g>
          );
        })}

        {/* Nodes */}
        {NODES.map((node, i) => {
          const isActive = node.id === active;
          const isConn = isConnected(node.id);
          return (
            <g
              key={node.id}
              style={{ cursor: "pointer" }}
              onClick={() => setActive(node.id)}
              onMouseEnter={() => setActive(node.id)}
            >
              {/* Glow */}
              {(isActive || isConn) && (
                <circle cx={node.x} cy={node.y} r={node.r * 1.8} fill="url(#nodeGlow)" opacity={isActive ? 1 : 0.4} />
              )}
              {/* Pulse ring */}
              {isActive && (
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={node.r}
                  fill="none"
                  stroke={node.color}
                  strokeWidth={0.3}
                  initial={{ r: node.r, opacity: 0.8 }}
                  animate={{ r: node.r * 2.5, opacity: 0 }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                />
              )}
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={node.r}
                fill={node.color}
                fillOpacity={isActive ? 0.95 : isConn ? 0.75 : 0.5}
                stroke={node.color}
                strokeWidth={0.3}
                filter="url(#softGlow)"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.04, type: "spring", stiffness: 120 }}
              />
              <text
                x={node.x}
                y={node.y + node.r + 3.5}
                textAnchor="middle"
                className="font-mono"
                fontSize="2.6"
                fill={isActive || isConn ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.5)"}
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5 text-muted-foreground">
      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
      {label}
    </div>
  );
}

function CapabilityRow({
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
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-300 flex-shrink-0">
        {icon}
      </div>
      <div>
        <div className="text-sm font-semibold mb-0.5">{title}</div>
        <div className="text-xs text-muted-foreground leading-relaxed">{description}</div>
      </div>
    </motion.div>
  );
}
