# Brev.ly

A modern, full-stack URL shortener application built with React and Node.js, following clean architecture principles.

## Architecture Overview

Brev.ly is organized as a monorepo containing two main applications that work together to provide a complete URL shortening service:

- **Frontend (web/)**: React SPA for user interaction
- **Backend (server/)**: Node.js API for business logic and data persistence

```
brev_ly/
├── web/          # React frontend application
└── server/       # Node.js backend API
```

## Web Application (`web/`)

### Overview

A modern, responsive React SPA built with TypeScript that provides the user interface for creating, managing, and tracking shortened URLs.

### Architecture Pattern

- **Component-based architecture** with clear separation between UI, API layer, and routing
- **API integration layer** with centralized HTTP client configuration
- **Type-safe development** with TypeScript and Zod validation

### Key Features

- Create shortened URLs with custom names
- List and manage all created links with access tracking
- Export link data as CSV files
- Mobile-responsive design with empty states and loading indicators
- Real-time toast notifications for user feedback
- Dynamic redirect handling for shortened URLs

## Server Application (`server/`)

### Overview

A robust Node.js API service following Clean Architecture principles, designed for scalability and maintainability.

### Architecture Pattern

- **Clean Architecture**: Business logic separated from infrastructure concerns
- **Either Pattern**: Functional error handling instead of exceptions
- **Dependency Injection**: Database and external services properly injected
- **Type Safety**: Full TypeScript with runtime validation via Zod

### API Endpoints

- **Link Management**: Create, read, delete, and list shortened URLs
- **Analytics**: Track and increment link access counters
- **Data Export**: Generate and serve CSV reports via cloud storage
- **Documentation**: Auto-generated Swagger/OpenAPI documentation

### Key Features

- Prevents duplicate shortened URLs with validation
- Tracks link access analytics
- Exports comprehensive CSV reports to cloud storage
- UUID v7 for efficient primary keys
- Comprehensive test coverage with database isolation

## Technology Stack Summary

### Frontend

- React 19, TypeScript, Vite, Tailwind CSS 4
- TanStack Query, React Router 7, Radix UI
- React Hook Form, Zod, Axios

### Backend

- Node.js, TypeScript, Fastify, PostgreSQL
- Drizzle ORM, Vitest, Cloudflare R2
- Zod validation, UUID v7, Clean Architecture

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (package manager)
- Docker & Docker Compose (for PostgreSQL)

### Quick Setup

1. **Clone the repository**

   ```bash
   git clone <repository>
   cd brev_ly
   ```

2. **Install dependencies**

   ```bash
   # Install both web and server dependencies
   cd web && pnpm install
   cd ../server && pnpm install
   ```

3. **Start the backend**

   ```bash
   cd server
   docker-compose up -d  # Start PostgreSQL
   cp .env.example .env  # Configure environment
   pnpm db:migrate       # Run database migrations
   pnpm dev              # Start API server (localhost:3333)
   ```

4. **Start the frontend**
   ```bash
   cd web
   pnpm dev              # Start development server (localhost:5173)
   ```

## Development

### Backend Development

- API documentation available at `http://localhost:3333/documentation`
- Database management via Drizzle Studio: `pnpm db:studio`
- Run tests with automatic database cleanup: `pnpm test`

### Frontend Development

- Hot module replacement for fast development
- TypeScript strict mode with path aliases (`@/` → `src/`)
- Responsive design testing across device sizes

## Core Features

- ✅ Create and validate shortened URLs with custom names
- ✅ Prevent duplicate shortened URLs
- ✅ Delete and manage existing links
- ✅ Track link access analytics
- ✅ List all registered URLs with pagination
- ✅ Export comprehensive CSV reports
- ✅ Mobile-responsive user interface
- ✅ Real-time notifications and loading states
- ✅ Dynamic redirect handling and 404 pages
