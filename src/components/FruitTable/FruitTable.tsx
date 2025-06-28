import { memo, useCallback } from "react";

import NutrientsPopover from "../NutrientsTable/NutrientsPopover";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Card, CardContent } from "../ui/card";

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

type FruitTableProps = {
  fruits: Fruit[];
  onFruitAdd: (newFruit: Fruit) => void;
};

const FruitTableRow = memo(
  ({
    fruit,
    columns,
    onFruitAdd,
  }: {
    fruit: Fruit;
    columns: Column[];
    onFruitAdd: (fruit: Fruit) => void;
  }) => {
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
  }
);

FruitTableRow.displayName = "FruitTableRow";

const FruitTable = memo(({ fruits, onFruitAdd }: FruitTableProps) => {
  const handleFruitAdd = useCallback(
    (fruit: Fruit) => {
      onFruitAdd(fruit);
    },
    [onFruitAdd]
  );

  return (
    <Card className="p-0">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead
                  key={col.header}
                  className="border-x last:border-r-0 first:border-l-0 last:text-end"
                >
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {fruits.map((fruit) => (
              <FruitTableRow
                key={fruit.id}
                fruit={fruit}
                columns={columns}
                onFruitAdd={handleFruitAdd}
              />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
});

FruitTable.displayName = "FruitTable";

export default FruitTable;
