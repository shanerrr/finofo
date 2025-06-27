import { memo } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

import { InfoIcon } from "lucide-react";

import NutrientsTable from "../NutrientsTable/NutrientsTable";
import type { Fruit } from "@/app/types";

const FruitList = memo(({ fruits }: { fruits: Fruit[] }) => {
  return (
    <table className="w-full bg-secondary rounded-md text-lg">
      <tbody>
        {fruits.map((fruit) => (
          <tr key={fruit.id} className="border-b">
            <td className="p-4 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              <HoverCard openDelay={200}>
                <HoverCardTrigger asChild>
                  <div className="hover:text-sidebar-ring duration-300 transition-colors flex justify-between items-center gap-2">
                    {fruit.name} ({fruit.nutritions.calories} kcal)
                    <InfoIcon />
                  </div>
                </HoverCardTrigger>
                <HoverCardContent
                  align="center"
                  side="left"
                  asChild
                  className="p-0"
                  sticky="always"
                >
                  <NutrientsTable
                    name={fruit.name}
                    nutritions={fruit.nutritions}
                  />
                </HoverCardContent>
              </HoverCard>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});

FruitList.displayName = "FruitList";

export default FruitList;
