import type {
  FlashcardListDto,
  FlashcardDto,
  CreateFlashcardCommand,
  UpdateFlashcardCommand,
} from "@/types";

const apiClient = {
  get: async <T>(url: string): Promise<T> => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json() as Promise<T>;
  },
  post: async <T, U>(url: string, data: U): Promise<T> => {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json() as Promise<T>;
  },
  patch: async <T, U>(url: string, data: U): Promise<T> => {
    const response = await fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json() as Promise<T>;
  },
  delete: async (url: string): Promise<void> => {
    const response = await fetch(url, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  },
};


export const getFlashcards = async (page: number, pageSize: number): Promise<FlashcardListDto> => {
  return apiClient.get(`/api/flashcards?page=${page}&pageSize=${pageSize}`);
};

export const createFlashcard = async (data: CreateFlashcardCommand): Promise<FlashcardDto> => {
  return apiClient.post("/api/flashcards", data);
};

export const updateFlashcard = async ({ id, data }: { id: string, data: UpdateFlashcardCommand }): Promise<FlashcardDto> => {
  return apiClient.patch(`/api/flashcards/${id}`, data);
};

export const deleteFlashcard = async (id: string): Promise<void> => {
  return apiClient.delete(`/api/flashcards/${id}`);
};
