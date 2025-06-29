import { memo, useCallback } from "react";

import NutrientsPopover from "../NutrientsTable/NutrientsPopover";
import { TableCell, TableRow } from "../ui/table";

import type { Fruit } from "@/app/types";

type Column = {
  header: string;
  accessor: keyof Omit<Fruit, "nutritions"> | ((fruit: Fruit) => string);
};

const columns: Column[] = [
  { header: "Name", accessor: "name" },
  { header: "Family", accessor: "family" },
  { header: "Order", accessor: "order" },
  { header: "Genus", accessor: "genus" },
  {
    header: "Calories",
    accessor: (fruit: Fruit) => `${fruit.nutritions.calories}kcal`,
  },
] as const;

type FruitTableRowProps = {
  fruit: Fruit;
  onFruitAdd: (fruit: Fruit) => void;
};

const FruitTableRow = memo(({ fruit, onFruitAdd }: FruitTableRowProps) => {
  const handleClick = useCallback(() => {
    onFruitAdd(fruit);
  }, [fruit, onFruitAdd]);

  return (
    <NutrientsPopover fruit={fruit}>
      <TableRow
        className="odd:bg-background/50 hover:bg-background duration-300 transition-colors cursor-pointer"
        onClick={handleClick}
      >
        {columns.map((col) => (
          <TableCell
            key={col.header}
            className="w-[0%] last:text-right border-x last:border-r-0 first:border-l-0"
          >
            {typeof col.accessor === "string"
              ? fruit[col.accessor as keyof Omit<Fruit, "nutritions">]
              : col.accessor(fruit)}
          </TableCell>
        ))}
      </TableRow>
    </NutrientsPopover>
  );
});

FruitTableRow.displayName = "FruitTableRow";

export default FruitTableRow;
