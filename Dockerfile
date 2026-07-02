FROM node:20-alpine

WORKDIR /app

# Copy dependency definitions
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Expose Vite dev port
EXPOSE 5173

# Start Vite server
CMD ["npm", "run", "dev"]
