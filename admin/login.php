
<?php
session_start();
require_once '../includes/db_config.php';

$error_message = '';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = mysqli_real_escape_string($conn, $_POST['username']);
    $password = $_POST['password'];
    
    // Consultar la base de datos para el usuario
    $sql = "SELECT * FROM admins WHERE username = '$username'";
    $result = mysqli_query($conn, $sql);
    
    if (mysqli_num_rows($result) == 1) {
        $row = mysqli_fetch_assoc($result);
        
        // Verificar la contraseña (en producción debería ser con password_verify)
        if ($password == $row['password']) { // En producción: password_verify($password, $row['password'])
            // Autenticación exitosa
            $_SESSION['admin_logged_in'] = true;
            $_SESSION['admin_id'] = $row['id'];
            $_SESSION['admin_username'] = $row['username'];
            $_SESSION['admin_name'] = $row['name'];
            
            // Actualizar último login
            $update_sql = "UPDATE admins SET last_login = NOW() WHERE id = " . $row['id'];
            mysqli_query($conn, $update_sql);
            
            // Redireccionar al dashboard
            header("location: dashboard.php");
            exit;
        } else {
            $error_message = "¡La contraseña es incorrecta!";
        }
    } else {
        $error_message = "¡Usuario no encontrado!";
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login - MalaboCar</title>
    <link rel="stylesheet" href="../assets/css/admin.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body>
    <div class="admin-container">
        <div class="admin-login-form">
            <div class="admin-logo">
                <h1>MalaboCar</h1>
                <p>Panel de Administración</p>
            </div>
            
            <?php if (!empty($error_message)): ?>
                <div class="error-message">
                    <i class="fas fa-exclamation-circle"></i> <?php echo $error_message; ?>
                </div>
            <?php endif; ?>
            
            <form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>">
                <div class="form-group">
                    <label for="username">Usuario</label>
                    <input type="text" id="username" name="username" required>
                </div>
                
                <div class="form-group">
                    <label for="password">Contraseña</label>
                    <input type="password" id="password" name="password" required>
                </div>
                
                <button type="submit" class="admin-btn">Iniciar sesión</button>
            </form>
            
            <div class="admin-help">
                <p>¿Olvidaste tu contraseña? Contacta al administrador del sistema.</p>
                <p><small>Nota: Usuario por defecto: admin / Contraseña: admin123</small></p>
            </div>
        </div>
    </div>
</body>
</html>
