'use strict';
const envfile = require('envfile');
const ip = require('ip');
const fs = require('fs');

/**
 * Tools for syncing with acquia.
 */
module.exports = {
  /**
   * Generates the url for retrieving the git source.
   * @returns {string}
   */
  repoUrl: function () {
    let sourcePath = '.env';
    let ee = envfile.parseFileSync(sourcePath);
    return ee['ACQUIA_APP'] + '@' + ee['ACQUIA_GIT_SERVER'] + ':' + ee['ACQUIA_APP'] + '.git';
  },
  /**
   * Generates the url for getting files archive.
   * @returns {string}
   */
  filesUrl: function () {
    let sourcePath = '.env';
    let ee = envfile.parseFileSync(sourcePath);
    return ee['ACQUIA_APP'] + '.' + ee['ACQUIA_ENV'] +
        '@' + ee['ACQUIA_FILE_SERVER'] + ':~/' + ee['ACQUIA_ENV'] + '/sites/default/files/ ';
  },
  /**
   * Gets the url for the database download.
   * @returns {string}
   */
  dbUrl: function () {
    let sourcePath = '.env';
    let ee = envfile.parseFileSync(sourcePath);
    return ee['ACQUIA_APP'] + '.' + ee['ACQUIA_ENV'] +
        '@' + ee['ACQUIA_FILE_SERVER'] + ':~/' + ee['ACQUIA_ENV'] + '/backups/on-demand/$(ssh ' + ee['ACQUIA_APP'] +
        '.' + ee['ACQUIA_ENV'] + '@' + ee['ACQUIA_FILE_SERVER'] + ' \'ls -tr ~/' + ee['ACQUIA_ENV'] +
        '/backups/on-demand/ | tail -n 1\')'
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
   * Sets up the local settings for drupal.
   * @returns {string}
   */
  copySettings: function () {
    let sourceFile = './docker/apache/drupal/settings.local.php';
    let targetFile = './src/docroot/sites/default/settings.local.php';

    let settingsFile = './src/docroot/sites/default/settings.php';
    let settingsIncludeFile = './docker/apache/drupal/settings-include.php';

    fs.writeFileSync(targetFile, fs.readFileSync(sourceFile));
    fs.appendFileSync(settingsFile, fs.readFileSync(settingsIncludeFile));
    return 'echo "copied settings"';
  }
};