"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { FlashcardDto, CreateFlashcardCommand, UpdateFlashcardCommand } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  front: z.string().min(1, "Front is required"),
  back: z.string().min(1, "Back is required"),
});

type FormData = z.infer<typeof formSchema>;

interface FlashcardFormDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  mode: "create" | "edit";
  initialData?: FlashcardDto | null;
  onSubmit: (data: CreateFlashcardCommand | UpdateFlashcardCommand) => void;
  isSubmitting: boolean;
}

export const FlashcardFormDialog = ({
  isOpen,
  onOpenChange,
  mode,
  initialData,
  onSubmit,
  isSubmitting,
}: FlashcardFormDialogProps) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (isOpen) {
      reset(initialData || { front: "", back: "" });
    }
  }, [isOpen, initialData, reset]);

  const handleFormSubmit = (data: FormData) => {
    onSubmit(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Create Flashcard" : "Edit Flashcard"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="front">Front</Label>
              <Input id="front" {...register("front")} />
              {errors.front && <p className="text-red-500 text-sm">{errors.front.message}</p>}
            </div>
            <div>
              <Label htmlFor="back">Back</Label>
              <Input id="back" {...register("back")} />
              {errors.back && <p className="text-red-500 text-sm">{errors.back.message}</p>}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
