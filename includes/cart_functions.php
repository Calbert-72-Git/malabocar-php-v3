
<?php
// Añadir coche al carrito
function addToCart($carId) {
  $car = getCarById($carId);
  if (!$car) {
    return false;
  }
  
  // Verificar si ya existe en el carrito
  foreach ($_SESSION['cart'] as $key => $item) {
    if ($item['car']['id'] === $carId) {
      // Incrementar cantidad si hay stock disponible
      if ($_SESSION['cart'][$key]['quantity'] < $car['stock']) {
        $_SESSION['cart'][$key]['quantity']++;
      }
      return true;
    }
  }
  
  // Si no existe, añadirlo con cantidad 1
  $_SESSION['cart'][] = [
    'car' => $car,
    'quantity' => 1
  ];
  
  return true;
}

// Eliminar coche del carrito
function removeFromCart($carId) {
  foreach ($_SESSION['cart'] as $key => $item) {
    if ($item['car']['id'] === $carId) {
      unset($_SESSION['cart'][$key]);
      $_SESSION['cart'] = array_values($_SESSION['cart']); // Reindexar array
      return true;
    }
  }
  return false;
}

// Actualizar cantidad de coche en el carrito
function updateCartQuantity($carId, $quantity) {
  foreach ($_SESSION['cart'] as $key => $item) {
    if ($item['car']['id'] === $carId) {
      $car = getCarById($carId);
      // Asegurarse de que la cantidad esté dentro de límites válidos
      $quantity = max(1, min($quantity, $car['stock']));
      $_SESSION['cart'][$key]['quantity'] = $quantity;
      return true;
    }
  }
  return false;
}

// Vaciar carrito
function clearCart() {
  $_SESSION['cart'] = [];
  return true;
}

// Obtener total del carrito
function getCartTotal() {
  $total = 0;
  foreach ($_SESSION['cart'] as $item) {
    $total += $item['car']['price'] * $item['quantity'];
  }
  return $total;
}

?>
