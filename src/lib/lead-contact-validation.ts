import { z } from "zod";

export const contactMethodSchema = z
  .object({
    phone: z.string().min(5).max(40).optional(),
    email: z.string().email().max(200).optional(),
  })
  .refine((data) => Boolean(data.phone || data.email), {
    message: "Phone or email is required",
    path: ["phone"],
  });
