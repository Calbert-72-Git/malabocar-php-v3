
<?php
include 'includes/car_functions.php';
include 'includes/cart_functions.php';

// Procesar acciones del carrito
if (isset($_GET['action'])) {
  $action = $_GET['action'];
  
  if ($action === 'add' && isset($_POST['car_id'])) {
    addToCart($_POST['car_id']);
    header('Location: index.php?route=cart');
    exit;
  } elseif ($action === 'remove' && isset($_GET['car_id'])) {
    removeFromCart($_GET['car_id']);
    header('Location: index.php?route=cart');
    exit;
  } elseif ($action === 'update' && isset($_POST['car_id']) && isset($_POST['quantity'])) {
    updateCartQuantity($_POST['car_id'], (int)$_POST['quantity']);
    header('Location: index.php?route=cart');
    exit;
  } elseif ($action === 'clear') {
    clearCart();
    header('Location: index.php?route=cart');
    exit;
  }
}

// Obtener los elementos del carrito
$cartItems = $_SESSION['cart'];
$cartTotal = getCartTotal();
?>

<div class="container" style="padding: 2rem 0;">
  <h1 style="font-size: 2rem; margin-bottom: 2rem;">Tu carrito</h1>
  
  <?php if (count($cartItems) > 0): ?>
    <div class="cart-layout">
      <!-- Lista de productos -->
      <div>
        <?php foreach ($cartItems as $item): ?>
          <div class="cart-item">
            <div class="cart-item-image">
              <img src="<?php echo $item['car']['images'][0]; ?>" alt="<?php echo $item['car']['brand'] . ' ' . $item['car']['model']; ?>">
            </div>
            
            <div class="cart-item-details">
              <h3><?php echo $item['car']['brand'] . ' ' . $item['car']['model'] . ' ' . $item['car']['year']; ?></h3>
              <p class="cart-item-price"><?php echo formatPrice($item['car']['price']); ?></p>
              
              <form action="?route=cart&action=update" method="post" data-autosubmit="true" class="quantity-control">
                <input type="hidden" name="car_id" value="<?php echo $item['car']['id']; ?>">
                <button type="button" class="quantity-btn" data-action="decrease">-</button>
                <input 
                  type="number" 
                  name="quantity" 
                  class="quantity-input" 
                  value="<?php echo $item['quantity']; ?>" 
                  min="1" 
                  max="<?php echo $item['car']['stock']; ?>" 
                  data-max="<?php echo $item['car']['stock']; ?>"
                  readonly
                >
                <button type="button" class="quantity-btn" data-action="increase">+</button>
              </form>
            </div>
            
            <div>
              <a href="?route=cart&action=remove&car_id=<?php echo $item['car']['id']; ?>" class="btn btn-outline" style="color: #ef4444;">
                <i class="fas fa-trash"></i>
              </a>
            </div>
          </div>
        <?php endforeach; ?>
        
        <div style="margin-top: 2rem; text-align: right;">
          <a href="?route=cart&action=clear" class="btn btn-outline" style="color: #ef4444;">
            Vaciar carrito
          </a>
        </div>
      </div>
      
      <!-- Resumen del carrito -->
      <div class="cart-summary">
        <h2 style="font-size: 1.25rem; margin-bottom: 1.5rem;">Resumen del pedido</h2>
        
        <div class="cart-total">
          <span>Total:</span>
          <span><?php echo formatPrice($cartTotal); ?></span>
        </div>
        
        <a href="?route=orders" class="btn btn-primary" style="width: 100%; text-align: center;">
          Finalizar compra
        </a>
        
        <div style="margin-top: 1.5rem;">
          <a href="?route=cars" class="btn btn-outline" style="width: 100%; text-align: center;">
            Seguir comprando
          </a>
        </div>
      </div>
    </div>
  <?php else: ?>
    <div style="text-align: center; padding: 3rem 0;">
      <div style="font-size: 4rem; margin-bottom: 1rem; color: #d1d5db;">
        <i class="fas fa-shopping-cart"></i>
      </div>
      <h2 style="font-size: 1.5rem; margin-bottom: 1rem;">Tu carrito está vacío</h2>
      <p style="color: #6b7280; margin-bottom: 2rem;">Añade algunos coches para comenzar.</p>
      <a href="?route=cars" class="btn btn-primary">Ver catálogo</a>
    </div>
  <?php endif; ?>
</div>
