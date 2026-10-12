import { LuConstruction } from "react-icons/lu";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ADMIN_HOME } from "@/lib/routes";
import styles from "./module-placeholder.module.css";

type ModulePlaceholderProps = {
  description: string;
  plannedVersion: string;
  requirements: string[];
  items: string[];
};

/** Módulo previsto, ainda não implementado nesta versão do painel. */
export function ModulePlaceholder({ description, plannedVersion, requirements, items }: ModulePlaceholderProps) {
  return (
    <Card padded className={styles.card}>
      <span className={styles.icon} aria-hidden="true">
        <LuConstruction />
      </span>
      <div className={styles.text}>
        <h2 className={styles.title}>Módulo em desenvolvimento</h2>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.plan}>
        <p className={styles.planTitle}>Previsto para a versão {plannedVersion}</p>
        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className={styles.requirements}>Requisitos: {requirements.join(", ")}</p>
      </div>
      <ButtonLink href={ADMIN_HOME} variant="secondary">
        Voltar para a visão geral
      </ButtonLink>
    </Card>
  );
}
