"use client";

import { useSearchParams } from "next/navigation";

import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
  MenubarCheckboxItem,
} from "@/components/ui/menubar";

import { GROUP_BY_OPTIONS } from "@/app/constants";
import { GroupBy, View } from "@/app/types";

type MenuBarProps = {
  view: View;
  groupBy: GroupBy;
  setNewView: (view: View) => void;
  setNewGroup: (group: GroupBy) => void;
};

export default function MenuBar({
  view = "list",
  groupBy = "none",
  setNewView,
  setNewGroup,
}: MenuBarProps) {
  const searchParams = useSearchParams();

  const isTableView = view.toLowerCase() === "table";

  const handleUpdateGroup = (newGroup: GroupBy) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("groupBy", newGroup);
    window.history.pushState(null, "", `?${params.toString()}`);
    setNewGroup(newGroup);
  };

  const handleUpdateView = (newView: View) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", newView);
    window.history.pushState(null, "", `?${params.toString()}`);
    setNewView(newView);
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
                checked={groupBy === option.value}
                onClick={() => handleUpdateGroup(option.value)}
              >
                Group by {option.label}
              </MenubarCheckboxItem>
            ))}
            <MenubarSeparator />
            <MenubarCheckboxItem
              disabled={isTableView}
              checked={groupBy === "none"}
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
