
<?php
session_start();

// Verificar si el usuario está autenticado
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header("Location: login.php");
    exit;
}

require_once '../includes/db_config.php';
require_once 'includes/vehicle_actions.php';
require_once 'includes/vehicle_data.php';
require_once 'includes/vehicle_table.php';
require_once 'includes/vehicle_pagination.php';
require_once 'includes/vehicle_delete_modal.php';

// Procesar acciones (eliminar)
$messages = processVehicleActions($conn);
$success_message = $messages['success_message'];
$error_message = $messages['error_message'];

// Obtener listado de vehículos
$search = isset($_GET['search']) ? $_GET['search'] : '';
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$limit = 10;

$vehicles_data = getVehiclesList($conn, $search, $page, $limit);
$result = $vehicles_data['result'];
$total_pages = $vehicles_data['total_pages'];
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestión de Vehículos - MalaboCar Admin</title>
    <link rel="stylesheet" href="../assets/css/admin.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body>
    <div class="admin-layout">
        <?php include 'includes/admin_sidebar.php'; ?>
        
        <main class="admin-main">
            <header class="admin-header">
                <h1>Gestión de Vehículos</h1>
                <div class="admin-actions">
                    <a href="add_vehicle.php" class="admin-btn"><i class="fas fa-plus"></i> Añadir Vehículo</a>
                </div>
            </header>
            
            <div class="admin-content">
                <?php if (isset($success_message)): ?>
                    <div class="alert success">
                        <i class="fas fa-check-circle"></i> <?php echo $success_message; ?>
                    </div>
                <?php endif; ?>
                
                <?php if (isset($error_message)): ?>
                    <div class="alert error">
                        <i class="fas fa-exclamation-circle"></i> <?php echo $error_message; ?>
                    </div>
                <?php endif; ?>
                
                <div class="admin-filters">
                    <form method="get" action="" class="search-form">
                        <div class="form-group">
                            <input type="text" name="search" placeholder="Buscar por marca, modelo..." value="<?php echo htmlspecialchars($search); ?>">
                            <button type="submit"><i class="fas fa-search"></i></button>
                        </div>
                    </form>
                </div>
                
                <?php displayVehicleTable($result); ?>
                
                <?php displayVehiclePagination($total_pages, $page, $search); ?>
            </div>
        </main>
    </div>
    
    <?php displayVehicleDeleteModal(); ?>
</body>
</html>
