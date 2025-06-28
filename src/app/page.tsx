import FruitList from "@/components/FruitList/FruitList";
import ViewToggleGroup from "@/components/ViewToggleGroup/ViewToggleGroup";
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

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { view, groupBy = "none" } = await searchParams;

  const fruits = await getFruits();

  const isTableView = view === "table";

  //todo layout cookies

  return (
    <main className="container mx-auto h-screen flex flex-col gap-4 py-8">
      <header>
        <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
          I ❤️ Fruits!
        </h1>
        <p className="text-center text-sm text-muted-foreground">by Shane</p>
      </header>
      <section className="flex gap-4">
        <ViewToggleGroup />
        <MenuBar />
      </section>
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
          <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
            Fruit Jar
          </h1>
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
