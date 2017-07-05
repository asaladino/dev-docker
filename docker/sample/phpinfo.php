<?php
/**
 * Move this file into the src folder to see information about php.
 */
?>
    <h2>apache</h2>
    <table>
        <tbody>
        <tr>
            <th>$_SERVER['HTTP_X_FORWARDED_FOR']</th>
            <td><?= $_SERVER['HTTP_X_FORWARDED_FOR'] ?></td>
        </tr>
        <tr>
            <th>$_SERVER['REMOTE_ADDR']</th>
            <td><?= $_SERVER['REMOTE_ADDR'] ?></td>
        </tr>
        </tbody>
    </table>
    <h2>environment variables</h2>
    <table>
        <tbody>
        <tr>
            <th>$_ENV['DB_HOST']</th>
            <td><?= $_ENV['DB_HOST'] ?></td>
        </tr>
        <tr>
            <th>$_ENV['XDEBUG_IDEKEY']</th>
            <td><?= $_ENV['XDEBUG_IDEKEY'] ?></td>
        </tr>
        <tr>
            <th>$_ENV['ADMIN_EMAIL']</th>
            <td><?= $_ENV['ADMIN_EMAIL'] ?></td>
        </tr>
        </tbody>
    </table>
    <hr/>
<?php
$host = $_ENV['DB_HOST'];
$db = $_ENV['DB_DATABASE'];
$user = 'root';
$pass = $_ENV['DB_ROOT_PASSWORD'];
$charset = 'utf8';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$opt = [
  PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
  PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
  PDO::ATTR_EMULATE_PREPARES => false,
];
$pdo = new PDO($dsn, $user, $pass, $opt);

$stmt = $pdo->query('SELECT NOW() as NOW');
while ($row = $stmt->fetch()) {
  echo 'MariaDB time: ' . $row['NOW'] . "\n";
}
phpinfo();