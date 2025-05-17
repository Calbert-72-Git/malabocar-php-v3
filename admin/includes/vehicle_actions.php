
<?php
// Procesamiento de acciones (eliminar)
function processVehicleActions($conn) {
    $success_message = null;
    $error_message = null;
    
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
    
    return ['success_message' => $success_message, 'error_message' => $error_message];
}
?>
