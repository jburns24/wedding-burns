# Multi-stage build: build static Next.js site then serve via nginx
FROM node:20-alpine AS builder
WORKDIR /app

# Pass backend URL at build time so static export can embed it
ARG NEXT_PUBLIC_BACKEND_URL=http://localhost:4000
ENV NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}

COPY package*.json ./
RUN npm install
COPY . .

# Build (next.config.js sets output: 'export')
RUN npm run build

# Runtime: nginx serving the static export
FROM nginx:alpine AS runner
COPY --from=builder /app/out /usr/share/nginx/html
# Optional: provide a minimal default index if missing (safety)
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
