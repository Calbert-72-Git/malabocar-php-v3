
<?php
session_start();

// Inicializar el carrito si no existe
if (!isset($_SESSION['cart'])) {
  $_SESSION['cart'] = [];
}

// Ruteo básico
$route = isset($_GET['route']) ? $_GET['route'] : 'home';

// Incluir el encabezado
include 'includes/header.php';

// Cargar la página correspondiente según la ruta
switch ($route) {
  case 'home':
    include 'pages/home.php';
    break;
  case 'cars':
    include 'pages/cars.php';
    break;
  case 'car':
    include 'pages/car_detail.php';
    break;
  case 'cart':
    include 'pages/cart.php';
    break;
  case 'orders':
    include 'pages/orders.php';
    break;
  default:
    include 'pages/not_found.php';
    break;
}

// Incluir el pie de página
include 'includes/footer.php';
?>
