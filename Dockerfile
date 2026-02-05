FROM oven/bun:1 AS development

WORKDIR /app

COPY package*.json bun.lock ./

RUN bun install

COPY . .

ENV CHOKIDAR_USEPOLLING=true
ENV WATCHPACK_POLLING=true

EXPOSE 5173
EXPOSE 9229 

# Dev сервер Vite с поддержкой хоста
CMD ["bun", "run", "dev", "--host", "0.0.0.0"]


FROM development AS builder

# Production сборка
RUN bun run build


FROM nginx:alpine AS production

# Копируем конфигурацию nginx (создайте nginx.conf)
COPY nginx.conf /etc/nginx/nginx.conf

# Копируем собранное приложение
COPY --from=builder /app/dist /usr/share/nginx/html

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
