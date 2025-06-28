import type { Fruit, GroupBy } from "@/app/types";

/**
 * Groups fruits by the specified property
 * @param fruits - Array of fruits to group
 * @param groupBy - Property to group by
 * @returns Record of grouped fruits
 */
export const groupFruits = (
  fruits: Fruit[],
  groupBy: GroupBy
): Record<string, Fruit[]> => {
  if (groupBy === "none") return {};

  return fruits.reduce((acc, fruit) => {
    const groupKey = fruit[groupBy];
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(fruit);
    return acc;
  }, {} as Record<string, Fruit[]>);
};

/**
 * Sorts grouped fruits by group name
 * @param groupedFruits - Object of grouped fruits
 * @returns Sorted entries
 */
export const sortGroupedFruits = (
  groupedFruits: Record<string, Fruit[]>
): [string, Fruit[]][] => {
  return Object.entries(groupedFruits).sort(([a], [b]) => a.localeCompare(b));
};

/**
 * Formats the item count text
 * @param count - Number of items
 * @returns Formatted string
 */
export const formatItemCount = (count: number): string => {
  return `${count} item${count !== 1 ? "s" : ""}`;
};
