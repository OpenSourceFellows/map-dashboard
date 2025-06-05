#!/bin/bash
# .devcontainer/setup.sh

# Start PostgreSQL using Docker Compose
cd /workspaces/map-dashboard

echo "Starting PostgreSQL via Docker Compose..."
docker-compose up -d

# Wait for PostgreSQL to be ready
until docker exec $(docker-compose ps -q postgres) pg_isready -U notion_user -d notion_test; do
  echo "Waiting for PostgreSQL to be ready..."
  sleep 2
done

echo "PostgreSQL is ready. Running integration tests..."

# Load environment variables and run tests
export $(grep -v '^#' .env.local | xargs)
npm run test:integration
