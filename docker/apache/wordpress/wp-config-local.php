<?php
define('DB_NAME', $_ENV['DB_DATABASE']);
define('DB_USER', 'root');
define('DB_PASSWORD', $_ENV['DB_ROOT_PASSWORD']);
define('DB_HOST', $_ENV['DB_HOST']);
define('DB_CHARSET', 'utf8');
define('DB_COLLATE', '');

define('AUTH_KEY', '{{AUTH_KEY}}');
define('SECURE_AUTH_KEY', '{{SECURE_AUTH_KEY}}');
define('LOGGED_IN_KEY', '{{LOGGED_IN_KEY}}');
define('NONCE_KEY', '{{NONCE_KEY}}');
define('AUTH_SALT', '{{AUTH_SALT}}');
define('SECURE_AUTH_SALT', '{{SECURE_AUTH_SALT}}');
define('LOGGED_IN_SALT', '{{LOGGED_IN_SALT}}');
define('NONCE_SALT', '{{NONCE_SALT}}');

$site_server = preg_replace( '#^\.#', '', $_SERVER['HTTP_HOST'] );

define( 'WP_HOME', 'http://'. $site_server );
define( 'WP_SITEURL', 'http://'. $site_server );