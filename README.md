# Dev Docker

This project will hopefully replace DevDesktop as a docker powered alternative because DevDesktop is a little too
bloated for my development needs.

Currently there is only a cli (managed by grunt) but I hope to create light weight native clients for MacOS, 
Windows and Linux.

## Install Requirements
- [Docker](https://www.docker.com/)
- [Node](https://nodejs.org/en/)
- [Git](https://git-scm.com/)
- [Grunt.js](https://gruntjs.com/)

## Usage
```bash
git clone https://github.com/asaladino/dev-docker.git
cd dev-docker
```

Install node support (ie: grunt)
```bash
npm install
```
### Before you bring up the containers
Copy `./docker/sample/.env` to the parent directory (i.e. where .gitignore is located) and change the values to your
liking.

#### Convenience Commands
```bash
grunt up # To start the docker services.
grunt down # To stop the docker services.
grunt bash # Starts bash interactive on the web server.

grunt drush-install # Installs drupal core (Note: set version in the docker-compose.yml file).
grunt drush-base-mods # Installs typical drupal modules.
grunt drush-install-mod --mod=views_json_query # Installs a specified module.
grunt drush-cache # clear drupal cache.

grunt wp-install # Installs wordpress core (Note: set version in the docker-compose.yml file).
grunt wp-base-plugins # Installs typical wordpress plugins.
grunt wp-install-plugin --plugin=akismet # Installs a specified plugin.
```

#### Helpful Docker Commands
```bash
docker ps # Lists all docker containers running.
docker exec -it {container-id/name} {command} # exec a command in the docker container
```

## Structure
- `src` is the directory for project files. Any changes update automatically.
- `database` is where MariaDB will store the database files.

## Debugging Tutorial  
**[Read Here](https://shippingdocker.com/xdebug/get-working/)**
**[Chrome Extension](https://chrome.google.com/webstore/detail/xdebug-helper/eadndfjplgieldjbigjakmdgkmoaaaoc)**

## Pantheon Integration

To bring in your pantheon project, first setup the following environment variables.
```ini
PANTHEON_ENV=dev
PANTHEON_SITE=d28468d1-56e5-4824-afa9-....
PANTHEON_DB=https://pantheon-
```

Make sure your containers are up `grunt up`. Initialize your project by checking out your source `grunt pantheon-init`.
Finally, sync your files and database with `grunt pantheon-sync`.

Note, you are responsible for source commits to pantheon, there is no command for this action.

## Acquia Integration

To bring in your Acquia project, first setup the following environment variables.
```ini
ACQUIA_ENV=dev
ACQUIA_APP=drupalappname
ACQUIA_FILE_SERVER=free-3948.devcloud.hosting.acquia.com
ACQUIA_GIT_SERVER=svn-2349.devcloud.hosting.acquia.com
```

Make sure your containers are up `grunt up`. Initialize your project by checking out your source `grunt acquia-init`.
Finally, sync your files and database with `grunt acquia-sync`.

Note, you are responsible for source commits to acquia, there is no command for this action.