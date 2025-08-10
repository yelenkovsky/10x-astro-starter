# 10xRules - Tech Stack

### Frontend - Astro with React for interactive components:

- Astro 5 with focus on server-side routing
- React 18.3 for interactive components
- TypeScript 5 for better code quality and IDE support
- Tailwind CSS 4 for rapid styling
- Zustand for application state management
- Lucide React (application icons)

### Backend - Astro with Supabase as a comprehensive backend solution:

- Built-in user authentication based on JWT and Supabase Auth
- PostgreSQL database based on Supabase

### AI - Communication with models through Openrouter.ai service:

- Access to a wide range of models (OpenAI, Anthropic, Google, and many others), which will allow us to find a solution providing high efficiency and low costs

### CI/CD and Hosting:

- Github Actions for creating CI/CD pipelines
- Cloudflare Pages for hosting - `master.yml` workflow

### Testing:

- Unit tests - Vitest with React Testing Library for UI components:

  - Vitest as a modern and fast test runner optimized for Vite/Astro
  - React Testing Library for testing interactive React components
  - @testing-library/dom for testing static Astro components
  - MSW (Mock Service Worker) for mocking API in tests

- End-to-end tests - Playwright:

  - Simulation of complete user paths with better cross-browser compatibility
  - Testing key functionalities: rule creator, rule generation based on files, collection management
  - Automatic test execution as part of GitHub Actions CI/CD pipeline

- Code formatting and linting

  - ESLint for code linting
  - Prettier for code formatting

- Dependencies: `package.json`
