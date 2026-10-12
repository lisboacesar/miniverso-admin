/** Dados da visão geral. Cada número é buscado em separado: se um falhar, os outros aparecem. */
import { countProjects, listServices } from "@/features/catalog/api";
import { listLeads } from "@/features/leads/api";
import type { Lead } from "@/types/models";

export type Loaded<T> = { ok: true; value: T } | { ok: false };

export type OverviewData = {
  newLeads: Loaded<number>;
  projects: Loaded<number>;
  services: Loaded<number>;
  latestLeads: Loaded<Lead[]>;
};

const DAY_MS = 24 * 60 * 60 * 1000;

function settle<T>(result: PromiseSettledResult<T>): Loaded<T> {
  return result.status === "fulfilled" ? { ok: true, value: result.value } : { ok: false };
}

/** Data de 7 dias atrás no formato AAAA-MM-DD (horário local). */
function sevenDaysAgo(): string {
  const date = new Date(Date.now() - 7 * DAY_MS);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

export async function fetchOverview(signal: AbortSignal): Promise<OverviewData> {
  const [newLeads, latestLeads, projects, services] = await Promise.allSettled([
    listLeads({ createdFrom: sevenDaysAgo(), perPage: 1 }, signal).then((page) => page.total),
    listLeads({ perPage: 5 }, signal).then((page) => page.items),
    countProjects(signal),
    listServices(signal).then((items) => items.length),
  ]);

  const results = [newLeads, latestLeads, projects, services];
  if (results.every((result) => result.status === "rejected")) {
    // Nada carregou: mostra o erro geral com a opção de tentar de novo.
    throw (newLeads as PromiseRejectedResult).reason;
  }

  return {
    newLeads: settle(newLeads),
    latestLeads: settle(latestLeads),
    projects: settle(projects),
    services: settle(services),
  };
}
