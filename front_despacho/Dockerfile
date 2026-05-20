# Build stage
FROM node:20-alpine AS build
WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .
RUN npm run build

# Production stage: serve built assets with Vite preview
FROM node:20-alpine AS runtime
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules

EXPOSE 4173
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "4173"]
