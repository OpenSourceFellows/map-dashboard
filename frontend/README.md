# Map Dashboard Frontend

A modern, interactive map dashboard built with React and Vite. This project provides a user-friendly interface for visualizing and interacting with geospatial data layers.

![Map Web App Preview](./public/map-preview.png)

## Features

- Interactive map visualization (placeholder, ready for integration)
- Layer controls for toggling map data
- Custom UI components (Button, CheckBox)
- Responsive layout and styling
- Mock data for development and testing
- Modular component structure

## Prerequisites

- Node.js (v18 or higher recommended)
- npm (v9 or higher)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/OpenSourceFellows/map-dashboard.git
   cd map-dashboard/frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

## Development

To start the development server:

```sh
npm run dev
```

The app will be available at `http://localhost:5173` by default.

## Project Structure

```
frontend/
├── public/           # Static assets
├── src/              # Source code
│   ├── components/   # UI and map components
│   ├── data/         # Mock data
│   ├── hooks/        # Custom React hooks
│   ├── styles/       # CSS files
│   ├── types/        # TypeScript types
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
- [ESLint](https://eslint.org/) – Linting

## Custom Components

- `Header` – App title and navigation
- `MapContainer` – Map area and controls
- `LayerControls` – Toggle map layers
- `MapLegend` – Map legend
- `Button` & `CheckBox` – UI elements

## How to Contribute

1. Clone the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push to your branch and open a pull request

## License

This project is open source and available under the MIT License.
