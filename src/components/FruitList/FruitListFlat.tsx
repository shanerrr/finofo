import { memo, useCallback } from "react";
import { cn } from "@/utils/classNames";

import NutrientsPopover from "../NutrientsTable/NutrientsPopover";

import { Table, TableBody, TableCell, TableRow } from "../ui/table";

import type { Fruit } from "@/app/types";

type FruitListFlatProps = {
  fruits: Fruit[];
  isNested?: boolean;
  onFruitAdd: (newFruit: Fruit) => void;
};

const FruitRow = memo(
  ({
    fruit,
    isNested,
    onFruitAdd,
  }: {
    fruit: Fruit;
    isNested: boolean;
    onFruitAdd: (fruit: Fruit) => void;
  }) => {
    const handleClick = useCallback(() => {
      onFruitAdd(fruit);
    }, [fruit, onFruitAdd]);

    return (
      <TableRow
        className={cn(
          "cursor-pointer",
          isNested ? "bg-background" : "odd:bg-background/50"
        )}
      >
        <TableCell className="text-left " onClick={handleClick}>
          <NutrientsPopover fruit={fruit}>
            <div className="flex justify-between items-center gap-2 cursor-pointer">
              <span className="font-semibold">{fruit.name}</span>
              <div className="text-sm text-ring flex items-center gap-2">
                {fruit.nutritions.calories}kcal
              </div>
            </div>
          </NutrientsPopover>
        </TableCell>
      </TableRow>
    );
  }
);

FruitRow.displayName = "FruitRow";

const FruitListFlat = memo(
  ({ fruits, isNested = false, onFruitAdd }: FruitListFlatProps) => {
    const handleFruitAdd = useCallback(
      (fruit: Fruit) => {
        onFruitAdd(fruit);
      },
      [onFruitAdd]
    );

    if (!fruits.length) {
      return (
        <div className="text-center py-4 text-muted-foreground">
          No fruits found
        </div>
      );
    }

    return (
      <Table role="table" aria-label="Fruits list">
        <TableBody>
          {fruits.map((fruit) => (
            <FruitRow
              key={fruit.id}
              fruit={fruit}
              isNested={isNested}
              onFruitAdd={handleFruitAdd}
            />
          ))}
        </TableBody>
      </Table>
    );
  }
);

FruitListFlat.displayName = "FruitListFlat";

export default FruitListFlat;
