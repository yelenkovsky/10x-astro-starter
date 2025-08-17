# REST API Plan

This document outlines the REST API for the 10x-cards application, designed to support user authentication, flashcard management, and a spaced repetition system (SRS) for learning.

## 1. Resources

-   **Users**: Represents user profiles. Corresponds to the `profiles` table.
-   **Flashcards**: Represents individual flashcards. Corresponds to the `flashcards` table.
-   **Reviews**: A conceptual resource for managing learning sessions. It interacts with the `user_flashcard_repetition` table.

## 2. Endpoints

### Users

#### Get current user profile

-   **Method**: `GET`
-   **Path**: `/api/users/me`
-   **Description**: Retrieves the profile of the currently authenticated user.
-   **Request Payload**: None
-   **Response Payload**:
    ```json
    {
      "id": "c5b6b2f0-9g9h-4i4j-5k5l-6m6n7o8p9q0r",
      "created_at": "2023-10-27T10:00:00Z",
      "updated_at": "2023-10-27T10:00:00Z",
      "avatar_url": "https://example.com/avatar.png"
    }
    ```
-   **Success Code**: `200 OK`
-   **Error Codes**:
    -   `401 Unauthorized`: If the user is not authenticated.
    -   `404 Not Found`: If the user's profile does not exist.

#### Update current user profile

-   **Method**: `PATCH`
-   **Path**: `/api/users/me`
-   **Description**: Updates the profile of the currently authenticated user.
-   **Request Payload**:
    ```json
    {
      "avatar_url": "https://example.com/new-avatar.png"
    }
    ```
-   **Response Payload**: The updated user profile object.
-   **Success Code**: `200 OK`
-   **Error Codes**:
    -   `400 Bad Request`: If the request payload is invalid.
    -   `401 Unauthorized`: If the user is not authenticated.

#### Delete current user account

-   **Method**: `DELETE`
-   **Path**: `/api/users/me`
-   **Description**: Deletes the account and all associated data of the currently authenticated user.
-   **Request Payload**: None
-   **Response Payload**: None
-   **Success Code**: `204 No Content`
-   **Error Codes**:
    -   `401 Unauthorized`: If the user is not authenticated.

### Flashcards

#### Get a list of flashcards

-   **Method**: `GET`
-   **Path**: `/api/flashcards`
-   **Description**: Retrieves a paginated list of flashcards for the authenticated user.
-   **Query Parameters**:
    -   `page` (integer, optional, default: 1): The page number for pagination.
    -   `pageSize` (integer, optional, default: 20): The number of items per page.
    -   `sortBy` (string, optional, default: 'created_at'): Field to sort by.
    -   `order` (string, optional, default: 'desc'): Sort order ('asc' or 'desc').
-   **Response Payload**:
    ```json
    {
      "data": [
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
      ],
      "pagination": {
        "page": 1,
        "pageSize": 20,
        "totalItems": 1,
        "totalPages": 1
      }
    }
    ```
-   **Success Code**: `200 OK`
-   **Error Codes**:
    -   `401 Unauthorized`: If the user is not authenticated.

#### Get a single flashcard

-   **Method**: `GET`
-   **Path**: `/api/flashcards/{id}`
-   **Description**: Retrieves a single flashcard by its ID.
-   **Response Payload**: A single flashcard object.
-   **Success Code**: `200 OK`
-   **Error Codes**:
    -   `401 Unauthorized`: If the user is not authenticated.
    -   `404 Not Found`: If the flashcard does not exist or the user does not have access.

#### Create a single flashcard

-   **Method**: `POST`
-   **Path**: `/api/flashcards`
-   **Description**: Creates a new flashcard manually.
-   **Request Payload**:
    ```json
    {
      "front": "What is the powerhouse of the cell?",
      "back": "Mitochondria"
    }
    ```
-   **Response Payload**: The newly created flashcard object.
-   **Success Code**: `201 Created`
-   **Error Codes**:
    -   `400 Bad Request`: If validation fails (e.g., `front` or `back` is missing).
    -   `401 Unauthorized`: If the user is not authenticated.

#### Create flashcards in batch

-   **Method**: `POST`
-   **Path**: `/api/flashcards/batch`
-   **Description**: Creates multiple flashcards at once, typically after AI generation and user approval.
-   **Request Payload**:
    ```json
    [
      {
        "front": "Generated Question 1",
        "back": "Generated Answer 1",
        "origin": "ai-generated",
        "source_text": "The source text..."
      },
      {
        "front": "Generated Question 2",
        "back": "Generated Answer 2",
        "origin": "ai-generated",
        "source_text": "The source text..."
      }
    ]
    ```
-   **Response Payload**: An array of the newly created flashcard objects.
-   **Success Code**: `201 Created`
-   **Error Codes**:
    -   `400 Bad Request`: If the request payload is invalid.
    -   `401 Unauthorized`: If the user is not authenticated.

#### Update a flashcard

-   **Method**: `PATCH`
-   **Path**: `/api/flashcards/{id}`
-   **Description**: Updates an existing flashcard.
-   **Request Payload**:
    ```json
    {
      "front": "An updated question?",
      "back": "An updated answer."
    }
    ```
-   **Response Payload**: The updated flashcard object.
-   **Success Code**: `200 OK`
-   **Error Codes**:
    -   `400 Bad Request`: If the request payload is invalid.
    -   `401 Unauthorized`: If the user is not authenticated.
    -   `404 Not Found`: If the flashcard does not exist.

#### Delete a flashcard

-   **Method**: `DELETE`
-   **Path**: `/api/flashcards/{id}`
-   **Description**: Deletes a flashcard by its ID.
-   **Response Payload**: None
-   **Success Code**: `204 No Content`
-   **Error Codes**:
    -   `401 Unauthorized`: If the user is not authenticated.
    -   `404 Not Found`: If the flashcard does not exist.

#### Generate flashcard suggestions

-   **Method**: `POST`
-   **Path**: `/api/flashcards/generate`
-   **Description**: Generates flashcard suggestions from a source text using an LLM.
-   **Request Payload**:
    ```json
    {
      "source_text": "A long piece of text to generate flashcards from..."
    }
    ```
-   **Response Payload**: An array of suggested flashcard objects (not saved to the database).
    ```json
    [
      {
        "front": "Suggested Question 1",
        "back": "Suggested Answer 1"
      },
      {
        "front": "Suggested Question 2",
        "back": "Suggested Answer 2"
      }
    ]
    ```
-   **Success Code**: `200 OK`
-   **Error Codes**:
    -   `400 Bad Request`: If `source_text` is invalid (e.g., too short or too long).
    -   `401 Unauthorized`: If the user is not authenticated.
    -   `500 Internal Server Error`: If there is an issue with the LLM API.

### Reviews (Learning Session)

#### Get a learning session

-   **Method**: `GET`
-   **Path**: `/api/reviews/session`
-   **Description**: Retrieves a list of flashcards due for review for the current user.
-   **Query Parameters**:
    -   `limit` (integer, optional, default: 10): Maximum number of cards to retrieve for the session.
-   **Response Payload**: An array of flashcard objects with their repetition data.
    ```json
    [
      {
        "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
        "front": "What is the capital of France?",
        "back": "Paris",
        "repetition": {
            "id": "f0e9d8c7-b6a5-4321-fedc-ba9876543210",
            "next_review_date": "2023-10-27T10:00:00Z"
        }
      }
    ]
    ```
-   **Success Code**: `200 OK`
-   **Error Codes**:
    -   `401 Unauthorized`: If the user is not authenticated.

#### Update flashcard review status

-   **Method**: `PATCH`
-   **Path**: `/api/reviews/{flashcard_id}`
-   **Description**: Updates the spaced repetition data for a flashcard based on user performance in a review session.
-   **Request Payload**:
    ```json
    {
      "performance_rating": "good"
    }
    ```
-   **Response Payload**: The updated repetition object.
    ```json
    {
      "id": "f0e9d8c7-b6a5-4321-fedc-ba9876543210",
      "user_id": "c5b6b2f0-9g9h-4i4j-5k5l-6m6n7o8p9q0r",
      "flashcard_id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
      "interval": 3,
      "ease_factor": 2.6,
      "next_review_date": "2023-10-30T10:00:00Z"
    }
    ```
-   **Success Code**: `200 OK`
-   **Error Codes**:
    -   `400 Bad Request`: If `performance_rating` is invalid.
    -   `401 Unauthorized`: If the user is not authenticated.
    -   `404 Not Found`: If the flashcard or its repetition data does not exist.

## 3. Authentication and Authorization

-   **Authentication**: The API will use JSON Web Tokens (JWT) provided by Supabase Auth. The client is responsible for handling the authentication flow (login, signup) using the Supabase client-side library. Every request to a protected endpoint must include an `Authorization` header with a Bearer token: `Authorization: Bearer <SUPABASE_JWT>`.
-   **Authorization**: Authorization is enforced at the database level using PostgreSQL's Row-Level Security (RLS). Policies are configured on the `profiles`, `flashcards`, and `user_flashcard_repetition` tables to ensure that users can only access and modify their own data. The user ID from the JWT (`auth.uid()`) is used in these policies.

## 4. Validation and Business Logic

### Validation

-   **User Profile**:
    -   `avatar_url`: Must be a valid URL format.
-   **Flashcards**:
    -   `front`: Required, must be a non-empty string.
    -   `back`: Required, must be a non-empty string.
    -   `origin`: Must be one of `['manual', 'ai-generated', 'ai-edited']`.
-   **Flashcard Generation**:
    -   `source_text`: Required, must be a string between 1000 and 10,000 characters.
-   **Reviews**:
    -   `performance_rating`: Required, must be a recognized value from the set used by the SRS algorithm (e.g., `'again'`, `'hard'`, `'good'`, `'easy'`).

### Business Logic

-   **AI Generation**: The `POST /api/flashcards/generate` endpoint will internally call the Openrouter.ai service, sending the `source_text` and processing the LLM's response to format it into flashcard suggestions.
-   **Spaced Repetition System (SRS)**: The `PATCH /api/reviews/{flashcard_id}` endpoint contains the core SRS logic. Based on the user's `performance_rating` and the flashcard's current state (`interval`, `ease_factor`), it will calculate the new `interval`, `ease_factor`, and `next_review_date` before updating the `user_flashcard_repetition` record.
-   **Cascading Deletes**: When a user is deleted via `DELETE /api/users/me`, the `ON DELETE CASCADE` constraint in the database will automatically remove all their associated flashcards and repetition data.
