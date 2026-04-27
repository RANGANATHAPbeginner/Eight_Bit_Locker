# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist ./dist
# Cloud Run sets the PORT environment variable. 
# 'serve' will automatically listen on $PORT if provided.
EXPOSE 8080
CMD ["serve", "-s", "dist", "-l", "8080"]
