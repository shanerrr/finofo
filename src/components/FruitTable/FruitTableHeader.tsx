import { memo } from "react";

import { TableHead, TableHeader, TableRow } from "../ui/table";

import { columns } from "@/app/constants";

const FruitTableHeader = memo(() => {
  return (
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
  );
});

FruitTableHeader.displayName = "FruitTableHeader";

export default FruitTableHeader;
