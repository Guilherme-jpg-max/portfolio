import { createFileRoute } from "@tanstack/react-router";
import { env } from "cloudflare:workers";

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json()) as {
          name?: string;
          email?: string;
          message?: string;
        };
        const { name, email, message } = body;

        if (!name || !email || !message) {
          return new Response(
            JSON.stringify({ error: "Preencha todos os campos." }),
            { status: 400, headers: { "Content-Type": "application/json" } },
          );
        }

        const resendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Portfólio <onboarding@resend.dev>",
            to: ["guilhermecarlostrabalho@gmail.com"],
            reply_to: email,
            subject: `Novo contato de ${name} via portfólio`,
            text: `Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`,
          }),
        });

        if (!resendRes.ok) {
          console.error("Resend error:", await resendRes.text());
          return new Response(
            JSON.stringify({ error: "Falha ao enviar a mensagem." }),
            { status: 502, headers: { "Content-Type": "application/json" } },
          );
        }

        return new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});