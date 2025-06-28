import { GROUP_BY_OPTIONS } from "@/app/constants";

export interface FruitNutrition {
  calories: number;
  fat: number;
  sugar: number;
  carbohydrates: number;
  protein: number;
}

export interface Fruit {
  id: number;
  name: string;
  family: string;
  order: string;
  genus: string;
  nutritions: FruitNutrition;
}

export interface FruitWithCount extends Fruit {
  count: number;
}

export type View = "list" | "table";

export type GroupBy = (typeof GROUP_BY_OPTIONS)[number]["value"];

export interface SearchParams {
  view: View;
  groupBy: GroupBy;
}
