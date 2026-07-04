import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-void px-4 font-mono">
      <div className="max-w-md text-center">
        <p className="text-signal text-xs tracking-[0.3em] uppercase">Error 0x404</p>
        <h1 className="text-6xl font-bold text-warm-paper mt-4 text-signal-glow">segfault</h1>
        <p className="mt-4 text-sm text-warm-paper/70">{"> path not found in filesystem"}</p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 border border-ember px-4 py-2 text-xs uppercase tracking-widest text-warm-paper hover:bg-ember/30 hover:text-hot-signal transition-colors"
          >
            {"$ cd ~"}
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    console.error("[root error boundary]", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-void px-4 font-mono">
      <div className="max-w-md text-center">
        <p className="text-signal text-xs tracking-[0.3em] uppercase">kernel panic</p>
        <h1 className="mt-4 text-xl font-semibold text-warm-paper text-signal-glow">
          process terminated unexpectedly
        </h1>
        <p className="mt-2 text-sm text-warm-paper/60">{"> retry or return home"}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="border border-signal px-4 py-2 text-xs uppercase tracking-widest text-warm-paper hover:bg-signal/20"
          >
            {"$ retry"}
          </button>
          <a
            href="/"
            className="border border-ember px-4 py-2 text-xs uppercase tracking-widest text-warm-paper hover:bg-ember/30"
          >
            {"$ cd ~"}
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "root@dev:~ — full-stack developer portfolio" },
      {
        name: "description",
        content:
          "Portfolio of a full-stack developer. Front-end, back-end. Currently accepting new projects.",
      },
      { property: "og:title", content: "root@dev:~ — full-stack developer" },
      {
        property: "og:description",
        content: "Front-end, back-end. A terminal-lit portfolio.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
