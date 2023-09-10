# First stage: Install dependencies
FROM oven/bun:1.0 as deps

WORKDIR /app

COPY package.json bun.lockb ./

RUN bun install

# Second stage: Build the application
FROM oven/bun:1.0 as builder

WORKDIR /app

COPY . .
COPY --from=deps /app/node_modules ./node_modules

RUN bun run build

# Production image, copy all the files and run next
FROM oven/bun:1.0 AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules  
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/bun.lockb ./bun.lockb

CMD ["yarn", "start"]