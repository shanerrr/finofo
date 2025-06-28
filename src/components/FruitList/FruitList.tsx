"use client";

import { Fragment, memo, useMemo, useState, useCallback } from "react";

import FruitListFlat from "./FruitListFlat";

import type { Fruit, GroupBy } from "@/app/types";
import { groupFruits, sortGroupedFruits, formatItemCount } from "@/utils/fruit";

interface FruitListProps {
  fruits: Fruit[];
  groupBy: GroupBy;
}

const FruitList = memo(({ fruits, groupBy }: FruitListProps) => {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const groupedFruit = useMemo(() => {
    return groupFruits(fruits, groupBy);
  }, [fruits, groupBy]);

  const groupEntries = sortGroupedFruits(groupedFruit);

  const rowClickHandler = useCallback((index: number) => {
    setSelectedRow((prev) => (prev === index ? null : index));
  }, []);

  if (groupBy === "none") {
    return (
      <div className="text-base rounded-md overflow-hidden">
        <FruitListFlat fruits={fruits} />
      </div>
    );
  }

  // handle empty grouped results
  if (groupEntries.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No fruits available for grouping
      </div>
    );
  }

  return (
    <table
      className="w-full bg-secondary rounded-md"
      role="table"
      aria-label="Grouped fruits list"
    >
      <tbody>
        {groupEntries.map(([groupName, groupFruits], index) => (
          <Fragment key={groupName}>
            <tr
              className="border-b cursor-pointer hover:bg-background transition-all focus-within:bg-background"
              onClick={() => rowClickHandler(index)}
              role="button"
              aria-expanded={selectedRow === index}
              aria-label={`${groupName} group with ${groupFruits.length} items`}
            >
              <td className="px-4 py-2 text-left flex justify-between items-center">
                <span className="font-semibold">{groupName}</span>
                <span className="text-sm text-ring">
                  {formatItemCount(groupFruits.length)}
                </span>
              </td>
            </tr>
            {selectedRow === index && (
              <tr>
                <td className="text-sm">
                  <FruitListFlat fruits={groupFruits} isNested />
                </td>
              </tr>
            )}
          </Fragment>
        ))}
      </tbody>
    </table>
  );
});

FruitList.displayName = "FruitList";

export default FruitList;
