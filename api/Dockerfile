FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    libpq-dev \
    libzip-dev \
    unzip \
    git \
    curl \
    && docker-php-ext-install pdo pdo_mysql zip

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html
COPY . .

RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

RUN composer self-update && composer clear-cache
RUN composer install --optimize-autoloader --no-plugins --no-scripts --no-dev && composer dump

EXPOSE 8000
CMD php artisan serve --host=0.0.0.0 --port=8000
