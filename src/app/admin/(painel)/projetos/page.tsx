import type { Metadata } from "next";
import { ModulePlaceholder } from "@/features/placeholder/module-placeholder";

export const metadata: Metadata = { title: "Projetos" };

export default function ProjetosPage() {
  return (
    <ModulePlaceholder
      description="Aqui o administrador vai cadastrar, editar e remover os projetos do portfólio sem mexer no código."
      plannedVersion="0.3"
      requirements={["RF14", "RIU16", "RIU17", "RIU18", "RNF24", "RNF34", "RN03"]}
      items={[
        "Lista com capa, nome e categoria",
        "Formulário com nome, capa, categoria, descrição, tecnologias ou serviços e imagens adicionais",
        "Envio de imagens com validação de tipo, extensão e tamanho, e texto alternativo",
        "Exclusão com confirmação",
      ]}
    />
  );
}
