export const GROUP_BY_OPTIONS = [
  {
    label: "Family",
    value: "family",
  },
  {
    label: "Order",
    value: "order",
  },
  {
    label: "Genus",
    value: "genus",
  },
] as const;

export const NUTRIENT_UNITS: Record<string, string> = {
  calories: "kcal",
  fat: "g",
  sugar: "g",
  carbohydrates: "g",
  protein: "g",
};
