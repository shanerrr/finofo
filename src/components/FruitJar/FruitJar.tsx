import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { FruitWithCount } from "@/app/types";
import { ScrollArea } from "../ui/scroll-area";
import { useMemo, useRef, useEffect, useCallback } from "react";

type FruitJarProps = {
  selectedFruits: FruitWithCount[];
};

export default function FruitJar({ selectedFruits }: FruitJarProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const previousFruitsLength = useRef(selectedFruits.length);

  const totalCalories = useMemo(() => {
    return selectedFruits.reduce(
      (acc, item) => acc + item.nutritions.calories * item.count,
      0
    );
  }, [selectedFruits]);

  const scrollToBottom = useCallback(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollElement) {
        scrollElement.scrollTo({
          top: scrollElement.scrollHeight,
          behavior: "smooth",
        });
      }
    }
  }, []);

  // Only scroll when fruits are added (not removed)
  useEffect(() => {
    if (selectedFruits.length > previousFruitsLength.current) {
      scrollToBottom();
    }
    previousFruitsLength.current = selectedFruits.length;
  }, [selectedFruits.length, scrollToBottom]);

  if (!selectedFruits.length) {
    return (
      <Card className="flex flex-col h-full justify-center items-center p-8">
        <div className="text-center space-y-2">
          <div className="text-4xl mb-4">🍎</div>
          <p className="text-muted-foreground text-lg">
            Start by adding a fruit to your jar!
          </p>
          <p className="text-sm text-muted-foreground">
            Select fruits from the list to see them here
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="h-full bg-card text-card-foreground flex flex-col gap-6 rounded-xl border shadow-sm overflow-hidden">
      <ScrollArea ref={scrollAreaRef} className="h-full">
        <Card className="h-full border-0">
          <CardHeader>
            <CardTitle className="font-semibold text-xl flex gap-2 items-center">
              Your Fruit Jar
              <span className="text-sm font-normal text-muted-foreground">
                ({selectedFruits.length}{" "}
                {selectedFruits.length === 1 ? "fruit" : "unique fruits"})
              </span>
            </CardTitle>
            <CardDescription>
              All the current fruits in your jar!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="border-r w-[40%]">Fruit</TableHead>
                    <TableHead className="border-r text-center w-[30%]">
                      Count × Calories
                    </TableHead>
                    <TableHead className="text-right w-[30%]">
                      Total Calories
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedFruits.map((fruit) => (
                    <TableRow key={fruit.id}>
                      <TableCell className="font-medium border-r w-[0%]">
                        {fruit.name}
                      </TableCell>
                      <TableCell className="border-r text-center w-[0%]">
                        {fruit.count} × {fruit.nutritions.calories} kcal
                      </TableCell>
                      <TableCell className="text-right font-medium w-[0%]">
                        {(
                          fruit.count * fruit.nutritions.calories
                        ).toLocaleString()}
                        kcal
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={2} className="font-semibold">
                      Total Jar Calories
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {totalCalories.toLocaleString()}kcal
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          </CardContent>
        </Card>
      </ScrollArea>
    </div>
  );
}
