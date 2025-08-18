# Climate Platform Frontend

This is the frontend application for the Climate Platform, built with Next.js and React.

## Features

- 🌍 Climate dashboard and analytics
- 📊 Environmental data visualization
- 🗺️ Interactive maps with satellite imagery
- 🤖 AI-powered climate assistant
- 📱 Responsive design with dark/light mode
- 🎨 Modern UI with Tailwind CSS and Radix UI components

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Create environment file:
```bash
cp .env.local.example .env.local
```

3. Update the API base URL in `.env.local`:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

### Development

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
npm run start
```

## Project Structure

```
frontend/
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # Dashboard page
│   ├── analytics/         # Analytics page
│   ├── maps/              # Maps page
│   ├── projects/          # Projects page
│   └── ...
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── ...
├── lib/                   # Utilities and API client
│   ├── api-client.ts     # Backend API client
│   └── utils.ts          # Utility functions
├── hooks/                 # Custom React hooks
├── public/               # Static assets
└── styles/               # Global styles
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | Backend API base URL | `http://localhost:5000` |

## Dependencies

### Core
- **Next.js 15** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety

### UI
- **Tailwind CSS** - Styling
- **Radix UI** - Component primitives
- **Lucide React** - Icons
- **Recharts** - Charts and data visualization

### Maps
- **Mapbox GL** - Interactive maps

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request
