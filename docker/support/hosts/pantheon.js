'use strict';
const envfile = require('envfile');
const ip = require('ip');
const fs = require('fs');

/**
 * Tools for syncing with pantheon.
 */
module.exports = {
    /**
     * Generates the url for retrieving the git source.
     * @returns {string}
     */
    repoUrl: function () {
        let sourcePath = '.env';
        let ee = envfile.parseFileSync(sourcePath);
        return 'ssh://codeserver.' + ee['PANTHEON_ENV'] + '.' + ee['PANTHEON_SITE'] +
            '@codeserver.' + ee['PANTHEON_ENV'] + '.' + ee['PANTHEON_SITE'] +
            '.drush.in:2222/~/repository.git';
    },
    /**
     * Generates the url for getting files archive.
     * @returns {string}
     */
    filesUrl: function () {
        let sourcePath = '.env';
        let ee = envfile.parseFileSync(sourcePath);
        return ee['PANTHEON_ENV'] + '.' + ee['PANTHEON_SITE'] +
            '@appserver.' + ee['PANTHEON_ENV'] + '.' + ee['PANTHEON_SITE'] +
            '.drush.in:files/';
    },
    /**
     * Gets the url for the database download.
     * @returns {string}
     */
    dbUrl: function () {
        let sourcePath = '.env';
        let ee = envfile.parseFileSync(sourcePath);
        return ee['PANTHEON_DB'];
    },
    /**
     * Get the db file download location.
     * @returns {string}
     */
    dbFileLocation: function () {
        let sourcePath = '.env';
        let ee = envfile.parseFileSync(sourcePath);
        return ee['TMP_DIR'] + '/database.sql.gz';
    },
    /**
     * Generates the MySql command for accessing the local db.
     * @returns {string}
     */
    mySqlClientCmd: function () {
        let sourcePath = '.env';
        let ee = envfile.parseFileSync(sourcePath);
        return 'mysql --host="' + ip.address() + '" ' +
            '--port="' + ee['SQL_CLIENT_PORT'] + '" ' +
            '-u root ' +
            '--password="' + ee['DB_ROOT_PASSWORD'] + '" ';
    },
    /**
     * Creates command to create a database in the local db server.
     * @returns {string}
     */
    createLocalDb: function () {
        let sourcePath = '.env';
        let ee = envfile.parseFileSync(sourcePath);
        let cmd = this.mySqlClientCmd();
        return cmd + ' -e "DROP DATABASE ' + ee['DB_DATABASE'] + ';' +
            'CREATE DATABASE IF NOT EXISTS ' + ee['DB_DATABASE'] + '"';
    },
    /**
     * Creates command to import database.sql into the local database.
     * @returns {string}
     */
    importToLocalDb: function () {
        let sourcePath = '.env';
        let ee = envfile.parseFileSync(sourcePath);
        let cmd = this.mySqlClientCmd();
        return cmd + ' ' + ee['DB_DATABASE'] + ' < database.sql';
    },
    /**
     * Check if wordpress is running.
     * @returns {boolean}
     */
    isWordpress: function () {
        return fs.existsSync('./src/wp-admin');
    },
    /**
     * Sets up the local settings for drupal or wordpress
     * @returns {string}
     */
    copySettings: function () {
        if (this.isWordpress()) {
            let sourceFile = './docker/apache/wordpress/wp-config-local.php';
            let targetFile = './src/wp-config-local.php';
            fs.writeFileSync(targetFile, fs.readFileSync(sourceFile));
        } else {
            let sourceFile = './docker/apache/drupal/settings.local.php';
            let targetFile = './src/sites/default/settings.local.php';

            let settingsFile = './src/sites/default/settings.php';
            let settingsIncludeFile = './docker/apache/drupal/settings-include.php';
            fs.writeFileSync(targetFile, fs.readFileSync(sourceFile));
            fs.appendFileSync(settingsFile, fs.readFileSync(settingsIncludeFile));
        }
        return 'echo "copied settings"';
    }
};