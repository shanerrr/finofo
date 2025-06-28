"use client";

import { useSearchParams } from "next/navigation";
// import { useMemo } from "react";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";

import { GROUP_BY_OPTIONS } from "@/app/constants";
import { GroupBy } from "@/app/types";

export default function MenuBar() {
  const searchParams = useSearchParams();
  // const groupByParam = searchParams.get("groupBy")?.toLowerCase();

  // disabling grouping when in table view.
  const isTableView = searchParams.get("view")?.toLowerCase() === "table";

  // const allowedGroupBySet: Set<GroupBy> = useMemo(
  //   () => new Set(GROUP_BY_OPTIONS.map((opt) => opt.value)),
  //   []
  // );

  // const groupBy: GroupBy =
  //   typeof groupByParam === "string" &&
  //   allowedGroupBySet.has(groupByParam as GroupBy)
  //     ? (groupByParam as GroupBy)
  //     : "none";

  const handleUpdateGroup = (newGroup: GroupBy) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("groupBy", newGroup);
    window.history.pushState(null, "", `?${params.toString()}`);
  };

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Fruits</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Add New Fruit</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger disabled={isTableView} className="disabled:opacity-10">
          Group
        </MenubarTrigger>
        <MenubarContent>
          <MenubarSub>
            <MenubarSubTrigger>Group</MenubarSubTrigger>
            <MenubarSubContent>
              {GROUP_BY_OPTIONS.map((option) => (
                <MenubarItem
                  key={option.value}
                  onClick={() => handleUpdateGroup(option.value)}
                >
                  Group by {option.label}
                </MenubarItem>
              ))}
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem onClick={() => handleUpdateGroup("none")}>
            Clear Grouping
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
