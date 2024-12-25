# Stage 1: Build the React app
FROM node:18 AS build

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Ensure submodules are initialized and updated
COPY .gitmodules .gitmodules
RUN git submodule update --init --recursive

# Copy the source files
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Set up Nginx to serve the React app
FROM nginx:alpine

# Copy the React build files from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
