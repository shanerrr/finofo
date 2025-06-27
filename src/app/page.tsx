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

export default async function Home() {
  const fruits = await getFruits();

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
          defaultSize={25}
          minSize={25}
          maxSize={50}
        >
          <ScrollArea className="h-full">
            <FruitList fruits={fruits} />
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle withHandle className="mx-4" />
        <ResizablePanel className="h-full" defaultSize={75}>
          dasd
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
