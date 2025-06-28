import { memo, useCallback } from "react";

import { Fruit, FruitNutrition } from "@/app/types";

import { NUTRIENT_UNITS } from "@/app/constants";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Card, CardContent } from "../ui/card";

// Extract nutrient entries for better performance
const getNutrientEntries = (nutritions: FruitNutrition) => {
  return Object.entries(nutritions).filter(
    ([key]) => key !== "id" && key !== "name"
  );
};

const NutrientRow = memo(
  ({ nutrientKey, value }: { nutrientKey: string; value: number }) => {
    const unit = NUTRIENT_UNITS[nutrientKey] || "";

    return (
      <TableRow>
        <TableCell className="border-r capitalize">{nutrientKey}</TableCell>
        <TableCell className="text-right">
          {value}
          {unit}
        </TableCell>
      </TableRow>
    );
  }
);

NutrientRow.displayName = "NutrientRow";

const NutrientsTable = memo(
  ({
    name,
    nutritions,
  }: {
    name: Fruit["name"];
    nutritions: FruitNutrition;
  }) => {
    const nutrientEntries = useCallback(
      () => getNutrientEntries(nutritions),
      [nutritions]
    );

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead colSpan={2} className="text-center font-black">
              {name}
            </TableHead>
          </TableRow>
          <TableRow>
            <TableHead className="border-r font-semibold" scope="col">
              Macronutrients
            </TableHead>
            <TableHead className="text-right font-semibold" scope="col">
              Amount
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {nutrientEntries().map(([key, value]) => (
            <NutrientRow key={key} nutrientKey={key} value={value} />
          ))}
        </TableBody>
      </Table>
    );
  }
);

NutrientsTable.displayName = "NutrientsTable";

export default NutrientsTable;
