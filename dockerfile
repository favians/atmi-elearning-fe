FROM node:22-alpine AS deps
# RUN apk add --no-cache libc6-compat
WORKDIR /app

RUN apk add python3
RUN apk add py3-pip
RUN apk add pkgconfig

RUN set -ex; \
    apk add --no-cache --virtual .gyp \
    # Gyp build dependencies
    python3 make g++ \
    # Canvas build dependencies
    pixman-dev cairo-dev pango-dev pkgconfig; \
    npm install canvas; \
    apk del .gyp

COPY ["package*.json","./"]
RUN npm install --force

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app ./

USER nextjs

EXPOSE 3001

ENV PORT 3001

CMD ["npm", "start"]
