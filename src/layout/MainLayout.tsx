"use client";

import { useState, useCallback, useMemo } from "react";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";

import FruitList from "@/components/FruitList/FruitList";
import MenuBar from "@/components/MenuBar/MenuBar";
import FruitTable from "@/components/FruitTable/FruitTable";
import FruitJar from "@/components/FruitJar/FruitJar";
import FruitGraph from "@/components/FruitGraph/FruitGraph";

import { Fruit, FruitWithCount, GroupBy, View } from "@/app/types";
import {
  GROUP_BY_OPTIONS,
  VIEW_OPTIONS,
  DEFAULT_GROUP_BY,
} from "@/app/constants";

const allowedGroupBySet = new Set(GROUP_BY_OPTIONS.map((opt) => opt.value));
const validateGroupBy = (groupByParam: GroupBy): GroupBy => {
  return typeof groupByParam === "string" && allowedGroupBySet.has(groupByParam)
    ? groupByParam
    : DEFAULT_GROUP_BY;
};

type MainLayoutProps = {
  fruits: Fruit[];
  viewParam: View;
  groupByParam: GroupBy;
};

export default function MainLayout({
  fruits,
  viewParam,
  groupByParam,
}: MainLayoutProps) {
  const [view, setView] = useState(viewParam);
  const [groupBy, setGroupBy] = useState(() => validateGroupBy(groupByParam));
  const [selectedFruits, setSelectedFruits] = useState<FruitWithCount[]>([]);

  const isTableView = useMemo(() => view === VIEW_OPTIONS.TABLE, [view]);

  const onFruitAdd = useCallback(
    (newFruit: Fruit) =>
      setSelectedFruits((prev) => {
        const existingIndex = prev.findIndex((f) => f.id === newFruit.id);

        if (existingIndex >= 0) {
          const updated = [...prev];
          const existingFruit = updated[existingIndex];
          if (existingFruit) {
            updated[existingIndex] = {
              ...existingFruit,
              count: (existingFruit.count || 1) + 1,
            };
          }
          return updated;
        } else {
          return [...prev, { ...newFruit, count: 1 }];
        }
      }),
    []
  );

  const onFruitGroupAdd = useCallback(
    (newFruits: Fruit[]) =>
      setSelectedFruits((prev) => {
        const updated = [...prev];

        newFruits.forEach((newFruit) => {
          const existingIndex = updated.findIndex((f) => f.id === newFruit.id);

          if (existingIndex >= 0) {
            const existingFruit = updated[existingIndex];
            if (existingFruit) {
              updated[existingIndex] = {
                ...existingFruit,
                count: (existingFruit.count || 1) + 1,
              };
            }
          } else {
            updated.push({ ...newFruit, count: 1 });
          }
        });

        return updated;
      }),
    []
  );

  const handleViewChange = useCallback((newView: View) => {
    setView(newView);
  }, []);

  const handleGroupByChange = useCallback((newGroupBy: GroupBy) => {
    setGroupBy(newGroupBy);
  }, []);

  return (
    <main className="container mx-auto h-screen flex flex-col gap-4 py-8">
      <header className="w-max">
        <MenuBar
          view={view}
          groupBy={groupBy}
          setNewView={handleViewChange}
          setNewGroup={handleGroupByChange}
        />
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
              <FruitTable 
                fruits={fruits} 
                groupBy={groupBy}
                onFruitAdd={onFruitAdd} 
                onFruitGroupAdd={onFruitGroupAdd}
              />
            ) : (
              <FruitList
                fruits={fruits}
                groupBy={groupBy}
                onFruitAdd={onFruitAdd}
                onFruitGroupAdd={onFruitGroupAdd}
              />
            )}
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle withHandle className="mx-4 -z-10" />
        <ResizablePanel className="h-full" defaultSize={isTableView ? 40 : 75}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={50} maxSize={75} minSize={50}>
              <FruitJar selectedFruits={selectedFruits} />
            </ResizablePanel>
            <ResizableHandle withHandle className="my-4" />
            <ResizablePanel defaultSize={50} maxSize={50} minSize={25}>
              <FruitGraph selectedFruits={selectedFruits} />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
