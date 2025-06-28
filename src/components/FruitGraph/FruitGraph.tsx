"use client";

import { useMemo, useCallback } from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Fruit } from "@/app/types";
import { generateDeterministicColour } from "@/utils/fruit";

export default function FruitGraph({
  selectedFruits,
}: {
  selectedFruits: Fruit[];
}) {
  // memoize here so to avoid recalculating for the same fruit
  const getFruitColor = useCallback((fruitName: string) => {
    return generateDeterministicColour(fruitName);
  }, []);

  const { totalCalories, chartData, chartConfig } = useMemo(() => {
    if (selectedFruits.length === 0) {
      return {
        totalCalories: 0,
        chartData: [],
        chartConfig: { calories: { label: "Calories" } },
      };
    }

    const chartData = selectedFruits.map((fruit) => {
      const color = getFruitColor(fruit.name);
      return {
        fruit: fruit.name,
        calories: fruit.nutritions.calories,
        fill: color,
      };
    });

    const totalCalories = chartData.reduce(
      (acc, item) => acc + item.calories,
      0
    );

    const chartConfig: ChartConfig = {
      calories: { label: "Calories" },
      ...Object.fromEntries(
        selectedFruits.map((fruit) => [
          fruit.name.toLowerCase(),
          {
            label: fruit.name,
            color: getFruitColor(fruit.name),
          },
        ])
      ),
    };

    return { totalCalories, chartData, chartConfig };
  }, [selectedFruits, getFruitColor]);

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart of Your Fruit Jar ({totalCalories} Calories)</CardTitle>
        <CardDescription>Calories breakdown by fruit</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px] pb-0"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="calories" label nameKey="fruit" />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
