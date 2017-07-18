#!/usr/bin/env bash

# Install and configure the latest stable version of WordPress
if [[ -f "/var/tmp/database.sql.gz" ]]; then
    gunzip /var/tmp/database.sql.gz

    # Make a database, if we don't already have one
    echo -e "\nCreating database '${DB_DATABASE}' (if it's not already there)"
    mysql --host ${DB_HOST} -u root --password=${DB_ROOT_PASSWORD} -e "CREATE DATABASE IF NOT EXISTS ${DB_DATABASE}"
    echo -e "\n DB operations done.\n\n"

    mysql --host ${DB_HOST} -u root --password=${DB_ROOT_PASSWORD} ${DB_DATABASE} < /var/tmp/database.sql

    rm /var/tmp/database.sql
fi