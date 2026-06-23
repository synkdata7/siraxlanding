"use client";

import { useEffect, useState } from "react";
import { Cookie, ShieldCheck, BarChart3, Megaphone, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  acceptAll,
  getStoredConsent,
  rejectNonEssential,
  saveConsent,
} from "@/lib/cookie-consent";

export const OPEN_COOKIE_PREFERENCES_EVENT = "open-cookie-preferences";

export function CookieConsent() {
  const [state, setState] = useState({
    visible: false,
    configOpen: false,
    analytics: false,
    marketing: false,
  });
  const { visible, configOpen, analytics, marketing } = state;

  useEffect(() => {
    const stored = getStoredConsent();
    // Sincroniza el estado con localStorage tras la hidratación (no se puede leer durante el render en SSR).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState((prev) =>
      stored
        ? { ...prev, visible: false, analytics: stored.analytics, marketing: stored.marketing }
        : { ...prev, visible: true }
    );

    // Permite reabrir el panel de configuración desde cualquier parte (ej. Footer).
    function handleOpenPreferences() {
      const current = getStoredConsent();
      setState((prev) => ({
        ...prev,
        configOpen: true,
        analytics: current?.analytics ?? false,
        marketing: current?.marketing ?? false,
      }));
    }

    window.addEventListener(OPEN_COOKIE_PREFERENCES_EVENT, handleOpenPreferences);
    return () => window.removeEventListener(OPEN_COOKIE_PREFERENCES_EVENT, handleOpenPreferences);
  }, []);

  function setConfigOpen(open: boolean) {
    setState((prev) => ({ ...prev, configOpen: open }));
  }

  function setAnalytics(value: boolean) {
    setState((prev) => ({ ...prev, analytics: value }));
  }

  function setMarketing(value: boolean) {
    setState((prev) => ({ ...prev, marketing: value }));
  }

  function handleAcceptAll() {
    const next = acceptAll();
    setState((prev) => ({
      ...prev,
      analytics: next.analytics,
      marketing: next.marketing,
      visible: false,
      configOpen: false,
    }));
  }

  function handleRejectAll() {
    const next = rejectNonEssential();
    setState((prev) => ({
      ...prev,
      analytics: next.analytics,
      marketing: next.marketing,
      visible: false,
      configOpen: false,
    }));
  }

  function handleSavePreferences() {
    saveConsent({ analytics, marketing });
    setState((prev) => ({ ...prev, visible: false, configOpen: false }));
  }

  function openConfig() {
    const stored = getStoredConsent();
    setState((prev) => ({
      ...prev,
      configOpen: true,
      analytics: stored?.analytics ?? false,
      marketing: stored?.marketing ?? false,
    }));
  }

  return (
    <>
      {visible && (
        <div
          role="dialog"
          aria-live="polite"
          aria-label="Aviso de cookies"
          className="fixed inset-x-0 bottom-0 z-[100] px-4 pb-4 sm:px-6 sm:pb-6"
        >
          <div className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-background/95 backdrop-blur-xl shadow-2xl shadow-black/40 p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-emerald-400/20 border border-white/10 text-cyan-300">
                <Cookie className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h2 className="text-sm font-semibold tracking-tight">
                  Usamos cookies
                </h2>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                  Usamos cookies propias y de terceros para que la página funcione
                  correctamente, mejorar tu experiencia y analizar el tráfico. Puedes
                  aceptarlas todas, rechazar las que no son esenciales, o configurar
                  tus preferencias. Más información en nuestra{" "}
                  <a href="/cookies" className="text-cyan-300 hover:text-cyan-200 underline underline-offset-2">
                    Política de Cookies
                  </a>
                  .
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2.5">
              <Button variant="outline" size="sm" onClick={openConfig} className="sm:order-1">
                <Settings2 className="h-4 w-4" />
                Configurar
              </Button>
              <Button variant="secondary" size="sm" onClick={handleRejectAll} className="sm:order-2">
                Rechazar
              </Button>
              <Button size="sm" onClick={handleAcceptAll} className="sm:order-3">
                Aceptar todas
              </Button>
            </div>
          </div>
        </div>
      )}

      <Dialog open={configOpen} onOpenChange={setConfigOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Cookie className="h-5 w-5 text-cyan-300" />
              Preferencias de cookies
            </DialogTitle>
            <DialogDescription>
              Elige qué tipo de cookies quieres permitir. Puedes cambiar estas
              preferencias en cualquier momento desde el pie de página.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Técnicas - siempre activas */}
            <div className="flex items-start justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="h-4.5 w-4.5 mt-0.5 text-emerald-400 flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium">Técnicas / necesarias</div>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    Indispensables para que la web cargue y funcione correctamente
                    (sesión, seguridad, preferencias de idioma). No se pueden
                    desactivar.
                  </p>
                </div>
              </div>
              <Switch checked disabled aria-label="Cookies técnicas, siempre activas" />
            </div>

            {/* Analítica */}
            <div className="flex items-start justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <div className="flex items-start gap-3">
                <BarChart3 className="h-4.5 w-4.5 mt-0.5 text-cyan-300 flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium">Analítica</div>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    Nos ayudan a entender cómo usas la página (páginas visitadas,
                    tiempo de navegación) para mejorar la experiencia.
                  </p>
                </div>
              </div>
              <Switch
                checked={analytics}
                onCheckedChange={setAnalytics}
                aria-label="Cookies de analítica"
              />
            </div>

            {/* Marketing */}
            <div className="flex items-start justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <div className="flex items-start gap-3">
                <Megaphone className="h-4.5 w-4.5 mt-0.5 text-violet-300 flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium">Marketing</div>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    Usadas para mostrarte publicidad relevante y medir el rendimiento
                    de campañas en otros sitios.
                  </p>
                </div>
              </div>
              <Switch
                checked={marketing}
                onCheckedChange={setMarketing}
                aria-label="Cookies de marketing"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="secondary" onClick={handleRejectAll}>
              Rechazar no esenciales
            </Button>
            <Button onClick={handleSavePreferences}>Guardar preferencias</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
