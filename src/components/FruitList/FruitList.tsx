"use client";

import { Fragment, memo, useMemo, useState, useCallback } from "react";

import FruitListFlat from "./FruitListFlat";
import { Button } from "../ui/button";

import { cn } from "@/utils/classNames";
import { groupFruits, sortGroupedFruits, formatItemCount } from "@/utils/fruit";

import type { Fruit, GroupBy } from "@/app/types";

interface FruitListProps {
  fruits: Fruit[];
  groupBy: GroupBy;
}

const FruitList = memo(({ fruits, groupBy }: FruitListProps) => {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const groupedFruit = useMemo(() => {
    return groupFruits(fruits, groupBy);
  }, [fruits, groupBy]);

  const groupEntries = useMemo(
    () => sortGroupedFruits(groupedFruit),
    [groupedFruit]
  );

  const rowClickHandler = useCallback((index: number) => {
    setSelectedRow((prev) => (prev === index ? null : index));
  }, []);

  const handleAddGroupClick = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    // TODO: Implement add group functionality
    console.log("Add group clicked");
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
              className={cn(
                "border-b cursor-pointer hover:bg-background transition-all focus-within:bg-background",
                {
                  "bg-background": selectedRow === index,
                }
              )}
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
              <>
                <tr>
                  <td className="text-center text-sm bg-background">
                    <Button
                      variant="link"
                      onClick={handleAddGroupClick}
                      aria-label="Add new item to this group"
                      className="w-full cursor-pointer"
                    >
                      Add Group
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td className="text-sm">
                    <FruitListFlat fruits={groupFruits} isNested />
                  </td>
                </tr>
              </>
            )}
          </Fragment>
        ))}
      </tbody>
    </table>
  );
});

FruitList.displayName = "FruitList";

export default FruitList;
