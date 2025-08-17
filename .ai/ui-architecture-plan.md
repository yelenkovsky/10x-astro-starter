# UI Architecture and User Journey Plan

This document outlines the UI architecture, user flows, and technical recommendations for the 10x-cards MVP.

## 1. Core Architecture

The application will be a single-page application (SPA) experience built within the Astro framework, using React for all dynamic and interactive components. A central **dashboard** will serve as the main hub for authenticated users, providing access to all key features.

-   **Layouts**:
    -   `AppLayout`: A primary layout for authenticated users, containing a persistent navigation component (header or sidebar) and a main content area for rendering different views.
    -   `AuthLayout`: A minimal layout for login and registration pages, featuring a centered content area without the main navigation.
-   **Routing**: Astro's file-based routing will manage the primary pages (`/login`, `/register`, `/dashboard`). Client-side navigation within the dashboard will be handled by a React-based router or conditional rendering to switch between views.

## 2. Views and Components

The UI will be composed of the following primary views, built using **Shadcn/ui** components with the default theme.

-   **Dashboard View**:
    -   The main landing page after login.
    -   It will feature a tabbed interface or distinct sections to switch between the "AI Flashcard Generation," "My Flashcards," and "Learning Session" functionalities.
-   **Authentication Views (`/login`, `/register`)**:
    -   Simple forms for user login and registration.
-   **Key Components**:
    -   **Navigation**: A persistent header containing links to the dashboard sections and a user profile dropdown with a logout option.
    -   **Flashcard**: A `Card` component to display a single flashcard, used in lists and learning sessions.
    -   **FlashcardList**: A component that renders a list of flashcards. On desktop, it will use a `DataTable`. On mobile, it will responsively transform into a vertical list of `Card` components.
    -   **GenerationForm**: A `Textarea` for source text input and a "Generate" `Button`.
    -   **SuggestionsList**: Displays AI-generated flashcards, with each item offering "Accept," "Reject," and inline "Edit" controls.

## 3. User Journey and Navigation

1.  **Authentication**:
    -   Unauthenticated users are restricted to the `/login` and `/register` pages.
    -   Upon successful login, the user is redirected to the `/dashboard`.
2.  **Dashboard Navigation**:
    -   The user can navigate between the "Generation," "My Flashcards," and "Learning" sections within the dashboard.
3.  **Flashcard Creation Flow**:
    -   User pastes text into the `GenerationForm` and clicks "Generate."
    -   The `SuggestionsList` appears below the form, showing proposed flashcards.
    -   The user can **edit** suggestions directly inline.
    -   Accepted flashcards are added to their collection, accessible in the "My Flashcards" view.
4.  **Learning Flow**:
    -   The user navigates to the "Learning Session" section.
    -   Flashcards due for review are presented one by one.
    -   User interacts with the card to reveal the answer and provides a performance rating.

## 4. State and Data Management

-   **Client-Side State**: React's built-in **Context API** is sufficient for managing global UI state, such as the authenticated user's profile and session information.
-   **Server-Side State**: **TanStack Query (React Query)** will be used for all interactions with the REST API. This will handle data fetching, caching, and mutation states (loading, error, success), simplifying component logic.
-   **API Abstraction**: An API service layer will be created, providing hooks like `useGetFlashcards` or `useCreateFlashcard` that encapsulate the TanStack Query logic.

## 5. Error Handling and Security

-   **API Errors**:
    -   General API errors (e.g., 500 Internal Server Error) and success messages will be communicated via non-blocking **toast notifications**.
    -   Form validation errors (e.g., empty front/back fields) will be displayed as inline messages next to the respective inputs.
-   **Authentication**:
    -   Protected routes will be implemented for all authenticated views.
    -   If an API call returns a `401 Unauthorized` (e.g., due to an expired token), the application will automatically **redirect the user to the login page**.
-   **Caching**:
    -   For the MVP, client-side caching of flashcard lists will not be implemented to maintain simplicity. TanStack Query will refetch data as needed based on its default configuration.
