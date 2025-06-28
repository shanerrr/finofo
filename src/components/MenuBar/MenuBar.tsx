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
  MenubarCheckboxItem,
} from "@/components/ui/menubar";

import { GROUP_BY_OPTIONS } from "@/app/constants";
import { GroupBy, View } from "@/app/types";

export default function MenuBar() {
  const searchParams = useSearchParams();
  const groupByParam = searchParams.get("groupBy")?.toLowerCase();

  //get param from url and defaults to list view.
  const view: View =
    searchParams.get("view")?.toLowerCase() === "table" ? "table" : "list";

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

  const handleUpdateView = (newView: View) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", newView);
    window.history.pushState(null, "", `?${params.toString()}`);
  };

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem
            checked={!isTableView}
            onClick={() => handleUpdateView("list")}
          >
            List View
          </MenubarCheckboxItem>
          <MenubarCheckboxItem
            checked={isTableView}
            onClick={() => handleUpdateView("table")}
          >
            Table View
          </MenubarCheckboxItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="disabled:opacity-10">
          Grouping
        </MenubarTrigger>
        <MenubarContent>
          <>
            {GROUP_BY_OPTIONS.map((option) => (
              <MenubarCheckboxItem
                disabled={isTableView}
                key={option.value}
                checked={groupByParam === option.value}
                onClick={() => handleUpdateGroup(option.value)}
              >
                Group by {option.label}
              </MenubarCheckboxItem>
            ))}
            <MenubarSeparator />
            <MenubarCheckboxItem
              disabled={isTableView}
              checked={groupByParam === "none"}
              onClick={() => handleUpdateGroup("none")}
            >
              No Grouping
            </MenubarCheckboxItem>
          </>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
