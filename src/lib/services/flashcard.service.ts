import type { SupabaseClient } from "@/db/supabase.client";

export async function getFlashcardById(id: string, supabase: SupabaseClient) {
  const { data, error } = await supabase.from("flashcards").select().eq("id", id).single();
  return { data, error };
}
