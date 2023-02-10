# Use NodeJS image to build application.
FROM node:16-alpine as builder

# Use /app directory to build application.
WORKDIR /app

# Copy source files.
COPY . .

# Install dependencies.
RUN cd NeobyteCMS && npm ci --legacy-peer-deps

# Build static application.
RUN cd NeobyteCMS && npm run build

# Use Nginx image to serve application.
FROM nginx:1.21.0-alpine as production

# Run application in production.
ENV NODE_ENV production

# Import previously build static application.
COPY --from=builder /app/NeobyteCMS/dist/neobyte-cms /usr/share/nginx/html

# Import Nginx configuration.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Open port 80.
EXPOSE 80

# Run Nginx in foreground.
CMD ["nginx", "-g", "daemon off;"]