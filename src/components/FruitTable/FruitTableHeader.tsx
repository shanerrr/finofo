import { memo } from "react";

import {
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import type { Fruit } from "@/app/types";

export type Column = {
  header: string;
  accessor: keyof Omit<Fruit, "nutritions"> | ((fruit: Fruit) => string);
};

export const columns: Column[] = [
  { header: "Name", accessor: "name" },
  { header: "Family", accessor: "family" },
  { header: "Order", accessor: "order" },
  { header: "Genus", accessor: "genus" },
  {
    header: "Calories",
    accessor: (fruit: Fruit) => `${fruit.nutritions.calories}kcal`,
  },
] as const;

type FruitTableHeaderProps = {
  columns?: Column[];
};

const FruitTableHeader = memo(({ columns: customColumns }: FruitTableHeaderProps) => {
  const headerColumns = customColumns || columns;

  return (
    <TableHeader>
      <TableRow>
        {headerColumns.map((col) => (
          <TableHead
            key={col.header}
            className="border-x last:border-r-0 first:border-l-0 last:text-end"
          >
            {col.header}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
});

FruitTableHeader.displayName = "FruitTableHeader";

export default FruitTableHeader; 