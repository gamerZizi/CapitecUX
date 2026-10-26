#docker file and instructions on how to run the application

FROM node:20-alpine

WORKDIR /app

# Copy dependency files
COPY package*.json ./


# ============================================
# Stage 1: Install dependencies
# ============================================
FROM node:20-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json ./

RUN --mount=type=cache,target=/root/.npm \
    npm ci

# ============================================
# Stage 2: Build the application
# ============================================
FROM node:20-alpine AS build

WORKDIR /app

# Copy dependencies
COPY --from=deps /app/node_modules ./node_modules

# Copy package and config files
COPY package.json package-lock.json ./
COPY vite.config.ts ./
COPY tsconfig.json ./
COPY tsconfig.node.json ./
COPY tsconfig.app.json ./

# Copy source files
COPY index.html ./
COPY src ./src
COPY public ./public

# Build arguments for environment variables
ARG VITE_API_URL
ARG VITE_APP_VERSION
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_APP_VERSION=$VITE_APP_VERSION

# Build the application (outputs to dist/)
RUN npm install



EXPOSE 5173

CMD ["npm","run","dev"]

