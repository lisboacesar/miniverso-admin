import type { Metadata } from "next";
import { ModulePlaceholder } from "@/features/placeholder/module-placeholder";

export const metadata: Metadata = { title: "Serviços" };

export default function ServicosPage() {
  return (
    <ModulePlaceholder
      description="Aqui o administrador vai manter a lista de serviços exibida em cards na página inicial."
      plannedVersion="0.2"
      requirements={["RF13", "RIU13", "RIU15", "RNF24", "RNF34", "RN03"]}
      items={[
        "Lista com título, descrição e elemento visual de cada serviço",
        "Formulário com título, descrição breve e ícone ou imagem",
        "Exclusão com confirmação",
      ]}
    />
  );
}
