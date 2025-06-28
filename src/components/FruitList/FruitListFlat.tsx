import { memo } from "react";
import { cn } from "@/utils/classNames";

import NutrientsPopover from "../NutrientsTable/NutrientsPopover";

import type { Fruit } from "@/app/types";

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
          "border-ring border-y-2": isNested,
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
                      { "px-8": isNested }
                    )}
                  >
                    <span className="font-medium">{fruit.name}</span>
                    <span className="text-sm text-ring">
                      ({fruit.nutritions.calories}kcal)
                    </span>
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
