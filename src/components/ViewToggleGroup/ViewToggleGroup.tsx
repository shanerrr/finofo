import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ListIcon, TableIcon } from "lucide-react";

export default function ViewToggleGroup() {
  return (
    <ToggleGroup variant="outline" type="single" defaultValue="list-view">
      <ToggleGroupItem value="list-view">
        <ListIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="table-view">
        <TableIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
