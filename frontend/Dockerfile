# Frontend Dockerfile
FROM node:20-alpine

# Install curl for healthcheck
RUN apk add --no-cache curl

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port
EXPOSE 5173

# Run development server with host binding
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
