# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
- `pnpm dev` - Start development server with hot reload using tsx
- `pnpm build` - Build the application using tsup
- `pnpm start` - Start production server from built files

### Testing
- `pnpm test` - Run all tests using Vitest with test environment
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:clean` - Manually clean test database (if needed)

**Test database cleanup:** Each test file automatically cleans the database before it starts via `beforeAll` hooks.

### Database Operations
- `pnpm db:generate` - Generate database migrations using Drizzle Kit
- `pnpm db:migrate` - Apply migrations to database
- `pnpm db:studio` - Open Drizzle Studio for database management
- `pnpm db:generate:test` - Generate migrations for test environment
- `pnpm db:migrate:test` - Apply migrations to test database

### Code Quality
- Uses Biome for formatting and linting (configured in `biome.json`)
- Run Biome checks with: `npx biome check .`
- Format code with: `npx biome format . --write`

## Architecture Overview

### Project Structure
This is a URL shortener service (Brev.ly) built with:
- **Fastify** - Web framework with TypeScript support via fastify-type-provider-zod
- **Drizzle ORM** - Database ORM with PostgreSQL
- **Zod** - Schema validation throughout the application
- **Vitest** - Testing framework

### Key Architectural Patterns
- **Clean Architecture**: Separated into layers with `src/app/functions/` for business logic and `src/infra/` for infrastructure
- **Either Pattern**: Uses custom Either type (`src/shared/either.ts`) for functional error handling instead of throwing exceptions
- **Route-based Organization**: HTTP routes in `src/infra/http/routes/` map directly to business functions in `src/app/functions/`

### Database Schema
Main entity is `links` table with:
- `id` (UUID v7 primary key)
- `name` (unique shortened URL identifier)
- `originalUrl` (target URL)
- `accessCounter` (tracking clicks)
- `createdAt` (timestamp)

### Environment Configuration
Environment variables are validated via Zod schema in `src/env.ts`:
- Database connection (`DATABASE_URL`)
- Cloudflare R2 storage credentials for CSV exports
- Port and NODE_ENV settings

### Core Functionality
All business logic follows the pattern: HTTP route → business function → database operation, with consistent error handling using the Either pattern. Functions return `Either<Error, SuccessType>` instead of throwing exceptions.

### Storage Integration
Uses Cloudflare R2 (S3-compatible) for CSV export file storage, configured through environment variables.