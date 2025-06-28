import { memo } from "react";

import NutrientsPopover from "../NutrientsTable/NutrientsPopover";

import type { Fruit } from "@/app/types";

const columns = [
  { header: "Name", accessor: "name" },
  { header: "Family", accessor: "family" },
  { header: "Order", accessor: "order" },
  { header: "Genus", accessor: "genus" },
  {
    header: "Calories",
    accessor: (fruit: Fruit) => `${fruit.nutritions.calories}kcal`,
  },
];

const FruitTable = memo(({ fruits }: { fruits: Fruit[] }) => {
  return (
    <table className="w-full rounded-md bg-secondary border-collapse text-base">
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={col.header}
              className="px-4 border-b first:border-l-0 not-first:border-x last:border-r-0 py-2 text-left last:text-end font-bold w-[0%]"
            >
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {fruits.map((fruit, idx) => (
          <NutrientsPopover key={idx} fruit={fruit}>
            <tr className="odd:bg-background/50 hover:bg-background duration-300 transition-colors">
              {columns.map((col) => (
                <td
                  key={col.header}
                  className="border-b first:border-l-0 not-first:border-x last:border-r-0 px-4 py-2 text-left last:text-end w-[0%]"
                >
                  {typeof col.accessor === "string"
                    ? fruit[col.accessor as keyof Omit<Fruit, "nutritions">]
                    : col.accessor(fruit)}
                </td>
              ))}
            </tr>
          </NutrientsPopover>
        ))}
      </tbody>
    </table>
  );
});

FruitTable.displayName = "FruitTable";

export default FruitTable;
