import { memo } from "react";
import { cn } from "@/utils/classNames";

import NutrientsPopover from "../NutrientsTable/NutrientsPopover";
import { Button } from "../ui/button";

import type { Fruit } from "@/app/types";
import { ChevronRightIcon } from "lucide-react";

interface FruitListFlatProps {
  fruits: Fruit[];
  isNested?: boolean;
}

const FruitListFlat = memo(
  ({ fruits, isNested = false }: FruitListFlatProps) => {
    if (!fruits.length) {
      return (
        <div className="text-center py-4 text-muted-foreground">
          No fruits found
        </div>
      );
    }

    return (
      <table
        className={cn("w-full bg-secondary border-collapse", {
          "border-ring border-y": isNested,
        })}
        role="table"
        aria-label="Fruits list"
      >
        <tbody>
          {fruits.map((fruit) => (
            <tr
              key={fruit.id}
              className="even:bg-sidebar transition-colors hover:bg-background border-y first:border-t-0 last:border-b-0"
            >
              <td className="text-left">
                <NutrientsPopover fruit={fruit}>
                  <div
                    className={cn(
                      "flex justify-between items-center gap-2 cursor-pointer py-2 px-4",
                      { "px-[15%]": isNested }
                    )}
                  >
                    <span className="font-medium">{fruit.name}</span>
                    <div className="text-sm text-ring flex items-center gap-2">
                      {fruit.nutritions.calories}kcal
                      <Button
                        variant="outline"
                        size="icon"
                        className="size-6 cursor-pointer"
                      >
                        <ChevronRightIcon />
                      </Button>
                    </div>
                  </div>
                </NutrientsPopover>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
);

FruitListFlat.displayName = "FruitListFlat";

export default FruitListFlat;
