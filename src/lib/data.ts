import { Fruit } from "@/app/types";

export const getFruits = async (): Promise<Fruit[]> => {
  console.log("API_KEY:", process.env.BASE_API_URL);

  const response = await fetch(`${process.env.BASE_API_URL}/fruits`, {
    headers: {
      "x-api-key": process.env.API_KEY!,
      origin: "http://localhost:3000",
    },
    next: { revalidate: 3600 }, // cache for 1 hour
  });
  if (!response.ok) throw new Error("Failed to fetch fruits");
  return await response.json();
};
