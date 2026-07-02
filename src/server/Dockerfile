FROM node:20-alpine

WORKDIR /app

# Copy dependency definitions
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the server files
COPY . .

# Expose Express server port
EXPOSE 3000

# Start Express server
CMD ["node", "routerMain.js"]
