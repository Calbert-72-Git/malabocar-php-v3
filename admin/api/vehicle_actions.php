
<?php
header('Content-Type: application/json');
session_start();

// Verificar si el usuario está autenticado
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'No autorizado']);
    exit;
}

require_once '../../includes/db_config.php';
require_once '../includes/vehicle_actions.php';

// Procesar acciones
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['action']) && $_POST['action'] === 'delete') {
        $messages = processVehicleActions($conn);
        
        if ($messages['success_message']) {
            echo json_encode(['success' => true, 'message' => $messages['success_message']]);
        } else {
            echo json_encode(['success' => false, 'message' => $messages['error_message'] ?? 'Error desconocido']);
        }
        exit;
    } else {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Acción no válida']);
        exit;
    }
} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}
?>
