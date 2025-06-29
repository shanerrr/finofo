import { memo, useCallback } from "react";

import { Table, TableBody } from "../ui/table";

import FruitTableHeader from "./FruitTableHeader";
import FruitTableRow from "./FruitTableRow";

import type { Fruit } from "@/app/types";

type FruitTableProps = {
  fruits: Fruit[];
  onFruitAdd: (newFruit: Fruit) => void;
};

const FruitTableFlat = memo(({ fruits, onFruitAdd }: FruitTableProps) => {
  const handleFruitAdd = useCallback(
    (fruit: Fruit) => {
      onFruitAdd(fruit);
    },
    [onFruitAdd]
  );

  return (
    <Table>
      <FruitTableHeader />
      <TableBody>
        {fruits.map((fruit) => (
          <FruitTableRow
            key={fruit.id}
            fruit={fruit}
            onFruitAdd={handleFruitAdd}
          />
        ))}
      </TableBody>
    </Table>
  );
});

FruitTableFlat.displayName = "FruitTableFlat";

export default FruitTableFlat;
