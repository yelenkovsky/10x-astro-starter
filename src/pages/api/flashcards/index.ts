
import type { APIContext } from "astro";
import { createFlashcard, getFlashcards } from "@/lib/services/flashcard.service";
import { CreateFlashcardSchema } from "@/lib/schemas/flashcard";
import { z } from "zod";

export const prerender = false;

export async function GET({ locals }: APIContext) {
    const supabase = locals.supabase;
    const { data, error } = await getFlashcards(supabase);

    if (error) {
        console.error("Error fetching flashcards:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
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
}

export async function POST({ request, locals }: APIContext) {
    const supabase = locals.supabase;

    try {
        const body = await request.json();
        const flashcard = CreateFlashcardSchema.parse(body);

        const { data, error } = await createFlashcard(flashcard, supabase);

        if (error) {
            console.error("Error creating flashcard:", error);
            return new Response(JSON.stringify({ error: "Internal Server Error" }), {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }

        return new Response(JSON.stringify(data), {
            status: 201,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (err) {
        if (err instanceof z.ZodError) {
            return new Response(JSON.stringify({ error: "Invalid request body", details: err.errors }), {
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
