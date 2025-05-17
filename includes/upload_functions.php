
<?php
/**
 * Funciones para manejar la subida de imágenes
 */

/**
 * Sube una imagen al servidor y devuelve la URL
 * @param array $file Archivo del formulario ($_FILES['input_name'])
 * @param string $target_dir Directorio de destino
 * @return array Información sobre el resultado de la subida
 */
function uploadImage($file, $target_dir = "uploads/") {
    // Verificar que el directorio de uploads existe, si no, crearlo
    if (!file_exists($target_dir)) {
        mkdir($target_dir, 0755, true);
    }

    $result = [
        'success' => false,
        'message' => '',
        'url' => ''
    ];

    // Verificar si hay errores en la subida
    if ($file['error'] !== UPLOAD_ERR_OK) {
        $result['message'] = 'Error en la subida del archivo: ' . getUploadErrorMessage($file['error']);
        return $result;
    }

    // Verificar el tipo de archivo
    $allowed_types = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    $file_type = $file['type'];
    
    if (!in_array($file_type, $allowed_types)) {
        $result['message'] = 'El tipo de archivo no está permitido. Solo se aceptan imágenes JPG, PNG, GIF y WEBP.';
        return $result;
    }

    // Generar un nombre único para la imagen
    $timestamp = time();
    $random_str = bin2hex(random_bytes(8));
    $file_extension = pathinfo($file['name'], PATHINFO_EXTENSION);
    $new_filename = "image_{$timestamp}_{$random_str}.{$file_extension}";
    $target_file = $target_dir . $new_filename;

    // Intentar subir el archivo
    if (move_uploaded_file($file['tmp_name'], $target_file)) {
        $result['success'] = true;
        $result['message'] = 'Imagen subida correctamente';
        $result['url'] = $target_file;
    } else {
        $result['message'] = 'Hubo un problema al guardar la imagen en el servidor.';
    }

    return $result;
}

/**
 * Devuelve un mensaje descriptivo según el código de error de la subida
 * @param int $error_code Código de error de la subida
 * @return string Mensaje descriptivo
 */
function getUploadErrorMessage($error_code) {
    switch ($error_code) {
        case UPLOAD_ERR_INI_SIZE:
        case UPLOAD_ERR_FORM_SIZE:
            return "El archivo es demasiado grande.";
        case UPLOAD_ERR_PARTIAL:
            return "El archivo solo se subió parcialmente.";
        case UPLOAD_ERR_NO_FILE:
            return "No se seleccionó ningún archivo.";
        case UPLOAD_ERR_NO_TMP_DIR:
            return "Falta la carpeta temporal.";
        case UPLOAD_ERR_CANT_WRITE:
            return "No se pudo escribir el archivo en el disco.";
        case UPLOAD_ERR_EXTENSION:
            return "Una extensión de PHP detuvo la subida.";
        default:
            return "Error desconocido en la subida.";
    }
}

/**
 * Elimina una imagen del servidor
 * @param string $image_path Ruta de la imagen a eliminar
 * @return boolean Éxito o fracaso
 */
function deleteImage($image_path) {
    // Verificar que la imagen existe y está dentro del directorio de uploads
    if (file_exists($image_path) && strpos($image_path, 'uploads/') === 0) {
        return unlink($image_path);
    }
    
    return false;
}
?>
