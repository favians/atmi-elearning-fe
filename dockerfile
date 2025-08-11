FROM node:22-alpine AS deps
RUN apk add --no-cache libc6-compat
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
RUN npm install --legacy-peer-deps --production
RUN npm install --legacy-peer-deps swiper@11.1.12 tailwindcss@3.4.3 postcss@8.4.38 autoprefixer@10.4.19

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm install --legacy-peer-deps --production
RUN npm install --legacy-peer-deps swiper@11.1.12 tailwindcss@3.4.3 postcss@8.4.38 autoprefixer@10.4.19

RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./

USER nextjs

EXPOSE 3001

ENV PORT 3001

CMD ["npm", "start"]
