import type { Metadata } from "next";
import { OverviewView } from "@/features/overview/overview-view";

export const metadata: Metadata = { title: "Visão geral" };

export default function VisaoGeralPage() {
  return <OverviewView />;
}
