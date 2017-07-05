#!/usr/bin/env bash

# Based on https://www.linode.com/docs/websites/cms/install-wordpress-using-wp-cli-on-ubuntu-14-04

# Make a database, if we don't already have one
echo -e "\nCreating database '${DB_DATABASE}' (if it's not already there)"
mysql --host "${DB_HOST}" -u root --password="${DB_ROOT_PASSWORD}" -e "CREATE DATABASE IF NOT EXISTS ${DB_DATABASE}"
echo -e "\n DB operations done.\n\n"

# Install and configure the latest stable version of WordPress
if [[ ! -f "/var/www/html/wp-load.php" ]]; then
    echo "Downloading WordPress..."
	wp core download --allow-root --version="${WP_VERSION}"
fi

if [[ ! -f "/var/www/html/wp-config.php" ]]; then
  echo "Configuring WordPress Stable..."
  wp core config --allow-root --dbname="${DB_DATABASE}" --dbuser=root --dbhost="${DB_HOST}" --dbpass="${DB_ROOT_PASSWORD}" --quiet --extra-php <<PHP
define( 'WP_DEBUG', true );
define( 'WP_DEBUG_DISPLAY', false );
define( 'WP_DEBUG_LOG', true );
define( 'SCRIPT_DEBUG', true );
define( 'JETPACK_DEV_DEBUG', true );
PHP
fi

if ! $(wp core is-installed --allow-root); then
  echo "Installing WordPress Stable..."

  if [ "${WP_TYPE}" = "subdomain" ]; then
    INSTALL_COMMAND="multisite-install --subdomains"
  elif [ "${WP_TYPE}" = "subdirectory" ]; then
    INSTALL_COMMAND="multisite-install"
  else
    INSTALL_COMMAND="install"
  fi

  wp core install --allow-root --url="http://${SITE_DOMAIN}" --title="${SITE_TITLE}" --admin_name="${ADMIN_USERNAME}" --admin_email="${ADMIN_EMAIL}" --admin_password="${ADMIN_PASSWORD}"
fi