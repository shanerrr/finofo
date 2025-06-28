import MainLayout from "@/layout/MainLayout";

import { getFruits } from "@/lib/data";
import { SearchParams } from "./types";
import { DEFAULT_VIEW, DEFAULT_GROUP_BY } from "./constants";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { view = DEFAULT_VIEW, groupBy = DEFAULT_GROUP_BY } =
    await searchParams;
  const fruits = await getFruits();

  return <MainLayout fruits={fruits} viewParam={view} groupByParam={groupBy} />;
}
