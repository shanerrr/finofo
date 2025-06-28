import MainLayout from "@/layout/MainLayout";

import { getFruits } from "@/lib/data";
import { SearchParams } from "./types";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { view = "list", groupBy = "none" } = await searchParams;
  const fruits = await getFruits();

  return <MainLayout fruits={fruits} viewParam={view} groupByParam={groupBy} />;
}
