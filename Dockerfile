# IMPORTANT: Node.js Version Maintenance
# To ensure security and compatibility, regularly update the NODE_VERSION ARG to the latest LTS version.
ARG NODE_VERSION=24.22.1-slim

FROM node:${NODE_VERSION}

# Set working directory
WORKDIR /work

# Copy package-related files first to leverage Docker's caching mechanism
COPY package.json package-lock.json ./

# Install project dependencies with frozen lockfile for reproducible builds
RUN --mount=type=cache,target=/root/.npm \
  if [ -f package-lock.json ]; then \
    npm ci --no-audit --no-fund; \
  else \
    echo "No lockfile found." && exit 1; \
  fi

# Copy application source code
COPY . .

# Set production environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV NEXT_TELEMETRY_DISABLED=1

# Set correct permissions for working dir and app dir
RUN chown -R node:node /work
RUN mkdir /app && chown node:node /app

# Switch to non-root user for security best practices
USER node
