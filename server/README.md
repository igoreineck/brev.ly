# Brev.ly Server

A URL shortener service built with modern TypeScript, following Clean Architecture principles.

## 🏗️ Architecture

### Technology Stack

- **Runtime**: Node.js with TypeScript
- **Web Framework**: Fastify with Zod type validation
- **Database**: PostgreSQL with Drizzle ORM
- **Testing**: Vitest with isolated test database
- **File Storage**: Cloudflare R2 (S3-compatible) for CSV exports
- **Build Tool**: tsup for fast ESM builds

### Project Structure

```
src/
├── app/functions/          # Business logic layer
│   ├── create-link.ts      # Core business functions
│   ├── get-links.ts
│   └── *.spec.ts          # Unit tests
├── infra/                 # Infrastructure layer
│   ├── db/                # Database configuration & schemas
│   ├── http/              # HTTP server & routes
│   └── storage/           # File storage (Cloudflare R2)
├── shared/                # Shared utilities
│   └── either.ts          # Functional error handling
└── test/                  # Test utilities & factories
```

### Key Design Patterns

- **Clean Architecture**: Business logic separated from infrastructure
- **Either Pattern**: Functional error handling instead of exceptions
- **Dependency Injection**: Database and external services injected
- **Type Safety**: Full TypeScript with Zod schema validation

## 🚀 Development

### Prerequisites

- Node.js 18+
- Docker & Docker Compose (for PostgreSQL)
- pnpm package manager

### Getting Started

1. **Clone and install dependencies:**

   ```bash
   git clone <repository>
   cd server
   pnpm install
   ```

2. **Start development database:**

   ```bash
   docker-compose up -d
   ```

3. **Set up environment files:**

   ```bash
   cp .env.example .env
   cp .env.test.example .env.test
   ```

4. **Run database migrations:**

   ```bash
   pnpm db:migrate
   pnpm db:migrate:test
   ```

5. **Start development server:**
   ```bash
   pnpm dev
   ```

### Available Commands

#### Core Development

- `pnpm dev` - Start development server with hot reload
- `pnpm build` - Build for production
- `pnpm start` - Start production server

#### Testing

- `pnpm test` - Run all tests (automatic database cleanup)
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:clean` - Manually clean test database

#### Database Operations

- `pnpm db:generate` - Generate new migrations
- `pnpm db:migrate` - Apply migrations to development database
- `pnpm db:studio` - Open Drizzle Studio (database GUI)
- `pnpm db:migrate:test` - Apply migrations to test database

#### Code Quality

- `npx biome check .` - Run linting and formatting checks
- `npx biome format . --write` - Auto-format code

## 📡 API Endpoints

### Links Management

- `GET /links` - List all shortened URLs with pagination
- `GET /links/:name` - Get original URL by shortened name
- `POST /links` - Create new shortened URL
- `DELETE /links/:id` - Delete a shortened URL
- `POST /links/:id/increment-counter` - Track link access

### Data Export

- `POST /links/export` - Export links to CSV file on Cloudflare R2

### API Documentation

When running the development server, visit:

- **Swagger UI**: `http://localhost:3333/documentation`
- **OpenAPI JSON**: `http://localhost:3333/documentation/json`

## 🔧 Configuration

### Environment Variables

```bash
# Server
PORT=3333
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/brevly

# Cloudflare R2 Storage
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_ACCESS_KEY_ID=your_access_key
CLOUDFLARE_SECRET_ACCESS_KEY=your_secret_key
CLOUDFLARE_BUCKET=brevly-exports
CLOUDFLARE_PUBLIC_URL=https://your-bucket.r2.dev
```

## 📦 Production Deployment

1. **Build the application:**

   ```bash
   pnpm build
   ```

2. **Run production server:**

   ```bash
   pnpm start
   ```

3. **Health check:**
   ```bash
   curl http://localhost:3333/health
   ```

## 🔗 External Services

### Cloudflare R2

Used for storing CSV export files with CDN access:

- **Purpose**: Scalable file storage for data exports
- **Configuration**: S3-compatible API
- **Access**: Public URLs for downloaded files

---

## 📋 Project TODOs

### ✅ Completed Features

- [x] Create shortened links with validation
- [x] Prevent duplicate short URLs
- [x] Delete existing links
- [x] Retrieve original URL by short name
- [x] List all registered URLs
- [x] Track link access counter
- [x] Export links to CSV format
- [x] CDN access via Cloudflare R2
- [x] Generate unique random filenames
- [x] Optimized database queries for performance
- [x] CSV includes: original URL, short URL, access count, creation date
