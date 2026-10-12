"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { LuArrowRight, LuExternalLink, LuFileText, LuFolderKanban, LuInbox, LuLayers, LuPlus, LuRefreshCw } from "react-icons/lu";
import { Alert } from "@/components/ui/alert";
import { Button, ButtonLink } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState, ErrorState } from "@/components/ui/state";
import { errorMessage } from "@/lib/api/errors";
import { formatDate } from "@/lib/format";
import { useAsync } from "@/lib/hooks/use-async";
import { publicConfig } from "@/lib/public-config";
import { fetchOverview, type Loaded } from "./api";
import styles from "./overview.module.css";

type StatCardProps = {
  label: string;
  caption: string;
  icon: ReactNode;
  value: Loaded<number> | undefined;
  href: string;
  linkLabel: string;
};

function StatCard({ label, caption, icon, value, href, linkLabel }: StatCardProps) {
  return (
    <Card className={styles.stat} aria-busy={value === undefined || undefined}>
      <div className={styles.statTop}>
        <h2 className={styles.statLabel}>{label}</h2>
        <span className={styles.statIcon} aria-hidden="true">
          {icon}
        </span>
      </div>
      {value === undefined ? (
        <>
          <Skeleton width={72} height={40} />
          <span className="sr-only">Carregando</span>
        </>
      ) : value.ok ? (
        <p className={styles.statValue}>{value.value}</p>
      ) : (
        <p className={styles.statUnavailable}>Não carregou</p>
      )}
      <p className={styles.statCaption}>{caption}</p>
      <Link href={href} className={styles.statLink}>
        {linkLabel}
        <LuArrowRight aria-hidden="true" />
      </Link>
    </Card>
  );
}

/** Resumo do painel: leads recentes, totais e atalhos. Só mostra números que o sistema realmente tem. */
export function OverviewView() {
  const overview = useAsync((signal) => fetchOverview(signal), "visao-geral");
  const data = overview.status === "success" ? overview.data : undefined;

  if (overview.status === "error") {
    return (
      <Card>
        <ErrorState title="Não foi possível carregar a visão geral" message={errorMessage(overview.error)} onRetry={overview.reload} />
      </Card>
    );
  }

  const somethingFailed = data !== undefined && [data.newLeads, data.projects, data.services, data.latestLeads].some((item) => !item.ok);

  return (
    <div className={styles.page}>
      {somethingFailed && (
        <Alert
          tone="warning"
          action={
            <Button variant="secondary" size="sm" icon={<LuRefreshCw aria-hidden="true" />} onClick={overview.reload}>
              Tentar de novo
            </Button>
          }
        >
          Algumas informações não carregaram.
        </Alert>
      )}

      <div className={styles.stats}>
        <StatCard
          label="Novos leads"
          caption="recebidos nos últimos 7 dias"
          icon={<LuInbox />}
          value={data?.newLeads}
          href="/admin/leads"
          linkLabel="Ver leads"
        />
        <StatCard
          label="Projetos"
          caption="cadastrados no portfólio"
          icon={<LuFolderKanban />}
          value={data?.projects}
          href="/admin/projetos"
          linkLabel="Gerenciar projetos"
        />
        <StatCard
          label="Serviços"
          caption="exibidos na página inicial"
          icon={<LuLayers />}
          value={data?.services}
          href="/admin/servicos"
          linkLabel="Gerenciar serviços"
        />
      </div>

      <div className={styles.columns}>
        <Card aria-labelledby="ultimos-leads">
          <CardHeader
            title="Últimos leads"
            titleId="ultimos-leads"
            description="Contatos mais recentes enviados pelo site."
            action={
              <ButtonLink href="/admin/leads" variant="ghost" size="sm">
                Ver todos
              </ButtonLink>
            }
          />
          {data === undefined ? (
            <div className={styles.latestSkeleton} aria-busy="true">
              <span className="sr-only">Carregando últimos leads...</span>
              {Array.from({ length: 4 }, (_, index) => (
                <div key={index} className={styles.latestSkeletonRow}>
                  <Skeleton width="40%" height={14} />
                  <Skeleton width="20%" height={14} />
                </div>
              ))}
            </div>
          ) : !data.latestLeads.ok ? (
            <p className={styles.unavailable}>Não foi possível carregar os últimos leads.</p>
          ) : data.latestLeads.value.length === 0 ? (
            <EmptyState
              icon={<LuInbox />}
              title="Nenhum lead ainda"
              description="Os pedidos de contato enviados pelo site vão aparecer aqui."
            />
          ) : (
            <ul className={styles.latestList}>
              {data.latestLeads.value.map((lead) => (
                <li key={lead.id}>
                  <Link href={`/admin/leads/${encodeURIComponent(lead.id)}`} className={styles.latestItem}>
                    <span className={styles.latestName}>{lead.name}</span>
                    <span className={styles.latestDate}>{formatDate(lead.createdAt)}</span>
                    <span className={styles.latestService}>{lead.serviceName ?? "Serviço não informado"}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card aria-labelledby="atalhos">
          <CardHeader title="Atalhos" titleId="atalhos" />
          <div className={styles.shortcuts}>
            <ButtonLink href="/admin/projetos" variant="secondary" fullWidth icon={<LuPlus aria-hidden="true" />}>
              Cadastrar projeto
            </ButtonLink>
            <ButtonLink href="/admin/servicos" variant="secondary" fullWidth icon={<LuPlus aria-hidden="true" />}>
              Cadastrar serviço
            </ButtonLink>
            <ButtonLink href="/admin/conteudo" variant="secondary" fullWidth icon={<LuFileText aria-hidden="true" />}>
              Editar textos do site
            </ButtonLink>
            <ButtonLink href={publicConfig.siteUrl} external variant="ghost" fullWidth icon={<LuExternalLink aria-hidden="true" />}>
              Ver site
            </ButtonLink>
          </div>
        </Card>
      </div>
    </div>
  );
}
