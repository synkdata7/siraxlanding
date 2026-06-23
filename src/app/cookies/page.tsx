import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Cookie, ShieldCheck, BarChart3, Megaphone } from "lucide-react";
import { Navbar } from "@/components/sirax/Navbar";
import { Footer } from "@/components/sirax/Footer";

export const metadata: Metadata = {
  title: "Política de Cookies · Sirax",
  description:
    "Conoce qué cookies usa Sirax, quién las emite, para qué sirven y cómo puedes eliminarlas desde tu navegador.",
};

const COOKIE_TABLE: {
  category: string;
  icon: React.ReactNode;
  purpose: string;
  examples: { name: string; provider: string; purpose: string; duration: string }[];
}[] = [
  {
    category: "Técnicas / necesarias",
    icon: <ShieldCheck className="h-5 w-5 text-emerald-400" />,
    purpose:
      "Imprescindibles para que la plataforma funcione: mantener tu sesión activa, recordar tus preferencias de cookies y garantizar la seguridad del sitio. No requieren consentimiento porque sin ellas la web no puede funcionar.",
    examples: [
      {
        name: "sirax_cookie_consent",
        provider: "Sirax (propia)",
        purpose: "Guarda tus preferencias de cookies para no volver a preguntarte en cada visita.",
        duration: "12 meses",
      },
      {
        name: "next-auth.session-token",
        provider: "Sirax (propia)",
        purpose: "Mantiene tu sesión iniciada en la plataforma de forma segura.",
        duration: "Sesión / 30 días",
      },
    ],
  },
  {
    category: "Analítica",
    icon: <BarChart3 className="h-5 w-5 text-cyan-300" />,
    purpose:
      "Nos permiten entender cómo se usa el sitio (páginas más visitadas, tiempo de navegación, origen del tráfico) para mejorar la experiencia. Solo se activan si das tu consentimiento.",
    examples: [
      {
        name: "_ga, _ga_*",
        provider: "Google Analytics (Google LLC)",
        purpose: "Distingue usuarios y sesiones para generar estadísticas de uso agregadas.",
        duration: "Hasta 24 meses",
      },
      {
        name: "_gid",
        provider: "Google Analytics (Google LLC)",
        purpose: "Distingue usuarios para análisis de comportamiento a corto plazo.",
        duration: "24 horas",
      },
    ],
  },
  {
    category: "Marketing",
    icon: <Megaphone className="h-5 w-5 text-violet-300" />,
    purpose:
      "Se usan para mostrar publicidad relevante y medir el rendimiento de nuestras campañas en otros sitios y redes sociales. Solo se activan si das tu consentimiento.",
    examples: [
      {
        name: "_fbp, fr",
        provider: "Meta / Facebook (Meta Platforms, Inc.)",
        purpose: "Mide la efectividad de anuncios y permite remarketing en Facebook e Instagram.",
        duration: "Hasta 90 días",
      },
      {
        name: "ads/ga-audiences",
        provider: "Google Ads (Google LLC)",
        purpose: "Permite remarketing y medición de conversiones de campañas de Google Ads.",
        duration: "Hasta 540 días",
      },
    ],
  },
];

export default function CookiesPolicyPage() {
  return (
    <div className="sirax-app-shell relative">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-cyan-500/[0.04] rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[35rem] h-[35rem] bg-emerald-500/[0.04] rounded-full blur-[140px]" />
      </div>

      <Navbar />

      <main className="sirax-app-main">
        <section className="relative py-20 sm:py-28">
          <div className="mx-auto max-w-3xl px-5 lg:px-8">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al inicio
            </Link>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-cyan-300 mb-4">
              <Cookie className="h-3.5 w-3.5" />
              Política de Cookies
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
              Política de Cookies de Sirax
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Última actualización: {new Date().toLocaleDateString("es-MX", { year: "numeric", month: "long", day: "numeric" })}
            </p>

            <div className="mt-10 space-y-8 text-sm sm:text-base text-muted-foreground leading-relaxed">
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-2">¿Qué son las cookies?</h2>
                <p>
                  Las cookies son pequeños archivos de texto que se almacenan en tu navegador
                  cuando visitas un sitio web. Permiten que la web recuerde tus acciones y
                  preferencias (como el idioma, el tamaño de fuente o el estado de tu sesión)
                  durante un periodo de tiempo, para que no tengas que volver a configurarlas
                  cada vez que navegas por el sitio o cambias de página.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-foreground mb-2">¿Quién utiliza estas cookies?</h2>
                <p>
                  Algunas cookies son gestionadas directamente por Sirax / SynkData ("cookies
                  propias") y otras son emitidas por terceros que nos prestan servicios de
                  analítica o publicidad ("cookies de terceros"), como Google o Meta. En la tabla
                  siguiente detallamos el emisor de cada cookie.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-foreground mb-3">Tipos de cookies que usamos</h2>
                <div className="space-y-6">
                  {COOKIE_TABLE.map((group) => (
                    <div
                      key={group.category}
                      className="rounded-2xl border border-white/10 bg-white/[0.02] p-5"
                    >
                      <div className="flex items-center gap-2.5 mb-2">
                        {group.icon}
                        <h3 className="text-base font-semibold text-foreground">{group.category}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{group.purpose}</p>

                      <div className="overflow-x-auto -mx-2">
                        <table className="w-full text-left text-xs sm:text-sm min-w-[480px]">
                          <thead>
                            <tr className="text-muted-foreground/70 uppercase text-[10px] tracking-wider">
                              <th className="px-2 py-2 font-medium">Cookie</th>
                              <th className="px-2 py-2 font-medium">Emisor</th>
                              <th className="px-2 py-2 font-medium">Finalidad</th>
                              <th className="px-2 py-2 font-medium">Duración</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5">
                            {group.examples.map((row) => (
                              <tr key={row.name}>
                                <td className="px-2 py-2.5 font-mono text-foreground/90 align-top whitespace-nowrap">
                                  {row.name}
                                </td>
                                <td className="px-2 py-2.5 align-top whitespace-nowrap">{row.provider}</td>
                                <td className="px-2 py-2.5 align-top">{row.purpose}</td>
                                <td className="px-2 py-2.5 align-top whitespace-nowrap">{row.duration}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-foreground mb-2">
                  ¿Cómo puedo gestionar mis preferencias en Sirax?
                </h2>
                <p>
                  Puedes aceptar, rechazar o personalizar el uso de cookies de analítica y
                  marketing en cualquier momento desde el panel de configuración, accesible
                  desde el botón <span className="text-foreground font-medium">"Configurar cookies"</span>{" "}
                  en el pie de página de este sitio. Las cookies técnicas no pueden
                  desactivarse porque son indispensables para el funcionamiento básico de la
                  plataforma.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-foreground mb-2">
                  ¿Cómo puedo eliminar las cookies desde mi navegador?
                </h2>
                <p className="mb-3">
                  Además de gestionarlas desde Sirax, puedes eliminar o bloquear las cookies
                  directamente desde la configuración de tu navegador. Estas son las rutas
                  habituales en los navegadores más usados:
                </p>
                <ul className="space-y-2 list-disc pl-5">
                  <li>
                    <span className="text-foreground font-medium">Google Chrome:</span> Menú ⋮ →
                    Configuración → Privacidad y seguridad → Cookies y otros datos de sitios.
                  </li>
                  <li>
                    <span className="text-foreground font-medium">Mozilla Firefox:</span> Menú ☰ →
                    Configuración → Privacidad y Seguridad → Cookies y datos del sitio.
                  </li>
                  <li>
                    <span className="text-foreground font-medium">Safari (macOS/iOS):</span>
                    {" "}Preferencias / Configuración → Privacidad → Gestionar datos de sitios
                    web.
                  </li>
                  <li>
                    <span className="text-foreground font-medium">Microsoft Edge:</span> Menú ⋯ →
                    Configuración → Cookies y permisos del sitio.
                  </li>
                </ul>
                <p className="mt-3">
                  Ten en cuenta que bloquear todas las cookies, incluidas las técnicas, puede
                  afectar el funcionamiento de la plataforma e impedir que ciertas secciones
                  carguen correctamente.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-foreground mb-2">Más información</h2>
                <p>
                  Para conocer cómo tratamos tus datos personales en general, consulta nuestro{" "}
                  <a href="#" className="text-cyan-300 hover:text-cyan-200 underline underline-offset-2">
                    Aviso de Privacidad
                  </a>
                  . Si tienes dudas sobre esta política, escríbenos a{" "}
                  <a
                    href="mailto:soporte@sirax.lat"
                    className="text-cyan-300 hover:text-cyan-200 underline underline-offset-2"
                  >
                    soporte@sirax.lat
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
