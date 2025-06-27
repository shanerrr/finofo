import { memo } from "react";
import { Fruit, FruitNutrition } from "@/app/types";

const NutrientsTable = memo(
  ({
    name,
    nutritions,
  }: {
    name: Fruit["name"];
    nutritions: FruitNutrition;
  }) => {
    return (
      <div className="my-6 w-full overflow-y-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th colSpan={2} className="py-2 text-center font-black">
                {name}
              </th>
            </tr>
            <tr className="even:bg-muted border-t">
              <th className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                Macronutrients
              </th>
              <th className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(nutritions)
              .slice(1)
              .map((key) => (
                <tr key={key} className="even:bg-muted border-t">
                  <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right capitalize">
                    {key}
                  </td>
                  <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                    {nutritions[key as keyof FruitNutrition]}g
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
