import { createHash, timingSafeEqual } from "node:crypto";
import {
  createSmtpTransport,
  describeSmtpError,
  smtpCredentials,
  smtpPorts,
} from "@/lib/email";

/**
 * Diagnóstico TEMPORAL del envío de correo desde el servidor.
 * Prueba la conexión y el inicio de sesión SMTP SIN enviar correos ni mostrar
 * la contraseña. Solo existe si se define la variable DIAG_TOKEN; uso:
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
