# Database Schema for 10x-cards

This document outlines the database schema for the 10x-cards application, designed to support user authentication, flashcard management, and a spaced repetition system (SRS) for learning.

## 1. Tables

### `profiles`

Stores public user information and links to Supabase's `auth.users` table.

| Column Name | Data Type | Constraints | Description |
| --- | --- | --- | --- |
| `id` | `uuid` | Primary Key, Not Null, Default: `auth.uid()` | References `auth.users.id`. |
| `created_at` | `timestamptz` | Not Null, Default: `now()` | Timestamp of when the profile was created. |
| `updated_at` | `timestamptz` | Not Null, Default: `now()` | Timestamp of the last profile update. |
| `avatar_url` | `text` | | URL for the user's profile picture. |

### `flashcards`

Stores the flashcards created by users.

| Column Name | Data Type | Constraints | Description |
| --- | --- | --- | --- |
| `id` | `uuid` | Primary Key, Not Null, Default: `gen_random_uuid()` | Unique identifier for the flashcard. |
| `user_id` | `uuid` | Not Null, Foreign Key to `profiles.id` | The user who owns the flashcard. |
| `created_at` | `timestamptz` | Not Null, Default: `now()` | Timestamp of when the flashcard was created. |
| `updated_at` | `timestamptz` | Not Null, Default: `now()` | Timestamp of the last flashcard update. |
| `front` | `text` | Not Null | The question or "front" side of the flashcard. |
| `back` | `text` | Not Null | The answer or "back" side of the flashcard. |
| `origin` | `text` | Not Null, Default: `'manual'` | How the flashcard was created (`manual`, `ai-generated`, `ai-edited`). |
| `source_text` | `text` | | The source text used for AI generation, if applicable. |

### `user_flashcard_repetition`

Manages the spaced repetition schedule for each flashcard and user.

| Column Name | Data Type | Constraints | Description |
| --- | --- | --- | --- |
| `id` | `uuid` | Primary Key, Not Null, Default: `gen_random_uuid()` | Unique identifier for the repetition entry. |
| `user_id` | `uuid` | Not Null, Foreign Key to `profiles.id` | The user associated with this repetition data. |
| `flashcard_id` | `uuid` | Not Null, Foreign Key to `flashcards.id` | The flashcard being tracked. |
| `created_at` | `timestamptz` | Not Null, Default: `now()` | Timestamp of when the repetition entry was created. |
| `updated_at` | `timestamptz` | Not Null, Default: `now()` | Timestamp of the last repetition update. |
| `interval` | `integer` | Not Null, Default: `0` | The number of days until the next review. |
| `ease_factor` | `real` | Not Null, Default: `2.5` | A factor representing how easy the card is for the user. |
| `next_review_date`| `timestamptz` | Not Null, Default: `now()` | The date when the flashcard should be reviewed next. |

## 2. Relationships

-   **`profiles` to `flashcards`**: One-to-Many. A user can have many flashcards, but each flashcard belongs to one user.
    -   `flashcards.user_id` -> `profiles.id`
-   **`profiles` to `user_flashcard_repetition`**: One-to-Many. A user can have many repetition entries.
    -   `user_flashcard_repetition.user_id` -> `profiles.id`
-   **`flashcards` to `user_flashcard_repetition`**: One-to-One. Each flashcard has one corresponding repetition entry for a given user.
    -   `user_flashcard_repetition.flashcard_id` -> `flashcards.id`

## 3. Indexes

-   **`flashcards`**:
    -   An index should be created on the `user_id` column to speed up queries for a user's flashcards.
-   **`user_flashcard_repetition`**:
    -   An index should be created on the `user_id` column to quickly fetch repetition data for a specific user.
    -   An index should be created on the `flashcard_id` column for efficient lookups.
    -   An index on `next_review_date` will be crucial for quickly finding cards that are due for review.

## 4. PostgreSQL Policies (Row-Level Security)

RLS will be enabled on all tables to ensure users can only access their own data.

-   **`profiles` table**:
    -   Users can view their own profile.
    -   Users can update their own profile.
-   **`flashcards` table**:
    -   Users can view their own flashcards.
    -   Users can create, update, and delete their own flashcards.
-   **`user_flashcard_repetition` table**:
    -   Users can view their own repetition data.
    -   Users can create, update, and delete their own repetition data.

## 5. Additional Notes

-   The `ON DELETE CASCADE` constraint will be used on foreign keys referencing `profiles.id`. This ensures that when a user is deleted, all their associated data (flashcards, repetition history) is also deleted, in compliance with GDPR.
-   Timestamps (`created_at`, `updated_at`) will be automatically managed by database triggers to track record changes.
