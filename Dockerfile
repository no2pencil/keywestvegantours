##FROM node:25-alpine
FROM node:24-slim AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --only production

COPY . . 

## FROM gcr.io/distroless/nodejs:22-nonroot
FROM gcr.io/distroless/nodejs24-debian12

WORKDIR /app
COPY --from=builder /app /app

COPY . . 

EXPOSE 3000

USER nonroot

CMD [ "server.js" ]
