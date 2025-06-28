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

import { AppleIcon } from "lucide-react";

import { Fruit } from "@/app/types";
import { ScrollArea } from "../ui/scroll-area";

export default function FruitJar({
  selectedFruits,
}: {
  selectedFruits: Fruit[];
}) {
  return (
    <ScrollArea className="h-full">
      <Card>
        <CardHeader>
          <CardTitle className="font-semibold text-xl flex gap-2 items-center">
            <AppleIcon /> Fruit Jar
          </CardTitle>
          <CardDescription>All the current fruits in your jar!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fruit</TableHead>
                  <TableHead>Calories</TableHead>
                  <TableHead className="text-right">Count In Jar</TableHead>
                  <TableHead className="text-right">Calories</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedFruits.map((fruit, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{fruit.name}</TableCell>
                    <TableCell>{fruit.nutritions.calories}kcal</TableCell>
                    <TableCell className="text-right">4</TableCell>
                    <TableCell className="text-right">
                      {fruit.nutritions.calories}kcal
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total Calories</TableCell>
                  <TableCell className="text-right">$2,500.00</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </CardContent>
      </Card>
    </ScrollArea>
  );
}
