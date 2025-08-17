# API Endpoint Implementation Plan: Get a single flashcard

## 1. Endpoint Overview
This document outlines the implementation plan for the `GET /api/flashcards/{id}` endpoint. The purpose of this endpoint is to retrieve a single flashcard by its unique identifier for the currently authenticated user. Access is restricted to the owner of the flashcard.

## 2. Request Details
- **HTTP Method**: `GET`
- **URL Structure**: `/api/flashcards/[id].ts`
- **Parameters**:
  - **Required**: `id` (string, UUID format) - The unique identifier of the flashcard, passed as a URL path parameter.
  - **Optional**: None.
- **Request Body**: None.

## 3. Types Used
- **DTO**: `FlashcardDto` from `src/types.ts`. This type will be used for the response body on a successful request.

## 4. Response Details
- **Success**:
  - **Status Code**: `200 OK`
  - **Body**: A JSON object representing the flashcard.
    ```json
    {
      "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
      "user_id": "c5b6b2f0-9g9h-4i4j-5k5l-6m6n7o8p9q0r",
      "created_at": "2023-10-27T10:00:00Z",
      "updated_at": "2023-10-27T10:00:00Z",
      "front": "What is the capital of France?",
      "back": "Paris",
      "origin": "manual",
      "source_text": null
    }
    ```
- **Error**:
  - **Status Code**: `400 Bad Request` - If the `id` parameter is not a valid UUID.
  - **Status Code**: `401 Unauthorized` - If the user is not authenticated.
  - **Status Code**: `404 Not Found` - If no flashcard with the specified `id` is found for the user.
  - **Status Code**: `500 Internal Server Error` - For unexpected server-side errors.

## 5. Data Flow
1. The client sends a `GET` request to `/api/flashcards/{id}` with a valid JWT in the `Authorization` header.
2. The Astro middleware (`src/middleware/index.ts`) intercepts the request, validates the JWT, and attaches the user-specific Supabase client to `context.locals.supabase`.
3. The API route handler in `src/pages/api/flashcards/[id].ts` is executed.
4. The handler extracts the `id` parameter from the URL.
5. The `id` is validated using a `zod` schema to ensure it is a valid UUID.
6. The handler calls the `getFlashcardById` method in the `FlashcardService` (`src/lib/services/flashcard.service.ts`), passing the `id` and the `supabase` client from `context.locals`.
7. The `FlashcardService` executes a `select` query on the `flashcards` table where `id` matches the provided parameter.
8. The database enforces the Row-Level Security (RLS) policy, ensuring the query only returns a result if the `flashcards.user_id` matches the `auth.uid()` of the authenticated user.
9. The service returns the flashcard data if found, otherwise `null`.
10. The API route handler checks the result from the service. If data is present, it returns a `200 OK` response with the `FlashcardDto`. If `null`, it returns a `404 Not Found` response.

## 6. Security Considerations
- **Authentication**: Access is restricted to authenticated users. The Astro middleware is responsible for JWT validation.
- **Authorization**: Row-Level Security (RLS) policies on the `flashcards` table are critical. They prevent users from accessing flashcards they do not own, thus mitigating Insecure Direct Object Reference (IDOR) vulnerabilities.
- **Input Validation**: The `id` path parameter will be strictly validated as a UUID using `zod` to prevent malformed queries or potential injection vectors.

## 7. Error Handling
- **Invalid UUID**: The endpoint will use a `try...catch` block to handle validation errors from `zod`. If parsing fails, it will return a `400 Bad Request` with a clear error message.
- **Not Found**: If the `FlashcardService` returns no data, the endpoint will respond with `404 Not Found`. This correctly handles cases where the flashcard does not exist or belongs to another user.
- **Server Errors**: A generic `try...catch` block will wrap the main logic to catch any unexpected errors (e.g., database connection failure). It will log the error to the console for debugging and return a `500 Internal Server Error` response to the client.

## 8. Performance Considerations
- The database query uses the primary key (`id`) of the `flashcards` table, which is indexed by default. This ensures the lookup operation is highly efficient and will perform well even with a large number of records.
- No complex joins or computations are required, so the endpoint is expected to have a low response time.

## 9. Implementation Steps
1.  **Create Service File**: Create a new file at `src/lib/services/flashcard.service.ts`.
2.  **Implement `getFlashcardById`**:
    -   Define an async function `getFlashcardById(id: string, supabase: SupabaseClient)`.
    -   Inside the function, perform a Supabase query: `supabase.from('flashcards').select().eq('id', id).single()`.
    -   Return the `{ data, error }` object from the Supabase client.
3.  **Create API Route**: Create a new file at `src/pages/api/flashcards/[id].ts`.
4.  **Implement `GET` Handler**:
    -   Export an `async` function `GET({ params, context }: APIContext)`.
    -   Define a `zod` schema to validate that `params.id` is a string in UUID format.
    -   Use a `try...catch` block to parse the `id` with the schema. Return a `400` response on failure.
    -   Retrieve the Supabase client from `context.locals.supabase`.
    -   Call `await getFlashcardById(validatedId, supabase)`.
    -   Check for errors from the service call and return a `500` response if an error exists.
    -   If the `data` is null, return a `404` response.
    -   If data exists, return a `200` response with the flashcard data as the JSON body.
    -   Add `export const prerender = false;` to the file.
