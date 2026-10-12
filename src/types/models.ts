/**
 * Modelos usados pelo front-end.
 * Os dados da API (Laravel, em snake_case) são convertidos para estes tipos em
 * src/lib/api/mappers.ts. Se o contrato do back-end mudar, só os mappers mudam.
 */

export type User = {
  id: string;
  name: string;
  email: string;
};

/** Contato enviado pelo formulário da página pública (RF06, RF16, RF17). */
export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  serviceId: string | null;
  serviceName: string | null;
  message: string;
  /** Data e hora em ISO 8601. */
  createdAt: string;
};

/** Serviço exibido na página pública (RF13, RIU13). */
export type Service = {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
};

export type Paginated<T> = {
  items: T[];
  page: number;
  lastPage: number;
  perPage: number;
  total: number;
};

export type LeadSort = "recentes" | "antigos";

export type LeadFilters = {
  search: string;
  serviceId: string;
  sort: LeadSort;
  page: number;
  perPage: number;
  /** Data mínima de recebimento (AAAA-MM-DD). */
  createdFrom?: string;
};
