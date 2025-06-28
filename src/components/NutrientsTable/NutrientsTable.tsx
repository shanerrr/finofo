import { memo } from "react";

import { Fruit, FruitNutrition } from "@/app/types";

import { NUTRIENT_UNITS } from "@/app/constants";

const NutrientsTable = memo(
  ({
    name,
    nutritions,
  }: {
    name: Fruit["name"];
    nutritions: FruitNutrition;
  }) => {
    return (
      <div className="w-full">
        <table className="w-full bg-sidebar rounded-md border-collapse">
          <caption className="sr-only">{name} Nutrition Table</caption>
          <thead>
            <tr>
              <th colSpan={2} className="py-2 text-center font-black">
                {name}
              </th>
            </tr>
            <tr className="even:bg-muted border-t">
              <th scope="col" className="border px-4 py-2 text-left">
                Macronutrients
              </th>
              <th scope="col" className="border px-4 py-2 text-left">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(nutritions)
              .filter(([key]) => key !== "id" && key !== "name")
              .map(([key, value]) => (
                <tr
                  key={key}
                  className="even:bg-muted border-y first:border-t-0 last:border-b-0"
                >
                  <td className="px-4 py-2 text-left capitalize">{key}</td>
                  <td className="px-4 py-2 text-left">
                    {value}
                    {NUTRIENT_UNITS[key] || ""}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
);

NutrientsTable.displayName = "NutrientsTable";

export default NutrientsTable;
