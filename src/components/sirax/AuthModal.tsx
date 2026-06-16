"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, ShieldCheck, Mail, Lock, User, Building2, Phone, ArrowRight, Fingerprint } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialMode?: "login" | "register";
}

export function AuthModal({ open, onOpenChange, initialMode = "login" }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    password: "",
  });
  const { toast } = useToast();

  // Sincroniza el modo cada vez que se abre el modal con un initialMode distinto
  useEffect(() => {
    if (open) setMode(initialMode);
  }, [open, initialMode]);

  const handleOpenChange = (next: boolean) => {
    onOpenChange(next);
  };

  const update = (k: keyof typeof form, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    if (!form.email || !form.password) {
      toast({
        title: "Faltan datos",
        description: "Correo y contraseña son obligatorios.",
        variant: "destructive",
      });
      return;
    }
    if (mode === "register" && !form.name) {
      toast({
        title: "Falta tu nombre",
        description: "Necesitamos tu nombre completo para crear la cuenta.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: mode,
          name: form.name,
          email: form.email,
          company: form.company,
          phone: form.phone,
          password: form.password,
        }),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data?.error || "No pudimos procesar tu solicitud.");
      }

      toast({
        title: mode === "register" ? "Cuenta creada" : "Sesión iniciada",
        description: data.message,
      });

      // Limpieza y cierre
      setForm({ name: "", email: "", company: "", phone: "", password: "" });
      handleOpenChange(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error inesperado.";
      toast({
        title: "No se pudo continuar",
        description: message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md p-0 overflow-hidden bg-card/95 backdrop-blur-xl border-white/10">
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
                  Acceso a Sirax
                </DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground">
                  Identity &amp; Risk Intelligence Platform
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
        </div>

        <div className="px-6 pb-6 pt-2">
          <Tabs value={mode} onValueChange={(v) => setMode(v as "login" | "register")}>
            <TabsList className="grid w-full grid-cols-2 bg-white/5">
              <TabsTrigger value="login">Iniciar sesión</TabsTrigger>
              <TabsTrigger value="register">Crear cuenta</TabsTrigger>
            </TabsList>

            {/* LOGIN */}
            <TabsContent value="login" className="mt-5">
              <form onSubmit={submit} className="space-y-4">
                <Field
                  icon={<Mail className="h-4 w-4" />}
                  label="Correo corporativo"
                  type="email"
                  placeholder="tu@empresa.com"
                  value={form.email}
                  onChange={(v) => update("email", v)}
                  autoComplete="email"
                />
                <Field
                  icon={<Lock className="h-4 w-4" />}
                  label="Contraseña"
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(v) => update("password", v)}
                  autoComplete="current-password"
                />

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="accent-cyan-400" /> Recordarme
                  </label>
                  <button type="button" className="hover:text-cyan-300 transition-colors">
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>

                <SubmitButton loading={loading} mode="login" />
              </form>
            </TabsContent>

            {/* REGISTER */}
            <TabsContent value="register" className="mt-5">
              <form onSubmit={submit} className="space-y-4">
                <Field
                  icon={<User className="h-4 w-4" />}
                  label="Nombre completo"
                  type="text"
                  placeholder="Carlos Méndez Rivera"
                  value={form.name}
                  onChange={(v) => update("name", v)}
                  autoComplete="name"
                />
                <Field
                  icon={<Building2 className="h-4 w-4" />}
                  label="Empresa (opcional)"
                  type="text"
                  placeholder="Tu empresa S.A. de C.V."
                  value={form.company}
                  onChange={(v) => update("company", v)}
                  autoComplete="organization"
                />
                <Field
                  icon={<Mail className="h-4 w-4" />}
                  label="Correo corporativo"
                  type="email"
                  placeholder="tu@empresa.com"
                  value={form.email}
                  onChange={(v) => update("email", v)}
                  autoComplete="email"
                />
                <Field
                  icon={<Phone className="h-4 w-4" />}
                  label="Teléfono (opcional)"
                  type="tel"
                  placeholder="+52 55 1234 5678"
                  value={form.phone}
                  onChange={(v) => update("phone", v)}
                  autoComplete="tel"
                />
                <Field
                  icon={<Lock className="h-4 w-4" />}
                  label="Contraseña"
                  type="password"
                  placeholder="Mínimo 8 caracteres"
                  value={form.password}
                  onChange={(v) => update("password", v)}
                  autoComplete="new-password"
                />

                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Al crear tu cuenta aceptas nuestro{" "}
                  <span className="text-cyan-300 hover:underline cursor-pointer">Aviso de Privacidad</span> y los{" "}
                  <span className="text-cyan-300 hover:underline cursor-pointer">Términos de Servicio</span>. Los datos de tu registro se notifican a <span className="text-cyan-300">contacto@daxserdig.site</span>.
                </p>

                <SubmitButton loading={loading} mode="register" />
              </form>
            </TabsContent>
          </Tabs>

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
}: {
  icon: React.ReactNode;
  label: string;
  type: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</span>
        <Input
          type={type}
          placeholder={placeholder}
          value={value}
          autoComplete={autoComplete}
          onChange={(e) => onChange(e.target.value)}
          className="pl-9 bg-white/5 border-white/10 focus-visible:ring-cyan-400/40 focus-visible:border-cyan-400/40"
        />
      </div>
    </div>
  );
}

function SubmitButton({ loading, mode }: { loading: boolean; mode: "login" | "register" }) {
  return (
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
            Procesando…
          </motion.span>
        ) : (
          <motion.span
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center gap-2"
          >
            {mode === "register" ? "Crear cuenta" : "Entrar"}
            <ArrowRight className="h-4 w-4" />
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  );
}
