import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const GRAPHQL_URL = "https://api.github.com/graphql";
const OUTPUT_FILE = new URL("../src/data/commit-stats.json", import.meta.url);

type YearTotal = { contributionCalendar: { totalContributions: number } };

export function buildYearlyQuery(years: readonly number[], now: Date): string {
  const fields = years.map((year) => {
    const from = `${year}-01-01T00:00:00Z`;
    const to = year === now.getUTCFullYear() ? now.toISOString() : `${year}-12-31T23:59:59Z`;
    return `y${year}: contributionsCollection(from: "${from}", to: "${to}") { contributionCalendar { totalContributions } }`;
  });
  return `query { viewer { ${fields.join(" ")} } }`;
}

export function sumYearlyTotals(viewer: Record<string, YearTotal>): number {
  return Object.values(viewer).reduce(
    (sum, year) => sum + year.contributionCalendar.totalContributions,
    0,
  );
}

async function graphql<T>(query: string, token: string): Promise<T> {
  const response = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: { Authorization: `bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
  if (!response.ok) {
    throw new Error(`GitHub GraphQL respondeu ${response.status}: ${await response.text()}`);
  }
  const payload = (await response.json()) as { data?: T; errors?: unknown };
  if (payload.errors || !payload.data) {
    throw new Error(`Erro na consulta GraphQL: ${JSON.stringify(payload.errors)}`);
  }
  return payload.data;
}

async function readCurrentTotal(): Promise<number | null> {
  try {
    const { total } = JSON.parse(await readFile(OUTPUT_FILE, "utf8")) as { total?: unknown };
    return typeof total === "number" ? total : null;
  } catch {
    return null;
  }
}

async function main(): Promise<void> {
  const token = process.env.GH_TOKEN;
  if (!token) throw new Error("Defina GH_TOKEN com um token do GitHub.");

  const { viewer: account } = await graphql<{
    viewer: { contributionsCollection: { contributionYears: number[] } };
  }>("query { viewer { contributionsCollection { contributionYears } } }", token);

  const years = account.contributionsCollection.contributionYears;
  const now = new Date();
  const { viewer } = await graphql<{ viewer: Record<string, YearTotal> }>(
    buildYearlyQuery(years, now),
    token,
  );

  const total = sumYearlyTotals(viewer);
  if (!Number.isInteger(total) || total <= 0) {
    throw new Error(`Total inválido (${total}); arquivo não atualizado.`);
  }

  const current = await readCurrentTotal();
  if (current === total) {
    console.log(`Total inalterado (${total}); nada a atualizar.`);
    return;
  }

  const updatedAt = now.toISOString().replace(/\.\d{3}Z$/, "Z");
  await writeFile(OUTPUT_FILE, `{"total": ${total}, "updatedAt": "${updatedAt}"}\n`);
  console.log(`Total histórico: ${total} contribuições (${years.join(", ")}).`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((error: unknown) => {
    console.error(error);
    process.exit(1);
  });
}
