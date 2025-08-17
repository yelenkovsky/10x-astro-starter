"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useFlashcards } from "@/components/hooks/useFlashcards";
import { Button } from "@/components/ui/button";
import { FlashcardsDisplay } from "./FlashcardsDisplay";
import { FlashcardFormDialog } from "./FlashcardFormDialog";
import { DeleteConfirmationDialog } from "./DeleteConfirmationDialog";
import { PaginationControls } from "./PaginationControls";
import { FlashcardsSkeleton } from "./FlashcardsSkeleton";
import type { FlashcardDto, CreateFlashcardCommand, UpdateFlashcardCommand } from "@/types";

const PAGE_SIZE = 10;

type FormDialogState = {
  isOpen: boolean;
  mode: 'create' | 'edit';
  data: FlashcardDto | null;
};

type DeleteDialogState = {
  isOpen: boolean;
  data: FlashcardDto | null;
};

export const MyFlashcardsView = () => {
  const [page, setPage] = useState(1);
  const { query, createMutation, updateMutation, deleteMutation } = useFlashcards(page, PAGE_SIZE);

  const [formDialogState, setFormDialogState] = useState<FormDialogState>({ isOpen: false, mode: 'create', data: null });
  const [deleteDialogState, setDeleteDialogState] = useState<DeleteDialogState>({ isOpen: false, data: null });

  const handleEdit = (flashcard: FlashcardDto) => {
    setFormDialogState({ isOpen: true, mode: 'edit', data: flashcard });
  };

  const handleDelete = (flashcard: FlashcardDto) => {
    setDeleteDialogState({ isOpen: true, data: flashcard });
  };

  const handleFormSubmit = (data: CreateFlashcardCommand | UpdateFlashcardCommand) => {
    if (formDialogState.mode === 'create') {
      createMutation.mutate(data, {
        onSuccess: () => {
          setFormDialogState({ isOpen: false, mode: 'create', data: null });
          toast.success("Flashcard created successfully.");
        },
        onError: () => {
          toast.error("Failed to create flashcard.");
        },
      });
    } else if (formDialogState.mode === 'edit' && formDialogState.data) {
      updateMutation.mutate({ id: formDialogState.data.id, data }, {
        onSuccess: () => {
          setFormDialogState({ isOpen: false, mode: 'edit', data: null });
          toast.success("Flashcard updated successfully.");
        },
        onError: () => {
          toast.error("Failed to update flashcard.");
        },
      });
    }
  };

  const handleConfirmDelete = () => {
    if (deleteDialogState.data) {
      deleteMutation.mutate(deleteDialogState.data.id, {
        onSuccess: () => {
          setDeleteDialogState({ isOpen: false, data: null });
          toast.success("Flashcard deleted successfully.");
        },
        onError: () => {
          toast.error("Failed to delete flashcard.");
        },
      });
    }
  };

  if (query.isLoading) {
    return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">My Flashcards</h1>
          <Button disabled>Add New Flashcard</Button>
        </div>
        <FlashcardsSkeleton />
      </div>
    )
  }

  if (query.isError) {
    return <div>Error fetching flashcards.</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Flashcards</h1>
        <Button onClick={() => setFormDialogState({ isOpen: true, mode: 'create', data: null })}>Add New Flashcard</Button>
      </div>
      <FlashcardsDisplay
        flashcards={query.data?.data || []}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <FlashcardFormDialog
        isOpen={formDialogState.isOpen}
        onOpenChange={(isOpen) => setFormDialogState(prev => ({ ...prev, isOpen }))}
        mode={formDialogState.mode}
        initialData={formDialogState.data}
        onSubmit={handleFormSubmit}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
      />
      <DeleteConfirmationDialog
        isOpen={deleteDialogState.isOpen}
        onOpenChange={(isOpen) => setDeleteDialogState(prev => ({ ...prev, isOpen }))}
        onConfirmDelete={handleConfirmDelete}
        isDeleting={deleteMutation.isPending}
      />
      <div className="mt-4">
        <PaginationControls
          currentPage={page}
          totalPages={query.data?.pagination.totalPages || 1}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};
