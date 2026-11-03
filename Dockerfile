# syntax=docker/dockerfile:1

# Stage 1: build the Angular production bundle
FROM node:24-alpine AS build
WORKDIR /app

# Public URLs are compiled into the bundle. Changing them requires a rebuild.
ARG API_BASE_URL
ARG PAYMENT_RETURN_BASE_URL

COPY package*.json ./
RUN npm ci

COPY . .
RUN API_BASE_URL="$API_BASE_URL" PAYMENT_RETURN_BASE_URL="$PAYMENT_RETURN_BASE_URL" \
    node scripts/generate-prod-env.mjs \
 && npm run build:prod

# Stage 2: serve static output with Nginx on Railway's PORT
FROM nginx:1.27-alpine
ENV PORT=8080
# Only $PORT is substituted by the nginx image entrypoint; $uri etc. are untouched.
ENV NGINX_ENVSUBST_FILTER=^PORT$
COPY nginx.conf /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist/sagheri-fe/browser /usr/share/nginx/html/

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
