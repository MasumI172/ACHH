# Use Node.js 20 Alpine for smaller image size
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install system dependencies for native modules
RUN apk add --no-cache python3 make g++ git

# Copy package files first for better caching
COPY package*.json ./

# Set environment variable to ensure clean installs
ENV NODE_ENV=development

# Install all dependencies (dev needed for build)
RUN npm ci --legacy-peer-deps

# Copy source code (excluding node_modules via .dockerignore)
COPY . .

# Build the application
RUN npm run build

# Clean up dev dependencies after build
RUN npm ci --omit=dev --legacy-peer-deps

# Expose port
EXPOSE $PORT

# Set production environment
ENV NODE_ENV=production

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node --version || exit 1

# Start the application
CMD ["npm", "run", "start"]