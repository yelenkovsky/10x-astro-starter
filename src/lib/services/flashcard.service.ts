import type { SupabaseClient } from "@/db/supabase.client";
import type { CreateFlashcardCommand } from "@/types";

export async function getFlashcardById(id: string, supabase: SupabaseClient) {
  const { data, error } = await supabase.from("flashcards").select().eq("id", id).single();
  return { data, error };
}

export async function getFlashcards(supabase: SupabaseClient) {
  const { data, error } = await supabase.from("flashcards").select();
  return { data, error };
}

export async function createFlashcard(flashcard: CreateFlashcardCommand, supabase: SupabaseClient) {
  const { data, error } = await supabase.from("flashcards").insert(flashcard).single();
  return { data, error };
}
