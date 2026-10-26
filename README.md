# 🚀 React Project: Loan Calculator Eligibility From Figma to Docker

A responsive **React** loan calculator application built from **Figma designs**, containerized with **Docker**, and only built on your local.

---

## 📌 Project Overview
*   **Figma Design Blueprint:** [https://www.figma.com/make/kibbYrLaA8J6N9fyXQAUYh/Loan-Affordability-Calculator---UX?t=jhS62qDdgZN2NZ9M-20&fullscreen=1]
*   **Docker Image:** `docker pull zinhlethabethe/capitecux:latest`
  *  **Docker Image for the server:** `docker pull zinhlethabethe/capitecuxserver:latest`

---

## 🛠 Tech Stack
*   **Frontend:** React (Vite) + JavaScript
*   **Backend:** Nodejs + Express
*   **Styling:** Tailwind CSS / Styled Components (matching Figma tokens)
*   **Containerization:** Docker (single-stage builds)
*   **EndPoints:** RESTful apis
---

## 🎨 1. Figma to Code Workflow

Design to code alignment, we follow these guidelines:

### Design Tokens
We translated Figma's global styles into our codebase (`tailwind.config.js` or theme file):
*   **Typography:** Inter (Headers), Roboto (Body)
*   **Color Palette:**
    *   Primary: `#0033a0` (Figma: `Brand/Primary`)
    *   Secondary: `#3a3a3a` (Figma: `Brand/Secondary`)
*   **Spacing & Grid:** 8px base grid system.

### Component Structure
Figma frames are mapped directly to React components:
*   `Figma Layout` ➡️ `src/components/` (Header, Hero)
*   `Figma Main content/TabsView` ➡️ `src/components/` (Tabs, Content, Forms)

---

## 💻 2. Local Development Setup

### Prerequisites
Ensure you have **Node.js (v24+)** and **npm/yarn/pnpm** installed.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com
   cd CapitecUX
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

---

## 🐳 3. Docker Containerization for the frontend

We use a **single-stage Docker build** to keep our  image lean and secure. Stage 1 builds the static assets on your local.

### Dockerfile Breakdown
```dockerfile
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


```
## 🐳 4. Docker Containerization for the server

We use a **single-stage Docker build** to keep our  image lean and secure. Stage 1 builds the static assets on your local (/server) dir.

### Dockerfile Breakdown
```dockerfile
# Use a lightweight Node alpine image, matching modern frontend setups
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy dependency manifests first to leverage Docker caching layers
COPY package*.json ./

# Install only necessary production dependencies to keep the image lean
RUN npm ci --only=production

# Copy the rest of your Express application source code
COPY . .

# Expose the port your Express app listens on (change if your app uses a different port)
EXPOSE 3000

# Start the Node.js application
CMD ["npm", "start"]


```

### Build & Run Docker Locally
1. **Build the image:**
   ```bash
   docker build -t react-app:dev .
   ```
2. **Run the container:**
   ```bash
   docker run -d -p 5173:5173 --name react-app react-app:dev
   ```
3. Access the containerized application at [http://localhost:5173](http://localhost:5173).

---

## 🐙 4. GitHub Documentation 
### How to pull from GitHub Container Registry
To pull and run this production image from anywhere:
```bash
docker login ghcr.io -u YOUR_GITHUB_USERNAME
docker pull ghcr.io/zinhlethabethe/capitecuxServer:latest
docker run -d -p 3000:3000 ghcr.io/zinhlethabethe/capitecuxserver:latest
```
### Build & Run Docker for your local server
1. **Build the image:**
   ```bash
   docker build -t express-backend .
   ```
2. **Run the container:**
   ```bash
   docker run -d -p 3000:3000 --name my-express-app express-backend
   ```

---

## 🐙 4. GitHub Documentation 
### How to pull from GitHub Container Registry
To pull and run this production image from anywhere:
```bash
docker login ghcr.io -u YOUR_GITHUB_USERNAME
docker pull ghcr.io/zinhlethabethe/capitecuxServer:latest
docker run -d -p 5173:5173 ghcr.io/zinhlethabethe/capitecuxServer:latest
```

---
## 🛠 EndPoints references
*   **POST:** /api/loans/eligibility
*   **GET:** /api/loans/products
*   **POST:** api/loans/calculate-rate
*   **GET:** /api/loans/validation-rules
---
