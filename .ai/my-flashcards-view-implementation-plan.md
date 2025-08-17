# My Flashcards View Implementation Plan

## 1. Overview
The "My Flashcards" view is a core part of the authenticated user dashboard. Its primary purpose is to allow users to manage their collection of flashcards. This includes viewing a paginated list of all their flashcards, creating new ones manually, editing existing ones, and deleting those that are no longer needed. The view must be responsive, presenting the flashcard list as a table on larger screens and as a series of cards on smaller devices.

## 2. View Routing
-   **Path**: `/app/flashcards`
-   This is a client-side route managed within the main `/app` dashboard, which is handled by a client-side router like React Router.

## 3. Component Structure
The view will be composed of a main container component that manages state and several presentational child components.

```
MyFlashcardsView (Container)
|
├── Button ("Add New Flashcard")
|
├── FlashcardsDisplay (Handles responsive data presentation)
|   └── (Renders either a Table or a list of Cards based on screen size)
|
├── PaginationControls
|
├── FlashcardFormDialog (Modal for create/edit operations)
|
└── DeleteConfirmationDialog (Modal for delete confirmation)
```

## 4. Component Details

### MyFlashcardsView
-   **Component Description**: The main container component that orchestrates the entire view. It is responsible for data fetching, state management for pagination and modals, and handling callbacks from child components.
-   **Main Elements**: It will render the main layout including a header with the "Add New Flashcard" button, the `FlashcardsDisplay` component, and `PaginationControls`. It will also render the `FlashcardFormDialog` and `DeleteConfirmationDialog` components, controlling their visibility via state.
-   **Supported Interactions**: Listens for page change events from `PaginationControls` and handles "add", "edit", and "delete" intents from its children by opening the appropriate modals.
-   **Supported Validation**: None directly. It delegates validation to the `FlashcardFormDialog`.
-   **Types**: `FlashcardListDto`, `FlashcardDto`.
-   **Props**: None.

### FlashcardsDisplay
-   **Component Description**: A responsive component responsible for displaying the list of flashcards. On screens wider than a specified breakpoint (e.g., `md`), it renders a `DataTable`. On smaller screens, it renders a vertical list of `Card` components.
-   **Main Elements**: Internally, it will use shadcn/ui's `Table` and `Card` components. The table will have columns for "Front", "Back", and "Actions". Each card will display the front and back content and have action buttons in its footer.
-   **Supported Interactions**: Each flashcard item (row or card) will have an "Edit" and a "Delete" button. Clicking these will trigger callback functions passed down as props.
-   **Supported Validation**: None.
-   **Types**: `FlashcardDto[]`.
-   **Props**:
    -   `flashcards: FlashcardDto[]`: The array of flashcards to display.
    -   `onEdit: (flashcard: FlashcardDto) => void`: Callback triggered when the edit button is clicked.
    -   `onDelete: (flashcard: FlashcardDto) => void`: Callback triggered when the delete button is clicked.

### FlashcardFormDialog
-   **Component Description**: A dialog (modal) containing a form for creating a new flashcard or editing an existing one. It manages its own form state and validation.
-   **Main Elements**: Built with shadcn/ui `Dialog`, `Input`, `Label`, and `Button`. It will contain two text inputs: one for the "Front" and one for the "Back" of the flashcard.
-   **Supported Interactions**: Form submission.
-   **Supported Validation**:
    -   `front`: Must be a non-empty string.
    -   `back`: Must be a non-empty string.
    The "Save" button will be disabled until the form is valid.
-   **Types**: `CreateFlashcardCommand`, `UpdateFlashcardCommand`, `FlashcardDto`.
-   **Props**:
    -   `isOpen: boolean`: Controls the visibility of the dialog.
    -   `onOpenChange: (isOpen: boolean) => void`: Callback for closing the dialog.
    -   `mode: 'create' | 'edit'`: Determines the dialog's behavior and title.
    -   `initialData?: FlashcardDto`: Pre-populates the form for editing.
    -   `onSubmit: (data: CreateFlashcardCommand | UpdateFlashcardCommand) => void`: Callback with the validated form data on submission.
    -   `isSubmitting: boolean`: Indicates if the form submission is in progress.

### DeleteConfirmationDialog
-   **Component Description**: An alert dialog to ensure the user confirms their intent to delete a flashcard, preventing accidental data loss.
-   **Main Elements**: Built with shadcn/ui `AlertDialog`. It will display a confirmation message and provide "Cancel" and "Confirm" actions.
-   **Supported Interactions**: Confirming or canceling the delete action.
-   **Supported Validation**: None.
-   **Types**: None.
-   **Props**:
    -   `isOpen: boolean`: Controls the visibility of the dialog.
    -   `onOpenChange: (isOpen: boolean) => void`: Callback for closing the dialog.
    -   `onConfirmDelete: () => void`: Callback triggered when the user confirms deletion.
    -   `isDeleting: boolean`: Indicates if the deletion is in progress.

## 5. Types

### DTOs (Data Transfer Objects)
The view will use the existing DTOs and Command types defined in `src/types.ts`:
-   **`FlashcardDto`**: Represents a single flashcard received from the API.
-   **`FlashcardListDto`**: Represents the paginated response from the `GET /api/flashcards` endpoint.
-   **`CreateFlashcardCommand`**: The payload for creating a flashcard (`{ front: string; back: string; }`).
-   **`UpdateFlashcardCommand`**: The payload for updating a flashcard (`{ front?: string; back?: string; }`).

### ViewModel Types
A local state type will be used within the `MyFlashcardsView` to manage the state of the modals.

```typescript
// Represents the state of the form dialog
type FormDialogState = {
  isOpen: boolean;
  mode: 'create' | 'edit';
  // The flashcard to be edited. Null for 'create' mode.
  data: FlashcardDto | null;
};

// Represents the state of the delete confirmation dialog
type DeleteDialogState = {
  isOpen: boolean;
  // The flashcard to be deleted.
  data: FlashcardDto | null;
};
```

## 6. State Management
State will be managed using a combination of React hooks (`useState` for local component state) and TanStack Query for server state.

-   **Server State (TanStack Query)**: A custom hook, `useFlashcards`, will be created to encapsulate all API interactions.
    -   It will use `useQuery` to fetch the paginated list of flashcards. The query key will include the page number and page size to ensure correct caching, e.g., `['flashcards', { page, pageSize }]`.
    -   It will expose `useMutation` instances for creating, updating, and deleting flashcards.
    -   The `onSuccess` callback for each mutation will call `queryClient.invalidateQueries({ queryKey: ['flashcards'] })` to automatically refetch the list and keep the UI synchronized with the database.
-   **Local State (`useState`)**:
    -   The `MyFlashcardsView` component will use `useState` to manage the current page number for pagination.
    -   It will also use `useState` to manage the state of the `FormDialogState` and `DeleteDialogState`, controlling which modal is open and what data it operates on.

## 7. API Integration
The `useFlashcards` custom hook will handle all communication with the API endpoints.

-   **`GET /api/flashcards`**:
    -   **Request**: Called by `useQuery` with `page` and `pageSize` as query parameters.
    -   **Response Type**: `Promise<FlashcardListDto>`
-   **`POST /api/flashcards`**:
    -   **Request**: Called by `createFlashcardMutation`.
    -   **Request Payload Type**: `CreateFlashcardCommand`
    -   **Response Type**: `Promise<FlashcardDto>`
-   **`PATCH /api/flashcards/{id}`**:
    -   **Request**: Called by `updateFlashcardMutation`.
    -   **Request Payload Type**: `{ id: string; data: UpdateFlashcardCommand }`
    -   **Response Type**: `Promise<FlashcardDto>`
-   **`DELETE /api/flashcards/{id}`**:
    -   **Request**: Called by `deleteFlashcardMutation`.
    -   **Request Payload Type**: `string` (the flashcard ID)
    -   **Response Type**: `Promise<void>`

## 8. User Interactions
-   **View Flashcards**: On load, the view fetches and displays the first page of flashcards.
-   **Navigate Pages**: Clicking pagination controls updates the page state, triggering a new API call for the corresponding page.
-   **Add Flashcard**: Clicking "Add New Flashcard" opens the `FlashcardFormDialog` in 'create' mode. Submitting the form triggers the create mutation.
-   **Edit Flashcard**: Clicking the "Edit" icon on a flashcard opens the `FlashcardFormDialog` in 'edit' mode, pre-filled with the card's data. Submitting triggers the update mutation.
-   **Delete Flashcard**: Clicking the "Delete" icon opens the `DeleteConfirmationDialog`. Confirming the action triggers the delete mutation.

## 9. Conditions and Validation
-   **Form Validation**: The `FlashcardFormDialog` will validate that the `front` and `back` fields are not empty before allowing submission. This will be implemented using a form library like `react-hook-form` with a `zod` schema that matches the `CreateFlashcardCommand` requirements.
-   **Loading States**: All buttons that trigger mutations ("Save", "Delete") will show a loading state (e.g., a spinner) and be disabled while the API request is in flight to prevent duplicate submissions.
-   **Empty State**: If the `GET /api/flashcards` call returns an empty `data` array, the `FlashcardsDisplay` component will render an "empty state" message with a call-to-action, such as "You don't have any flashcards yet. Create one!".

## 10. Error Handling
-   **Data Fetching Errors**: If the `useQuery` for fetching flashcards fails, a full-view error message will be displayed, prompting the user to try again.
-   **Mutation Errors**: If a create, update, or delete mutation fails, a toast notification will be displayed with a descriptive error message (e.g., "Failed to save flashcard"). The relevant modal will remain open so the user can retry the action.
-   **Authentication Errors**: Any `401 Unauthorized` response will be intercepted by a global API client handler, which will redirect the user to the login page.
-   **Not Found Errors**: If an update or delete action returns a `404 Not Found`, a toast will inform the user that the flashcard no longer exists, and the local cache will be invalidated to re-sync the view.

## 11. Implementation Steps
1.  **Component Scaffolding**: Create the file structure for the new view and its components: `MyFlashcardsView.tsx`, `FlashcardsDisplay.tsx`, `FlashcardFormDialog.tsx`, and `DeleteConfirmationDialog.tsx`.
2.  **State Management & API Hook**: Create the `useFlashcards` custom hook to encapsulate all TanStack Query logic for fetching, creating, updating, and deleting flashcards.
3.  **Main View Container**: Implement the `MyFlashcardsView` component. Set up state for pagination and modals. Fetch data using the `useFlashcards` hook.
4.  **Display Component**: Implement the `FlashcardsDisplay` component. Use Tailwind's responsive prefixes (`md:hidden`, `md:block`) to render the `Table` for desktop and a list of `Card`s for mobile. Pass down `onEdit` and `onDelete` props.
5.  **Create/Edit Modal**: Implement the `FlashcardFormDialog`. Set up the form using `react-hook-form` and `zod` for validation. Connect its state and submission logic to the `MyFlashcardsView` container.
6.  **Delete Confirmation Modal**: Implement the `DeleteConfirmationDialog` using shadcn/ui's `AlertDialog` and connect its state and confirmation logic to the `MyFlashcardsView` container.
7.  **Pagination**: Implement the `PaginationControls` component using shadcn/ui's `Pagination` component, and connect it to the pagination state in `MyFlashcardsView`.
8.  **Error and Loading States**: Integrate loading indicators (spinners in buttons, skeleton loaders for the table/list) and error states (toast notifications, full-view error messages) for a robust user experience.
9.  **Routing**: Add the new view to the client-side router configuration to make it accessible at `/app/flashcards`.
10. **Final Review**: Test all user stories (create, edit, delete, pagination), responsive design, and error handling scenarios.
