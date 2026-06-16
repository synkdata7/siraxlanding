"use client";

import { Section, FeatureCard } from "./Section";
import {
  IdCard,
  FileText,
  ScanFace,
  Landmark,
  Building,
  HeartPulse,
  Gavel,
} from "lucide-react";

export function IdentityAndGovernmentSection() {
  return (
    <>
      <Section
        id="inteligencia"
        eyebrow="01 · 02 — Verificación & Gobierno"
        title={
          <>
            Verificación de identidad y{" "}
            <span className="sirax-text-gradient">fuentes gubernamentales en tiempo real</span>
          </>
        }
        description={
          <>
            Validamos identidad con estándares oficiales mexicanos y consultamos directamente
            las bases de datos públicas autorizadas para entrega una respuesta verificable,
            trazable y auditada.
          </>
        }
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <FeatureCard
            icon={<IdCard className="h-5 w-5" />}
            title="CURP Intelligence"
            description="Validación completa contra RENAPO con detección de inconsistencias y verificación del dígito verificador."
            items={["Validación de formato y dígito verificador", "Extracción automática de componentes", "Validación contra RENAPO", "Detección de inconsistencias"]}
            accent="cyan"
          />
          <FeatureCard
            icon={<FileText className="h-5 w-5" />}
            title="RFC Intelligence"
            description="Validación de RFC para persona física y moral, con verificación de situación fiscal ante el SAT."
            items={["Validación RFC persona física y moral", "Homoclave correcta", "Verificación SAT", "Situación fiscal y estatus"]}
            accent="cyan"
            delay={0.05}
          />
          <FeatureCard
            icon={<ScanFace className="h-5 w-5" />}
            title="Verificación de documentos"
            description="Hoja de ruta: INE, pasaporte, cédula profesional. OCR automático y extracción de datos."
            items={["INE / Pasaporte / Cédula profesional", "OCR automático", "Extracción estructurada de datos", "Verificación de seguridad (hoja de ruta)"]}
            accent="emerald"
            delay={0.1}
          />
          <FeatureCard
            icon={<Landmark className="h-5 w-5" />}
            title="RENAPO"
            description="Validación oficial de datos personales: nombre, fecha de nacimiento, sexo, entidad federativa."
            items={["CURP", "Nombre y fecha de nacimiento", "Sexo y entidad federativa", "Trazabilidad de la consulta"]}
            accent="cyan"
            delay={0.05}
          />
          <FeatureCard
            icon={<Building className="h-5 w-5" />}
            title="SAT"
            description="Constancia fiscal, régimen, estatus activo/inactivo y verificación de domicilio fiscal."
            items={["RFC y constancia fiscal", "Régimen fiscal", "Estatus activo / inactivo", "Historial de cambios"]}
            accent="emerald"
            delay={0.1}
          />
          <FeatureCard
            icon={<HeartPulse className="h-5 w-5" />}
            title="IMSS"
            description="Consulta de NSS y vigencia según marco legal aplicable y permisos autorizados."
            items={["NSS", "Vigencia", "Información autorizada", "Marco legal aplicable"]}
            accent="violet"
            delay={0.15}
          />
          <FeatureCard
            icon={<Gavel className="h-5 w-5" />}
            title="RND · Registro Nacional de Detenciones"
            description="Detección de antecedentes de detención con autoridad responsable y ubicación."
            items={["Registro Nacional de Detenciones", "Fecha de detención", "Autoridad responsable", "Ubicación del evento"]}
            accent="rose"
            delay={0.2}
          />
          <FeatureCard
            icon={<ScanFace className="h-5 w-5" />}
            title="Biometría (Hoja de ruta)"
            description="Verificación facial con detección de vida, face match y validación de selfie."
            items={["Face Match", "Verificación de selfie", "Detección de vida", "Antispoofing"]}
            accent="emerald"
            delay={0.25}
          />
        </div>
      </Section>
    </>
  );
}
