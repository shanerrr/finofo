export const GROUP_BY_OPTIONS = [
  {
    label: "None",
    value: "none",
    hidden: true,
  },
  {
    label: "Family",
    value: "family",
    hidden: false,
  },
  {
    label: "Order",
    value: "order",
    hidden: false,
  },
  {
    label: "Genus",
    value: "genus",
    hidden: false,
  },
] as const;

export const NUTRIENT_UNITS: Record<string, string> = {
  calories: "kcal",
  fat: "g",
  sugar: "g",
  carbohydrates: "g",
  protein: "g",
};
