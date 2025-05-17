
<?php
session_start();

// Verificar si el usuario está autenticado como administrador
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'No autorizado']);
    exit;
}

// Incluir funciones necesarias
require_once '../includes/db_config.php';
require_once '../includes/upload_functions.php';

// Verificar que sea una petición POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

// Verificar que se envió el ID de imagen
if (!isset($_POST['image_id']) || empty($_POST['image_id'])) {
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'ID de imagen no especificado']);
    exit;
}

$image_id = mysqli_real_escape_string($conn, $_POST['image_id']);

// Obtener la ruta de la imagen antes de eliminarla
$query = "SELECT image_url FROM car_images WHERE id = '$image_id'";
$result = mysqli_query($conn, $query);

if (mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);
    $image_path = $row['image_url'];
    
    // Eliminar la referencia de la base de datos
    $delete_query = "DELETE FROM car_images WHERE id = '$image_id'";
    if (mysqli_query($conn, $delete_query)) {
        // Intentar eliminar el archivo físico
        if (file_exists($image_path)) {
            if (unlink($image_path)) {
                $response = ['success' => true, 'message' => 'Imagen eliminada correctamente'];
            } else {
                $response = ['success' => true, 'message' => 'Registro eliminado, pero no se pudo eliminar el archivo físico'];
            }
        } else {
            $response = ['success' => true, 'message' => 'Registro eliminado, pero el archivo físico no existía'];
        }
    } else {
        $response = ['success' => false, 'message' => 'Error al eliminar la imagen: ' . mysqli_error($conn)];
    }
} else {
    $response = ['success' => false, 'message' => 'Imagen no encontrada'];
}

// Devolver respuesta JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
