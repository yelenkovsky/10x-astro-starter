# 10x-cards

10x-cards is an application designed to help users quickly create and manage educational flashcard sets. It leverages LLM models to automatically generate flashcard suggestions from user-provided text, streamlining the learning process.

## Table of Contents

- [10x-cards](#10x-cards)
  - [Table of Contents](#table-of-contents)
  - [Tech Stack](#tech-stack)
    - [Frontend](#frontend)
    - [Backend](#backend)
    - [AI](#ai)
    - [CI/CD \& Hosting](#cicd--hosting)
  - [Getting Started Locally](#getting-started-locally)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Available Scripts](#available-scripts)
  - [Project Scope](#project-scope)
    - [In Scope (MVP)](#in-scope-mvp)
    - [Out of Scope (MVP)](#out-of-scope-mvp)
  - [Project Status](#project-status)
  - [License](#license)

## Tech Stack

### Frontend
- **Astro 5:** For building fast, content-focused websites.
- **React 19:** For creating interactive UI components.
- **TypeScript 5:** For strong typing and improved code quality.
- **Tailwind 4:** For utility-first CSS styling.
- **Shadcn/ui:** For a library of accessible and reusable UI components.

### Backend
- **Supabase:** A comprehensive open-source Firebase alternative.
  - **PostgreSQL:** For the database.
  - **BaaS:** SDKs for backend-as-a-service functionality.
  - **Authentication:** Built-in user management.

### AI
- **Openrouter.ai:** To integrate with various large language models (LLMs) for flashcard generation.

### CI/CD & Hosting
- **GitHub Actions:** For continuous integration and deployment pipelines.
- **DigitalOcean:** For hosting the application via Docker.

## Getting Started Locally

Follow these instructions to set up the project on your local machine.

### Prerequisites

- **Node.js:** It is recommended to use the latest LTS version.
- **Supabase CLI:** Required for managing the local database and migrations. Follow the [official installation guide](https://supabase.com/docs/guides/cli/getting-started).

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/10x-astro-starter.git
    cd 10x-astro-starter
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add the following variables. You can get these keys from your Supabase and Openrouter.ai project settings.
    ```env
    PUBLIC_SUPABASE_URL="your-supabase-project-url"
    PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
    OPENROUTER_API_KEY="your-openrouter-api-key"
    ```

4.  **Set up Supabase locally:**
    Start the Supabase services:
    ```sh
    supabase start
    ```
    This will spin up the necessary Docker containers for the database and other Supabase services.

5.  **Run database migrations:**
    Apply the database migrations to your local Supabase instance:
    ```sh
    supabase db reset
    ```

6.  **Run the development server:**
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:4321`.

## Available Scripts

The following scripts are available in the `package.json`:

- `npm run dev`: Starts the development server.
- `npm run start`: Starts the application in production mode.
- `npm run build`: Builds the application for production.
- `npm run preview`: Previews the production build locally.

## Project Scope

### In Scope (MVP)

- **AI-Powered Flashcard Generation:** Users can paste text to automatically generate flashcard suggestions.
- **Manual Flashcard Management:** Users can create, edit, and delete flashcards manually.
- **User Authentication:** Basic registration, login, and account management.
- **Spaced Repetition Integration:** A mechanism for assigning flashcards to a repetition schedule.
- **Secure Data Storage:** User data and flashcards are stored securely.

### Out of Scope (MVP)

- Advanced, custom repetition algorithms.
- Gamification features.
- Native mobile applications.
- Importing from various document formats (PDF, DOCX).
- A publicly available API.
- Sharing flashcards between users.

## Project Status

This project is currently in the **development phase**, focusing on delivering the Minimum Viable Product (MVP) as outlined in the project scope.

## License

This project is licensed under the **ISC License**. See the `LICENSE` file for more details.
