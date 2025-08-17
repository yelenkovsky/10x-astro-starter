
import type { APIContext } from "astro";
import { z } from "zod";
import { getFlashcardById } from "@/lib/services/flashcard.service";

export const prerender = false;

const idSchema = z.string().uuid();

export async function GET({ params, context }: APIContext) {
  const supabase = context.locals.supabase;

  try {
    const validatedId = idSchema.parse(params.id);

    const { data, error } = await getFlashcardById(validatedId, supabase);

    if (error) {
      console.error("Error fetching flashcard:", error);
      return new Response(JSON.stringify({ error: "Internal Server Error" }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    if (!data) {
      return new Response(JSON.stringify({ error: "Flashcard not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new Response(JSON.stringify({ error: "Invalid ID format", details: err.errors }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    console.error("Unexpected error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
