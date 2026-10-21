# Stage 1: Build the React app
FROM node:22-alpine AS build

# Install pnpm v9 globally (matches lockfile version)
RUN npm install -g pnpm@9

# Set working directory
WORKDIR /app

# Copy package.json and pnpm lock file
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN pnpm exec vite build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Copy Nginx conf
COPY docker-resources/nginx-server.conf /etc/nginx/conf.d/default.conf

# Remove default Nginx website files
RUN rm -rf /usr/share/nginx/html/*

# Copy built files from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html
# Expose port 80 (standard pour Nginx)
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]