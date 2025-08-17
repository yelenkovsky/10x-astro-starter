# 10x-cards

A modern, AI-powered flashcard learning application that enables users to quickly create and manage educational flashcard sets using LLM models for automatic generation.

## Table of Contents

- [10x-cards](#10x-cards)
  - [Table of Contents](#table-of-contents)
  - [Project Description](#project-description)
    - [Key Features](#key-features)
  - [Tech Stack](#tech-stack)
    - [Frontend](#frontend)
    - [Backend \& Database](#backend--database)
    - [Development Tools](#development-tools)
    - [UI Components](#ui-components)
  - [Getting Started Locally](#getting-started-locally)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Available Scripts](#available-scripts)
  - [Project Scope](#project-scope)
    - [MVP Features](#mvp-features)
  - [Project Status](#project-status)
  - [License](#license)

## Project Description

10x-cards solves the problem of manually creating high-quality flashcards by leveraging AI to generate flashcard suggestions from any text input. The application reduces the time needed to create appropriate questions and answers, making effective learning methods like spaced repetition more accessible.

### Key Features
- **AI-Powered Generation**: Automatically create flashcards from text using LLM models
- **Smart Learning**: Integration with spaced repetition algorithms for effective study sessions
- **User Management**: Secure authentication and personal flashcard storage
- **Flexible Creation**: Both AI-generated and manually created flashcards
- **GDPR Compliant**: Secure data handling with user privacy controls

## Tech Stack

### Frontend
- **Astro 5** - Modern static site generator with dynamic capabilities
- **React 19** - Latest React version for interactive components
- **TypeScript 5** - Type-safe JavaScript development
- **Tailwind CSS 4** - Utility-first CSS framework

### Backend & Database
- **Supabase** - Open-source Firebase alternative with PostgreSQL
- **Real-time features** - Live data synchronization
- **Authentication** - Built-in user management
- **Database** - PostgreSQL with type-safe queries

### Development Tools
- **ESLint** - Code quality and consistency
- **Prettier** - Code formatting
- **TypeScript** - Static type checking
- **Vite** - Fast build tool (via Astro)

### UI Components
- **Shadcn/ui** - High-quality, accessible component library

## Getting Started Locally

### Prerequisites
- Node.js 18.0.0 or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd 10x-cards
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:4321`

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build the project for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint to check code quality |
| `npm run format` | Format code with Prettier |

## Project Scope

This application is designed for building a comprehensive flashcard learning platform with:

- **AI Flashcard Generation** - LLM-powered creation from text input (1000-10,000 characters)
- **User Authentication** - Secure registration, login, and account management
- **Flashcard Management** - Create, edit, delete, and organize flashcards
- **Learning Sessions** - Spaced repetition algorithm integration for effective studying
- **Data Analytics** - Track generation efficiency and user engagement
- **Privacy & Security** - GDPR-compliant data handling with user control
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Type Safety** - Full TypeScript support throughout the stack

### MVP Features
- Account registration and login
- AI-powered flashcard generation
- Manual flashcard creation and editing
- Learning sessions with repetition algorithm
- Secure data storage and user isolation
- Basic statistics and analytics

## Project Status

🚀 **Ready for Development**

The project is fully configured and ready for immediate development. All core dependencies are installed, and the development environment is set up with best practices for:

- Code quality and formatting
- Type safety
- Performance optimization
- Developer experience

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ to make learning more effective through AI-powered flashcards**