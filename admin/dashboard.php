
<?php
session_start();

// Verificar si el usuario está autenticado
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header("Location: login.php");
    exit;
}

require_once '../includes/db_config.php';

// Obtener estadísticas básicas
$cars_count_query = "SELECT COUNT(*) as total FROM cars";
$cars_result = mysqli_query($conn, $cars_count_query);
$cars_count = mysqli_fetch_assoc($cars_result)['total'];

$orders_count_query = "SELECT COUNT(*) as total FROM orders";
$orders_result = mysqli_query($conn, $orders_count_query);
$orders_count = mysqli_fetch_assoc($orders_result)['total'];

$pending_orders_query = "SELECT COUNT(*) as total FROM orders WHERE status = 'pending'";
$pending_result = mysqli_query($conn, $pending_orders_query);
$pending_count = mysqli_fetch_assoc($pending_result)['total'];
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - MalaboCar Admin</title>
    <link rel="stylesheet" href="../assets/css/admin.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body>
    <div class="admin-layout">
        <?php include 'includes/admin_sidebar.php'; ?>
        
        <main class="admin-main">
            <header class="admin-header">
                <h1>Panel de Control</h1>
                <div class="admin-user">
                    <span>Bienvenido, <?php echo $_SESSION['admin_name'] ?? $_SESSION['admin_username']; ?></span>
                    <a href="logout.php" class="admin-logout"><i class="fas fa-sign-out-alt"></i></a>
                </div>
            </header>
            
            <div class="admin-content">
                <div class="dashboard-stats">
                    <div class="stat-card">
                        <div class="stat-card-content">
                            <div class="stat-card-info">
                                <h3>Vehículos</h3>
                                <p class="stat-number"><?php echo $cars_count; ?></p>
                            </div>
                            <div class="stat-card-icon car-icon">
                                <i class="fas fa-car"></i>
                            </div>
                        </div>
                        <a href="vehicles.php" class="stat-card-link">Ver todos <i class="fas fa-arrow-right"></i></a>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-card-content">
                            <div class="stat-card-info">
                                <h3>Pedidos</h3>
                                <p class="stat-number"><?php echo $orders_count; ?></p>
                            </div>
                            <div class="stat-card-icon order-icon">
                                <i class="fas fa-shopping-cart"></i>
                            </div>
                        </div>
                        <a href="orders.php" class="stat-card-link">Ver todos <i class="fas fa-arrow-right"></i></a>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-card-content">
                            <div class="stat-card-info">
                                <h3>Pendientes</h3>
                                <p class="stat-number"><?php echo $pending_count; ?></p>
                            </div>
                            <div class="stat-card-icon pending-icon">
                                <i class="fas fa-clock"></i>
                            </div>
                        </div>
                        <a href="orders.php?status=pending" class="stat-card-link">Ver todos <i class="fas fa-arrow-right"></i></a>
                    </div>
                </div>
                
                <div class="dashboard-actions">
                    <a href="add_vehicle.php" class="admin-btn"><i class="fas fa-plus"></i> Añadir Vehículo</a>
                    <a href="manage_orders.php" class="admin-btn secondary"><i class="fas fa-list"></i> Gestionar Pedidos</a>
                </div>
                
                <!-- Aquí puedes añadir más secciones al dashboard como gráficas, listados recientes, etc. -->
            </div>
        </main>
    </div>
</body>
</html>
