import { Fragment, memo, useCallback, useMemo, useState } from "react";

import FruitTableFlat from "./FruitTableFlat";

import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";

import { DEFAULT_GROUP_BY } from "@/app/constants";
import { cn } from "@/utils/classNames";
import { groupFruits, sortGroupedFruits, formatItemCount } from "@/utils/fruit";

import type { Fruit, GroupBy } from "@/app/types";

type FruitTableProps = {
  fruits: Fruit[];
  groupBy: GroupBy;
  onFruitAdd: (newFruit: Fruit) => void;
  onFruitGroupAdd: (newFruits: Fruit[]) => void;
};

const GroupHeaderRow = memo(
  ({
    groupName,
    groupFruits,
    index,
    isSelected,
    onRowClick,
    onGroupAdd,
    onFruitAdd,
  }: {
    groupName: string;
    groupFruits: Fruit[];
    index: number;
    isSelected: boolean;
    onRowClick: (index: number) => void;
    onGroupAdd: (fruits: Fruit[]) => void;
    onFruitAdd: (fruit: Fruit) => void;
  }) => {
    const handleRowClick = useCallback(() => {
      onRowClick(index);
    }, [onRowClick, index]);

    const handleGroupAdd = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        onGroupAdd(groupFruits);
      },
      [onGroupAdd, groupFruits]
    );

    return (
      <Fragment>
        <TableRow
          className={cn(
            "border-b cursor-pointer hover:bg-background transition-all focus-within:bg-background",
            {
              "bg-background": isSelected,
            }
          )}
          onClick={handleRowClick}
          role="button"
          aria-expanded={isSelected}
          aria-label={`${groupName} group with ${groupFruits.length} items`}
        >
          <TableCell className="text-left flex justify-between items-center">
            <span className="font-semibold">{groupName}</span>
            <span className="text-sm text-ring">
              {formatItemCount(groupFruits.length)}
            </span>
          </TableCell>
        </TableRow>

        {isSelected && (
          <>
            <TableRow>
              <TableCell className="text-center text-sm bg-background p-0">
                <Button
                  variant="link"
                  aria-label={`Add all ${groupFruits.length} items from ${groupName} group`}
                  className="w-full cursor-pointer"
                  onClick={handleGroupAdd}
                >
                  Add Group
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-sm p-0">
                <FruitTableFlat fruits={groupFruits} onFruitAdd={onFruitAdd} />
              </TableCell>
            </TableRow>
          </>
        )}
      </Fragment>
    );
  }
);

GroupHeaderRow.displayName = "GroupHeaderRow";

const FruitTable = memo(
  ({ fruits, groupBy, onFruitAdd, onFruitGroupAdd }: FruitTableProps) => {
    const [selectedRow, setSelectedRow] = useState<number | null>(null);

    const groupEntries = useMemo(() => {
      const grouped = groupFruits(fruits, groupBy);
      return sortGroupedFruits(grouped);
    }, [fruits, groupBy]);

    // Memoize callback functions
    const rowClickHandler = useCallback((index: number) => {
      setSelectedRow((prev) => (prev === index ? null : index));
    }, []);

    const handleGroupAdd = useCallback(
      (groupFruits: Fruit[]) => {
        onFruitGroupAdd(groupFruits);
      },
      [onFruitGroupAdd]
    );

    const handleFruitAdd = useCallback(
      (fruit: Fruit) => {
        onFruitAdd(fruit);
      },
      [onFruitAdd]
    );

    // If no grouping, render flat table
    if (groupBy === DEFAULT_GROUP_BY) {
      return (
        <Card className="p-0">
          <CardContent className="p-0">
            <FruitTableFlat fruits={fruits} onFruitAdd={onFruitAdd} />
          </CardContent>
        </Card>
      );
    }

    // If no groups available
    if (groupEntries.length === 0) {
      return (
        <div className="text-center py-8 text-muted-foreground">
          No fruits available for grouping
        </div>
      );
    }

    return (
      <Card className="p-0">
        <CardContent className="p-0">
          <Table>
            <TableBody>
              {groupEntries.map(([groupName, groupFruits], index) => (
                <GroupHeaderRow
                  key={groupName}
                  groupName={groupName}
                  groupFruits={groupFruits}
                  index={index}
                  isSelected={selectedRow === index}
                  onRowClick={rowClickHandler}
                  onGroupAdd={handleGroupAdd}
                  onFruitAdd={handleFruitAdd}
                />
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }
);

FruitTable.displayName = "FruitTable";

export default FruitTable;
