import { z } from "zod";

export const FlashcardQueryParamsSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  is_ai_generated: z
    .string()
    .transform((val) => val === "true")
    .optional(),
  is_accepted: z
    .string()
    .transform((val) => val === "true")
    .optional(),
  sort_by: z.enum(["created_at", "updated_at"]).default("created_at"),
  sort_order: z.enum(["asc", "desc"]).default("desc"),
});

export const CreateFlashcardSchema = z.object({
  front: z.string().min(1),
  back: z.string().min(1),
});

export type FlashcardQueryParams = z.infer<typeof FlashcardQueryParamsSchema>;
