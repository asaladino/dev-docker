FROM php:7.1.5-apache

RUN apt-get update && apt-get install -y \
        libfreetype6-dev \
        libjpeg62-turbo-dev \
        libmcrypt-dev \
        libpng12-dev \
        nodejs \
        gzip \
        npm \
        mysql-client \
        less \
        drush \
        git-core \
    && pecl install xdebug-2.5.0 \
    && docker-php-ext-enable xdebug \
    && docker-php-ext-install -j$(nproc) iconv mcrypt \
    && docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ \
    && docker-php-ext-install -j$(nproc) gd zip pdo pdo_mysql mysqli

COPY site/000-default.conf /etc/apache2/sites-available/000-default.conf

# Enable mod rewrite.
RUN a2enmod rewrite

# Composer
RUN curl -Lo /tmp/composer-setup.php https://getcomposer.org/installer \
&& curl -Lo /tmp/composer-setup.sig https://composer.github.io/installer.sig \
# Make sure we're installing what we think we're installing!
&& php -r "if (hash('SHA384', file_get_contents('/tmp/composer-setup.php')) !== trim(file_get_contents('/tmp/composer-setup.sig'))) { unlink('/tmp/composer-setup.php'); echo 'Invalid installer' . PHP_EOL; exit(1); }" \
&& php /tmp/composer-setup.php --no-ansi --install-dir=/usr/local/bin --filename=composer --snapshot \
&& rm -f /tmp/composer-setup.*

# Add PHPUnit
RUN curl -Lo /bin/phpunit https://phar.phpunit.de/phpunit.phar
RUN chmod +x /bin/phpunit

# Add WP-CLI
RUN curl -Lo /bin/wp https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
RUN chmod +x /bin/wp
RUN /bin/wp --allow-root

# Cleanup
RUN apt-get clean
RUN rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

COPY xdebug/xdebug.ini /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini

RUN mkdir /scripts
COPY drupal/drush-install.sh /scripts/drush-install.sh
RUN chmod +x /scripts/drush-install.sh

COPY drupal/drush-base-mods.sh /scripts/drush-base-mods.sh
RUN chmod +x /scripts/drush-base-mods.sh

COPY wordpress/wp-install.sh /scripts/wp-install.sh
RUN chmod +x /scripts/wp-install.sh

COPY wordpress/wp-base-plugins.sh /scripts/wp-base-plugins.sh
RUN chmod +x /scripts/wp-base-plugins.sh

COPY site/sync-db.sh /scripts/sync-db.sh
RUN chmod +x /scripts/sync-db.sh