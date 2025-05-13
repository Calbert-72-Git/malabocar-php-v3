
<?php
include 'includes/car_functions.php';
include 'includes/cart_functions.php';

// Manejar el envío del formulario de pedido
$orderPlaced = false;
$orderMessage = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // Aquí se procesaría el pedido en un sistema real
  // Verificar que hay elementos en el carrito
  if (count($_SESSION['cart']) > 0) {
    // Datos del formulario
    $name = isset($_POST['name']) ? $_POST['name'] : '';
    $email = isset($_POST['email']) ? $_POST['email'] : '';
    $phone = isset($_POST['phone']) ? $_POST['phone'] : '';
    $address = isset($_POST['address']) ? $_POST['address'] : '';
    
    // Validación básica
    if (empty($name) || empty($email) || empty($phone) || empty($address)) {
      $orderMessage = 'Por favor, complete todos los campos del formulario.';
    } else {
      // En un sistema real: guardar el pedido en base de datos, enviar correos, etc.
      $orderPlaced = true;
      $orderMessage = 'Su pedido ha sido recibido correctamente. Nos pondremos en contacto con usted en breve.';
      
      // Vaciar el carrito después de completar el pedido
      clearCart();
    }
  } else {
    $orderMessage = 'No hay productos en el carrito para realizar el pedido.';
  }
}

// Obtener los elementos del carrito
$cartItems = $_SESSION['cart'];
$cartTotal = getCartTotal();
?>

<div class="container" style="padding: 2rem 0;">
  <h1 style="font-size: 2rem; margin-bottom: 2rem;">Finalizar compra</h1>
  
  <?php if ($orderPlaced): ?>
    <div style="text-align: center; padding: 3rem 0;">
      <div style="font-size: 4rem; margin-bottom: 1rem; color: #10b981;">
        <i class="fas fa-check-circle"></i>
      </div>
      <h2 style="font-size: 1.5rem; margin-bottom: 1rem;">¡Pedido realizado con éxito!</h2>
      <p style="color: #6b7280; margin-bottom: 2rem;"><?php echo $orderMessage; ?></p>
      <a href="index.php" class="btn btn-primary">Volver a la página principal</a>
    </div>
  <?php else: ?>
    <?php if (!empty($orderMessage)): ?>
      <div style="background-color: #fee2e2; color: #b91c1c; padding: 1rem; border-radius: 0.375rem; margin-bottom: 1.5rem;">
        <?php echo $orderMessage; ?>
      </div>
    <?php endif; ?>
    
    <?php if (count($cartItems) > 0): ?>
      <div class="cart-layout">
        <!-- Formulario de pedido -->
        <div>
          <h2 style="font-size: 1.25rem; margin-bottom: 1.5rem;">Datos de contacto</h2>
          
          <form method="post" action="?route=orders">
            <div style="margin-bottom: 1.5rem;">
              <label for="name" class="filter-label">Nombre completo</label>
              <input type="text" id="name" name="name" class="filter-input" required>
            </div>
            
            <div style="margin-bottom: 1.5rem;">
              <label for="email" class="filter-label">Correo electrónico</label>
              <input type="email" id="email" name="email" class="filter-input" required>
            </div>
            
            <div style="margin-bottom: 1.5rem;">
              <label for="phone" class="filter-label">Teléfono</label>
              <input type="tel" id="phone" name="phone" class="filter-input" required>
            </div>
            
            <div style="margin-bottom: 1.5rem;">
              <label for="address" class="filter-label">Dirección completa</label>
              <textarea id="address" name="address" class="filter-input" rows="3" required></textarea>
            </div>
            
            <div style="margin-bottom: 1.5rem;">
              <label for="comments" class="filter-label">Comentarios (opcional)</label>
              <textarea id="comments" name="comments" class="filter-input" rows="3"></textarea>
            </div>
            
            <div style="margin-bottom: 1.5rem;">
              <label class="filter-label" style="display: flex; align-items: center; gap: 0.5rem;">
                <input type="checkbox" name="terms" required>
                <span>Acepto los términos y condiciones</span>
              </label>
            </div>
            
            <button type="submit" class="btn btn-primary" style="width: 100%;">
              Realizar pedido
            </button>
          </form>
        </div>
        
        <!-- Resumen del pedido -->
        <div class="cart-summary">
          <h2 style="font-size: 1.25rem; margin-bottom: 1.5rem;">Resumen del pedido</h2>
          
          <?php foreach ($cartItems as $item): ?>
            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
              <div>
                <div style="font-weight: 500;">
                  <?php echo $item['car']['brand'] . ' ' . $item['car']['model']; ?>
                </div>
                <div style="color: #6b7280; font-size: 0.875rem;">
                  Cantidad: <?php echo $item['quantity']; ?>
                </div>
              </div>
              <div style="font-weight: 500;">
                <?php echo formatPrice($item['car']['price'] * $item['quantity']); ?>
              </div>
            </div>
          <?php endforeach; ?>
          
          <div class="cart-total" style="margin-top: 1.5rem;">
            <span>Total:</span>
            <span><?php echo formatPrice($cartTotal); ?></span>
          </div>
          
          <div style="margin-top: 1.5rem;">
            <a href="?route=cart" class="btn btn-outline" style="width: 100%; text-align: center;">
              Volver al carrito
            </a>
          </div>
        </div>
      </div>
    <?php else: ?>
      <div style="text-align: center; padding: 3rem 0;">
        <div style="font-size: 4rem; margin-bottom: 1rem; color: #d1d5db;">
          <i class="fas fa-clipboard-list"></i>
        </div>
        <h2 style="font-size: 1.5rem; margin-bottom: 1rem;">No hay productos en tu carrito</h2>
        <p style="color: #6b7280; margin-bottom: 2rem;">Añade algunos coches antes de realizar un pedido.</p>
        <a href="?route=cars" class="btn btn-primary">Ver catálogo</a>
      </div>
    <?php endif; ?>
  <?php endif; ?>
</div>
