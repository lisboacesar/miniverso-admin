import type { IconType } from "react-icons";
import { LuFileText, LuFolderKanban, LuInbox, LuLayers, LuLayoutDashboard } from "react-icons/lu";

export type NavItem = {
  href: string;
  label: string;
  icon: IconType;
  /** Só fica ativo na rota exata (usado na Visão geral). */
  exact?: boolean;
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/admin", label: "Visão geral", icon: LuLayoutDashboard, exact: true },
  { href: "/admin/leads", label: "Leads", icon: LuInbox },
  { href: "/admin/projetos", label: "Projetos", icon: LuFolderKanban },
  { href: "/admin/servicos", label: "Serviços", icon: LuLayers },
  { href: "/admin/conteudo", label: "Conteúdo do site", icon: LuFileText },
];

export function isNavItemActive(item: NavItem, pathname: string): boolean {
  if (item.exact) return pathname === item.href;
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

/** Título mostrado no cabeçalho de cada página. */
export function pageTitleFor(pathname: string): string {
  if (/^\/admin\/leads\/[^/]+$/.test(pathname)) return "Detalhe do lead";
  return NAV_ITEMS.find((item) => isNavItemActive(item, pathname))?.label ?? "Painel";
}
