"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MyFlashcardsView } from "./MyFlashcardsView";
import { useState } from "react";

export const FlashcardsViewProvider = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <MyFlashcardsView />
    </QueryClientProvider>
  );
};
