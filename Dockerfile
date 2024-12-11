# Stage 1: Build React app
FROM node:18 as build

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

FROM nginx:1.21.6-alpine

# Set the working directory inside the container for Nginx
WORKDIR /usr/share/nginx/html

# Copy the built React app from the build stage to the Nginx directory
COPY --from=build /app/build .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
