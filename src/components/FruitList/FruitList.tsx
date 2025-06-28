"use client";

import { Fragment, memo, useMemo, useState, useCallback } from "react";

import FruitListFlat from "./FruitListFlat";
import { Button } from "../ui/button";

import { cn } from "@/utils/classNames";
import { groupFruits, sortGroupedFruits, formatItemCount } from "@/utils/fruit";

import type { Fruit, GroupBy } from "@/app/types";
import { DEFAULT_GROUP_BY } from "@/app/constants";
import { Card, CardContent } from "../ui/card";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";

type FruitListProps = {
  fruits: Fruit[];
  groupBy: GroupBy;
  onFruitAdd: (newFruit: Fruit) => void;
  onFruitGroupAdd: (newFruits: Fruit[]) => void;
};

const GroupRow = memo(
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

    const handleGroupAdd = useCallback(() => {
      onGroupAdd(groupFruits);
    }, [onGroupAdd, groupFruits]);

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
                <FruitListFlat
                  fruits={groupFruits}
                  onFruitAdd={onFruitAdd}
                  isNested
                />
              </TableCell>
            </TableRow>
          </>
        )}
      </Fragment>
    );
  }
);

GroupRow.displayName = "GroupRow";

const FruitList = memo(
  ({ fruits, groupBy, onFruitAdd, onFruitGroupAdd }: FruitListProps) => {
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

    const handleGroupAdd = useCallback(
      (groupFruits: Fruit[]) => {
        onFruitGroupAdd(groupFruits);
      },
      [onFruitGroupAdd]
    );

    if (groupBy === DEFAULT_GROUP_BY) {
      return (
        <Card className="p-0">
          <CardContent className="p-0">
            <FruitListFlat fruits={fruits} onFruitAdd={onFruitAdd} />
          </CardContent>
        </Card>
      );
    }

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
          <Table
            className="w-full rounded-md"
            role="table"
            aria-label="Grouped fruits list"
          >
            <TableBody>
              {groupEntries.map(([groupName, groupFruits], index) => (
                <GroupRow
                  key={groupName}
                  groupName={groupName}
                  groupFruits={groupFruits}
                  index={index}
                  isSelected={selectedRow === index}
                  onRowClick={rowClickHandler}
                  onGroupAdd={handleGroupAdd}
                  onFruitAdd={onFruitAdd}
                />
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }
);

FruitList.displayName = "FruitList";

export default FruitList;
