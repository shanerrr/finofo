import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
// import { NutrientsTable } from "../NutrientsTable/NutrientsTable";
import { Fruit } from "@/app/types";

export default function FruitTable({ fruits }: { fruits: Fruit[] }) {
  return (
    <table className="w-full bg-secondary rounded-md">
      <tbody>
        {fruits.map((fruit) => (
          <tr key={fruit.id} className="border-b">
            <td className="p-4 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              <HoverCard openDelay={200}>
                <HoverCardTrigger asChild>
                  <div className="w-max hover:text-sidebar-ring duration-300 transition-colors">
                    {fruit.name} ({fruit.nutritions.calories} kcal)
                  </div>
                </HoverCardTrigger>
                <HoverCardContent
                  align="center"
                  side="left"
                  asChild
                  className="p-0"
                  sticky="always"
                >
                  {/* <NutrientsTable
                    name={fruit.name}
                    nutritions={fruit.nutritions}
                  /> */}
                </HoverCardContent>
              </HoverCard>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
