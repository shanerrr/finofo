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

import { GROUP_BY_OPTIONS, VIEW_OPTIONS } from "@/app/constants";
import { GroupBy, View } from "@/app/types";

type MenuBarProps = {
  view: View;
  groupBy: GroupBy;
  setNewView: (view: View) => void;
  setNewGroup: (group: GroupBy) => void;
};

export default function MenuBar({
  view = VIEW_OPTIONS.LIST,
  groupBy = "none",
  setNewView,
  setNewGroup,
}: MenuBarProps) {
  const searchParams = useSearchParams();

  const isTableView = view === VIEW_OPTIONS.TABLE;

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
        <MenubarTrigger aria-label="View options">View</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem
            checked={!isTableView}
            onClick={() => handleUpdateView(VIEW_OPTIONS.LIST)}
            aria-label="Switch to list view"
          >
            List View
          </MenubarCheckboxItem>
          <MenubarCheckboxItem
            checked={isTableView}
            onClick={() => handleUpdateView(VIEW_OPTIONS.TABLE)}
            aria-label="Switch to table view"
          >
            Table View
          </MenubarCheckboxItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Grouping</MenubarTrigger>
        <MenubarContent>
          <>
            {GROUP_BY_OPTIONS.map((option) => (
              <MenubarCheckboxItem
                hidden={option.hidden}
                key={option.value}
                checked={groupBy === option.value}
                onClick={() => handleUpdateGroup(option.value)}
                aria-label={`Group by ${option.label.toLowerCase()}`}
              >
                Group by {option.label}
              </MenubarCheckboxItem>
            ))}
            <MenubarSeparator />
            <MenubarCheckboxItem
              checked={groupBy === "none"}
              onClick={() => handleUpdateGroup("none")}
              aria-label="No grouping"
            >
              No Grouping
            </MenubarCheckboxItem>
          </>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
