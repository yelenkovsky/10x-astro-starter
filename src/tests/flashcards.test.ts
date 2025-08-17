import { describe, it, expect, vi } from "vitest";
import { GET } from "@/pages/api/flashcards/[id]";
import type { APIContext } from "astro";

// Mock the service
vi.mock("@/lib/services/flashcard.service", () => ({
  getFlashcardById: vi.fn(),
}));

import { getFlashcardById } from "@/lib/services/flashcard.service";

describe("GET /api/flashcards/[id]", () => {
  it("should return 400 for an invalid UUID", async () => {
    const context = {
      params: { id: "invalid-uuid" },
      locals: { supabase: {} },
    } as unknown as { params: { id: string }; locals: { supabase: {} } };

    const response = await GET({
      params: context.params,
      context: { locals: context.locals },
    } as unknown as APIContext);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toBe("Invalid ID format");
  });

  it("should return 404 if flashcard is not found", async () => {
    (getFlashcardById as vi.Mock).mockResolvedValue({ data: null, error: null });

    const context = {
      params: { id: "00000000-0000-0000-0000-000000000000" },
      locals: { supabase: {} },
    } as unknown as { params: { id: string }; locals: { supabase: {} } };

    const response = await GET({
      params: context.params,
      context: { locals: context.locals },
    } as unknown as APIContext);
    const body = await response.json();

    expect(response.status).toBe(404);
    expect(body.error).toBe("Flashcard not found");
  });

  it("should return 500 on service error", async () => {
    (getFlashcardById as vi.Mock).mockResolvedValue({
      data: null,
      error: new Error("Database error"),
    });

    const context = {
      params: { id: "00000000-0000-0000-0000-000000000000" },
      locals: { supabase: {} },
    } as unknown as { params: { id: string }; locals: { supabase: {} } };

    const response = await GET({
      params: context.params,
      context: { locals: context.locals },
    } as unknown as APIContext);
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body.error).toBe("Internal Server Error");
  });

  it("should return 200 with flashcard data on success", async () => {
    const mockFlashcard = {
      id: "a1b2c3d4-e5f6-7890-1234-567890abcdef",
      user_id: "c5b6b2f0-9g9h-4i4j-5k5l-6m6n7o8p9q0r",
      created_at: "2023-10-27T10:00:00Z",
      updated_at: "2023-10-27T10:00:00Z",
      front: "What is the capital of France?",
      back: "Paris",
      origin: "manual",
      source_text: null,
    };

    (getFlashcardById as vi.Mock).mockResolvedValue({ data: mockFlashcard, error: null });

    const context = {
      params: { id: mockFlashcard.id },
      locals: { supabase: {} },
    } as unknown as { params: { id: string }; locals: { supabase: {} } };

    const response = await GET({
      params: context.params,
      context: { locals: context.locals },
    } as unknown as APIContext);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual(mockFlashcard);
  });
});
