import FruitList from "@/components/FruitList/FruitList";
import MenuBar from "@/components/MenuBar/MenuBar";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";

import { getFruits } from "@/lib/data";
import FruitTable from "@/components/FruitTable/FruitTable";
import { SearchParams } from "./types";
import FruitJar from "@/components/FruitJar/FruitJar";
import FruitGraph from "@/components/FruitGraph/FruitGraph";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { view, groupBy = "none" } = await searchParams;

  const fruits = await getFruits();

  const isTableView = view === "table";

  //todo layout cookies

  const selectedFruits = [
    {
      name: "Persimmon",
      id: 52,
      family: "Ebenaceae",
      order: "Rosales",
      genus: "Diospyros",
      nutritions: {
        calories: 81,
        fat: 0,
        sugar: 18,
        carbohydrates: 18,
        protein: 0,
      },
    },
    {
      name: "Strawberry",
      id: 3,
      family: "Rosaceae",
      order: "Rosales",
      genus: "Fragaria",
      nutritions: {
        calories: 29,
        fat: 0.4,
        sugar: 5.4,
        carbohydrates: 5.5,
        protein: 0.8,
      },
    },
    {
      name: "Banana",
      id: 1,
      family: "Musaceae",
      order: "Zingiberales",
      genus: "Musa",
      nutritions: {
        calories: 96,
        fat: 0.2,
        sugar: 17.2,
        carbohydrates: 22,
        protein: 1,
      },
    },
  ];

  return (
    <main className="container mx-auto h-screen flex flex-col gap-4 py-8">
      <header className="w-max">
        <MenuBar />
      </header>
      <ResizablePanelGroup direction="horizontal" className="h-full flex-1">
        <ResizablePanel
          className="h-full"
          defaultSize={isTableView ? 60 : 25}
          minSize={isTableView ? 60 : 25}
          maxSize={isTableView ? 75 : 30}
        >
          <ScrollArea className="h-full">
            {isTableView ? (
              <FruitTable fruits={fruits} />
            ) : (
              <FruitList fruits={fruits} groupBy={groupBy} />
            )}
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle withHandle className="mx-4 -z-10" />
        <ResizablePanel className="h-full" defaultSize={isTableView ? 40 : 75}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={50} maxSize={75} minSize={50}>
              <FruitJar selectedFruits={fruits} />
            </ResizablePanel>
            <ResizableHandle withHandle className="my-4" />
            <ResizablePanel defaultSize={50} maxSize={50} minSize={25}>
              <FruitGraph selectedFruits={fruits} />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
