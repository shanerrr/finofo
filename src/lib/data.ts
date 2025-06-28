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
      origin:
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000"
          : process.env.NEXT_PUBLIC_APP_URL || "https://your-domain.com",
    },
    next: { revalidate: 3600 }, // cache for 1 hour
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  return await response.json();
};
