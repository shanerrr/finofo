import type { Fruit, GroupBy } from "@/app/types";
import { DEFAULT_GROUP_BY } from "@/app/constants";

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
  if (groupBy === DEFAULT_GROUP_BY) return {};

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

/**
 * Generates a deterministic colour based on a string input
 * @param str - String to generate color from
 * @param format - rgb or hex
 * @returns a hex or rgb colour property
 */
export const generateDeterministicColour = (str: string): string => {
  let hash = 2;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }

  const r = Math.abs(hash) % 256;
  const g = Math.abs(hash >> 8) % 256;
  const b = Math.abs(hash >> 16) % 256;

  return `rgb(${r}, ${g}, ${b})`;
};
