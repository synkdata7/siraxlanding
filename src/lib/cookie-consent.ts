/**
 * Sistema de gestión de consentimiento de cookies.
 *
 * Categorías:
 * - technical: siempre activas (necesarias para que la web funcione, no se pueden desactivar)
 * - analytics: medición de tráfico / comportamiento (ej. Google Analytics)
 * - marketing: publicidad y remarketing (ej. Meta Pixel, Google Ads)
 *
 * El consentimiento se guarda en localStorage y se expone vía un evento
 * `cookie-consent-changed` en `window` para que cualquier script (GA, Meta Pixel, etc.)
 * pueda suscribirse y activarse/desactivarse en consecuencia, en lugar de cargarse
 * incondicionalmente.
 */

export type CookieCategory = "technical" | "analytics" | "marketing";

export interface CookieConsentState {
  technical: true; // siempre true, no es configurable
  analytics: boolean;
  marketing: boolean;
  /** Marca de tiempo ISO de cuándo se otorgó/actualizó el consentimiento */
  timestamp: string;
}

const STORAGE_KEY = "sirax_cookie_consent";
export const COOKIE_CONSENT_EVENT = "cookie-consent-changed";

export const DEFAULT_CONSENT: Omit<CookieConsentState, "timestamp"> = {
  technical: true,
  analytics: false,
  marketing: false,
};

/** Devuelve el consentimiento guardado, o null si el usuario aún no ha decidido. */
export function getStoredConsent(): CookieConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CookieConsentState;
    if (typeof parsed?.analytics !== "boolean" || typeof parsed?.marketing !== "boolean") {
      return null;
    }
    return { ...parsed, technical: true };
  } catch {
    return null;
  }
}

/** Guarda el consentimiento y notifica a toda la app (mismo tab) vía CustomEvent. */
export function saveConsent(partial: { analytics: boolean; marketing: boolean }): CookieConsentState {
  const state: CookieConsentState = {
    technical: true,
    analytics: partial.analytics,
    marketing: partial.marketing,
    timestamp: new Date().toISOString(),
  };

  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    window.dispatchEvent(new CustomEvent<CookieConsentState>(COOKIE_CONSENT_EVENT, { detail: state }));
  }

  return state;
}

export function acceptAll(): CookieConsentState {
  return saveConsent({ analytics: true, marketing: true });
}

export function rejectNonEssential(): CookieConsentState {
  return saveConsent({ analytics: false, marketing: false });
}

/** Útil para que otros componentes/scripts comprueben si una categoría está habilitada. */
export function hasConsent(category: CookieCategory): boolean {
  if (category === "technical") return true;
  const stored = getStoredConsent();
  return stored ? stored[category] === true : false;
}
