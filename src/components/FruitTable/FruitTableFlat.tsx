import { memo } from "react";

import { Table, TableBody, TableCell, TableRow } from "../ui/table";

import NutrientsPopover from "../NutrientsTable/NutrientsPopover";
import FruitTableHeader from "./FruitTableHeader";

import { getColumnValue } from "@/utils/fruit";
import { columns } from "@/app/constants";
import type { Fruit } from "@/app/types";
import { cn } from "@/utils/classNames";

type FruitTableProps = {
  fruits: Fruit[];
  onFruitAdd: (newFruit: Fruit) => void;
  isNested?: boolean;
};

const FruitTableFlat = memo(
  ({ fruits, onFruitAdd, isNested = false }: FruitTableProps) => {
    return (
      <Table>
        <FruitTableHeader />
        <TableBody>
          {fruits.map((fruit) => (
            <NutrientsPopover key={fruit.id} fruit={fruit}>
              <TableRow
                className={cn(
                  "cursor-pointer",
                  isNested ? "bg-background" : "odd:bg-background/50"
                )}
                onClick={() => onFruitAdd(fruit)}
              >
                {columns.map((col) => (
                  <TableCell
                    key={col.header}
                    className="w-[0%] last:text-right border-x last:border-r-0 first:border-l-0"
                  >
                    {getColumnValue(fruit, col.accessor)}
                  </TableCell>
                ))}
              </TableRow>
            </NutrientsPopover>
          ))}
        </TableBody>
      </Table>
    );
  }
);

FruitTableFlat.displayName = "FruitTableFlat";

export default FruitTableFlat;
