# Stage 1: Build the React app
FROM node:18-alpine AS build

# Install pnpm globally
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy package.json and pnpm lock file
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN pnpm run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Copy Nginx configuration
COPY docker-resources/nginx.conf /etc/nginx/nginx.conf
COPY docker-resources/nginx-server.conf /etc/nginx/conf.d/default.conf

# Remove default Nginx website files
RUN rm -rf /usr/share/nginx/html/*

# Copy built files from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 8080 (if needed based on your Nginx configuration)
EXPOSE 8080

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]