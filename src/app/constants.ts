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
} as const;

export const VIEW_OPTIONS = {
  LIST: "list",
  TABLE: "table",
} as const;

export const DEFAULT_VIEW = VIEW_OPTIONS.LIST;
export const DEFAULT_GROUP_BY = "none";

export const API_CONFIG = {
  CACHE_DURATION: 1800, // 30 minutes in seconds
  DEFAULT_ORIGIN: "http://localhost:3000",
} as const;
