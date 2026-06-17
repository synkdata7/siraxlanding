"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  ShieldCheck,
  Mail,
  User,
  Building2,
  Phone,
  Briefcase,
  FileText,
  ArrowRight,
  Fingerprint,
  CheckCircle2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const USE_CASES = [
  { value: "fintech", label: "Fintech / Onboarding KYC" },
  { value: "banco", label: "Banco / Institución financiera" },
  { value: "rrhh", label: "RR.HH. / Background checks de personal" },
  { value: "marketplace", label: "Marketplace / Verificación de vendedores" },
  { value: "grc", label: "Compliance / GRC" },
  { value: "seguros", label: "Aseguradora / Prevención de fraude" },
  { value: "crm", label: "CRM / Enriquecimiento de datos" },
  { value: "otro", label: "Otro" },
];

export function AuthModal({ open, onOpenChange }: AuthModalProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    useCase: "",
    projectDescription: "",
  });
  const { toast } = useToast();

  // Reset al cerrar
  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => setSuccess(false), 250);
      return () => clearTimeout(t);
    }
  }, [open]);

  const update = (k: keyof typeof form, v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    if (!form.name.trim() || form.name.trim().length < 2) {
      toast({
        title: "Falta tu nombre",
        description: "Ingresa tu nombre completo.",
        variant: "destructive",
      });
      return;
    }
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast({
        title: "Correo inválido",
        description: "Verifica tu correo electrónico.",
        variant: "destructive",
      });
      return;
    }
    if (!form.company.trim()) {
      toast({
        title: "Falta tu empresa",
        description: "Indica el nombre de tu empresa.",
        variant: "destructive",
      });
      return;
    }
    if (!form.phone.trim()) {
      toast({
        title: "Falta tu celular",
        description: "Indica un número de celular de contacto.",
        variant: "destructive",
      });
      return;
    }
    if (!form.useCase) {
      toast({
        title: "Selecciona un caso de uso",
        description: "Nos ayuda a entender cómo vas a usar Sirax.",
        variant: "destructive",
      });
      return;
    }
    if (!form.projectDescription.trim() || form.projectDescription.trim().length < 10) {
      toast({
        title: "Cuéntanos del tu proyecto",
        description: "Mínimo 10 caracteres.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data?.error || "No pudimos procesar tu solicitud.");
      }

      setSuccess(true);
      toast({
        title: "¡Solicitud enviada!",
        description: data.message,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error inesperado.";
      toast({
        title: "No se pudo enviar",
        description: message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = (next: boolean) => {
    if (!loading) onOpenChange(next);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg p-0 overflow-hidden bg-card/95 backdrop-blur-xl border-white/10">
        {/* Glow header */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/15 via-emerald-500/5 to-transparent pointer-events-none" />
          <div className="absolute -top-20 -right-16 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <DialogHeader className="relative px-6 pt-6 pb-2">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-400/40 blur-md rounded-full" />
                <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-emerald-400 text-black">
                  <Fingerprint className="h-5 w-5" />
                </div>
              </div>
              <div>
                <DialogTitle className="text-xl font-semibold tracking-tight">
                  Solicitar acceso a Sirax
                </DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground">
                  Cuéntanos sobre tu proyecto — te contactamos en &lt;24 h.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
        </div>

        <div className="px-6 pb-6 pt-2">
          <AnimatePresence mode="wait" initial={false}>
            {success ? (
              <SuccessView
                key="success"
                email={form.email}
                onClose={() => {
                  setForm({
                    name: "",
                    email: "",
                    company: "",
                    phone: "",
                    useCase: "",
                    projectDescription: "",
                  });
                  onOpenChange(false);
                }}
              />
            ) : (
              <motion.form
                key="form"
                onSubmit={submit}
                className="space-y-3.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Field
                  icon={<User className="h-4 w-4" />}
                  label="Nombre completo"
                  type="text"
                  placeholder="Carlos Méndez Rivera"
                  value={form.name}
                  onChange={(v) => update("name", v)}
                  autoComplete="name"
                  required
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <Field
                    icon={<Building2 className="h-4 w-4" />}
                    label="Empresa"
                    type="text"
                    placeholder="Tu empresa S.A. de C.V."
                    value={form.company}
                    onChange={(v) => update("company", v)}
                    autoComplete="organization"
                    required
                  />
                  <Field
                    icon={<Phone className="h-4 w-4" />}
                    label="Número de celular"
                    type="tel"
                    placeholder="+52 55 1234 5678"
                    value={form.phone}
                    onChange={(v) => update("phone", v)}
                    autoComplete="tel"
                    required
                  />
                </div>

                <Field
                  icon={<Mail className="h-4 w-4" />}
                  label="Correo corporativo"
                  type="email"
                  placeholder="tu@empresa.com"
                  value={form.email}
                  onChange={(v) => update("email", v)}
                  autoComplete="email"
                  required
                />

                {/* Caso de uso */}
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <Briefcase className="h-3.5 w-3.5" />
                    Caso de uso
                  </Label>
                  <Select value={form.useCase} onValueChange={(v) => update("useCase", v)}>
                    <SelectTrigger className="bg-white/5 border-white/10 focus-visible:ring-cyan-400/40 focus-visible:border-cyan-400/40">
                      <SelectValue placeholder="¿Cómo vas a usar Sirax?" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover/95 backdrop-blur-xl border-white/10">
                      {USE_CASES.map((uc) => (
                        <SelectItem key={uc.value} value={uc.value}>
                          {uc.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Descripción del proyecto */}
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5" />
                    Cuéntanos brevemente sobre tu proyecto
                  </Label>
                  <Textarea
                    placeholder="Ej. Necesitamos automatizar el onboarding de clientes en nuestra fintech en México, validando CURP, RFC y listas OFAC en tiempo real…"
                    value={form.projectDescription}
                    onChange={(e) => update("projectDescription", e.target.value)}
                    rows={4}
                    className="bg-white/5 border-white/10 focus-visible:ring-cyan-400/40 focus-visible:border-cyan-400/40 resize-none"
                  />
                  <div className="flex justify-end text-[10px] text-muted-foreground/70">
                    {form.projectDescription.length}/500
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full relative overflow-hidden bg-gradient-to-r from-cyan-400 to-emerald-400 text-black hover:from-cyan-300 hover:to-emerald-300 font-semibold transition-all"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {loading ? (
                      <motion.span
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-2"
                      >
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Enviando solicitud…
                      </motion.span>
                    ) : (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-2"
                      >
                        Enviar solicitud
                        <ArrowRight className="h-4 w-4" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>

                <p className="text-[11px] text-muted-foreground leading-relaxed pt-1">
                  Al enviar aceptas nuestro{" "}
                  <span className="text-cyan-300 hover:underline cursor-pointer">Aviso de Privacidad</span>.
                  Recibirás un correo de confirmación automático y nuestro equipo de ventas te contactará
                  en menos de 24 horas hábiles.
                </p>
              </motion.form>
            )}
          </AnimatePresence>

          <div className="mt-5 flex items-center gap-2 text-[11px] text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            Conexión cifrada · Datos protegidos bajo esquema Zero-Trust
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Field({
  icon,
  label,
  type,
  placeholder,
  value,
  onChange,
  autoComplete,
  required,
}: {
  icon: React.ReactNode;
  label: string;
  type: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground flex items-center gap-1.5">
        {icon}
        {label}
        {required && <span className="text-cyan-400">*</span>}
      </Label>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        autoComplete={autoComplete}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="bg-white/5 border-white/10 focus-visible:ring-cyan-400/40 focus-visible:border-cyan-400/40"
      />
    </div>
  );
}

function SuccessView({ email, onClose }: { email: string; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="py-6 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 15 }}
        className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 border border-emerald-400/30 mb-4"
      >
        <CheckCircle2 className="h-8 w-8 text-emerald-400" />
      </motion.div>
      <h3 className="text-lg font-semibold mb-1.5">¡Solicitud recibida!</h3>
      <p className="text-sm text-muted-foreground mb-1">
        Enviamos un correo de confirmación a
      </p>
      <p className="text-sm font-mono text-cyan-300 mb-4 break-all">{email}</p>
      <p className="text-xs text-muted-foreground leading-relaxed mb-5">
        Nuestro equipo de ventas revisará tu solicitud y te contactará en menos de 24 horas
        hábiles para coordinar una demo y la activación de tu cuenta.
      </p>
      <Button
        onClick={onClose}
        className="w-full bg-gradient-to-r from-cyan-400 to-emerald-400 text-black hover:from-cyan-300 hover:to-emerald-300 font-semibold"
      >
        Entendido
      </Button>
    </motion.div>
  );
}
