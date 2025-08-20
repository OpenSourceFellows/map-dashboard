# Map Dashboard

A web-based dashboard for visualizing campaign, environmental, and geographic data. The project features an interactive frontend built with React and Vite, and a backend for data processing and management.

## Project Purpose

- Visualize campaign and environmental data on interactive maps.
- Provide insights using geographic and landmark data.
- Support for custom datasets and QGIS integration.

## Prerequisites

- Node.js (v16+ recommended)
- npm (v8+ recommended)
- (Optional) QGIS for working with `.qgz` files
- (Optional) Python for advanced data processing

## Setup

### 1. Clone the repository

```zsh
git clone https://github.com/OpenSourceFellows/map-dashboard.git
cd map-dashboard
```

### 2. Install frontend dependencies

```zsh
cd frontend
npm install
```

### 3. Start the frontend development server

```zsh
npm run dev
```

Visit http://localhost:5173 in your browser.

### 4. Backend setup

- Data files are in `backend/data` and `backend/images`.
- Backend scripts are in `backend/src/js/index.js`.
- Configure environment variables in `backend/.env.local` as needed.

## Features

- Interactive map dashboard UI
- Visualization of campaign and environmental data
- Landmark and species image assets
- QGIS project integration
- Modular frontend components (Vue.js)
- Vite-powered fast development

## Folder Structure

- `frontend/` — React app, UI components, assets
- `backend/` — Data files, images, QGIS project, backend scripts

## License

MIT (or specify your license)

## Contributing

Pull requests and issues are welcome!

<!-- OLD README BELOW -->

<!-- # [Hackathon Guide](https://docs.google.com/document/d/11nFkKL7Rdhak7AVNIKkiDl1Cfle-VXqzvsP37AH6ddE/edit?usp=sharing)

<div align="center">
   <h1>Map Dashboard Web Application</h1>
   <p>
      This repository houses the source code for the Map Dashboard data visualization web application project. It uses
      <a href="https://vuejs.org/"><strong>Vue 3</strong></a>
      and
      <a href="https://vuetifyjs.com/en/"><strong>Vuetify</strong></a>.
   </p>
</div>

## Recommended IDE Setup

We **highly** recommend [VS Code](https://code.visualstudio.com/) for its great plugins. The project is also setup for auto-linting with VSCode on file save! You'll need at least the [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) plugin. Once you open the source code in VSCode, some other convenient plugins should also be recommended to you.

# Features & Implementation Details

## Important Links

This project currently uses Tableau to format geospatial input data. Tableau has an extensive library of [tutorials](https://www.tableau.com/resources) and [API documentation](https://www.tableau.com/developer/tools?category=19921).

## Features

The Map Dashboard will display 3 types of map data:

1. Base map using our data from Notion
2. Water department polygons showing water volume (gradient of blue shades)
3. Canopy density (using transparency layer or classified zones; gradient of green shades)

There are 2 types of map marker pins; pins can be grouped or clustered:

1. Plants: green pins
2. Animals: red pins

Users can hover over marker pins and map data to view a tooltip that displays any of the following information:

1. Name of the animal or plant
2. Water volume
3. Canopy cover

Users can filter the map by:

- Animal vs plant
- Water volume
- Canopy density

## Architecture

| Component           | Technology                      |
| ------------------- | ------------------------------- |
| Notion Database     | Notion API                      |
| PostgresSQL Storage | Postgres + Post GIS (optiona)   |
| Visualization       | Tableau (Desktop/Server/Cloud)  |
| Automation          | GitHub Actions, Cron jobs       |
| Water Data          | Shapefiles/CSVs into Postgres   |
| Canopy Data         | Meta Canopy Map GeoTIFF/GeoJSON | -->
