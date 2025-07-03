# Step 1: Build the app (optional if you're building on another machine)
# FROM node:18-alpine AS builder
# WORKDIR /app
# COPY . .
# RUN npm install && npm run build

# Step 2: Use Nginx to serve the static files
FROM nginx:alpine

# Copy Vite output from "dist" to the default Nginx folder
COPY dist/ /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
