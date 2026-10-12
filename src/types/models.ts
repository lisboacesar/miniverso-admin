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

// O conteúdo da página inicial tem tipos próprios em src/features/home-editor/types.ts.
