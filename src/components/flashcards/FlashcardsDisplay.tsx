"use client";

import type { FlashcardDto } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface FlashcardsDisplayProps {
  flashcards: FlashcardDto[];
  onEdit: (flashcard: FlashcardDto) => void;
  onDelete: (flashcard: FlashcardDto) => void;
}

export const FlashcardsDisplay = ({ flashcards, onEdit, onDelete }: FlashcardsDisplayProps) => {
  if (flashcards.length === 0) {
    return (
      <div className="text-center py-10">
        <p>You don't have any flashcards yet. Create one!</p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop View: Table */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Front</TableHead>
              <TableHead>Back</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {flashcards.map((flashcard) => (
              <TableRow key={flashcard.id}>
                <TableCell>{flashcard.front}</TableCell>
                <TableCell>{flashcard.back}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" onClick={() => onEdit(flashcard)}>Edit</Button>
                  <Button variant="destructive" size="sm" className="ml-2" onClick={() => onDelete(flashcard)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile View: Cards */}
      <div className="block md:hidden">
        <div className="grid gap-4">
          {flashcards.map((flashcard) => (
            <Card key={flashcard.id}>
              <CardHeader>
                <CardTitle>Front</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{flashcard.front}</p>
              </CardContent>
              <CardHeader>
                <CardTitle>Back</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{flashcard.back}</p>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => onEdit(flashcard)}>Edit</Button>
                <Button variant="destructive" size="sm" onClick={() => onDelete(flashcard)}>Delete</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};
