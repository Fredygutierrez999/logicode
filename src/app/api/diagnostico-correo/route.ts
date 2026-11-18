import { createHash, timingSafeEqual } from "node:crypto";
import {
  RESEND_ENDPOINT,
  createSmtpTransport,
  describeSmtpError,
  smtpCredentials,
  smtpPorts,
  resendFrom,
} from "@/lib/email";

/**
 * Diagnóstico TEMPORAL del envío de correo desde el servidor.
 * Prueba Resend (HTTPS) y SMTP SIN enviar correos ni mostrar claves. Solo existe si se define la variable DIAG_TOKEN; uso:
 *   https://logicode.app/api/diagnostico-correo?token=<DIAG_TOKEN>
 * Elimina este archivo (y DIAG_TOKEN) cuando el problema esté resuelto.
 */
export async function GET(request: Request) {
  const expected = process.env.DIAG_TOKEN;
  const given = new URL(request.url).searchParams.get("token") ?? "";
  const hash = (s: string) => createHash("sha256").update(s).digest();

  if (!expected || !timingSafeEqual(hash(given), hash(expected))) {
    return new Response("Not Found", { status: 404 });
  }

  const auth = smtpCredentials();
  const result: Record<string, unknown> = {
    proveedor_activo: process.env.RESEND_API_KEY ? "Resend (HTTPS)" : "SMTP",
    resend: await checkResend(),
    variables: {
      SMTP_USER: auth?.user ?? process.env.SMTP_USER ?? null,
      SMTP_PASS_definida: Boolean(process.env.SMTP_PASS),
      SMTP_PASS_largo: auth?.pass.length ?? 0,
      SMTP_HOST: process.env.SMTP_HOST ?? "smtp.gmail.com (por defecto)",
    },
  };

  if (auth) {
    const ports: Record<string, string> = {};
    for (const port of smtpPorts()) {
      const started = Date.now();
      try {
        await createSmtpTransport(port, auth).verify();
        ports[port] = `OK (${Date.now() - started} ms)`;
      } catch (error) {
        ports[port] =
          `ERROR tras ${Date.now() - started} ms: ${describeSmtpError(error)}`;
      }
    }
    result.conexion_smtp = ports;
  }

  return Response.json(result, { headers: { "Cache-Control": "no-store" } });
}

/**
 * Comprueba que el servidor llegue a la API de Resend y que la clave sea
 * reconocida, enviando un correo vacío que Resend rechaza por validación
 * (422) sin llegar a enviarlo. 401/403 indica clave inválida.
 */
async function checkResend() {
  const key = process.env.RESEND_API_KEY;
  const started = Date.now();
  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key ?? "sin-clave"}`,
        "Content-Type": "application/json",
      },
      body: "{}",
      signal: AbortSignal.timeout(15_000),
    });
    const body = (await res.text()).slice(0, 200);
    return {
      RESEND_API_KEY_definida: Boolean(key),
      remitente: resendFrom(),
      conexion_https: `OK (${Date.now() - started} ms)`,
      respuesta: `HTTP ${res.status} ${body}`,
    };
  } catch (error) {
    return {
      RESEND_API_KEY_definida: Boolean(key),
      conexion_https: `ERROR tras ${Date.now() - started} ms: ${describeSmtpError(error)}`,
    };
  }
}
