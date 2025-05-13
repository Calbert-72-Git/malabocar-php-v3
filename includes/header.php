
<?php
// Función para verificar si la ruta actual es la activa
function isActive($route) {
  $current_route = isset($_GET['route']) ? $_GET['route'] : 'home';
  return $current_route === $route ? 'active' : '';
}

// Contar items en el carrito
function getCartCount() {
  $count = 0;
  if (isset($_SESSION['cart']) && !empty($_SESSION['cart'])) {
    foreach ($_SESSION['cart'] as $item) {
      $count += $item['quantity'];
    }
  }
  return $count;
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AutoVenta - Plataforma de venta de coches</title>
  <link rel="stylesheet" href="assets/css/styles.css">
  <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>
</head>
<body>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <div class="logo">
          <a href="index.php">
            <h1>AutoVenta</h1>
          </a>
        </div>
        
        <nav class="desktop-nav">
          <ul>
            <li><a href="index.php" class="<?php echo isActive('home'); ?>">Inicio</a></li>
            <li><a href="?route=cars" class="<?php echo isActive('cars'); ?>">Coches</a></li>
            <li><a href="?route=orders" class="<?php echo isActive('orders'); ?>">Encargos</a></li>
          </ul>
        </nav>
        
        <div class="cart-icon">
          <a href="?route=cart">
            <i class="fas fa-shopping-cart"></i>
            <?php $cart_count = getCartCount(); ?>
            <?php if ($cart_count > 0): ?>
              <span class="cart-count"><?php echo $cart_count; ?></span>
            <?php endif; ?>
          </a>
        </div>
        
        <div class="mobile-menu-btn">
          <button id="mobileMenuToggle">
            <i class="fas fa-bars"></i>
          </button>
        </div>
      </div>
      
      <div id="mobileMenu" class="mobile-menu">
        <ul>
          <li><a href="index.php" class="<?php echo isActive('home'); ?>">Inicio</a></li>
          <li><a href="?route=cars" class="<?php echo isActive('cars'); ?>">Coches</a></li>
          <li><a href="?route=orders" class="<?php echo isActive('orders'); ?>">Encargos</a></li>
        </ul>
      </div>
    </div>
  </header>
  
  <main>
