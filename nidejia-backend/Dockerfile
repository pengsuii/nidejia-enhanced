# Dockerfile untuk Laravel - Simplified for Railway
FROM php:8.2-cli-alpine

# Install dependencies
RUN apk add --no-cache \
    git \
    curl \
    libpng-dev \
    libzip-dev \
    zip \
    unzip \
    sqlite-dev \
    icu-dev \
    icu-libs

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql pdo_sqlite zip exif pcntl gd intl

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /app

# Copy composer files
COPY composer.json composer.lock ./

# Install dependencies
RUN composer install --no-dev --optimize-autoloader --no-interaction --no-scripts

# Copy application files
COPY . .

# Set permissions
RUN chmod -R 755 /app/storage \
    && chmod -R 755 /app/bootstrap/cache \
    && mkdir -p /app/database \
    && chmod -R 755 /app/database

# Create entrypoint script
COPY <<EOF /entrypoint.sh
#!/bin/sh
set -e

# Create database file if it doesn't exist
mkdir -p /app/database
touch /app/database/database.sqlite
chmod 666 /app/database/database.sqlite

# Run migrations
php artisan migrate --force || true

# Cache config and routes (non-blocking)
php artisan config:cache || true
php artisan route:cache || true

# Start Laravel development server
exec php artisan serve --host=0.0.0.0 --port=\${PORT:-8000}
EOF

RUN chmod +x /entrypoint.sh

# Expose port
EXPOSE 8000

# Run entrypoint script
CMD ["/entrypoint.sh"]

