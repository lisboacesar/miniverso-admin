import type { Metadata } from "next";
import { ModulePlaceholder } from "@/features/placeholder/module-placeholder";

export const metadata: Metadata = { title: "Conteúdo do site" };

export default function ConteudoPage() {
  return (
    <ModulePlaceholder
      description="Aqui o administrador vai editar os textos e imagens institucionais da página inicial, seção por seção."
      plannedVersion="0.4"
      requirements={["RF15", "RF18", "RNF41", "RNF44", "RN02"]}
      items={[
        "Hero, Sobre a Miniverso, Diferenciais, Processo, Clientes e parceiros e Rodapé",
        "Indicação de onde cada bloco aparece no site",
        "Alterações refletidas na página pública depois de salvar",
      ]}
    />
  );
}
