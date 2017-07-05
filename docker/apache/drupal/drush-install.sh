#!/usr/bin/env bash

# Make a database, if we don't already have one
echo -e "\nCreating database '${DB_DATABASE}' (if it's not already there)"
mysql --host ${DB_HOST} -u root --password=${DB_ROOT_PASSWORD} -e "CREATE DATABASE IF NOT EXISTS ${DB_DATABASE}"
echo -e "\n DB operations done.\n\n"

# Install and configure the latest stable version of Drupal
cd "/var/www/html"

echo "Downloading Drupal (${DRUPAL_VERSION})..."
drush dl ${DRUPAL_VERSION}  --destination=/var/www --drupal-project-rename=html

cd "/var/www/html"

echo "Installing Drupal..."
drush site-install --db-url="mysql://root:${DB_ROOT_PASSWORD}@${DB_HOST}/${DB_DATABASE}" --site-name="${SITE_TITLE}" --account-name="${ADMIN_USERNAME}" --account-pass="${ADMIN_PASSWORD}" -y