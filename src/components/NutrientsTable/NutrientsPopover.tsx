import { memo, ReactNode } from "react";
import { Fruit } from "@/app/types";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import NutrientsTable from "./NutrientsTable";

const NutrientsPopover = memo(
  ({ fruit, children }: { fruit: Fruit; children: ReactNode }) => {
    return (
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>{children}</HoverCardTrigger>
        <HoverCardContent
          align="center"
          side="right"
          asChild
          className="p-0"
          sticky="always"
        >
          <NutrientsTable name={fruit.name} nutritions={fruit.nutritions} />
        </HoverCardContent>
      </HoverCard>
    );
  }
);

NutrientsPopover.displayName = "NutrientsPopover";

export default NutrientsPopover;
