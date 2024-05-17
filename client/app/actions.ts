"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

const concertSchema = z.object({
  concertName: z
    .string({
      invalid_type_error: "Invalid Concert Name",
      required_error: "Concert Name is required",
    })
    .min(1, "Concert Name cannot be empty"),
  description: z
    .string({
      invalid_type_error: "Invalid Description",
      required_error: "Concert Description is required",
    })
    .min(1, "Description cannot be empty"),
  totalSeats: z
    .number({
      invalid_type_error: "Invalid number of Seats",
      required_error: "Total number of Seats is required",
    })
    .gt(0, "Total number of Seats must be greater than 0"),
});

export async function createConcert(prevState: any, formData: FormData) {
  const validatedFields = concertSchema.safeParse({
    concertName: formData.get("concertName"),
    description: formData.get("description"),
    totalSeats: Number(formData.get("totalSeats")),
  });

  // Find a way to return specific messages
  if (!validatedFields.success) {
    return {
      isSuccessful: false,
    };
  }

  return {
    isSuccessful: true,
  };
}
