# Logi Code — Sitio web

Sitio web de **Logi Code**: desarrollo de aplicaciones a la medida (web, móviles, escritorio) y asesoría en IA empresarial, con foco en el valor para los usuarios.

Construido con Next.js 16 (App Router), React 19, TypeScript y Tailwind CSS 4.

## Inicio rápido

Requisitos: Node.js **v26 LTS** (fijado en `.node-version`; con [fnm](https://github.com/Schniz/fnm) se activa solo al entrar a la carpeta).

```bash
npm install
cp .env.example .env.local   # y completa SMTP_PASS (ver abajo)
npm run dev                  # http://localhost:3000
```

| Comando         | Uso                                  |
| --------------- | ------------------------------------ |
| `npm run dev`   | Servidor de desarrollo con recarga   |
| `npm run build` | Build de producción                  |
| `npm run start` | Sirve el build de producción         |
| `npm run lint`  | Revisión de código con ESLint        |

### Formulario de contacto

Los mensajes se envían por SMTP (Gmail) a `logi.code.app@gmail.com`. Configura en `.env.local` (y en el hosting al publicar):

- `SMTP_USER` — cuenta de Gmail que envía.
- `SMTP_PASS` — **contraseña de aplicación** de Google (no la contraseña normal), creada en <https://myaccount.google.com/apppasswords>.

Sin estas variables el formulario muestra un error con el correo directo; nunca confirma un envío que no ocurrió.

## Estructura

```
src/
  app/
    layout.tsx          Metadatos, fuentes, idioma
    page.tsx            Orden de las secciones de la página
    globals.css         Paleta de colores (tokens) — ver abajo
    actions/contact.ts  Server action del formulario
  components/           Una sección por archivo (Hero, Services, AiSection, …)
  lib/
    site.ts             Datos públicos (correo de contacto)
    contact.ts          Tipos y opciones del formulario
    email.ts            Envío de correo (nodemailer)
```

---

## Estándar de colores

La identidad de Logi Code combina **violeta** y **azul**, los colores asociados a la inteligencia artificial y la tecnología:

- **Violeta (principal)** — IA, innovación, creatividad. Es el color de marca: botones, enlaces, acentos.
- **Azul (secundario)** — tecnología, confianza, solidez. Acompaña al violeta en el degradado y en fondos de apoyo.
- **Degradado IA (azul → violeta)** — la firma visual de la marca. Se usa con moderación en elementos de identidad.

### Colores de marca

| Token            | Claro     | Oscuro    | Uso                                             |
| ---------------- | --------- | --------- | ----------------------------------------------- |
| `accent`         | `#6D28D9` | `#A78BFA` | **Violeta IA.** Botones principales, enlaces, etiquetas, íconos |
| `accent-hover`   | `#5B21B6` | `#C4B5FD` | Estado *hover* de botones principales            |
| `accent-ink`     | `#FFFFFF` | `#160B33` | Texto sobre `accent` y sobre el degradado        |
| `accent-soft`    | `#EDE9FE` | `#241B4D` | Fondos suaves, destacados, selección de texto    |
| `secondary`      | `#1D4ED8` | `#60A5FA` | **Azul tecnología.** Acento secundario           |
| `secondary-soft` | `#DBEAFE` | `#172554` | Fondos de apoyo (resplandores del hero)          |

### Degradado IA

| Token     | Claro     | Oscuro    |
| --------- | --------- | --------- |
| `ai-from` | `#2563EB` | `#60A5FA` |
| `ai-to`   | `#7C3AED` | `#A78BFA` |

Dirección: azul → violeta (`bg-linear-to-br from-ai-from to-ai-to`, o `to-r` en texto).

**Dónde sí:** ícono del logo, la frase destacada del hero, ícono de la asesoría en IA.
**Dónde no:** botones, bloques grandes de fondo o texto largo. Los botones usan `accent` sólido.

### Neutros

| Token       | Claro     | Oscuro    | Uso                                     |
| ----------- | --------- | --------- | --------------------------------------- |
| `bg`        | `#F7F7FB` | `#0A0A16` | Fondo de la página                      |
| `surface`   | `#FFFFFF` | `#121228` | Tarjetas, formularios, secciones alternas |
| `surface-2` | `#EEEEF6` | `#1A1A36` | Elementos dentro de tarjetas            |
| `ink`       | `#0F1027` | `#ECECF7` | Texto principal y títulos               |
| `muted`     | `#585C75` | `#A3A6C2` | Texto secundario y descripciones        |
| `line`      | `#E2E3EE` | `#26264A` | Bordes y divisores                      |

### Otros

| Token         | Valor                    | Uso                                              |
| ------------- | ------------------------ | ------------------------------------------------ |
| `danger`      | `#B42318` / `#F97066`    | Errores de formulario                            |
| `band`        | `#0F1027` (ambos temas)  | Fondo de la banda oscura ("Cómo trabajamos")     |
| `band-ink`    | `#ECECF7` (ambos temas)  | Texto sobre la banda                             |
| `band-accent` | `#A78BFA` (ambos temas)  | Acentos sobre la banda                           |

### Accesibilidad (contraste WCAG)

Todas las combinaciones de texto cumplen **WCAG AA** (mínimo 4.5:1):

| Combinación                         | Claro   | Oscuro  |
| ----------------------------------- | ------- | ------- |
| `ink` sobre `bg`                    | 17.5:1  | 16.8:1  |
| `muted` sobre `bg`                  | 6.1:1   | 8.2:1   |
| `accent` sobre `bg`                 | 6.7:1   | 7.2:1   |
| `secondary` sobre `bg`              | 6.3:1   | 7.7:1   |
| `accent-ink` sobre `accent` (botón) | 7.1:1   | 6.8:1   |
| `accent-ink` sobre el degradado     | ≥ 5.2:1 | ≥ 6.8:1 |
| `band-ink` sobre `band`             | 15.9:1  | 15.9:1  |

### Reglas de uso

1. **Usa tokens, nunca valores hexadecimales** en los componentes: `bg-accent`, `text-muted`, `border-line`, etc.
2. **Para cambiar un color, edítalo solo en `src/app/globals.css`** (en `:root` y en el bloque de modo oscuro). Todo el sitio se actualiza.
3. **Un solo color protagonista por vista:** violeta para acciones; azul y el degradado como apoyo.
4. **Revisa ambos temas** (claro y oscuro) y verifica el contraste de cualquier color nuevo con una herramienta como <https://webaim.org/resources/contrastchecker/>.
5. Texto sobre violeta o sobre el degradado: siempre `accent-ink`.

### Tipografía

- **Geist Sans** — textos y títulos.
- **Geist Mono** — etiquetas de sección, numeraciones y el logo `</>`.
