# Map Dashboard Frontend

A modern, interactive map dashboard built with React and Vite. This project provides a user-friendly interface for visualizing and interacting with geospatial data layers.

![Map Web App Preview](./public/map-dashboard-preview.png)

## Features

- Interactive map visualization with Leaflet
- Dark mode support
- Layer controls for toggling map data
- Custom UI components (Button, CheckBox)
- Responsive layout and styling
- Mock data for development and testing
- Modular component structure

## Prerequisites

- Node.js (v20 or higher recommended)
- pnpm (v9 or higher)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/OpenSourceFellows/map-dashboard.git
   cd map-dashboard
   ```
2. Install dependencies:
   ```sh
   pnpm install
   ```

## Development

Start the development server:

```sh
pnpm run dev
```

The app will be available at `http://localhost:5173` by default.

Build for production:

```sh
pnpm run build
```

Preview production build:

```sh
pnpm run preview
```

Run linter:

```sh
pnpm run lint
```

## Project Structure

```
map-dashboard/
├── public/           # Static assets
├── src/              # Source code
│   ├── components/   # UI and map components
│   │   ├── Layout/   # Header and layout components
│   │   ├── Map/      # Map-related components
│   │   └── UI/       # Reusable UI components
│   ├── data/         # Mock data
│   ├── hooks/        # Custom React hooks
│   ├── styles/       # CSS files
│   ├── types/        # TypeScript types
│   ├── utils/        # Utility functions
│   ├── App.tsx       # Main app component
│   └── main.tsx      # Entry point
├── package.json      # Project metadata and scripts
├── vite.config.ts    # Vite configuration
└── README.md         # Project documentation
```

## Tools & Libraries

- [React](https://react.dev/) – UI library
- [Vite](https://vitejs.dev/) – Fast build tool
- [TypeScript](https://www.typescriptlang.org/) – Type safety
- [Leaflet](https://leafletjs.com/) – Interactive maps
- [React Leaflet](https://react-leaflet.js.org/) – React components for Leaflet
- [ESLint](https://eslint.org/) – Linting

## Custom Components

- `Header` – App title and navigation
- `MapContainer` – Interactive Leaflet map with markers and polygons
- `LayerControls` – Toggle map layers and data types
- `MapLegend` – Map legend display
- `CheckBox` – UI checkbox component

## Additional Documentation

- [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution guidelines
- [LICENSE.md](LICENSE.md) - License information
- [docs/MAINTAINER.md](docs/MAINTAINER.md) - Maintainer guide
- [docs/QGIS_ATTRIBUTE_PRESERVATION.md](docs/QGIS_ATTRIBUTE_PRESERVATION.md) - QGIS data layer documentation
