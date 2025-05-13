
<?php
// Configuración de la base de datos MySQL
define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', '');
define('DB_NAME', 'malabocar');

// Intentar conectar a la base de datos MySQL
$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

// Verificar la conexión
if ($conn === false) {
  die("ERROR: No se pudo conectar. " . mysqli_connect_error());
}

// Establecer charset
mysqli_set_charset($conn, "utf8mb4");
?>
