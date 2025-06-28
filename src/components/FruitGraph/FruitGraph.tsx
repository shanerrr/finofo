"use client";

import { useMemo, useCallback } from "react";
import { Pie, PieChart } from "recharts";

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
import { FruitWithCount } from "@/app/types";
import { generateDeterministicColour } from "@/utils/fruit";

type FruitGraphProps = {
  selectedFruits: FruitWithCount[];
};

export default function FruitGraph({ selectedFruits }: FruitGraphProps) {
  // Memoize color generation to avoid recalculating for the same fruit
  const getFruitColor = useCallback((fruitName: string) => {
    return generateDeterministicColour(fruitName);
  }, []);

  const { totalCalories, chartData, chartConfig, fruitCount } = useMemo(() => {
    if (selectedFruits.length === 0) {
      return {
        totalCalories: 0,
        chartData: [],
        chartConfig: { calories: { label: "Calories" } },
        fruitCount: 0,
      };
    }

    const chartData = selectedFruits.map((fruit) => {
      const color = getFruitColor(fruit.name);
      const calories = fruit.nutritions.calories * fruit.count;
      return {
        fruit: fruit.name,
        calories,
        fill: color,
        count: fruit.count,
      };
    });

    const totalCalories = chartData.reduce(
      (acc, item) => acc + item.calories,
      0
    );

    const fruitCount = selectedFruits.reduce(
      (acc, fruit) => acc + fruit.count,
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

    return { totalCalories, chartData, chartConfig, fruitCount };
  }, [selectedFruits, getFruitColor]);

  if (!selectedFruits.length) {
    return (
      <Card className="flex flex-col h-full justify-center items-center p-8">
        <div className="text-center space-y-2">
          <div className="text-4xl mb-4">📊</div>
          <p className="text-muted-foreground text-lg">
            Start by adding a fruit to your jar!
          </p>
          <p className="text-sm text-muted-foreground">
            Your fruit breakdown will appear here
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col h-full gap-0">
      <CardHeader className="items-center pb-2">
        <CardTitle className="text-center">
          Pie Chart of Your Fruit Jar
        </CardTitle>
        <CardDescription className="text-center">
          <div className="text-sm font-normal text-muted-foreground text-center">
            {totalCalories.toLocaleString()} calories • {fruitCount}{" "}
            {fruitCount === 1 ? "fruit" : "fruits"}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[280px] w-full"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="calories"
              nameKey="fruit"
              innerRadius="40%"
              outerRadius="80%"
              paddingAngle={2}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
