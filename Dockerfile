FROM node:24-slim AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --only production

COPY . .

FROM gcr.io/distroless/nodejs24-debian12

WORKDIR /app
COPY --from=builder /app /app

COPY . .

EXPOSE 3000

USER nonroot

CMD [ "index.js" ]

