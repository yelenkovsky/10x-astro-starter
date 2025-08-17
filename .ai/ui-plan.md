# UI Architecture for 10x-cards

## 1. UI Structure Overview

The 10x-cards application is designed as a Single-Page Application (SPA) experience for authenticated users, built on a hybrid Astro and React framework. The architecture distinguishes between public-facing authentication pages and a secure, feature-rich dashboard for registered users.

-   **Layouts**: The UI is structured around two main layouts:
    -   `AuthLayout`: A minimal layout for public pages like Login and Registration.
    -   `AppLayout`: A comprehensive layout for the authenticated user dashboard, featuring persistent navigation and user session management.
-   **Routing**: Top-level page routing (e.g., `/login`, `/app`) is handled by Astro's file-based system. Within the `/app` dashboard, a client-side router (React Router) manages navigation between different functional views (e.g., Generate, My Flashcards, Learn) for a seamless, app-like experience without full page reloads.
-   **State Management**: Client-side state (like the current user session) is managed by React's Context API. All server-side data, including data fetching, caching, and mutations, is handled by TanStack Query, abstracted away through a layer of custom hooks.

## 2. List of Views

### Authentication Views

#### 1. Login View

-   **View Name**: Login
-   **View Path**: `/login`
-   **Main Purpose**: To allow existing users to securely access their accounts.
-   **Key Information to Display**: Email address field, password field, login button, and a link to the Registration view.
-   **Key View Components**: `Card`, `Input`, `Button`, `Label`.
-   **UX, Accessibility, and Security**:
    -   **UX**: Provides clear, inline validation feedback for form fields. Shows a loading state on the button during submission.
    -   **Accessibility**: All form fields have associated labels. Focus states are clearly visible.
    -   **Security**: Uses a password input type to mask characters. Auto-complete is disabled for the password field.

#### 2. Registration View

-   **View Name**: Register
-   **View Path**: `/register`
-   **Main Purpose**: To enable new users to create an account.
-   **Key Information to Display**: Email address field, password field, password confirmation field, register button, and a link to the Login view.
-   **Key View Components**: `Card`, `Input`, `Button`, `Label`.
-   **UX, Accessibility, and Security**:
    -   **UX**: Inline validation for password strength and email format.
    -   **Accessibility**: Follows the same accessibility standards as the Login view.
    -   **Security**: Enforces password strength requirements on the client-side before submission.

### Authenticated Dashboard Views (Client-Side Routes within `/app`)

#### 1. AI Generation View

-   **View Name**: AI Generation
-   **View Path**: `/app/generate`
-   **Main Purpose**: To provide a workspace for users to generate flashcard suggestions from a source text using an LLM. (US-003)
-   **Key Information to Display**: A large text area for source text input, a "Generate" button, a loading indicator for the generation process, and a results area for displaying AI-generated suggestions.
-   **Key View Components**: `Textarea`, `Button`, `Spinner`/`Skeleton` loaders, `SuggestionReviewList` (displays results).
-   **UX, Accessibility, and Security**:
    -   **UX**: Provides a character count for the text area to guide users within the required range (1k-10k). The "Generate" button is disabled until the text length is valid. A clear loading state prevents users from re-submitting.
    -   **Accessibility**: The text area is properly labeled. An `aria-live` region announces the start and completion of the generation process to screen reader users.
    -   **Security**: Input text is sanitized on the server-side before being processed by the LLM.

#### 2. My Flashcards View

-   **View Name**: My Flashcards
-   **View Path**: `/app/flashcards`
-   **Main Purpose**: To allow users to view, create, edit, and delete their saved flashcards. (US-005, US-006, US-007)
-   **Key Information to Display**: A paginated list of all user-owned flashcards, displaying the front and back content.
-   **Key View Components**: `DataTable` (desktop), list of `Card`s (mobile), `Button` (for "Add New Flashcard"), `Dialog`/`Modal` (for creating/editing), `AlertDialog` (for delete confirmation), `Pagination`.
-   **UX, Accessibility, and Security**:
    -   **UX**: Features a clear empty state with a call-to-action when no flashcards exist. Destructive actions (delete) require user confirmation. The view is responsive, adapting from a table to a list on smaller screens.
    -   **Accessibility**: The data table includes appropriate headers and scope attributes for screen readers. All interactive elements are keyboard-navigable.
    -   **Security**: All data operations are scoped to the authenticated user via RLS policies in the database, preventing unauthorized access.

#### 3. Learning Session View

-   **View Name**: Learning Session
-   **View Path**: `/app/learn`
-   **Main Purpose**: To guide the user through a spaced repetition learning session with flashcards that are due for review. (US-008)
-   **Key Information to Display**: The front of a single flashcard, a button to reveal the back, performance rating buttons (e.g., 'Again', 'Hard', 'Good', 'Easy'), and a session progress indicator.
-   **Key View Components**: `Card`, `Button`, `Progress`.
-   **UX, Accessibility, and Security**:
    -   **UX**: The interface is minimal to promote focus. Keyboard shortcuts (e.g., spacebar to flip, number keys for rating) are available for a faster workflow.
    -   **Accessibility**: Flashcard content is presented in large, high-contrast text. All interactions are keyboard-accessible.
    -   **Security**: The session only loads flashcards belonging to the authenticated user.

#### 4. Settings View

-   **View Name**: Settings
-   **View Path**: `/app/settings`
-   **Main Purpose**: To allow users to manage their account settings, including account deletion.
-   **Key Information to Display**: User profile information (e.g., email), and a section for account actions.
-   **Key View Components**: `Card`, `Button`, `AlertDialog`.
-   **UX, Accessibility, and Security**:
    -   **UX**: The "Delete Account" action is clearly marked as a destructive and irreversible action and is protected by a confirmation dialog that requires the user to type to confirm.
    -   **Accessibility**: All form elements and buttons are labeled.
    -   **Security**: Account deletion requires re-authentication or a confirmation step to prevent accidental or malicious actions.

## 3. User Journey Map

The primary user journey involves generating, saving, and learning flashcards.

1.  **Onboarding**: A new user lands on the homepage, navigates to `/register`, creates an account, and is automatically logged in and redirected to the **AI Generation View** (`/app/generate`). An existing user goes to `/login` and is redirected to the same view.
2.  **Generation**: In the **AI Generation View**, the user pastes text and clicks "Generate". The UI enters a loading state.
3.  **Review**: Upon completion, the UI displays a list of suggested flashcards. The user can edit the text of each card inline, and deselect any they do not wish to keep.
4.  **Saving**: The user clicks "Save Selected", which sends the approved flashcards to the server. They receive a success notification and are redirected to the **My Flashcards View** (`/app/flashcards`).
5.  **Management**: In the **My Flashcards View**, the user can see their new cards. They can manually add more cards via a modal, or edit/delete existing ones.
6.  **Learning**: From the main navigation, the user selects "Learn" and enters the **Learning Session View** (`/app/learn`). The application fetches cards due for review.
7.  **Session Flow**: The user proceeds through the session, revealing answers and rating their recall for each card. The session ends when all due cards have been reviewed.
8.  **Logout**: The user clicks the profile icon and selects "Logout", terminating the session and redirecting them to the `/login` page.

## 4. Layout and Navigation Structure

-   **Public Layout (`AuthLayout`)**: A simple, centered layout used for the `Login` and `Register` views. It contains no primary navigation.
-   **Authenticated Layout (`AppLayout`)**: This layout wraps all authenticated views and includes a persistent top-level navigation bar.
    -   **Primary Navigation**: The navigation bar contains links to the main views:
        -   **Generate** (`/app/generate`)
        -   **My Flashcards** (`/app/flashcards`)
        -   **Learn** (`/app/learn`)
    -   **User Menu**: A dropdown menu is available, typically at the top-right, which provides access to:
        -   **Settings** (`/app/settings`)
        -   **Logout** (action)

## 5. Key Components

-   **Suggestion Review List**: A specialized component used in the AI Generation view to display, edit, and select AI-generated flashcard suggestions before they are saved. Each item includes form inputs, a selection checkbox, and a delete button.
-   **Flashcard Form**: A modal/dialog-based form used for both creating a new flashcard manually and editing an existing one. It contains `Input` fields for the 'front' and 'back' of the card.
-   **Protected Route**: A higher-order component or logic that wraps all authenticated views. It checks for a valid user session; if one does not exist, it redirects the user to the `/login` page.
-   **Global Error Handler**: An application-wide mechanism, likely integrated into the API abstraction layer, that handles API errors. It will display toast notifications for general errors and trigger a redirect to `/login` upon receiving a `401 Unauthorized` status.
