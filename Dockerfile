# Stage 1: Build the React app
FROM node:18 AS build

WORKDIR /app

# Copy necessary files, including .gitmodules for submodule handling
COPY .gitmodules .gitmodules

# Ensure the `.git` directory is also copied for submodule initialization
COPY .git .git

# Initialize and update submodules
RUN git submodule update --init --recursive || echo "Skipping submodule initialization"

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the source files
COPY . /app

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
