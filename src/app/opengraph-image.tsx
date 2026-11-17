import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Imagen de vista previa al compartir el enlace (WhatsApp, Facebook, LinkedIn, X…).
// Colores fijos de la paleta de marca (ver README, "Estándar de colores").

export const alt =
  "Logi Code — Software a la medida e inteligencia artificial para tu negocio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// El generador de imágenes calcula mal el ancho de algunos espacios con Geist
// (aparecen espacios dobles). Con espacios no separables el espaciado es
// correcto; por eso los saltos de línea se definen a mano, línea por línea.
const nb = (text: string) => text.replace(/ /g, "\u00a0");

export default async function OpengraphImage() {
  const fontsDir = join(process.cwd(), "src/assets/fonts");
  const [regular, semibold] = await Promise.all([
    readFile(join(fontsDir, "Geist-Regular.ttf")),
    readFile(join(fontsDir, "Geist-SemiBold.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#0f1027",
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(37,99,235,0.45), transparent 45%), radial-gradient(circle at 70% 85%, rgba(124,58,237,0.45), transparent 50%)",
          color: "#ececf7",
          fontFamily: "Geist",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 72,
              height: 72,
              borderRadius: 18,
              backgroundImage: "linear-gradient(135deg, #2563eb, #7c3aed)",
              color: "#ffffff",
              fontSize: 30,
              fontWeight: 600,
            }}
          >
            {"</>"}
          </div>
          <div style={{ display: "flex", fontSize: 44, fontWeight: 600 }}>
            <span>Logi</span>
            {/* Compensa la separación que el generador agrega entre elementos */}
            <span style={{ color: "#a78bfa", marginLeft: -4 }}>Code</span>
          </div>
        </div>

        {/* Mensaje */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 68,
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: -1.5,
              maxWidth: 980,
            }}
          >
            <span>{nb("Software a la medida e")}</span>
            <span
              style={{
                backgroundImage: "linear-gradient(90deg, #60a5fa, #a78bfa)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {nb("IA para tu negocio.")}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 28,
              fontSize: 30,
              color: "#c7c9de",
              lineHeight: 1.35,
            }}
          >
            <span>
              {nb("Aplicaciones web, móviles y de escritorio, automatización y")}
            </span>
            <span>{nb("agentes de IA enfocados en resultados.")}</span>
          </div>
        </div>

        {/* Pie */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 26,
            color: "#c7c9de",
          }}
        >
          <div
            style={{
              display: "flex",
              padding: "12px 26px",
              borderRadius: 999,
              backgroundImage: "linear-gradient(90deg, #2563eb, #7c3aed)",
              color: "#ffffff",
              fontWeight: 600,
            }}
          >
            {nb("Diagnóstico de IA sin costo")}
          </div>
          <div style={{ display: "flex" }}>logi.code.app@gmail.com</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: regular, weight: 400, style: "normal" },
        { name: "Geist", data: semibold, weight: 600, style: "normal" },
      ],
    },
  );
}
