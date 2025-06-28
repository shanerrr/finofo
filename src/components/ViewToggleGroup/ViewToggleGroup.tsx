"use client";

import { useSearchParams } from "next/navigation";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ListIcon, TableIcon } from "lucide-react";

import { View } from "@/app/types";

export default function ViewToggleGroup() {
  const searchParams = useSearchParams();

  //get param from url and defaults to list view.
  const view: View =
    searchParams.get("view")?.toLowerCase() === "table" ? "table" : "list";

  const handleUpdateView = (newView: View) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", newView);
    window.history.pushState(null, "", `?${params.toString()}`);
  };

  return (
    <ToggleGroup variant="outline" type="single" value={view}>
      <ToggleGroupItem
        value="list"
        className="cursor-pointer"
        onClick={() => handleUpdateView("list")}
      >
        <ListIcon />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="table"
        className="cursor-pointer"
        onClick={() => handleUpdateView("table")}
      >
        <TableIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
