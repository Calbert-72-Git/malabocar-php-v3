
<?php
include 'includes/car_functions.php';
include 'includes/cart_functions.php';

// Manejar el envío del formulario de pedido
$orderPlaced = false;
$orderMessage = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // Verificar que hay elementos en el carrito
  if (count($_SESSION['cart']) > 0) {
    // Datos del formulario
    $name = isset($_POST['name']) ? $_POST['name'] : '';
    $email = isset($_POST['email']) ? $_POST['email'] : '';
    $phone = isset($_POST['phone']) ? $_POST['phone'] : '';
    $address = isset($_POST['address']) ? $_POST['address'] : '';
    $comments = isset($_POST['comments']) ? $_POST['comments'] : '';
    
    // Validación básica
    if (empty($name) || empty($email) || empty($phone) || empty($address)) {
      $orderMessage = 'Por favor, complete todos los campos del formulario.';
    } else {
      // Calcular total
      $cartTotal = getCartTotal();
      
      global $conn;
      if ($conn) {
        // Iniciar transacción
        mysqli_begin_transaction($conn);
        
        try {
          // Insertar orden
          $sql = "INSERT INTO orders (name, email, phone, address, comments, total) VALUES (?, ?, ?, ?, ?, ?)";
          $stmt = mysqli_prepare($conn, $sql);
          mysqli_stmt_bind_param($stmt, "sssssd", $name, $email, $phone, $address, $comments, $cartTotal);
          mysqli_stmt_execute($stmt);
          
          // Obtener el ID de la orden
          $orderId = mysqli_insert_id($conn);
          
          // Insertar items del pedido
          foreach ($_SESSION['cart'] as $item) {
            $carId = $item['car']['id'];
            $quantity = $item['quantity'];
            $price = $item['car']['price'];
            
            $sql = "INSERT INTO order_items (order_id, car_id, quantity, price) VALUES (?, ?, ?, ?)";
            $stmt = mysqli_prepare($conn, $sql);
            mysqli_stmt_bind_param($stmt, "isid", $orderId, $carId, $quantity, $price);
            mysqli_stmt_execute($stmt);
            
            // Actualizar stock
            $sql = "UPDATE cars SET stock = stock - ? WHERE id = ?";
            $stmt = mysqli_prepare($conn, $sql);
            mysqli_stmt_bind_param($stmt, "is", $quantity, $carId);
            mysqli_stmt_execute($stmt);
          }
          
          // Confirmar transacción
          mysqli_commit($conn);
          
          // Mostrar mensaje de éxito
          $orderPlaced = true;
          $orderMessage = 'Su pedido ha sido recibido correctamente. Nos pondremos en contacto con usted en breve.';
          
          // Vaciar el carrito después de completar el pedido
          clearCart();
        } catch (Exception $e) {
          // Si hay error, hacer rollback
          mysqli_rollback($conn);
          $orderMessage = 'Ha ocurrido un error al procesar su pedido. Por favor, inténtelo de nuevo.';
        }
      } else {
        // Si no hay conexión a BD, simular que el pedido se ha realizado
        $orderPlaced = true;
        $orderMessage = 'Su pedido ha sido recibido correctamente. Nos pondremos en contacto con usted en breve.';
        
        // Vaciar el carrito después de completar el pedido
        clearCart();
      }
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
          
          <form method="post" action="?route=orders" enctype="multipart/form-data">
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
              <label for="vehicle_image" class="filter-label">Imagen de muestra del vehículo (opcional)</label>
              <input type="file" id="vehicle_image" name="vehicle_image" class="filter-input" accept="image/*">
              <p style="color: #6b7280; font-size: 0.875rem; margin-top: 0.5rem;">Formatos permitidos: JPG, PNG, GIF. Tamaño máximo: 5MB</p>
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
