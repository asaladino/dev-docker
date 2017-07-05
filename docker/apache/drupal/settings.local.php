<?php
$databases['default']['default'] = [
  'driver'    => 'mysql',
  'database'  => $_ENV['DB_DATABASE'],
  'username'  => 'root',
  'password'  => $_ENV['DB_ROOT_PASSWORD'],
  'host'      => $_ENV['DB_HOST']
];