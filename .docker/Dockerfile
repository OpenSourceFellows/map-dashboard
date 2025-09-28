# Step 1: Choose a Base Image
# Using Node.js 20 on Alpine Linux for a lightweight container
FROM node:20-alpine

# Step 2: Set Working Directory
# Allow the workdir to be overridden at build time, default is /app
ARG WORKDIR=/app
WORKDIR ${WORKDIR}

# Optional: helpful tooling
RUN apk add --no-cache bash

# Step 3: Copy Application Files (for dependency caching)
# Copy only package manifests first
COPY package.json package-lock.json ${WORKDIR}/

# Step 4: Install Dependencies
RUN npm ci

# Step 5: Copy the Rest of the Source Code
# Copy everything else into /app
COPY . ${WORKDIR}/

# Step 6: Define the Command to Run the App
# Expose Vite's default dev server port
EXPOSE 5173
# Run the Vite dev server in shell form so it listens on all interfaces
CMD npm run dev -- --host 0.0.0.0 --port 5173
