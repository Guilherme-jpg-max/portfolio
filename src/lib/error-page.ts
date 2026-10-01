/**
 * HTML estático servido quando o SSR falha antes de o React conseguir renderizar.
 * Não depende do CSS do app: as cores replicam a paleta de `src/styles.css`.
 */
export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <title>kernel panic · guilhermecarlos@portfolio</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <style>
      body { margin: 0; min-height: 100vh; display: grid; place-items: center; padding: 1.5rem; background: #0F0505; color: #F2E8DC; font: 14px/1.6 "JetBrains Mono", ui-monospace, monospace; }
      .card { max-width: 28rem; text-align: center; }
      .eyebrow { color: #C41E1E; font-size: 12px; letter-spacing: 0.3em; text-transform: uppercase; margin: 0; }
      h1 { margin: 1rem 0 0.5rem; font-size: 1.25rem; text-shadow: 0 0 4px #C41E1E, 0 0 12px #C41E1E; }
      p { color: rgba(242, 232, 220, 0.6); margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.5rem 1rem; font: inherit; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; color: #F2E8DC; background: none; cursor: pointer; text-decoration: none; }
      button { border: 1px solid #C41E1E; }
      a { border: 1px solid #7A1414; }
    </style>
  </head>
  <body>
    <div class="card">
      <p class="eyebrow">kernel panic</p>
      <h1>a página não carregou</h1>
      <p>&gt; algo deu errado do nosso lado. tente de novo ou volte para o início.</p>
      <div class="actions">
        <button onclick="location.reload()">$ retry</button>
        <a href="/">$ cd ~</a>
      </div>
    </div>
  </body>
</html>`;
}
