/** Leituras de serviços e projetos usadas nesta versão (filtros e contadores). */
import { adminRequest } from "@/lib/api/http";
import { mapList, mapPaginated, mapService } from "@/lib/api/mappers";
import type { Service } from "@/types/models";

export async function listServices(signal?: AbortSignal): Promise<Service[]> {
  const payload = await adminRequest("/services", { signal });
  return mapList(payload, mapService);
}

/** Total de projetos cadastrados. Lê o meta.total da paginação do Laravel. */
export async function countProjects(signal?: AbortSignal): Promise<number> {
  const payload = await adminRequest("/projects", { signal, query: { per_page: 1 } });
  return mapPaginated(payload, (raw) => raw).total;
}
