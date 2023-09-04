# Stage 1: Build the frontend
FROM node:alpine AS build
WORKDIR /frontend

# Copy package.json and install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install

# Copy the rest of the application files and build
COPY . .
RUN npm run build

# Stage 2: Serve the frontend
FROM nginx:alpine
COPY --from=build /frontend/build /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
