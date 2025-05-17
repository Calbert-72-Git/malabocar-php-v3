
<?php
session_start();

// Verificar si el usuario está autenticado
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header("Location: login.php");
    exit;
}

require_once '../includes/db_config.php';

// Procesamiento de acciones (eliminar)
if (isset($_POST['action']) && $_POST['action'] == 'delete' && isset($_POST['car_id'])) {
    $car_id = mysqli_real_escape_string($conn, $_POST['car_id']);
    
    // Primero eliminar las imágenes asociadas
    $images_query = "SELECT image_url FROM car_images WHERE car_id = '$car_id'";
    $images_result = mysqli_query($conn, $images_query);
    
    while ($image = mysqli_fetch_assoc($images_result)) {
        if (file_exists($image['image_url'])) {
            unlink($image['image_url']);
        }
    }
    
    // Eliminar registros de imágenes
    $delete_images = "DELETE FROM car_images WHERE car_id = '$car_id'";
    mysqli_query($conn, $delete_images);
    
    // Eliminar características
    $delete_features = "DELETE FROM car_features WHERE car_id = '$car_id'";
    mysqli_query($conn, $delete_features);
    
    // Eliminar especificaciones
    $delete_specs = "DELETE FROM car_specs WHERE car_id = '$car_id'";
    mysqli_query($conn, $delete_specs);
    
    // Eliminar el coche
    $delete_car = "DELETE FROM cars WHERE id = '$car_id'";
    if (mysqli_query($conn, $delete_car)) {
        $success_message = "Vehículo eliminado correctamente.";
    } else {
        $error_message = "Error al eliminar el vehículo: " . mysqli_error($conn);
    }
}

// Obtener listado de vehículos
$search = isset($_GET['search']) ? mysqli_real_escape_string($conn, $_GET['search']) : '';
$limit = 10;
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$offset = ($page - 1) * $limit;

$where_clause = "";
if (!empty($search)) {
    $where_clause = "WHERE brand LIKE '%$search%' OR model LIKE '%$search%' OR description LIKE '%$search%'";
}

$count_query = "SELECT COUNT(*) as total FROM cars $where_clause";
$count_result = mysqli_query($conn, $count_query);
$total_rows = mysqli_fetch_assoc($count_result)['total'];
$total_pages = ceil($total_rows / $limit);

$query = "SELECT c.*, 
         (SELECT image_url FROM car_images WHERE car_id = c.id ORDER BY position ASC LIMIT 1) as main_image 
         FROM cars c 
         $where_clause 
         ORDER BY c.updated_at DESC 
         LIMIT $offset, $limit";
$result = mysqli_query($conn, $query);
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
                
                <div class="admin-table-container">
                    <table class="admin-table">
                        <thead>
                            <tr>
                                <th>Imagen</th>
                                <th>ID</th>
                                <th>Marca</th>
                                <th>Modelo</th>
                                <th>Año</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php if (mysqli_num_rows($result) > 0): ?>
                                <?php while ($car = mysqli_fetch_assoc($result)): ?>
                                    <tr>
                                        <td class="car-image">
                                            <?php if (!empty($car['main_image'])): ?>
                                                <img src="<?php echo $car['main_image']; ?>" alt="<?php echo htmlspecialchars($car['brand'] . ' ' . $car['model']); ?>">
                                            <?php else: ?>
                                                <div class="no-image"><i class="fas fa-car"></i></div>
                                            <?php endif; ?>
                                        </td>
                                        <td><?php echo $car['id']; ?></td>
                                        <td><?php echo htmlspecialchars($car['brand']); ?></td>
                                        <td><?php echo htmlspecialchars($car['model']); ?></td>
                                        <td><?php echo $car['year']; ?></td>
                                        <td><?php echo number_format($car['price'], 2, ',', '.') . ' €'; ?></td>
                                        <td><?php echo $car['stock']; ?></td>
                                        <td class="actions">
                                            <a href="edit_vehicle.php?id=<?php echo $car['id']; ?>" class="icon-btn edit" title="Editar">
                                                <i class="fas fa-edit"></i>
                                            </a>
                                            <button type="button" class="icon-btn delete" title="Eliminar" 
                                                    onclick="confirmDelete('<?php echo $car['id']; ?>', '<?php echo htmlspecialchars($car['brand'] . ' ' . $car['model']); ?>')">
                                                <i class="fas fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                <?php endwhile; ?>
                            <?php else: ?>
                                <tr>
                                    <td colspan="8" class="no-results">No se encontraron vehículos</td>
                                </tr>
                            <?php endif; ?>
                        </tbody>
                    </table>
                </div>
                
                <?php if ($total_pages > 1): ?>
                    <div class="admin-pagination">
                        <?php if ($page > 1): ?>
                            <a href="?page=<?php echo $page - 1; ?>&search=<?php echo urlencode($search); ?>" class="page-link">
                                <i class="fas fa-chevron-left"></i> Anterior
                            </a>
                        <?php endif; ?>
                        
                        <?php for ($i = max(1, $page - 2); $i <= min($page + 2, $total_pages); $i++): ?>
                            <a href="?page=<?php echo $i; ?>&search=<?php echo urlencode($search); ?>" 
                               class="page-link <?php echo $i == $page ? 'active' : ''; ?>">
                                <?php echo $i; ?>
                            </a>
                        <?php endfor; ?>
                        
                        <?php if ($page < $total_pages): ?>
                            <a href="?page=<?php echo $page + 1; ?>&search=<?php echo urlencode($search); ?>" class="page-link">
                                Siguiente <i class="fas fa-chevron-right"></i>
                            </a>
                        <?php endif; ?>
                    </div>
                <?php endif; ?>
            </div>
        </main>
    </div>
    
    <!-- Modal de confirmación -->
    <div id="delete-modal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Confirmar eliminación</h2>
                <span class="close" onclick="closeModal()">&times;</span>
            </div>
            <div class="modal-body">
                <p>¿Está seguro de que desea eliminar el vehículo <span id="delete-car-name"></span>?</p>
                <p>Esta acción no se puede deshacer.</p>
            </div>
            <div class="modal-footer">
                <form method="post" id="delete-form">
                    <input type="hidden" name="action" value="delete">
                    <input type="hidden" name="car_id" id="delete-car-id">
                    <button type="button" class="admin-btn secondary" onclick="closeModal()">Cancelar</button>
                    <button type="submit" class="admin-btn danger">Eliminar</button>
                </form>
            </div>
        </div>
    </div>
    
    <script>
        // Mostrar modal de confirmación
        function confirmDelete(carId, carName) {
            document.getElementById('delete-car-id').value = carId;
            document.getElementById('delete-car-name').textContent = carName;
            document.getElementById('delete-modal').style.display = 'flex';
        }
        
        // Cerrar modal
        function closeModal() {
            document.getElementById('delete-modal').style.display = 'none';
        }
        
        // Cerrar modal al hacer clic fuera de él
        window.onclick = function(event) {
            const modal = document.getElementById('delete-modal');
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        }
    </script>
</body>
</html>
