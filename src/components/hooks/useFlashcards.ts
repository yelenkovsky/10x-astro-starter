import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  FlashcardListDto,
  FlashcardDto,
  CreateFlashcardCommand,
  UpdateFlashcardCommand,
} from "@/types";
import {
  getFlashcards,
  createFlashcard,
  updateFlashcard,
  deleteFlashcard,
} from "@/lib/api";

export const useFlashcards = (page: number, pageSize: number) => {
  const queryClient = useQueryClient();

  const query = useQuery<FlashcardListDto>({
    queryKey: ["flashcards", { page, pageSize }],
    queryFn: () => getFlashcards(page, pageSize),
  });

  const createMutation = useMutation({
    mutationFn: createFlashcard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["flashcards"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateFlashcard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["flashcards"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteFlashcard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["flashcards"] });
    },
  });

  return {
    query,
    createMutation,
    updateMutation,
    deleteMutation,
  };
};
