import "server-only";

import { Fruit } from "@/app/types";
import { API_CONFIG } from "@/app/constants";

/**
 * API call for finofo takehome API
 * @returns Promise<Fruit[]> - Array of fruits
 * @throws Error when API call fails or returns invalid data
 */
export const getFruits = async (): Promise<Fruit[]> => {
  const baseUrl = process.env.BASE_API_URL;
  const apiKey = process.env.API_KEY;

  if (!baseUrl || !apiKey) {
    throw new Error(
      "Missing required environment variables: BASE_API_URL and API_KEY"
    );
  }

  try {
    const response = await fetch(`${baseUrl}/fruits`, {
      headers: {
        "x-api-key": apiKey,
        origin: API_CONFIG.DEFAULT_ORIGIN,
      },
      next: { revalidate: API_CONFIG.CACHE_DURATION },
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: "Unknown error" }));
      throw new Error(
        `API request failed: ${errorData.message || response.statusText}`
      );
    }

    const data = await response.json();

    // Validate that we received an array
    if (!Array.isArray(data)) {
      throw new Error("Invalid response format: expected array of fruits");
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to fetch fruits data");
  }
};
