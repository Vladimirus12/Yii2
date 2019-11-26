FROM php:7.3.2-fpm

RUN apt-get update && apt-get install -y libzip-dev zip \
<<<<<<< HEAD
    && pecl install xdebug-2.7.1 \
	&& docker-php-ext-configure zip --with-libzip \
	&& docker-php-ext-install zip mysqli pdo pdo_mysql \
	&& docker-php-ext-enable xdebug
=======
#    && pecl install xdebug-2.7.1 \
	&& docker-php-ext-configure zip --with-libzip \
	&& docker-php-ext-install zip mysqli pdo pdo_mysql \
#	&& docker-php-ext-enable xdebug
>>>>>>> remotes/origin/authorization_and_UsersController

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html