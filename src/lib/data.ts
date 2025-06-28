import "server-only";

import { Fruit } from "@/app/types";

/**
 * API call for finofo takehome API
 * @returns Promise<Fruit[]> - Array of fruits
 */
export const getFruits = async (): Promise<Fruit[]> => {
  const response = await fetch(`${process.env.BASE_API_URL}/fruits`, {
    headers: {
      "x-api-key": process.env.API_KEY!,
      origin: "http://localhost:3000",
    },
    next: { revalidate: 1800 }, // cache for 30mins
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  return await response.json();
};
