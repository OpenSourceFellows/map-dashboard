# Database Schema

This directory contains the database schema and migrations for the Map Dashboard application.

## Schema Overview

### Landmarks Table
- `id`: Unique identifier (UUID)
- `name`: Name of the landmark
- `latitude`: Latitude coordinate (decimal degrees)
- `longitude`: Longitude coordinate (decimal degrees)
- `acres_owned`: Total area owned in acres
- `created_at`: Timestamp of record creation
- `updated_at`: Timestamp of last update

### Campaigns Table
- `id`: Unique identifier (UUID)
- `landmark_id`: Reference to the landmark
- `species`: Species information from Notion
- `water_volume`: Water volume data from government APIs (in cubic meters)
- `canopy_density`: Canopy coverage percentage (0-100)
- `status`: Campaign status (active/inactive)
- `created_at`: Timestamp of record creation
- `updated_at`: Timestamp of last update

## Setup

1. Install PostgreSQL with PostGIS extension
2. Create a new database
3. Run the migration files in order:
   ```bash
   psql -U your_username -d your_database -f sql/migrations/001_initial_schema.sql
   ```

## Adding New Migrations

1. Create a new file in the `migrations` directory with the format `XXX_description.sql`
2. Number the files sequentially
3. Include both `up` and `down` migrations if needed
