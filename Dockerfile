# Stage 1: Build React app
FROM node:18-buster as build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for npm install
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build


# Stage 2: Serve with Nginx
FROM nginx:1.21.6-alpine

# Set the working directory inside the container for Nginx
WORKDIR /usr/share/nginx/html

# Copy the built React app from the build stage to the Nginx directory
COPY --from=build /app/build .

# Expose port 80 for the web server
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
