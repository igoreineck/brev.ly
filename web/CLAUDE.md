# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `pnpm run dev` or `npm run dev`
- **Build for production**: `pnpm run build` or `npm run build` (runs TypeScript compilation then Vite build)
- **Lint code**: `pnpm run lint` or `npm run lint`
- **Preview production build**: `pnpm run preview` or `npm run preview`

Note: This project uses pnpm as the package manager (pnpm-lock.yaml present).

## Architecture Overview

This is a React SPA (Single Page Application) URL shortener built with Vite. The application follows a component-based architecture with the following key layers:

### Frontend Stack
- **React 19** with TypeScript
- **React Router 7** for client-side routing
- **TanStack Query** for data fetching and caching
- **Tailwind CSS 4** for styling with Radix UI components
- **React Hook Form + Zod** for form handling and validation
- **Axios** for HTTP requests

### Project Structure
- `src/api/` - API layer with functions for each endpoint (create-link.ts, delete-link.ts, etc.)
- `src/components/` - Reusable React components
  - `brevly.tsx` - Main app component with grid layout
  - `brevly-new-link.tsx` - Form for creating new links
  - `brevly-link-list.tsx` - List of shortened links
  - `ui/` - Shared UI components (buttons, inputs, etc.)
- `src/pages/app/` - Page components (homepage, 404, redirect)
- `src/lib/` - Utility libraries (axios config, utils)
- `src/utils/` - Utility functions

### Routing
Simple 3-route structure:
- `/` - Homepage with link creation and management
- `/:name` - Dynamic redirect route for shortened links
- `/404` - Not found page

### Key Features
- Create shortened URLs with custom names
- List all created links with access counters
- Delete links
- Export links data as CSV
- Mobile-responsive design
- Empty states and loading indicators
- Toast notifications for user feedback

### API Integration
All API calls are centralized in `src/api/` directory. The app uses a consistent pattern:
- Axios instance configured in `src/lib/axios.ts`
- Each API function exports TypeScript interfaces for request/response types
- TanStack Query handles caching and state management

### Development Notes
- Uses absolute imports with `@/` alias pointing to `src/`
- No test framework is currently configured
- Follows component-per-file structure with TypeScript strict mode
- Uses Portuguese comments in README (project requirements were in Portuguese)