# Brev.ly

A modern, responsive URL shortener built with React and TypeScript.

## Features

- Create and manage custom shortened URLs
- Track access analytics
- Export data as CSV
- Mobile-responsive design
- Real-time notifications

## Tech Stack

- React 19 + TypeScript
- Vite + Tailwind CSS 4
- TanStack Query + React Router 7
- Radix UI components

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build
```

Visit `http://localhost:5173` to view the application.

## Development Progress

### Core Features

- [x] Should be possible to create a link
  - [x] Should not be possible to create a link with malformed shortening
  - [x] Should not be possible to create a link with existing shortening
- [x] Should be possible to delete a link
- [x] Should be possible to get the original URL through shortening
- [x] Should be possible to list all registered URLs
- [x] Should be possible to increment the access count of a link
- [x] Should be possible to download a CSV with the links report

### UI/UX Improvements

- [x] Display validation messages
- [x] Icons and empty state/loading behaviors
- [x] Header icons and other pages
- [x] Style redirect and 404 pages
- [x] Add focus to inputs
- [x] Error toasts
- [x] Copy toasts
- [x] Disable CSV download button when list is empty
- [x] Mobile version (simple)
- [x] Fix background layout breaking on mobile
- [x] Add loader to button while disabled during download
- [x] Review inputs and error messages

### Technical Requirements

- [x] Mandatory creation of a React SPA application using Vite as bundler
- [x] Follow the Figma layout as faithfully as possible
- [x] Work with elements that provide good UX (empty state, loading icons, action blocking based on application state)
- [x] Focus on responsiveness: this application should work well on both desktops and mobile phones
