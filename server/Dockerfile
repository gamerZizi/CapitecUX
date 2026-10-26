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
