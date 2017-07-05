#!/usr/bin/env bash

echo "Updating WordPress Stable..."
cd /var/www/html
wp core update --allow-root --version="${WP_VERSION}"

echo "Installing Plugins for ${SITE_TITLE}..."
wp plugin install --allow-root debug-bar --activate
wp plugin install --allow-root jetpack --activate
wp plugin install --allow-root regenerate-thumbnails --activate
wp plugin install --allow-root theme-check --activate

echo "Uninstalling Plugins for ${SITE_TITLE}..."
wp plugin uninstall --allow-root hello
wp plugin uninstall --allow-root akismet