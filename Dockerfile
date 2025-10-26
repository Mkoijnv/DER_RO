FROM php:8.2-fpm-alpine

# Instalar dependências do sistema
RUN apk update && apk add --no-cache \
    git \
    curl \
    libpng-dev \
    libxml2-dev \
    zip \
    unzip \
    oniguruma-dev \
    freetype-dev \
    libjpeg-turbo-dev \
    libpng-dev \
    libzip-dev \
    netcat-openbsd \
    bash

# Instalar extensões do PHP necessárias
RUN docker-php-ext-configure gd --with-freetype --with-jpeg
RUN docker-php-ext-install \
    pdo_mysql \
    mbstring \
    exif \
    pcntl \
    bcmath \
    gd

# Instalar extensões que precisam de PECL
RUN apk add --no-cache $PHPIZE_DEPS \
    && pecl install redis \
    && docker-php-ext-enable redis

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Criar usuário para evitar problemas de permissão
RUN addgroup -g 1000 laravel && adduser -G laravel -g laravel -s /bin/sh -D laravel

# Definir diretório de trabalho
WORKDIR /var/www/html

# Copiar arquivos do projeto
COPY --chown=laravel:laravel . .

# Criar diretórios necessários com permissões corretas
RUN mkdir -p /var/www/html/storage/framework/cache \
    /var/www/html/storage/framework/sessions \
    /var/www/html/storage/framework/views \
    /var/www/html/storage/logs \
    /var/www/html/bootstrap/cache

# Ajustar permissões
RUN chown -R laravel:laravel /var/www/html \
    && chmod -R 775 /var/www/html/storage \
    && chmod -R 775 /var/www/html/bootstrap/cache

# Expor porta
EXPOSE 9000

USER laravel

CMD ["php-fpm"]