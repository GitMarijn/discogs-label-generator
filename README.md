# Discogs Label App

A React application for managing and viewing Discogs release information. Enter a Discogs release URL to fetch release details and pricing data from the Discogs API.

## Features

- Extract release information from Discogs URLs
- Fetch release details (year, artist, title, styles) from the Discogs API
- View marketplace pricing suggestions
- Form-based release data management with validation

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Mantine** - UI component library
- **React Router** - Client-side routing
- **TanStack Query** - Data fetching and caching
- **Zod** - Schema validation

## Prerequisites

- Node.js (v18 or higher)
- pnpm (package manager)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd discogs-label-app
```

2. Install dependencies:

```bash
pnpm install
```

3. Create a `.env` file in the root directory:

```env
VITE_DISCOGS_TOKEN=your_discogs_token_here
```

To get a Discogs API token:

- Visit https://www.discogs.com/settings/developers
- Generate a new personal access token
- Copy the token to your `.env` file

## Development

Start the development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`.

## Build

Build for production:

```bash
pnpm build
```

Preview the production build:

```bash
pnpm preview
```

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm lint` - Run ESLint
- `pnpm preview` - Preview production build

## Project Structure

```
src/
  ├── api/
  │   └── discogs.ts          # Discogs API integration
  ├── components/
  │   ├── Header.tsx          # Application header
  │   └── LoadingSpinner.tsx  # Loading indicator
  ├── pages/
  │   ├── Home.tsx            # Home page with URL input
  │   ├── Details.tsx         # Release details page
  │   └── Confirm.tsx         # Confirmation page
  ├── schemas/
  │   └── release.ts          # Zod validation schemas
  ├── App.tsx                 # Main app component
  └── main.tsx                # Application entry point
```

## Usage

1. Navigate to the home page
2. Paste a Discogs release URL (e.g., `https://www.discogs.com/release/123456-Artist-Title`)
3. Click "Find release" to view details and pricing information

## Environment Variables

- `VITE_DISCOGS_TOKEN` - Your Discogs API personal access token (required for pricing data)

## License

Private project
