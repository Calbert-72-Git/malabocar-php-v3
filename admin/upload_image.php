
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

// Verificar que se enviaron archivos
if (empty($_FILES['image']) || !isset($_FILES['image'])) {
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'No se recibió ninguna imagen']);
    exit;
}

// Imprimir los detalles de la imagen para depuración
error_log(print_r($_FILES['image'], true));

// Asegurar que existe el directorio de destino
$upload_dir = '../uploads/cars/';
if (!file_exists($upload_dir)) {
    if (!mkdir($upload_dir, 0755, true)) {
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'message' => 'No se pudo crear el directorio de destino.']);
        exit;
    }
}

// Procesar la subida de la imagen
$upload_result = uploadImage($_FILES['image'], $upload_dir);

// Si se ha enviado un car_id, actualizar la referencia en la base de datos
if ($upload_result['success'] && isset($_POST['car_id']) && isset($_POST['position'])) {
    $car_id = mysqli_real_escape_string($conn, $_POST['car_id']);
    $position = (int)$_POST['position'];
    $image_url = mysqli_real_escape_string($conn, $upload_result['url']);
    
    // Verificar si ya existe una imagen en esa posición para este coche
    $check_query = "SELECT id, image_url FROM car_images WHERE car_id = '$car_id' AND position = $position";
    $check_result = mysqli_query($conn, $check_query);
    
    if (mysqli_num_rows($check_result) > 0) {
        // Si existe, actualizar la referencia y eliminar la imagen anterior
        $row = mysqli_fetch_assoc($check_result);
        $image_id = $row['id'];
        $old_image_url = $row['image_url'];
        
        $update_query = "UPDATE car_images SET image_url = '$image_url' WHERE id = $image_id";
        if (mysqli_query($conn, $update_query)) {
            // Intentar eliminar la imagen anterior
            if (file_exists($old_image_url)) {
                unlink($old_image_url);
            }
        } else {
            $upload_result['message'] .= " Pero hubo un error al actualizar la referencia en la base de datos: " . mysqli_error($conn);
            $upload_result['success'] = false;
        }
    } else {
        // Si no existe, insertar nueva referencia
        $insert_query = "INSERT INTO car_images (car_id, image_url, position) VALUES ('$car_id', '$image_url', $position)";
        if (!mysqli_query($conn, $insert_query)) {
            $upload_result['message'] .= " Pero hubo un error al guardar la referencia en la base de datos: " . mysqli_error($conn);
            $upload_result['success'] = false;
        }
    }

    // Agregar información de redirección
    if ($upload_result['success']) {
        $upload_result['redirect'] = "edit_vehicle.php?id=" . $car_id;
    }
}

// Devolver respuesta JSON
header('Content-Type: application/json');
echo json_encode($upload_result);
?>
