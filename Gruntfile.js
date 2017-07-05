let ipEnv = require('./docker/support/ip/ip');
let pantheon = require('./docker/support/hosts/pantheon');
let acquia = require('./docker/support/hosts/acquia');

module.exports = function (grunt) {

  // Project configuration.
  // noinspection Annotator
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    exec: {
      /*wp_git_plugins: {
        cwd: './src/wp-content/plugins/',
        cmd: 'git clone git@some-wp-plugin-repo.git;' +
        'git clone git@some-wp-plugin-repo.git;'
      },*/
      env_ip: {
        cmd: function () {
          ipEnv();
          return 'echo "ip.env created"';
        }
      },
      pantheon_db: {
        cmd: function () {
          let url = pantheon.dbUrl();
          return 'curl "' + url + '" -o database.sql.gz;' +
              'gunzip database.sql.gz;' +
              pantheon.createLocalDb() + ';' +
              pantheon.importToLocalDb() + ';' +
              'rm database.sql';
        }
      },
      pantheon_files: {
        cmd: function () {
          let url = pantheon.filesUrl();
          if (pantheon.isWordpress()) {
            return 'rsync -rlvz --size-only --ipv4 --progress -e \'ssh -p 2222\' ' + url + ' src/wp-content/uploads';
          }
          return 'rsync -rlvz --size-only --ipv4 --progress -e \'ssh -p 2222\' ' + url + ' src/sites/default/files';
        }
      },
      pantheon_git: {
        cmd: function () {
          let url = pantheon.repoUrl();
          return 'git clone ' + url + ' src';
        }
      },
      pantheon_settings: {
        cmd: function () {
          pantheon.copySettings();
          if (pantheon.isWordpress()) {
            return 'mkdir src/wp-content/uploads;';
          }
          return 'mkdir src/sites/default/files;';
        }
      },
      acquia_db: {
        cmd: function () {
          let url = acquia.dbUrl();
          return 'scp -r  "' + url + '" database.sql.gz;' +
              'gunzip database.sql.gz;' +
              acquia.createLocalDb() + ';' +
              acquia.importToLocalDb() + ';' +
              'rm database.sql';
        }
      },
      acquia_files: {
        cmd: function () {
          let url = acquia.filesUrl();
          return 'rsync -rlvz --size-only --ipv4 --progress -e \'ssh\' ' + url + ' src/docroot/sites/default/files';
        }
      },
      acquia_git: {
        cmd: function () {
          return 'git clone ' + acquia.repoUrl() + ' src';
        }
      },
      acquia_settings: {
        cmd: function () {
          acquia.copySettings();
          return 'mkdir src/docroot/sites/default/files;';
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-docker-compose');
  grunt.loadNpmTasks('grunt-exec');

  // Docker tasks.
  grunt.registerTask('up', ['exec:env_ip', 'dockerCompose:up']);
  grunt.registerTask('down', ['dockerCompose:down']);
  grunt.registerTask('bash', ['dockerCompose:exec:apache:bash']);

  // Drupal tasks.
  grunt.registerTask('drush-install', ['dockerCompose:exec:apache:/scripts/drush-install.sh']);
  grunt.registerTask('drush-base-mods', ['dockerCompose:exec:apache:/scripts/drush-base-mods.sh']);
  // noinspection Annotator
  let module = grunt.option('mod');
  if (module) {
    grunt.registerTask('drush-install-mod', [
      'dockerCompose:exec:apache:bash -c "cd /var/www/html"',
      'dockerCompose:exec:apache:drush en ' + module + ' -y'
    ]);
  }

  grunt.registerTask('drush-cache', [
    'dockerCompose:exec:apache:bash -c "cd /var/www/html"',
    'dockerCompose:exec:apache:drush cache-clear all'
  ]);

  // Wordpress tasks.
  grunt.registerTask('wp-install', ['dockerCompose:exec:apache:/scripts/wp-install.sh']);
  grunt.registerTask('wp-base-plugins', [
    'dockerCompose:exec:apache:/scripts/wp-base-plugins.sh',
    //'exec:wp_git_plugins'
  ]);

  // noinspection Annotator
  let plugin = grunt.option('plugin');
  if (plugin) {
    grunt.registerTask('wp-install-plugin', [
      'dockerCompose:exec:apache:bash -c "cd /var/www/html"',
      'dockerCompose:exec:apache:wp plugin install --allow-root ' + plugin
    ]);
  }

  // Pantheon
  grunt.registerTask('pantheon-init', ['exec:pantheon_git', 'exec:pantheon_settings']);
  grunt.registerTask('pantheon-sync', ['exec:pantheon_db']);

  // Acquia
  grunt.registerTask('acquia-init', ['exec:acquia_git', 'exec:acquia_settings']);
  grunt.registerTask('acquia-sync', ['exec:acquia_db']);
};