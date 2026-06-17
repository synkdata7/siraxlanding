# Sirax · Identity & Risk Intelligence Platform

> Plataforma de Verificación de Identidad, Background Checks, Compliance e Inteligencia de Riesgo para México y Latinoamérica. Powered by **SynkData**.

Landing page institucional con formulario de solicitud de acceso que captura leads y los reenvía automáticamente al correo de ventas, con confirmación automática al usuario.

---

## Tabla de contenidos

1. [Stack tecnológico](#stack-tecnológico)
2. [Requisitos](#requisitos)
3. [Instalación local](#instalación-local)
4. [Variables de entorno](#variables-de-entorno)
5. [Comandos disponibles](#comandos-disponibles)
6. [Estructura del proyecto](#estructura-del-proyecto)
7. [Flujo del formulario de contacto](#flujo-del-formulario-de-contacto)
8. [Despliegue en producción](#despliegue-en-producción)
   - [Opción A · Vercel (recomendada)](#opción-a--vercel-recomendada)
   - [Opción B · VPS con Docker](#opción-b--vps-con-docker)
   - [Opción C · VPS con Node + PM2](#opción-c--vps-con-node--pm2)
9. [Post-despliegue](#post-despliegue)
10. [Solución de problemas](#solución-de-problemas)
11. [Licencia](#licencia)

---

## Stack tecnológico

| Capa              | Tecnología                                  |
|-------------------|---------------------------------------------|
| Framework         | Next.js 16 (App Router) + TypeScript 5      |
| Estilos           | Tailwind CSS 4 + shadcn/ui                  |
| Animaciones       | Framer Motion                               |
| Gráficos          | Recharts                                    |
| Base de datos     | Prisma ORM + SQLite (dev) / PostgreSQL (prod) |
| Emails            | FormSubmit.co (sin SMTP) o Nodemailer (SMTP) |
| Runtime           | Node.js 20+ / Bun                           |

---

## Requisitos

- **Node.js** 20.0+  (o **Bun** 1.1+)
- **npm**, **pnpm** o **bun** como gestor de paquetes
- **Git** (opcional, solo para clonar el repo)
- Conexión a Internet (para FormSubmit.co y fuentes externas)

---

## Instalación local

```bash
# 1. Descomprime el zip
unzip sirax.zip
cd sirax

# 2. Instala dependencias (elige uno)
bun install         # recomendado
# o
npm install
# o
pnpm install

# 3. Configura las variables de entorno
cp .env.example .env
# Edita .env y ajusta los correos si hace falta

# 4. Inicializa la base de datos (crea las tablas)
bun run db:push
# o: npx prisma db push

# 5. Arranca el servidor de desarrollo
bun run dev
# o: npm run dev
```

Abre **http://localhost:3000** en tu navegador.

---

## Variables de entorno

Copia `.env.example` a `.env` y ajusta los valores:

| Variable                | Descripción                                  | Default                              |
|-------------------------|----------------------------------------------|--------------------------------------|
| `DATABASE_URL`          | URL de conexión a la base de datos           | `file:./db/custom.db` (SQLite)       |
| `SIRAX_SALES_EMAIL`     | Correo donde llegan las solicitudes          | `ventas@sirax.lat`                   |
| `SIRAX_SUPPORT_EMAIL`   | Correo público de soporte (footer/CTA)       | `soporte@sirax.lat`                  |
| `NEXT_PUBLIC_SITE_URL`  | URL pública del sitio (sin slash final)      | `https://sirax.lat`                  |
| `SMTP_HOST` (opcional)  | Host SMTP si no usas FormSubmit              | —                                    |
| `SMTP_PORT` (opcional)  | Puerto SMTP                                  | —                                    |
| `SMTP_USER` (opcional)  | Usuario SMTP                                 | —                                    |
| `SMTP_PASSWORD` (opcional) | Password SMTP                              | —                                    |
| `SMTP_FROM` (opcional)  | Remitente                                    | —                                    |

> ℹ️ Si cambias `SIRAX_SALES_EMAIL`, recuerda actualizarlo también en `src/app/api/auth/route.ts` (líneas 4-5) si quieres que sea tomado del entorno en lugar del valor por defecto.

---

## Comandos disponibles

| Comando              | Descripción                                   |
|----------------------|-----------------------------------------------|
| `bun run dev`        | Servidor de desarrollo en `http://localhost:3000` |
| `bun run build`      | Build de producción (Next.js standalone)      |
| `bun run start`      | Sirve el build de producción                  |
| `bun run lint`       | Verifica el código con ESLint                 |
| `bun run db:push`    | Sincroniza el schema de Prisma con la DB      |
| `bun run db:generate`| Regenera el cliente de Prisma                 |
| `bun run db:migrate` | Crea y aplica una migración                   |
| `bun run db:reset`   | Resetea la base de datos (¡borra todo!)       |

---

## Estructura del proyecto

```
sirax/
├── prisma/
│   └── schema.prisma              # Modelos: User, LoginLog, ContactRequest
├── public/
│   ├── logo.svg
│   └── robots.txt
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── auth/
│   │   │       └── route.ts       # Endpoint POST /api/auth (recibe y reenvía)
│   │   ├── globals.css            # Estilos globales + tema dark-tech Sirax
│   │   ├── layout.tsx             # Metadata, fuentes, html root
│   │   └── page.tsx               # Ensamble de todas las secciones
│   ├── components/
│   │   ├── sirax/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Hero.tsx           # Hero con canvas de partículas animado
│   │   │   ├── AuthModal.tsx      # Modal con formulario de 6 campos
│   │   │   ├── ArchitectureSection.tsx
│   │   │   ├── IdentityAndGovernmentSection.tsx
│   │   │   ├── ComplianceAndDigitalSection.tsx
│   │   │   ├── KnowledgeGraphSection.tsx
│   │   │   ├── RiskEngineSection.tsx
│   │   │   ├── AIInvestigationSection.tsx
│   │   │   ├── AnalyticsSection.tsx
│   │   │   ├── ApiSection.tsx
│   │   │   ├── CTASection.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Section.tsx        # Helpers reutilizables
│   │   └── ui/                    # shadcn/ui components
│   ├── hooks/
│   │   ├── use-toast.ts
│   │   └── use-mobile.ts
│   └── lib/
│       ├── db.ts                  # Cliente Prisma
│       └── utils.ts
├── db/
│   └── custom.db                  # SQLite local (ignorar en prod)
├── .env.example
├── .gitignore
├── README.md                      # ← Este archivo
├── components.json                # Config de shadcn/ui
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

---

## Flujo del formulario de contacto

Cuando un usuario hace clic en **"Solicitar acceso"**:

1. Se abre el modal con 6 campos: **nombre completo, empresa, número de celular, correo, caso de uso, descripción del proyecto**.
2. Al enviar, el endpoint `POST /api/auth`:
   - **Valida** todos los campos.
   - **Persiste** la solicitud en la tabla `ContactRequest` de la base de datos.
   - **Reenvía** los datos a `SIRAX_SALES_EMAIL` (`ventas@sirax.lat`) vía FormSubmit.co.
   - **Dispara** automáticamente un correo de confirmación al usuario (al correo que dejó) usando el campo `_autoresponse` de FormSubmit.
3. El usuario ve una pantalla de éxito *"¡Solicitud recibida! Enviamos un correo de confirmación a {email}"*.

### ⚠️ Activación única de FormSubmit (OBLIGATORIA)

La **primera vez** que alguien envíe el formulario, FormSubmit enviará un correo de **activación** a `ventas@sirax.lat`. Hay que:

1. Abrir ese correo.
2. Hacer clic en el enlace de confirmación.

A partir de ese momento, todas las solicitudes llegarán automáticamente al correo de ventas y la confirmación automática se enviará al usuario.

> Si necesitas evitar este paso, configura SMTP propio (ver variables de entorno) y modifica `src/app/api/auth/route.ts` para usar Nodemailer.

---

## Despliegue en producción

### Opción A · Vercel (recomendada)

La forma más simple, ya que el proyecto es 100% Next.js.

1. **Sube el código a GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Sirax initial release"
   git branch -M main
   git remote add origin https://github.com/USUARIO/sirax.git
   git push -u origin main
   ```

2. **Importa el repo en Vercel**:
   - Ve a [vercel.com/new](https://vercel.com/new)
   - Selecciona tu repo
   - Framework preset: **Next.js** (auto-detectado)
   - Root directory: `./`
   - Build command: `prisma generate && next build` (o déjalo por defecto — Vercel lo detecta)
   - Install command: `npm install` (o `bun install`)

3. **Configura las variables de entorno** en Vercel (Settings → Environment Variables):
   ```
   DATABASE_URL="file:./db/custom.db"   # SQLite por defecto (ver nota abajo)
   SIRAX_SALES_EMAIL="ventas@sirax.lat"
   SIRAX_SUPPORT_EMAIL="soporte@sirax.lat"
   NEXT_PUBLIC_SITE_URL="https://tu-dominio.vercel.app"
   ```
   > ℹ️ **Para producción** se recomienda PostgreSQL. Crea una instancia en [Neon](https://neon.tech), [Supabase](https://supabase.com) o [Railway](https://railway.app) y pon la URL en `DATABASE_URL`. También cambia `provider = "sqlite"` a `provider = "postgresql"` en `prisma/schema.prisma`.

4. **Build & Deploy** — Vercel compila y despliega automáticamente.

5. **(Opcional) Dominio personalizado**:
   - Settings → Domains → añade `sirax.lat`
   - Configura los DNS de tu proveedor (A record o CNAME según indique Vercel).

6. **Después del primer deploy**, ejecuta la migración de Prisma:
   - Vercel → Settings → Functions → ejecuta `npx prisma db push` en el build script, O
   - Localmente con `DATABASE_URL` apuntando a prod: `DATABASE_URL="TU_URL_PROD" npx prisma db push`

---

### Opción B · VPS con Docker

#### 1. Crea un `Dockerfile` en la raíz:

```dockerfile
FROM node:20-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

EXPOSE 3000
ENV PORT=3000
CMD ["node", "server.js"]
```

#### 2. Crea un `docker-compose.yml`:

```yaml
services:
  sirax:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=file:./db/custom.db
      - SIRAX_SALES_EMAIL=ventas@sirax.lat
      - SIRAX_SUPPORT_EMAIL=soporte@sirax.lat
      - NEXT_PUBLIC_SITE_URL=https://sirax.lat
    volumes:
      - sirax-db:/app/db
    restart: unless-stopped

volumes:
  sirax-db:
```

#### 3. Construye y arranca:

```bash
docker compose up -d --build
# Inicializa la DB
docker compose exec sirax npx prisma db push
```

#### 4. Proxy con Nginx + SSL (Let's Encrypt):

```nginx
server {
    listen 80;
    server_name sirax.lat www.sirax.lat;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo certbot --nginx -d sirax.lat -d www.sirax.lat
```

---

### Opción C · VPS con Node + PM2

Para un VPS sin Docker.

```bash
# 1. Instala Node 20+ y pnpm/bun en el servidor
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm i -g pm2

# 2. Clona y compila
git clone https://github.com/USUARIO/sirax.git
cd sirax
cp .env.example .env
# Edita .env
npm install
npx prisma generate
npx prisma db push
npm run build

# 3. Arranca con PM2
pm2 start "node .next/standalone/server.js" --name sirax
pm2 save
pm2 startup  # sigue las instrucciones

# 4. Proxy con Nginx (ver Opción B paso 4)
```

---

## Post-despliegue

### Checklist post-deploy

- [ ] Visita la URL pública y verifica que la landing carga sin errores.
- [ ] Prueba el formulario de **"Solicitar acceso"** con un correo real.
- [ ] Revisa la bandeja de `ventas@sirax.lat` — debe haber un correo de **activación de FormSubmit**. Ábrelo y haz clic en el enlace de confirmación.
- [ ] Vuelve a probar el formulario. Ahora debe llegar la solicitud a `ventas@sirax.lat` Y un correo de confirmación al email que dejaste.
- [ ] Verifica que el footer muestre `soporte@sirax.lat`.
- [ ] Prueba en móvil (responsive).
- [ ] (Opcional) Configura Google Analytics / Plausible / Vercel Analytics.
- [ ] (Opcional) Configura un dominio personalizado y SSL.

### Backup de la base de datos (SQLite)

Si usas SQLite, configura un cron diario:

```bash
# crontab -e
0 3 * * * cp /ruta/a/sirax/db/custom.db /backups/sirax-$(date +\%Y\%m\%d).db
```

Si usas PostgreSQL, usa `pg_dump`:

```bash
0 3 * * * pg_dump $DATABASE_URL > /backups/sirax-$(date +\%Y\%m\%d).sql
```

---

## Solución de problemas

### El formulario envía pero no llega nada a `ventas@sirax.lat`

1. **¿Activaste FormSubmit?** La primera solicitud dispara un correo de activación a `ventas@sirax.lat`. Ábrelo y haz clic en el enlace. Sin este paso, FormSubmit no reenvía nada.
2. **Revisa la bandeja de spam** de `ventas@sirax.lat`.
3. **Verifica el log del servidor** — busca `[request-access]` y `POST /api/auth`:
   - HTTP `200` con `forwarded: false` → FormSubmit rechazó (probablemente falta activación).
   - HTTP `500` → revisa el stacktrace, probablemente un problema de Prisma/DB.

### La pantalla de éxito aparece pero el usuario no recibe la confirmación automática

El `_autoresponse` solo funciona **después** de la activación de FormSubmit. Si es la primera vez, el usuario no recibirá confirmación — solo se guardará en DB y se notificará a ventas.

### Quiero usar SMTP propio en lugar de FormSubmit

1. Descomenta las variables `SMTP_*` en `.env`.
2. Reemplaza la llamada a FormSubmit en `src/app/api/auth/route.ts` por Nodemailer:

```typescript
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
});

// Notificación a ventas
await transporter.sendMail({
  from: process.env.SMTP_FROM,
  to: SALES_EMAIL,
  subject: `🆕 Nueva solicitud de acceso a Sirax — ${name}`,
  html: `...`,
});

// Confirmación al usuario
await transporter.sendMail({
  from: process.env.SMTP_FROM,
  to: email,
  subject: "Hemos recibido tu solicitud · Sirax",
  text: AUTOCONFIRM_MESSAGE,
});
```

3. Instala Nodemailer: `npm install nodemailer @types/nodemailer`.

### La base de datos SQLite no funciona en Vercel

Vercel usa un filesystem efímero — SQLite se pierde en cada deploy. Para producción en Vercel usa **PostgreSQL** (Neon, Supabase, Railway) cambiando `DATABASE_URL` y el `provider` en `prisma/schema.prisma`.

### El deploy en Docker falla en `prisma generate`

Asegúrate de copiar también `node_modules/.prisma` y `node_modules/@prisma` en el stage final (ver Dockerfile de la Opción B). Si usas Bun, ajusta las rutas.

### Hydration mismatch en producción

Si al desplegar ves errores de hydration, normalmente es porque el servidor y el cliente renderizan algo distinto (fechas, IDs aleatorios). En Sirax esto ya está controlado, pero si lo modificas, recuerda usar `useEffect` o `suppressHydrationWarning` donde aplique.

---

## Licencia

© 2026 Sirax · SynkData. Todos los derechos reservados.

Para licencias comerciales, contacta a **soporte@sirax.lat**.

---

## Contacto

- **Soporte**: soporte@sirax.lat
- **Ventas**: ventas@sirax.lat
- **Sitio**: https://sirax.lat

---

**Sirax** — Identity Verification + Government Intelligence + Compliance Screening + Digital Footprint Analysis + Relationship Intelligence + AI Risk Assessment.
