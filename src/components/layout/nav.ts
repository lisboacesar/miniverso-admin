import type { IconType } from "react-icons";
import { LuHouse } from "react-icons/lu";

export type NavItem = {
  href: string;
  label: string;
  icon: IconType;
  /** Só fica ativo na rota exata. */
  exact?: boolean;
};

/**
 * Nesta versão o painel tem um único módulo: o editor da página inicial (RF15, RF18).
 * Novos módulos entram aqui quando o back-end tiver as rotas.
 */
export const NAV_ITEMS: NavItem[] = [{ href: "/admin/pagina-inicial", label: "Página inicial", icon: LuHouse }];

export const HOME_EDITOR_PATH = "/admin/pagina-inicial";

export function isNavItemActive(item: NavItem, pathname: string): boolean {
  if (item.exact) return pathname === item.href;
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

/** Título mostrado no cabeçalho de cada página. */
export function pageTitleFor(pathname: string): string {
  return NAV_ITEMS.find((item) => isNavItemActive(item, pathname))?.label ?? "Painel";
}
